import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      if (searchParams.has('next')) {
        return NextResponse.redirect(`${origin}${next}`)
      }
      return NextResponse.redirect(`${origin}/login?message=Email berhasil diverifikasi! Silakan login untuk melanjutkan dan melengkapi formulir pendaftaran.`)
    } else {
      let errorMessage = error.message
      if (errorMessage.includes("PKCE") || errorMessage.includes("code verifier")) {
        errorMessage = "Tautan verifikasi dibuka di perangkat/browser yang berbeda. Silakan SALIN tautan verifikasi dari email Anda dan PASTE di browser yang sama saat Anda mendaftar."
      }
      return NextResponse.redirect(`${origin}/login?message=Gagal verifikasi email: ${errorMessage}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?message=Link verifikasi tidak valid`)
}
