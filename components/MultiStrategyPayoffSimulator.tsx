import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid
} from 'recharts';

type Leg = {
  type: 'call' | 'put';
  strike: number;
  premium: number;
  side: 'buy' | 'sell';
};

type Strategy = {
  label: string;
  color: string;
  legs: Leg[];
};

type Props = {
  currentPrice: number;
  strategies: Strategy[];
};

function generatePayoff(spot: number, leg: Leg): number {
  const intrinsic =
    leg.type === 'call'
      ? Math.max(spot - leg.strike, 0)
      : Math.max(leg.strike - spot, 0);
  const payout = leg.side === 'buy' ? intrinsic - leg.premium : leg.premium - intrinsic;
  return payout;
}

function computeSeries(strategies: Strategy[], range: [number, number]): any[] {
  const data: any[] = [];

  for (let spot = range[0]; spot <= range[1]; spot += 1) {
    const row: any = { spot };
    strategies.forEach((s) => {
      row[s.label] = s.legs.reduce((sum, leg) => sum + generatePayoff(spot, leg), 0);
    });
    data.push(row);
  }

  return data;
}

export default function MultiStrategyPayoffSimulator({ currentPrice, strategies }: Props) {
  const range: [number, number] = [Math.floor(currentPrice * 0.8), Math.ceil(currentPrice * 1.2)];
  const data = computeSeries(strategies, range);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
        <XAxis dataKey="spot" />
        <YAxis />
        <Tooltip />
        <ReferenceLine x={currentPrice} stroke="#8884d8" label="Current" />

        {strategies.map((s) => (
          <Line
            key={s.label}
            type="monotone"
            dataKey={s.label}
            stroke={s.color}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
