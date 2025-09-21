import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { ImpactSection } from '@/components/landing/impact-section';
import { TeamSection } from '@/components/landing/team-section';
import { ContactSection } from '@/components/landing/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}
