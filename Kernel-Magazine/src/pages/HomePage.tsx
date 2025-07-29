import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import ArticleLayout from '../components/ArticleLayout';
import { mockArticles } from '../data/mockData'; 
import EventsSection from '../components/EventsSection';
import { mockEvents } from '../data/mockEvents.ts';
import CategoriesDisplay from '../components/CategoriesDisplay';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

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

const HomePage: React.FC = () => {
  const[articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
	const fetchArticles = async () => {
	  try {
		const querySnapshot = await getDocs(collection(db, 'articles'));
		const articlesData = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})) as Article[];
		setArticles(articlesData);
	      } catch(error){
			console.error("Error fetching articles: ", error);
		} finally {
			setLoading(false);
		}
	};
	fetchArticles();
  }, []);

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>
          Kernel
          <span>The Core Of Computing Excellence</span>
        </h1>
      </div>

      {loading ? (
      	<p style={{ textAlign: 'center', color: 'white', padding: '5-px'}}> Loading articles...</p>
	) : (
	  <ArticleLayout articles={articles} />
      )}
      <CategoriesDisplay />
      <EventsSection />
    </div>
  );
};

export default HomePage;
