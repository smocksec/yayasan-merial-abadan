import Link from "next/link";

export default function Program() {
  return (
    <>
      <main className="pt-8 pb-section-gap">
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-margin-desktop mb-section-gap text-center">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-6">Program Unggulan Yayasan</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Berkomitmen dalam mencetak generasi emas melalui integrasi pendidikan akademik yang berkualitas, penanaman nilai spiritual yang kokoh, dan kepedulian sosial yang nyata.
          </p>
        </section>

        {/* Program Grid */}
        <section className="max-w-[1280px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Card Pendidikan */}
          <div className="bg-white shadow-[0_4px_20px_rgba(23,46,64,0.05)] overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 rounded-3xl">
            <div className="h-48 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-t-3xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIfnrrpqCJMSTFpzou07J1RmXnUp-ntfh-LRBn2d0evPp_DdME-VKJ3f-igprBMm07e2Q_v7g2iiGquPqy-WIWFv0flNcgVeZ1hmn2o7e9Vg-W5JcIi01-FwUlrw08N3kLNry3vVJH5oxrVPKKDcetNv0agFB_8zPzhyhCC9LdoLqZWw9T28_AfGcJL6FOawUp7oSjN9L1AUIhq7pdEOs-okTP3FUE3d9xeWT10OrEQ9Mv2zGzFjaJEtRE6bquSvKzmgqGny8m4do"
                alt="Pendidikan"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">school</span>
                <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Pendidikan</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Pendidikan Formal</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Fokus pada pembentukan karakter dan kecerdasan intelektual sejak usia dini hingga sekolah dasar.
              </p>
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C89B53] rounded-full"></span> PAUD (Pendidikan Anak Usia Dini)
                  </h3>
                  <ul className="pl-4 space-y-1 text-on-surface-variant text-caption mb-4">
                    <li className="flex items-center gap-2 italic">• TPA (Tempat Penitipan Anak)</li>
                    <li className="flex items-center gap-2 italic">• TK (Taman Kanak-Kanak)</li>
                    <li className="flex items-center gap-2 italic">• KB (Kelompok Bermain)</li>
                  </ul>
                  <div className="flex gap-2 flex-wrap pl-4">
                    <Link href="/pendaftaran">
                      <button className="px-4 py-1.5 bg-surface-container-low hover:bg-secondary hover:text-white transition-colors font-label-sm text-label-sm font-bold rounded-full border border-outline-variant text-primary">
                        Daftar PAUD
                      </button>
                    </Link>
                    <Link href="/pendaftaran">
                      <button className="px-4 py-1.5 bg-surface-container-low hover:bg-secondary hover:text-white transition-colors font-label-sm text-label-sm font-bold rounded-full border border-outline-variant text-primary">
                        Daftar TK
                      </button>
                    </Link>
                    <Link href="/paud-tk">
                      <button className="px-4 py-1.5 bg-transparent hover:bg-tertiary hover:text-on-tertiary transition-colors font-label-sm text-label-sm font-bold rounded-full border border-tertiary text-tertiary flex items-center gap-1">
                        Visit
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </button>
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C89B53] rounded-full"></span> SD (Sekolah Dasar)
                  </h3>
                  <p className="pl-4 text-caption text-on-surface-variant italic">Kurikulum terpadu IT dan nilai keislaman.</p>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-outline-variant flex justify-between items-center">
                <span className="text-caption font-label-md text-secondary">4 Unit Aktif</span>
                <Link className="text-secondary font-label-md text-label-md font-bold hover:underline" href="#">
                  Lihat Kurikulum
                </Link>
              </div>
            </div>
          </div>

          {/* Card Agama */}
          <div className="bg-white shadow-[0_4px_20px_rgba(23,46,64,0.05)] overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 rounded-3xl">
            <div className="h-48 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-t-3xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2IncWkVEklkFuz-8S7YaZEeCcjCMRbDblppTpw4ZOjSFiO9NEj2Gw49jRe7OgNRYFYZjB6fryt-8OzEi5li8N454W02vwWc2mEjrplGqsr9i2ekkYtU2xoNvumBF7dWFTXKytpu8-JSOLwnzfd0ZJ8peKjVhYQEoM7m7i0U09Qvd0hJrL4SyJX4BdY0DyFW4RJvj1OrjjCzvuLWRSYup8nXcWBsuJr09qB0_NpZdhf432DM9MsKLE8qGQGMsfG4K_Icpd1KS0Xqg"
                alt="Agama"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">auto_stories</span>
                <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Agama</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Unit Pesantren</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Pusat pendidikan Islam yang mengedepankan adab dan penguasaan kitab kuning serta tahfidz Quran.
              </p>
              <div className="bg-surface-container-low p-4 rounded-lg mb-8">
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[#C89B53] text-[20px]">diamond</span>
                    <span className="text-on-surface text-body-md">Program Tahfidz Al-Quran 30 Juz</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[#C89B53] text-[20px]">diamond</span>
                    <span className="text-on-surface text-body-md">Kajian Kitab Turats &amp; Modern</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[#C89B53] text-[20px]">diamond</span>
                    <span className="text-on-surface text-body-md">Pembinaan Akhlakul Karimah</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto pt-6 border-t border-outline-variant flex justify-between items-center">
                <span className="text-caption font-label-md text-secondary">Menerima Santri Baru</span>
                <Link className="text-secondary font-label-md text-label-md font-bold hover:underline" href="#">
                  Informasi Pendaftaran
                </Link>
              </div>
            </div>
          </div>

          {/* Card Sosial */}
          <div className="bg-white shadow-[0_4px_20px_rgba(23,46,64,0.05)] overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 rounded-3xl">
            <div className="h-48 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-t-3xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG5HJw970MJC5aScs-BJH80PjInDmtvSLlfN_XhUyd3oRKoZTG9Nwp4fcxv1DBVu2xwZSvOn_e-lDwZYbuk4N2q_dzHkqBQLpJTjHR-WPO8xeQqI33tOJ0WJ-i_BIoQnCtueMRa4QTTASfya0fHkXgarIXM8rwcfYw2Wls3lIYTlr5UCU5W3qTOuhmE7piM5ft-s8yMjF9-9WxU2vo7kubiscWnr7qGDIWo8LD2aOF55R2bSoJ2bHMQo4atDqwT-RaYIxZDo-ZFik"
                alt="Sosial"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">volunteer_activism</span>
                <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Sosial</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Lembaga Ziswaf</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Mengelola dana amanah untuk pemberdayaan umat dan kesejahteraan masyarakat yang membutuhkan.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-outline-variant p-3 text-center hover:border-secondary transition-colors rounded-full">
                  <p className="font-label-md text-primary">Zakat</p>
                </div>
                <div className="border border-outline-variant p-3 text-center hover:border-secondary transition-colors rounded-full">
                  <p className="font-label-md text-primary">Infaq</p>
                </div>
                <div className="border border-outline-variant p-3 text-center hover:border-secondary transition-colors rounded-full">
                  <p className="font-label-md text-primary">Shadaqah</p>
                </div>
                <div className="border border-outline-variant p-3 text-center hover:border-secondary transition-colors rounded-full">
                  <p className="font-label-md text-primary">Wakaf</p>
                </div>
              </div>
              <button className="w-full bg-[#C89B53] text-white py-3 rounded-[4px] font-bold mb-4 hover:opacity-90 transition-opacity rounded-full">
                Salurkan Donasi
              </button>
              <div className="mt-auto pt-6 border-t border-outline-variant text-center">
                <span className="text-caption font-label-md text-on-surface-variant">Transparan &amp; Terpercaya</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-section-gap max-w-[1024px] mx-auto px-margin-mobile">
          <div className="bg-primary text-on-primary p-12 text-center relative overflow-hidden rounded-3xl">
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg mb-6 text-white">Bergabung dalam Menebar Kebaikan</h2>
              <p className="font-body-lg text-body-lg text-on-primary/80 mb-10 max-w-xl mx-auto">
                Dukung program kami melalui donasi atau pendaftaran santri untuk mewujudkan peradaban yang lebih baik.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-[#C89B53] text-white px-8 py-3 rounded-[4px] font-bold hover:opacity-90 rounded-full">
                  Daftar Sekarang
                </button>
                <button className="border border-white/30 text-white px-8 py-3 rounded-[4px] font-bold hover:bg-white/10 rounded-full">
                  Hubungi Kami
                </button>
              </div>
            </div>
            {/* Subtle Decorative Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[200px]">hub</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
