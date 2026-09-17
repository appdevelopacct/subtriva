'use client'

import Link from 'next/link'
import { Loader2, Wrench } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-10 w-auto object-contain" />
            <span className="text-[#FF6B35] text-2xl font-bold tracking-tight mt-1">Subtriva</span>
          </Link>
        </div>
        
        <div className="mt-12 bg-white dark:bg-slate-800/60 backdrop-blur-xl py-12 px-4 shadow-xl border border-slate-200/60 dark:border-slate-700/50 sm:rounded-2xl sm:px-10 text-center flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#FF6B35]/10 rounded-full blur-xl animate-pulse" />
            <Loader2 className="w-16 h-16 text-[#FF6B35] animate-spin relative z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Wrench className="w-6 h-6 text-[#FF6B35]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
            System Maintenance
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
            We are currently performing scheduled maintenance and platform upgrades. 
            Sign in and account creation are temporarily disabled. Please check back later.
          </p>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 w-full flex justify-center">
            <Link 
              href="/" 
              className="text-sm font-medium text-slate-500 hover:text-[#FF6B35] dark:text-slate-400 dark:hover:text-[#FF6B35] transition-colors"
            >
              &larr; Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
