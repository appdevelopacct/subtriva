'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Building2, Calendar, FileText, CheckCircle2, AlertCircle, Users, Activity, Plus, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<any>(null)
  const [subs, setSubs] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: pData, error: pError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (pData) {
      setProject(pData)
      
      const { data: sData } = await supabase
        .from('project_subcontractors')
        .select('subcontractors(*)')
        .eq('project_id', projectId)
        
      if (sData) {
        setSubs(sData.map((d: any) => d.subcontractors))
      }
    }
    
    setIsLoading(false)
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <button onClick={() => router.push('/dashboard/projects')} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#F25900]" /></div>
      ) : !project ? (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project not found</h2>
          <p className="text-slate-500 mt-2">The project you are looking for does not exist or you don't have access.</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F25900] to-[#FF8A4C]"></div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{project.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> {project.client || 'No Client Specified'}
                  </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                  project.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                  'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700'
                }`}>
                  <Activity className="w-3.5 h-3.5 mr-1.5" />
                  {project.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Start Date</p>
                  <p className="font-medium text-slate-900 dark:text-white flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBD'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Subcontractors</p>
                  <p className="font-medium text-slate-900 dark:text-white flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400" /> {subs.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#F25900]" />
                Assigned Subcontractors
              </h2>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {subs.map(sub => (
                  <li key={sub.id} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between cursor-pointer group" onClick={() => router.push(`/dashboard/subcontractors/${sub.id}`)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-[#F25900] transition-colors">{sub.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{sub.contact_name || sub.email || 'N/A'}</p>
                      </div>
                    </div>
                  </li>
                ))}
                {subs.length === 0 && (
                  <li className="p-8 text-center text-slate-500">No subcontractors assigned to this project yet.</li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
