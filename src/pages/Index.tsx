import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
import VenueSection from '@/components/sections/VenueSection';
import CountdownSection from '@/components/sections/CountdownSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Index() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* SEO optimized structure */}
      <HeroSection />
      <TrustSection />
      <VenueSection />
      <CountdownSection />
      <CTASection />
      <Footer />
    </main>
  );
}
