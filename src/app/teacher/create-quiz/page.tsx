"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FilePenLine, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quizzesBySubject } from "@/lib/quizzes";
import { Separator } from "@/components/ui/separator";

const questionSchema = z.object({
  questionText: z.string().min(5, "Question must be at least 5 characters."),
  options: z.array(z.string().min(1, "Option cannot be empty.")).length(4, "Please provide 4 options."),
  correctAnswer: z.string().min(1, "Correct answer cannot be empty."),
});

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  subject: z.string({ required_error: "Please select a subject." }),
  questions: z.array(questionSchema).min(1, "Please add at least one question."),
});

export default function CreateQuizPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      questions: [{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });
  
  const subjects = Object.keys(quizzesBySubject);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Quiz Created!",
      description: "The new quiz is now available for students.",
    });
    form.reset();
  }

  return (
    <div className="container py-12">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <FilePenLine className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-3xl font-bold font-headline">Create New Quiz</CardTitle>
                        <CardDescription>Build a new quiz to test your students' knowledge.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Quiz Title</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Algebra Basics Quiz" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold">Subject</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {subjects.map(subject => (
                                                    <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-xl font-bold mb-4">Questions</h3>
                            {fields.map((field, index) => (
                                <Card key={field.id} className="p-6 mb-6 bg-muted/30">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">Question {index + 1}</h4>
                                            {fields.length > 1 && (
                                                <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                         <FormField
                                            control={form.control}
                                            name={`questions.${index}.questionText`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Question Text</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            {[0, 1, 2, 3].map(optionIndex => (
                                                 <FormField
                                                    key={optionIndex}
                                                    control={form.control}
                                                    name={`questions.${index}.options.${optionIndex}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Option {optionIndex + 1}</FormLabel>
                                                            <FormControl><Input {...field} /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                         <FormField
                                            control={form.control}
                                            name={`questions.${index}.correctAnswer`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Correct Answer</FormLabel>
                                                    <FormControl><Input placeholder="Copy the correct option text here" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </Card>
                            ))}
                             <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ questionText: "", options: ["", "", "", ""], correctAnswer: "" })}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                            </Button>
                        </div>
                        
                        <Button type="submit" size="lg">Create Quiz</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
