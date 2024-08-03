import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/TrendingCrypto.module.css';
import Link from 'next/link';

const TrendingCrypto = () => {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        setTrending(response.data.coins);
      } catch (error) {
        console.error('Error fetching trending cryptocurrencies:', error);
        setError('Failed to fetch trending cryptocurrencies');
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Trending Cryptocurrencies</h2>
      {error && <p className={styles.error}>{error}</p>}
      {trending.length > 0 ? (
        <div className={styles.trendingList}>
          {trending.map((crypto, index) => (
            <Link key={crypto.item.id} href={`/crypto/${crypto.item.id}`} passHref>
            <div key={index} className={styles.cryptoCard}>
              <img
                src={crypto.item.small}
                alt={crypto.item.name}
                className={styles.cryptoImage}
              />
              <div className={styles.cryptoInfo}>
                <h3 className={styles.cryptoName}>{crypto.item.name}</h3>
                <p className={styles.cryptoSymbol}>{crypto.item.symbol.toUpperCase()}</p>
                <p className={styles.cryptoMarketCap}>Market Cap Rank: #{crypto.item.market_cap_rank}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading trending cryptocurrencies...</p>
      )}
    </div>
  );
};

export default TrendingCrypto;
