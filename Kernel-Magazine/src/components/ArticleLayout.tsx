import React from 'react';
import styles from './ArticleLayout.module.css';
import { Link } from 'react-router-dom';
import type { Article } from '../types';
import RelatedArticlesSlider from './RelatedArticlesSlider';

interface ArticleLayoutProps {
  articles: Article[];
  relatedArticles?: Article[];
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ articles, relatedArticles: relatedProp }) => {
  if (!articles || articles.length === 0) {
    return <div className={styles.boxContainer}><p>No articles found.</p></div>;
  }

  const mainArticle = articles[0];
  const relatedArticles = relatedProp ?? articles.slice(1);

  return (
     <div className={styles.container}>
      <main className={styles.mainArticle}>
        {mainArticle.externalUrl ? (
          <a href={mainArticle.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <img src={mainArticle.imageUrl} alt={mainArticle.title} />
            <div className={styles.articleContent}>
              <div className={styles.categoryTag}>{mainArticle.category}</div>
              <h2>{mainArticle.title}</h2>
              <p>{mainArticle.snippet}</p>
              <div className={styles.articleFooter}>
                <span className={styles.metaItem}>By {mainArticle.author}</span>
                <span className={styles.metaItem}>{mainArticle.date}</span>
              </div>
            </div>
          </a>
        ) : (
          <Link to={`/article/${mainArticle.id}`} className={styles.cardLink}>
            <img src={mainArticle.imageUrl} alt={mainArticle.title} />
            <div className={styles.articleContent}>
              <div className={styles.categoryTag}>{mainArticle.category}</div>
              <h2>{mainArticle.title}</h2>
              <p>{mainArticle.snippet}</p>
              <div className={styles.articleFooter}>
                <span className={styles.metaItem}>By {mainArticle.author}</span>
                <span className={styles.metaItem}>{mainArticle.date}</span>
              </div>
            </div>
          </Link>
        )}
      </main>
      <aside className={styles.relatedArticles}>
        <RelatedArticlesSlider articles={relatedArticles} />
      </aside>
     </div>
  );
};

export default ArticleLayout;
