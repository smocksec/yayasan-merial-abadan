export default function Profil() {
  return (
    <>
      <main className="mt-8 mb-16 max-w-[1280px] mx-auto px-margin-desktop pb-section-gap">
        {/* Hero Section Profile */}
        <section className="py-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-primary mb-6">Membangun Peradaban dengan Hati dan Ilmu</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Yayasan Merial Abadan Madani adalah institusi pendidikan dan sosial yang berdedikasi untuk menciptakan generasi yang cerdas secara akademik, kuat secara spiritual, dan peduli secara kemanusiaan.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#C89B53] text-white font-label-md text-label-md px-8 py-3 font-bold rounded-full">
                Tentang Kami
              </button>
              <button className="border-2 border-primary text-primary font-label-md text-label-md px-8 py-3 font-bold hover:bg-primary hover:text-white transition-all rounded-full">
                Sejarah Yayasan
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              alt="Gedung Yayasan Merial Abadan Madani"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlg_kkjh7aIlQo-rpRJ1gY3N7uEAof5jrrxLK3KhezTJZu8KbmezV-GOP8GhrFlLKXzYxik-NNZF7YgCdrvUVuayB2558QkmAwrdizK1Gg1-_4N7-aE9bH9nCJnhB4usiW55Y1gKxNwb48LC9PtBBwQ7wCX-5R-EVQVGhKj-r-0rHMIBhiFiTOXCYESrksgJAnnxP5XHnnx1jmkiYEnqpn6vlTWvqmBsoGOjt6IIrulELTDaiEPCPg3Ikvu4idXGIMMIZeQSYn42Y"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary-container p-6 rounded-xl shadow-md border border-secondary/20">
              <div className="font-headline-md text-headline-md text-secondary">15+</div>
              <div className="font-label-md text-label-md text-on-secondary-container uppercase tracking-widest">
                Tahun Mengabdi
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi Widget */}
        <section className="py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Visi Card */}
            <div className="lg:col-span-7 bg-surface-container-low p-10 border-l-8 border-[#C89B53] shadow-sm flex flex-col justify-center rounded-3xl">
              <span className="material-symbols-outlined text-[#C89B53] text-5xl mb-4">format_quote</span>
              <h2 className="font-label-md text-label-md text-[#C89B53] uppercase tracking-widest mb-2">Visi Kami</h2>
              <p className="font-headline-lg text-headline-lg text-primary italic leading-relaxed">
                "Menjadi Yayasan Amanah dan Profesional dalam bingkai Akhlak, Religi dan Kemanusiaan dengan Mencari Ridha Allah"
              </p>
            </div>
            {/* Misi List */}
            <div className="lg:col-span-5 bg-white p-10 shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-outline-variant rounded-3xl">
              <h2 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-6">Misi Kami</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">school</span>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary text-xl">Pendidikan</h3>
                    <p className="text-on-surface-variant">Menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai akademik dan spiritualitas.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">groups</span>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary text-xl">Kualitas SDM</h3>
                    <p className="text-on-surface-variant">Meningkatkan kapasitas sumber daya manusia yang berintegritas dan profesional.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">volunteer_activism</span>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary text-xl">Santunan Sosial</h3>
                    <p className="text-on-surface-variant">Memberikan bantuan sosial yang tepat sasaran bagi masyarakat yang membutuhkan.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Organization Structure Widget */}
        <section className="py-section-gap">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Struktur Organisasi</h2>
            <div className="w-24 h-1 bg-[#C89B53] mx-auto mb-6"></div>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Dipimpin oleh para profesional dan ulama yang berdedikasi tinggi dalam mewujudkan misi peradaban.
            </p>
          </div>
          {/* Hierarchy Flow Chart */}
          <div className="flex flex-col items-center">
            {/* Level 1 */}
            <div className="bg-white border-2 border-secondary p-6 w-72 text-center shadow-md relative rounded-xl">
              <h4 className="font-label-md text-label-md text-secondary uppercase mb-1">Ketua Dewan Pembina</h4>
              <p className="font-headline-md text-headline-md text-primary">Dr. H. Ahmad Ma'ruf</p>
            </div>
            <div className="w-0.5 bg-secondary h-6"></div>
            {/* Level 2 */}
            <div className="flex gap-gutter items-center justify-center w-full">
              <div className="bg-white border-2 border-secondary p-6 w-72 text-center shadow-md rounded-xl">
                <h4 className="font-label-md text-label-md text-secondary uppercase mb-1">Ketua Yayasan</h4>
                <p className="font-headline-md text-headline-md text-primary">Ir. Budi Santoso, M.Si</p>
              </div>
            </div>
            <div className="w-0.5 bg-secondary h-6"></div>
            {/* Level 3 */}
            <div className="relative w-full max-w-5xl">
              <div className="absolute top-0 left-1/2 w-3/4 -translate-x-1/2 h-0.5 bg-secondary"></div>
              <div className="flex justify-between mt-0 relative z-10">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-0.5 bg-secondary h-6"></div>
                  <div className="bg-white border-2 border-secondary p-5 w-60 text-center shadow-md rounded-xl">
                    <h4 className="font-label-md text-label-md text-secondary uppercase mb-1">Bid. Pendidikan</h4>
                    <p className="font-headline-md text-headline-md text-primary text-lg">Hj. Siti Aminah</p>
                  </div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-0.5 bg-secondary h-6"></div>
                  <div className="bg-white border-2 border-secondary p-5 w-60 text-center shadow-md rounded-xl">
                    <h4 className="font-label-md text-label-md text-secondary uppercase mb-1">Bid. Sosial</h4>
                    <p className="font-headline-md text-headline-md text-primary text-lg">Drs. M. Ridwan</p>
                  </div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-0.5 bg-secondary h-6"></div>
                  <div className="bg-white border-2 border-secondary p-5 w-60 text-center shadow-md rounded-xl">
                    <h4 className="font-label-md text-label-md text-secondary uppercase mb-1">Bendahara</h4>
                    <p className="font-headline-md text-headline-md text-primary text-lg">Lutfi Hakim, S.E.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-section-gap">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Program Yayasan</h2>
              <p className="text-on-surface-variant">Inisiatif kami untuk merawat peradaban masa depan.</p>
            </div>
            <a className="text-secondary font-bold flex items-center gap-2 hover:underline" href="/program">
              Lihat Semua Program <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Program Card 1 */}
            <div className="bg-white shadow-sm border border-outline-variant overflow-hidden hover:-translate-y-1 transition-transform rounded-3xl">
              <img alt="Program Tahfidz Quran" className="w-full h-48 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt879z5bZb4LF6Q07RzdGB_5XpegATUZA217CSSslH9P76yKCQKH3vzk1G0cYkIcGLHiM6BF6L9Et9pY0bp-LrVyjRFti3jVHmDt1a6Dj7LXd4lQFAnH235SHBmveIJY4bIQHPJQ99qnaXvc4e1ZJFc0AMrQ2yKlcLQx0Ax5TQ3dQ7uHl3IYdlqOO4FjdraVSDV3JuvJ8uY_yDF-mMkLuUaFcDXqRlrWAtgAkC7F3mY-xYKdL_2rLYac5nTF6cJdrIyLLIbr7nyPc" />
              <div className="p-6">
                <span className="text-secondary font-label-md text-xs uppercase tracking-widest mb-2 block">Pendidikan</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Tahfidz Al-Quran Terpadu</h3>
                <p className="text-on-surface-variant font-body-md text-sm mb-6">Program menghafal Al-Quran dengan metode mutqin dan pemahaman makna yang mendalam.</p>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                  <span className="font-label-md text-label-md text-primary">50+ Santri</span>
                  <span className="font-label-md text-label-md text-primary">Full-time</span>
                </div>
              </div>
            </div>
            {/* Program Card 2 */}
            <div className="bg-white shadow-sm border border-outline-variant overflow-hidden hover:-translate-y-1 transition-transform rounded-3xl">
              <img alt="Program Santunan" className="w-full h-48 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNk_b1j5CkKd8Yrpp5BrUEo9obZJsQEBECsN1jZhwPUMVlMZi5ZOYD1LA8EgNbinGygV20tBk07pIYhzLGgA6WWjP8FZtWrR8YDip5Qr-rtPM4TCVbY0iwO0dRmZgClKLNTXftgJC-nZgB7O3Va2zF-Qy3K2ad32voFZhwieWz6HdO9YFFQUrM848mxL143pYSK1EJn5sQoL4S4TFzgjNNO1UnHX1zc2PWpr9kUEXmv7z2vydsrwAH3n5zHs5L9f1vFaDFah7yBGg" />
              <div className="p-6">
                <span className="text-secondary font-label-md text-xs uppercase tracking-widest mb-2 block">Sosial</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Merial Berbagi Sesama</h3>
                <p className="text-on-surface-variant font-body-md text-sm mb-6">Penyaluran bantuan logistik dan beasiswa bagi yatim serta dhuafa secara berkelanjutan.</p>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                  <span className="font-label-md text-label-md text-primary">Bulanan</span>
                  <span className="font-label-md text-label-md text-primary">Jabodetabek</span>
                </div>
              </div>
            </div>
            {/* Program Card 3 */}
            <div className="bg-white shadow-sm border border-outline-variant overflow-hidden hover:-translate-y-1 transition-transform rounded-3xl">
              <img alt="Pusat Pelatihan SDM" className="w-full h-48 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2NE5EOm54JHl7ZBVvqW0CxFU4L7MiAMCOSbz2Vlx8g32li4VJbhQaUMku3tHojEA6GcrshbV4VaIBV_RcR3eGLq4Cm7u98J3CyLUDEevHT5cKnHSeROcWcfE3O4IDHrR-BI9ROYf46xqw90pQfYvThkAY8Pldqf_25l7_oIropUv_8YRHAWTtNdgfLmD_qebYEL-GT9L81cbcQjR3kMa-pOeEQ4vnBOe-_rJjf07HBjtoP1fsWcwj-DO3h7igSJUSP-5uZM0G7E0" />
              <div className="p-6">
                <span className="text-secondary font-label-md text-xs uppercase tracking-widest mb-2 block">Kualitas SDM</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Leadership &amp; Ethics Center</h3>
                <p className="text-on-surface-variant font-body-md text-sm mb-6">Pusat pelatihan kepemimpinan berbasis akhlak untuk mencetak pemimpin masa depan.</p>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                  <span className="font-label-md text-label-md text-primary">Sertifikasi</span>
                  <span className="font-label-md text-label-md text-primary">Nasional</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section-gap bg-primary p-12 text-center text-white overflow-hidden relative rounded-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C89B53] opacity-10 rounded-full -ml-24 -mb-24"></div>
          <h2 className="font-headline-lg text-headline-lg mb-6 relative z-10">Mari Bergabung dalam Menebar Kebaikan</h2>
          <p className="text-on-primary-container max-w-2xl mx-auto mb-10 relative z-10">
            Dukungan Anda membantu kami memperluas jangkauan manfaat dan merawat peradaban yang lebih baik bagi semua.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="bg-[#C89B53] text-white px-10 py-4 font-bold text-lg shadow-lg hover:bg-opacity-90 rounded-full">
              Donasi Sekarang
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 font-bold text-lg hover:bg-white hover:text-primary transition-all rounded-full">
              Menjadi Relawan
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
