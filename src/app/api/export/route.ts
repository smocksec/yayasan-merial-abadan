import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const registrationId = searchParams.get("id");

  if (!registrationId) {
    return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
  }

  // Verify admin access
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== "aufarifqi119@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Use service role to bypass RLS
  let clientToUse = supabase;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    clientToUse = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    ) as any;
  }

  const { data: registration, error } = await clientToUse
    .from("registrations")
    .select("*")
    .eq("id", registrationId)
    .single();

  if (error || !registration) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  const d = registration.data_lengkap || {};
  const createdAt = new Date(registration.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Generate PDF-ready HTML
  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Formulir Pendaftaran - ${registration.nama_anak || "Siswa"}</title>
  <style>
    @page { size: A4; margin: 20mm 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #172E40; font-size: 11px; line-height: 1.6; background: #fff; }
    
    .header { text-align: center; border-bottom: 3px double #172E40; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { font-size: 20px; font-weight: 700; color: #172E40; margin-bottom: 2px; }
    .header h2 { font-size: 14px; font-weight: 600; color: #346665; margin-bottom: 4px; }
    .header p { font-size: 10px; color: #666; }
    
    .logo-row { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px; }
    .logo-placeholder { width: 60px; height: 60px; border: 2px solid #172E40; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: #172E40; }
    
    .section { margin-bottom: 20px; }
    .section-title { font-size: 13px; font-weight: 700; color: #fff; background: #172E40; padding: 6px 14px; margin-bottom: 1px; text-transform: uppercase; letter-spacing: 0.5px; }
    
    table { width: 100%; border-collapse: collapse; }
    table td { padding: 6px 12px; border: 1px solid #d0d5dd; vertical-align: top; }
    table td:first-child { background: #f8f9fa; font-weight: 600; width: 35%; color: #344054; font-size: 10.5px; }
    table td:last-child { font-size: 11px; }
    
    .two-col { display: flex; gap: 16px; }
    .two-col > div { flex: 1; }
    
    .footer { margin-top: 32px; border-top: 1px solid #d0d5dd; padding-top: 16px; display: flex; justify-content: space-between; font-size: 10px; color: #666; }
    .signature-box { text-align: center; margin-top: 40px; }
    .signature-line { border-bottom: 1px solid #172E40; width: 200px; margin: 60px auto 8px; }
    .signature-name { font-size: 11px; font-weight: 600; }
    
    .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 10px; font-weight: 600; }
    .badge-waiting { background: #FEF7E0; color: #B06000; border: 1px solid #FAD28C; }
    .badge-accepted { background: #E6F4EA; color: #137333; border: 1px solid #CEEAD6; }
    .badge-rejected { background: #FCE8E6; color: #C5221F; border: 1px solid #FAD2CF; }
    
    .id-box { text-align: right; margin-bottom: 16px; }
    .id-box span { font-size: 10px; background: #f0f6f5; padding: 4px 12px; border-radius: 8px; border: 1px solid #d0d5dd; }

    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-row">
      <div class="logo-placeholder">M</div>
      <div>
        <h1>Yayasan Merial Abadan Madani</h1>
        <h2>Formulir Pendaftaran Siswa Baru</h2>
      </div>
    </div>
    <p>Jl. Contoh Alamat Yayasan No. 123 | Telp: (021) 1234567</p>
  </div>

  <div class="id-box">
    <span>ID Pendaftaran: <strong>${registration.id.substring(0, 8).toUpperCase()}</strong></span>
    &nbsp;
    <span>Tanggal: <strong>${createdAt}</strong></span>
    &nbsp;
    <span class="badge ${registration.status === 'Diterima' ? 'badge-accepted' : registration.status === 'Ditolak' ? 'badge-rejected' : 'badge-waiting'}">
      Status: ${registration.status || 'Menunggu'}
    </span>
  </div>

  <div class="section">
    <div class="section-title">A. Biodata Calon Siswa</div>
    <table>
      <tr><td>Nama Lengkap</td><td>${d.nama_anak || '-'}</td></tr>
      <tr><td>Program / Tingkat Pendidikan</td><td>${d.program || registration.program || '-'}</td></tr>
      <tr><td>Waktu Belajar</td><td>${d.waktu_belajar || '-'}</td></tr>
      <tr><td>Jenis Kelamin</td><td>${d.jenis_kelamin === 'L' ? 'Laki-laki' : d.jenis_kelamin === 'P' ? 'Perempuan' : '-'}</td></tr>
      <tr><td>Tempat, Tanggal Lahir</td><td>${d.tempat_lahir || '-'}, ${d.tanggal_lahir || '-'}</td></tr>
      <tr><td>Umur</td><td>${d.umur ? d.umur + ' Tahun' : '-'}</td></tr>
      <tr><td>Agama</td><td>${d.agama || '-'}</td></tr>
      <tr><td>Tahun Ajaran</td><td>${d.tahun_ajaran || '-'}</td></tr>
      <tr><td>Anak Ke</td><td>${d.anak_ke || '-'} dari ${d.jumlah_saudara || '-'} bersaudara</td></tr>
      <tr><td>Berat / Tinggi Badan</td><td>${d.berat_badan ? d.berat_badan + ' kg' : '-'} / ${d.tinggi_badan ? d.tinggi_badan + ' cm' : '-'}</td></tr>
      <tr><td>Jarak ke Sekolah</td><td>${d.jarak_rumah ? d.jarak_rumah + ' km' : '-'}</td></tr>
      <tr><td>Asal Sekolah</td><td>${d.asal_sekolah || '-'}</td></tr>
      <tr><td>Alamat Lengkap Anak</td><td>${d.alamat_anak || '-'}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">B. Riwayat Kesehatan</div>
    <table>
      <tr><td>Alergi Makanan</td><td>${d.alergi_makanan || 'Tidak ada'}</td></tr>
      <tr><td>Alergi Obat</td><td>${d.alergi_obat || 'Tidak ada'}</td></tr>
      <tr><td>Alergi Lingkungan</td><td>${d.alergi_lingkungan || 'Tidak ada'}</td></tr>
      <tr><td>Riwayat Imunisasi</td><td>${d.imunisasi || '-'}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">C. Layanan Tambahan</div>
    <table>
      <tr><td>Antar Jemput</td><td>${d.antar_jemput || '-'}</td></tr>
      <tr><td>Program Catering</td><td>${d.catering || '-'}</td></tr>
      <tr><td>Tinggal Bersama</td><td>${Array.isArray(d.tinggal_bersama) ? d.tinggal_bersama.join(', ') : d.tinggal_bersama || '-'}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">D. Data Ayah / Wali</div>
    <table>
      <tr><td>Nama Lengkap</td><td>${d.nama_ayah || '-'}</td></tr>
      <tr><td>Status</td><td>${d.status_ayah || '-'}</td></tr>
      <tr><td>Tempat, Tanggal Lahir</td><td>${d.tempat_lahir_ayah || '-'}, ${d.tanggal_lahir_ayah || '-'}</td></tr>
      <tr><td>Agama</td><td>${d.agama_ayah || '-'}</td></tr>
      <tr><td>Pendidikan Terakhir</td><td>${d.pendidikan_ayah || '-'}</td></tr>
      <tr><td>Pekerjaan</td><td>${d.pekerjaan_ayah || '-'}</td></tr>
      <tr><td>No HP</td><td>${d.nohp_ayah || '-'}</td></tr>
      <tr><td>Email</td><td>${d.email_ayah || '-'}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">E. Data Ibu / Wali</div>
    <table>
      <tr><td>Nama Lengkap</td><td>${d.nama_ibu || '-'}</td></tr>
      <tr><td>Status</td><td>${d.status_ibu || '-'}</td></tr>
      <tr><td>Tempat, Tanggal Lahir</td><td>${d.tempat_lahir_ibu || '-'}, ${d.tanggal_lahir_ibu || '-'}</td></tr>
      <tr><td>Agama</td><td>${d.agama_ibu || '-'}</td></tr>
      <tr><td>Pendidikan Terakhir</td><td>${d.pendidikan_ibu || '-'}</td></tr>
      <tr><td>Pekerjaan</td><td>${d.pekerjaan_ibu || '-'}</td></tr>
      <tr><td>No HP</td><td>${d.nohp_ibu || '-'}</td></tr>
      <tr><td>Email</td><td>${d.email_ibu || '-'}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">F. Informasi Tambahan</div>
    <table>
      <tr><td>Pendapatan Orang Tua</td><td>${d.pendapatan || '-'}</td></tr>
      <tr><td>Alamat Tinggal</td><td>${d.alamat || '-'}</td></tr>
      <tr><td>Link Google Maps</td><td>${d.link_maps || '-'}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">G. Dokumen Pendukung</div>
    <table>
      <tr><td>Akte Kelahiran</td><td>${d.file_upload?.name ? '✅ ' + d.file_upload.name : '❌ Belum diunggah'}</td></tr>
      <tr><td>KTP Orang Tua</td><td>${d.ktp_ortu?.name ? '✅ ' + d.ktp_ortu.name : '❌ Belum diunggah'}</td></tr>
      <tr><td>Kartu Keluarga</td><td>${d.kk?.name ? '✅ ' + d.kk.name : '❌ Belum diunggah'}</td></tr>
      <tr><td>Pas Foto</td><td>${d.pas_foto?.name ? '✅ ' + d.pas_foto.name : '❌ Belum diunggah'}</td></tr>
    </table>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top: 40px;">
    <div class="signature-box">
      <p style="font-size: 10px; color: #666;">Orang Tua / Wali,</p>
      <div class="signature-line"></div>
      <p class="signature-name">${d.nama_ayah || d.nama_ibu || '_______________'}</p>
    </div>
    <div class="signature-box">
      <p style="font-size: 10px; color: #666;">Mengetahui,<br/>Kepala Sekolah</p>
      <div class="signature-line"></div>
      <p class="signature-name">_______________</p>
    </div>
  </div>

  <div class="footer">
    <p>Dicetak pada: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
    <p>Yayasan Merial Abadan Madani © ${new Date().getFullYear()}</p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="Formulir_Pendaftaran_${(registration.nama_anak || 'Siswa').replace(/\s+/g, '_')}.html"`,
    },
  });
}
