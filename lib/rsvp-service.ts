import type { RSVPInput } from '../weddingData';

export function validateRSVP(value: unknown): RSVPInput {
  if (!value || typeof value !== 'object') throw new Error('Format konfirmasi tidak valid.');
  const v = value as Record<string, unknown>;
  if (typeof v.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.id)) throw new Error('Identitas konfirmasi tidak valid. Silakan muat ulang halaman.');
  if (typeof v.name !== 'string' || v.name.trim().length < 2 || v.name.trim().length > 80) throw new Error('Nama harus terdiri dari 2–80 karakter.');
  if (v.attendance !== 'hadir' && v.attendance !== 'tidak') throw new Error('Silakan pilih konfirmasi kehadiran.');
  if (!Number.isInteger(v.guests) || Number(v.guests) < 0 || Number(v.guests) > 5 || (v.attendance === 'hadir' && Number(v.guests) < 1) || (v.attendance === 'tidak' && v.guests !== 0)) throw new Error('Jumlah tamu harus 1–5 orang jika hadir, atau 0 jika tidak hadir.');
  if (typeof v.message !== 'string' || v.message.length > 1000) throw new Error('Pesan maksimal 1.000 karakter.');
  if (v.website) throw new Error('Konfirmasi tidak dapat diproses.');
  return { id: v.id, name: v.name.trim(), attendance: v.attendance, guests: Number(v.guests), message: v.message.trim() };
}

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
export async function postRSVP(request: Request, db?: D1Database): Promise<Response> {
  if (!db) return json({ error: 'Penyimpanan sedang tidak tersedia. Silakan coba lagi nanti.' }, 503);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Permintaan tidak diizinkan.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Format konfirmasi harus JSON.' }, 415);
  if (Number(request.headers.get('content-length') || 0) > 10000) return json({ error: 'Konfirmasi terlalu panjang.' }, 413);
  let input: RSVPInput;
  try {
    const text = await request.text();
    if (text.length > 10000) return json({ error: 'Konfirmasi terlalu panjang.' }, 413);
    input = validateRSVP(JSON.parse(text));
  } catch (error) { return json({ error: error instanceof SyntaxError ? 'Format konfirmasi tidak valid.' : error instanceof Error ? error.message : 'Konfirmasi tidak valid.' }, 400); }
  try {
    const existing = await db.prepare('SELECT id, name, attendance, guests, message FROM rsvps WHERE id = ?').bind(input.id).first<RSVPInput>();
    if (existing) {
      if (existing.name !== input.name || existing.attendance !== input.attendance || existing.guests !== input.guests || existing.message !== input.message) return json({ error: 'Konfirmasi dengan identitas ini sudah tersimpan. Muat ulang halaman untuk mengirim konfirmasi baru.' }, 409);
      return json({ id: existing.id, saved: true });
    }
    const requestIdentity = request.headers.get('oai-authenticated-user-id') || request.headers.get('cf-connecting-ip') || 'local-preview';
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(requestIdentity));
    const requestKey = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    const now = Date.now();
    const count = await db.prepare('SELECT count(*) AS total FROM rsvps WHERE request_key = ? AND created_at > ?').bind(requestKey, now - 3600000).first<{ total: number }>();
    if ((count?.total || 0) >= 20) return json({ error: 'Terlalu banyak konfirmasi. Silakan coba kembali nanti.' }, 429);
    await db.prepare('INSERT INTO rsvps (id, name, attendance, guests, message, created_at, request_key) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(input.id, input.name, input.attendance, input.guests, input.message, now, requestKey).run();
    return json({ id: input.id, saved: true }, 201);
  } catch (error) { console.error('RSVP storage unavailable', error instanceof Error ? error.message : 'unknown'); return json({ error: 'Konfirmasi belum tersimpan. Silakan coba lagi; isian Anda tetap tersedia.' }, 503); }
}

export async function getWishes(request: Request, db?: D1Database): Promise<Response> {
  if (!db) return json({ error: 'Buku tamu sementara tidak tersedia.' }, 503);
  const url = new URL(request.url);
  const filter = url.searchParams.get('attendance') || 'semua';
  const offset = Number(url.searchParams.get('offset') || 0);
  if (!['semua', 'hadir', 'tidak'].includes(filter) || !Number.isInteger(offset) || offset < 0 || offset > 10000) return json({ error: 'Pilihan buku tamu tidak valid.' }, 400);
  try {
    const query = filter === 'semua'
      ? db.prepare("SELECT id, name, attendance, message, created_at FROM rsvps WHERE message != '' ORDER BY created_at DESC, id DESC LIMIT 11 OFFSET ?").bind(offset)
      : db.prepare("SELECT id, name, attendance, message, created_at FROM rsvps WHERE message != '' AND attendance = ? ORDER BY created_at DESC, id DESC LIMIT 11 OFFSET ?").bind(filter, offset);
    const result = await query.all();
    return json({ wishes: result.results.slice(0, 10), hasMore: result.results.length > 10 });
  } catch (error) { console.error('Guestbook storage unavailable', error instanceof Error ? error.message : 'unknown'); return json({ error: 'Buku tamu belum dapat dimuat. Silakan coba lagi.' }, 503); }
}
