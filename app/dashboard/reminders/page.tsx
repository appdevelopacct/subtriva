'use client'

import { useState, useEffect } from 'react'
import { Clock, Bell, AlertTriangle, Plus, MoreVertical, Calendar, Loader2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToastStore } from '@/lib/toast-store'

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState('Compliance')
  
  const [complianceReminders, setComplianceReminders] = useState<any[]>([])
  const [generalReminders, setGeneralReminders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const addToast = useToastStore(state => state.addToast)

  useEffect(() => {
    loadReminders()
  }, [])

  async function loadReminders() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Compliance Expirations (derive from documents table)
    const { data: docs } = await supabase
      .from('documents')
      .select('id, name, expiration_date, status, subcontractors(name)')
      .not('expiration_date', 'is', null)

    if (docs) {
      const formattedDocs = docs.map((d: any) => {
        const exp = new Date(d.expiration_date)
        const diff = Math.floor((exp.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
        return {
          id: d.id,
          type: d.name,
          company: d.subcontractors?.name || 'Unknown',
          date: exp.toLocaleDateString(),
          days: diff,
          status: diff < 0 ? 'expired' : 'upcoming'
        }
      }).sort((a: any, b: any) => a.days - b.days)
      setComplianceReminders(formattedDocs)
    }

    // General Reminders
    const { data: rems } = await supabase
      .from('reminders')
      .select('*')
      .eq('is_general', true)
      .eq('is_completed', false)
      .order('due_date', { ascending: true })
      
    if (rems) {
      setGeneralReminders(rems.map((r: any) => ({
        id: r.id,
        title: r.title,
        date: r.due_date ? new Date(r.due_date).toLocaleDateString() : 'No date',
        status: 'upcoming'
      })))
    }
    
    setIsLoading(false)
  }
  
  const completeGeneralReminder = async (id: string) => {
    try {
      const supabase = createClient()
      await supabase.from('reminders').update({ is_completed: true }).eq('id', id)
      setGeneralReminders(prev => prev.filter((r: any) => r.id !== id))
      addToast({ title: 'Reminder completed', type: 'success' })
    } catch (e: any) {
      addToast({ title: 'Error', message: e.message, type: 'error' })
    }
  }

  const createGeneralReminder = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      const { data: member } = await supabase.from('company_members').select('company_id').eq('user_id', user.id).single()
      if (!member) return
      
      const title = window.prompt("Reminder Title")
      if (!title) return
      
      await supabase.from('reminders').insert([{
        company_id: member.company_id,
        user_id: user.id,
        title,
        is_general: true,
        due_date: new Date(Date.now() + 86400000).toISOString() // Tomorrow
      }])
      
      addToast({ title: 'Reminder created', type: 'success' })
      loadReminders()
    } catch (e: any) {
      addToast({ title: 'Error', message: e.message, type: 'error' })
    }
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Reminders</h2>
          <p className="text-slate-600 dark:text-slate-400">Track compliance expirations and general to-dos.</p>
        </div>
        <button onClick={createGeneralReminder} className="bg-[#F25900] hover:bg-[#D94F00] text-white px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm text-sm">
          <Plus className="w-4 h-4" />
          Create Reminder
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[300px] relative">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 px-4">
          <button
            onClick={() => setActiveTab('Compliance')}
            className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'Compliance' ? 'border-[#F25900] text-[#F25900]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Compliance Expirations
          </button>
          <button
            onClick={() => setActiveTab('General')}
            className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'General' ? 'border-[#F25900] text-[#F25900]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            <Bell className="w-4 h-4" />
            General Reminders
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center z-10 backdrop-blur-sm mt-[53px]">
            <Loader2 className="w-8 h-8 text-[#F25900] animate-spin" />
          </div>
        )}

        {/* Content */}
        <div className="p-0">
          {activeTab === 'Compliance' && (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {complianceReminders.map(rem => (
                <li key={rem.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${rem.status === 'expired' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30' : rem.days < 30 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'}`}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm">{rem.type}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{rem.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium text-sm ${rem.status === 'expired' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                      {rem.date}
                    </div>
                    <div className={`text-xs mt-0.5 ${rem.status === 'expired' ? 'text-rose-500' : rem.days < 30 ? 'text-amber-500' : 'text-slate-500'}`}>
                      {rem.status === 'expired' ? `${Math.abs(rem.days)} days ago` : `In ${rem.days} days`}
                    </div>
                  </div>
                </li>
              ))}
              {!isLoading && complianceReminders.length === 0 && (
                <li className="p-8 text-center text-slate-500">No compliance expirations found.</li>
              )}
            </ul>
          )}

          {activeTab === 'General' && (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {generalReminders.map(rem => (
                <li key={rem.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm">{rem.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{rem.date}</p>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => completeGeneralReminder(rem.id)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100" title="Mark complete">
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
              {!isLoading && generalReminders.length === 0 && (
                <li className="p-8 text-center text-slate-500">No general reminders found.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
