"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Confetti from 'react-dom-confetti';

const terms = [
    { word: 'Apple', definition: 'A fruit that grows on trees' },
    { word: 'Brave', definition: 'Ready to face and endure danger or pain' },
    { word: 'Shine', definition: 'Give out a bright light' },
    { word: 'Happy', definition: 'Feeling or showing pleasure or contentment' },
    { word: 'Ocean', definition: 'A very large expanse of sea' },
];

type Item = {
    id: number;
    text: string;
    type: 'word' | 'definition';
    pairId: number;
};

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
};

export default function EnglishMatchingGame() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedWord, setSelectedWord] = useState<Item | null>(null);
    const [selectedDef, setSelectedDef] = useState<Item | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [incorrectPair, setIncorrectPair] = useState<[Item, Item] | null>(null);
    const [showWinDialog, setShowWinDialog] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        resetGame();
    }, []);

    const resetGame = () => {
        const words = terms.map((t, i) => ({ id: i, text: t.word, type: 'word' as const, pairId: i }));
        const definitions = terms.map((t, i) => ({ id: i + terms.length, text: t.definition, type: 'definition' as const, pairId: i }));
        setItems(shuffleArray([...words, ...definitions]));
        setSelectedWord(null);
        setSelectedDef(null);
        setMatchedPairs([]);
        setIncorrectPair(null);
        setShowWinDialog(false);
    };

    const handleItemClick = (item: Item) => {
        if (matchedPairs.includes(item.pairId)) return;

        if (item.type === 'word') {
            setSelectedWord(item);
        } else {
            setSelectedDef(item);
        }
    };

    useEffect(() => {
        if (selectedWord && selectedDef) {
            if (selectedWord.pairId === selectedDef.pairId) {
                setMatchedPairs(prev => [...prev, selectedWord.pairId]);
                setSelectedWord(null);
                setSelectedDef(null);
            } else {
                setIncorrectPair([selectedWord, selectedDef]);
                setTimeout(() => {
                    setIncorrectPair(null);
                    setSelectedWord(null);
                    setSelectedDef(null);
                }, 1000);
            }
        }
    }, [selectedWord, selectedDef]);

    useEffect(() => {
        if (matchedPairs.length === terms.length && terms.length > 0) {
            setShowWinDialog(true);
        }
    }, [matchedPairs]);

    const getCardClass = (item: Item) => {
        if (matchedPairs.includes(item.pairId)) {
            return 'border-green-500 bg-green-100 dark:bg-green-900';
        }
        if (selectedWord?.id === item.id || selectedDef?.id === item.id) {
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
                <h1 className="text-4xl font-bold font-headline">English Vocabulary Match</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Match the words with their correct definitions.
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
                        <AlertDialogTitle className="text-2xl font-headline text-center">Congratulations!</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            You've successfully matched all the pairs.
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
