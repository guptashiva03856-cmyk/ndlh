import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Gamepad2, ClipboardCheck } from "lucide-react";

export default function StudentPage() {
  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Student Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Your learning adventure starts here!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Lessons</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Games</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <ClipboardCheck className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Quizzes</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold font-headline">Content is on the way!</h2>
        <p className="text-muted-foreground mt-2">
          We are working hard to bring you exciting lessons and activities.
        </p>
      </div>
    </div>
  );
}
