import { useState } from 'react';
import { generateText } from '@/lib/genkit';

export function usePromptTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runPrompt = async (prompt: string) => {
    setLoading(true);
    try {
      const res = await generateText({ prompt });
      setResult(res?.text() ?? 'No output');
    } catch (err) {
      console.error('Prompt test error:', err);
      setResult('Error running prompt');
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, runPrompt };
}
