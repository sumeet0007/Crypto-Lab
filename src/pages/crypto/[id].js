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
            const cachedData = cache.get(id).data;
            setCryptoData(cachedData);
            setCoinDetails(cachedData);
          } else {
            // Fetch data from the first API
            const response1 = await axios.get(`/api/crypto/${id}`).catch((err)=>{
              console.log(err);
            });
            const data1 = response1.data;
  
            // Fetch data from the second API
            const response2 = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
              params: {
                vs_currency: 'usd',
                ids: id,
                order: 'market_cap_desc',
                per_page: 1,
                page: 1,
                sparkline: false,
              },
            }).catch((err)=>{
              console.log(err)
            });
            const data2 = response2.data[0];
  
            // Update cache with both data sets
            const combinedData = { ...data1, ...data2 };
            cache.set(id, { data: combinedData, timestamp: currentTime });
  
            // Set state with combined data
            setCryptoData(combinedData);
            setCoinDetails(combinedData);
          }
        } catch (error) {
          setError("Public api issues. Please go back and try again");
        }
      };
  
      fetchCryptoData();
    }
  }, [id]);


  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <h1>{id && id.toUpperCase()} PRICE CHART</h1>
        {error && <p>Error: {error}</p>}
        {cryptoData ? (
          <Chart data={cryptoData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.detailsContainer}>
          <div>
            <table className={styles.cryptoDetails}>
              <thead>
                <tr>
                  <th colSpan="2">{coinDetails?.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Symbol</td>
                  <td>{coinDetails?.symbol}</td>
                </tr>
                <tr>
                  <td>Market Cap Rank</td>
                  <td>{coinDetails?.market_cap_rank}</td>
                </tr>
                <tr>
                  <td>Current Price</td>
                  <td>${coinDetails?.current_price}</td>
                </tr>
                <tr>
                  <td>24h High</td>
                  <td>${coinDetails?.high_24h}</td>
                </tr>
                <tr>
                  <td>24h Low</td>
                  <td>${coinDetails?.low_24h}</td>
                </tr>
                <tr>
                  <td>Price Change (24h)</td>
                  <td>${coinDetails?.price_change_24h}</td>
                </tr>
                <tr>
                  <td>Price Change Percentage (24h)</td>
                  <td>{coinDetails?.price_change_percentage_24h}%</td>
                </tr>
                <tr>
                  <td>Total Volume</td>
                  <td>${coinDetails?.total_volume}</td>
                </tr>
                <tr>
                  <td>Circulating Supply</td>
                  <td>{coinDetails?.circulating_supply}</td>
                </tr>
                <tr>
                  <td>Total Supply</td>
                  <td>{coinDetails?.total_supply}</td>
                </tr>
                <tr>
                  <td>Max Supply</td>
                  <td>{coinDetails?.max_supply}</td>
                </tr>
                <tr>
                  <td>All Time High</td>
                  <td>${coinDetails?.ath}</td>
                </tr>
                <tr>
                  <td>ATH Change Percentage</td>
                  <td>{coinDetails?.ath_change_percentage}%</td>
                </tr>
                <tr>
                  <td>All Time Low</td>
                  <td>${coinDetails?.atl}</td>
                </tr>
                <tr>
                  <td>ATL Change Percentage</td>
                  <td>{coinDetails?.atl_change_percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}
