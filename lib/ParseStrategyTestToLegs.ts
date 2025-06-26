type ParsedLeg = {
  type: 'call' | 'put';
  strike: number;
  premium?: number;
  side: 'buy' | 'sell';
};

export function parseStrategyTextToLegs(text: string): ParsedLeg[] {
  const legRegex = /(buy|sell)\s+(\d+)\s+(call|put)\s+at\s+(\d+)/gi;
  const matches = [...text.matchAll(legRegex)];

  return matches.map((m) => ({
    side: m[1] as 'buy' | 'sell',
    strike: parseFloat(m[4]),
    type: m[3] as 'call' | 'put',
  }));
}
