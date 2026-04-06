import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { PH_BRANCH_ID } from '@/lib/constants';

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/bookings/[id]'>
) {
  try {
    const { id } = await ctx.params;

    const { data, error } = await getSupabase()
      .from('bookings')
      .select('*')
      .eq('id', id)
      .eq('branch_id', PH_BRANCH_ID)
      .single();

    if (error || !data) {
      return Response.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return Response.json({ booking: data });
  } catch (err) {
    console.error('Booking fetch error:', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<'/api/bookings/[id]'>
) {
  try {
    const { id } = await ctx.params;
    const body = await request.json();

    const { status } = body;

    if (!status || !['confirmed', 'cancelled', 'pending'].includes(status)) {
      return Response.json(
        { error: 'Invalid status. Must be: confirmed, cancelled, or pending' },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabase()
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .eq('branch_id', PH_BRANCH_ID)
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: 'Failed to update booking', details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return Response.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return Response.json({ booking: data });
  } catch (err) {
    console.error('Booking update error:', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
