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

  if (!user || user.email?.toLowerCase() !== "aufarifqi119@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let registration: any = null;

  if (registrationId === "blank") {
    registration = {
      id: "_________ (Diisi Admin)",
      created_at: new Date().toISOString(),
      status: "Form Fisik",
      nama_anak: "",
      data_lengkap: {}
    };
  } else {
    // Use service role to bypass RLS
    let clientToUse: any = supabase;
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      clientToUse = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } }
      );
    }

    const { data, error } = await clientToUse
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
    registration = data;
  }

  const d = registration.data_lengkap || {};
  const createdAt = new Date(registration.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Helper function
  const val = (v: any, fallback = '-') => v || fallback;
  const arrVal = (v: any) => Array.isArray(v) ? v.join(', ') : val(v);

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulir Pendaftaran - ${val(registration.nama_anak, 'Siswa')}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <style>
    @page { size: A4; margin: 12mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #171D1C;
      font-size: 13px;
      line-height: 1.5;
      background: #f0f6f5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    /* ===== HEADER ===== */
    .header {
      background: #172E40;
      color: white;
      padding: 28px 32px;
      border-radius: 24px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      right: -60px;
      top: -60px;
      width: 200px;
      height: 200px;
      background: rgba(200,155,83,0.15);
      border-radius: 50%;
    }
    .header::after {
      content: '';
      position: absolute;
      right: 40px;
      bottom: -40px;
      width: 120px;
      height: 120px;
      background: rgba(200,155,83,0.08);
      border-radius: 50%;
    }
    .header-left { position: relative; z-index: 1; }
    .header h1 {
      font-family: 'Source Serif 4', serif;
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .header h2 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(255,255,255,0.8);
      margin-bottom: 8px;
    }
    .header-meta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
    }
    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-id { background: rgba(255,255,255,0.15); color: white; }
    .badge-date { background: rgba(255,255,255,0.15); color: white; }
    .badge-waiting { background: #FEF7E0; color: #B06000; }
    .badge-accepted { background: #E6F4EA; color: #137333; }
    .badge-rejected { background: #FCE8E6; color: #C5221F; }

    /* ===== STEPPER ===== */
    .stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 16px 24px;
      background: white;
      border-radius: 20px;
      border: 1px solid #e3e9e8;
      box-shadow: 0 4px 20px rgba(23,46,64,0.05);
    }
    .step-item {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    .step-circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #C89B53;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-label {
      font-size: 12px;
      font-weight: 600;
      color: #172E40;
    }
    .step-connector {
      flex: 0.5;
      height: 2px;
      background: #C89B53;
      margin: 0 4px;
    }

    /* ===== FORM CARD ===== */
    .form-card {
      background: white;
      border-radius: 24px;
      border: 1px solid #e3e9e8;
      box-shadow: 0 4px 20px rgba(23,46,64,0.05);
      padding: 28px 32px;
      margin-bottom: 20px;
    }
    .form-card-title {
      font-family: 'Source Serif 4', serif;
      font-size: 20px;
      font-weight: 600;
      color: #172E40;
      border-bottom: 1px solid #e3e9e8;
      padding-bottom: 12px;
      margin-bottom: 6px;
    }
    .form-card-subtitle {
      font-size: 13px;
      color: #43474C;
      margin-bottom: 20px;
    }

    /* ===== SECTION INSIDE CARD ===== */
    .section-pill {
      display: inline-block;
      background: #e3e9e8;
      color: #171D1C;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 16px;
      margin-top: 8px;
    }

    /* ===== FIELD GRID ===== */
    .field-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px 24px;
      margin-bottom: 16px;
    }
    .field-grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 14px 24px;
      margin-bottom: 16px;
    }
    .field-full {
      grid-column: 1 / -1;
    }
    .field {
      margin-bottom: 2px;
    }
    .field-label {
      font-size: 11px;
      font-weight: 600;
      color: #172E40;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .field-value {
      font-size: 13px;
      color: #171D1C;
      padding: 8px 14px;
      background: #f0f6f5;
      border: 1px solid #dee4e3;
      border-radius: 12px;
      min-height: 36px;
      display: flex;
      align-items: center;
      word-break: break-word;
    }
    .field-value.empty {
      color: #73777d;
      font-style: italic;
    }

    /* ===== RADIO/CHECKBOX DISPLAY ===== */
    .option-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 6px;
    }
    .option-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 12px;
      font-size: 12px;
      border: 1px solid #dee4e3;
      background: #f0f6f5;
      color: #43474C;
    }
    .option-pill.selected {
      background: #172E40;
      color: white;
      border-color: #172E40;
      font-weight: 600;
    }
    .option-pill .material-symbols-outlined {
      font-size: 16px;
    }

    /* ===== DOCUMENTS ===== */
    .doc-list { list-style: none; }
    .doc-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border: 2px dashed #dee4e3;
      border-radius: 16px;
      margin-bottom: 10px;
      background: #f5fbfa;
    }
    .doc-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .doc-icon.uploaded { background: #346665; color: white; }
    .doc-icon.missing { background: #dee4e3; color: #73777d; }
    .doc-info { flex: 1; }
    .doc-title { font-size: 12px; font-weight: 600; color: #172E40; }
    .doc-status { font-size: 11px; color: #346665; }
    .doc-status.missing { color: #ba1a1a; }

    /* ===== DIVIDER ===== */
    .divider {
      border: none;
      border-top: 1px solid #e3e9e8;
      margin: 16px 0;
    }

    /* ===== SIGNATURE ===== */
    .signature-area {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 20px;
    }
    .signature-box {
      text-align: center;
      width: 220px;
    }
    .signature-label {
      font-size: 11px;
      color: #43474C;
      margin-bottom: 60px;
    }
    .signature-line {
      border-bottom: 1px solid #172E40;
      margin-bottom: 6px;
    }
    .signature-name {
      font-size: 12px;
      font-weight: 600;
      color: #172E40;
    }

    /* ===== FOOTER ===== */
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: white;
      border-radius: 16px;
      border: 1px solid #e3e9e8;
      font-size: 10px;
      color: #73777d;
      margin-top: 12px;
    }

    /* ===== PRINT ===== */
    .print-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #172E40;
      color: white;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    .print-bar button {
      background: #C89B53;
      color: white;
      border: none;
      padding: 8px 24px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Work Sans', sans-serif;
    }
    .print-bar button:hover { background: #b08544; }
    .print-bar-text { font-size: 13px; }
    
    @media print {
      .print-bar { display: none !important; }
      body { background: white; }
      .page-container { padding: 0; max-width: 100%; }
      .form-card, .stepper, .footer { box-shadow: none; }
    }
  </style>
</head>
<body>
  <!-- Print Action Bar -->
  <div class="print-bar">
    <span class="print-bar-text">📄 Formulir Pendaftaran — <strong>${val(registration.nama_anak, 'Siswa')}</strong></span>
    <button onclick="window.print()">
      <span class="material-symbols-outlined" style="font-size:18px">print</span>
      Cetak / Simpan PDF
    </button>
  </div>
  <div style="height: 56px;"></div>

  <div class="page-container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <h1>Yayasan Merial Abadan Madani</h1>
        <h2>Formulir Pendaftaran Siswa Baru</h2>
        <div class="header-meta">
          <span class="header-badge badge-id">ID: ${registration.id.substring(0, 8).toUpperCase()}</span>
          <span class="header-badge badge-date">📅 ${createdAt}</span>
          <span class="header-badge ${registration.status === 'Diterima' ? 'badge-accepted' : registration.status === 'Ditolak' ? 'badge-rejected' : 'badge-waiting'}">
            ${registration.status === 'Diterima' ? '✅' : registration.status === 'Ditolak' ? '❌' : '⏳'} ${val(registration.status, 'Menunggu Verifikasi')}
          </span>
        </div>
      </div>
    </div>

    <!-- Stepper -->
    <div class="stepper">
      <div class="step-item">
        <div class="step-circle">✓</div>
        <span class="step-label">Biodata Anak</span>
      </div>
      <div class="step-connector"></div>
      <div class="step-item">
        <div class="step-circle">✓</div>
        <span class="step-label">Data Orang Tua</span>
      </div>
      <div class="step-connector"></div>
      <div class="step-item">
        <div class="step-circle">✓</div>
        <span class="step-label">Unggah Dokumen</span>
      </div>
      <div class="step-connector"></div>
      <div class="step-item">
        <div class="step-circle">✓</div>
        <span class="step-label">Review</span>
      </div>
    </div>

    <!-- ============ STEP 1: BIODATA ANAK ============ -->
    <div class="form-card">
      <h2 class="form-card-title">Biodata Anak</h2>
      <p class="form-card-subtitle">Informasi biodata calon siswa yang telah dilengkapi.</p>

      <!-- Program & Waktu Belajar -->
      <div class="field-grid" style="margin-bottom:20px; padding-bottom:16px; border-bottom: 1px solid #e3e9e8;">
        <div class="field">
          <div class="field-label">Tingkat Pendidikan</div>
          <div class="option-group">
            ${['TPA', 'KB', 'TK A', 'TK B', 'Bimbel'].map(p => `<span class="option-pill ${val(d.program) === p ? 'selected' : ''}">${val(d.program) === p ? '●' : '○'} ${p}</span>`).join('')}
          </div>
        </div>
        <div class="field">
          <div class="field-label">Waktu Belajar</div>
          <div class="option-group">
            ${['Half Day', 'Full Day'].map(w => `<span class="option-pill ${val(d.waktu_belajar) === w ? 'selected' : ''}">${val(d.waktu_belajar) === w ? '●' : '○'} ${w}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Nama & Data Diri -->
      <div class="field" style="margin-bottom:14px;">
        <div class="field-label">Nama Lengkap Anak</div>
        <div class="field-value" style="font-weight:600; font-size:15px;">${val(d.nama_anak)}</div>
      </div>

      <div class="field-grid">
        <div class="field">
          <div class="field-label">Umur</div>
          <div class="field-value">${d.umur ? d.umur + ' Tahun' : '-'}</div>
        </div>
        <div class="field">
          <div class="field-label">Jenis Kelamin</div>
          <div class="field-value">${d.jenis_kelamin === 'L' ? 'Laki-laki' : d.jenis_kelamin === 'P' ? 'Perempuan' : '-'}</div>
        </div>
        <div class="field">
          <div class="field-label">Tempat Lahir</div>
          <div class="field-value">${val(d.tempat_lahir)}</div>
        </div>
        <div class="field">
          <div class="field-label">Tanggal Lahir</div>
          <div class="field-value">${val(d.tanggal_lahir)}</div>
        </div>
        <div class="field">
          <div class="field-label">Agama</div>
          <div class="field-value">${val(d.agama)}</div>
        </div>
        <div class="field">
          <div class="field-label">Tahun Ajaran</div>
          <div class="field-value">${val(d.tahun_ajaran)}</div>
        </div>
        <div class="field">
          <div class="field-label">Anak Ke</div>
          <div class="field-value">${val(d.anak_ke)} dari ${val(d.jumlah_saudara)} bersaudara</div>
        </div>
        <div class="field">
          <div class="field-label">Asal Sekolah</div>
          <div class="field-value ${!d.asal_sekolah ? 'empty' : ''}">${val(d.asal_sekolah, 'Tidak ada (siswa baru)')}</div>
        </div>
      </div>

      <div class="field-grid-3">
        <div class="field">
          <div class="field-label">Berat Badan</div>
          <div class="field-value">${d.berat_badan ? d.berat_badan + ' kg' : '-'}</div>
        </div>
        <div class="field">
          <div class="field-label">Tinggi Badan</div>
          <div class="field-value">${d.tinggi_badan ? d.tinggi_badan + ' cm' : '-'}</div>
        </div>
        <div class="field">
          <div class="field-label">Jarak ke Sekolah</div>
          <div class="field-value">${d.jarak_rumah ? d.jarak_rumah + ' km' : '-'}</div>
        </div>
      </div>

      <!-- Riwayat Alergi -->
      <span class="section-pill">Riwayat Alergi</span>
      <div class="field-grid-3">
        <div class="field">
          <div class="field-label">Alergi Makanan</div>
          <div class="field-value ${!d.alergi_makanan ? 'empty' : ''}">${val(d.alergi_makanan, 'Tidak ada')}</div>
        </div>
        <div class="field">
          <div class="field-label">Alergi Obat</div>
          <div class="field-value ${!d.alergi_obat ? 'empty' : ''}">${val(d.alergi_obat, 'Tidak ada')}</div>
        </div>
        <div class="field">
          <div class="field-label">Alergi Lingkungan</div>
          <div class="field-value ${!d.alergi_lingkungan ? 'empty' : ''}">${val(d.alergi_lingkungan, 'Tidak ada')}</div>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Riwayat Imunisasi</div>
        <div class="field-value ${!d.imunisasi ? 'empty' : ''}">${val(d.imunisasi, 'Tidak diisi')}</div>
      </div>

      <!-- Alamat -->
      <div class="field" style="margin-top:14px;">
        <div class="field-label">Alamat Lengkap Anak</div>
        <div class="field-value">${val(d.alamat_anak)}</div>
      </div>

      <!-- Layanan Tambahan -->
      <hr class="divider">
      <div class="field-grid" style="margin-bottom:8px;">
        <div class="field">
          <div class="field-label">Service Antar Jemput</div>
          <div class="option-group">
            ${['Ya', 'Tidak'].map(o => `<span class="option-pill ${val(d.antar_jemput) === o ? 'selected' : ''}">${val(d.antar_jemput) === o ? '●' : '○'} ${o}</span>`).join('')}
          </div>
        </div>
        <div class="field">
          <div class="field-label">Program Catering</div>
          <div class="option-group">
            ${['Bulanan', 'Mingguan', 'Harian', 'Tidak'].map(o => `<span class="option-pill ${val(d.catering) === o ? 'selected' : ''}">${val(d.catering) === o ? '●' : '○'} ${o}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Tinggal Bersama</div>
        <div class="option-group">
          ${['Orang Tua', 'Kakek/Nenek', 'Saudara', 'Paman'].map(o => {
            const selected = Array.isArray(d.tinggal_bersama) ? d.tinggal_bersama.includes(o) : val(d.tinggal_bersama) === o;
            return `<span class="option-pill ${selected ? 'selected' : ''}">${selected ? '☑' : '☐'} ${o}</span>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- ============ STEP 2: DATA ORANG TUA ============ -->
    <div class="form-card">
      <h2 class="form-card-title">Data Orang Tua</h2>
      <p class="form-card-subtitle">Informasi data orang tua / wali yang telah dilengkapi.</p>

      <!-- Data Ayah -->
      <span class="section-pill">Data Ayah / Wali</span>
      <div class="field" style="margin-bottom:8px;">
        <div class="field-label">Nama Ayah</div>
        <div class="field-value" style="font-weight:600;">${val(d.nama_ayah)}</div>
      </div>
      <div class="option-group" style="margin-bottom:14px;">
        ${['Kandung', 'Tiri', 'Wali'].map(o => `<span class="option-pill ${val(d.status_ayah) === o ? 'selected' : ''}">${val(d.status_ayah) === o ? '●' : '○'} ${o}</span>`).join('')}
      </div>
      <div class="field-grid">
        <div class="field">
          <div class="field-label">Tempat Lahir</div>
          <div class="field-value">${val(d.tempat_lahir_ayah)}</div>
        </div>
        <div class="field">
          <div class="field-label">Tanggal Lahir</div>
          <div class="field-value">${val(d.tanggal_lahir_ayah)}</div>
        </div>
        <div class="field">
          <div class="field-label">Agama</div>
          <div class="field-value">${val(d.agama_ayah)}</div>
        </div>
        <div class="field">
          <div class="field-label">Pendidikan Terakhir</div>
          <div class="field-value">${val(d.pendidikan_ayah)}</div>
        </div>
        <div class="field">
          <div class="field-label">Pekerjaan</div>
          <div class="field-value">${val(d.pekerjaan_ayah)}</div>
        </div>
        <div class="field">
          <div class="field-label">No HP</div>
          <div class="field-value">${val(d.nohp_ayah)}</div>
        </div>
        <div class="field field-full">
          <div class="field-label">Email</div>
          <div class="field-value">${val(d.email_ayah)}</div>
        </div>
      </div>

      <hr class="divider">

      <!-- Data Ibu -->
      <span class="section-pill">Data Ibu / Wali</span>
      <div class="field" style="margin-bottom:8px;">
        <div class="field-label">Nama Ibu</div>
        <div class="field-value" style="font-weight:600;">${val(d.nama_ibu)}</div>
      </div>
      <div class="option-group" style="margin-bottom:14px;">
        ${['Kandung', 'Tiri', 'Wali'].map(o => `<span class="option-pill ${val(d.status_ibu) === o ? 'selected' : ''}">${val(d.status_ibu) === o ? '●' : '○'} ${o}</span>`).join('')}
      </div>
      <div class="field-grid">
        <div class="field">
          <div class="field-label">Tempat Lahir</div>
          <div class="field-value">${val(d.tempat_lahir_ibu)}</div>
        </div>
        <div class="field">
          <div class="field-label">Tanggal Lahir</div>
          <div class="field-value">${val(d.tanggal_lahir_ibu)}</div>
        </div>
        <div class="field">
          <div class="field-label">Agama</div>
          <div class="field-value">${val(d.agama_ibu)}</div>
        </div>
        <div class="field">
          <div class="field-label">Pendidikan Terakhir</div>
          <div class="field-value">${val(d.pendidikan_ibu)}</div>
        </div>
        <div class="field">
          <div class="field-label">Pekerjaan</div>
          <div class="field-value">${val(d.pekerjaan_ibu)}</div>
        </div>
        <div class="field">
          <div class="field-label">No HP</div>
          <div class="field-value">${val(d.nohp_ibu)}</div>
        </div>
        <div class="field field-full">
          <div class="field-label">Email</div>
          <div class="field-value">${val(d.email_ibu)}</div>
        </div>
      </div>

      <hr class="divider">

      <!-- Pendapatan & Alamat -->
      <div class="field" style="margin-bottom:12px;">
        <div class="field-label">Pendapatan Orang Tua / Wali</div>
        <div class="option-group">
          ${['0-5jt', '5-10jt', '10-15jt', '15-20jt', '>20jt'].map(o => `<span class="option-pill ${val(d.pendapatan) === o ? 'selected' : ''}">${val(d.pendapatan) === o ? '●' : '○'} ${o === '0-5jt' ? '0 - 5 Juta' : o === '5-10jt' ? '5 - 10 Juta' : o === '10-15jt' ? '10 - 15 Juta' : o === '15-20jt' ? '15 - 20 Juta' : '> 20 Juta'}</span>`).join('')}
        </div>
      </div>
      <div class="field" style="margin-bottom:12px;">
        <div class="field-label">Alamat Tinggal</div>
        <div class="field-value">${val(d.alamat)}</div>
      </div>
      <div class="field">
        <div class="field-label">Titik Lokasi Google Maps</div>
        <div class="field-value ${!d.link_maps ? 'empty' : ''}">${d.link_maps ? '<a href="' + d.link_maps + '" style="color:#346665; text-decoration:underline;">' + d.link_maps + '</a>' : 'Tidak diisi'}</div>
      </div>
    </div>

    <!-- ============ STEP 3: DOKUMEN ============ -->
    <div class="form-card">
      <h2 class="form-card-title">Unggah Dokumen</h2>
      <p class="form-card-subtitle">Dokumen pendukung pendaftaran yang telah diunggah.</p>

      <ul class="doc-list">
        <li class="doc-item">
          <div class="doc-icon ${d.file_upload?.name ? 'uploaded' : 'missing'}">
            <span class="material-symbols-outlined" style="font-size:20px">${d.file_upload?.name ? 'task' : 'upload_file'}</span>
          </div>
          <div class="doc-info">
            <div class="doc-title">Akte Kelahiran</div>
            <div class="doc-status ${!d.file_upload?.name ? 'missing' : ''}">${d.file_upload?.name ? '✓ ' + d.file_upload.name : '✗ Belum diunggah'}</div>
          </div>
        </li>
        <li class="doc-item">
          <div class="doc-icon ${d.ktp_ortu?.name ? 'uploaded' : 'missing'}">
            <span class="material-symbols-outlined" style="font-size:20px">${d.ktp_ortu?.name ? 'task' : 'upload_file'}</span>
          </div>
          <div class="doc-info">
            <div class="doc-title">KTP Orang Tua / Wali</div>
            <div class="doc-status ${!d.ktp_ortu?.name ? 'missing' : ''}">${d.ktp_ortu?.name ? '✓ ' + d.ktp_ortu.name : '✗ Belum diunggah'}</div>
          </div>
        </li>
        <li class="doc-item">
          <div class="doc-icon ${d.kk?.name ? 'uploaded' : 'missing'}">
            <span class="material-symbols-outlined" style="font-size:20px">${d.kk?.name ? 'task' : 'upload_file'}</span>
          </div>
          <div class="doc-info">
            <div class="doc-title">Kartu Keluarga (KK)</div>
            <div class="doc-status ${!d.kk?.name ? 'missing' : ''}">${d.kk?.name ? '✓ ' + d.kk.name : '✗ Belum diunggah'}</div>
          </div>
        </li>
        <li class="doc-item">
          <div class="doc-icon ${d.pas_foto?.name ? 'uploaded' : 'missing'}">
            <span class="material-symbols-outlined" style="font-size:20px">${d.pas_foto?.name ? 'task' : 'upload_file'}</span>
          </div>
          <div class="doc-info">
            <div class="doc-title">Pas Foto</div>
            <div class="doc-status ${!d.pas_foto?.name ? 'missing' : ''}">${d.pas_foto?.name ? '✓ ' + d.pas_foto.name : '✗ Belum diunggah'}</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- ============ SIGNATURE ============ -->
    <div class="form-card">
      <div class="signature-area">
        <div class="signature-box">
          <div class="signature-label">Orang Tua / Wali,</div>
          <div class="signature-line"></div>
          <div class="signature-name">${val(d.nama_ayah || d.nama_ibu, '_______________')}</div>
        </div>
        <div class="signature-box">
          <div class="signature-label">Mengetahui,<br>Kepala Sekolah</div>
          <div class="signature-line"></div>
          <div class="signature-name">_______________</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <span>Dicetak pada: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
      <span>Yayasan Merial Abadan Madani © ${new Date().getFullYear()}</span>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="Formulir_Pendaftaran_${(registration.nama_anak || 'Siswa').replace(/\\s+/g, '_')}.html"`,
    },
  });
}
