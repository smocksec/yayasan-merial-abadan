"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    const fetchUserAndData = async () => {
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // Untuk sementara tagihan diset 0, menunggu fitur VA
  const totalTagihan = 0;

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col md:flex-row relative">
      {/* Top Navigation (Mobile Only) */}
      <header className="md:hidden bg-surface dark:bg-surface-container-low w-full z-40 flex justify-between items-center px-margin-mobile py-4 shadow-[0_4px_20px_rgba(23,46,64,0.05)] border-b border-outline-variant relative">
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
          <h1 className="font-headline-md text-headline-md font-bold leading-tight">Yayasan Merial Abadan Madani</h1>
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
            Daftarkan Anak
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
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-4 py-2 text-on-secondary/80 hover:text-on-secondary transition-colors font-label-md text-label-md w-full disabled:opacity-50"
          >
            <span className="material-symbols-outlined">logout</span>
            {isLoggingOut ? "Keluar..." : "Keluar"}
          </button>
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
              <span className="material-symbols-outlined">{registrations.length > 0 ? "edit" : "add"}</span>
              {registrations.length > 0 ? "Edit Data Anak" : "Daftarkan Anak"}
            </button>
          </Link>
        </div>

        {/* Info Card for new users */}
        {!isLoading && registrations.length === 0 && (
          <div className="mb-8 bg-primary/5 border border-primary/15 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">school</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">Selamat Datang di Portal Pendaftaran!</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">Anda belum mendaftarkan anak. Silakan ikuti langkah berikut untuk mendaftarkan putra-putri Anda:</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl border border-outline-variant/50">
                      <div className="w-6 h-6 rounded-full bg-[#C89B53] text-white flex items-center justify-center text-xs font-bold">1</div>
                      <span className="font-label-md text-label-md text-primary">Klik &quot;Daftarkan Anak&quot;</span>
                    </div>
                    <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl border border-outline-variant/50">
                      <div className="w-6 h-6 rounded-full bg-[#C89B53] text-white flex items-center justify-center text-xs font-bold">2</div>
                      <span className="font-label-md text-label-md text-primary">Isi Formulir Lengkap</span>
                    </div>
                    <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl border border-outline-variant/50">
                      <div className="w-6 h-6 rounded-full bg-[#C89B53] text-white flex items-center justify-center text-xs font-bold">3</div>
                      <span className="font-label-md text-label-md text-primary">Tunggu Verifikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    <p className="font-caption text-caption text-on-surface-variant mt-1 text-center">Silakan daftar melalui tombol &quot;Daftarkan Anak&quot;.</p>
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

          </div>
        </div>
      </main>
    </div>
  );
}
