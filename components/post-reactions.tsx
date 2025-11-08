'use client';

import { useState, useEffect } from 'react';
import { Heart, ThumbsUp, Lightbulb, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Reaction {
  emoji: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

const reactionTypes = [
  { emoji: '❤️', label: 'Me encanta', icon: <Heart className="w-4 h-4" /> },
  { emoji: '👍', label: 'Útil', icon: <ThumbsUp className="w-4 h-4" /> },
  { emoji: '💡', label: 'Interesante', icon: <Lightbulb className="w-4 h-4" /> },
  { emoji: '🚀', label: 'Inspirador', icon: <Rocket className="w-4 h-4" /> },
];

export function PostReactions({ postSlug }: { postSlug: string }) {
  const [reactions, setReactions] = useState<Reaction[]>(
    reactionTypes.map((r) => ({
      ...r,
      count: 0,
    }))
  );
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cargar reacciones desde localStorage
    const storedReactions = localStorage.getItem(`reactions-${postSlug}`);
    const storedUserReactions = localStorage.getItem(`user-reactions-${postSlug}`);

    if (storedReactions) {
      setReactions(JSON.parse(storedReactions));
    }

    if (storedUserReactions) {
      setUserReactions(new Set(JSON.parse(storedUserReactions)));
    }
  }, [postSlug]);

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4">¿Te gustó este artículo?</h3>
          <div className="flex flex-wrap gap-2">
            {reactionTypes.map((r) => (
              <Button key={r.emoji} variant="outline" size="sm" className="gap-2" disabled>
                <span>{r.emoji}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleReaction = (emoji: string) => {
    const newReactions = reactions.map((r) => {
      if (r.emoji === emoji) {
        const hasReacted = userReactions.has(emoji);
        return {
          ...r,
          count: hasReacted ? Math.max(0, r.count - 1) : r.count + 1,
        };
      }
      return r;
    });

    const newUserReactions = new Set(userReactions);
    if (userReactions.has(emoji)) {
      newUserReactions.delete(emoji);
    } else {
      newUserReactions.add(emoji);
    }

    setReactions(newReactions);
    setUserReactions(newUserReactions);

    // Guardar en localStorage
    localStorage.setItem(`reactions-${postSlug}`, JSON.stringify(newReactions));
    localStorage.setItem(`user-reactions-${postSlug}`, JSON.stringify(Array.from(newUserReactions)));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold mb-4">¿Te gustó este artículo?</h3>
        <div className="flex flex-wrap gap-2">
          {reactions.map((reaction) => (
            <Button
              key={reaction.emoji}
              variant={userReactions.has(reaction.emoji) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleReaction(reaction.emoji)}
              className="gap-2"
            >
              <span>{reaction.emoji}</span>
              <span className="text-xs">{reaction.count > 0 ? reaction.count : ''}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
