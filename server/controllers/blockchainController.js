const axios = require('axios');
const { redisClient } = require('../utils/cache');

const getAddressBalance = async (req, res) => {
  try {
    const { address } = req.params;
    const cacheKey = `balance:${address}`;
    
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    /**
     * Fetches the balance for the given Blockchain address using the Blockchain.info API.
     * @param {string} address - The Blockchain address to fetch the balance for.
     * @returns {Promise<Object>} - An object containing the final balance and total received for the address.
     */
    const response = await axios.get(
      `https://blockchain.info/balance?active=${address}`
    );
    
    const balanceData = {
      final_balance: response.data[address].final_balance,
      total_received: response.data[address].total_received
    };

    await redisClient.setEx(cacheKey, 300, JSON.stringify(balanceData));
    
    res.json(balanceData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};

const getAddressTransactions = async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(
      `https://blockchain.info/rawaddr/${address}?limit=10`
    );
    
    const transactions = response.data.txs.map(tx => ({
      hash: tx.hash,
      time: new Date(tx.time * 1000).toISOString(),
      value: tx.result,
      inputs: tx.inputs.map(input => input.prev_out.addr),
      outputs: tx.out.map(output => output.addr)
    }));

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

const getHistoricalData = async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(
      `https://blockchain.info/rawaddr/${address}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
};

const getTransactionCount = async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(
      `https://blockchain.info/rawaddr/${address}`
    );
    const transactionCount = response.data.n_tx;
    res.json({ address, transactionCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction count' });
  }
};

const validateAddress = (req, res) => {
  const { address } = req.params;
  const isValid = /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address);
  res.json({ address, valid: isValid });
};

// Export the new functions
module.exports = { getAddressBalance, getAddressTransactions, getHistoricalData, getTransactionCount, validateAddress };