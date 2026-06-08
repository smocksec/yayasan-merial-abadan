"use client";

import Link from "next/link";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Pendaftaran() {
  const [step, setStep] = useState(1);
  const [allFormData, setAllFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simpan data dari step saat ini
    const currentFormData = new FormData(e.currentTarget);
    const data = Object.fromEntries(currentFormData.entries());
    const mergedData = { ...allFormData, ...data };
    setAllFormData(mergedData);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Step 4: Submit ke Supabase
      setIsSubmitting(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const { error } = await supabase.from('registrations').insert({
          user_id: user?.id,
          nama_anak: mergedData.nama_anak || 'Tanpa Nama',
          program: mergedData.program || 'PAUD',
          no_hp_ortu: mergedData.nohp_ayah || mergedData.nohp_ibu || '-',
          data_lengkap: mergedData,
          status: 'Menunggu'
        });

        if (error) throw error;
        
        // Sukses! Arahkan ke dashboard
        router.push('/dashboard?message=Pendaftaran berhasil dikirim!');
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("Gagal mengirim pendaftaran. Pastikan Anda sudah login.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <main className="pt-8 md:pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto min-h-screen">
        {/* Registration Form Container */}
        <div className="max-w-3xl mx-auto mt-16 md:mt-0">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Pendaftaran Program</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Selesaikan pendaftaran Anda dengan melengkapi dokumen yang diperlukan.</p>
          </div>

          {/* Horizontal Stepper */}
          <div className="mb-12 relative flex items-center justify-between w-full">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-surface-container-high -z-10"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-[#C89B53] -z-10 transition-all duration-500 ease-in-out" style={{ width: `${(step - 1) * 33.33}%` }}></div>
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 flex items-center justify-center relative shadow-sm rounded-full transition-colors duration-300 ${step > 1 ? 'bg-[#C89B53] text-white' : step === 1 ? 'bg-white text-[#C89B53] border-2 border-[#C89B53]' : 'bg-surface-container-high text-on-surface-variant border-2 border-surface'}`}>
                {step > 1 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="font-label-md text-label-md">1</span>}
              </div>
              <span className={`font-label-md text-label-md ${step >= 1 ? 'text-[#172E40] font-bold' : 'text-on-surface-variant'}`}>Biodata Anak</span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 flex items-center justify-center relative shadow-sm rounded-full transition-colors duration-300 ${step > 2 ? 'bg-[#C89B53] text-white' : step === 2 ? 'bg-white text-[#C89B53] border-2 border-[#C89B53]' : 'bg-surface-container-high text-on-surface-variant border-2 border-surface'}`}>
                {step > 2 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="font-label-md text-label-md">2</span>}
              </div>
              <span className={`font-label-md text-label-md ${step >= 2 ? 'text-[#172E40] font-bold' : 'text-on-surface-variant'}`}>Data Orang Tua</span>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 flex items-center justify-center relative shadow-sm rounded-full transition-colors duration-300 ${step > 3 ? 'bg-[#C89B53] text-white' : step === 3 ? 'bg-white text-[#C89B53] border-2 border-[#C89B53]' : 'bg-surface-container-high text-on-surface-variant border-2 border-surface'}`}>
                {step > 3 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="font-label-md text-label-md">3</span>}
              </div>
              <span className={`font-label-md text-label-md ${step >= 3 ? 'text-[#172E40] font-bold' : 'text-on-surface-variant'}`}>Unggah Dokumen</span>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 flex items-center justify-center relative shadow-sm rounded-full transition-colors duration-300 ${step > 4 ? 'bg-[#C89B53] text-white' : step === 4 ? 'bg-white text-[#C89B53] border-2 border-[#C89B53]' : 'bg-surface-container-high text-on-surface-variant border-2 border-surface'}`}>
                {step > 4 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="font-label-md text-label-md">4</span>}
              </div>
              <span className={`font-label-md text-label-md ${step >= 4 ? 'text-[#172E40] font-bold' : 'text-on-surface-variant'}`}>Review</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-surface-container p-6 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 rounded-3xl">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-surface-container pb-4">
              {step === 1 ? "Biodata Anak" : step === 2 ? "Data Orang Tua" : step === 3 ? "Unggah Dokumen" : "Review"}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              {step === 1 ? "Silakan lengkapi informasi biodata calon siswa di bawah ini dengan benar." : step === 2 ? "Silakan lengkapi informasi data orang tua / wali di bawah ini." : step === 3 ? "Silakan unggah dokumen pendukung pendaftaran yang diminta. Pastikan dokumen yang diunggah adalah hasil scan asli." : "Periksa kembali data Anda sebelum disubmit."}
            </p>

            <form onSubmit={handleNext} className="space-y-6">
              {step === 1 && (
                <>
                  {/* Program Pilihan & Waktu Belajar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-b border-surface-container pb-6">
                    <div className="space-y-3">
                      <label className="block font-label-md text-label-md text-primary font-bold">Tingkat Pendidikan <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-4 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="program" value="PAUD" required className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">PAUD</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="program" value="TK" required className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">TK</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block font-label-md text-label-md text-primary font-bold">Waktu Belajar <span className="text-red-500">*</span></label>
                      <div className="flex flex-col gap-3 pt-1">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="waktu_belajar" value="Half Day" required className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Half Day <span className="text-on-surface-variant font-normal">(07:30 - 12:00)</span></span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="waktu_belajar" value="Full Day" required className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Full Day <span className="text-on-surface-variant font-normal">(07:30 - 17:00)</span></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-label-md text-label-md text-primary" htmlFor="nama_anak">Nama Lengkap Anak <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="nama_anak"
                      name="nama_anak"
                      required
                      className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                      placeholder="Contoh: Budi Santoso" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Umur */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="umur">Umur (Tahun)</label>
                      <input
                        type="number"
                        id="umur"
                        min="1"
                        max="20"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 6" />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                      <div className="relative">
                        <select
                          id="jenis_kelamin"
                          defaultValue=""
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl appearance-none">
                          <option value="" disabled>Pilih Jenis Kelamin</option>
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tempat Lahir */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="tempat_lahir">Tempat Lahir</label>
                      <input
                        type="text"
                        id="tempat_lahir"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: Jakarta" />
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                      <input
                        type="date"
                        id="tanggal_lahir"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Agama */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="agama">Agama</label>
                      <div className="relative">
                        <select
                          id="agama"
                          defaultValue=""
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl appearance-none">
                          <option value="" disabled>Pilih Agama</option>
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen Protestan</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>

                    {/* Tahun Ajaran */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="tahun_ajaran">Tahun Ajaran</label>
                      <input
                        type="text"
                        id="tahun_ajaran"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 2024/2025" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Anak Ke */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="anak_ke">Anak Ke</label>
                      <input
                        type="number"
                        id="anak_ke"
                        min="1"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 1" />
                    </div>

                    {/* Dari Jumlah Saudara */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="jumlah_saudara">Dari Jumlah Saudara</label>
                      <input
                        type="number"
                        id="jumlah_saudara"
                        min="1"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Berat Badan */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="berat_badan">Berat Badan (kg)</label>
                      <input
                        type="number"
                        id="berat_badan"
                        min="1"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 20" />
                    </div>

                    {/* Tinggi Badan */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="tinggi_badan">Tinggi Badan (cm)</label>
                      <input
                        type="number"
                        id="tinggi_badan"
                        min="1"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 110" />
                    </div>

                    {/* Jarak dari rumah ke sekolah */}
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="jarak_rumah">Jarak ke Sekolah (km)</label>
                      <input
                        type="number"
                        id="jarak_rumah"
                        min="0"
                        step="0.1"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: 2.5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-label-md text-label-md text-primary" htmlFor="asal_sekolah">Data Asal Sekolah <span className="font-normal text-on-surface-variant">(Wajib bagi murid pindahan)</span></label>
                    <input
                      type="text"
                      id="asal_sekolah"
                      className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                      placeholder="Contoh: TK Tunas Bangsa"
                    />
                  </div>

                  {/* Alergi Section */}
                  <div className="space-y-2 pt-2">
                    <label className="block font-label-md text-label-md text-primary font-bold border-b border-surface-container pb-2">Riwayat Alergi <span className="font-normal text-on-surface-variant">(Opsional)</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="alergi_makanan">Alergi Makanan</label>
                        <input
                          type="text"
                          id="alergi_makanan"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Seafood"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="alergi_obat">Alergi Obat</label>
                        <input
                          type="text"
                          id="alergi_obat"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Penisilin"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="alergi_lingkungan">Alergi Lingkungan</label>
                        <input
                          type="text"
                          id="alergi_lingkungan"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Debu"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block font-label-md text-label-md text-primary" htmlFor="imunisasi">Riwayat Imunisasi <span className="font-normal text-on-surface-variant">(Jika ada)</span></label>
                    <textarea
                      id="imunisasi"
                      className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                      placeholder="Contoh: Lengkap (BCG, Polio, DPT, dll)"
                      rows={2}></textarea>
                  </div>

                  {/* Alamat Lengkap */}
                  <div className="space-y-2">
                    <label className="block font-label-md text-label-md text-primary" htmlFor="alamat_anak">Alamat Lengkap</label>
                    <textarea
                      id="alamat_anak"
                      className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                      placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02"
                      rows={3}></textarea>
                  </div>

                  {/* Layanan Tambahan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container mt-4">
                    {/* Antar Jemput */}
                    <div className="space-y-3">
                      <label className="block font-label-md text-label-md text-primary">Ambil service antar jemput?</label>
                      <div className="flex flex-wrap gap-4 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="antar_jemput" value="Ya" className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Ya</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="antar_jemput" value="Tidak" className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Tidak</span>
                        </label>
                      </div>
                    </div>

                    {/* Program Catering */}
                    <div className="space-y-3">
                      <label className="block font-label-md text-label-md text-primary">Ambil program catering?</label>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="catering" value="Bulanan" className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Bulanan</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="catering" value="Mingguan" className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Mingguan</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="catering" value="Harian" className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Harian</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="catering" value="Tidak" className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Tidak</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Tinggal Bersama */}
                  <div className="space-y-2 pt-4 border-t border-surface-container">
                    <label className="block font-label-md text-label-md text-primary">Tinggal Bersama</label>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="tinggal_bersama" value="Orang Tua" className="w-5 h-5 text-secondary border-outline-variant rounded focus:ring-secondary bg-surface-container-lowest" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Orang Tua</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="tinggal_bersama" value="Kakek/Nenek" className="w-5 h-5 text-secondary border-outline-variant rounded focus:ring-secondary bg-surface-container-lowest" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Kakek/Nenek</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="tinggal_bersama" value="Saudara" className="w-5 h-5 text-secondary border-outline-variant rounded focus:ring-secondary bg-surface-container-lowest" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Saudara</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="tinggal_bersama" value="Paman" className="w-5 h-5 text-secondary border-outline-variant rounded focus:ring-secondary bg-surface-container-lowest" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Paman</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  {/* Bagian Ayah */}
                  <div className="space-y-6">
                    <div className="mb-2">
                      <h3 className="font-title-md text-title-md text-on-surface bg-surface-container-high px-4 py-1.5 rounded-full inline-block">Data Ayah / Wali</h3>
                    </div>
                    
                    {/* Nama & Status */}
                    <div className="space-y-3">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="nama_ayah">Nama Ayah / Wali</label>
                      <input
                        type="text"
                        id="nama_ayah"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: Agus Santoso" />
                      <div className="flex flex-wrap gap-4 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="status_ayah" value="Kandung" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Kandung</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="status_ayah" value="Tiri" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Tiri</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="status_ayah" value="Wali" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Wali</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tempat Lahir */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="tempat_lahir_ayah">Tempat Lahir</label>
                        <input
                          type="text"
                          id="tempat_lahir_ayah"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Jakarta" />
                      </div>
                      {/* Tanggal Lahir */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="tanggal_lahir_ayah">Tanggal Lahir</label>
                        <input
                          type="date"
                          id="tanggal_lahir_ayah"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Agama */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="agama_ayah">Agama</label>
                        <div className="relative">
                          <select
                            id="agama_ayah"
                            defaultValue=""
                            className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl appearance-none">
                            <option value="" disabled>Pilih Agama</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen Protestan</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                            <span className="material-symbols-outlined">expand_more</span>
                          </div>
                        </div>
                      </div>
                      {/* Pendidikan Terakhir */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="pendidikan_ayah">Pendidikan Terakhir</label>
                        <div className="relative">
                          <select
                            id="pendidikan_ayah"
                            defaultValue=""
                            className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl appearance-none">
                            <option value="" disabled>Pilih Pendidikan</option>
                            <option value="SD">SD/Sederajat</option>
                            <option value="SMP">SMP/Sederajat</option>
                            <option value="SMA">SMA/Sederajat</option>
                            <option value="D1-D3">Diploma (D1-D3)</option>
                            <option value="S1">Sarjana (S1)</option>
                            <option value="S2">Magister (S2)</option>
                            <option value="S3">Doktor (S3)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                            <span className="material-symbols-outlined">expand_more</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pekerjaan */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="pekerjaan_ayah">Pekerjaan</label>
                        <input
                          type="text"
                          id="pekerjaan_ayah"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Wiraswasta" />
                      </div>
                      {/* No HP */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="nohp_ayah">No. HP / WhatsApp</label>
                        <input
                          type="tel"
                          id="nohp_ayah"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: 081234567890" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="email_ayah">Email</label>
                        <input
                          type="email"
                          id="email_ayah"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: agus.santoso@gmail.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian Ibu */}
                  <div className="space-y-6 pt-6 border-t border-surface-container mt-6">
                    <div className="mb-2">
                      <h3 className="font-title-md text-title-md text-on-surface bg-surface-container-high px-4 py-1.5 rounded-full inline-block">Data Ibu / Wali</h3>
                    </div>
                    
                    {/* Nama & Status */}
                    <div className="space-y-3">
                      <label className="block font-label-md text-label-md text-primary" htmlFor="nama_ibu">Nama Ibu / Wali</label>
                      <input
                        type="text"
                        id="nama_ibu"
                        className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: Siti Aminah" />
                      <div className="flex flex-wrap gap-4 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="status_ibu" value="Kandung" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Kandung</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="status_ibu" value="Tiri" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Tiri</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="status_ibu" value="Wali" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary bg-surface-container-lowest" />
                          <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Wali</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tempat Lahir */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="tempat_lahir_ibu">Tempat Lahir</label>
                        <input
                          type="text"
                          id="tempat_lahir_ibu"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Jakarta" />
                      </div>
                      {/* Tanggal Lahir */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="tanggal_lahir_ibu">Tanggal Lahir</label>
                        <input
                          type="date"
                          id="tanggal_lahir_ibu"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Agama */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="agama_ibu">Agama</label>
                        <div className="relative">
                          <select
                            id="agama_ibu"
                            defaultValue=""
                            className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl appearance-none">
                            <option value="" disabled>Pilih Agama</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen Protestan</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                            <span className="material-symbols-outlined">expand_more</span>
                          </div>
                        </div>
                      </div>
                      {/* Pendidikan Terakhir */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="pendidikan_ibu">Pendidikan Terakhir</label>
                        <div className="relative">
                          <select
                            id="pendidikan_ibu"
                            defaultValue=""
                            className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl appearance-none">
                            <option value="" disabled>Pilih Pendidikan</option>
                            <option value="SD">SD/Sederajat</option>
                            <option value="SMP">SMP/Sederajat</option>
                            <option value="SMA">SMA/Sederajat</option>
                            <option value="D1-D3">Diploma (D1-D3)</option>
                            <option value="S1">Sarjana (S1)</option>
                            <option value="S2">Magister (S2)</option>
                            <option value="S3">Doktor (S3)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                            <span className="material-symbols-outlined">expand_more</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pekerjaan */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="pekerjaan_ibu">Pekerjaan</label>
                        <input
                          type="text"
                          id="pekerjaan_ibu"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: Ibu Rumah Tangga" />
                      </div>
                      {/* No HP */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="nohp_ibu">No. HP / WhatsApp</label>
                        <input
                          type="tel"
                          id="nohp_ibu"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: 081234567890" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-primary" htmlFor="email_ibu">Email</label>
                        <input
                          type="email"
                          id="email_ibu"
                          className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                          placeholder="Contoh: siti.aminah@gmail.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pendapatan Orang Tua */}
                  <div className="space-y-3 pt-6 border-t border-surface-container">
                    <label className="block font-label-md text-label-md text-primary">Pendapatan Orang Tua per Bulan</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <label className="flex items-center gap-3 cursor-pointer group p-3 border border-outline-variant rounded-xl hover:border-secondary transition-colors bg-surface-container-lowest">
                        <input type="radio" name="pendapatan" value="0-5jt" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">0 - 5 Juta</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group p-3 border border-outline-variant rounded-xl hover:border-secondary transition-colors bg-surface-container-lowest">
                        <input type="radio" name="pendapatan" value="5-10jt" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">5 - 10 Juta</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group p-3 border border-outline-variant rounded-xl hover:border-secondary transition-colors bg-surface-container-lowest">
                        <input type="radio" name="pendapatan" value="10-15jt" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">10 - 15 Juta</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group p-3 border border-outline-variant rounded-xl hover:border-secondary transition-colors bg-surface-container-lowest">
                        <input type="radio" name="pendapatan" value="15-20jt" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">15 - 20 Juta</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group p-3 border border-outline-variant rounded-xl hover:border-secondary transition-colors bg-surface-container-lowest">
                        <input type="radio" name="pendapatan" value=">20jt" className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">&gt; 20 Juta</span>
                      </label>
                    </div>
                  </div>

                  {/* Alamat Tinggal */}
                  <div className="space-y-2 pt-6 border-t border-surface-container">
                    <label className="block font-label-md text-label-md text-primary" htmlFor="alamat">Alamat Tinggal Orang Tua/Wali</label>
                    <textarea
                      id="alamat"
                      className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                      placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02"
                      rows={3}></textarea>
                  </div>

                  {/* Titik Lokasi Peta (Google Maps Link) */}
                  <div className="space-y-3 pt-2">
                    <label className="block font-label-md text-label-md text-primary" htmlFor="link_maps">Titik Lokasi (Pin) Google Maps <span className="font-normal text-on-surface-variant">(Disarankan)</span></label>
                    <p className="font-caption text-caption text-on-surface-variant">Buka Google Maps, cari alamat rumah Anda, klik "Bagikan" (Share) lalu "Salin Link" (Copy Link) dan tempel di bawah ini.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="url"
                        id="link_maps"
                        className="flex-1 border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow rounded-xl"
                        placeholder="Contoh: https://maps.app.goo.gl/..."
                      />
                      <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="px-6 py-3 font-label-md text-label-md text-white bg-primary hover:bg-[#122432] transition-colors flex items-center justify-center gap-2 rounded-xl whitespace-nowrap shadow-sm hover:shadow-md">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        Buka Peta
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <>
                  {/* Akte Kelahiran Upload */}
                  <div className="space-y-3">
                    <label className="block font-label-md text-label-md text-primary">Akte Kelahiran Anak <span className="font-normal text-on-surface-variant">(Wajib Upload Scan Asli)</span></label>
                    <label className="border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center bg-surface hover:border-secondary hover:bg-surface-container-low transition-colors cursor-pointer group rounded-3xl w-full">
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                      <span className="material-symbols-outlined text-[48px] text-outline mb-4 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                      <p className="font-body-md text-body-md text-primary text-center mb-1"><span className="font-semibold text-secondary">Klik untuk unggah</span> atau seret dan lepas file ke sini</p>
                      <p className="font-caption text-caption text-on-surface-variant text-center">PDF, JPG, PNG up to 5MB</p>
                    </label>
                  </div>

                  {/* KTP Orang Tua Upload */}
                  <div className="space-y-3">
                    <label className="block font-label-md text-label-md text-primary">KTP Orang Tua <span className="font-normal text-on-surface-variant">(Ayah/Ibu Perwakilan saja - Wajib Upload Scan Asli)</span></label>
                    <label className="border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center bg-surface hover:border-secondary hover:bg-surface-container-low transition-colors cursor-pointer group rounded-3xl w-full">
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                      <span className="material-symbols-outlined text-[48px] text-outline mb-4 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                      <p className="font-body-md text-body-md text-primary text-center mb-1"><span className="font-semibold text-secondary">Klik untuk unggah</span> atau seret dan lepas file ke sini</p>
                      <p className="font-caption text-caption text-on-surface-variant text-center">PDF, JPG, PNG up to 5MB</p>
                    </label>
                  </div>

                  {/* KK Upload */}
                  <div className="space-y-3">
                    <label className="block font-label-md text-label-md text-primary">Kartu Keluarga (KK) <span className="font-normal text-on-surface-variant">(Wajib Upload Scan Asli)</span></label>
                    <label className="border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center bg-surface hover:border-secondary hover:bg-surface-container-low transition-colors cursor-pointer group rounded-3xl w-full">
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                      <span className="material-symbols-outlined text-[48px] text-outline mb-4 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                      <p className="font-body-md text-body-md text-primary text-center mb-1"><span className="font-semibold text-secondary">Klik untuk unggah</span> atau seret dan lepas file ke sini</p>
                      <p className="font-caption text-caption text-on-surface-variant text-center">PDF, JPG, PNG up to 5MB</p>
                    </label>
                  </div>

                  {/* Pas Foto Upload */}
                  <div className="space-y-3">
                    <label className="block font-label-md text-label-md text-primary">Pas Foto Anak <span className="font-normal text-on-surface-variant">(Latar Merah, Ukuran 3x4)</span></label>
                    <label className="border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center bg-surface hover:border-secondary hover:bg-surface-container-low transition-colors cursor-pointer group rounded-3xl w-full">
                      <input type="file" accept=".jpg,.jpeg,.png" className="hidden" />
                      <span className="material-symbols-outlined text-[48px] text-outline mb-4 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                      <p className="font-body-md text-body-md text-primary text-center mb-1"><span className="font-semibold text-secondary">Klik untuk unggah</span> atau seret dan lepas file ke sini</p>
                      <p className="font-caption text-caption text-on-surface-variant text-center">JPG, PNG up to 5MB</p>
                    </label>
                  </div>
                </>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 space-y-6">
                    <div>
                      <h3 className="font-title-md text-title-md text-primary border-b border-surface-container pb-2 mb-4">Ringkasan Biodata Anak</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Nama Lengkap</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">Budi Santoso (Contoh)</p>
                        </div>
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Tempat, Tanggal Lahir</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">Jakarta, 12 Agustus 2018</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Alamat Lengkap</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">Jl. Merdeka No. 123, Jakarta Selatan</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-title-md text-title-md text-primary border-b border-surface-container pb-2 mb-4">Ringkasan Data Orang Tua</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Nama Ayah / Wali</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">Agus Santoso</p>
                        </div>
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">No. HP / WhatsApp (Ayah)</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">081234567890</p>
                        </div>
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Nama Ibu / Wali</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">Siti Aminah</p>
                        </div>
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">No. HP / WhatsApp (Ibu)</p>
                          <p className="font-body-md text-body-md text-on-surface font-medium">089876543210</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-title-md text-title-md text-primary border-b border-surface-container pb-2 mb-4">Dokumen Pendukung</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-primary font-body-md text-body-md">
                          <span className="material-symbols-outlined text-secondary">check_circle</span>
                          Akte Kelahiran Anak (Terunggah)
                        </li>
                        <li className="flex items-center gap-2 text-primary font-body-md text-body-md">
                          <span className="material-symbols-outlined text-secondary">check_circle</span>
                          KTP Orang Tua (Terunggah)
                        </li>
                        <li className="flex items-center gap-2 text-primary font-body-md text-body-md">
                          <span className="material-symbols-outlined text-secondary">check_circle</span>
                          Kartu Keluarga (Terunggah)
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-tertiary-container text-on-tertiary-container p-4 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined mt-0.5">info</span>
                    <p className="font-body-sm text-body-sm">
                      Pastikan semua data yang Anda masukkan sudah benar. Anda tidak dapat mengubah data setelah menekan tombol "Kirim Pendaftaran".
                    </p>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="pt-8 border-t border-surface-container flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                {step === 1 ? (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 font-label-md text-label-md text-primary bg-transparent border-[1.5px] border-primary hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 rounded-full" type="button">
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      Kembali ke Dashboard
                    </button>
                  </Link>
                ) : (
                  <button onClick={handleBack} className="w-full sm:w-auto px-6 py-3 font-label-md text-label-md text-primary bg-transparent border-[1.5px] border-primary hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 rounded-full" type="button">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Kembali
                  </button>
                )}
                <button disabled={isSubmitting} className="w-full sm:w-auto px-8 py-3 font-label-md text-label-md text-white bg-[#C89B53] hover:bg-[#b08544] hover:shadow-[0_4px_15px_rgba(200,155,83,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                  {isSubmitting ? "Mengirim..." : step === 4 ? "Kirim Pendaftaran" : "Lanjutkan"}
                  {!isSubmitting && (step === 4 ? <span className="material-symbols-outlined text-[18px]">send</span> : <span className="material-symbols-outlined text-[18px]">arrow_forward</span>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
