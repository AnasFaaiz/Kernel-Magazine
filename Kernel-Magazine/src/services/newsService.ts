import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { NewsSource, Article } from '../types';

/**
 * Universal News Service
 * Fetches data from configured external sources in Firestore.
 */

// Helper to get nested properties by string path (like "results" or "articles")
const getNestedValue = (obj: any, path: string) => {
  if (!obj || !path) return obj;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const fetchAllActiveNews = async (): Promise<Article[]> => {
  try {
    // 1. Get all active news sources from Firestore
    const q = query(collection(db, 'news_sources'), where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    const activeSources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsSource[];

    if (activeSources.length === 0) return [];

    // 2. Fetch from each source in parallel
    const allArticles: Article[] = [];

    const fetchPromises = activeSources.map(async (source) => {
      try {
        const response = await fetch(source.url);
        if (!response.ok) throw new Error(`Fetch failed for ${source.name}`);
        const data = await response.json();

        // 3. Extract the root list of articles (e.g. "results" or "articles")
        const rootList = getNestedValue(data, source.mapping.rootPath);
        if (!Array.isArray(rootList)) return;

        // 4. Map each item into our unified Article format
        const sourceArticles = rootList.slice(0, 10).map((item: any, idx: number) => ({
          id: `${source.id}-${idx}`, // Synthetic ID
          title: getNestedValue(item, source.mapping.titleKey) || 'Untitled',
          snippet: getNestedValue(item, source.mapping.snippetKey) || '',
          imageUrl: getNestedValue(item, source.mapping.imageKey) || 'https://via.placeholder.com/300',
          category: source.name,
          author: source.name,
          date: getNestedValue(item, source.mapping.dateKey) || new Date().toDateString(),
          externalUrl: getNestedValue(item, source.mapping.urlKey),
          readingTime: '5 min read'
        })) as Article[];

        allArticles.push(...sourceArticles);
      } catch (err) {
        console.error(`Error fetching news from ${source.name}:`, err);
      }
    });

    await Promise.all(fetchPromises);

    // Sort by date (synthetic if missing) and return
    return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  } catch (error) {
    console.error('Error fetching universal news:', error);
    return [];
  }
};
