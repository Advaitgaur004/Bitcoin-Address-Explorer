const express = require('express');
const router = express.Router();
const { getBTCPrice } = require('../controllers/currencyController');

router.get('/price', getBTCPrice);

module.exports = router;