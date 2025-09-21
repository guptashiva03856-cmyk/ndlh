"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Confetti from 'react-dom-confetti';
import { useToast } from "@/hooks/use-toast";

const generateSequence = () => {
    const start = Math.floor(Math.random() * 10) + 1;
    const diff = Math.floor(Math.random() * 5) + 1;
    const sequence = Array.from({ length: 5 }, (_, i) => start + i * diff);
    const missingIndex = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const answer = sequence[missingIndex];
    sequence[missingIndex] = null;
    return { sequence, answer };
};


export default function MathSequenceGame() {
    const { toast } = useToast();
    const [sequenceData, setSequenceData] = useState(generateSequence());
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showWinDialog, setShowWinDialog] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCheck = () => {
        const isAnswerCorrect = parseInt(userAnswer) === sequenceData.answer;
        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            setScore(s => s + 1);
            toast({
                title: "Correct!",
                description: "You found the missing number!",
            });
            setTimeout(() => {
                nextQuestion();
            }, 1000);
        } else {
            toast({
                title: "Incorrect",
                description: "Try again!",
                variant: "destructive"
            });
        }
    };
    
    const nextQuestion = () => {
        setSequenceData(generateSequence());
        setUserAnswer('');
        setIsCorrect(null);
    }
    
    const resetGame = () => {
        setScore(0);
        nextQuestion();
        setShowWinDialog(false);
    }

    useEffect(() => {
        if (score === 5) {
            setShowWinDialog(true);
        }
    }, [score]);
    
    if (!isClient) {
        return null;
    }

    return (
        <div className="container py-12">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline">Math Sequence</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Find the missing number in the sequence.
                </p>
                <p className="text-2xl font-bold mt-4">Score: {score}</p>
            </header>

            <Card className="max-w-2xl mx-auto p-8">
                <CardContent className="flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center justify-center gap-4">
                        {sequenceData.sequence.map((num, index) =>
                            num !== null ? (
                                <div key={index} className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center text-3xl font-bold">
                                    {num}
                                </div>
                            ) : (
                                <Input
                                    key={index}
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className={`w-24 h-24 text-3xl font-bold text-center ${isCorrect === false ? 'border-red-500 animate-shake' : ''} ${isCorrect === true ? 'border-green-500' : ''}`}
                                    placeholder="?"
                                />
                            )
                        )}
                    </div>
                    <Button onClick={handleCheck} size="lg">Check Answer</Button>
                </CardContent>
            </Card>

            <div className="mt-8 flex justify-center">
                <Button onClick={resetGame} variant="outline">Reset Game</Button>
            </div>
            
            <div className="flex justify-center">
                <Confetti active={showWinDialog} />
            </div>

            <AlertDialog open={showWinDialog} onOpenChange={setShowWinDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-headline text-center">Excellent Work!</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            You've completed the challenge.
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
