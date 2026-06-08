import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../../public/logo-yayasan.jpg";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;
  
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Email atau password yang Anda masukkan salah.");
    }

    // Jika yang login adalah admin, arahkan ke halaman admin
    if (email === "aufarifqi119@gmail.com") {
      return redirect("/admin");
    }

    // Selain itu (orang tua), arahkan ke dashboard reguler
    return redirect("/dashboard");
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
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary-container mb-2">Selamat Datang</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Silakan masuk untuk mengakses portal.</p>
        </div>

        {searchParams?.message && (
          <p className="p-4 bg-tertiary-container text-on-tertiary-container rounded-xl text-center w-full mb-6 text-sm font-medium">
            {searchParams.message}
          </p>
        )}

        <form action={signIn} className="w-full space-y-4">
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Contoh: abc@gmail.com" />
          </div>
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Contoh: rahasia123" />
          </div>
          <button type="submit" className="w-full mt-4 py-3 px-6 bg-primary text-white font-label-md text-label-md rounded-full hover:bg-[#122432] transition-colors shadow-md">
            Masuk
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-2">
          <Link className="font-caption text-caption text-secondary hover:underline transition-all font-bold" href="/register">Belum punya akun? Daftar</Link>
          <a className="font-caption text-caption text-on-surface-variant hover:underline transition-all" href="#">Butuh bantuan? Hubungi Administrator</a>
        </div>
      </div>
    </div>
  );
}
