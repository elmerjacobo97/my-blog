import Link from 'next/link';
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Code2,
  Lightbulb,
  Rocket,
  BookOpen,
  ExternalLink,
  Instagram,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Sobre mí | Blog - Elmer Jacobo',
  description: 'Desarrollador full-stack apasionado por compartir conocimiento y resolver problemas técnicos.',
  alternates: {
    canonical: 'https://blog.elmerjacobo.dev/about',
  },
  openGraph: {
    title: 'Sobre mí - Elmer Jacobo',
    description: 'Desarrollador full-stack apasionado por compartir conocimiento y resolver problemas técnicos',
    url: 'https://blog.elmerjacobo.dev/about',
    siteName: 'Blog - Elmer Jacobo',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://blog.elmerjacobo.dev/about/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sobre mí - Elmer Jacobo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mí - Elmer Jacobo',
    description: 'Desarrollador full-stack apasionado por compartir conocimiento',
    creator: '@elmerjacobo',
    images: ['https://blog.elmerjacobo.dev/about/opengraph-image'],
  },
};

const techStack = {
  frontend: ['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  backend: ['Node.js', 'Laravel', 'PostgreSQL', 'Prisma', 'REST APIs'],
  tools: ['Git', 'VS Code', 'Vercel', 'Docker', 'Figma'],
};

const topics = [
  'Guías paso a paso para configurar herramientas y frameworks',
  'Soluciones a bugs complejos y errores comunes',
  'Tips y mejores prácticas de desarrollo',
  'Experiencias migrando proyectos y optimizando código',
  'Configuraciones de deploy y DevOps',
];

const socialLinks = [
  { href: 'https://github.com/elmerjacobo97', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/elmerjacobo97', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/elmerjacobo97', icon: Instagram, label: 'Instagram' },
  { href: 'mailto:contacto@elmerjacobo.dev', icon: Mail, label: 'Email' },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Sobre mí</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Hola! Soy Elmer, desarrollador full-stack con pasión por construir aplicaciones web y móviles modernas, y
          compartir lo que aprendo en el camino.
        </p>
      </header>

      <div className="space-y-8">
        <Card className="border-border/50 overflow-hidden animate-fade-in stagger-1">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">¿Quién soy?</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Soy desarrollador web especializado en el ecosistema de React y Next.js. Me encanta trabajar en
                    proyectos que combinan buen diseño con código limpio y escalable.
                  </p>
                  <p>
                    Actualmente trabajo construyendo aplicaciones web full-stack, desde la arquitectura del backend
                    hasta interfaces de usuario intuitivas.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 overflow-hidden animate-fade-in stagger-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">¿Por qué este blog?</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Este blog nació de mi necesidad de documentar soluciones a problemas que enfrento día a día. He
                    aprendido muchísimo de blogs de otros desarrolladores, y quiero devolver esa ayuda a la comunidad.
                  </p>
                  <p>
                    Aquí comparto guías prácticas, soluciones a bugs complejos, configuraciones que me funcionan y
                    reflexiones sobre desarrollo web.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 overflow-hidden animate-fade-in stagger-3">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-4 flex-1">
                <h2 className="text-xl font-semibold">Tecnologías que uso</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-muted-foreground">Frontend</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.frontend.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-muted-foreground">Backend</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.backend.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-muted-foreground">Tools</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.tools.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 overflow-hidden animate-fade-in stagger-4">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">¿Sobre qué escribo?</h2>
                <ul className="space-y-2">
                  {topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-6 animate-fade-in stagger-5">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Conectemos</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Si tienes preguntas o comentarios sobre algún artículo, no dudes en contactarme.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                      <Icon className="w-4 h-4" />
                      {social.label}
                    </Button>
                  </a>
                );
              })}
            </div>

            <a href="https://elmerjacobo.dev" target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                Ver mi portafolio
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <Link href="/">
            <Button variant="ghost" className="gap-2 -ml-3">
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
