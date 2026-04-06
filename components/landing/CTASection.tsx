'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,212,255,0.18) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(255,45,120,0.12) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,184,0,0.10) 0%, transparent 50%)',
            'linear-gradient(180deg, #0A0A0A 0%, #0c0c1e 30%, #120d1c 50%, #0d0d1a 70%, #0A0A0A 100%)',
          ].join(', '),
        }}
      />

      {/* Pulsing neon glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-glow-blue mb-6" style={{ letterSpacing: '-0.03em' }}>
          {t('cta.title')}
        </h2>
        <p className="text-lg sm:text-xl max-w-xl mx-auto mb-12" style={{ color: '#b3b3b3' }}>
          {t('cta.subtitle')}
        </p>
        <div className="relative inline-block">
          <div
            className="absolute -inset-4 rounded-full opacity-40 blur-2xl animate-pulse pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.3) 0%, rgba(255,184,0,0.15) 50%, transparent 80%)' }}
          />
          <Link href="/booking">
            <Button variant="primary" size="lg">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
