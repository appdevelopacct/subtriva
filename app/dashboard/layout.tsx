'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Bot, LayoutDashboard, Users, FileText, Settings, Bell, Menu, X,
  Search, LogOut, CheckCircle2, Briefcase, Activity, Plus
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Subcontractors', href: '/dashboard/subcontractors', icon: Users },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Reminders', href: '/dashboard/reminders', icon: Bell },
  { name: 'AI Assistant', href: '/dashboard/assistant', icon: Bot },
]

const bottomNavItems = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  
  const [userEmail, setUserEmail] = useState('')
  const [initials, setInitials] = useState('U')
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      document.cookie = "demo_mode=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
        setInitials(user.email.substring(0, 2).toUpperCase())
      }
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    document.cookie = "demo_mode=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#0B1120]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-8 w-auto object-contain" />
            <span className="text-[#F25900] text-xl font-bold tracking-tight mt-1">Subtriva</span>
          </Link>
        </div>
        
        <div className="px-4 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F25900]/50 transition-shadow dark:text-white"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : (pathname === item.href || pathname?.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive 
                    ? 'bg-[#F25900]/10 text-[#F25900] dark:bg-[#F25900]/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[#F25900]' : 'text-slate-400 dark:text-slate-500'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive 
                    ? 'bg-[#F25900]/10 text-[#F25900] dark:bg-[#F25900]/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[#F25900]' : 'text-slate-400 dark:text-slate-500'}`} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
          <div 
            className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col lg:hidden"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
              <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-8 w-auto object-contain" />
                <span className="text-[#F25900] text-lg font-bold tracking-tight mt-1">Subtriva</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : (pathname === item.href || pathname?.startsWith(`${item.href}/`))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      isActive 
                        ? 'bg-[#F25900]/10 text-[#F25900]' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[#F25900]' : 'text-slate-400 dark:text-slate-500'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1 bg-slate-50 dark:bg-slate-900/50">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <item.icon className="mr-3 h-5 w-5 text-slate-400 dark:text-slate-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white truncate hidden sm:block capitalize">
              {pathname === '/dashboard' ? 'Overview' : pathname?.split('/').pop()?.replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                  <div 
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="p-8 text-center text-slate-500 text-sm">
                        No new notifications.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="h-8 border-r border-slate-200 dark:border-slate-700 hidden sm:block"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#F25900] to-[#FF8A4C] flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                  {initials}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
                  {userEmail ? userEmail.split('@')[0] : 'User'}
                </span>
              </button>
              
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1"
                  >
                    <Link 
                      href="/dashboard/settings" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAFAFA] dark:bg-[#0B1120]">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
