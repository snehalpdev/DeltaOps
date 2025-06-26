import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 px-4 py-6 space-y-4 border-r border-slate-800">
        <h2 className="text-xl font-bold text-yellow-400">DeltaOps</h2>
        <nav className="space-y-2 text-sm">
          <Link href="/admin/strategy-viewer" className="block hover:text-yellow-300">
            📈 Strategy Viewer
          </Link>
          <Link href="/admin/prompt-builder" className="block hover:text-yellow-300">
            🔧 Prompt Builder
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}