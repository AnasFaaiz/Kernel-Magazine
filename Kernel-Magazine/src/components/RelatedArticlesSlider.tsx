import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';
import styles from './RelatedArticlesSlider.module.css';

interface SliderProps {
  articles: Article[];
}

const RelatedArticlesSlider: React.FC<SliderProps> = ({ articles }) => {
  const displayedArticles = articles.slice(0,4);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.staticList}>
        {displayedArticles.map((article) => (
            <Link to={`/article/${article.id}`} className={styles.cardLink} key={article.id}>
              <div className={styles.relatedCard}>
                <img src={article.imageUrl} alt={article.title} />
                <div className={styles.cardContent}>
                  <h3>{article.title}</h3>
                  <p>{article.author}</p>
                </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticlesSlider;
