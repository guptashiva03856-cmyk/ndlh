import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, School, Pencil, FlaskConical, Globe, History } from "lucide-react";
import { lessonsBySubject } from "@/lib/lessons";

const subjectIcons: { [key: string]: React.ReactNode } = {
    'Mathematics': <School className="w-8 h-8" />,
    'Science': <FlaskConical className="w-8 h-8" />,
    'English': <Pencil className="w-8 h-8" />,
    'Punjabi': <BookOpen className="w-8 h-8" />,
    'History': <History className="w-8 h-8" />,
    'Geography': <Globe className="w-8 h-8" />,
};

export default function LessonsPage() {
    const subjects = Object.keys(lessonsBySubject);

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
                {subjects.map(subject => (
                     <Link href={`/student/lessons/${subject.toLowerCase()}`} key={subject}>
                        <Card className="flex flex-col items-center justify-center p-6 text-center transition-transform hover:-translate-y-2 hover:shadow-xl h-full">
                            <div className="mb-4 text-primary">
                                {subjectIcons[subject] || <BookOpen className="w-8 h-8" />}
                            </div>
                            <CardHeader className="p-0">
                                <CardTitle className="font-headline text-2xl">{subject}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground">{lessonsBySubject[subject].length} lessons available</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
