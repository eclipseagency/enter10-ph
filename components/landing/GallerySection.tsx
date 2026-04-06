'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

const galleryImages = [
  { src: '/images/bowling.jpg', label: 'Bowling Lanes' },
  { src: '/images/lounge.jpg', label: 'Craft Cocktails' },
  { src: '/images/billiards.jpg', label: 'Billiards Lounge' },
  { src: '/images/vip.jpg', label: 'VIP Room' },
  { src: '/images/venue.jpg', label: 'Enter10 Venue' },
  { src: '/images/food.jpg', label: 'Food & Bites' },
];

export default function GallerySection() {
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4" style={{ letterSpacing: '-0.03em' }}>
            {t('gallery.title')}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#b3b3b3' }}>
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[rgba(0,0,0,0.4)_0px_12px_32px] ${
                i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '16/9' : '4/3', borderRadius: '16px' }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes={i === 0 ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex items-end overflow-hidden">
                <span className="text-white text-sm font-medium tracking-wide p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
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
