import React from 'react';
import type { Article } from '../types';
import { Link } from 'react-router-dom';
import styles from './NewsFeed.module.css';

interface NewsFeedProps {
  articles: Article[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Latest News</h2>
        <span className={styles.subtitle}>Aggregated from across the web</span>
      </div>
      <div className={styles.grid}>
        {articles.map((article) =>
          article.externalUrl ? (
            <a
              key={article.id}
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <NewsCard article={article} />
            </a>
          ) : (
            <Link key={article.id} to={`/article/${article.id}`} className={styles.card}>
              <NewsCard article={article} />
            </Link>
          )
        )}
      </div>
    </section>
  );
};

const NewsCard = ({ article }: { article: Article }) => (
  <>
    <div className={styles.imageWrapper}>
      <img
        src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'}
        alt={article.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';
        }}
      />
    </div>
    <div className={styles.content}>
      <span className={styles.category}>{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.snippet}</p>
      <div className={styles.meta}>
        <span>{article.author}</span>
        <span>{article.date}</span>
      </div>
    </div>
  </>
);

export default NewsFeed;
