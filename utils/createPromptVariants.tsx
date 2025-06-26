export function createPromptVariants(basePrompt: string, modifiers: string[]): string[] {
  return modifiers.map((mod) => `${basePrompt}\n\nConstraint: ${mod}`);
}
