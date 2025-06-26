import React, { useState } from 'react';
import { generateText } from '@/lib/genkit'; // Your Genkit LLM hook
import { Textarea, Button } from '@/components/ui';

export default function PromptTunerPanel() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    const res = await generateText({ prompt });
    setOutput(res?.text() ?? 'No response');
  };

  return (
    <div className="space-y-4 p-4 bg-neutral-900 rounded-md">
      <h2 className="text-lg font-semibold text-white">Gemini Prompt Tuner</h2>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Paste your prompt template here…"
        rows={6}
      />
      <Button onClick={handleRun} className="bg-sky-600 text-white">Run Prompt</Button>
      <div className="bg-neutral-800 text-sm text-green-300 p-3 rounded">
        {output}
      </div>
    </div>
  );
}
