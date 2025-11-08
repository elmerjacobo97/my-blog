'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Home, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/about', label: 'Sobre mí', icon: User },
  { href: 'https://elmerjacobo.dev', label: 'Portafolio', icon: Briefcase, external: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            Blog — Elmer Jacobo
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "text-primary bg-accent font-medium"
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side - Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            <ModeToggle />

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
                <SheetDescription>Navega por el blog</SheetDescription>
              </SheetHeader>
              <Separator className="my-4" />
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-base">{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "text-primary bg-accent font-medium"
                          : "text-muted-foreground hover:text-primary hover:bg-accent"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-base">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
