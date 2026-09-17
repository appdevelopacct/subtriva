'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Plus, UserPlus, Users, ChevronRight, ArrowUpDown, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Drawer } from '@/components/ui/Drawer'
import { createClient } from '@/lib/supabase/client'
import { addSubcontractorToCompany } from '@/app/actions/subcontractorActions'
import { useToastStore } from '@/lib/toast-store'

export default function SubcontractorsPage() {
  const [subs, setSubs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const router = useRouter()
  const addToast = useToastStore(state => state.addToast)
  
  useEffect(() => {
    loadSubs()
  }, [])

  async function loadSubs() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data, error } = await supabase
      .from('subcontractors')
      .select('*, documents(count)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      const formatted = data.map((s: any) => ({
        id: s.id,
        name: s.name,
        contact: s.contact_name || s.email || 'N/A',
        docs: s.documents?.[0]?.count || 0,
        status: s.status || 'Pending Review'
      }))
      setSubs(formatted)
    }
    setIsLoading(false)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addSubcontractorToCompany({ name, email })
      addToast({ title: 'Subcontractor added', type: 'success' })
      setIsModalOpen(false)
      setName('')
      setEmail('')
      loadSubs()
    } catch (error: any) {
      addToast({ title: 'Error', message: error.message, type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Subcontractors</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your subcontractor network and track their compliance status.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" className="bg-[#F25900] hover:bg-[#D94F00] text-white px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm text-sm">
          <UserPlus className="w-4 h-4" />
          Add Subcontractor
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col relative min-h-[300px]">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search subcontractors..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 focus:border-[#F25900] shadow-sm transition-shadow"
            />
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center z-10 backdrop-blur-sm mt-[72px]">
            <Loader2 className="w-8 h-8 text-[#F25900] animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Company Name</th>
                <th className="px-6 py-4 font-medium tracking-wider">Primary Contact</th>
                <th className="px-6 py-4 font-medium tracking-wider">Total Docs</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {subs.map((sub) => (
                <tr key={sub.id} onClick={() => router.push(`/dashboard/subcontractors/${sub.id}`)} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sub.contact}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sub.docs} documents</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                      sub.status === 'Compliant' || sub.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                      sub.status === 'Warning' || sub.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/50'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#F25900] hover:bg-[#F25900]/10 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {!isLoading && subs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                        <Users className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No subcontractors yet</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">Add your first subcontractor to start managing their compliance documents.</p>
                      <button onClick={() => setIsModalOpen(true)} type="button" className="text-sm font-medium text-white bg-[#F25900] hover:bg-[#D94F00] px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                        Add Subcontractor
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Subcontractor" size="sm">
        <form onSubmit={handleAdd} className="flex flex-col h-full">
          <div className="flex-1 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 focus:border-[#F25900] shadow-sm transition-shadow" placeholder="e.g. Acme Builders LLC" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Primary Contact Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 focus:border-[#F25900] shadow-sm transition-shadow" placeholder="e.g. admin@acme.com" />
            </div>
          </div>
          <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 shadow-sm disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#F25900] hover:bg-[#D94F00] text-white rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Add Subcontractor
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  )
}
