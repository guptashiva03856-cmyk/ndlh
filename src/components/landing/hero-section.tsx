import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
          Empowering Rural Education Through Technology
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200">
          The Nabha Digital Learning Hub brings quality education to every child
          with engaging lessons, interactive games, and AI-powered support.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/student">Explore Lessons</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">Teacher Login</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
