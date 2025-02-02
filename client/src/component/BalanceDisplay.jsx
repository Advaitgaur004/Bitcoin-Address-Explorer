import { FiBitcoin } from 'react-icons/fi';

const BalanceDisplay = ({ final_balance, total_received }) => {
  const formatBTC = (satoshi) => (satoshi / 100000000).toFixed(8);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiBitcoin className="text-orange-500" /> Wallet Balance
      </h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Current Balance:</span>
          <span className="font-mono">{formatBTC(final_balance)} BTC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Received:</span>
          <span className="font-mono">{formatBTC(total_received)} BTC</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;