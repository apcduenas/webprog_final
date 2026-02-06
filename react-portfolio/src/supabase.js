import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vranlmqgsbpplufeqhel.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_w81Fcvpy-IkfMA3e15s7iA_pINASzDB'

export const supabase = createClient(supabaseUrl, supabaseKey)
