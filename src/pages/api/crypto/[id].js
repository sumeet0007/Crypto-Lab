// src/pages/api/crypto/[id].js

import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  const apiKey = process.env.COIN_GECKO_API_KEY;

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '30', // last 30 days of data
        localization: false
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
