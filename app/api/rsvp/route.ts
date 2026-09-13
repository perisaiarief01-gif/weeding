import { env } from 'cloudflare:workers';
import { postRSVP } from '../../../lib/rsvp-service';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) { return postRSVP(request, env.DB); }
