import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';
import styles from './module-css/RelatedArticlesSlider.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SliderProps {
  articles: Article[];
}

const RelatedArticlesSlider: React.FC<SliderProps> = ({ articles }) => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        // Install Swiper modules
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={4} // Show 3 slides at a time
        direction="vertical" // Make the slider vertical
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500, // Change slide every 3 seconds
          disableOnInteraction: false,
        }}
        className={styles.mySwiper}
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <Link to={`/article/${article.id}`} className={styles.cardLink}>
              <div className={styles.relatedCard}>
                <img src={article.imageUrl} alt={article.title} />
                <div className={styles.cardContent}>
                  <h3>{article.title}</h3>
                  <p>{article.author}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedArticlesSlider;
