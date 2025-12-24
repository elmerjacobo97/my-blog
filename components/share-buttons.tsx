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
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={shareOnTwitter} className="gap-2">
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnLinkedIn} className="gap-2">
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink} className="gap-2">
        <LinkIcon className="w-4 h-4" />
        {copied ? 'Copiado!' : 'Copiar link'}
      </Button>
    </div>
  );
}
