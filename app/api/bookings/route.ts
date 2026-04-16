import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { verifySession, SESSION } from '@/lib/auth';
import { ALL_BRANCHES, MIN_PEOPLE } from '@/lib/branches';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      type,
      activity_id,
      activity_ids,
      package_id,
      branch_id,
      date,
      time,
      end_time,
      num_people,
      num_lanes,
      guest_name,
      guest_email,
      guest_phone,
      company_name,
      special_requests,
    } = body;

    if (!guest_name || !guest_email || !guest_phone || !date || !time) {
      return Response.json(
        { error: 'Missing required fields: guest_name, guest_email, guest_phone, date, time' },
        { status: 400 }
      );
    }

    if (!branch_id || !ALL_BRANCHES.find((b) => b.id === branch_id)) {
      return Response.json({ error: 'Please select a valid branch' }, { status: 400 });
    }

    const peopleCount = Number(num_people) || 0;
    if (peopleCount < MIN_PEOPLE) {
      return Response.json(
        { error: `Minimum ${MIN_PEOPLE} people required for a booking` },
        { status: 400 }
      );
    }

    const cleanActivityIds = Array.isArray(activity_ids)
      ? activity_ids.filter((id: unknown): id is string => typeof id === 'string' && id.length > 0)
      : activity_id
      ? [activity_id]
      : [];

    const booking_type = type === 'package' ? 'event_package' : 'activity';

    const bookingData = {
      branch_id,
      booking_type,
      activity_id: cleanActivityIds[0] ?? activity_id ?? null,
      activity_ids: cleanActivityIds,
      package_id: package_id || null,
      booking_date: date,
      start_time: time,
      end_time: end_time || time,
      num_people: peopleCount,
      num_lanes: num_lanes || null,
      status: 'pending' as const,
      total_price: Number(body.total_price) || 0,
      notes: '',
      guest_name,
      guest_email,
      guest_phone,
      company_name: company_name || '',
      special_requests: special_requests || '',
      booking_source: 'web' as const,
    };

    const { data, error } = await getSupabase()
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) {
      if (
        error.message?.includes('column') ||
        error.code === '42703' ||
        error.message?.includes('does not exist')
      ) {
        return Response.json(
          {
            error:
              'Booking system is being set up. Please try again shortly or contact us directly.',
            details: error.message,
          },
          { status: 503 }
        );
      }
      return Response.json(
        { error: 'Failed to create booking', details: error.message },
        { status: 500 }
      );
    }

    return Response.json({ booking: data }, { status: 201 });
  } catch (err) {
    console.error('Booking creation error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const secret = process.env.AUTH_SECRET ?? '';
    const token = request.cookies.get(SESSION.cookieName)?.value;
    const session = await verifySession(token, secret);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const type = searchParams.get('type');
    const requestedBranch = searchParams.get('branch');

    let query = getSupabase()
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    // Server-side branch enforcement: branch_admin can only see their branch
    if (session.role === 'branch_admin' && session.branchId) {
      query = query.eq('branch_id', session.branchId);
    } else if (session.role === 'super_admin' && requestedBranch) {
      query = query.eq('branch_id', requestedBranch);
    }

    if (status) query = query.eq('status', status);
    if (dateFrom) query = query.gte('booking_date', dateFrom);
    if (dateTo) query = query.lte('booking_date', dateTo);
    if (type) query = query.eq('booking_type', type);

    const { data, error } = await query;
    if (error) {
      return Response.json(
        { error: 'Failed to fetch bookings', details: error.message },
        { status: 500 }
      );
    }
    return Response.json({ bookings: data || [] });
  } catch (err) {
    console.error('Bookings fetch error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
