import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, School, Pencil, FlaskConical, Globe, History, BookOpen } from "lucide-react";
import { quizzesBySubject } from "@/lib/quizzes";

const subjectIcons: { [key: string]: React.ReactNode } = {
    'Mathematics': <School className="w-8 h-8" />,
    'Science': <FlaskConical className="w-8 h-8" />,
    'English': <Pencil className="w-8 h-8" />,
    'Punjabi': <BookOpen className="w-8 h-8" />,
    'History': <History className="w-8 h-8" />,
    'Geography': <Globe className="w-8 h-8" />,
};

export default function QuizzesPage() {
    const subjects = Object.keys(quizzesBySubject).filter(subject => quizzesBySubject[subject].length > 0);

    return (
        <div className="container py-12">
            <header className="mb-8">
                <div className="flex items-center gap-4">
                    <ClipboardCheck className="w-10 h-10 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold font-headline">Quizzes</h1>
                        <p className="text-xl text-muted-foreground mt-2">
                            Select a subject to test your knowledge.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map(subject => (
                     <Link href={`/student/quizzes/${subject.toLowerCase()}`} key={subject}>
                        <Card className="flex flex-col items-center justify-center p-6 text-center transition-transform hover:-translate-y-2 hover:shadow-xl h-full">
                            <div className="mb-4 text-primary">
                                {subjectIcons[subject] || <ClipboardCheck className="w-8 h-8" />}
                            </div>
                            <CardHeader className="p-0">
                                <CardTitle className="font-headline text-2xl">{subject}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground">{quizzesBySubject[subject].length} {quizzesBySubject[subject].length === 1 ? 'quiz' : 'quizzes'} available</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
             {subjects.length === 0 && (
                 <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold font-headline">Quizzes are being prepared!</h2>
                    <p className="text-muted-foreground mt-2">
                      Get ready to challenge yourself. New quizzes are on their way.
                    </p>
                </div>
            )}
        </div>
    );
}
