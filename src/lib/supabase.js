import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zirbetgrokbxoclfvckv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcmJldGdyb2tieG9jbGZ2Y2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTI5ODYsImV4cCI6MjA4NTIyODk4Nn0.-P0UrhaMQ3xhWCVcokkg_Q53p3VDZCYVXjN5_7Hde0M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
