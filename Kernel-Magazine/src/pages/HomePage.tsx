import styles from './HomePage.module.css';
import ArticleLayout from '../components/ArticleLayout';
import EventsSection from '../components/EventsSection';
import CategoriesDisplay from '../components/CategoriesDisplay';
import type { Article, Event } from '../types';

interface HomePageProps {
  articles: Article[];
  events: Event[];
  loading: boolean;
}

const HomePage = ({ articles, events, loading }: HomePageProps) => {
  if (loading) {
    return <p style={{ textAlign: 'center', color: '#333', padding: '50px' }}>Loading Content...</p>;
  }

  // To avoid unused prop error until EventsSection is dynamic
  if (events.length > 0) {
    console.log("Events loaded:", events.length);
  }

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
