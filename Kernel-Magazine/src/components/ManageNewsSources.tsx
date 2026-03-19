import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import type { NewsSource } from '../types';
import styles from './ManageNewsSources.module.css';

const ManageNewsSources: React.FC = () => {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [rootPath, setRootPath] = useState('results'); // default for newsdata.io
  const [titleKey, setTitleKey] = useState('title');
  const [snippetKey, setSnippetKey] = useState('description');
  const [imageKey, setImageKey] = useState('image_url');
  const [urlKey, setUrlKey] = useState('link');
  const [dateKey, setDateKey] = useState('pubDate');

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news_sources'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsSource[];
      setSources(data);
    } catch (err) {
      console.error("Error fetching news sources:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'news_sources'), {
        name,
        url,
        isActive: true,
        mapping: {
          rootPath,
          titleKey,
          snippetKey,
          imageKey,
          urlKey,
          dateKey
        }
      });
      // Reset form
      setName('');
      setUrl('');
      fetchSources();
    } catch (err) {
      console.error("Error adding source:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSourceStatus = async (source: NewsSource) => {
    try {
      const sourceRef = doc(db, 'news_sources', source.id);
      await updateDoc(sourceRef, { isActive: !source.isActive });
      fetchSources();
    } catch (err) {
      console.error("Error toggling source:", err);
    }
  };

  const deleteSource = async (id: string) => {
    if (!window.confirm("Delete this source?")) return;
    try {
      await deleteDoc(doc(db, 'news_sources', id));
      fetchSources();
    } catch (err) {
      console.error("Error deleting source:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage News Sources</h2>
      <p>Configure automated tech news feeds from different APIs.</p>

      {/* --- ADD NEW SOURCE FORM --- */}
      <form onSubmit={handleAddSource} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Source Name (e.g., NewsData.io Tech)</label>
          <input value={name} onChange={e => setName(e.target.value)} required placeholder="NewsData Tech" />
        </div>
        <div className={styles.formGroup}>
          <label>Full API URL (including key/parameters)</label>
          <input value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://newsdata.io/api/1/news?apikey=..." />
        </div>

        <div className={styles.mappingGrid}>
          <h4>JSON Path Mapping</h4>
          <div className={styles.formGroup}>
             <label>Articles Roots Path (e.g. results, articles)</label>
             <input value={rootPath} onChange={e => setRootPath(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
             <label>Title Key</label>
             <input value={titleKey} onChange={e => setTitleKey(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
             <label>Snippet Key</label>
             <input value={snippetKey} onChange={e => setSnippetKey(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
             <label>Image Key</label>
             <input value={imageKey} onChange={e => setImageKey(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
             <label>URL Key</label>
             <input value={urlKey} onChange={e => setUrlKey(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
             <label>Date Key</label>
             <input value={dateKey} onChange={e => setDateKey(e.target.value)} required />
          </div>
        </div>

        <button type="submit" disabled={loading} className={styles.addButton}>
          {loading ? 'Adding...' : 'Add News Source'}
        </button>
      </form>

      {/* --- LIST OF SOURCES --- */}
      <div className={styles.listSection}>
        <h3>Current Sources</h3>
        {sources.length === 0 && <p>No sources added yet.</p>}
        <div className={styles.grid}>
          {sources.map(source => (
            <div key={source.id} className={`${styles.card} ${source.isActive ? styles.active : styles.inactive}`}>
              <div className={styles.cardHeader}>
                <h4>{source.name}</h4>
                <div className={styles.badge}>{source.isActive ? 'Enabled' : 'Disabled'}</div>
              </div>
              <p className={styles.url}>{source.url}</p>
              <div className={styles.cardActions}>
                <button onClick={() => toggleSourceStatus(source)} className={styles.toggleBtn}>
                  {source.isActive ? 'Turn Off' : 'Turn On'}
                </button>
                <button onClick={() => deleteSource(source.id)} className={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageNewsSources;
