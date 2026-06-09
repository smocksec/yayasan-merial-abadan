import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  if (token_hash && type) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      if (searchParams.has('next') && next !== '/dashboard') {
        return NextResponse.redirect(`${origin}${next}`)
      }
      return NextResponse.redirect(`${origin}/login?message=Email berhasil diverifikasi! Silakan login untuk melanjutkan dan melengkapi formulir pendaftaran.`)
    } else {
      return NextResponse.redirect(`${origin}/login?message=Gagal verifikasi email: ${error.message}`)
    }
  }

  // Jika parameter tidak lengkap
  return NextResponse.redirect(`${origin}/login?message=Link verifikasi tidak valid atau kedaluwarsa`)
}
