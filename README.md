# NYT News Aggregator

A comprehensive news aggregator platform built with Next.js, TypeScript, and The New York Times API. This application provides access to top stories, most popular articles, search functionality, book reviews, movie reviews, and archive access.

## Features

- **Top Stories**: Browse the latest top stories from various sections
- **Most Popular**: View the most popular articles from the last 7 days
- **Search**: Search through NYT articles with advanced filtering
- **Books**: Explore book reviews and bestsellers
- **Movies**: Browse movie reviews and ratings
- **Archive**: Access historical articles by date

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: The New York Times Developer API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- NYT API Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd new-york-times
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your NYT API key:
```env
NYT_API_KEY=your_nyt_api_key_here
```

### Getting an NYT API Key

1. Visit [The New York Times Developer Portal](https://developer.nytimes.com/)
2. Create an account and sign in
3. Go to "Apps" and create a new application
4. Copy your API key from the application details
5. Add it to your `.env.local` file

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── api/nyt/           # NYT API integrations
│   ├── topStories.ts
│   ├── mostPopular.ts
│   ├── search.ts
│   ├── books.ts
│   ├── movies.ts
│   └── archive.ts
├── pages/             # Page components
│   ├── TopStories.tsx
│   ├── MostPopular.tsx
│   ├── Search.tsx
│   ├── Books.tsx
│   ├── Movies.tsx
│   └── Archive.tsx
├── components/        # Reusable components
│   ├── NewsCard.tsx
│   ├── BookCard.tsx
│   ├── MovieCard.tsx
│   └── SearchBar.tsx
└── utils/            # Utility functions
    ├── formatDate.ts
    └── handleError.ts
```

## API Endpoints Used

- **Top Stories**: `/svc/topstories/v2/{section}.json`
- **Most Popular**: `/svc/mostpopular/v2/viewed/{period}.json`
- **Article Search**: `/svc/search/v2/articlesearch.json`
- **Books**: `/svc/books/v3/lists/{date}/{list}.json`
- **Movie Reviews**: `/svc/movies/v2/reviews/{type}.json`
- **Archive**: `/svc/archive/v1/{year}/{month}.json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
