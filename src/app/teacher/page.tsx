import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, FilePenLine, BarChart3 } from "lucide-react";

export default function TeacherPage() {
  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Teacher Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Manage your classes and empower your students.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <UploadCloud className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Upload Lessons</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <FilePenLine className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Assign Quizzes</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">View Reports</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

       <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold font-headline">Dashboard is Under Construction</h2>
        <p className="text-muted-foreground mt-2">
          Powerful tools for teachers are being built. Check back soon!
        </p>
      </div>
    </div>
  );
}
