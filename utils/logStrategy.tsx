import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logStrategyOutput(generatedText: string, variant?: string) {
  const ref = collection(db, 'strategyLogs');
  await addDoc(ref, {
    generatedText,
    createdAt: Timestamp.now(),
    tag: 'untagged',
    variant,
  });
}
