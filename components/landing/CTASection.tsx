'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function CTASection() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,212,255,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(255,45,120,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,184,0,0.06) 0%, transparent 50%)',
            'linear-gradient(180deg, #0A0A0A 0%, #0d0d1a 40%, #100d18 60%, #0A0A0A 100%)',
          ].join(', '),
        }}
      />

      {/* Neon glow decorations */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,45,120,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-glow-blue mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('cta.title')}
        </motion.h2>

        <motion.p
          className="text-lg text-text-muted max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('cta.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/booking">
            <Button variant="primary" size="lg">
              {t('cta.button')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
