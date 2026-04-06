'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { PACKAGES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

const colorMap: Record<string, { border: string; glow: string; bg: string; accent: string }> = {
  'neon-blue': {
    border: 'border-t-neon-blue',
    glow: 'hover:shadow-[0_0_40px_rgba(0,212,255,0.18),rgba(0,0,0,0.3)_0px_8px_24px]',
    bg: 'bg-neon-blue/10',
    accent: 'text-neon-blue',
  },
  'neon-gold': {
    border: 'border-t-neon-gold',
    glow: 'hover:shadow-[0_0_40px_rgba(255,184,0,0.18),rgba(0,0,0,0.3)_0px_8px_24px]',
    bg: 'bg-neon-gold/10',
    accent: 'text-neon-gold',
  },
  'neon-magenta': {
    border: 'border-t-neon-magenta',
    glow: 'hover:shadow-[0_0_40px_rgba(255,45,120,0.18),rgba(0,0,0,0.3)_0px_8px_24px]',
    bg: 'bg-neon-magenta/10',
    accent: 'text-neon-magenta',
  },
};

export default function PackagesPage() {
  const { t, locale } = useI18n();

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,184,0,0.05) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 40% at 20% 70%, rgba(0,212,255,0.04) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 40% at 80% 60%, rgba(255,45,120,0.04) 0%, transparent 50%)',
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
            {t('packages.page.title')}
          </h1>
          <p className="text-lg sm:text-xl text-[#b3b3b3] max-w-2xl mx-auto">
            {t('packages.page.subtitle')}
          </p>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PACKAGES.map((pkg) => {
            const colors = colorMap[pkg.color] || colorMap['neon-blue'];
            const durationHrs = pkg.duration / 60;

            return (
              <div
                key={pkg.id}
                className={[
                  'glass rounded-2xl border-t-4 flex flex-col overflow-hidden',
                  'transition-all duration-300 hover:-translate-y-[2px] hover:border-[rgba(255,255,255,0.15)]',
                  colors.border,
                  colors.glow,
                ].join(' ')}
              >
                {/* Icon header */}
                <div className={`${colors.bg} px-6 pt-8 pb-6 text-center`}>
                  <span className="text-6xl block mb-4">{pkg.icon}</span>
                  <h2
                    className="text-2xl font-bold text-white"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {locale === 'fil' ? pkg.nameFil : pkg.name}
                  </h2>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Description */}
                  <p className="text-[#b3b3b3] text-sm leading-relaxed mb-6">
                    {locale === 'fil' ? pkg.descriptionFil : pkg.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl font-extrabold ${colors.accent}`}>
                      &#8369;{pkg.price}
                    </span>
                    <span className="text-[#8a8f98] text-sm">{t('packages.perPerson')}</span>
                  </div>

                  {/* Meta: people & duration */}
                  <div className="flex items-center gap-4 text-sm text-[#8a8f98] mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#62666d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      <span>{pkg.minPeople}&ndash;{pkg.maxPeople} {t('packages.people')}</span>
                    </div>
                    <span className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#62666d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{durationHrs} {t('packages.hours')}</span>
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="mb-8 flex-1">
                    <p className="text-xs uppercase tracking-wider text-[#62666d] font-semibold mb-4">
                      {t('packages.includes')}
                    </p>
                    <ul className="space-y-3">
                      {(locale === 'fil' ? pkg.includesFil : pkg.includes).map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[#b3b3b3]">
                          <svg
                            className="w-5 h-5 text-success mt-0.5 shrink-0"
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
                  <Link href={`/booking?package=${pkg.type}`}>
                    <Button variant="primary" size="lg" fullWidth>
                      {t('packages.bookPackage')}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
