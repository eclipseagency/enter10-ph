'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ACTIVITIES, PACKAGES } from '@/lib/constants';
import { getBranchName, getBranchFlag } from '@/lib/branches';
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

type SortField = 'booking_date' | 'guest_name' | 'status' | 'created_at';
type SortDir = 'asc' | 'desc';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filters
  const [searchName, setSearchName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Sort
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const fetchBookings = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (dateFrom) params.set('date_from', dateFrom);
      if (dateTo) params.set('date_to', dateTo);

      const res = await fetch(`/ph/api/bookings?${params.toString()}`);
      const json = await res.json();
      setBookings(json.bookings || []);
    } catch {
      console.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, dateFrom, dateTo]);

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return ' \u2195';
    return sortDir === 'asc' ? ' \u2191' : ' \u2193';
  };

  const filtered = useMemo(() => {
    let result = [...bookings];

    // Filter by name search
    if (searchName.trim()) {
      const q = searchName.toLowerCase();
      result = result.filter(
        (b) =>
          b.guest_name?.toLowerCase().includes(q) ||
          b.guest_email?.toLowerCase().includes(q) ||
          b.guest_phone?.includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [bookings, searchName, sortField, sortDir]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-text-muted text-sm mt-1">
          Manage all reservations for Enter10 Philippines
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass rounded-2xl border border-border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
          />
          <Input
            label="From"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <Input
            label="To"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-muted">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-xl bg-bg-card border border-border-light px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/30 focus:border-neon-blue/50 transition-all"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchName('');
                setFilterStatus('');
                setDateFrom('');
                setDateTo('');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-text-dim text-sm">
        Showing {filtered.length} booking{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Table */}
      <div className="glass rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th
                  className="text-left px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => handleSort('guest_name')}
                >
                  Name{sortIcon('guest_name')}
                </th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-left px-4 py-3 font-medium">Branch</th>
                <th className="text-left px-4 py-3 font-medium">Activities / Package</th>
                <th
                  className="text-left px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => handleSort('booking_date')}
                >
                  Date{sortIcon('booking_date')}
                </th>
                <th className="text-left px-4 py-3 font-medium">Time</th>
                <th className="text-left px-4 py-3 font-medium">People</th>
                <th className="text-left px-4 py-3 font-medium">Price</th>
                <th
                  className="text-left px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => handleSort('status')}
                >
                  Status{sortIcon('status')}
                </th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-12 text-text-dim">
                    No bookings match your filters
                  </td>
                </tr>
              ) : (
                filtered.map((booking) => (
                  <>
                    <tr
                      key={booking.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedId(expandedId === booking.id ? null : booking.id)
                      }
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        {booking.guest_name || '-'}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {booking.guest_email || '-'}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {booking.guest_phone || '-'}
                      </td>
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">
                        {getBranchFlag(booking.branch_id)} {getBranchName(booking.branch_id)}
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
                      <td className="px-4 py-3 text-text-muted">
                        {booking.total_price > 0
                          ? `PHP ${booking.total_price.toLocaleString()}`
                          : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge status={booking.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, 'confirmed')
                                }
                                className="text-xs px-2.5 py-1 rounded-lg bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, 'cancelled')
                                }
                                className="text-xs px-2.5 py-1 rounded-lg bg-error/10 text-error border border-error/20 hover:bg-error/20 transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, 'cancelled')
                              }
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

                    {/* Expanded details */}
                    {expandedId === booking.id && (
                      <tr key={`${booking.id}-detail`} className="bg-white/[0.015]">
                        <td colSpan={11} className="px-4 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Company / School
                              </p>
                              <p className="text-text-muted">
                                {booking.company_name || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Lanes
                              </p>
                              <p className="text-text-muted">
                                {booking.num_lanes || 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                End Time
                              </p>
                              <p className="text-text-muted">
                                {booking.end_time || 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Source
                              </p>
                              <p className="text-text-muted capitalize">
                                {booking.booking_source || 'web'}
                              </p>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-4">
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Special Requests
                              </p>
                              <p className="text-text-muted">
                                {booking.special_requests || 'None'}
                              </p>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-4">
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Notes
                              </p>
                              <p className="text-text-muted">
                                {booking.notes || 'None'}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Created
                              </p>
                              <p className="text-text-muted">
                                {new Date(booking.created_at).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-dim text-xs uppercase tracking-wider mb-1">
                                Booking ID
                              </p>
                              <p className="text-text-dim font-mono text-xs">
                                {booking.id}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
