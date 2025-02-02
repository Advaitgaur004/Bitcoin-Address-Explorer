import { FiClock, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const TransactionList = ({ transactions }) => {
  const formatBTC = (value) => (value / 100000000).toFixed(8);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.hash} className="border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {tx.inputs.includes(tx.outputs[0]) ? (
                  <FiArrowUpRight className="text-green-500" />
                ) : (
                  <FiArrowDownLeft className="text-blue-500" />
                )}
                <span className="font-mono text-sm truncate max-w-[120px]">
                  {tx.hash}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                <FiClock className="inline mr-1" />
                {formatDistanceToNow(new Date(tx.time))} ago
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {formatBTC(tx.value)} BTC
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;