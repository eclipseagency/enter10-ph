import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { PH_BRANCH_ID } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      type,
      activity_id,
      package_id,
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

    // Validate required fields
    if (!guest_name || !guest_email || !guest_phone || !date || !time) {
      return Response.json(
        { error: 'Missing required fields: guest_name, guest_email, guest_phone, date, time' },
        { status: 400 }
      );
    }

    // Map form type to booking_type
    const booking_type = type === 'package' ? 'event_package' : 'activity';

    const bookingData = {
      branch_id: PH_BRANCH_ID,
      booking_type,
      activity_id: activity_id || null,
      package_id: package_id || null,
      booking_date: date,
      start_time: time,
      end_time: end_time || time,
      num_people: num_people || 1,
      num_lanes: num_lanes || null,
      status: 'pending' as const,
      total_price: 0,
      notes: '',
      guest_name,
      guest_email,
      guest_phone,
      company_name: company_name || '',
      special_requests: special_requests || '',
      booking_source: 'web' as const,
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) {
      // Handle case where guest columns don't exist yet (migration hasn't run)
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
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const type = searchParams.get('type');

    let query = supabase
      .from('bookings')
      .select('*')
      .eq('branch_id', PH_BRANCH_ID)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (dateFrom) {
      query = query.gte('booking_date', dateFrom);
    }

    if (dateTo) {
      query = query.lte('booking_date', dateTo);
    }

    if (type) {
      query = query.eq('booking_type', type);
    }

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
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
