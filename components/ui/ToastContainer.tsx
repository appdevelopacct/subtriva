'use client'

import { useToastStore, ToastType } from '@/lib/toast-store'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-0 right-0 z-[110] p-4 sm:p-6 flex flex-col gap-3 pointer-events-none w-full sm:max-w-sm max-w-[100vw]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            
            
            
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-xl p-4 pointer-events-auto flex items-start gap-3"
          >
            <div className="shrink-0">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
    </div>
  )
}
