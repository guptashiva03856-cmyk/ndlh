"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpenCheck, Menu, School } from "lucide-react";

const navLinks = [
  { href: "/student", label: "Student" },
  { href: "/teacher", label: "Teacher" },
  { href: "/#impact", label: "Impact" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLink = (href: string, label: string, className?: string) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "transition-colors hover:text-primary",
          isActive ? "text-primary font-semibold" : "text-muted-foreground",
          className
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-border/40 bg-background/95 backdrop-blur-sm"
          : "bg-background/0"
      )}
    >
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline inline-block">
            NDLH
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => renderNavLink(link.href, link.label))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
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
                {navLinks.map((link) =>
                  renderNavLink(link.href, link.label, "text-lg")
                )}
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                 <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                 </Button>
                 <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
