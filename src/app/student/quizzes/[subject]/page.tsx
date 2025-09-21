import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { quizzesBySubject } from "@/lib/quizzes";
import { ClipboardCheck, School, Pencil, FlaskConical, Globe, History, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

const subjectIcons: { [key: string]: React.ReactNode } = {
    'Mathematics': <School className="w-10 h-10 text-primary" />,
    'Science': <FlaskConical className="w-10 h-10 text-primary" />,
    'English': <Pencil className="w-10 h-10 text-primary" />,
    'Punjabi': <BookOpen className="w-10 h-10 text-primary" />,
    'History': <History className="w-10 h-10 text-primary" />,
    'Geography': <Globe className="w-10 h-10 text-primary" />,
};


export default function SubjectQuizzesPage({ params }: { params: { subject: string } }) {
  const subjectName = Object.keys(quizzesBySubject).find(
    (key) => key.toLowerCase() === params.subject.toLowerCase()
  );

  if (!subjectName) {
    notFound();
  }

  const quizzes = quizzesBySubject[subjectName];
  const capitalizedSubject = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);


  return (
    <div className="container py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
            {subjectIcons[capitalizedSubject] || <ClipboardCheck className="w-10 h-10 text-primary" />}
            <div>
                <h1 className="text-4xl font-bold font-headline">{capitalizedSubject} Quizzes</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Select a quiz to start testing your knowledge.
                </p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
            <Link href={`/student/quizzes/${params.subject}/${quiz.id}`} key={quiz.id}>
                <Card className="h-full overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-xl group p-6 flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.questions.length} Questions</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
       {quizzes.length === 0 && (
         <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold font-headline">No quizzes available for {capitalizedSubject} yet.</h2>
            <p className="text-muted-foreground mt-2">
              Please check back later!
            </p>
        </div>
      )}
    </div>
  );
}
