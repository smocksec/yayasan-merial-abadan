import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../../public/logo-yayasan.jpg";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UpdatePassword(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;
  
  const updatePassword = async (formData: FormData) => {
    "use server";
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (password !== confirmPassword) {
      return redirect("/update-password?message=Password dan konfirmasi password tidak cocok.");
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      return redirect("/update-password?message=Gagal mengubah password: " + error.message);
    }

    return redirect("/login?message=Password berhasil diubah. Silakan login dengan password baru Anda.");
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
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary-container mb-2">Ubah Password Baru</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Silakan masukkan password baru Anda.</p>
        </div>

        {searchParams?.message && (
          <p className="p-4 bg-tertiary-container text-on-tertiary-container rounded-xl text-center w-full mb-6 text-sm font-medium">
            {searchParams.message}
          </p>
        )}

        <form action={updatePassword} className="w-full space-y-4">
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="password">Password Baru</label>
            <input type="password" name="password" id="password" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Minimal 6 karakter" />
          </div>
          <div className="text-left space-y-1">
            <label className="font-label-md text-label-md text-primary" htmlFor="confirmPassword">Konfirmasi Password Baru</label>
            <input type="password" name="confirmPassword" id="confirmPassword" required className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface-container-lowest" placeholder="Masukkan ulang password baru" />
          </div>
          <button type="submit" className="w-full mt-4 py-3 px-6 bg-primary text-white font-label-md text-label-md rounded-full hover:bg-[#122432] transition-colors shadow-md">
            Simpan Password Baru
          </button>
        </form>
      </div>
    </div>
  );
}
