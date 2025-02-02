import { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';

const AddressSearch = ({ onSearch }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const [balanceRes, txRes] = await Promise.all([
        axios.get(`/api/blockchain/balance/${address}`),
        axios.get(`/api/blockchain/transactions/${address}`)
      ]);
      
      onSearch({
        address,
        balance: balanceRes.data,
        transactions: txRes.data
      });
    } catch (error) {
      alert('Error fetching address data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Bitcoin Address"
          className="flex-1 p-3 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <FiSearch className="inline-block mr-2" />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default AddressSearch;