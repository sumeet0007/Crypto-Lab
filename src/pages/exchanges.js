import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Exchanges.module.css';

export default function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/exchanges');
        setExchanges(response.data);
      } catch (error) {
        console.error('Error fetching exchanges:', error.message);
        setError('Failed to fetch exchanges');
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  return (
    <div>
      <Head>
        <title>Crypto Exchanges</title>
        <meta name="description" content="List of cryptocurrency exchanges" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="hero-header">
        <h1>Cryptocurrency Exchanges</h1>
      </header>

      <main className={styles.main}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className={styles.exchangesGrid}>
          {exchanges.map((exchange) => (
            <div key={exchange.id} className={styles.exchangeCard}>
              <img src={exchange.image} alt={exchange.name} className={styles.exchangeLogo} />
              <h2>{exchange.name}</h2>
              <p>Trust Score: {exchange.trust_score}</p>
              <p>Year Established: {exchange.year_established}</p>
              <a href={exchange.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
