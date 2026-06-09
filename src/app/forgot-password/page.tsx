import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../../public/logo-yayasan.jpg";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ForgotPassword(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;
  
  const requestReset = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const originList = await headers();
    const origin = originList.get("origin") || "";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/update-password`,
    });

    if (error) {
      return redirect("/forgot-password?message=Gagal mengirim link reset password: " + error.message);
    }

    return redirect("/forgot-password?message=Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.");
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
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary-container mb-2">Lupa Password</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Masukkan email Anda untuk mereset password.</p>
        </div>

        {searchParams?.message && (
          <p className="p-4 bg-tertiary-container text-on-tertiary-container rounded-xl text-center w-full mb-6 text-sm font-medium">
            {searchParams.message}
          </p>
        )}

        <form action={requestReset} className="w-full space-y-4">
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Contoh: abc@gmail.com" />
          </div>
          <button type="submit" className="w-full mt-4 py-3 px-6 bg-primary text-white font-label-md text-label-md rounded-full hover:bg-[#122432] transition-colors shadow-md">
            Kirim Link Reset
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-2">
          <Link className="font-caption text-caption text-secondary hover:underline transition-all font-bold" href="/login">Kembali ke halaman Login</Link>
        </div>
      </div>
    </div>
  );
}
