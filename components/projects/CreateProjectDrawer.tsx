'use client'
import { useState, useEffect } from 'react'
import { Drawer } from '@/components/ui/Drawer'
import { Plus, X, Building2, Users, FileCheck, CheckCircle2, ChevronRight, ChevronLeft, Loader2, Search } from 'lucide-react'
import { createProjectWithDetails } from '@/app/actions/projectActions'
import { useToastStore } from '@/lib/toast-store'
import { createClient } from '@/lib/supabase/client'

interface CreateProjectDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const STEPS = [
  { id: 1, title: 'Project Details', icon: Building2 },
  { id: 2, title: 'Subcontractors', icon: Users },
  { id: 3, title: 'Review', icon: CheckCircle2 },
]

export function CreateProjectDrawer({ isOpen, onClose }: CreateProjectDrawerProps) {
  const [step, setStep] = useState(1)
  const addToast = useToastStore(state => state.addToast)

  const [details, setDetails] = useState({ name: '', client: '' })
  
  // existing subs from db
  const [existingSubs, setExistingSubs] = useState<any[]>([])
  // subs to link to the project
  const [subs, setSubs] = useState<any[]>([])
  
  const [currentSub, setCurrentSub] = useState({ companyName: '', contactName: '', email: '', phone: '', trade: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const supabase = createClient()

  useEffect(() => {
    if (isOpen) {
      fetchSubs()
    }
  }, [isOpen])

  const fetchSubs = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: member } = await supabase.from('company_members').select('company_id').eq('user_id', user.id).single()
    if (!member) return
    
    const { data } = await supabase.from('subcontractors').select('*').eq('company_id', member.company_id).order('name')
    if (data) setExistingSubs(data)
  }

  const handleNext = () => setStep(s => Math.min(s + 1, 3))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleAddSub = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentSub.companyName) {
      setSubs([...subs, { id: 'temp_' + Date.now(), isNew: true, companyName: currentSub.companyName, email: currentSub.email, trade: currentSub.trade }])
      setCurrentSub({ companyName: '', contactName: '', email: '', phone: '', trade: '' })
      setIsAddingNew(false)
    }
  }

  const handleSelectExisting = (sub: any) => {
    if (!subs.find(s => s.id === sub.id)) {
      setSubs([...subs, { id: sub.id, isNew: false, companyName: sub.name, email: sub.email, trade: sub.trade }])
    }
  }

  const removeSub = (id: string) => setSubs(subs.filter(s => s.id !== id))

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await createProjectWithDetails(details, subs, [])
      addToast({ title: 'Project created successfully', type: 'success' })
      onClose()
      setTimeout(() => {
        setStep(1)
        setDetails({ name: '', client: '' })
        setSubs([])
      }, 300)
    } catch (e: any) {
      addToast({ title: 'Error creating project', message: e.message, type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredExisting = existingSubs.filter(s => s.name?.toLowerCase().includes(searchQuery.toLowerCase()) && !subs.find(linked => linked.id === s.id))

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Create New Project" size="lg">
      <div className="flex flex-col h-full bg-white dark:bg-slate-900">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 shrink-0">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex flex-col items-center gap-1.5 ${s.id === step ? 'text-[#F25900]' : s.id < step ? 'text-emerald-500' : 'text-slate-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    s.id === step ? 'border-[#F25900] bg-[#F25900]/10' : 
                    s.id < step ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 
                    'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}>
                    {s.id < step ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider hidden sm:block">{s.title}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 ${s.id < step ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Project Details</h3>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Project Name *</label>
                <input type="text" required value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-[#F25900]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Client / Owner</label>
                <input type="text" value={details.client} onChange={e => setDetails({ ...details, client: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-[#F25900]/50" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Subcontractors</h3>
                  <p className="text-sm text-slate-500">Add existing subs to this project or create new ones.</p>
                </div>
                <button 
                  onClick={() => setIsAddingNew(!isAddingNew)} 
                  className="text-sm font-medium text-white bg-[#F25900] hover:bg-[#D94F00] px-3 py-1.5 rounded-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4"/> {isAddingNew ? 'Cancel New' : 'Add New Sub'}
                </button>
              </div>

              {isAddingNew && (
                <form onSubmit={handleAddSub} className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Create New Subcontractor</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Company Name *</label>
                      <input type="text" required value={currentSub.companyName} onChange={e => setCurrentSub({ ...currentSub, companyName: e.target.value })} className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md dark:bg-slate-900 dark:text-white" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Contact Email</label>
                      <input type="email" value={currentSub.email} onChange={e => setCurrentSub({ ...currentSub, email: e.target.value })} className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md dark:bg-slate-900 dark:text-white" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="text-sm font-medium bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 px-4 py-1.5 rounded-md">Save & Add to Project</button>
                  </div>
                </form>
              )}

              {!isAddingNew && existingSubs.length > 0 && (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search existing subcontractors..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F25900]/50"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {filteredExisting.length > 0 ? (
                      filteredExisting.map(s => (
                        <div key={s.id} className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.name}</p>
                            <p className="text-xs text-slate-500">{s.email || 'No email'}</p>
                          </div>
                          <button 
                            onClick={() => handleSelectExisting(s)} 
                            className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-slate-500">
                        No available subcontractors found.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {subs.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Added to Project ({subs.length})</h4>
                  <ul className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    {subs.map(s => (
                      <li key={s.id} className="p-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            {s.companyName} {s.isNew && <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold">New</span>}
                          </p>
                          <p className="text-xs text-slate-500">{s.email}</p>
                        </div>
                        <button onClick={() => removeSub(s.id)} className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md"><X className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Review & Create</h3>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Project</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{details.name || 'Unnamed Project'}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{details.client}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Subcontractors</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{subs.length} total ({subs.filter(s => s.isNew).length} new)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0 flex items-center justify-between">
          <button onClick={step === 1 ? onClose : handlePrev} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          <button 
            onClick={step === 3 ? handleSubmit : handleNext} 
            disabled={step === 1 && !details.name.trim() || isSubmitting}
            className="px-5 py-2 text-sm font-medium text-white bg-[#F25900] hover:bg-[#D94F00] rounded-lg disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {step === 3 ? (isSubmitting ? 'Creating...' : 'Create Project') : 'Next Step'}
          </button>
        </div>
      </div>
    </Drawer>
  )
}
