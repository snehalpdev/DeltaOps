export function enrichWithFilters(prompt: string, prefs: {
  deltaRange?: [number, number],
  ivRank?: number,
  minRoc?: number
}): string {
  const parts = [];
  if (prefs.deltaRange) parts.push(`prefer delta between ${prefs.deltaRange[0]} and ${prefs.deltaRange[1]}`);
  if (prefs.ivRank) parts.push(`prefer IV Rank above ${prefs.ivRank}`);
  if (prefs.minRoc) parts.push(`prefer ROC higher than ${prefs.minRoc}%`);
  return `${prompt}\n\nTrader filters: ${parts.join(', ')}.`;
}
