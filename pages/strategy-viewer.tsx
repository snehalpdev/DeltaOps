import { useState } from 'react';
import MultiStrategyPayoffSimulator from '@/components/MultiStrategyPayoffSimulator';
import { useIVSmile } from '@/hooks/useIVSmile';

const mockStrategies = [
  {
    label: 'Iron Condor',
    color: '#6EE7B7',
    legs: [
      { type: 'call', strike: 460, premium: 6, side: 'sell' },
      { type: 'call', strike: 470, premium: 3, side: 'buy' },
      { type: 'put', strike: 440, premium: 5.5, side: 'sell' },
      { type: 'put', strike: 430, premium: 2.5, side: 'buy' },
    ],
  },
];

export default function StrategyViewer() {
  const ticker = 'SPY';
  const currentPrice = 450;
  const {
    expirations,
    selectedExpiration,
    setSelectedExpiration,
    data: ivSmile,
  } = useIVSmile(ticker);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Strategy + Volatility Explorer</h1>

      <MultiStrategyPayoffSimulator
        currentPrice={currentPrice}
        strategies={mockStrategies}
        ivSmile={ivSmile}
        expiration={selectedExpiration}
        expirations={expirations}
        onSelectExpiration={setSelectedExpiration}
        darkMode
      />

      {ivSmile?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">📉 Volatility Skew</h2>
          <div className="overflow-x-auto w-full bg-neutral-800 rounded p-4">
            <table className="text-sm min-w-full table-auto text-left">
              <thead>
                <tr className="border-b border-neutral-600">
                  <th className="pr-4 pb-1">Strike</th>
                  <th className="pr-4 pb-1">Call IV (%)</th>
                </tr>
              </thead>
              <tbody>
                {ivSmile.map((row) => (
                  <tr key={row.strike} className="border-b border-neutral-700">
                    <td className="pr-4 py-1">{row.strike}</td>
                    <td className="pr-4 py-1">{row.callIV.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
