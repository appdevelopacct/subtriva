import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex flex-col items-center justify-center px-4 text-center">
      <div className="flex items-center gap-2 mb-6">
        <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-10 w-auto object-contain" />
        <span className="text-[#FF6B35] text-2xl font-bold tracking-tight mt-1">Subtriva</span>
      </div>
      <h1 className="text-6xl font-extrabold text-[#FF6B35] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Page Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 text-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#FF6B35] hover:bg-[#E05928] text-white font-medium rounded-full shadow-md transition-all text-sm"
      >
        Return to Homepage
      </Link>
    </div>
  )
}
