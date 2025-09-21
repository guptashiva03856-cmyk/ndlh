import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Gamepad2, Award } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white text-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="relative z-10 p-4 drop-shadow-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline mb-4 tracking-tight">
            Welcome to the Learning Hub
          </h1>
          <p className="text-lg md:text-2xl max-w-4xl mx-auto mb-8 text-slate-100">
            Discover a world of knowledge through fun lessons, exciting games,
            and challenging quizzes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/student">Start Learning Now</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6"
            >
              <Link href="/login">Teacher & Parent Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-primary" />}
              title="Engaging Lessons"
              description="Explore video lessons across all your school subjects."
              href="/student/lessons"
            />
            <FeatureCard
              icon={<Gamepad2 className="w-10 h-10 text-primary" />}
              title="Fun & Games"
              description="Play interactive games that make learning enjoyable."
              href="/student/games"
            />
            <FeatureCard
              icon={<Award className="w-10 h-10 text-primary" />}
              title="Test Your Skills"
              description="Take quizzes to master topics and earn rewards."
              href="/student/quizzes"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full text-center p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary border-2 border-transparent hover:-translate-y-2">
        <CardHeader className="flex items-center justify-center p-0">
          <div className="mb-5 bg-primary/10 p-4 rounded-full">{icon}</div>
          <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 p-0">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
