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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text inline-block mb-5">
            {t('activities.page.title')}
          </h1>
          <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            {t('activities.page.subtitle')}
          </p>
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="glass rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-5 text-5xl drop-shadow-lg">
                  {activity.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {locale === 'fil' ? activity.nameFil : activity.name}
                </h2>

                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5 flex-1">
                  {locale === 'fil' ? activity.descriptionFil : activity.description}
                </p>

                {/* Price and capacity */}
                <div className="flex items-center gap-3 mb-5">
                  {activity.price > 0 ? (
                    <span className="inline-block text-sm font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF' }}>
                      &#8369;{activity.price}{t('activities.perHour')}
                    </span>
                  ) : (
                    <span className="inline-block text-sm font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(255,184,0,0.1)', color: '#FFB800' }}>
                      {t('activities.free')}
                    </span>
                  )}
                  <span className="text-[#6B7280] text-xs">
                    {activity.capacity === 1
                      ? '1 player'
                      : `Up to ${activity.capacity} players`}
                  </span>
                </div>

                <Link href="/booking">
                  <Button variant="primary" size="md" fullWidth>
                    {t('activities.bookNow')}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
