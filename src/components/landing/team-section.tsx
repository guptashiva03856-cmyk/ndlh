import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  { name: "Anjali Kaur", role: "Project Lead & Educator", imageId: "team-member-1" },
  { name: "Vikram Singh", role: "Lead Developer", imageId: "team-member-2" },
  { name: "Priya Sharma", role: "UI/UX Designer", imageId: "team-member-3" },
  { name: "Rohan Kumar", role: "Community Outreach", imageId: "team-member-4" },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Meet the Team
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            The passionate individuals dedicated to revolutionizing rural education.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find(img => img.id === member.imageId);
            return (
              <Card key={member.name} className="text-center p-6 border-0 shadow-lg">
                <CardContent className="flex flex-col items-center p-0">
                  <Avatar className="w-24 h-24 mb-4">
                    {memberImage && (
                      <AvatarImage 
                        src={memberImage.imageUrl} 
                        alt={`Portrait of ${member.name}`}
                        data-ai-hint={memberImage.imageHint}
                      />
                    )}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold font-headline">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
