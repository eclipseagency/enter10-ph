import Hero from '@/components/landing/Hero';
import ActivitiesSection from '@/components/landing/ActivitiesSection';
import PackagesSection from '@/components/landing/PackagesSection';
import GallerySection from '@/components/landing/GallerySection';
import CTASection from '@/components/landing/CTASection';

export const metadata = {
  title: 'Play. Eat. Celebrate.',
  description:
    'Enter10 Philippines — your all-in-one entertainment destination at Venice Grand Canal Mall, Taguig. Bowling, billiards, arcade, air hockey, dining & VIP rooms.',
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="relative z-10" style={{ backgroundColor: '#0A0A0A' }}>
        <ActivitiesSection />
        <PackagesSection />
        <GallerySection />
        <CTASection />
      </div>
    </div>
  );
}
