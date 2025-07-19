"use client";

import React, { useState } from 'react';
import { useTopStories } from '../api/nyt/topStories';
import NewsCard from '../components/NewsCard';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

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

const TopStories: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('home');
  const { data, loading, error } = useTopStories(selectedSection);

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Top Stories</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label className="text-sm font-medium">Section:</label>
          <Select value={selectedSection} onValueChange={handleSectionChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
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
      </div>

      {data && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </p>
        </div>
      )}

      {data?.results && data.results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((article, index) => (
            <NewsCard key={`${article.uri}-${index}`} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-muted-foreground">No stories found for this section.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopStories;
