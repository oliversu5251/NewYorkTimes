"use client";

import React from 'react';

export interface TopStory {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: Multimedia[];
  short_url: string;
}

export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface TopStoriesResponse {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: TopStory[];
}

export interface TopStoriesState {
  data: TopStoriesResponse | null;
  loading: boolean;
  error: string | null;
}

const NYT_API_KEY = process.env.NEXT_PUBLIC_NYT_API_KEY || process.env.NYT_API_KEY;

if (!NYT_API_KEY) {
  console.warn('NYT_API_KEY is not set. Please add it to your .env.local file.');
}

export const fetchTopStories = async (section: string = 'home'): Promise<TopStoriesResponse> => {
  if (!NYT_API_KEY) {
    throw new Error('NYT_API_KEY is not configured');
  }

  const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TopStoriesResponse = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`API error: ${data.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};

export const useTopStories = (section: string = 'home') => {
  const [state, setState] = React.useState<TopStoriesState>({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await fetchTopStories(section);
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        });
      }
    };

    fetchData();
  }, [section]);

  return state;
};
