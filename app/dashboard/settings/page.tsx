'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Palette, Settings as SettingsIcon, FileText, Users, CreditCard, Link as LinkIcon, Loader2, Sun, Moon, Laptop, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useToastStore } from '@/lib/toast-store'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const addToast = useToastStore(state => state.addToast)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [userId, setUserId] = useState('')
  
  const [notifications, setNotifications] = useState({
    expiration: true,
    uploads: true,
    requests: false,
    missing: true,
    system: false
  })

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setUserId(user.id)
    setEmail(user.email || '')

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (profile) setFullName(profile.full_name || '')

    const { data: member } = await supabase.from('company_members').select('company_id, companies(name)').eq('user_id', user.id).single()
    if (member) {
      setCompanyId(member.company_id)
      setCompanyName(member.companies?.name || '')
    }

    setIsLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const supabase = createClient()
      
      if (activeTab === 'profile') {
        if (userId) await supabase.from('profiles').update({ full_name: fullName }).eq('id', userId)
        if (companyId) await supabase.from('companies').update({ name: companyName }).eq('id', companyId)
      }
      
      addToast({ title: 'Settings saved', type: 'success' })
    } catch (error: any) {
      addToast({ title: 'Error saving settings', message: error.message, type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }


  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
  ]

  return (
    <div className="max-w-5xl animate-in fade-in duration-300 pb-12">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">Manage your account preferences and application settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1 pb-4 md:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-[#F25900] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          {isLoading ? (
            <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#F25900]" /></div>
          ) : (
            <form onSubmit={handleSave} className="p-6 sm:p-8">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your name and contact details.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                      <input type="email" disabled value={email} className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-sm" />
                    </div>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-800" />

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Company Information</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your organization's primary details.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                      <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm" />
                    </div>
                  </div>
                </div>
              )}

              {/* APPEARANCE TAB */}
              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Theme & Appearance</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Customize how Subtriva looks. By default, Subtriva automatically matches your device preference.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light Mode', desc: 'Clean, crisp high-contrast layout', icon: Sun },
                      { id: 'dark', label: 'Dark Mode', desc: 'Deep charcoal, easy on the eyes', icon: Moon },
                      { id: 'system', label: 'Device Default', desc: 'Automatically matches system', icon: Laptop }
                    ].map(t => {
                      const IconComponent = t.icon
                      const isSelected = theme === t.id
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTheme(t.id)
                            addToast(`Theme switched to ${t.label}`, 'info')
                          }}
                          className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-[#FF6B35] bg-[#FF6B35]/5 dark:bg-[#FF6B35]/10 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-3">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#FF6B35] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            {isSelected && (
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6B35] text-white">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{t.label}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Email Notifications</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose what alerts you want to receive via email.</p>
                  </div>
                  <div className="space-y-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      { key: 'expiration', label: 'Expiration Reminders', desc: 'When a document is about to expire or has expired.' },
                      { key: 'uploads', label: 'New Uploads', desc: 'When a subcontractor uploads a requested document.' },
                      { key: 'requests', label: 'Document Requests', desc: 'CC me when a document request is sent out.' },
                      { key: 'missing', label: 'Missing Documents', desc: 'Weekly summary of missing compliance documents.' },
                      { key: 'system', label: 'System & Marketing', desc: 'Product updates, tips, and promotional offers.' },
                    ].map(setting => (
                      <div key={setting.key} className="p-4 flex items-start justify-between gap-4 bg-white dark:bg-slate-900">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">{setting.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{setting.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notifications[setting.key as keyof typeof notifications]}
                            onChange={() => setNotifications({...notifications, [setting.key]: !notifications[setting.key as keyof typeof notifications]})}
                          />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-[#F25900]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REMINDERS TAB */}
              {activeTab === 'reminders' && (
                <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reminder Defaults</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure when subcontractors should be reminded about expiring documents.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Default Reminder Schedule</label>
                    <select className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 shadow-sm">
                      <option value="standard">60, 30, 15, 7, and 1 day before expiration</option>
                      <option value="relaxed">30, 15, and 7 days before expiration</option>
                      <option value="aggressive">90, 60, 30, 15, 7, and 1 day before expiration</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* OTHER TABS PLACEHOLDER */}
              {['documents', 'team', 'billing', 'integrations'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center text-center h-64 animate-in fade-in">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <SettingsIcon className="w-8 h-8 text-slate-400 animate-[spin_4s_linear_infinite]" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Coming Soon</h3>
                  <p className="text-sm text-slate-500 mt-1">This settings panel is currently under development.</p>
                </div>
              )}

              {/* Save Button (Hide on placeholders) */}
              {!['documents', 'team', 'billing', 'integrations'].includes(activeTab) && (
                <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
                  <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-[#F25900] text-white rounded-lg font-medium hover:bg-[#D94F00] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : 'Save Settings'}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
