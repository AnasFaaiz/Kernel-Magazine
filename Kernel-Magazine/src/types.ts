export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  snippet: string;
  readingTime: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
