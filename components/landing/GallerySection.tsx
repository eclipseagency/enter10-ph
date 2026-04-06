'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const placeholders = [
  { gradient: 'from-[#00D4FF]/20 to-transparent', label: 'Bowling Lanes' },
  { gradient: 'from-[#FF2D78]/20 to-transparent', label: 'Arcade Zone' },
  { gradient: 'from-[#FFB800]/20 to-transparent', label: 'Billiards Lounge' },
  { gradient: 'from-[#FF2D78]/15 to-[#00D4FF]/10', label: 'Night Vibes' },
  { gradient: 'from-[#00D4FF]/15 to-[#FFB800]/10', label: 'Air Hockey' },
  { gradient: 'from-[#FFB800]/15 to-[#FF2D78]/10', label: 'Food & Drinks' },
];

export default function GallerySection() {
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="gallery">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            >
              {/* Dark gradient placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                style={{ backgroundColor: '#141414' }}
              />

              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <span className="text-white text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
