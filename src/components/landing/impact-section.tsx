import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

const impactPoints = [
  "Bridging the urban-rural education gap.",
  "Making quality learning accessible to all.",
  "Boosting student engagement with gamification.",
  "Empowering teachers with digital tools.",
];

export function ImpactSection() {
  const impactImage = PlaceHolderImages.find((img) => img.id === "impact-image");

  return (
    <section id="impact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Transforming Rural Education
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our mission is to provide every student in rural India with the
              tools and resources they need to build a brighter future. We
              believe in the power of digital learning to unlock potential.
            </p>
            <ul className="space-y-4">
              {impactPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden shadow-lg">
                {impactImage && (
                    <Image
                    src={impactImage.imageUrl}
                    alt={impactImage.description}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    data-ai-hint={impactImage.imageHint}
                    />
                )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
