import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../../components/Chart';
import styles from '../../styles/CryptoDetail.module.css';

// In-memory cache
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // Cache duration: 10 minutes

export default function CryptoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cryptoData, setCryptoData] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCryptoData = async () => {
        try {
          const currentTime = Date.now();
          
          // Check if cache has the data and is still valid
          if (cache.has(id) && (currentTime - cache.get(id).timestamp < CACHE_DURATION)) {
            setCryptoData(cache.get(id).data);
          } else {
            const response = await axios.get(`/api/crypto/${id}`);
            const data = response.data;
            // Update cache
            cache.set(id, { data, timestamp: currentTime });
            setCryptoData(data);
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchCryptoData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchCryptoData = async () => {
        try {
          const currentTime = Date.now();

          // Check if cache has the data and is still valid
          if (cache.has(id) && (currentTime - cache.get(id).timestamp < CACHE_DURATION)) {
            setCoinDetails(cache.get(id).data);
          } else {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
              params: {
                vs_currency: 'usd',
                ids: id,
                order: 'market_cap_desc',
                per_page: 1,
                page: 1,
                sparkline: false,
              },
            });
            const data = response.data[0];

            console.log(data, "<===data");

            // Update cache
            cache.set(id, { data, timestamp: currentTime });
            setCoinDetails(data);
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchCryptoData();
    }
  }, [id]);


  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <h1>{id && id.toUpperCase()} PRICE CHART</h1>
        {error && <p>Error: {error.message}</p>}
        {cryptoData ? (
          <Chart data={cryptoData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.detailsContainer}>
          <div className={styles.cryptoDetails}>
            <h2>{coinDetails?.name}</h2>
          </div>
      </div>
    </div>
  );
}
