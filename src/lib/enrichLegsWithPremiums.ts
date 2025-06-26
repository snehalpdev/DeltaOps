type LegInput = {
  type: 'call' | 'put';
  strike: number;
  side: 'buy' | 'sell';
};

type PremiumMap = {
  [strike: number]: number;
};

export function enrichLegsWithPremiums(legs: LegInput[], premiums: PremiumMap): (LegInput & { premium: number })[] {
  return legs.map((leg) => ({
    ...leg,
    premium: premiums[leg.strike] ?? 0
  }));
}
