import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION } from '@/lib/auth';

const PROTECTED_API_PREFIX = '/api/bookings';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const isBookingApi = pathname.startsWith(PROTECTED_API_PREFIX);

  if (!isAdminPage && !isBookingApi) {
    return NextResponse.next();
  }

  // Public booking creation stays open: POST /api/bookings (guest reservations)
  if (isBookingApi && req.method === 'POST') {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET ?? '';
  const token = req.cookies.get(SESSION.cookieName)?.value;
  const session = await verifySession(token, secret);

  if (session) return NextResponse.next();

  if (isBookingApi) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/bookings', '/api/bookings/:path*'],
};
