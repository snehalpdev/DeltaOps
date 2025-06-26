import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function StrategyLogAdmin() {
  const [logs, setLogs] = useState<any[]>([]);

  const fetchLogs = async () => {
    const snapshot = await getDocs(collection(db, 'strategyLogs'));
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setLogs(data);
  };

  const updateLog = async (id: string, updates: Partial<any>) => {
    const logRef = doc(db, 'strategyLogs', id);
    await updateDoc(logRef, updates);
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-4 space-y-4 bg-neutral-900 text-white">
      <h2 className="text-xl font-semibold">Strategy Logs</h2>
      {logs.map((log) => (
        <div key={log.id} className="bg-neutral-800 p-3 rounded-md space-y-2">
          <p className="font-mono text-sm">{log.generatedText}</p>
          <div className="flex gap-3">
            <button onClick={() => updateLog(log.id, { tag: 'good' })} className="text-green-400 hover:underline">👍 Good</button>
            <button onClick={() => updateLog(log.id, { tag: 'bad' })} className="text-red-400 hover:underline">👎 Bad</button>
            <button onClick={() => updateLog(log.id, { tag: 'needs_tuning' })} className="text-yellow-400 hover:underline">🔧 Needs Tuning</button>
          </div>
        </div>
      ))}
    </div>
  );
}
