import { useState, useMemo } from 'react';
import styles from './CategoriesDisplay.module.css';
import ArticleCard from './ArticleCard';
import { dummyArticles } from '../data/dummyData';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

const CategoriesDisplay = () => {
  const articlesByCategory = useMemo(() => {
    const grouped: { [key: string]: Article[] } = {};
    dummyArticles.forEach(article => {
      if (article.id === '1') return; // Skip the main article
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, []);

  const categories = Object.keys(articlesByCategory);
  const [activeTab, setActiveTab] = useState<string>(categories[0] || '');

  return (
    <div className={styles.container}>
      <div className={styles.tabsNav}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.tabButton} ${activeTab === category ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.articlesGrid}>
        {articlesByCategory[activeTab]?.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}

	    {articlesByCategory[activeTab]?.length > 4 && (
	      <Link to={`/category/${activeTab}`} className={styles.viewAllCard}>
	        <span> View All in {activeTab} &rarr;</span>
	      </Link>
	    )}
      </div>
    </div>
  );
};

export default CategoriesDisplay;
