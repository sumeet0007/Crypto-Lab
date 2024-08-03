import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CryptoCard from '../../components/CryptoCard';

// In-memory cache
let cache = null;
const CACHE_DURATION = 5 * 60 * 1000; // Cache duration: 5 minutes
let cacheTimestamp = 0;

export default function Index() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const currentTime = Date.now();

        // Check if cache is valid
        if (cache && (currentTime - cacheTimestamp < CACHE_DURATION)) {
          setCryptos(cache);
          setFilteredCryptos(cache);
        } else {
          const response = await axios.get('/api/crypto');
          const data = response.data;

          // Update cache
          cache = data;
          cacheTimestamp = currentTime;

          setCryptos(data);
          setFilteredCryptos(data);
        }
      } catch (error) {
        console.error('Error fetching cryptos:', error.message);
        setError('Failed to fetch cryptocurrencies');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();

    const interval = setInterval(() => {
      fetchCryptos(); 
    }, 30000); // Update every 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCryptos(filtered);
  };

  return (
    <div>
      <Head>
        <title>Crypto Tracker</title>
        <meta name="description" content="Live cryptocurrency price tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='hero-header'>
        <h1>Live Cryptocurrency Price Tracker</h1>
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          value={search}
          onChange={handleSearch}
        />
      </header>

      <main>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredCryptos.length > 0 && (
          <div>
            <h2>Cryptocurrencies</h2>
            <div className="crypto-cards">
              {filteredCryptos.map((crypto) => (
                <Link key={crypto.id} href={`/crypto/${crypto.id}`} passHref>
                    <CryptoCard crypto={crypto} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
