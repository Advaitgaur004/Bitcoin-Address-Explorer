const express = require('express');
const router = express.Router();
const {
  getAddressBalance,
  getAddressTransactions
} = require('../controllers/blockchainController');
const { validateBitcoinAddress } = require('../utils/validators');

router.get('/balance/:address', validateBitcoinAddress, getAddressBalance);
router.get('/transactions/:address', validateBitcoinAddress, getAddressTransactions);

module.exports = router;