// hooks/useIVSmile.ts

import { useEffect, useState } from 'react';

export type IVSmilePoint = {
  strike: number;
  callIV: number;
};

export function useIVSmile(ticker: string) {
  const [expirations, setExpirations] = useState<number[]>([]);
  const [selectedExpiration, setSelectedExpiration] = useState<number | null>(null);
  const [data, setData] = useState<IVSmilePoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExpirations = async () => {
      const res = await fetch(`http://localhost:3001/expirations/${ticker}`);
      const json = await res.json();
      setExpirations(json);
      setSelectedExpiration(json[0]);
    };
    fetchExpirations();
  }, [ticker]);

  useEffect(() => {
    if (!selectedExpiration) return;
    const fetchIV = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/iv/${ticker}/${selectedExpiration}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    fetchIV();
  }, [ticker, selectedExpiration]);

  return {
    expirations,
    selectedExpiration,
    setSelectedExpiration,
    data,
    loading
  };
}
