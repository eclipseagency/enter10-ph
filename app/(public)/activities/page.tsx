'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ACTIVITIES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function ActivitiesPage() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(0,212,255,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 40% at 70% 70%, rgba(255,45,120,0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 30% at 50% 50%, rgba(255,184,0,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text inline-block mb-5">
            {t('activities.page.title')}
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
            {t('activities.page.subtitle')}
          </p>
        </motion.div>

        {/* Activities grid - larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.id}
              className="glass rounded-2xl overflow-hidden flex flex-col group hover:bg-bg-card-hover transition-colors duration-300"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
            >
              {/* Image placeholder */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-bg-card"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-card" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {activity.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {locale === 'fil' ? activity.nameFil : activity.name}
                </h2>

                <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
                  {locale === 'fil' ? activity.descriptionFil : activity.description}
                </p>

                {/* Price and capacity */}
                <div className="flex items-center gap-3 mb-5">
                  {activity.price > 0 ? (
                    <span className="inline-block bg-neon-blue/10 text-neon-blue text-sm font-semibold px-3 py-1.5 rounded-full">
                      &#8369;{activity.price}{t('activities.perHour')}
                    </span>
                  ) : (
                    <span className="inline-block bg-neon-gold/10 text-neon-gold text-sm font-semibold px-3 py-1.5 rounded-full">
                      {t('activities.free')}
                    </span>
                  )}
                  <span className="text-text-dim text-xs">
                    {activity.capacity === 1
                      ? '1 player'
                      : `Up to ${activity.capacity} players`}
                  </span>
                </div>

                {/* Book Now button */}
                <Link href="/booking">
                  <Button variant="primary" size="md" fullWidth>
                    {t('activities.bookNow')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
