// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from './firebase';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookView from './pages/BookView';
import ArticlePage from './pages/ArticlePage';
import AdminLoginPage from './pages/AdminLoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AddArticleForm from './components/AddArticleForm';
import BulkAddForm from './components/BulkAddForm';
import ManageNewsSources from './components/ManageNewsSources';
import { fetchAllActiveNews } from './services/newsService';
import type { Article } from './types';
import './App.css';
import { dummyArticles } from './data/dummyData';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>(dummyArticles);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(()=>{
	const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
		console.log("Firebase listener fired. User is:", currentUser);
		setUser(currentUser);
		setAuthInitialized(true);
		console.log("Setting authInititalized to TRUE");
	});
	return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoadingArticles(true);
      try {
        // Fetch external news
        const fetchedNews = await fetchAllActiveNews();
        
        // Fetch internal stored articles
        const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
        const q = query(collection(db, 'articles'), orderBy('publishedDate', 'desc'));
        const internalSnapshot = await getDocs(q);
        const internalArticles = internalSnapshot.docs.map(doc => {
           const data = doc.data();
           return {
              id: doc.id,
              title: data.title,
              category: data.category,
              author: data.author,
              date: data.publishedDate ? new Date(data.publishedDate.toDate()).toLocaleDateString() : new Date().toLocaleDateString(),
              imageUrl: data.imageUrl,
              snippet: data.snippet,
              readingTime: data.readingTime,
           } as Article;
        });

        // Combine internal articles and external news
        // Sort the entire array descending by date if needed.
        const combined = [...internalArticles, ...fetchedNews].sort(
           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setArticles(combined);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoadingArticles(false);
      }
    };
    loadData();
  }, []);

  return (
    <Router>
      <div className="appContainer">
        <Navbar user={user} authInitialized={authInitialized} />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage articles={articles} events={[]} loading={loadingArticles}/>} />
	    <Route path="/login" element={<AdminLoginPage />} />
	    <Route path="/register" element={<RegisterPage />} />
	    <Route path="/admin-dashboard" element={<AdminDashboard />} >
	      <Route path="add-single" element={<AddArticleForm />} />
	      <Route path="bulk-add" element={<BulkAddForm />} />
	      <Route path="manage-news" element={<ManageNewsSources />} />
	    </Route>
            <Route path="/book-view" element={<BookView />} /> {/* Activate this line */}
	    <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
