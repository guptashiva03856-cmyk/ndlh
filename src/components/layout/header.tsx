"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, School } from "lucide-react";

const navLinks = [
  { href: "/student", label: "Student" },
  { href: "/teacher", label: "Teacher" },
];

function AuthButtons() {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </>
    );
}

function NavLinks() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
      setIsMounted(true);
  }, []);

  if (!isMounted) {
      // Render placeholder or nothing on the server
      return (
        <div className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
                <span key={link.href} className="text-muted-foreground">{link.label}</span>
            ))}
        </div>
      );
  }

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors hover:text-primary",
            pathname.startsWith(link.href) ? "text-primary font-semibold" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}


export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <School className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg font-headline inline-block">
            NDLH
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavLinks />
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <AuthButtons />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <School className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline inline-block">
                  Nabha Digital Learning Hub
                </span>
              </Link>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                   <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg transition-colors hover:text-primary",
                        pathname.startsWith(link.href) ? "text-primary font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
