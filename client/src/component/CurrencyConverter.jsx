import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiDollarSign, FiEuro } from 'react-icons/fi';

const CurrencyConverter = ({ balance }) => {
  const [currency, setCurrency] = useState('USD');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/currency/price?currency=${currency}`);
        setPrice(response.data);
      } catch (error) {
        console.error('Error fetching price:', error);
      } finally {
        setLoading(false);
      }
    };

    if (balance > 0) fetchPrice();
  }, [currency, balance]);

  const btcAmount = balance / 100000000;
  const convertedValue = price ? (btcAmount * price).toLocaleString() : null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Currency Conversion</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        {loading ? (
          <div className="animate-pulse">Loading...</div>
        ) : convertedValue ? (
          <div className="text-lg font-semibold">
            {btcAmount.toFixed(8)} BTC ={' '}
            <span className="text-green-600">
              {currency === 'USD' && <FiDollarSign className="inline" />}
              {currency === 'EUR' && <FiEuro className="inline" />}
              {convertedValue} {currency}
            </span>
          </div>
        ) : (
          <div className="text-gray-500">Enter an address to see conversion</div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;