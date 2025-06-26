/**
 * Dummy scoring function.
 * Replace this with your actual scoring/enrichment logic.
 */
export function scoreStrategy(text: string): number {
  // Example: Simple string length-based "score"
  return Math.min(1, text.length / 100);
}
