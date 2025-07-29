import React from 'react';
import { useParams } from 'react-router-dom';
import { mockArticles } from '../data/mockData'; // We'll need this to find the article

const ArticlePage: React.FC = () => {
  // Get the 'id' from the URL, e.g., /article/1
  const { id } = useParams<{ id: string }>();

  // Find the article with the matching id from your mock data
  const article = mockArticles.find(art => art.id === id);

  // Handle case where the article is not found
  if (!article) {
    return (
      <div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>
        <h2>Article not found!</h2>
      </div>
    );
  }

  // If the article is found, display its content
  return (
    <div style={{ padding: '50px', color: 'white', maxWidth: '800px', margin: 'auto' }}>
      <h1>{article.title}</h1>
      <p style={{ color: '#a9acb2' }}>By {article.author} • {article.date}</p>
      <img src={article.imageUrl} alt={article.title} style={{ width: '100%', marginTop: '20px' }}/>
      <p style={{ marginTop: '30px', lineHeight: '1.7' }}>
        {/* In a real app, this would be the full article content */}
        {article.snippet} 
        <br/><br/>
        (Full article content would be displayed here...)
      </p>
    </div>
  );
};

export default ArticlePage;
