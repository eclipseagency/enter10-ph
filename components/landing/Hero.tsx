'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

const floatingOrbs = [
  { x: '15%', y: '20%', size: 300, color: 'rgba(0,212,255,0.12)', delay: 0, duration: 8 },
  { x: '75%', y: '60%', size: 250, color: 'rgba(255,45,120,0.10)', delay: 2, duration: 10 },
  { x: '50%', y: '80%', size: 200, color: 'rgba(255,184,0,0.08)', delay: 4, duration: 9 },
  { x: '85%', y: '15%', size: 180, color: 'rgba(0,212,255,0.06)', delay: 1, duration: 11 },
  { x: '30%', y: '70%', size: 160, color: 'rgba(255,45,120,0.07)', delay: 3, duration: 7 },
];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark gradient background simulating neon-lit venue */}
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

      {/* Floating neon orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white text-glow-blue mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {t('hero.tagline')}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
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
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
