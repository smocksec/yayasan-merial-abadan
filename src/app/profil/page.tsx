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
          {/* Hierarchy Flow Chart */}
          <div className="border-[4px] md:border-[6px] border-black p-6 md:p-16 bg-white max-w-4xl mx-auto flex flex-col items-center relative font-sans overflow-x-auto overflow-y-hidden shadow-lg">
            <div className="text-center mb-12">
              <h2 className="font-headline-lg text-headline-lg text-black uppercase font-bold mb-2">Struktur Organisasi</h2>
              <h3 className="font-headline-md text-headline-md text-[#4CAF50] uppercase font-bold">Yayasan Merial Abadan</h3>
            </div>

            <div className="min-w-[600px] flex flex-col items-center">
              {/* Ketua Pembina */}
              <div className="border-2 border-[#4CAF50] p-4 w-64 text-center bg-white z-10">
                <div className="text-sm underline mb-1 uppercase text-black font-semibold">Ketua Pembina</div>
                <div className="font-bold text-black uppercase">Fakhrurrazi</div>
              </div>
              
              {/* Anggota Pembina Branch */}
              <div className="flex w-full">
                <div className="w-1/2 border-r-2 border-black relative h-16 md:h-20">
                  <div className="w-8 md:w-12 border-b-2 border-black absolute top-1/2 right-0 translate-x-full"></div>
                </div>
                <div className="w-1/2 flex items-center pl-8 md:pl-12">
                  <div className="border-2 border-[#4CAF50] p-4 w-64 text-center bg-white z-10">
                    <div className="text-sm underline mb-1 uppercase text-black font-semibold">Anggota Pembina</div>
                    <div className="font-bold text-black uppercase">Syarafina</div>
                  </div>
                </div>
              </div>

              {/* Pengawas Branch */}
              <div className="flex w-full">
                <div className="w-1/2 border-r-2 border-black relative h-16 md:h-20">
                  <div className="w-8 md:w-12 border-b-2 border-black absolute top-1/2 right-0 translate-x-full"></div>
                </div>
                <div className="w-1/2 flex items-center pl-8 md:pl-12">
                  <div className="border-2 border-[#2196F3] p-4 w-64 text-center bg-white z-10">
                    <div className="text-sm underline mb-1 uppercase text-black font-semibold">Pengawas</div>
                    <div className="font-bold text-black uppercase">Husaini</div>
                  </div>
                </div>
              </div>

              {/* Vertical Line down to Ketua Pengurus */}
              <div className="flex w-full">
                <div className="w-1/2 border-r-2 border-black h-10"></div>
                <div className="w-1/2"></div>
              </div>

              {/* Ketua Pengurus */}
              <div className="border-2 border-[#FF9800] p-4 w-64 text-center bg-white z-10 relative">
                <div className="text-sm underline mb-1 uppercase text-black font-semibold">Ketua Pengurus</div>
                <div className="font-bold text-black uppercase">Cut Bungsu Rahayu</div>
              </div>

              {/* Wakil Ketua Branch */}
              <div className="flex w-full">
                <div className="w-1/2 border-r-2 border-black relative h-16 md:h-20">
                  <div className="w-8 md:w-12 border-b-2 border-black absolute top-1/2 right-0 translate-x-full"></div>
                </div>
                <div className="w-1/2 flex items-center pl-8 md:pl-12">
                  <div className="border-2 border-[#FF9800] p-4 w-64 text-center bg-white z-10">
                    <div className="text-sm underline mb-1 uppercase text-black font-semibold">Wakil Ketua</div>
                    <div className="font-bold text-black uppercase">Achmad Luthfi</div>
                  </div>
                </div>
              </div>

              {/* Vertical Line down to Horizontal Split */}
              <div className="flex w-full">
                <div className="w-1/2 border-r-2 border-black h-12"></div>
                <div className="w-1/2"></div>
              </div>

              {/* Horizontal Split */}
              <div className="w-[380px] md:w-[460px] border-t-2 border-black flex justify-between relative">
                <div className="w-0.5 h-6 bg-black"></div>
                <div className="w-0.5 h-6 bg-black"></div>
              </div>

              {/* Sekretaris & Bendahara */}
              <div className="w-[380px] md:w-[460px] relative h-28 mt-0">
                <div className="absolute left-0 top-0 border-2 border-[#FF9800] p-4 w-44 md:w-56 text-center bg-white transform -translate-x-1/2">
                  <div className="text-sm underline mb-1 uppercase text-black font-semibold">Sekretaris</div>
                  <div className="font-bold text-black uppercase">Aufa Rifqi</div>
                </div>
                <div className="absolute right-0 top-0 border-2 border-[#FF9800] p-4 w-44 md:w-56 text-center bg-white transform translate-x-1/2">
                  <div className="text-sm underline mb-1 uppercase text-black font-semibold">Bendahara</div>
                  <div className="font-bold text-black uppercase">Afkaar Zharif</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 md:mt-16 w-full max-w-[600px] text-black font-medium text-sm pl-4 md:pl-0">
              <div className="mb-3">Keterangan :</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-4 border-2 border-[#4CAF50] bg-white"></div>
                <span>= Dewan Pembina</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-4 border-2 border-[#2196F3] bg-white"></div>
                <span>= Dewan Pengawas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-4 border-2 border-[#FF9800] bg-white"></div>
                <span>= Dewan Pengurus</span>
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
