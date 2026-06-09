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

  // Proteksi khusus halaman Admin
  if (path.startsWith('/admin')) {
    // Jika belum login atau email bukan admin, tendang ke dashboard (atau login)
    if (!user || user.email?.toLowerCase() !== 'aufarifqi119@gmail.com') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Proteksi Rute: Jika belum login dan mencoba masuk ke dashboard
  if (!user && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika sudah login dan mencoba masuk ke halaman login
  if (user && path === '/login') {
    if (user.email?.toLowerCase() === 'aufarifqi119@gmail.com') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Jika sudah login dan mengklik tombol daftar/register, arahkan ke form pendaftaran
  if (user && path === '/register') {
    return NextResponse.redirect(new URL('/pendaftaran', request.url))
  }

  return supabaseResponse
};
