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
        const apiKey = process.env.NEXT_PUBLIC_TOKEN_INSIGHT;

        const response = await axios.get(
          `https://api.tokeninsight.com/api/v1/news/list`, {
            headers: {
              "accept": "application/json",
              "TI_API_KEY": apiKey
          }
          }
        );
        console.log(response, "response");
        setNews(response.data.data.items); // Show only 10 news articles
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
                    <img src={article.image_url || "../assets/bitcoin.jpg"} alt={article.title} className={styles.newsImage} referrerpolicy="no-referrer"  />
                </div>
              <div className={styles.newsContent}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p className={styles.newsMeta}>
                  <span>{new Date(article.timestamp).toLocaleDateString()}</span> | <span>tokeninsight.com</span>
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
