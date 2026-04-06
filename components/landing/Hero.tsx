'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Neon gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.1) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(255,45,120,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,184,0,0.06) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white text-glow-blue mb-6">
          {t('hero.tagline')}
        </h1>

        <p className="text-lg sm:text-xl text-[#d1d5db] max-w-2xl mx-auto mb-10">
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
