import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <FileQuestion className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground">Página no encontrada</p>
        </div>

        <p className="text-muted-foreground">Lo siento, la página que buscas no existe o ha sido movida.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Ir al inicio
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
