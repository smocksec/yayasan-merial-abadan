import Link from "next/link";
import Image from "next/image";

export default function PaudTkLanding() {
  return (
    <>
      {/* Navbar/Header Specific to PAUD TK */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-[#F0F6F5] py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#172E40] rounded-full flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-headline-sm text-headline-sm text-[#172E40]">Merial Abadan</span>
        </div>
        <Link href="/program">
          <button className="flex items-center gap-2 font-label-md text-label-md text-[#172E40] hover:text-[#C89B53] transition-colors font-bold">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Portal Yayasan
          </button>
        </Link>
      </nav>

      <main className="pt-24 pb-16 bg-[#F0F6F5] min-h-screen">
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(23,46,64,0.1)] group">
            <div className="w-full h-[500px] relative">
              <Image 
                src="/paud_tk_hero.png" 
                alt="Anak-anak PAUD & TK bermain ceria" 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#172E40]/80 via-[#172E40]/50 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-[#C89B53]/20 text-[#C89B53] rounded-full font-label-sm font-bold tracking-wide uppercase mb-4 w-max backdrop-blur-sm border border-[#C89B53]/30">Pendidikan Usia Dini</span>
              <h1 className="font-headline-xl text-[40px] md:text-[56px] leading-tight text-white mb-6 font-bold">
                Bermain, Belajar, dan Tumbuh Ceria
              </h1>
              <p className="font-body-lg text-body-lg text-white/90 mb-8 max-w-xl">
                Membangun pondasi karakter dan kecerdasan anak di lingkungan yang Islami, hangat, dan penuh kasih sayang.
              </p>
              <div className="flex gap-4">
                <Link href="/pendaftaran">
                  <button className="px-8 py-3.5 bg-[#C89B53] text-white font-label-lg font-bold rounded-full hover:bg-[#b08544] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300">
                    Daftar Sekarang
                  </button>
                </Link>
                <button className="px-8 py-3.5 bg-white text-[#172E40] font-label-lg font-bold rounded-full hover:bg-[#F0F6F5] transition-colors shadow-md hover:shadow-lg">
                  Lihat Galeri
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Pillars */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-[#172E40] mb-4">Mengapa Memilih Kami?</h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Kami berdedikasi memberikan lingkungan belajar terbaik yang menggabungkan nilai-nilai agama dan kreativitas anak.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-[#F0F6F5] hover:border-[#4A7C7A] transition-colors text-center group">
              <div className="w-16 h-16 bg-[#4A7C7A]/10 text-[#4A7C7A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">favorite</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#172E40] mb-3">Lingkungan Penuh Kasih</h3>
              <p className="font-body-md text-on-surface-variant">
                Guru yang penyayang dan berpengalaman dalam memahami psikologi dan tumbuh kembang anak usia dini.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-[#F0F6F5] hover:border-[#C89B53] transition-colors text-center group">
              <div className="w-16 h-16 bg-[#C89B53]/10 text-[#C89B53] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">extension</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#172E40] mb-3">Belajar Sambil Bermain</h3>
              <p className="font-body-md text-on-surface-variant">
                Kurikulum interaktif yang menstimulasi motorik, kognitif, dan kreativitas melalui permainan edukatif.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-[#F0F6F5] hover:border-[#172E40] transition-colors text-center group">
              <div className="w-16 h-16 bg-[#172E40]/10 text-[#172E40] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#172E40] mb-3">Pendidikan Karakter Islami</h3>
              <p className="font-body-md text-on-surface-variant">
                Pengenalan huruf hijaiyah, doa harian, dan pembiasaan adab Islami sejak dini secara menyenangkan.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="bg-[#172E40] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-white mb-4">Mari Bergabung Bersama Kami!</h2>
              <p className="font-body-lg text-white/80 mb-8 max-w-xl mx-auto">
                Pendaftaran siswa baru tahun ajaran 2024/2025 telah dibuka. Segera amankan kursi untuk si kecil!
              </p>
              <Link href="/pendaftaran">
                <button className="px-10 py-4 bg-[#C89B53] text-white font-label-lg font-bold rounded-full hover:bg-[#b08544] transition-all shadow-[0_4px_15px_rgba(200,155,83,0.4)] hover:shadow-[0_6px_20px_rgba(200,155,83,0.6)] hover:-translate-y-1">
                  Mulai Pendaftaran Online
                </button>
              </Link>
            </div>
            {/* Decorative background circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C89B53]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4A7C7A]/30 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </section>
      </main>
    </>
  );
}
