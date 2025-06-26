import type { Leg } from '@/types/strategy';

export function simulatePayoffSeries(legs: Leg[], range: [number, number]) {
  const data = [];

  for (let spot = range[0]; spot <= range[1]; spot += 1) {
    const payoff = legs.reduce((sum, leg) => {
      const intrinsic = leg.type === 'call'
        ? Math.max(spot - leg.strike, 0)
        : Math.max(leg.strike - spot, 0);
      const payout = leg.side === 'buy'
        ? intrinsic - leg.premium
        : leg.premium - intrinsic;
      return sum + payout;
    }, 0);

    data.push({ spot, payoff });
  }

  return data;
}
