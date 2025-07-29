import React from 'react';
import styles from './ArticleCard.module.css';
import { mockArticles } from '../data/mockData';
import { Link } from 'react-router-dom';
interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
   <Link to={`/article/${article.id}`} className={styles.cardLink}>
    <div className={styles.articleCard}>
      <img src={article.imageUrl} alt={article.title} />
      <div className={styles.cardContent}>
        <h3>{article.title}</h3>
        <p>By {article.author}</p>
      </div>
    </div>
   </Link>
  );
};

export default ArticleCard;
