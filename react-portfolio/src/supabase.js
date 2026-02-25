import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Guard against missing env vars (prevents app crash during build/deploy)
if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase env vars are not set. Guestbook will not work.')
}

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null
