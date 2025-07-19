"use client";

import React, { useState } from 'react';
import { useTopStories } from '../api/nyt/topStories';
import NewsCard from '../components/NewsCard';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Loader2, AlertCircle, RefreshCw, Clock, TrendingUp } from 'lucide-react';

const SECTIONS = [
  { value: 'home', label: 'Home' },
  { value: 'arts', label: 'Arts' },
  { value: 'automobiles', label: 'Automobiles' },
  { value: 'books', label: 'Books' },
  { value: 'business', label: 'Business' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food' },
  { value: 'health', label: 'Health' },
  { value: 'insider', label: 'Insider' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'movies', label: 'Movies' },
  { value: 'nyregion', label: 'NY Region' },
  { value: 'obituaries', label: 'Obituaries' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'politics', label: 'Politics' },
  { value: 'realestate', label: 'Real Estate' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'sundayreview', label: 'Sunday Review' },
  { value: 'technology', label: 'Technology' },
  { value: 'theater', label: 'Theater' },
  { value: 't-magazine', label: 'T Magazine' },
  { value: 'travel', label: 'Travel' },
  { value: 'upshot', label: 'Upshot' },
  { value: 'us', label: 'US' },
  { value: 'world', label: 'World' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First', icon: Clock },
  { value: 'oldest', label: 'Oldest First', icon: Clock },
  { value: 'default', label: 'API Order', icon: TrendingUp },
];

const TopStories: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('home');
  const [sortBy, setSortBy] = useState('newest');
  const { data, loading, error } = useTopStories(selectedSection);

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // 排序文章
  const sortedArticles = React.useMemo(() => {
    if (!data?.results) return [];

    const articles = [...data.results];

    switch (sortBy) {
      case 'newest':
        return articles.sort((a, b) =>
          new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
        );
      case 'oldest':
        return articles.sort((a, b) =>
          new Date(a.published_date).getTime() - new Date(b.published_date).getTime()
        );
      case 'default':
      default:
        return articles; // 保持原始顺序
    }
  }, [data?.results, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading top stories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <h2 className="text-xl font-semibold">Error Loading Stories</h2>
            <p className="text-muted-foreground max-w-md">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Top Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest breaking news and top stories from The New York Times
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="text-sm font-semibold text-muted-foreground">Filter by section:</label>
              <Select value={selectedSection} onValueChange={handleSectionChange}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-slate-800 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map((section) => (
                    <SelectItem key={section.value} value={section.value}>
                      {section.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="text-sm font-semibold text-muted-foreground">Sort by:</label>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-800 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Sort articles" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Last Updated Info */}
        {data && (
          <div className="mb-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full inline-block">
              📅 Last updated: {new Date(data.last_updated).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Showing {sortedArticles.length} articles • Sorted by: {SORT_OPTIONS.find(opt => opt.value === sortBy)?.label}
            </p>
          </div>
        )}

        {/* Stories Grid */}
        {sortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedArticles.map((article, index) => (
              <NewsCard key={`${article.uri}-${index}`} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold mb-2">No stories found</h3>
              <p className="text-muted-foreground">Try selecting a different section or check back later.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopStories;
