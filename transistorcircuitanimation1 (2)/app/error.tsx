'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="h-screen w-screen bg-[#0a0a12] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Circuit Malfunction</h2>
        <p className="text-white/60 mb-6">
          Something went wrong with the presentation. Please try again.
        </p>
        
        {error.message && (
          <div className="bg-red-900/20 border border-red-400/20 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm font-mono">{error.message}</p>
          </div>
        )}
        
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  )
}
