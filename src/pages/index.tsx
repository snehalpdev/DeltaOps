import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-12 flex flex-col items-center justify-center gap-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to <span className="text-yellow-400">DeltaOps</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto text-slate-300">
          An AI-first options strategy engine — build, simulate, and analyze trades with live market data and LLM-augmented precision.
        </p>
        <Link
          href="/admin/strategy-viewer"
          className="inline-block mt-6 rounded-md bg-yellow-400 px-6 py-3 text-black font-medium hover:bg-yellow-300 transition"
        >
          Launch App
        </Link>
      </div>

      <div className="mt-12 opacity-20 text-sm text-slate-400">
        Powered by Next.js + Electron · Built for Speed
      </div>
    </main>
  );
}