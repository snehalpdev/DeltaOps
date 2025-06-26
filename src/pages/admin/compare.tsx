import React, { useState } from 'react';
import { Textarea } from '@/components/ui';

export default function PromptComparePage() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  return (
    <main className="max-w-5xl mx-auto py-6 px-4 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Prompt Output Comparison</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-semibold">Variant A</label>
          <Textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={12} />
        </div>
        <div className="space-y-2">
          <label className="font-semibold">Variant B</label>
          <Textarea value={right} onChange={(e) => setRight(e.target.value)} rows={12} />
        </div>
      </div>
    </main>
  );
}
