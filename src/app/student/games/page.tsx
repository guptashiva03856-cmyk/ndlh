import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

const games = [
    {
        title: "English Vocabulary Match",
        description: "Match the words with their meanings.",
        href: "/student/games/english-matching",
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
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
            <Link href={game.href} key={game.title}>
                <Card className="flex flex-col items-center justify-center p-6 text-center transition-transform hover:-translate-y-2 hover:shadow-xl h-full">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{game.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
