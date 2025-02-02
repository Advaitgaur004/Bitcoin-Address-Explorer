require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { rateLimit } = require('./config/ratelimit');
const blockchainRoutes = require('./routes/blockchain');
const currencyRoutes = require('./routes/currency');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(rateLimit);

app.use('/api/blockchain', blockchainRoutes);
app.use('/api/currency', currencyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});