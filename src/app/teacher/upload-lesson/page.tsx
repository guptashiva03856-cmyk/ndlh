"use client";

import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { lessonsBySubject } from "@/lib/lessons";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  videoId: z.string().min(11, { message: "Please enter a valid YouTube video ID." }),
  subject: z.string({ required_error: "Please select a subject." }),
  keyTakeaways: z.string().min(10, { message: "Please list at least one key takeaway." }),
});

export default function UploadLessonPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoId: "",
      keyTakeaways: "",
    },
  });
  
  const subjects = Object.keys(lessonsBySubject);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Lesson Uploaded!",
      description: "The new lesson has been added to the curriculum.",
    });
    form.reset();
  }

  return (
    <div className="container py-12">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <UploadCloud className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-3xl font-bold font-headline">Upload New Lesson</CardTitle>
                        <CardDescription>Fill out the form to add a new video lesson.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lesson Title</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., Introduction to Algebra" {...field} />
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
                                    <FormLabel>Subject</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="videoId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>YouTube Video ID</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., hq3yfQnllfQ" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Briefly describe what this lesson is about." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="keyTakeaways"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key Takeaways</FormLabel>
                                <FormControl>
                                <Textarea placeholder="List the key learning points, separated by commas." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg">Upload Lesson</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
