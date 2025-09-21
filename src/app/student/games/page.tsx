import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

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
      <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold font-headline">Games are being developed!</h2>
        <p className="text-muted-foreground mt-2">
          Check back soon for fun and interactive ways to learn.
        </p>
      </div>
    </div>
  );
}