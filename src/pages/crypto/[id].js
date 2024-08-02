import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../../components/Chart';

// In-memory cache
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // Cache duration: 10 minutes

export default function CryptoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cryptoData, setCryptoData] = useState(null);
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

  return (
    <div>
      <h1>{id && id.toLocaleUpperCase()} PRICE CHART</h1>
      {error && <p>Error: {error.message}</p>}
      {cryptoData ? (
        <div>
          <Chart data={cryptoData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
