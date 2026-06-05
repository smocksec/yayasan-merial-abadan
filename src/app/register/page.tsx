import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../../public/logo-yayasan.jpg";

export default function Register() {
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
        <div className="w-full mb-10">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary-container mb-2">Buat Akun Baru</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Silakan daftar menggunakan akun Google Anda terlebih dahulu.</p>
        </div>
        <Link href="/login" className="w-full">
          <button className="w-full flex items-center justify-center gap-3 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 py-3 px-6 font-label-md text-label-md text-on-surface hover:-translate-y-[2px] hover:shadow-[0_4px_20px_rgba(23,46,64,0.08)] rounded-full">
            <img
              alt="Google Logo"
              className="w-5 h-5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgCTNbzUwK3yZNs4g3q5zUnIrmJNKQnCBhl53f_huhDltsH_dPqz4GSNpGEuAz9gZXjmddcxRsVXaDlO3DYyYTM-9BxVi1x8fUl5SkKz4f7nlMB32jCSi46bisXuiVaSG_VXazpnlchSw40R90560IfEfdNwhPTfb28p3OcCYLL2gHLyM6Fm3t64qQQtHbpxc9g3sPvmkfgv4L8BWxjPFVN-_v7IAkQOXJvjsCDPJllTIuebvcNwWqLLWsM2soauhu05mHIh_loU4"
            />
            Daftar dengan Google
          </button>
        </Link>
        <div className="mt-8 text-center">
          <p className="font-caption text-caption text-on-surface-variant mb-2">Sudah punya akun?</p>
          <Link className="font-caption text-caption text-secondary hover:underline transition-all font-bold" href="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}
