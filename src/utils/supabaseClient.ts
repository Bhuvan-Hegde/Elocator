import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and anon key
const supabaseUrl = "https://greszeqxqacfuxduainv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZXN6ZXF4cWFjZnV4ZHVhaW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDM2ODEsImV4cCI6MjA2MDkxOTY4MX0.gZndp3JTb2N7ZU2tGZRBIj06iwug9fQH5qAMLCoWl8Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
