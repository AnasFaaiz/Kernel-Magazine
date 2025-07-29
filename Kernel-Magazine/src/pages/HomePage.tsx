import React from 'react';
import styles from './HomePage.module.css';
import ArticleLayout from '../components/ArticleLayout';
import { mockArticles } from '../data/mockData'; 
import EventsSection from '../components/EventsSection';
import { mockEvents } from '../data/mockEvents.ts';
import CategoriesDisplay from '../components/CategoriesDisplay';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>
          Kernel
          <span>The Core Of Computing Excellence</span>
        </h1>
      </div>
      <ArticleLayout articles={mockArticles}/>
      <CategoriesDisplay />
      <EventsSection />
    </div>
  );
};

export default HomePage;
