import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-headline',
});


export const metadata: Metadata = {
  title: 'Nabha Digital Learning Hub',
  description: 'A progressive web app for rural schools, empowering students with digital education.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-headline antialiased',
          onest.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
