import { env } from 'cloudflare:workers';
import { getWishes } from '../../../lib/rsvp-service';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) { return getWishes(request, env.DB); }
