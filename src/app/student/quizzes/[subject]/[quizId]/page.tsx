"use client";

import { useState } from "react";
import { quizzesBySubject, Question } from "@/lib/quizzes";
import { notFound, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Award, RotateCw } from "lucide-react";
import Confetti from 'react-dom-confetti';

export default function QuizPage({ params }: { params: { subject: string, quizId: string } }) {
  const router = useRouter();
  const subjectName = Object.keys(quizzesBySubject).find(
    (key) => key.toLowerCase() === params.subject.toLowerCase()
  );

  if (!subjectName) notFound();

  const quiz = quizzesBySubject[subjectName].find(q => q.id === params.quizId);

  if (!quiz) notFound();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const calculateScore = () => {
      return quiz.questions.reduce((score, question, index) => {
          return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
      }, 0);
  }

  const score = calculateScore();

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  }

  if (isFinished) {
    const isWinner = score / quiz.questions.length >= 0.8;
    return (
        <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
             <Confetti active={isWinner} config={{
                angle: 90,
                spread: 360,
                startVelocity: 40,
                elementCount: 100,
                decay: 0.9,
             }} />
            <Card className="w-full max-w-2xl text-center p-8">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Award className="w-16 h-16 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline">Quiz Complete!</CardTitle>
                    <CardDescription className="text-xl">You scored</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold my-4">{score} <span className="text-3xl text-muted-foreground">/ {quiz.questions.length}</span></p>
                    <div className="flex gap-4 mt-8 justify-center">
                        <Button onClick={restartQuiz}><RotateCw className="mr-2"/> Try Again</Button>
                        <Button variant="outline" onClick={() => router.push('/student/quizzes')}>
                           Choose Another Quiz
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <p className="text-primary font-semibold">{quiz.title}</p>
          <h1 className="text-3xl font-bold font-headline">Question {currentQuestionIndex + 1} of {quiz.questions.length}</h1>
        </header>

        <Progress value={progress} className="mb-8" />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion.questionText}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
                onValueChange={handleSelectAnswer} 
                value={selectedAnswers[currentQuestionIndex]}
                className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <Label key={index} className="flex items-center gap-4 p-4 rounded-md border has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer text-lg">
                  <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                  {option}
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end">
            <Button 
                onClick={handleNext} 
                disabled={!selectedAnswers[currentQuestionIndex]}
                size="lg"
            >
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
        </div>
      </div>
    </div>
  );
}
