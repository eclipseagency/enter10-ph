import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { verifySession, SESSION } from '@/lib/auth';

export const runtime = 'nodejs';

async function getSession(req: NextRequest) {
  const secret = process.env.AUTH_SECRET ?? '';
  const token = req.cookies.get(SESSION.cookieName)?.value;
  return verifySession(token, secret);
}

export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/bookings/[id]'>
) {
  try {
    const session = await getSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await ctx.params;

    const { data, error } = await getSupabase()
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return Response.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (session.role === 'branch_admin' && data.branch_id !== session.branchId) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return Response.json({ booking: data });
  } catch (err) {
    console.error('Booking fetch error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<'/api/bookings/[id]'>
) {
  try {
    const session = await getSession(request);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await ctx.params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['confirmed', 'cancelled', 'pending'].includes(status)) {
      return Response.json(
        { error: 'Invalid status. Must be: confirmed, cancelled, or pending' },
        { status: 400 }
      );
    }

    // For branch_admin, verify the row belongs to them BEFORE update
    if (session.role === 'branch_admin') {
      const { data: existing, error: lookupErr } = await getSupabase()
        .from('bookings')
        .select('branch_id')
        .eq('id', id)
        .single();
      if (lookupErr || !existing) {
        return Response.json({ error: 'Booking not found' }, { status: 404 });
      }
      if (existing.branch_id !== session.branchId) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const { data, error } = await getSupabase()
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: 'Failed to update booking', details: error.message },
        { status: 500 }
      );
    }
    if (!data) return Response.json({ error: 'Booking not found' }, { status: 404 });

    return Response.json({ booking: data });
  } catch (err) {
    console.error('Booking update error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<'/api/bookings/[id]'>
) {
  try {
    const session = await getSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await ctx.params;

    if (session.role === 'branch_admin') {
      const { data: existing, error: lookupErr } = await getSupabase()
        .from('bookings')
        .select('branch_id')
        .eq('id', id)
        .single();
      if (lookupErr || !existing) {
        return Response.json({ error: 'Booking not found' }, { status: 404 });
      }
      if (existing.branch_id !== session.branchId) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const { error } = await getSupabase().from('bookings').delete().eq('id', id);
    if (error) {
      return Response.json(
        { error: 'Failed to delete booking', details: error.message },
        { status: 500 }
      );
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Booking delete error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
