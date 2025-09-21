import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div className="container py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <ClipboardCheck className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold font-headline">Quizzes</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Test your knowledge and see how much you've learned.
            </p>
          </div>
        </div>
      </header>
       <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold font-headline">Quizzes are being prepared!</h2>
        <p className="text-muted-foreground mt-2">
          Get ready to challenge yourself. New quizzes are on their way.
        </p>
      </div>
    </div>
  );
}