// lib/enrichLegsWithGreeks.ts

import { Leg } from '@/types/strategy';

type GreeksMap = {
  [strike: number]: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    impliedVolatility: number;
  };
};

export function enrichLegsWithGreeks(legs: Leg[], greeksMap: GreeksMap): Leg[] {
  return legs.map((leg) => ({
    ...leg,
    ...greeksMap[leg.strike],
  }));
}
