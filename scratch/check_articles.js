import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zirbetgrokbxoclfvckv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcmJldGdyb2tieG9jbGZ2Y2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTI5ODYsImV4cCI6MjA4NTIyODk4Nn0.-P0UrhaMQ3xhWCVcokkg_Q53p3VDZCYVXjN5_7Hde0M'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkArticles() {
  const { data, count, error } = await supabase.from('articles').select('*', { count: 'exact' })
  if (error) {
    console.error(error)
  } else {
    console.log('Articles count:', count)
    console.log('Sample data:', data.slice(0, 1))
  }
}

checkArticles()
