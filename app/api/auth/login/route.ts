import { NextRequest, NextResponse } from 'next/server';
import { authenticate, signSession, SESSION } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
    }

    const session = authenticate(email, password);
    if (!session) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await signSession(session, secret);
    const res = NextResponse.json({
      ok: true,
      email: session.email,
      role: session.role,
      branchId: session.branchId,
    });
    res.cookies.set(SESSION.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION.ttlSeconds,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
