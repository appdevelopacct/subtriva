'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Users, FileText, AlertCircle, Clock, CheckCircle2, FileCheck, ArrowRight, ShieldCheck, Activity, Loader2, Plus } from 'lucide-react'
import Link from 'next/link'
import { CreateProjectDrawer } from '@/components/projects/CreateProjectDrawer'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  
  const [stats, setStats] = useState({
    projects: 0,
    activeProjects: 0,
    subs: 0,
    docs: 0,
    expiring: 0,
    missing: 0,
    activeCount: 0
  })
  
  const [needsAttention, setNeedsAttention] = useState<any[]>([])
  const [upcomingExpirations, setUpcomingExpirations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: member } = await supabase.from('company_members').select('company_id').eq('user_id', user.id).single()
    if (!member) {
      setIsLoading(false)
      return
    }

    const company_id = member.company_id

    // Fetch projects
    const { data: projects } = await supabase.from('projects').select('status').eq('company_id', company_id)
    // Fetch subs
    const { data: subs } = await supabase.from('subcontractors').select('id').eq('company_id', company_id)
    // Fetch docs
    const { data: docs } = await supabase.from('documents').select('id, name, status, expiration_date, subcontractors(name)').eq('company_id', company_id)
    
    let activeP = 0
    projects?.forEach((p: any) => { if(p.status === 'Active') activeP++ })
    
    let docsTotal = docs?.length || 0
    let activeDocs = 0
    let expiring = 0
    let missing = 0
    let nAttention: any[] = []
    let upcoming: any[] = []

    if (docs) {
      docs.forEach((d: any) => {
        if (d.status === 'Active') activeDocs++
        else if (d.status === 'Missing' || d.status === 'Rejected' || d.status === 'Expired') {
          missing++
          nAttention.push({
            id: d.id,
            name: d.name,
            company: d.subcontractors?.name || 'Unknown',
            status: d.status,
            date: d.expiration_date ? new Date(d.expiration_date).toLocaleDateString() : 'N/A'
          })
        }
        
        if (d.expiration_date) {
          const exp = new Date(d.expiration_date)
          const diff = Math.floor((exp.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
          if (diff > 0 && diff <= 30) {
            expiring++
            upcoming.push({
              id: d.id,
              name: d.name,
              company: d.subcontractors?.name || 'Unknown',
              status: 'Expiring Soon',
              date: exp.toLocaleDateString(),
              days: diff
            })
          }
        }
      })
    }
    
    setStats({
      projects: projects?.length || 0,
      activeProjects: activeP,
      subs: subs?.length || 0,
      docs: docsTotal,
      expiring,
      missing,
      activeCount: activeDocs
    })
    
    setNeedsAttention(nAttention.slice(0, 5))
    setUpcomingExpirations(upcoming.slice(0, 5))
    setIsLoading(false)
  }


  const healthScore = stats.docs === 0 ? 0 : Math.round((stats.activeCount / stats.docs) * 100)

  return (
    <div className="max-w-6xl space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">Here is what is happening across your projects today.</p>
        </div>
        <button onClick={() => setIsProjectModalOpen(true)} className="bg-[#F25900] hover:bg-[#D94F00] text-white px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm text-sm">
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-[#F25900] animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 bg-[#F25900] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-all" onClick={() => router.push('/dashboard/documents')}>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-bl-[100px] pointer-events-none"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black opacity-10 rounded-tr-[100px] pointer-events-none"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-white/90 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Overall Compliance
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight">{healthScore}%</div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                   <div className="w-12 h-12 rounded-full border-4 border-white border-l-transparent animate-[spin_3s_linear_infinite]" style={{ transform: `rotate(${healthScore * 3.6}deg)` }}></div>
                </div>
              </div>
              <p className="text-sm text-emerald-100 mt-4 relative z-10">{stats.activeCount} of {stats.docs} required documents compliant</p>
            </div>

            {[
              { label: 'Total Projects', value: stats.projects, icon: <Briefcase className="w-4 h-4 text-slate-400" /> },
              { label: 'Active Projects', value: stats.activeProjects, icon: <Activity className="w-4 h-4 text-blue-400" /> },
              { label: 'Subcontractors', value: stats.subs, icon: <Users className="w-4 h-4 text-indigo-400" /> },
              { label: 'Total Docs', value: stats.docs, icon: <FileText className="w-4 h-4 text-slate-400" /> },
              { label: 'Expiring Soon', value: stats.expiring, icon: <Clock className="w-4 h-4 text-amber-500" />, alert: stats.expiring > 0 },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{stat.icon}</span>
                  {stat.alert && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  Needs Attention
                </h2>
                <Link href="/dashboard/documents?status=missing" className="text-sm font-medium text-[#F25900] hover:underline">View All</Link>
              </div>
              <div className="p-0 flex-1">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {needsAttention.map((doc, i) => (
                    <li 
                      
                      
                      
                      key={doc.id} 
                      className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{doc.name}</p>
                          <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            doc.status === 'Expired' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{doc.company} • {doc.date}</p>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <button className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          Review
                        </button>
                      </div>
                    </li>
                  ))}
                  {needsAttention.length === 0 && (
                    <li className="p-12 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">All caught up</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-[200px]">No documents require immediate attention.</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Upcoming Renewals
                </h2>
                <Link href="/dashboard/documents?status=expiring" className="text-sm font-medium text-[#F25900] hover:underline">View All</Link>
              </div>
              <div className="p-0 flex-1">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {upcomingExpirations.map((doc, i) => (
                    <li 
                      
                      
                      
                      key={doc.id} 
                      className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{doc.name}</p>
                          <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400">
                            Expiring Soon
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{doc.company}</p>
                      </div>
                      <div className="shrink-0 text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{doc.date}</span>
                        <span className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">{doc.days} days remaining</span>
                      </div>
                    </li>
                  ))}
                  {upcomingExpirations.length === 0 && (
                    <li className="p-12 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-3">
                        <FileCheck className="w-6 h-6 text-slate-400" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">No upcoming renewals</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-[200px]">No documents are expiring in the next 30 days.</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      <CreateProjectDrawer isOpen={isProjectModalOpen} onClose={() => { setIsProjectModalOpen(false); loadDashboardData(); }} />
    </div>
  )
}
