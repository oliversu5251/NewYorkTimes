"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { formatRelativeDate } from '../utils/formatDate';
import { TopStory } from '../api/nyt/topStories';
import { ExternalLink, Clock, User } from 'lucide-react';

interface NewsCardProps {
  article: TopStory;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, className }) => {
  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
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
    <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {imageUrl && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={imageCaption || article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              // 隐藏图片加载失败的图片
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {article.kicker && (
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium z-10">
              {article.kicker}
            </div>
          )}
        </div>
      )}

      <CardHeader className="flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Clock className="w-3 h-3" />
          <span>{formatRelativeDate(article.published_date)}</span>
          {article.byline && (
            <>
              <span>•</span>
              <User className="w-3 h-3" />
              <span>{article.byline.replace('By ', '')}</span>
            </>
          )}
        </div>

        <CardTitle className="text-lg leading-tight line-clamp-2">
          {article.title}
        </CardTitle>

        <CardDescription className="line-clamp-3">
          {article.abstract}
        </CardDescription>
      </CardHeader>

      <CardFooter className="pt-0">
        <Button
          onClick={handleReadMore}
          onKeyDown={handleKeyDown}
          className="w-full"
          variant="outline"
          tabIndex={0}
          aria-label={`Read full article: ${article.title}`}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Read Full Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
