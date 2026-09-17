'use client'

import { useState, useRef, useEffect } from 'react'
import { FileText, Search, Filter, Plus, UploadCloud, Trash2, File, ChevronRight, ArrowUpDown, Loader2, Sparkles } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { useToastStore } from '@/lib/toast-store'
import { createClient } from '@/lib/supabase/client'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [subcontractors, setSubcontractors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  
  const [docType, setDocType] = useState('Insurance Certificate / COI')
  const [customName, setCustomName] = useState('')
  const [subcontractor, setSubcontractor] = useState('')
  const [expiration, setExpiration] = useState('')
  
  const [isScanning, setIsScanning] = useState(false)
  const [scanNotes, setScanNotes] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const addToast = useToastStore(state => state.addToast)


  const handleAIScan = async (fileToScan: File) => {
    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/scan-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileData: base64Data, mimeType: fileToScan.type }),
        });
        const json = await res.json();
        if (json.data) {
          if (json.data.expirationDate) {
            setExpiration(json.data.expirationDate);
          }
          if (json.data.documentName) {
            setDocType('Custom');
            setCustomName(json.data.documentName);
          }
          addToast("AI Scan completed! Form auto-filled.", "success");
        } else {
          addToast("AI Scan failed to extract details.", "error");
        }
        setIsScanning(false);
      };
      reader.readAsDataURL(fileToScan);
    } catch (e) {
      console.error(e);
      addToast("Failed to scan document with AI.", "error");
      setIsScanning(false);
    }
  }

  useEffect(() => {

    loadData()
  }, [])

  async function loadData() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [docsRes, subsRes] = await Promise.all([
      supabase.from('documents').select('*, subcontractors(name)').order('created_at', { ascending: false }),
      supabase.from('subcontractors').select('id, name').order('name')
    ])

    if (!docsRes.error && docsRes.data) {
      const formatted = docsRes.data.map((d: any) => ({
        id: d.id,
        name: d.name,
        company: d.subcontractors?.name || 'Unknown',
        date: d.expiration_date ? new Date(d.expiration_date).toLocaleDateString() : 'N/A',
        status: d.status || 'Active',
        file_url: d.file_url
      }))
      setDocuments(formatted)
    }
    
    if (!subsRes.error && subsRes.data) {
      setSubcontractors(subsRes.data)
    }
    setIsLoading(false)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      addToast({ title: 'Error', message: 'Please select a file to upload.', type: 'error' })
      return
    }
    setIsUploading(true)
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: member } = await supabase.from('company_members').select('company_id').eq('user_id', user.id).single()
      if (!member) throw new Error('No company found')

      const company_id = member.company_id
      const finalName = docType === 'Custom' ? customName : docType
      const fileExt = file.name.split('.').pop()
      const filePath = `${company_id}/${subcontractor}/${Date.now()}.${fileExt}`

      // Upload to Storage
      setUploadProgress(50) // Basic progress
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      setUploadProgress(100)

      // Create DB Record
      const { error: dbError } = await supabase.from('documents').insert([{
        company_id,
        subcontractor_id: subcontractor,
        name: finalName,
        status: 'Under Review',
        file_path: filePath,
        expiration_date: expiration || null,
        uploaded_at: new Date().toISOString()
      }])

      if (dbError) throw dbError

      addToast({
        title: 'Upload Complete',
        message: `${file.name} has been uploaded securely.`,
        type: 'success'
      })
      
      setIsModalOpen(false)
      setFile(null)
      loadData()
    } catch (err: any) {
      addToast({ title: 'Upload Failed', message: err.message, type: 'error' })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }


  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Documents</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage all subcontractor compliance documents, COIs, and licenses.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" className="bg-[#F25900] hover:bg-[#D94F00] text-white px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm text-sm">
          <UploadCloud className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[300px] relative">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
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
                <th className="px-6 py-4 font-medium tracking-wider">Document Name</th>
                <th className="px-6 py-4 font-medium tracking-wider">Subcontractor</th>
                <th className="px-6 py-4 font-medium tracking-wider">Expiration</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{doc.company}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{doc.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                      doc.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                      doc.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/50'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#F25900] hover:bg-[#F25900]/10 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {!isLoading && documents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                        <FileText className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No documents yet</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">Upload your first compliance document or request one from a subcontractor.</p>
                      <button onClick={() => setIsModalOpen(true)} type="button" className="text-sm font-medium text-white bg-[#F25900] hover:bg-[#D94F00] px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                        Upload Document
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer isOpen={isModalOpen} onClose={() => {
        if(!isUploading) {
          setIsModalOpen(false)
          setFile(null)
        }
      }} title="Upload Document" size="md">
        <form onSubmit={handleAdd} className="flex flex-col h-full">
          <div className="flex-1 p-6 space-y-5 overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Document Category</label>
                <select value={docType} onChange={e => setDocType(e.target.value)} disabled={isUploading} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm">
                  <option value="Insurance Certificate / COI">Insurance Certificate / COI</option>
                  <option value="Trade License / Business Registration">Trade License / Business Registration</option>
                  <option value="Workers' Comp / Employer's Liability">Workers' Comp / Employer's Liability</option>
                  <option value="Tax ID / W-9">Tax ID / W-9</option>
                  <option value="Custom">Custom Document</option>
                </select>
              </div>
              
              {docType === 'Custom' && (
                <div className="sm:col-span-2 animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Custom Document Name</label>
                  <input required type="text" value={customName} onChange={e => setCustomName(e.target.value)} disabled={isUploading} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm" placeholder="e.g. Safety Orientation Form" />
                </div>
              )}
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Subcontractor</label>
                <select required value={subcontractor} onChange={e => setSubcontractor(e.target.value)} disabled={isUploading} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm">
                  <option value="" disabled>Select Subcontractor</option>
                  {subcontractors.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expiration Date</label>
                <input required type="date" value={expiration} onChange={e => setExpiration(e.target.value)} disabled={isUploading} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm [color-scheme:light] dark:[color-scheme:dark]" />
              </div>
            </div>

            <div className="sm:col-span-2 mt-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload File</label>
              
              {!file ? (
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-[#F25900] bg-[#F25900]/5' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,image/*,.doc,.docx"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 bg-[#F25900]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-6 h-6 text-[#F25900]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Click to upload or drag and drop</h4>
                  <p className="text-xs text-slate-500">PDF, JPG, PNG, DOC (max. 10MB)</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                        <File className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!isUploading && (
                      <button type="button" onClick={() => setFile(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    disabled={isScanning || isUploading}
                    onClick={() => handleAIScan(file)}
                    className="w-full py-2.5 px-4 flex items-center justify-center gap-2 rounded-lg border border-[#F25900] text-[#F25900] hover:bg-[#F25900]/10 transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    {isScanning ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Scanning with AI...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Auto-fill details with AI Scan</>
                    )}
                  </button>
                </div>
              )}

              {isUploading && (
                <div className="mt-4 space-y-2 animate-in fade-in">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">Uploading to secure storage...</span>
                    <span className="text-[#F25900]">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#F25900] h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          
          </div>
          
          <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0 flex items-center justify-end gap-3">
            <button type="button" disabled={isUploading} onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 shadow-sm disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isUploading || !file || !subcontractor || !expiration} className="px-5 py-2 bg-[#F25900] hover:bg-[#D94F00] text-white rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : 'Upload Document'}
            </button>
          </div>
          {scanNotes && (
    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-200 text-sm">
      <strong>AI Notes:</strong> {scanNotes}
    </div>
  )}
</form>
      </Drawer>
    </div>
  )
}
