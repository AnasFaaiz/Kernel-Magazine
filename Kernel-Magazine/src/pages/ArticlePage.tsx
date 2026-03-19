import { useParams } from 'react-router-dom';
import { dummyArticles } from '../data/dummyData'; 

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const article = dummyArticles.find((art: any) => art.id === id);

  if (!article) {
    return (
      <div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>
        <h2>Article not found!</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', color: 'white', maxWidth: '800px', margin: 'auto' }}>
      <h1>{article.title}</h1>
      <p style={{ color: '#a9acb2' }}>By {article.author} • {article.date}</p>
      <img src={article.imageUrl} alt={article.title} style={{ width: '100%', marginTop: '20px' }}/>
      <p style={{ marginTop: '30px', lineHeight: '1.7' }}>
        {article.snippet} 
        <br/><br/>
        (Full article content would be displayed here...)
      </p>
    </div>
  );
};

export default ArticlePage;
