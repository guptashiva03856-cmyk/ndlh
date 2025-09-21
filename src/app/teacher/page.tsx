import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, FilePenLine, BarChart3 } from "lucide-react";

export default function TeacherPage() {
  const sections = [
    {
      href: "/teacher/upload-lesson",
      icon: <UploadCloud className="w-8 h-8 text-primary" />,
      title: "Upload Lessons",
      description: "Share new educational content",
    },
    {
      href: "/teacher/create-quiz",
      icon: <FilePenLine className="w-8 h-8 text-primary" />,
      title: "Create Quizzes",
      description: "Design and assign quizzes",
    },
    {
      href: "/teacher/reports",
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "View Reports",
      description: "Track student progress",
    },
  ];

  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Teacher Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Manage your classes and empower your students.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link href={section.href} key={section.title}>
            <Card className="h-full transition-transform hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {section.icon}
                  <div>
                    <CardTitle className="font-headline">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
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
