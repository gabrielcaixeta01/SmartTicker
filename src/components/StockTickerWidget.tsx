'use client';
import { useEffect, useState } from 'react';

type TickerData = { symbol: string; price: number; change: number; };

export default function StockTickerWidget() {
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/ticker');
        if (!res.ok) throw new Error('Fetch failed');
        setTickers(await res.json());
      } catch {
        setError('Failed to load stock data');
      }
    };
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  if (error) return <div className="bg-red-900 text-red-400 p-2 text-center">{error}</div>;

  return (
    <div className="overflow-hidden mt-16 bg-[#0b0d17] border-b border-gray-800">
      <div className="flex animate-marquee hover:[animation-play-state:paused] space-x-8 px-6 py-2 text-sm text-gray-200">
        {tickers.map(({ symbol, price, change }) => (
          <div key={symbol} className="flex-shrink-0 min-w-[140px]">
            <span className="font-medium text-white mr-2">{symbol}</span>
            <span className="text-gray-400 mr-2">${price.toFixed(2)}</span>
            <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}