'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Plus, Briefcase, ChevronRight, ArrowUpDown, Loader2 } from 'lucide-react'
import { CreateProjectDrawer } from '@/components/projects/CreateProjectDrawer'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*, subcontractors(count), document_requirements(count)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      const formatted = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        client: p.client,
        status: p.status || 'Active',
        subsCount: p.subcontractors?.[0]?.count || 0,
        compliance: '100%' // TODO: Calculate real compliance
      }))
      setProjects(formatted)
    }
    setIsLoading(false)
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Projects</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your construction projects and view overall compliance health.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" className="bg-[#F25900] hover:bg-[#D94F00] text-white px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm text-sm">
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 focus:border-[#F25900] shadow-sm transition-shadow"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px] relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center z-10 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-[#F25900] animate-spin" />
            </div>
          )}
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Project Name</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Subcontractors</th>
                <th className="px-6 py-4 font-medium tracking-wider">Compliance Health</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {projects.map((project) => (
                <tr key={project.id} onClick={() => router.push(`/dashboard/projects/${project.id}`)} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-semibold text-slate-900 dark:text-white">{project.name}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">ID: {project.id.slice(-6)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                      project.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                      project.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50' : 
                      'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-500' : project.status === 'Completed' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">{project.subsCount || 0}</span> assigned
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{project.compliance}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#F25900] hover:bg-[#F25900]/10 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {!isLoading && projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                        <Briefcase className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No projects yet</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">Create your first project to start tracking subcontractor compliance and documents.</p>
                      <button onClick={() => setIsModalOpen(true)} type="button" className="text-sm font-medium text-white bg-[#F25900] hover:bg-[#D94F00] px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                        Create Project
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <CreateProjectDrawer isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); loadProjects(); }} />
    </div>
  )
}
