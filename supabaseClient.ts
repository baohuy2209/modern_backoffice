import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bftutuwrcyptobyjitdf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdHV0dXdyY3lwdG9ieWppdGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NzM2NDQsImV4cCI6MjA1NDA0OTY0NH0.klbNke3gWbayNJaDHv9og15zZDMI9UAxRa3y5RWsX0A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
