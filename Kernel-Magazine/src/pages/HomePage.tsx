import React from 'react';
import styles from './HomePage.module.css';
import ArticleLayout from '../components/ArticleLayout';
import EventsSection from '../components/EventsSection';
import CategoriesDisplay from '../components/CategoriesDisplay';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { Article, Event } from '../types';

interface HomePageProps {
  articles: Article[];
  events: Event[];
  loading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ articles, events, loading }) => {
  //const[articles, setArticles] = useState<Article[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);
  if(loading) {
	return <p style={{ textAlign: 'center', color: '#333', padding: '50px' }}>Loading Content...</p>;
  }

	// useEffect(() => {
	//const fetchArticles = async () => {
	//  try {
	//	const querySnapshot = await getDocs(collection(db, 'articles'));
	//	const articlesData = querySnapshot.docs.map(doc => ({
	//		id: doc.id,
	//		...doc.data()
	//	})) as Article[];
	//	setArticles(articlesData);
	//      } catch(error){
	//		console.error("Error fetching articles: ", error);
	//	} finally {
	//		setLoading(false);
	//	}
	//};
	//fetchArticles();
	// }, []);

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>
          Kernel
          <span>The Core Of Computing Excellence</span>
        </h1>
      </div>
      <ArticleLayout articles={articles} />
      <CategoriesDisplay />
      <EventsSection />
    </div>
  );
};

export default HomePage;
