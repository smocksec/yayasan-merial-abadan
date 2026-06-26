import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Verify admin access
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  const adminEmails = ["aufarifqi119@gmail.com", "merialabadanmadani@yahoo.com"];
  if (!user || !adminEmails.includes(user.email?.toLowerCase() || '')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Use service role to bypass RLS and get ALL registrations
  let clientToUse: any = supabase;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    clientToUse = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false },
        global: { fetch: (url: any, options: any) => fetch(url, { ...options, cache: "no-store" }) }
      }
    );
  }

  const { data: registrations, error } = await clientToUse
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also get total users count for "belum isi form" stat
  let totalBelumIsiForm = 0;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
    
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (!usersError && usersData?.users) {
      const totalUsers = usersData.users.filter((u: any) => !adminEmails.includes(u.email?.toLowerCase() || '')).length;
      const userIdsWithForm = new Set((registrations || []).filter((r: any) => r.user_id).map((r: any) => r.user_id));
      totalBelumIsiForm = Math.max(0, totalUsers - userIdsWithForm.size);
    }
  }

  return NextResponse.json({
    registrations: registrations || [],
    totalBelumIsiForm,
  });
}
