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
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgba(23,46,64,0.08)] max-w-5xl mx-auto flex flex-col items-center relative overflow-x-auto overflow-y-hidden">
            <div className="text-center mb-12">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Susunan Pengurus</h2>
              <h3 className="font-headline-md text-headline-md text-secondary">Yayasan Merial Abadan Madani</h3>
            </div>

            <div className="flex flex-col items-center relative w-full max-w-[600px] mx-auto py-4">
              <div className="relative flex flex-col items-center w-full">
                {/* Main vertical line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-secondary/30 -translate-x-1/2 z-0"></div>

                {/* Ketua Pembina */}
                <div className="border border-secondary/30 bg-surface p-5 w-64 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all mb-8 mt-2">
                  <div className="font-label-md text-label-md text-secondary uppercase mb-1">Ketua Pembina</div>
                  <div className="font-headline-md text-headline-md text-primary">Fakhrurrazi</div>
                </div>
                
                {/* Anggota Pembina Branch */}
                <div className="w-full relative flex justify-end pl-[50%] mb-8 z-10">
                  <div className="absolute top-1/2 left-1/2 w-8 md:w-12 h-[2px] bg-secondary/30 -translate-y-1/2 z-0"></div>
                  <div className="border border-secondary/30 bg-surface p-5 w-64 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all ml-8 md:ml-12">
                    <div className="font-label-md text-label-md text-secondary uppercase mb-1">Anggota Pembina</div>
                    <div className="font-headline-md text-headline-md text-primary">Syarafina</div>
                  </div>
                </div>

                {/* Pengawas Branch */}
                <div className="w-full relative flex justify-end pl-[50%] mb-12 z-10">
                  <div className="absolute top-1/2 left-1/2 w-8 md:w-12 h-[2px] bg-secondary/30 -translate-y-1/2 z-0"></div>
                  <div className="border border-primary/20 bg-surface p-5 w-64 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all ml-8 md:ml-12">
                    <div className="font-label-md text-label-md text-primary uppercase mb-1">Pengawas</div>
                    <div className="font-headline-md text-headline-md text-primary">Husaini</div>
                  </div>
                </div>

                {/* Ketua Pengurus */}
                <div className="border border-[#C89B53]/30 bg-surface p-5 w-64 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all mb-8">
                  <div className="font-label-md text-label-md text-[#C89B53] uppercase mb-1">Ketua Pengurus</div>
                  <div className="font-headline-md text-headline-md text-primary">Cut Bungsu Rahayu</div>
                </div>

                {/* Wakil Ketua Branch */}
                <div className="w-full relative flex justify-end pl-[50%] mb-12 z-10">
                  <div className="absolute top-1/2 left-1/2 w-8 md:w-12 h-[2px] bg-secondary/30 -translate-y-1/2 z-0"></div>
                  <div className="border border-[#C89B53]/30 bg-surface p-5 w-64 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all ml-8 md:ml-12">
                    <div className="font-label-md text-label-md text-[#C89B53] uppercase mb-1">Wakil Ketua</div>
                    <div className="font-headline-md text-headline-md text-primary">Achmad Luthfi</div>
                  </div>
                </div>
              </div>

              {/* Sekretaris & Bendahara */}
              <div className="w-full sm:w-[360px] md:w-[480px] flex justify-between relative z-10 px-2 sm:px-0">
                {/* Horizontal line */}
                <div className="absolute top-0 left-1/2 w-[60%] sm:w-[200px] md:w-[256px] h-[2px] bg-secondary/30 -translate-x-1/2"></div>
                
                {/* Left Branch */}
                <div className="relative flex flex-col items-center w-[48%] sm:w-auto">
                  <div className="absolute top-0 w-[2px] h-8 bg-secondary/30"></div>
                  <div className="border border-[#C89B53]/30 bg-surface p-3 sm:p-5 w-full sm:w-40 md:w-56 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all mt-8">
                    <div className="font-label-md text-label-md text-[#C89B53] uppercase mb-1 text-xs sm:text-sm">Sekretaris</div>
                    <div className="font-headline-md text-headline-md text-primary text-sm sm:text-base md:text-xl">Aufa Rifqi</div>
                  </div>
                </div>

                {/* Right Branch */}
                <div className="relative flex flex-col items-center w-[48%] sm:w-auto">
                  <div className="absolute top-0 w-[2px] h-8 bg-secondary/30"></div>
                  <div className="border border-[#C89B53]/30 bg-surface p-3 sm:p-5 w-full sm:w-40 md:w-56 text-center rounded-2xl shadow-sm relative z-10 hover:-translate-y-1 hover:shadow-md transition-all mt-8">
                    <div className="font-label-md text-label-md text-[#C89B53] uppercase mb-1 text-xs sm:text-sm">Bendahara</div>
                    <div className="font-headline-md text-headline-md text-primary text-sm sm:text-base md:text-xl">Afkaar Zharif</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 w-full text-on-surface-variant font-body-md">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary"></div>
                <span>Dewan Pembina</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
                <span>Dewan Pengawas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C89B53]"></div>
                <span>Dewan Pengurus</span>
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
