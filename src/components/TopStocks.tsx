'use client';
import { useState, useEffect } from 'react';

type Stock = { symbol: string; price: number; change: number; };

export default function TopStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetch('/api/ticker')
      .then(res => res.json())
      .then(setStocks)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {stocks.map(({ symbol, price, change }) => (
        <div key={symbol} className="bg-gray-800 p-4 rounded shadow flex flex-col items-center">
          <span className="font-semibold text-white">{symbol}</span>
          <span className="text-xl text-gray-300">${price.toFixed(2)}</span>
          <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}