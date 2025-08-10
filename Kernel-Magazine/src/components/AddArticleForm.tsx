import React, { useState } from 'react';
import styles from './module-css/AddArticleForm.module.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AddArticleForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [snippet, setSnippet] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Make the handleSubmit function async
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // 3. Add a new document to the "articles" collection
      await addDoc(collection(db, 'articles'), {
        title: title,
        author: author,
        category: category,
        snippet: snippet,
        readingTime: readingTime,
        publishedDate: serverTimestamp(), // Adds the current server time
      });
      
      alert('Article saved successfully!');
      // 4. Clear the form fields after submission
      setTitle('');
      setAuthor('');
      setCategory('');
      setSnippet('');
      setReadingTime('');

    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to save article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Add a Single Article</h3>
      {/* --- Form fields remain the same --- */}
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input 
          type="text" 
          id="author" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <input 
          type="text" 
          id="category" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
       <div className={styles.formGroup}>
        <label htmlFor="readingTime">Reading Time (e.g., "5 min read")</label>
        <input 
          type="text" 
          id="readingTime" 
          value={readingTime}
          onChange={(e) => setReadingTime(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="snippet">Snippet</label>
        <textarea 
          id="snippet"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          rows={4}
          required
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Saving...' : 'Save Article'}
      </button>
    </form>
  );
};

export default AddArticleForm;
