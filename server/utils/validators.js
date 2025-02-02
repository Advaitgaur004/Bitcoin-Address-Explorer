const validator = require('validator');

exports.validateBitcoinAddress = (req, res, next) => {
  const { address } = req.params;
  
  if (!validator.matches(address, /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/)) {
    return res.status(400).json({ error: 'Invalid Bitcoin address' });
  }
  
  next();
};