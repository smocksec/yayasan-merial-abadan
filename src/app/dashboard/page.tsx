"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || "User");
        
        const { data } = await supabase
          .from('registrations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (data) {
          setRegistrations(data);
        }
      }
      setIsLoading(false);
    };
    
    fetchUserAndData();
  }, []);

  // Untuk sementara tagihan diset 0, menunggu fitur VA
  const totalTagihan = 0;

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col md:flex-row -mt-20 relative">
      {/* Top Navigation (Mobile Only) */}
      <header className="md:hidden bg-surface dark:bg-surface-container-low w-full z-40 flex justify-between items-center px-margin-mobile py-4 shadow-[0_4px_20px_rgba(23,46,64,0.05)] border-b border-outline-variant mt-20 relative">
        <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
          Merial Abadan Madani
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-on-surface p-2 -mr-2">
          <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? "close" : "menu"}</span>
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#172E40]/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation (Desktop & Mobile) */}
      <aside className={`flex flex-col w-64 bg-secondary text-on-secondary min-h-screen fixed left-0 top-0 shadow-[0_4px_20px_rgba(23,46,64,0.05)] z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-on-secondary/20 flex justify-between items-center">
          <h1 className="font-headline-md text-headline-md font-bold leading-tight">Yayasan Merial Abadan</h1>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 bg-on-secondary text-secondary font-label-md text-label-md font-bold transition-all shadow-sm rounded-xl"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            Beranda
          </Link>
          <Link
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-on-secondary/80 hover:text-on-secondary hover:bg-on-secondary/10 font-label-md text-label-md transition-colors rounded-xl"
          >
            <span className="material-symbols-outlined">child_care</span>
            Data Anak
          </Link>
          <Link
            href="/pendaftaran"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-on-secondary/80 hover:text-on-secondary hover:bg-on-secondary/10 font-label-md text-label-md transition-colors rounded-xl"
          >
            <span className="material-symbols-outlined">app_registration</span>
            Pendaftaran
          </Link>
          <Link
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-on-secondary/80 hover:text-on-secondary hover:bg-on-secondary/10 font-label-md text-label-md transition-colors rounded-xl"
          >
            <span className="material-symbols-outlined">receipt_long</span>
            Tagihan
          </Link>
          <Link
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-on-secondary/80 hover:text-on-secondary hover:bg-on-secondary/10 font-label-md text-label-md transition-colors rounded-xl"
          >
            <span className="material-symbols-outlined">settings</span>
            Pengaturan
          </Link>
        </nav>
        <div className="p-4 border-t border-on-secondary/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-on-secondary/80 hover:text-on-secondary transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined">logout</span>
            Keluar
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop bg-surface-container-low min-h-screen pt-24 md:pt-margin-desktop">
        {/* Welcome Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
              Selamat Datang, Bapak/Ibu {userName}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Pantau perkembangan dan administrasi pendidikan putra-putri Anda.</p>
          </div>
          <Link href="/pendaftaran">
            <button className="bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md px-6 py-3 hover:bg-tertiary-fixed-dim transition-colors shadow-sm flex items-center gap-2 rounded-full border border-transparent">
              <span className="material-symbols-outlined">add</span>
              Daftarkan Anak
            </button>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Column 1 & 2: Main Widgets */}
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            {/* Status Pendaftaran Widget */}
            <section className="bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-outline-variant border-opacity-30 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-primary">Status Pendaftaran</h3>
                <Link className="font-label-md text-label-md text-secondary hover:underline flex items-center" href="#">
                  Lihat Detail <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
                </Link>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="p-8 text-center text-on-surface-variant">Memuat data...</div>
                ) : registrations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-surface rounded-lg border border-outline-variant border-opacity-50 border-dashed">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">assignment_late</span>
                    <p className="font-label-md text-label-md text-primary">Belum ada data pendaftaran.</p>
                    <p className="font-caption text-caption text-on-surface-variant mt-1 text-center">Silakan daftar melalui tombol "Daftarkan Anak".</p>
                  </div>
                ) : (
                  registrations.map(reg => (
                    <div key={reg.id} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant border-opacity-50 hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-primary">{reg.nama_anak}</p>
                          <p className="font-caption text-caption text-on-surface-variant">{reg.program} Merial</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                        ${reg.status === 'Diterima' ? 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]' : 
                          reg.status === 'Ditolak' ? 'bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF]' : 
                          'bg-[#FEF7E0] text-[#B06000] border border-[#FAD28C]'}`}>
                        <span className="material-symbols-outlined text-sm mr-1">
                          {reg.status === 'Diterima' ? 'check_circle' : reg.status === 'Ditolak' ? 'cancel' : 'pending'}
                        </span>
                        {reg.status || 'Menunggu Verifikasi'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Column 3: Side Widgets */}
          <div className="flex flex-col gap-gutter">
            {/* Notifikasi/Tagihan Widget */}
            <section className="bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-tertiary-fixed border-opacity-50 relative overflow-hidden rounded-3xl">
              <div className="absolute top-0 right-0 w-16 h-16 bg-tertiary-fixed rounded-bl-full opacity-20 -z-10"></div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
                <h3 className="font-headline-md text-headline-md text-primary">Tagihan Aktif</h3>
              </div>
              <div className="bg-surface-bright rounded-lg p-4 border border-outline-variant border-opacity-30 mb-4">
                <p className="font-caption text-caption text-on-surface-variant mb-1">Total Belum Dibayar</p>
                <p className="font-headline-md text-headline-md text-error mb-2">Rp {totalTagihan.toLocaleString('id-ID')}</p>
                {totalTagihan > 0 ? (
                  <>
                    <p className="font-caption text-caption text-on-surface-variant mb-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-error">warning</span> Segera Lakukan Pembayaran
                    </p>
                    <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-2 px-4 hover:bg-primary-fixed-dim hover:text-primary transition-colors rounded-full border border-transparent">
                      Bayar Sekarang
                    </button>
                  </>
                ) : (
                  <p className="font-caption text-caption text-green-600 mb-3 flex items-center gap-1 font-medium mt-3">
                    <span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Tidak ada tagihan aktif
                  </p>
                )}
              </div>
              <Link className="font-caption text-caption text-secondary hover:underline flex items-center justify-center w-full" href="#">
                Lihat Riwayat Tagihan
              </Link>
            </section>

            {/* Info Yayasan Widget */}
            <section
              className="bg-secondary text-on-secondary p-6 shadow-sm flex flex-col justify-between min-h-[200px] relative overflow-hidden bg-cover bg-center rounded-3xl border border-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(52, 102, 101, 0.9), rgba(52, 102, 101, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-n7335uJFAZOHZELkJ1w0J5jJQeGrxrDiAuPgfMIBCuPvD8Hw3459P_bO7_JTAL6cuyJ8AJ16rY0Iku0cQw40DevyO86gXCbpSt_cw9sPQmGyY-Iel75Ee7tgnY9bf5ZiIfWXGCjERFGhL94VoLAz1Xgzxt9pTIxrR_6i3JDVscx4unRn1ZpbjAxvJx1w8Jtcwu5DXpcai9H8F1JNVCWuYqHjRYhadQCMswl3OgjmB8-QfZRs9Kv1XrYXRj95DQVT5AKR8abOp58")'
              }}
            >
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md mb-2">Pendaftaran Siswa Baru 2025/2026</h3>
                <p className="font-body-md text-body-md opacity-90 mb-4 text-sm">Dapatkan potongan khusus untuk pendaftaran gelombang pertama.</p>
              </div>
              <button className="relative z-10 w-max bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md px-4 py-2 hover:bg-tertiary-fixed-dim transition-colors border border-transparent rounded-full">
                Info Selengkapnya
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
