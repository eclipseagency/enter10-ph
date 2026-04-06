'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { PACKAGES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

const colorMap: Record<string, { border: string; shadow: string }> = {
  'neon-blue': { border: '#00D4FF', shadow: 'rgba(0,212,255,0.15)' },
  'neon-gold': { border: '#FFB800', shadow: 'rgba(255,184,0,0.15)' },
  'neon-magenta': { border: '#FF2D78', shadow: 'rgba(255,45,120,0.15)' },
};

export default function PackagesSection() {
  const { t, locale } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="packages" style={{ background: 'rgba(20,20,20,0.3)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGES.map((pkg) => {
            const colors = colorMap[pkg.color] || colorMap['neon-blue'];
            const durationHrs = pkg.duration / 60;

            return (
              <div
                key={pkg.id}
                className="glass rounded-2xl flex flex-col overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                style={{ borderTop: `4px solid ${colors.border}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${colors.shadow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-4xl mb-3">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {locale === 'fil' ? pkg.nameFil : pkg.name}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">
                    {locale === 'fil' ? pkg.descriptionFil : pkg.description}
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-extrabold text-white">&#8369;{pkg.price}</span>
                    <span className="text-[#9CA3AF] text-sm">{t('packages.perPerson')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#9CA3AF] mb-5">
                    <span>{pkg.minPeople}&ndash;{pkg.maxPeople} {t('packages.people')}</span>
                    <span className="w-px h-4" style={{ background: '#262626' }} />
                    <span>{durationHrs} {t('packages.hours')}</span>
                  </div>
                  <div className="mb-6 flex-1">
                    <p className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: '#6B7280' }}>
                      {t('packages.includes')}
                    </p>
                    <ul className="space-y-2">
                      {(locale === 'fil' ? pkg.includesFil : pkg.includes).map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#9CA3AF' }}>
                          <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#22C55E' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/booking?package=${pkg.type}`}>
                    <Button variant="primary" size="md" fullWidth>
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
