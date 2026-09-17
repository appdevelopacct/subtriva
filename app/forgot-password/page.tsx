import Link from 'next/link';
import { resetPassword } from './actions';

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; success?: string }>
}) {
  const { message, success } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-10 w-auto object-contain" />
            <span className="text-[#FF6B35] text-2xl font-bold tracking-tight mt-1">Subtriva</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-[#FF6B35] hover:text-[#E05928] transition-colors">
            Log in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800/60 backdrop-blur-xl py-8 px-4 shadow-xl border border-slate-200/60 dark:border-slate-700/50 sm:rounded-2xl sm:px-10">
          {message && (
            <div className="mb-4 p-4 text-sm text-amber-800 bg-amber-50 rounded-lg dark:bg-amber-900/30 dark:text-amber-300">
              {message}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 text-sm text-emerald-800 bg-emerald-50 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-300">
              {success}
            </div>
          )}
          
          <form className="space-y-6" action={resetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35] sm:text-sm dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#FF6B35] hover:bg-[#E05928] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
