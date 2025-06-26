// components/StrategyGreeksSummary.tsx

import React from 'react';
import { Leg } from '@/types/strategy';

export default function StrategyGreeksSummary({ legs }: { legs: Leg[] }) {
  const summary = legs.reduce(
    (acc, leg) => {
      const mult = leg.side === 'buy' ? 1 : -1;
      acc.delta += mult * (leg.delta ?? 0);
      acc.gamma += mult * (leg.gamma ?? 0);
      acc.theta += mult * (leg.theta ?? 0);
      acc.vega  += mult * (leg.vega  ?? 0);
      acc.iv    += mult * (leg.impliedVolatility ?? 0);
      return acc;
    },
    { delta: 0, gamma: 0, theta: 0, vega: 0, iv: 0 }
  );

  return (
    <div className="bg-neutral-800 text-sm text-white p-4 rounded-md space-y-1">
      <p><strong>Net Delta:</strong> {summary.delta.toFixed(2)}</p>
      <p><strong>Net Gamma:</strong> {summary.gamma.toFixed(2)}</p>
      <p><strong>Net Theta:</strong> {summary.theta.toFixed(2)}</p>
      <p><strong>Net Vega:</strong> {summary.vega.toFixed(2)}</p>
      <p><strong>Avg IV:</strong> {(summary.iv / legs.length).toFixed(2)}</p>
    </div>
  );
}
