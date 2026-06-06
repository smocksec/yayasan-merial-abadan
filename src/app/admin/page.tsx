import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  // Double check authorization at the page level just to be safe
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== 'aufarifqi119@gmail.com') {
    redirect('/dashboard');
  }

  // Mengambil data asli dari Supabase
  const { data: registrations, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  // Menangani potensi error (misal jika tabel belum dibuat)
  const displayData = registrations || [];

  // Mengambil total user dari auth.users (Membutuhkan SUPABASE_SERVICE_ROLE_KEY di .env.local)
  let totalBelumIsiForm = 0;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (!usersError && usersData?.users) {
      // Kecualikan admin dari perhitungan
      const totalUsers = usersData.users.filter(u => u.email !== 'aufarifqi119@gmail.com').length;
      
      // Hitung yang belum mengisi form:
      // Total user (non-admin) dikurangi total pendaftar unik (berdasarkan user_id)
      const userIdsWithForm = new Set(displayData.filter(r => r.user_id).map(r => r.user_id));
      totalBelumIsiForm = Math.max(0, totalUsers - userIdsWithForm.size);
    }
  }

  // Hitung Statistik
  const totalPendaftar = displayData.length;
  const totalPAUD = displayData.filter((r) => r.program === 'PAUD').length;
  const totalTK = displayData.filter((r) => r.program === 'TK').length;
  const totalMenunggu = displayData.filter((r) => r.status === 'Menunggu').length;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
            <span className="font-title-md text-title-md text-primary">Total</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalPendaftar}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Total pendaftar saat ini</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#C89B53]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#C89B53]/10 rounded-2xl flex items-center justify-center text-[#C89B53]">
              <span className="material-symbols-outlined text-[24px]">child_care</span>
            </div>
            <span className="font-title-md text-title-md text-primary">PAUD</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalPAUD}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Siswa terdaftar PAUD</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <span className="font-title-md text-title-md text-primary">TK</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalTK}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Siswa terdaftar TK</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#E53935]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#E53935]/10 rounded-2xl flex items-center justify-center text-[#E53935]">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
            <span className="font-title-md text-title-md text-primary">Menunggu</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalMenunggu}</p>
          <p className="font-caption text-caption text-[#E53935] relative z-10 font-bold">Perlu verifikasi Anda</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-gray-500/10 rounded-2xl flex items-center justify-center text-gray-500">
              <span className="material-symbols-outlined text-[24px]">person_off</span>
            </div>
            <span className="font-title-md text-title-md text-primary" title="User terdaftar tapi belum isi formulir pendaftaran">Pending</span>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalBelumIsiForm}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Belum isi formulir</p>
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
              {displayData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-on-surface-variant font-body-md">
                    Belum ada data pendaftaran di Supabase.
                  </td>
                </tr>
              ) : (
                displayData.map((reg: any) => (
                  <tr key={reg.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface font-medium">{reg.id.substring(0, 8).toUpperCase()}</td>
                    <td className="py-4 px-6 font-body-md text-body-md text-primary font-bold">{reg.nama_anak}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${reg.program === 'TK' ? 'bg-secondary/10 text-secondary' : 'bg-[#C89B53]/10 text-[#C89B53]'}`}>
                        {reg.program || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">
                      {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{reg.no_hp_ortu || '-'}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center w-fit gap-1.5
                        ${reg.status === 'Diterima' ? 'bg-green-100 text-green-700' : 
                          reg.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 
                          'bg-orange-100 text-orange-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${reg.status === 'Diterima' ? 'bg-green-500' : reg.status === 'Ditolak' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                        {reg.status || 'Menunggu'}
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
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-surface-container flex items-center justify-between">
          <p className="font-body-sm text-body-sm text-on-surface-variant">Menampilkan {displayData.length} data terbaru</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-label-md text-label-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
