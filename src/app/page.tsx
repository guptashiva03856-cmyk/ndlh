import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Gamepad2, Award } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ImpactSection } from "@/components/landing/impact-section";
import { TeamSection } from "@/components/landing/team-section";
import { ContactSection } from "@/components/landing/contact-section";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

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
