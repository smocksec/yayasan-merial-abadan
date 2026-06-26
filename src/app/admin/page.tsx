"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [totalBelumIsiForm, setTotalBelumIsiForm] = useState(0);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const adminEmails = ["aufarifqi119@gmail.com", "merialabadanmadani@yahoo.com"];
      if (!user || !adminEmails.includes(user.email?.toLowerCase() || '')) {
        router.push("/dashboard");
        return;
      }
      
      setIsAuthorized(true);

      // Fetch via server API route yang bypass RLS
      try {
        const res = await fetch("/api/admin/registrations");
        if (res.ok) {
          const json = await res.json();
          setRegistrations(json.registrations || []);
          setTotalBelumIsiForm(json.totalBelumIsiForm || 0);
        } else {
          const text = await res.text();
          console.error("Failed to fetch admin data, status:", res.status, text);
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  const handleExportPDF = (registrationId: string) => {
    setIsExporting(registrationId);
    // Open the export API route in a new tab — the HTML page can be printed/saved as PDF
    window.open(`/api/export?id=${registrationId}`, "_blank");
    setTimeout(() => setIsExporting(null), 1000);
  };

  const handleExportAll = () => {
    setIsExporting("all");
    registrations.forEach((reg, index) => {
      setTimeout(() => {
        window.open(`/api/export?id=${reg.id}`, "_blank");
      }, index * 500);
    });
    setTimeout(() => setIsExporting(null), registrations.length * 500 + 1000);
  };

  const handleUpdateStatus = async (registrationId: string, newStatus: string) => {
    setUpdatingStatus(registrationId);
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: registrationId, status: newStatus }),
      });

      if (res.ok) {
        setRegistrations(prev =>
          prev.map(reg =>
            reg.id === registrationId ? { ...reg, status: newStatus } : reg
          )
        );
      } else {
        const json = await res.json();
        alert("Gagal mengubah status: " + (json.error || "Unknown error"));
      }
    } catch (err) {
      alert("Gagal mengubah status. Silakan coba lagi.");
    }
    setUpdatingStatus(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Filter & Search
  const filteredData = registrations.filter(reg => {
    const matchSearch = searchQuery === "" ||
      reg.nama_anak?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.no_hp_ortu?.includes(searchQuery);
    const matchFilter = !filterStatus || reg.status === filterStatus;
    return matchSearch && matchFilter;
  });

  // Statistics
  const totalPendaftar = registrations.length;
  const totalTPA = registrations.filter(r => r.program === "TPA").length;
  const totalKB = registrations.filter(r => r.program === "KB").length;
  const totalTK = registrations.filter(r => r.program === "TK A" || r.program === "TK B").length;
  const totalMenunggu = registrations.filter(r => r.status === "Menunggu").length;

  if (!isAuthorized || isLoading) {
    return (
      <main className="pt-8 md:pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
          <p className="font-body-md text-body-md text-on-surface-variant">Memuat dashboard admin...</p>
        </div>
      </main>
    );
  }

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
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleExportAll}
            disabled={registrations.length === 0 || isExporting === "all"}
            className="px-5 py-2.5 font-label-md text-label-md text-white bg-[#C89B53] rounded-full hover:bg-[#b08544] transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {isExporting === "all" ? "Mengeksport..." : "Export Semua PDF"}
          </button>
          <Link href="/admin/pendaftaran">
            <button className="px-5 py-2.5 font-label-md text-label-md text-white bg-primary rounded-full hover:bg-[#122432] transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Isi Form Pendaftaran
            </button>
          </Link>
          <button
            onClick={() => window.open("/api/export?id=blank", "_blank")}
            className="px-5 py-2.5 font-label-md text-label-md text-primary bg-surface border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Form Kosong
          </button>
          <Link href="/dashboard" className="px-5 py-2.5 font-label-md text-label-md text-primary bg-surface border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors shadow-sm">
            Lihat Tampilan User
          </Link>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 font-label-md text-label-md text-red-600 bg-surface border border-red-200 rounded-full hover:bg-red-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Keluar
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalPendaftar}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">Total Pendaftar</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#C89B53]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#C89B53]/10 rounded-2xl flex items-center justify-center text-[#C89B53]">
              <span className="material-symbols-outlined text-[24px]">child_care</span>
            </div>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalTPA}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">TPA</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalTK}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">TK (A+B)</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#7B61FF]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#7B61FF]/10 rounded-2xl flex items-center justify-center text-[#7B61FF]">
              <span className="material-symbols-outlined text-[24px]">family_restroom</span>
            </div>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalKB}</p>
          <p className="font-caption text-caption text-on-surface-variant relative z-10">KB</p>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-5 shadow-[0_4px_20px_rgba(23,46,64,0.04)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#E53935]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#E53935]/10 rounded-2xl flex items-center justify-center text-[#E53935]">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>
          <p className="font-display-sm text-display-sm text-primary mb-1 relative z-10">{totalMenunggu}</p>
          <p className="font-caption text-caption text-[#E53935] relative z-10 font-bold">Perlu Verifikasi</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-surface-container-lowest border border-surface-container rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(23,46,64,0.05)]">
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-headline-sm text-headline-sm text-primary">Daftar Pendaftar</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Cari nama, ID, atau HP..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-outline-variant rounded-full font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary w-full md:w-64 bg-surface"
              />
            </div>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setFilterStatus(null)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors border ${!filterStatus ? 'bg-primary text-white border-primary' : 'bg-surface text-primary border-outline-variant hover:bg-surface-container-low'}`}
              >
                Semua
              </button>
              <button 
                onClick={() => setFilterStatus("Menunggu")}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors border ${filterStatus === 'Menunggu' ? 'bg-orange-500 text-white border-orange-500' : 'bg-surface text-orange-600 border-orange-200 hover:bg-orange-50'}`}
              >
                Menunggu
              </button>
              <button 
                onClick={() => setFilterStatus("Diterima")}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors border ${filterStatus === 'Diterima' ? 'bg-green-500 text-white border-green-500' : 'bg-surface text-green-600 border-green-200 hover:bg-green-50'}`}
              >
                Diterima
              </button>
              <button 
                onClick={() => setFilterStatus("Ditolak")}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors border ${filterStatus === 'Ditolak' ? 'bg-red-500 text-white border-red-500' : 'bg-surface text-red-600 border-red-200 hover:bg-red-50'}`}
              >
                Ditolak
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">ID Daftar</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Nama Anak</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Program & Waktu</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Layanan Tambahan</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Tanggal</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Kontak Ortu</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6">Status</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[48px] text-on-surface-variant/50">search_off</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {searchQuery || filterStatus ? "Tidak ada data yang cocok dengan filter." : "Belum ada data pendaftaran."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((reg: any) => (
                  <tr key={reg.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface font-medium font-mono">{reg.id.substring(0, 8).toUpperCase()}</td>
                    <td className="py-4 px-6 font-body-md text-body-md text-primary font-bold">{reg.nama_anak}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm w-fit ${
                          reg.program === 'TK A' || reg.program === 'TK B' ? 'bg-secondary/10 text-secondary' : 
                          reg.program === 'KB' ? 'bg-[#7B61FF]/10 text-[#7B61FF]' :
                          'bg-[#C89B53]/10 text-[#C89B53]'
                        }`}>
                          {reg.program || 'N/A'}
                        </span>
                        {reg.data_lengkap?.waktu_belajar && (
                          <span className="font-caption text-caption text-on-surface-variant mt-0.5">{reg.data_lengkap.waktu_belajar}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#4A7C7A]">directions_car</span>
                          <span>A. Jemput: <strong>{reg.data_lengkap?.antar_jemput || '-'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#C89B53]">restaurant</span>
                          <span>Catering: <strong>{reg.data_lengkap?.catering || '-'}</strong></span>
                        </div>
                      </div>
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
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleExportPDF(reg.id)}
                          disabled={isExporting === reg.id}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-[#C89B53] hover:text-white transition-colors text-primary disabled:opacity-50" 
                          title="Export PDF"
                        >
                          <span className="material-symbols-outlined text-[18px]">{isExporting === reg.id ? "hourglass_empty" : "download"}</span>
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(reg.id, 'Diterima')}
                          disabled={updatingStatus === reg.id || reg.status === 'Diterima'}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-green-500 hover:text-white transition-colors text-primary disabled:opacity-30 disabled:cursor-not-allowed" 
                          title="Terima Pendaftaran"
                        >
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(reg.id, 'Ditolak')}
                          disabled={updatingStatus === reg.id || reg.status === 'Ditolak'}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-red-500 hover:text-white transition-colors text-primary disabled:opacity-30 disabled:cursor-not-allowed" 
                          title="Tolak Pendaftaran"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-surface-container flex items-center justify-between">
          <p className="font-body-sm text-body-sm text-on-surface-variant">Menampilkan {filteredData.length} dari {registrations.length} data</p>
        </div>
      </div>
    </main>
  );
}
