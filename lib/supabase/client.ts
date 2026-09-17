import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock-client'

export function createClient() {
  if (typeof document !== 'undefined' && document.cookie.includes('demo_mode=true')) {
    return createMockClient() as any
  }
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
