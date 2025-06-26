import React from 'react';
import StrategyLogAdmin from '@/components/StrategyLogAdmin';

export default function AdminLogsPage() {
  return (
    <main className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Strategy Logs Admin</h1>
      <StrategyLogAdmin />
    </main>
  );
}
