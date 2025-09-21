import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Gamepad2, ClipboardCheck, Award, Bot, Languages } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: "Engaging Lessons",
    description: "Access curated lessons from YouTube in Math, Science, English, and more.",
  },
  {
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    title: "Interactive Games",
    description: "Learn through play with fun games connected to lesson topics.",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    title: "Quizzes & Progress",
    description: "Test your knowledge with interactive quizzes and track your learning journey.",
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Gamified Rewards",
    description: "Earn stars, badges, and climb the leaderboard as you complete activities.",
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "AI Chatbot Assistant",
    description: "Get instant help and explanations from our friendly AI assistant.",
  },
  {
    icon: <Languages className="w-8 h-8 text-primary" />,
    title: "Punjabi & English",
    description: "All content is available in both English and Punjabi for easy learning.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            A Complete Learning Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Everything students and teachers need to succeed, all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 transition-transform hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                {feature.icon}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2">
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
