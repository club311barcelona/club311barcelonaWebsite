import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null

export function getSupabaseBrowserClient() {
  if (supabaseInstance) return supabaseInstance
  
  supabaseInstance = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
  
  return supabaseInstance
}