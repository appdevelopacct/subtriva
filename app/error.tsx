'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">
            Something went wrong!
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {error.message || 'An unexpected error occurred.'}
          </p>
        </div>
        <div>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#FF6B35] hover:bg-[#E05928] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35]"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
