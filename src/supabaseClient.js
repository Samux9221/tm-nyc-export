import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vyjajsgmgdtkmojpwpuf.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5amFqc2dtZ2R0a21vanB3cHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxOTI5NjQsImV4cCI6MjA4NDc2ODk2NH0.bHY5UVqLXrXmPX0X6XsyqFKHi2bUfkCHUy0iucEmptI'

export const supabase = createClient(supabaseUrl, supabaseKey)