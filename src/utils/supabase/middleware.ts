import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  const adminEmails = ['aufarifqi119@gmail.com', 'merialabadanmadani@yahoo.com'];

  // Proteksi Rute: Jika admin page diakses oleh non-admin
  if (path.startsWith('/admin')) {
    if (!user || !adminEmails.includes(user.email?.toLowerCase() || '')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Proteksi Rute: Jika belum login dan mencoba masuk ke dashboard
  if (!user && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Proteksi Rute: Jika belum login dan mencoba masuk ke pendaftaran
  if (!user && path.startsWith('/pendaftaran')) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('message', 'Silakan login atau buat akun terlebih dahulu untuk mengisi formulir pendaftaran anak.')
    return NextResponse.redirect(loginUrl)
  }

  // Jika sudah login dan mencoba masuk ke halaman login
  if (user && path === '/login') {
    if (adminEmails.includes(user.email?.toLowerCase() || '')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Jika sudah login dan mencoba ke halaman register, arahkan ke dashboard
  if (user && path === '/register') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
};
