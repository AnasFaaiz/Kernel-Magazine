import React from 'react';
import styles from './module-css/EventsSection.module.css';
import { mockEvents } from '../data/mockEvents';

const EventsSection: React.FC = () => {
  return (
    <section className={styles.eventsContainer}>
      <h2 className={styles.sectionTitle}>Latest Events in KLH</h2>
      <div className={styles.eventsGrid}>
        {mockEvents.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <img src={event.imageUrl} alt={event.title} />
            <div className={styles.cardContent}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
