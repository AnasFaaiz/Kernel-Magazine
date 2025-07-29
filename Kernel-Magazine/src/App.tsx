// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookView from './pages/BookView';
import ArticlePage from './pages/ArticlePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Navbar />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
	    <Route path="/login" element={<AdminLoginPage />} />
	    <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/book-view" element={<BookView />} /> {/* Activate this line */}
	    <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
