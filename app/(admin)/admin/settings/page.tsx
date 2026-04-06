'use client';

import Card from '@/components/ui/Card';
import { ACTIVITIES, PACKAGES, OPERATING_HOURS, VENUE_INFO } from '@/lib/constants';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-text-muted text-sm mt-1">
          Branch configuration for Enter10 Philippines (read-only)
        </p>
      </div>

      {/* Venue Info */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Venue Information</h2>
        <Card glow="blue" className="!p-0 overflow-hidden">
          <div className="divide-y divide-border/50">
            <SettingRow label="Name" value={VENUE_INFO.name} />
            <SettingRow label="Address" value={VENUE_INFO.address} />
            <SettingRow label="Phone" value={VENUE_INFO.phone} />
            <SettingRow label="Email" value={VENUE_INFO.email} />
            <SettingRow
              label="Coordinates"
              value={`${VENUE_INFO.lat}, ${VENUE_INFO.lng}`}
            />
          </div>
        </Card>
      </section>

      {/* Operating Hours */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Operating Hours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card glow="gold">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-neon-gold/10 border border-neon-gold/20 flex items-center justify-center text-neon-gold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{OPERATING_HOURS.weekday.label}</p>
                <p className="text-text-muted text-sm">Weekdays</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-neon-gold">
              {OPERATING_HOURS.weekday.open} - {OPERATING_HOURS.weekday.close}
            </p>
          </Card>

          <Card glow="magenta">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center text-neon-magenta">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{OPERATING_HOURS.weekend.label}</p>
                <p className="text-text-muted text-sm">Weekends</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-neon-magenta">
              {OPERATING_HOURS.weekend.open} - {OPERATING_HOURS.weekend.close}
            </p>
          </Card>
        </div>
      </section>

      {/* Activities Pricing */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Activities &amp; Pricing</h2>
        <div className="glass rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="text-left px-4 py-3 font-medium">Activity</th>
                <th className="text-left px-4 py-3 font-medium">Price / Hour</th>
                <th className="text-left px-4 py-3 font-medium">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {ACTIVITIES.map((activity) => (
                <tr
                  key={activity.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{activity.icon}</span>
                      <div>
                        <p className="font-medium text-white">{activity.name}</p>
                        <p className="text-text-dim text-xs mt-0.5 max-w-xs truncate">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {activity.price > 0 ? (
                      <span className="text-neon-gold font-semibold">
                        PHP {activity.price}
                      </span>
                    ) : (
                      <span className="text-success font-medium">Free Entry</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {activity.capacity} {activity.capacity === 1 ? 'player' : 'players'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Packages */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Event Packages</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => {
            const colorMap: Record<string, 'blue' | 'gold' | 'magenta'> = {
              'neon-blue': 'blue',
              'neon-gold': 'gold',
              'neon-magenta': 'magenta',
            };
            const glow = colorMap[pkg.color] || 'blue';

            return (
              <Card key={pkg.id} glow={glow}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{pkg.icon}</span>
                  <div>
                    <p className="font-semibold text-white">{pkg.name}</p>
                    <p className="text-text-dim text-xs capitalize">{pkg.type}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Price per person</span>
                    <span className="text-neon-gold font-semibold">PHP {pkg.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Duration</span>
                    <span className="text-white">{pkg.duration / 60} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Group size</span>
                    <span className="text-white">
                      {pkg.minPeople} - {pkg.maxPeople} people
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="text-text-dim text-xs uppercase tracking-wider mb-2">
                    Includes
                  </p>
                  <ul className="space-y-1">
                    {pkg.includes.map((item, i) => (
                      <li
                        key={i}
                        className="text-text-muted text-xs flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-neon-blue flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Read-only notice */}
      <div className="glass rounded-xl border border-border p-4 text-center">
        <p className="text-text-dim text-sm">
          Settings are currently read-only. Editable configuration coming soon.
        </p>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <span className="text-text-muted text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}
