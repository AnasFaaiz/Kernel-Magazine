import styles from './HomePage.module.css';
import ArticleLayout from '../components/ArticleLayout';
import EventsSection from '../components/EventsSection';
import CategoriesDisplay from '../components/CategoriesDisplay';
import NewsFeed from '../components/NewsFeed';
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

  // First article is the big hero, everything else goes into the feed
  const heroArticles = articles.slice(0, 1);
  const feedArticles = articles.slice(1);

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>
          Kernel Magazine
          <span>The Core Of Computing Excellence</span>
        </h1>
      </div>
      <ArticleLayout articles={heroArticles} relatedArticles={feedArticles.slice(0, 4)} />
      <CategoriesDisplay />
      {feedArticles.length > 0 && <NewsFeed articles={feedArticles} />}
      <EventsSection />
    </div>
  );
};

export default HomePage;
