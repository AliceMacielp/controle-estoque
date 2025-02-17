import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlpfiotntwldnbkjcsye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscGZpb3RudHdsZG5ia2pjc3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NTI2MDIsImV4cCI6MjA1NTMyODYwMn0.pfcYlxHx3TwsnREcVMoDT_eboN_RQ6HMB8m2vViGips';

export const supabase = createClient(supabaseUrl, supabaseKey);
