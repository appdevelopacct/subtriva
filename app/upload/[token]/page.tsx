'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { UploadCloud, File, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SecureUploadPage() {
  const params = useParams()
  const token = params.token as string

  const [isValidating, setIsValidating] = useState(true)
  const [linkData, setLinkData] = useState<any>(null)
  
  const [file, setFile] = useState<File | null>(null)
  const [docType, setDocType] = useState('Insurance Certificate (COI)')
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    validateToken()
  }, [])

  async function validateToken() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('upload_links')
      .select('*, companies(name), subcontractors(name)')
      .eq('token', token)
      .single()

    if (error || !data) {
      setError('Invalid or expired upload link.')
    } else {
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setError('This upload link has expired.')
      } else {
        setLinkData(data)
      }
    }
    setIsValidating(false)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !linkData) return
    setIsUploading(true)
    setError('')

    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const filePath = `${linkData.company_id}/${linkData.subcontractor_id || 'unassigned'}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { error: dbError } = await supabase.from('documents').insert([{
        company_id: linkData.company_id,
        subcontractor_id: linkData.subcontractor_id,
        project_id: linkData.project_id,
        name: docType,
        file_path: filePath,
        status: 'Under Review'
      }])

      if (dbError) throw dbError

      setIsSuccess(true)
      setFile(null)
    } catch (err: any) {
      setError(err.message || 'Failed to upload document')
    } finally {
      setIsUploading(false)
    }
  }


  if (isValidating) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#F25900]" />
      </div>
    )
  }

  if (error && !linkData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Link Invalid</h2>
          <p className="text-slate-500 dark:text-slate-400">{error}</p>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Successful</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Your documents have been securely transmitted to {linkData.companies?.name}.</p>
          <button onClick={() => { setIsSuccess(false); setError(''); }} className="text-[#F25900] font-medium hover:underline">
            Upload another document
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          <span className="w-8 h-8 rounded-lg bg-[#F25900] text-white flex items-center justify-center text-lg">S</span>
          Subtriva
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Secure Document Upload</h1>
        <p className="text-slate-500 dark:text-slate-400">
          <strong className="text-slate-700 dark:text-slate-300">{linkData.companies?.name}</strong> has requested compliance documents from you.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden w-full max-w-md">
        <div className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Document Type</label>
              <select value={docType} onChange={e => setDocType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm">
                <option>Insurance Certificate (COI)</option>
                <option>Trade License</option>
                <option>W-9 / Tax ID</option>
                <option>Other / Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload File</label>
              {!file ? (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                  <input type="file" accept=".pdf,image/*,.doc,.docx" onChange={e => e.target.files && setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-12 h-12 bg-[#F25900]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-6 h-6 text-[#F25900]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Click to upload or drag and drop</h4>
                  <p className="text-xs text-slate-500">PDF, JPG, PNG, DOC (max. 10MB)</p>
                </div>
              ) : (
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/30 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <File className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-md">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <button type="submit" disabled={!file || isUploading} className="w-full py-2.5 bg-[#F25900] hover:bg-[#D94F00] text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2">
              {isUploading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Uploading...</>
              ) : (
                'Submit Document'
              )}
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>Secure transmission powered by <span className="font-semibold text-slate-700 dark:text-slate-300">Subtriva</span></p>
      </div>
    </div>
  )
}
