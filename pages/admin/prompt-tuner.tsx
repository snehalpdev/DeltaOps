import React from 'react';
import PromptTunerPanel from '@/components/PromptTunerPanel';

export default function PromptTunerAdminPage() {
  return (
    <main className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Prompt Tuner</h1>
      <PromptTunerPanel />
    </main>
  );
}
