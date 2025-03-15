const express = require('express');
const router = express.Router();
const {
  getAddressBalance,
  getAddressTransactions,
  getHistoricalData,
  getTransactionCount,
  validateAddress
} = require('../controllers/blockchainController');
const { validateBitcoinAddress } = require('../utils/validators');

router.get('/balance/:address', validateBitcoinAddress, getAddressBalance);
router.get('/transactions/:address', validateBitcoinAddress, getAddressTransactions);
router.get('/historical/:address', validateBitcoinAddress, getHistoricalData);
router.get('/transaction-count/:address', validateBitcoinAddress, getTransactionCount);
router.get('/validate/:address', validateBitcoinAddress, validateAddress);

module.exports = router;