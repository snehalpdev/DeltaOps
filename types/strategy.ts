// types/strategy.ts

export type Leg = {
  type: 'call' | 'put';
  strike: number;
  premium: number;
  side: 'buy' | 'sell';
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  impliedVolatility?: number;
};
