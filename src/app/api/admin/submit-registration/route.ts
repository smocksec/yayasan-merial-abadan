import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  const adminEmails = ["aufarifqi119@gmail.com", "merialabadanmadani@yahoo.com"];
  if (!user || !adminEmails.includes(user.email?.toLowerCase() || '')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const payload = await request.json();
    const { email_ortu, ...registrationData } = payload;

    if (!email_ortu) {
      return NextResponse.json({ error: "Email orang tua wajib diisi" }, { status: 400 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Server error: Service Role Key missing" }, { status: 500 });
    }

    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    // 1. Check if user with this email exists
    const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) throw listError;

    let targetUser = usersData.users.find((u: any) => u.email === email_ortu.toLowerCase());

    // 2. If not exists, create the user
    if (!targetUser) {
      const { data: newUserData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email_ortu.toLowerCase(),
        password: "Merial123!",
        email_confirm: true,
        user_metadata: {
          full_name: registrationData.data_lengkap?.nama_ayah || registrationData.data_lengkap?.nama_ibu || "Orang Tua Siswa"
        }
      });
      if (createError) throw createError;
      targetUser = newUserData.user;
    }

    // 3. Insert registration data linked to the parent's user_id
    const insertPayload = {
      user_id: targetUser.id,
      nama_anak: registrationData.nama_anak || 'Tanpa Nama',
      program: registrationData.program || 'TPA',
      no_hp_ortu: registrationData.no_hp_ortu || '-',
      data_lengkap: registrationData.data_lengkap || {},
      status: 'Diterima' // Admin usually auto-approves if they do it manually, or 'Menunggu'. Let's set to 'Menunggu' to be safe.
    };
    
    // Check if parent already has a registration
    const { data: existingReg, error: fetchError } = await supabaseAdmin
      .from('registrations')
      .select('id')
      .eq('user_id', targetUser.id)
      .single();

    if (existingReg) {
      // Update existing
      const { error: updateError } = await supabaseAdmin
        .from('registrations')
        .update(insertPayload)
        .eq('id', existingReg.id);
      if (updateError) throw updateError;
    } else {
      // Insert new
      const { error: insertError } = await supabaseAdmin
        .from('registrations')
        .insert(insertPayload);
      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true, message: "Pendaftaran berhasil didaftarkan untuk orang tua." });
  } catch (error: any) {
    console.error("Submit registration by admin error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit registration" }, { status: 500 });
  }
}
