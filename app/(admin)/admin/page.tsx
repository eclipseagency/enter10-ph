'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ACTIVITIES, PACKAGES } from '@/lib/constants';
import type { Booking } from '@/types';

function getActivityName(id: string | null) {
  if (!id) return '-';
  const act = ACTIVITIES.find((a) => a.id === id);
  return act ? `${act.icon} ${act.name}` : id.slice(0, 8);
}

function getActivitiesLabel(booking: Booking) {
  const ids = Array.isArray(booking.activity_ids) && booking.activity_ids.length > 0
    ? booking.activity_ids
    : booking.activity_id
    ? [booking.activity_id]
    : [];
  if (ids.length === 0) return '-';
  return ids.map(getActivityName).join(', ');
}

function getPackageName(id: string | null) {
  if (!id) return '-';
  const pkg = PACKAGES.find((p) => p.id === id);
  return pkg ? `${pkg.icon} ${pkg.name}` : id.slice(0, 8);
}

function getTypeLabel(booking: Booking) {
  if (booking.booking_type === 'event_package' || booking.booking_type === 'package') {
    return getPackageName(booking.package_id);
  }
  return getActivitiesLabel(booking);
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/ph/api/bookings');
      const json = await res.json();
      setBookings(json.bookings || []);
    } catch {
      console.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const res = await fetch(`/ph/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch {
      console.error('Failed to update booking');
    }
  };

  const today = todayISO();
  const todayBookings = bookings.filter((b) => b.booking_date === today);
  const pending = bookings.filter((b) => b.status === 'pending');
  const confirmed = bookings.filter((b) => b.status === 'confirmed');
  const cancelled = bookings.filter((b) => b.status === 'cancelled');
  const recentBookings = bookings.slice(0, 10);

  const stats = [
    {
      label: "Today's Bookings",
      value: todayBookings.length,
      color: 'neon-blue' as const,
      glow: 'blue' as const,
    },
    {
      label: 'Pending',
      value: pending.length,
      color: 'neon-gold' as const,
      glow: 'gold' as const,
    },
    {
      label: 'Confirmed',
      value: confirmed.length,
      color: 'success' as const,
      glow: 'blue' as const,
    },
    {
      label: 'Cancelled',
      value: cancelled.length,
      color: 'error' as const,
      glow: 'magenta' as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          Overview of Enter10 Philippines bookings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} glow={stat.glow} className="!p-5">
            <p className="text-text-muted text-sm">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 text-${stat.color}`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link href="/admin/bookings">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="glass rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted">
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Time</th>
                  <th className="text-left px-4 py-3 font-medium">People</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-text-dim">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        {booking.guest_name || '-'}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {getTypeLabel(booking)}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {booking.booking_date}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {booking.start_time}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {booking.num_people}
                      </td>
                      <td className="px-4 py-3">
                        <Badge status={booking.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="text-xs px-2.5 py-1 rounded-lg bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                className="text-xs px-2.5 py-1 rounded-lg bg-error/10 text-error border border-error/20 hover:bg-error/20 transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="text-xs px-2.5 py-1 rounded-lg bg-error/10 text-error border border-error/20 hover:bg-error/20 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status === 'cancelled' && (
                            <span className="text-xs text-text-dim">--</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
