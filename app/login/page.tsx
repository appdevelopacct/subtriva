'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Lock, Mail, User, Building, AlertCircle, Loader2, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToastStore } from '@/lib/toast-store'

export default function LoginPage() {
  const router = useRouter()
  const addToast = useToastStore((state) => state.addToast)
  
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    const supabase = createClient()

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setErrorMsg(error.message)
          addToast(error.message, 'error')
        } else {
          addToast('Signed in successfully', 'success')
          router.push('/dashboard')
          router.refresh()
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              company_name: companyName,
            },
          },
        })

        if (error) {
          setErrorMsg(error.message)
          addToast(error.message, 'error')
        } else {
          setSuccessMsg('Account created successfully! Please check your email for verification link, or use Demo Mode to test immediately.')
          addToast('Account created successfully!', 'success')
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickDemoAccess = () => {
    // Set demo cookie and redirect to dashboard
    document.cookie = 'demo_mode=true; path=/; max-age=86400'
    addToast('Entering GC Interactive Demo Mode', 'info')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-10 w-auto object-contain" />
            <span className="text-[#FF6B35] text-2xl font-bold tracking-tight mt-1">Subtriva</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {mode === 'signin' ? 'Sign in to your account' : 'Start your contractor compliance workspace'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          {mode === 'signin' ? (
            <>
              New to Subtriva?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup')
                  setErrorMsg(null)
                  setSuccessMsg(null)
                }}
                className="font-medium text-[#FF6B35] hover:text-[#E05928]"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin')
                  setErrorMsg(null)
                  setSuccessMsg(null)
                }}
                className="font-medium text-[#FF6B35] hover:text-[#E05928]"
              >
                Sign in here
              </button>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl py-8 px-4 shadow-xl border border-slate-200/60 dark:border-slate-700/50 sm:rounded-2xl sm:px-10">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signin')
                setErrorMsg(null)
                setSuccessMsg(null)
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                setErrorMsg(null)
                setSuccessMsg(null)
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-300 font-medium">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">{successMsg}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Miller"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    General Contractor / Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Builders Inc."
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-[#FF6B35] hover:bg-[#E05928] text-white font-medium rounded-lg shadow-md shadow-[#FF6B35]/20 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : mode === 'signin' ? (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 font-medium">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold rounded-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-600"
          >
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            Enter Interactive Demo Dashboard
          </button>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-[#FF6B35] dark:text-slate-400 dark:hover:text-[#FF6B35] transition-colors"
            >
              &larr; Return to Subtriva Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
