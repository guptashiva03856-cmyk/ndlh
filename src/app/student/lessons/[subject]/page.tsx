import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { lessonsBySubject, Lesson } from "@/lib/lessons";
import { BookOpen, Youtube } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function SubjectLessonsPage({ params }: { params: { subject: string } }) {
  const subjectName = Object.keys(lessonsBySubject).find(
    (key) => key.toLowerCase() === params.subject.toLowerCase()
  );

  if (!subjectName) {
    notFound();
  }

  const lessons = lessonsBySubject[subjectName];
  const capitalizedSubject = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);


  return (
    <div className="container py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <div>
                <h1 className="text-4xl font-bold font-headline">{capitalizedSubject} Lessons</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Select a lesson to start learning.
                </p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
            <Link href={`/student/lessons/${params.subject}/${lesson.id}`} key={lesson.id}>
                <Card className="h-full overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-xl group">
                    <div className="relative aspect-video">
                        <Image 
                            src={`https://img.youtube.com/vi/${lesson.videoId}/hqdefault.jpg`}
                            alt={lesson.title}
                            fill
                            className="object-cover"
                        />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                            <Youtube className="w-12 h-12 text-white/80 group-hover:text-white" />
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
