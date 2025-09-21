"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Confetti from 'react-dom-confetti';

const planetsData = [
    { name: 'Mercury', description: 'Smallest planet, closest to the Sun' },
    { name: 'Venus', description: 'Hottest planet, similar in size to Earth' },
    { name: 'Earth', description: 'Our home planet, has liquid water' },
    { name: 'Mars', description: 'The "Red Planet", has polar ice caps' },
    { name: 'Jupiter', description: 'Largest planet, has a Great Red Spot' },
];

type Item = {
    id: number;
    text: string;
    type: 'planet' | 'description';
    pairId: number;
};

const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function SciencePlanetsGame() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedPlanet, setSelectedPlanet] = useState<Item | null>(null);
    const [selectedDesc, setSelectedDesc] = useState<Item | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [incorrectPair, setIncorrectPair] = useState<[Item, Item] | null>(null);
    const [showWinDialog, setShowWinDialog] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        resetGame();
    }, []);

    const resetGame = () => {
        const planets = planetsData.map((p, i) => ({ id: i, text: p.name, type: 'planet' as const, pairId: i }));
        const descriptions = planetsData.map((p, i) => ({ id: i + planetsData.length, text: p.description, type: 'description' as const, pairId: i }));
        
        setItems(shuffleArray([...planets, ...descriptions]));
        setSelectedPlanet(null);
        setSelectedDesc(null);
        setMatchedPairs([]);
        setIncorrectPair(null);
        setShowWinDialog(false);
    };

    const handleItemClick = (item: Item) => {
        if (matchedPairs.includes(item.pairId)) return;

        if (item.type === 'planet') {
            setSelectedPlanet(item);
        } else {
            setSelectedDesc(item);
        }
    };

    useEffect(() => {
        if (selectedPlanet && selectedDesc) {
            if (selectedPlanet.pairId === selectedDesc.pairId) {
                setMatchedPairs(prev => [...prev, selectedPlanet.pairId]);
                setSelectedPlanet(null);
                setSelectedDesc(null);
            } else {
                setIncorrectPair([selectedPlanet, selectedDesc]);
                setTimeout(() => {
                    setIncorrectPair(null);
                    setSelectedPlanet(null);
                    setSelectedDesc(null);
                }, 1000);
            }
        }
    }, [selectedPlanet, selectedDesc]);

    useEffect(() => {
        if (matchedPairs.length > 0 && matchedPairs.length === planetsData.length) {
            setShowWinDialog(true);
        }
    }, [matchedPairs]);

    const getCardClass = (item: Item) => {
        if (matchedPairs.includes(item.pairId)) {
            return 'border-green-500 bg-green-100 dark:bg-green-900';
        }
        if (selectedPlanet?.id === item.id || selectedDesc?.id === item.id) {
            return 'border-primary ring-2 ring-primary';
        }
        if (incorrectPair && (incorrectPair[0].id === item.id || incorrectPair[1].id === item.id)) {
            return 'border-red-500 bg-red-100 dark:bg-red-900 animate-shake';
        }
        return 'border-border';
    };
    
    if (!isClient) {
        return null;
    }

    return (
        <div className="container py-12">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline">Planet Match</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Match the planets with their correct descriptions.
                </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map(item => (
                    <Card
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`p-4 h-32 flex items-center justify-center text-center cursor-pointer transition-all duration-300 ${getCardClass(item)}`}
                    >
                        <CardContent className="p-0">
                            <p className="font-medium">{item.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <Button onClick={resetGame}>Reset Game</Button>
            </div>
            
            <div className="flex justify-center">
                <Confetti active={showWinDialog} />
            </div>

            <AlertDialog open={showWinDialog} onOpenChange={setShowWinDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-headline text-center">Cosmic Achievement!</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            You've successfully matched all the planets.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-center p-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <AlertDialogFooter>
                        <Button onClick={resetGame} className="w-full">Play Again</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
