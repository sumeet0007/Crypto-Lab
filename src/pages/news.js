/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/NewsPage.module.css';
import Head from 'next/head';

const Index = () => {
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
          `https://newsapi.org/v2/everything?q=crypto&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
      }
    };

    fetchNews();
  }, []);

  return (
    <>
    <Head>
      <title>News - The Crypto Lab</title>
      <meta name="description" content="About CoinChain, built by Sumeet Sonawane for The Selection Lab" />
    </Head>
    <header className='hero-header'>
      <h1>Crypto News</h1>
    </header>
    <div className={styles.news}>
      {error && <p>{error}</p>}
      {news.length > 0 ? (
        <div className={styles.newsGrid}>
          {news.map((article, index) => (
            <div key={index} className={styles.newsCard}>
                <div className={styles.newCryptocurrenciessImage}>
                    <img src={article.urlToImage || "../assets/bitcoin.jpg"} alt={article.title} className={styles.newsImage} />
                </div>
              <div className={styles.newsContent}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p className={styles.newsMeta}>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span> | <span>{article.author}</span>
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
    </>
  );
};

export default Index;
