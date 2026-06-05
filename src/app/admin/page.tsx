import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  // Double check authorization at the page level just to be safe
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== 'aufarifqi119@gmail.com') {
    redirect('/dashboard');
  }

  // Data Mockup untuk UI sementara (karena form registrasi belum insert ke DB)
  const mockRegistrations = [
    { id: "REG-001", namaAnak: "Budi Santoso", program: "TK", tanggal: "05 Juni 2026", status: "Menunggu", noHp: "081234567890" },
    { id: "REG-002", namaAnak: "Siti Aminah", program: "PAUD", tanggal: "04 Juni 2026", status: "Diterima", noHp: "089876543210" },
    { id: "REG-003", namaAnak: "Ahmad Dahlan", program: "TK", tanggal: "03 Juni 2026", status: "Ditolak", noHp: "087712345678" },
    { id: "REG-004", namaAnak: "Aisyah Putri", program: "PAUD", tanggal: "02 Juni 2026", status: "Diterima", noHp: "085511223344" },
    { id: "REG-005", namaAnak: "Reza Rahardian", program: "TK", tanggal: "01 Juni 2026", status: "Menunggu", noHp: "082233445566" },
  ];

  return (
    <main className="pt-8 md:pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-[1400px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 mt-16 md:mt-0">
        <div>
          <div className="inline-block px-3 py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full mb-3 shadow-sm border border-primary/10">
            Admin Portal
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Dashboard Administrator</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Kelola seluruh data pendaftaran siswa Yayasan Merial Abadan Madani.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="px-5 py-2.5 font-label-md text-label-md text-primary bg-surface border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors shadow-sm">
            Lihat Tampilan User
          </Link>
          <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 border border-outline-variant rounded-full shadow-sm">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold font-label-md text-label-md">
              A
            </div>
            <span className="font-label-md text-label-md text-primary">Admin Aufa</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-6 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
            <span className="font-title-md text-title-md text-primary">Total</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">124</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">+12 pendaftar baru minggu ini</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-6 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#C89B53]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#C89B53]/10 rounded-2xl flex items-center justify-center text-[#C89B53]">
              <span className="material-symbols-outlined text-[24px]">child_care</span>
            </div>
            <span className="font-title-md text-title-md text-primary">PAUD</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">48</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Siswa terdaftar</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-6 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <span className="font-title-md text-title-md text-primary">TK</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">76</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Siswa terdaftar</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-6 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#E53935]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#E53935]/10 rounded-2xl flex items-center justify-center text-[#E53935]">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
            <span className="font-title-md text-title-md text-primary">Menunggu</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">15</p>
          <p className="font-caption text-caption text-[#E53935] relative z-10 font-bold">Perlu verifikasi Anda</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-surface-container-lowest border border-surface-container rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(23,46,64,0.05)]">
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-headline-sm text-headline-sm text-primary">Daftar Pendaftar Terbaru</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Cari nama atau ID..." 
                className="pl-10 pr-4 py-2 border border-outline-variant rounded-full font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary w-full md:w-64 bg-surface"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors font-label-md text-label-md text-primary">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">ID Daftar</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Nama Anak</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Program</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Tanggal</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Kontak Ortu</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Status</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {mockRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="py-4 px-6 font-body-md text-body-md text-on-surface font-medium">{reg.id}</td>
                  <td className="py-4 px-6 font-body-md text-body-md text-primary font-bold">{reg.namaAnak}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${reg.program === 'TK' ? 'bg-secondary/10 text-secondary' : 'bg-[#C89B53]/10 text-[#C89B53]'}`}>
                      {reg.program}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">{reg.tanggal}</td>
                  <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{reg.noHp}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center w-fit gap-1.5
                      ${reg.status === 'Diterima' ? 'bg-green-100 text-green-700' : 
                        reg.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 
                        'bg-orange-100 text-orange-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${reg.status === 'Diterima' ? 'bg-green-500' : reg.status === 'Ditolak' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                      {reg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex items-center justify-end gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-secondary hover:text-white transition-colors text-primary" title="Lihat Berkas">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-green-500 hover:text-white transition-colors text-primary" title="Terima Pendaftaran">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-red-500 hover:text-white transition-colors text-primary" title="Tolak">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-surface-container flex items-center justify-between">
          <p className="font-body-sm text-body-sm text-on-surface-variant">Menampilkan 1-5 dari 124 data</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-label-md text-label-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md text-label-md">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md text-label-md">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
