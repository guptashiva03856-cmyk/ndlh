"use client"

import { BarChart3, Users, CheckCircle, TrendingUp, BookOpen, Gamepad2, ClipboardCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"


const overallStats = [
    { title: "Total Students", value: "120", icon: <Users /> },
    { title: "Avg. Quiz Score", value: "78%", icon: <CheckCircle /> },
    { title: "Lessons Completed", value: "850", icon: <BookOpen /> },
    { title: "Games Played", value: "1,230", icon: <Gamepad2 /> },
];

const studentProgress = [
    { name: "Aarav Sharma", progress: 85, lastActivity: "Quiz: Algebra Basics" },
    { name: "Bhavna Kaur", progress: 92, lastActivity: "Lesson: Solar System" },
    { name: "Chetan Singh", progress: 72, lastActivity: "Game: Vocabulary Match" },
    { name: "Diya Verma", progress: 65, lastActivity: "Quiz: Simple Addition" },
    { name: "Eshan Gupta", progress: 88, lastActivity: "Lesson: Sentence Structure" },
];

const chartData = [
  { subject: 'Math', "Avg Score": 82 },
  { subject: 'Science', "Avg Score": 75 },
  { subject: 'English', "Avg Score": 88 },
  { subject: 'History', "Avg Score": 70 },
];

const chartConfig = {
  "Avg Score": {
    label: "Average Score",
    color: "hsl(var(--primary))",
  },
}

export default function ReportsPage() {
    return (
        <div className="container py-12">
            <header className="mb-8">
                <div className="flex items-center gap-4">
                    <BarChart3 className="w-10 h-10 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold font-headline">Student Reports</h1>
                        <p className="text-xl text-muted-foreground mt-2">
                            An overview of student engagement and performance.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {overallStats.map(stat => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className="text-muted-foreground">{stat.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Student Progress</CardTitle>
                        <CardDescription>Individual student performance and activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead className="w-[150px]">Progress</TableHead>
                                    <TableHead>Last Activity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentProgress.map(student => (
                                    <TableRow key={student.name}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={student.progress} className="h-2" />
                                                <span>{student.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{student.lastActivity}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Performance by Subject</CardTitle>
                        <CardDescription>Average quiz scores across different subjects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={chartConfig} className="w-full h-[300px]">
                            <ResponsiveContainer>
                                <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="subject" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Legend content={<ChartLegendContent />} />
                                    <Bar dataKey="Avg Score" fill="var(--color-Avg Score)" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
