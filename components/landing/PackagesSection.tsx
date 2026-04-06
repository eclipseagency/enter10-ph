'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { PACKAGES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

const colorMap: Record<string, { border: string; glow: string; bg: string }> = {
  'neon-blue': {
    border: 'border-t-neon-blue',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]',
    bg: 'bg-neon-blue/10',
  },
  'neon-gold': {
    border: 'border-t-neon-gold',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,184,0,0.15)]',
    bg: 'bg-neon-gold/10',
  },
  'neon-magenta': {
    border: 'border-t-neon-magenta',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,45,120,0.15)]',
    bg: 'bg-neon-magenta/10',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export default function PackagesSection() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-bg-card/30" id="packages">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGES.map((pkg, i) => {
            const colors = colorMap[pkg.color] || colorMap['neon-blue'];
            const durationHrs = pkg.duration / 60;

            return (
              <motion.div
                key={pkg.id}
                className={`glass rounded-2xl border-t-4 ${colors.border} flex flex-col overflow-hidden group transition-shadow duration-300 ${colors.glow}`}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Icon & Name */}
                  <div className="text-4xl mb-3">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {locale === 'fil' ? pkg.nameFil : pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {locale === 'fil' ? pkg.descriptionFil : pkg.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-extrabold text-white">&#8369;{pkg.price}</span>
                    <span className="text-text-muted text-sm">{t('packages.perPerson')}</span>
                  </div>

                  {/* Meta: people & duration */}
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-5">
                    <span>{pkg.minPeople}&ndash;{pkg.maxPeople} {t('packages.people')}</span>
                    <span className="w-px h-4 bg-border" />
                    <span>{durationHrs} {t('packages.hours')}</span>
                  </div>

                  {/* Includes */}
                  <div className="mb-6 flex-1">
                    <p className="text-xs uppercase tracking-wider text-text-dim font-semibold mb-3">
                      {t('packages.includes')}
                    </p>
                    <ul className="space-y-2">
                      {(locale === 'fil' ? pkg.includesFil : pkg.includes).map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                          <svg
                            className="w-4 h-4 text-success mt-0.5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link href="/booking">
                    <Button variant="primary" size="md" fullWidth>
                      {t('packages.bookPackage')}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
