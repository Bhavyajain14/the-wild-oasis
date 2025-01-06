import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sftdakfpqtwvpexmzumd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdGRha2ZwcXR3dnBleG16dW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMzcyNzQsImV4cCI6MjA1MDgxMzI3NH0.RlBLXNlBixxeaopYnIXR5shDjTUTrcaMEAUOn26So8Y";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
