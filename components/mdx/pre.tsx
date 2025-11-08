'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreProps {
  children?: React.ReactNode;
  raw?: string;
}

export function Pre({ children, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Extraer el texto del código
    const pre = document.querySelector('pre code');
    const text = pre?.textContent || '';

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <Button
        size="sm"
        variant="ghost"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </>
        )}
      </Button>
      <pre className="bg-card border rounded-lg p-4 overflow-x-auto" {...props}>
        {children}
      </pre>
    </div>
  );
}
