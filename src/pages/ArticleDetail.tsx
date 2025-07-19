"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { formatDate } from '../utils/formatDate';
import { TopStory } from '../api/nyt/topStories';
import { getArticleContent } from '../api/nyt/articleDetail';
import { ArrowLeft, ExternalLink, Clock, User, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<TopStory | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articleData = searchParams?.get('article');
    if (articleData) {
      try {
        const parsedArticle = JSON.parse(decodeURIComponent(articleData));
        setArticle(parsedArticle);

        // 获取文章内容
        const fetchContent = async () => {
          try {
            const articleContent = await getArticleContent(parsedArticle.url);
            setContent(articleContent);
          } catch (error) {
            console.error('Error fetching article content:', error);
            setContent('<p>Unable to load article content. Please visit the original article.</p>');
          } finally {
            setLoading(false);
          }
        };

        fetchContent();
      } catch (error) {
        console.error('Error parsing article data:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };

  const handleReadOriginal = () => {
    if (article?.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading article...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold mb-2">Article not found</h3>
              <p className="text-muted-foreground mb-4">The article you&apos;re looking for doesn&apos;t exist.</p>
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = article.multimedia?.[0]?.url || '';
  const imageCaption = article.multimedia?.[0]?.caption || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button onClick={handleBack} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Button>
        </div>

        {/* Article Header */}
        <Card className="mb-8 overflow-hidden">
          {imageUrl && (
            <div className="relative h-96 overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageCaption || article.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {article.kicker && (
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold z-10">
                  {article.kicker}
                </div>
              )}
            </div>
          )}

          <CardHeader className="p-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(article.published_date)}</span>
              </div>
              {article.byline && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.byline.replace('By ', '')}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span className="capitalize">{article.section}</span>
              </div>
            </div>

            <CardTitle className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {article.title}
            </CardTitle>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.abstract}
            </p>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                <div className="mt-8 pt-8 border-t">
                  <Button onClick={handleReadOriginal} className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Full Article on NYT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Article Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Published: {formatDate(article.published_date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span>Section: {article.section}</span>
                </div>
                {article.subsection && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span>Subsection: {article.subsection}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
