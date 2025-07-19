"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { formatRelativeDate } from '../utils/formatDate';
import { TopStory } from '../api/nyt/topStories';
import { ExternalLink, Clock, User, BookOpen } from 'lucide-react';

interface NewsCardProps {
  article: TopStory;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, className }) => {
  const router = useRouter();

  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const handleReadFull = () => {
    const articleData = encodeURIComponent(JSON.stringify(article));
    router.push(`/article?article=${articleData}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleReadMore();
    }
  };

  // Get the first available image from multimedia
  const imageUrl = article.multimedia?.[0]?.url || '';
  const imageCaption = article.multimedia?.[0]?.caption || '';

    return (
    <Card className={`group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {imageUrl && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageCaption || article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {article.kicker && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-lg">
              {article.kicker}
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium z-10">
            {article.section}
          </div>
        </div>
      )}

      <CardHeader className="flex-1 p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="w-3 h-3" />
          <span className="font-medium">{formatRelativeDate(article.published_date)}</span>
          {article.byline && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <User className="w-3 h-3" />
              <span className="font-medium">{article.byline.replace('By ', '')}</span>
            </>
          )}
        </div>

        <CardTitle className="text-xl font-bold leading-tight line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>

        <CardDescription className="line-clamp-3 text-muted-foreground leading-relaxed">
          {article.abstract}
        </CardDescription>
      </CardHeader>

            <CardFooter className="p-6 pt-0 space-y-3">
        <Button
          onClick={handleReadFull}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          tabIndex={0}
          aria-label={`Read full article: ${article.title}`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Read Full Article
        </Button>
        <Button
          onClick={handleReadMore}
          onKeyDown={handleKeyDown}
          variant="outline"
          className="w-full"
          tabIndex={0}
          aria-label={`Open original article: ${article.title}`}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open on NYT
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
