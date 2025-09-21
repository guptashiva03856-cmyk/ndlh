import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Gamepad2, ClipboardCheck, Bot } from "lucide-react";

export default function StudentPage() {
  const sections = [
    {
      href: "/student/lessons",
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Lessons",
      description: "Explore your subjects",
    },
    {
      href: "/student/games",
      icon: <Gamepad2 className="w-8 h-8 text-primary" />,
      title: "Games",
      description: "Learn through play",
    },
    {
      href: "/student/quizzes",
      icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
      title: "Quizzes",
      description: "Test your knowledge",
    },
     {
      href: "/student/chatbot",
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "AI Assistant",
      description: "Ask me anything!",
    },
  ];

  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Student Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Your learning adventure starts here!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <h2 className="text-2xl font-bold font-headline">Ready to Learn?</h2>
        <p className="text-muted-foreground mt-2">
          Select a section above to get started on your educational journey.
        </p>
      </div>
    </div>
  );
}