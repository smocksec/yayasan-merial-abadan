import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function PATCH(request: NextRequest) {
  // Verify admin access
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  const adminEmails = ["aufarifqi119@gmail.com", "merialabadanmadani@yahoo.com"];
  if (!user || !adminEmails.includes(user.email?.toLowerCase() || '')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  // Use service role to bypass RLS
  let clientToUse: any = supabase;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    clientToUse = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }

  const { error } = await clientToUse
    .from("registrations")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
