"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, ConfirmationResult } from "firebase/auth";
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
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const phoneFormSchema = z.object({
    phone: z.string().min(10, { message: "Please enter a valid phone number."}),
});

const otpFormSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showOtpForm, setShowOtpForm] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
    });
  }, []);

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
  });


  async function onEmailSubmit(values: z.infer<typeof emailFormSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push("/student");
    } catch (error: any) {
      console.error("Login Error: ", error);
      let errorMessage = "An unknown error occurred.";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  async function onPhoneSubmit(values: z.infer<typeof phoneFormSchema>) {
    const appVerifier = window.recaptchaVerifier;
    // Ensure phone number is in E.164 format
    const phoneNumber = values.phone.startsWith('+') ? values.phone : `+91${values.phone}`;
    try {
        const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(result);
        setShowOtpForm(true);
        toast({
            title: "OTP Sent",
            description: "Please check your phone for the verification code.",
        });
    } catch (error: any) {
        console.error("Phone Sign-In Error: ", error);
        toast({
            title: "Phone Sign-In Failed",
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
            title: "Login Successful",
            description: "Redirecting to your dashboard...",
        });
        router.push("/student");
    } catch (error) {
        console.error("OTP Error:", error);
        toast({
            title: "Login Failed",
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
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        console.log("Google Sign-In cancelled by user.");
        return;
      }
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
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Choose your login method
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
                            <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                            <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                            </div>
                            <FormControl>
                            <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={emailForm.formState.isSubmitting}>
                        {emailForm.formState.isSubmitting ? "Logging in..." : "Login"}
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
                                {otpForm.formState.isSubmitting ? "Verifying..." : "Verify and Login"}
                            </Button>
                             <Button variant="link" size="sm" onClick={() => setShowOtpForm(false)} className="w-full">
                                Back to phone number
                            </Button>
                        </form>
                    </Form>
                 )}
            </TabsContent>
          </Tabs>

          <div id="recaptcha-container"></div>

          <div className="relative my-4">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">OR</span>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            Login with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
