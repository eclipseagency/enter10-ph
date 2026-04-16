import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const secret = process.env.AUTH_SECRET ?? '';
  const token = req.cookies.get(SESSION.cookieName)?.value;
  const session = await verifySession(token, secret);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email: session.email });
}
