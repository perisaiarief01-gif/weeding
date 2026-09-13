// Cloudflare bindings are unavailable on Vercel. The API handlers return 503
// when DB is absent; keep this module in source so clean builds can resolve it.
export const env: { DB?: D1Database } = { DB: undefined };
