'use client';

import { useI18n } from '@/lib/i18n';

const placeholders = [
  { color1: 'rgba(0,212,255,0.2)', color2: 'transparent', label: 'Bowling Lanes' },
  { color1: 'rgba(255,45,120,0.2)', color2: 'transparent', label: 'Arcade Zone' },
  { color1: 'rgba(255,184,0,0.2)', color2: 'transparent', label: 'Billiards Lounge' },
  { color1: 'rgba(255,45,120,0.15)', color2: 'rgba(0,212,255,0.1)', label: 'Night Vibes' },
  { color1: 'rgba(0,212,255,0.15)', color2: 'rgba(255,184,0,0.1)', label: 'Air Hockey' },
  { color1: 'rgba(255,184,0,0.15)', color2: 'rgba(255,45,120,0.1)', label: 'Food & Drinks' },
];

export default function GallerySection() {
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{ aspectRatio: '4/3' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2}), #141414` }}
              />
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <span className="text-white text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
