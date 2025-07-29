
export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  snippet: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Unseen World of Compilers',
    category: 'Computer Science',
    author: 'Dr. Evelyn Reed',
    date: 'July 8, 2025',
    imageUrl: 'https://placehold.co/800x500/1e2124/ffffff?text=Compilers',
    snippet: 'Explore how compilers translate human-readable code into machine language, a fundamental process in software engineering.'
  },
  {
    id: '2',
    title: 'Neural Networks: A Primer',
    category: 'AI & ML',
    author: 'John Smith',
    date: 'July 5, 2025',
    imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=AI',
    snippet: '' // Snippet is not used in related cards, can be empty
  },
  {
    id: '3',
    title: 'Mastering Concurrent Programming',
    category: 'Advanced Topics',
    author: 'Emily White',
    date: 'July 2, 2025',
    imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=Concurrency',
    snippet: ''
  },
  {
    id: '4',
    title: 'Introduction to GPT Models',
    category: 'AI & ML',
    author: 'Dr. Evelyn Reed',
    date: 'July 18, 2025',
    imageUrl: 'https://placehold.co/400x250/1e2124/ffffff?text=GPT',
    snippet: 'Understand the architecture behind large language models like GPT.'
  }
];
