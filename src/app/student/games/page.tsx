import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Pencil, FlaskConical, Calculator } from "lucide-react";

const games = [
    {
        title: "English Vocabulary Match",
        description: "Match the words with their meanings.",
        href: "/student/games/english-matching",
        icon: <Pencil className="w-12 h-12 text-primary" />,
    },
    {
        title: "Math Sequence",
        description: "Find the missing number in the sequence.",
        href: "/student/games/math-sequence",
        icon: <Calculator className="w-12 h-12 text-primary" />,
    },
    {
        title: "Planet Match",
        description: "Match planets to their descriptions.",
        href: "/student/games/science-planets",
        icon: <FlaskConical className="w-12 h-12 text-primary" />,
    }
]

export default function GamesPage() {
  return (
    <div className="container py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <Gamepad2 className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold font-headline">Games</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Have fun while you learn with these exciting games.
            </p>
          </div>
        </div>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map(game => (
            <Link href={game.href} key={game.title} className="group">
                <Card className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:shadow-xl h-full border-2 border-transparent group-hover:border-primary group-hover:-translate-y-2">
                    <CardHeader className="p-0">
                         <div className="mb-4">
                            {game.icon}
                        </div>
                        <CardTitle className="font-headline text-2xl">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                        <p className="text-muted-foreground">{game.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
