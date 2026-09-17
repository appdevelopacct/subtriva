'use client'

import { useState, useEffect } from 'react'
import { FileText, Search, Filter, Clock, User, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RecordsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadLogs()
  }, [])

  async function loadLogs() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('activity_logs')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (data) {
      setLogs(data.map((log: any) => {
        let icon = FileText
        let status = 'success'
        if (log.action.includes('Warning') || log.action.includes('Error')) {
          icon = AlertCircle
          status = 'warning'
        } else if (log.action.includes('Added') || log.action.includes('Created')) {
          icon = ArrowUpRight
        } else if (log.action.includes('Approved')) {
          icon = CheckCircle2
        }

        return {
          id: log.id,
          action: log.action,
          entity: log.entity,
          user: log.profiles?.full_name || 'System',
          time: new Date(log.created_at).toLocaleString(),
          status,
          icon
        }
      }))
    }
    setIsLoading(false)
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Activity Records</h2>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive history of all actions, uploads, and compliance changes.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[300px] relative">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm transition-shadow"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 shadow-sm w-full sm:w-auto">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center z-10 backdrop-blur-sm mt-[72px]">
            <Loader2 className="w-8 h-8 text-[#F25900] animate-spin" />
          </div>
        )}

        <div className="p-0">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {logs.map((log) => (
              <li key={log.id} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors group">
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    log.status === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:text-[#F25900] group-hover:bg-[#F25900]/10'
                  } transition-colors`}>
                    <log.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      {log.action}
                      <span className="text-slate-400 font-normal">·</span>
                      <span className="text-slate-600 dark:text-slate-300">{log.entity}</span>
                    </h4>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {log.user}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 whitespace-nowrap sm:text-right">
                  <Clock className="w-3.5 h-3.5" />
                  {log.time}
                </div>
              </li>
            ))}
            {!isLoading && logs.length === 0 && (
              <li className="p-8 text-center text-slate-500">No activity records found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
