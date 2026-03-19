export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  snippet: string;
  readingTime: string;
  externalUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string; // The full test URL or pattern
  apiKey?: string;
  isActive: boolean;
  mapping: {
    rootPath: string; // e.g. "articles" or "results"
    titleKey: string;
    snippetKey: string;
    imageKey: string;
    urlKey: string;
    dateKey: string;
  }
}
