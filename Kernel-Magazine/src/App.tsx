// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookView from './pages/BookView';
import ArticlePage from './pages/ArticlePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AddArticleForm from './components/AddArticleForm';
import BulkAddForm from './components/BulkAddForm';
import './App.css';
import { dummyArticles } from './data/dummyData';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect(()=>{
	const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
		console.log("Firebase listener fired. User is:", currentUser);
		setUser(currentUser);
		setAuthInitialized(true);
		console.log("Setting authInititalized to TRUE");
	});
	return () => unsubscribe();
  }, []);
  return (
    <Router>
      <div className="appContainer">
        <Navbar user={user} authInitialized={authInitialized} />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage articles={dummyArticles} events={[]} loading={false}/>} />
	    <Route path="/login" element={<AdminLoginPage />} />
	    <Route path="/admin-dashboard" element={<AdminDashboard />} >
	      <Route path="add-single" element={<AddArticleForm />} />
	      <Route path="bulk-add" element={<BulkAddForm />} />
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
