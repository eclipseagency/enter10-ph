'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ACTIVITIES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function ActivitiesPage() {
  const { t, locale } = useI18n();

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(0,212,255,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 40% at 70% 70%, rgba(255,45,120,0.05) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text inline-block mb-5"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t('activities.page.title')}
          </h1>
          <p className="text-lg sm:text-xl text-[#b3b3b3] max-w-2xl mx-auto">
            {t('activities.page.subtitle')}
          </p>
        </div>

        {/* Service charge notice */}
        <div className="mb-10 px-5 py-3 rounded-xl border border-neon-gold/30 bg-neon-gold/5 text-center">
          <p className="text-sm font-medium text-neon-gold">
            {t('activities.serviceCharge')}
          </p>
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ACTIVITIES.map((activity) => {
            const notes = locale === 'fil' ? activity.notesFil : activity.notes;
            const rates = activity.rates;

            return (
              <div
                key={activity.id}
                className="glass rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-[2px] transition-all duration-300 hover:border-[rgba(255,255,255,0.15)] hover:shadow-[rgba(0,0,0,0.3)_0px_8px_24px]"
              >
                {/* Photo */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-5 text-5xl drop-shadow-lg">
                    {activity.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2
                    className="text-2xl font-bold text-white mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {locale === 'fil' ? activity.nameFil : activity.name}
                  </h2>

                  <p className="text-[#b3b3b3] text-sm leading-relaxed mb-5">
                    {locale === 'fil' ? activity.descriptionFil : activity.description}
                  </p>

                  {/* Rates table */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#62666d] mb-2">
                      {t('activities.rates')}
                    </p>
                    <div className="space-y-1.5">
                      {rates.map((rate, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                        >
                          <span className="text-sm text-[#b3b3b3]">
                            {locale === 'fil' ? rate.labelFil : rate.label}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: '#00D4FF' }}
                          >
                            &#8369;{rate.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {notes.length > 0 && (
                    <div className="mb-5">
                      <ul className="space-y-1">
                        {notes.map((note, i) => (
                          <li
                            key={i}
                            className="text-xs text-[#8a8f98] flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-neon-gold flex-shrink-0 mt-1.5" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Link href="/booking">
                      <Button variant="primary" size="md" fullWidth>
                        {t('activities.bookNow')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
