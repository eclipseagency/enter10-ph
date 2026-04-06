'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(255,45,120,0.06) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,184,0,0.04) 0%, transparent 50%)',
            '#0A0A0A',
          ].join(', '),
        }}
      />

      {/* Animated neon orbs (CSS only) */}
      <div className="absolute left-[15%] top-[20%] w-[300px] h-[300px] rounded-full pointer-events-none animate-pulse opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute left-[75%] top-[60%] w-[250px] h-[250px] rounded-full pointer-events-none animate-pulse opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.10) 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '2s' }} />
      <div className="absolute left-[50%] top-[80%] w-[200px] h-[200px] rounded-full pointer-events-none animate-pulse opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.08) 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white text-glow-blue mb-6">
          {t('hero.tagline')}
        </h1>

        <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/booking">
            <Button variant="primary" size="lg">
              {t('hero.cta')}
            </Button>
          </Link>
          <Link href="/activities">
            <Button variant="secondary" size="lg">
              {t('hero.explore')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
