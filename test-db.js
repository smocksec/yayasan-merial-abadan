const { createClient } = require('@supabase/supabase-js');

async function check() {
  const supabaseUrl = 'https://lhsokokwbgwbmncbmayu.supabase.co';
  const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxoc29rb2t3Ymd3Ym1uY2JtYXl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTUzNjEzMiwiZXhwIjoyMDk1MTEyMTMyfQ.7e-Y2UyTrBah8w2M0Ke2kOTB162tIQJKcX0ZCgBg9_s';

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data, error } = await supabase.from('registrations').select('*');
  console.log("Error:", error);
  console.log("Data length:", data?.length);
  if (data?.length > 0) {
    console.log("First record:", data[0].nama_anak);
  }
}

check();
