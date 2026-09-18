import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock-client'

export function createClient() {
  const isDemo = typeof document !== 'undefined' && document.cookie.includes('demo_mode=true')
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (isDemo || !url || url === 'your_supabase_project_url' || !url.startsWith('http')) {
    return createMockClient() as any
  }
  
  try {
    return createBrowserClient(url, key || '')
  } catch (err) {
    console.warn('Falling back to mock client:', err)
    return createMockClient() as any
  }
}
