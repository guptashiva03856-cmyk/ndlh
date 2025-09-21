"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, ConfirmationResult } from "firebase/auth";
import { auth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "@/lib/firebase";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail } from "lucide-react";


const emailFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const phoneFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number."}),
});

const otpFormSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});


export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showOtpForm, setShowOtpForm] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-signup', {
      'size': 'invisible',
    });
  }, []);

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  
  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { name: "", phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
  });

  async function onEmailSubmit(values: z.infer<typeof emailFormSchema>) {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Account Created",
        description: "Welcome to NDLH! You can now log in.",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Signup Error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please try a different email or log in.";
      }
      toast({
        title: "Sign-up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  async function onPhoneSubmit(values: z.infer<typeof phoneFormSchema>) {
    const appVerifier = window.recaptchaVerifier;
    try {
        const result = await signInWithPhoneNumber(auth, values.phone, appVerifier);
        setConfirmationResult(result);
        setShowOtpForm(true);
        toast({
            title: "OTP Sent",
            description: "Please check your phone for the verification code.",
        });
    } catch (error: any) {
        console.error("Phone Sign-Up Error: ", error);
        toast({
            title: "Phone Sign-Up Failed",
            description: "Could not send OTP. Please check the number and try again.",
            variant: "destructive",
        });
    }
  }

  async function onOtpSubmit(values: z.infer<typeof otpFormSchema>) {
    if (!confirmationResult) return;
    try {
        await confirmationResult.confirm(values.otp);
        toast({
            title: "Account Created",
            description: "Welcome to NDLH! You can now log in.",
        });
        router.push("/login");
    } catch (error) {
        console.error("OTP Error:", error);
        toast({
            title: "Sign-Up Failed",
            description: "Invalid OTP. Please try again.",
            variant: "destructive",
        });
    }
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Google Sign-In Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push("/student");
    } catch (error: any) {
      console.error("Google Sign-In Error: ", error);
      toast({
        title: "Google Sign-In Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
          <CardDescription>
            Choose how you'd like to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email"><Mail className="mr-2" />Email</TabsTrigger>
                    <TabsTrigger value="phone"><Phone className="mr-2" />Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                    <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={emailForm.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={emailForm.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={emailForm.formState.isSubmitting}>
                            {emailForm.formState.isSubmitting ? "Creating account..." : "Create an account"}
                        </Button>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="phone">
                    {!showOtpForm ? (
                        <Form {...phoneForm}>
                            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4 pt-4">
                                <FormField
                                    control={phoneForm.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={phoneForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="+91 12345 67890" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={phoneForm.formState.isSubmitting}>
                                    {phoneForm.formState.isSubmitting ? "Sending OTP..." : "Send OTP"}
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...otpForm}>
                            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 pt-4">
                                <FormField
                                    control={otpForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Verification Code</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter the 6-digit code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={otpForm.formState.isSubmitting}>
                                    {otpForm.formState.isSubmitting ? "Verifying..." : "Verify and Sign Up"}
                                </Button>
                                <Button variant="link" size="sm" onClick={() => setShowOtpForm(false)} className="w-full">
                                    Back to phone number
                                </Button>
                            </form>
                        </Form>
                    )}
                </TabsContent>
            </Tabs>
          
          <div id="recaptcha-container-signup"></div>

          <div className="relative my-4">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">OR</span>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            Sign up with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
