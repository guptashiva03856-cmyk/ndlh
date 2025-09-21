import { lessonsBySubject, Lesson } from "@/lib/lessons";
import { notFound } from "next/navigation";
import { BookOpen, Youtube, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LessonPage({ params }: { params: { subject: string, lessonId: string } }) {
  const subjectName = Object.keys(lessonsBySubject).find(
    (key) => key.toLowerCase() === params.subject.toLowerCase()
  );

  if (!subjectName) {
    notFound();
  }

  const lesson = lessonsBySubject[subjectName].find(l => l.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  const capitalizedSubject = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

  return (
    <div className="container py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
            <Youtube className="w-10 h-10 text-primary" />
            <div>
                <p className="text-lg text-muted-foreground">{capitalizedSubject}</p>
                <h1 className="text-4xl font-bold font-headline">{lesson.title}</h1>
            </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="aspect-video rounded-lg overflow-hidden border shadow-lg">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${lesson.videoId}`}
                    title={lesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
             <Card className="mt-6">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold font-headline mb-4">Lesson Description</h2>
                    <p className="text-muted-foreground">{lesson.description}</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="bg-muted/50">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-6 h-6 text-primary"/>
                        <h2 className="text-xl font-bold font-headline">Key Takeaways</h2>
                    </div>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                       {lesson.keyTakeaways.map((takeaway, index) => (
                           <li key={index}>{takeaway}</li>
                       ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
