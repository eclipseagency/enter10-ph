'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const placeholders = [
  { gradient: 'from-neon-blue/20 to-transparent', label: 'Bowling Lanes' },
  { gradient: 'from-neon-magenta/20 to-transparent', label: 'Arcade Zone' },
  { gradient: 'from-neon-gold/20 to-transparent', label: 'Billiards Lounge' },
  { gradient: 'from-neon-magenta/15 to-neon-blue/10', label: 'Night Vibes' },
  { gradient: 'from-neon-blue/15 to-neon-gold/10', label: 'Air Hockey' },
  { gradient: 'from-neon-gold/15 to-neon-magenta/10', label: 'Food & Drinks' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function GallerySection() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="gallery">
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
            {t('gallery.title')}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholders.map((item, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: '4/3' }}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
            >
              {/* Dark gradient placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} bg-bg-card`}
              />

              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }} />

              {/* Hover zoom overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.label}
                </span>
              </div>

              {/* Hover scale effect on the gradient background */}
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} bg-bg-card`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
