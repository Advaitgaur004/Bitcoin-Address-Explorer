const axios = require('axios');
const { redisClient } = require('../utils/cache');

const getBTCPrice = async (req, res) => {
  try {
    const { currency = 'USD' } = req.query;
    const cacheKey = `btcprice:${currency}`;

    const cachedPrice = await redisClient.get(cacheKey);
    if (cachedPrice) return res.json(Number(cachedPrice));

    const response = await axios.get(
      `https://coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`
    );

    const price = response.data.bitcoin[currency.toLowerCase()];
    await redisClient.setEx(cacheKey, 60, price.toString());

    res.json(price);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch BTC price' });
  }
};

module.exports = { getBTCPrice };