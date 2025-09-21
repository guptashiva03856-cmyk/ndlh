import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function LessonsPage() {
  return (
    <div className="container py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <div>
                <h1 className="text-4xl font-bold font-headline">Lessons</h1>
                <p className="text-xl text-muted-foreground mt-2">
                Browse through your subjects to start learning.
                </p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Mathematics', 'Science', 'English', 'Punjabi', 'History', 'Geography'].map(subject => (
            <Card key={subject} className="flex flex-col items-center justify-center p-6 text-center transition-transform hover:-translate-y-2 hover:shadow-xl">
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl">{subject}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Lessons are coming soon!</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}