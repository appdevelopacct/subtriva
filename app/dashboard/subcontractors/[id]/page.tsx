'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Users, Building2, Phone, Mail, FileText, CheckCircle2, AlertCircle, Clock, Upload, Loader2, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Drawer } from '@/components/ui/Drawer'
import { useToastStore } from '@/lib/toast-store'

export default function SubcontractorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const subId = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [sub, setSub] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])

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

    const { data: subData } = await supabase
      .from('subcontractors')
      .select('*')
      .eq('id', subId)
      .single()

    if (subData) {
      setSub(subData)
      
      const { data: docData } = await supabase
        .from('documents')
        .select('*')
        .eq('subcontractor_id', subId)
        
      if (docData) {
        setDocuments(docData.map((d: any) => ({
          id: d.id,
          name: d.name,
          date: d.expiration_date ? new Date(d.expiration_date).toLocaleDateString() : 'N/A',
          status: d.status || 'Active'
        })))
      }
    }
    
    setIsLoading(false)
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <button onClick={() => router.push('/dashboard/subcontractors')} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Subcontractors
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#F25900]" /></div>
      ) : !sub ? (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Subcontractor not found</h2>
          <p className="text-slate-500 mt-2">This subcontractor does not exist or you don't have access.</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-full h-2 ${
              sub.status === 'Compliant' || sub.status === 'Active' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 
              sub.status === 'Warning' || sub.status === 'Pending Review' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 
              'bg-gradient-to-r from-rose-400 to-rose-500'
            }`}></div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl shadow-inner border border-indigo-100 dark:border-indigo-800/50">
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{sub.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">{sub.trade || 'General Contractor'}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                  sub.status === 'Compliant' || sub.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                  sub.status === 'Warning' || sub.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                  'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/50'
                }`}>
                  {sub.status === 'Compliant' || sub.status === 'Active' ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> : 
                   sub.status === 'Warning' || sub.status === 'Pending Review' ? <AlertCircle className="w-3.5 h-3.5 mr-1.5" /> : 
                   <AlertCircle className="w-3.5 h-3.5 mr-1.5" />}
                  {sub.status || 'Pending Review'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Primary Contact</p>
                  <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> {sub.contact_name || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email</p>
                  <a href={`mailto:${sub.email}`} className="font-medium text-[#F25900] hover:underline flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {sub.email}</a>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone</p>
                  <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {sub.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F25900]" />
                Compliance Documents
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {documents.map(doc => (
                  <li key={doc.id} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        doc.status === 'Active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 
                        doc.status === 'Under Review' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 
                        'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
                      }`}>
                        {doc.status === 'Active' ? <CheckCircle2 className="w-5 h-5" /> : 
                         doc.status === 'Under Review' ? <Clock className="w-5 h-5" /> : 
                         <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white text-sm">{doc.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Exp: {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        doc.status === 'Active' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                        doc.status === 'Under Review' ? 'text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400' : 
                        'text-rose-700 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </li>
                ))}
                {documents.length === 0 && (
                  <li className="p-8 text-center text-slate-500">No documents found for this subcontractor.</li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
