import React from 'react';
import styles from './ArticleLayout.module.css';
import { mockArticles } from '../data/mockData.ts';

// Define the props that this component will accept
interface ArticleLayoutProps {
  articles: Article[];
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ articles }) => {
  // Handle case where there might be no articles
  if (!articles || articles.length === 0) {
    return <div className={styles.boxContainer}><p>No articles found.</p></div>;
  }

  // Use the first article from the data as the main feature
  const mainArticle = articles[0];
  // Use the rest of the articles for the "related" section
  const relatedArticles = articles.slice(1);

  return (
    <div className={styles.boxContainer}>
      <div className={styles.contentWrapper}>
        <main className={styles.mainArticle}>
          <img src={mainArticle.imageUrl} alt={mainArticle.title} />
          <div className={styles.articleContent}>
            <div className={styles.categoryTag}>{mainArticle.category}</div>
            <h2>{mainArticle.title}</h2>
            <p>{mainArticle.snippet}</p>
            <div className={styles.articleFooter}>
              <span className={styles.metaItem}>{mainArticle.date}</span>
              <span className={styles.metaItem}>By {mainArticle.author}</span>
            </div>
          </div>
        </main>

        <aside className={styles.relatedArticles}>
          {/* Loop through the related articles and render a card for each */}
          {relatedArticles.map((article) => (
            <div key={article.id} className={styles.relatedCard}>
              <img src={article.imageUrl} alt={article.title} />
              <div className={styles.articleContent}>
                <h3>{article.title}</h3>
                <p className={styles.articleMeta}>By {article.author}</p>
              </div>
            </div>
          ))}
        </aside>

      </div>
    </div>
  );
};

export default ArticleLayout;
