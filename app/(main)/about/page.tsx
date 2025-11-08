import Link from 'next/link';
import { ArrowLeft, Github, Linkedin, Mail, Code2, Coffee, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mí - Elmer Jacobo',
    description: 'Desarrollador full-stack apasionado por compartir conocimiento',
    creator: '@elmerjacobo',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre mí</h1>
        <p className="text-xl leading-relaxed">
          Hola! Soy Elmer, desarrollador full-stack con pasión por construir aplicaciones web modernas y compartir lo
          que aprendo en el camino.
        </p>
      </header>

      <div className="space-y-8">
        {/* Who I Am */}
        <Card className="border-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              ¿Quién soy?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              Soy desarrollador web especializado en el ecosistema de React y Next.js. Me encanta trabajar en proyectos
              que combinan buen diseño con código limpio y escalable.
            </p>
            <p className="leading-relaxed">
              Actualmente trabajo construyendo aplicaciones web full-stack, desde la arquitectura del backend hasta
              interfaces de usuario intuitivas. También dedico tiempo a crear contenido técnico para ayudar a otros
              desarrolladores.
            </p>
          </CardContent>
        </Card>

        {/* Why This Blog */}
        <Card className="border-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              ¿Por qué este blog?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              Este blog nació de mi necesidad de documentar soluciones a problemas que enfrento día a día. He aprendido
              muchísimo de blogs de otros desarrolladores, y quiero devolver esa ayuda a la comunidad.
            </p>
            <p className="leading-relaxed">
              Aquí comparto guías prácticas, soluciones a bugs complejos, configuraciones que me funcionan y reflexiones
              sobre desarrollo web. Mi objetivo es que si alguien enfrenta el mismo problema que yo, pueda encontrar la
              solución aquí.
            </p>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="border-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-primary" />
              Tecnologías que uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'].map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Backend & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Laravel', 'PostgreSQL', 'Vercel', 'Git', 'VS Code'].map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What I Write About */}
        <Card className="border-glow">
          <CardHeader>
            <CardTitle>¿Sobre qué escribo?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Guías paso a paso para configurar herramientas y frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Soluciones a bugs complejos y errores comunes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Tips y mejores prácticas de desarrollo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Experiencias migrando proyectos y optimizando código</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Configuraciones de deploy y DevOps</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Separator />

        {/* Contact */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Conectemos</h2>
          <p className="max-w-2xl mx-auto">
            Si tienes preguntas, comentarios sobre algún artículo, o simplemente quieres charlar sobre desarrollo web,
            no dudes en contactarme.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://github.com/elmerjacobo97" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </a>
            <a href="https://linkedin.com/in/elmerjacobo97" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </Button>
            </a>
            <a href="mailto:contacto@elmerjacobo.dev">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" /> Email
              </Button>
            </a>
            <a href="https://elmerjacobo.dev" target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">Ver mi portafolio</Button>
            </a>
          </div>
        </div>

        {/* Back to blog */}
        <div className="text-center pt-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Volver al blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
