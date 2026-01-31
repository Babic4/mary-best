import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export default supabase
