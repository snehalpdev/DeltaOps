import React, { useRef, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
  Legend
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Leg } from '@/types/strategy';
import type { IVSmilePoint } from '@/hooks/useIVSmile';

type Strategy = {
  label: string;
  color: string;
  legs: Leg[];
};

type Props = {
  currentPrice: number;
  strategies: Strategy[];
  darkMode?: boolean;
  ivSmile?: IVSmilePoint[];
  expiration?: number;
  expirations?: number[];
  onSelectExpiration?: (exp: number) => void;
};

function generatePayoff(spot: number, leg: Leg): number {
  const intrinsic =
    leg.type === 'call'
      ? Math.max(spot - leg.strike, 0)
      : Math.max(leg.strike - spot, 0);

  return leg.side === 'buy'
    ? intrinsic - leg.premium
    : leg.premium - intrinsic;
}

function computeSeries(
  strategies: Strategy[],
  range: [number, number],
  perLeg: boolean,
  ivSmile?: IVSmilePoint[]
) {
  const data: any[] = [];

  for (let spot = range[0]; spot <= range[1]; spot += 1) {
    const row: any = { spot };

    strategies.forEach((s) => {
      let payoff = 0,
        delta = 0,
        theta = 0,
        vega = 0;

      s.legs.forEach((leg) => {
        payoff += generatePayoff(spot, leg);
        const m = leg.side === 'buy' ? 1 : -1;
        delta += m * (leg.delta ?? 0);
        theta += m * (leg.theta ?? 0);
        vega += m * (leg.vega ?? 0);
      });

      row[s.label] = payoff;
      row[`${s.label}_delta`] = perLeg ? delta / s.legs.length : delta;
      row[`${s.label}_theta`] = perLeg ? theta / s.legs.length : theta;
      row[`${s.label}_vega`] = perLeg ? vega / s.legs.length : vega;
    });

    // Overlay IV Smile
    if (ivSmile?.length) {
      const nearest = ivSmile.reduce((prev, curr) =>
        Math.abs(curr.strike - spot) < Math.abs(prev.strike - spot) ? curr : prev
      );
      row.ivSmile = nearest.callIV;
    }

    data.push(row);
  }

  return data;
}

function exportCSV(data: any[], strategies: Strategy[]) {
  const keys = ['spot', 'ivSmile', ...strategies.flatMap(s =>
    [s.label, `${s.label}_delta`, `${s.label}_theta`, `${s.label}_vega`]
  )];
  const header = keys.join(',');
  const body = data.map(row =>
    keys.map(k => row[k]?.toFixed?.(2) ?? '').join(',')
  ).join('\n');

  const blob = new Blob([header + '\n' + body], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'payoff_chart.csv';
  a.click();
}

async function exportPDF(containerRef: React.RefObject<HTMLDivElement>) {
  if (!containerRef.current) return;
  const canvas = await html2canvas(containerRef.current);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape' });
  pdf.addImage(imgData, 'PNG', 10, 10, 270, 140);
  pdf.save('payoff_chart.pdf');
}

export default function MultiStrategyPayoffSimulator({
  currentPrice,
  strategies,
  darkMode = true,
  ivSmile,
  expiration,
  expirations,
  onSelectExpiration
}: Props) {
  const [perLeg, setPerLeg] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const range: [number, number] = [
    Math.floor(currentPrice * 0.8),
    Math.ceil(currentPrice * 1.2)
  ];

  const data = computeSeries(strategies, range, perLeg, ivSmile);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap items-center">
        <button
          onClick={() => exportCSV(data, strategies)}
          className="text-sm px-3 py-1 bg-sky-700 text-white rounded"
        >
          📄 CSV
        </button>
        <button
          onClick={() => exportPDF(chartRef)}
          className="text-sm px-3 py-1 bg-indigo-700 text-white rounded"
        >
          📄 PDF
        </button>

        {expirations?.length && onSelectExpiration ? (
          <select
            value={expiration}
            onChange={(e) => onSelectExpiration(Number(e.target.value))}
            className="text-sm px-2 py-1 bg-neutral-800 text-white rounded ml-auto"
          >
            {expirations.map((exp) => (
              <option key={exp} value={exp}>
                {new Date(exp * 1000).toLocaleDateString()}
              </option>
            ))}
          </select>
        ) : null}

        <label className="text-sm text-white flex items-center gap-2 ml-auto">
          <input
            type="checkbox"
            checked={perLeg}
            onChange={() => setPerLeg(!perLeg)}
          />
          Per-Leg Greeks
        </label>
      </div>

      <div ref={chartRef} className={`${darkMode ? 'bg-neutral-900' : 'bg-white'} p-2 rounded`}>
        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={data}>
            <CartesianGrid stroke={darkMode ? '#444' : '#ccc'} />
            <XAxis dataKey="spot" />
            <YAxis />
            <Tooltip
              content={({ payload, label }) => {
                if (!payload || !label) return null;
                return (
                  <div className={`p-2 rounded text-sm ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <p><strong>Spot:</strong> {label}</p>
                    <p className="text-xs italic">IV: {payload.find(p => p.dataKey === 'ivSmile')?.value?.toFixed(2)}%</p>
                    {strategies.map((s) => {
                      const p = (suffix: string) =>
                        payload.find(p => p.dataKey === `${s.label}${suffix}`)?.value?.toFixed(2) ?? '--';
                      return (
                        <div key={s.label}>
                          <p style={{ color: s.color }}>{s.label}: {p('')}</p>
                          <p className="text-xs text-gray-300">
                            Δ {p('_delta')} | Θ {p('_theta')} | V {p('_vega')}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Legend />
            <ReferenceLine x={currentPrice} stroke="#8884d8" label="Current" />

            {strategies.map((s) => (
              <React.Fragment key={s.label}>
                <Line
                  type="monotone"
                  dataKey={s.label}
                  stroke={s.color}
                  dot={false}
                  strokeWidth={2}
                />
              </React.Fragment>
            ))}

            {ivSmile ? (
              <Line
                type="monotone"
                dataKey="ivSmile"
                stroke="#cccccc"
                strokeDasharray="4 2"
                dot={false}
                name="IV Smile"
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
