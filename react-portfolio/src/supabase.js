import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vranlmqgsbpplufeqhel.supabase.co'
const supabaseKey = 'sb_publishable_w81Fcvpy-IkfMA3e15s7iA_pINASzDB'

export const supabase = createClient(supabaseUrl, supabaseKey)
