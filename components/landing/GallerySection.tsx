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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
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
