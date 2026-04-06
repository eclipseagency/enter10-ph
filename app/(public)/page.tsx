import Hero from '@/components/landing/Hero';
import ActivitiesSection from '@/components/landing/ActivitiesSection';
import PackagesSection from '@/components/landing/PackagesSection';
import GallerySection from '@/components/landing/GallerySection';
import CTASection from '@/components/landing/CTASection';

export const metadata = {
  title: 'Enter10 Philippines | Play. Eat. Celebrate.',
  description:
    'Your all-in-one entertainment destination at Venice Grand Canal Mall, Taguig. Bowling, billiards, arcade, air hockey, and more.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActivitiesSection />
      <PackagesSection />
      <GallerySection />
      <CTASection />
    </>
  );
}
