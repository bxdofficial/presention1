import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-[#0a0a12] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-cyan-400 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold text-cyan-400 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Circuit Not Found</h2>
        <p className="text-white/60 mb-8">
          The page you're looking for seems to have been disconnected from the circuit.
        </p>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold w-full">
              Return to Presentation
            </Button>
          </Link>
          
          <div className="pt-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Looking for something specific? The presentation has 15 slides covering NPN transistor operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
