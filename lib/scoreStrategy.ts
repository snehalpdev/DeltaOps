export function scoreStrategy(strategyText: string): number {
  const scoreWeights = {
    delta: 0.3,
    roc: 0.3,
    ivEdge: 0.2,
    clarity: 0.2,
  };

  const deltaScore = /delta.*(0\.\d+)/i.exec(strategyText)?.[1] ?? 0;
  const rocScore = /ROC.*?(\d+)%/i.exec(strategyText)?.[1] ?? 0;
  const ivMatch = /IV.*?(\d+)%.*?HV.*?(\d+)%/i.exec(strategyText);
  const ivEdgeScore = ivMatch ? (+ivMatch[2] - +ivMatch[1]) / 100 : 0;
  const clarityScore = strategyText.length > 200 ? 1 : 0.5;

  return (
    scoreWeights.delta * +deltaScore +
    scoreWeights.roc * +rocScore / 100 +
    scoreWeights.ivEdge * ivEdgeScore +
    scoreWeights.clarity * clarityScore
  );
}
