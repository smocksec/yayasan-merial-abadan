import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../../public/logo-yayasan.jpg";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Register(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;
  
  const signUp = async (formData: FormData) => {
    "use server";
    const fullName = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const origin = `${protocol}://${host}`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      return redirect("/register?message=Gagal mendaftar: " + error.message);
    }

    return redirect("/login?message=Akun berhasil dibuat! Silakan cek email Anda untuk memverifikasi pendaftaran. Setelah verifikasi, Anda bisa login dan mendaftarkan anak Anda melalui Dashboard.");
  };

  return (
    <div className="bg-surface-container-low min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop font-body-md text-on-surface -mt-20">
      <div className="bg-surface-container-lowest w-full max-w-[480px] shadow-[0_4px_20px_rgba(23,46,64,0.05)] p-8 md:p-12 flex flex-col items-center text-center rounded-[24px]">
        <div className="mb-8">
          <Image
            alt="Logo Yayasan Merial Abadan Madani"
            className="h-[100px] w-auto mx-auto mb-4 object-contain mix-blend-multiply"
            src={logoYayasan}
          />
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Yayasan Merial Abadan Madani</h1>
        </div>
        <div className="w-full mb-6">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary-container mb-2">Buat Akun Orang Tua</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Daftar akun untuk mendaftarkan anak Anda.</p>
        </div>

        <div className="w-full mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl text-left">
          <h3 className="font-label-md text-label-md text-primary font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">info</span>
            Alur Pendaftaran
          </h3>
          <p className="font-caption text-caption text-on-surface-variant leading-relaxed">
            <strong>1. Buat Akun</strong> (Di halaman ini) <br/>
            <strong>2. Verifikasi Email</strong> (Cek inbox email Anda) <br/>
            <strong>3. Login</strong> (Masuk dengan akun yang sudah dibuat) <br/>
            <strong>4. Daftarkan Anak</strong> (Isi formulir pendaftaran di Dashboard)
          </p>
        </div>

        {searchParams?.message && (
          <p className="p-4 bg-tertiary-container text-on-tertiary-container rounded-xl text-center w-full mb-6 text-sm font-medium">
            {searchParams.message}
          </p>
        )}

        <form action={signUp} className="w-full space-y-4">
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="full_name">Nama Lengkap Orang Tua <span className="text-red-500">*</span></label>
            <input type="text" name="full_name" id="full_name" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Contoh: Agus Santoso" />
          </div>
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="email">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" id="email" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Contoh: abc@gmail.com" />
          </div>
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="password">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" id="password" required minLength={6} className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Minimal 6 karakter" />
          </div>
          <button type="submit" className="w-full mt-4 py-3 px-6 bg-primary text-white font-label-md text-label-md rounded-full hover:bg-[#122432] transition-colors shadow-md">
            Buat Akun
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="font-caption text-caption text-on-surface-variant mb-2">Sudah punya akun?</p>
          <Link className="font-caption text-caption text-secondary hover:underline transition-all font-bold" href="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}
