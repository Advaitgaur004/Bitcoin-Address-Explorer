import { useState } from 'react';
import AddressSearch from './components/AddressSearch';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionList from './components/TransactionList';
import QRGenerator from './components/QRGenerator';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [addressData, setAddressData] = useState(null);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Bitcoin Address Explorer
      </h1>
      
      <AddressSearch onSearch={setAddressData} />
      
      {addressData && (
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <div className="space-y-6">
            <BalanceDisplay {...addressData.balance} />
            <CurrencyConverter balance={addressData.balance.final_balance} />
            <QRGenerator address={addressData.address} />
          </div>
          <TransactionList transactions={addressData.transactions} />
        </div>
      )}
    </div>
  );
}

export default App;