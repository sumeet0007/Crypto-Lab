import axios from 'axios';

export default async function handler(req, res) {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/markets',
      params: {
        vs_currency: 'usd'
      },
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY // Use the API key from environment variables
      }
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
