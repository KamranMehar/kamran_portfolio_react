import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://waezyuycuuwepssofegp.supabase.co';
const supabaseAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZXp5dXljdXV3ZXBzc29mZWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MzYwNzcsImV4cCI6MjA2NzQxMjA3N30.qWJ0i3Crdh2F7ClP7DGZH-shxhfeAp7cX0I-gbRJu4Q';

export const supabase = createClient(supabaseUrl, supabaseAnon);