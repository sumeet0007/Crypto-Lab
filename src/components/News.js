/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Link from 'next/link';
import styles from '../styles/News.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const fromDate = yesterday.toISOString().split('T')[0];
        const toDate = today.toISOString().split('T')[0];
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=(crypto AND bitcoin)&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}`
        );
        setNews(response.data.articles.slice(0, 10)); // Show only 10 news articles
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
      }
    };

    fetchNews();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Hide arrows
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={styles.news}>
      <div className={styles.newsHeader}>
        <h2>Crypto News</h2>
        <Link href="/news">View All</Link>
      </div>
      {error && <p>{error}</p>}
      {news.length > 0 ? (
        <Slider.default {...settings} className={styles.slider}>
          {news.map((article, index) => (
            <div key={index} className={styles.newsCard}>
              <img src={article.urlToImage || '/default-image.jpg'} alt={article.title} className={styles.newsImage} />
              <div className={styles.newsContent}>
                <h3 className={styles.elipsisClass}>{article.title}</h3>
                <p className={styles.elipsisClass}>{article.description}</p>
                <p className={styles.newsMeta}>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span> | <span>{article.author}</span>
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                  Read more
                </a>
              </div>
            </div>
          ))}
        </Slider.default>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default News;
