'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ACTIVITIES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function ActivitiesSection() {
  const { t, locale } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="activities">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4" style={{ letterSpacing: '-0.03em' }}>
            {t('activities.title')}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#b3b3b3' }}>
            {t('activities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="glass rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 group hover:border-white/10 hover:shadow-[rgba(0,0,0,0.3)_0px_8px_24px]"
            >
              {/* Photo */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 text-3xl">{activity.icon}</div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                  {locale === 'fil' ? activity.nameFil : activity.name}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#b3b3b3' }}>
                  {locale === 'fil' ? activity.descriptionFil : activity.description}
                </p>
                <div className="mb-4">
                  {activity.price > 0 ? (
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF' }}>
                      &#8369;{activity.price}{t('activities.perHour')}
                    </span>
                  ) : (
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,184,0,0.1)', color: '#FFB800' }}>
                      {t('activities.free')}
                    </span>
                  )}
                </div>
                <Link href="/booking" className="mt-auto">
                  <Button variant="secondary" size="sm" fullWidth>
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
