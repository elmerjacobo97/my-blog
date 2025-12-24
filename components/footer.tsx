'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, Code, Rss, Instagram } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/elmerjacobo97', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/elmerjacobo97', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/elmerjacobo97', icon: Instagram, label: 'Instagram' },
  { href: 'mailto:contacto@elmerjacobo.dev', icon: Mail, label: 'Email' },
];

const footerLinks = [
  { href: '/', label: 'Blog' },
  { href: '/about', label: 'Sobre mí' },
  { href: 'https://elmerjacobo.dev', label: 'Portafolio', external: true },
  { href: '/rss.xml', label: 'RSS', external: true },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Elmer Jacobo</span>
                <span className="text-xs text-muted-foreground leading-tight">Dev Blog</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Blog de desarrollo Full Stack. Guías, tutoriales y soluciones sobre React Native, Next.js, TypeScript y
              más.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Enlaces</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit flex items-center gap-1.5"
                  >
                    {link.label === 'RSS' && <Rss className="w-3.5 h-3.5" />}
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Conecta</h3>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-accent/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} Elmer Jacobo. Todos los derechos reservados.</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> usando Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
