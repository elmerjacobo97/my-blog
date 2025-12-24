'use client';

import { Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
      url
    )}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={shareOnTwitter} className="gap-1.5 h-8 px-2.5">
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnLinkedIn} className="gap-1.5 h-8 px-2.5">
        <Linkedin className="w-4 h-4" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5 h-8 px-2.5">
        <LinkIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
      </Button>
    </div>
  );
}
