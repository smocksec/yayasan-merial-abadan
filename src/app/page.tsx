import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 md:gap-16 mt-8 mb-16">
        {/* Hero Section */}
        <header className="relative w-full min-h-[819px] flex items-center justify-center bg-primary-container overflow-hidden md:rounded-[3rem] md:mx-4 md:w-[calc(100%-2rem)] shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              alt="Hero Background"
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvf2a34__O3NTlw7sHnBuP16ybfI1mgFDPdmYgLusBHjwT29uWCr7H8szON5ZMZVyp8hbjv-M8BPogIjRxbSsXknTxNvm8Js8r-fMb1YwHeE55iN1rLdj76bEct9O10xS9fhUiv5Vu3nX6ObEG3LxkI3RGyaWtaDuN2mrVB07_6cSuX-b99AZkZ_q-hYEuW_e3Gy2D7bBDTvc7tb6nN0pVKHYY603fCWnpjux9KskPAQuXpH3eTe3LW6GabND09EafW_yHXxc6--g"
            />
          </div>
          <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center gap-8">
            <span className="text-warm-gold font-label-md text-label-md uppercase tracking-widest bg-surface-container/20 px-4 py-1 rounded-full backdrop-blur-sm">
              Penerimaan Siswa Baru 2024
            </span>
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary drop-shadow-lg">
              Menebar Kebaikan,<br />Merawat Peradaban
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl drop-shadow-md">
              Membangun generasi cerdas berkarakter madani melalui pendidikan berkualitas yang memadukan nilai-nilai spiritual dan keunggulan akademik modern.
            </p>
            <Link href="/register">
              <button className="bg-[#C89B53] text-white font-label-md text-label-md px-8 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-xl shadow-lg transition-all duration-300">
                Mulai Pendaftaran
              </button>
            </Link>
          </div>
        </header>

        {/* About Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto" id="profil">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 relative">
              <div className="aspect-square rounded-[2.5rem] overflow-hidden relative shadow-[0_8px_30px_rgba(23,46,64,0.12)]">
                <img
                  alt="Logo Yayasan Merial Abadan Madani"
                  className="w-full h-full object-contain p-8 bg-white"
                  src="/logo-yayasan.jpg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-[2rem] -z-10 hidden md:block shadow-lg"></div>
            </div>
            <div className="md:col-span-1"></div>
            <div className="md:col-span-6 flex flex-col gap-4">
              <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
                Profil Yayasan
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Visi &amp; Misi Kami</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Yayasan Merial Abadan Madani hadir untuk menjawab tantangan pendidikan modern dengan tetap berpijak pada akar tradisi luhur. Kami berkomitmen untuk mendidik jiwa dan pikiran, mempersiapkan pemimpin masa depan yang berintegritas.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-start gap-4 bg-surface p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-[#C89B53]/10 rounded-full text-[#C89B53] flex-shrink-0">
                    <span className="material-symbols-outlined">diamond</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Kurikulum holistik yang menyeimbangkan ilmu dunia dan akhirat.
                  </span>
                </li>
                <li className="flex items-start gap-4 bg-surface p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-[#C89B53]/10 rounded-full text-[#C89B53] flex-shrink-0">
                    <span className="material-symbols-outlined">diamond</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Fasilitas modern yang mendukung eksplorasi bakat siswa.
                  </span>
                </li>
                <li className="flex items-start gap-4 bg-surface p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-[#C89B53]/10 rounded-full text-[#C89B53] flex-shrink-0">
                    <span className="material-symbols-outlined">diamond</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Tenaga pengajar profesional dan berdedikasi tinggi.
                  </span>
                </li>
              </ul>
              
              <div className="mt-4">
                <Link href="/profil" className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#172E40] px-8 py-3.5 font-bold text-white shadow-md transition-all hover:shadow-lg w-fit">
                  <span className="relative z-10 font-label-md text-label-md">Lihat Profil Lengkap</span>
                  <span className="material-symbols-outlined relative z-10 transition-transform duration-300 group-hover:translate-x-2">arrow_forward</span>
                  <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-[#C89B53] transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop relative" id="program">
          <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-10 relative z-10">
            <div className="text-center flex flex-col gap-2 max-w-2xl items-center">
              <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
                Program Pendidikan
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Jenjang Pendidikan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
              {/* Program Card 1 */}
              <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgba(23,46,64,0.08)] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(23,46,64,0.12)]">
                <div className="p-2 pb-0">
                  <img
                    alt="PAUD/TK"
                    className="w-full h-56 object-cover rounded-[2rem]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4eksXypZWfPW9bl9Th80-FLesXf9CvJgE6_XYJvWOCFtZkl1VGQDtxzz7B4uzqKysiVX1um4abl40Ypg2poN0TXgMnIy6lelViSWxvY2oquhYtB8QRo1HiCSILSsQJcbAvfEKVeXGR6ZWZJQ8zlRM7zgLSIwSEwGh2MJ2Ele9Iw-qoCyEdQ3_JUMr-303cZ-NsNR6Tc3WOEuICNTPFF_RiZwPbWWE149ADz0nVqWpiENo5hpBlMXrJJZphoQxZNpHBME4HPHDp4I"
                  />
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
                    Taman Kanak-Kanak
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary">PAUD/TK Merial Abadan</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                    Membangun fondasi karakter melalui bermain dan belajar. Kurikulum difokuskan pada pembentukan adab, kemandirian, dan pengenalan dasar literasi dengan pendekatan yang menyenangkan.
                  </p>
                  <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant">
                    <span className="font-caption text-caption bg-surface-variant px-3 py-1 rounded-full">
                      Usia 3-6 Tahun
                    </span>
                    <span className="font-caption text-caption font-medium text-secondary">
                      Buka Pendaftaran
                    </span>
                  </div>
                </div>
              </div>

              {/* Program Card 2 */}
              <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgba(23,46,64,0.08)] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(23,46,64,0.12)]">
                <div className="p-2 pb-0">
                  <img
                    alt="SD"
                    className="w-full h-56 object-cover rounded-[2rem]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgxpdxURuR3RGSLyyBQ1gZ-_-NqM5TzoA_m7WxKtznN_Gir_8N8qekB5SbKcxYvJzTPJb8wX7HPeo8D_ImrOVpTwAYu7iRqkVtzXHX8HufDXq0KhChZsOxOh4Uyk13_uiWKy79f5SotCib8qt5nazgik36EFHT16RiIBq-UTqhbhG-bZ1Qd10FDmJtGJWgJfqaapKNv0i-X4_d18VxtKCNp1RaJuzenMfd7J2bEovB3LxluU7rDDGEPt0e95qPzZ7mS59LjH6X8Rc"
                  />
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
                    Sekolah Dasar
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary">SD Merial Abadan</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                    Mengembangkan potensi akademik dan spiritual siswa. Kurikulum terintegrasi yang menekankan pada penguasaan sains, teknologi, serta pendalaman ilmu agama dan karakter unggul.
                  </p>
                  <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant">
                    <span className="font-caption text-caption bg-surface-variant px-3 py-1 rounded-full">
                      Kelas 1-6
                    </span>
                    <span className="font-caption text-caption font-medium text-[#C89B53]">
                      Kuota Terbatas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Unggulan */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto" id="program-unggulan">
          <div className="text-center flex flex-col gap-2 mb-12 items-center">
            <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
              Pilihan Terbaik
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#172E40]">Program Unggulan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface border-2 border-[#4A7C7A] rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-[#4A7C7A]/10 rounded-full flex items-center justify-center text-[#4A7C7A]">
                <span className="material-symbols-outlined text-4xl">menu_book</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-headline-md text-headline-md text-[#172E40]">Hafal Al Quran</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Fokus pada keunggulan spiritual dan hafalan Al-Quran dengan metode yang menyenangkan dan membimbing hati.
                </p>
              </div>
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-surface-container">
                <img alt="Hafal Al Quran" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4eksXypZWfPW9bl9Th80-FLesXf9CvJgE6_XYJvWOCFtZkl1VGQDtxzz7B4uzqKysiVX1um4abl40Ypg2poN0TXgMnIy6lelViSWxvY2oquhYtB8QRo1HiCSILSsQJcbAvfEKVeXGR6ZWZJQ8zlRM7zgLSIwSEwGh2MJ2Ele9Iw-qoCyEdQ3_JUMr-303cZ-NsNR6Tc3WOEuICNTPFF_RiZwPbWWE149ADz0nVqWpiENo5hpBlMXrJJZphoQxZNpHBME4HPHDp4I" />
              </div>
            </div>
            <div className="bg-surface border-2 border-[#4A7C7A] rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-[#4A7C7A]/10 rounded-full flex items-center justify-center text-[#4A7C7A]">
                <span className="material-symbols-outlined text-4xl">target</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-headline-md text-headline-md text-[#172E40]">Memanah</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Melatih ketangkasan fisik, fokus, dan disiplin melalui olahraga sunnah yang membangun karakter tangguh.
                </p>
              </div>
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-surface-container">
                <img alt="Memanah" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgxpdxURuR3RGSLyyBQ1gZ-_-NqM5TzoA_m7WxKtznN_Gir_8N8qekB5SbKcxYvJzTPJb8wX7HPeo8D_ImrOVpTwAYu7iRqkVtzXHX8HufDXq0KhChZsOxOh4Uyk13_uiWKy79f5SotCib8qt5nazgik36EFHT16RiIBq-UTqhbhG-bZ1Qd10FDmJtGJWgJfqaapKNv0i-X4_d18VxtKCNp1RaJuzenMfd7J2bEovB3LxluU7rDDGEPt0e95qPzZ7mS59LjH6X8Rc" />
              </div>
            </div>
            <div className="bg-surface border-2 border-[#4A7C7A] rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-[#4A7C7A]/10 rounded-full flex items-center justify-center text-[#4A7C7A]">
                <span className="material-symbols-outlined text-4xl">record_voice_over</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-headline-md text-headline-md text-[#172E40]">Sensory &amp; Phonics</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Pengembangan dini yang menstimulasi panca indera dan kemampuan literasi melalui pendekatan sensorik modern.
                </p>
              </div>
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-surface-container">
                <img alt="Sensory & Phonics" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhrLm_Lx_6EDKRIAOc6CtaFgdcsze3ivWeZqhRYYRLvagD22MvcOG8BAA_7uEg-eKbPgoA42UdKdN7pPuA-oVtErSsV-inW9Viiw7B6tWHgIHQ4IJhNLDdg1ZemVy4HKhIikNVpngqeqBNhOYv7LZgcwbFZl75wgCY_-klyWpWUHN-m6dNbZxaGnAJgOYMXhDCih2Kma2Pwk2s3rBeOSzsbhJ1ctIIAWOx0_kLxKtOoWMgomQe8KY9hDz6z_2wEguSXafuCd2sxoQ" />
              </div>
            </div>
          </div>
        </section>

        {/* Registration Guide */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto" id="jadwal">
          <div className="text-center flex flex-col gap-2 mb-12 items-center">
            <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
              Panduan
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Alur Pendaftaran</h2>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-6">
            <div className="hidden md:block absolute top-[50%] left-[10%] right-[10%] border-t-2 border-dashed border-secondary/30 -translate-y-1/2 z-0"></div>
            <div className="bg-surface rounded-[2rem] p-8 shadow-lg flex flex-col items-center gap-4 text-center w-full md:w-1/3 relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-[#C89B53] text-white flex items-center justify-center font-headline-md font-bold shadow-md">1</div>
              <h3 className="font-headline-md text-headline-md text-primary">Login &amp; Daftar</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Gunakan akun Google Anda untuk masuk ke sistem pendaftaran kami dengan aman dan cepat.
              </p>
            </div>
            <div className="bg-surface rounded-[2rem] p-8 shadow-lg flex flex-col items-center gap-4 text-center w-full md:w-1/3 relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-soft-mint text-primary border-2 border-secondary flex items-center justify-center font-headline-md font-bold">2</div>
              <h3 className="font-headline-md text-headline-md text-primary">Isi Data Diri</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Lengkapi formulir pendaftaran secara online dan unggah dokumen persyaratan yang diminta.
              </p>
            </div>
            <div className="bg-surface rounded-[2rem] p-8 shadow-lg flex flex-col items-center gap-4 text-center w-full md:w-1/3 relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-soft-mint text-primary border-2 border-secondary flex items-center justify-center font-headline-md font-bold">3</div>
              <h3 className="font-headline-md text-headline-md text-primary">Verifikasi</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tunggu proses verifikasi dari admin dan pantau status pendaftaran melalui dashboard Anda.
              </p>
            </div>
          </div>
          <div className="mt-16 flex justify-center relative z-10">
            <Link href="/register">
              <button className="bg-[#C89B53] text-white font-label-md text-label-md px-8 py-3 rounded-full font-bold hover:-translate-y-1 shadow-[0_8px_20px_rgba(200,155,83,0.3)] transition-all duration-300 flex items-center gap-3">
                <span className="material-symbols-outlined">login</span>
                Mulai Pendaftaran
              </button>
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop" id="kontak">
          <div className="max-w-[1280px] mx-auto relative w-full min-h-[500px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(23,46,64,0.1)] flex items-center p-6 md:p-12">
            <iframe
              src="https://maps.google.com/maps?q=5.5288809,95.3348014+(Yayasan+Merial+Abadan+Madani)&t=&z=19&ie=UTF8&iwloc=B&output=embed"
              className="absolute inset-0 w-full h-full object-cover z-0 border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map Location"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-r from-soft-mint/90 via-soft-mint/50 to-transparent z-[1] pointer-events-none"></div>
            <a
              href="https://www.google.com/maps/place/The+Gepeng+Bike+%26+Car+care/@5.5291632,95.3343709,19.75z/data=!4m6!3m5!1s0x304039c779bc4455:0x30a4c8cb55c2417f!8m2!3d5.5288809!4d95.3348014!16s%2Fg%2F11l2ycgmm2?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-[5] cursor-pointer"
              aria-label="Buka di Google Maps"
            ></a>
            <div className="relative z-10 bg-surface/95 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-secondary font-label-md text-label-md bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
                  Informasi
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary">Hubungi Kami</h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Punya pertanyaan seputar proses pendaftaran atau program kami? Tim kami siap membantu Anda.
              </p>
              <div className="flex flex-col gap-5 mt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-soft-mint rounded-full text-secondary shadow-sm">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">Alamat</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Komplek pola batara permai.43, Landom, Kec. Lueng Bata, Kota Banda Aceh, Aceh 23246
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-soft-mint rounded-full text-secondary shadow-sm">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">Telepon</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">+62 811-1003-1106</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-soft-mint rounded-full text-secondary shadow-sm">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">Email</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">merialabadanmadani@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
