"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const programUnggulan = [
  { title: "Pendidik Berkompeten", desc: "Setiap kelas dibersamai oleh 2 Guru sekaligus (Wali Kelas Sarjana PAUD & Guru Pendamping Sarjana Psikologi).", icon: "school" },
  { title: "Bimbel Gratis", desc: "Khusus bagi siswa yang mengambil program Full Day.", icon: "local_library" },
  { title: "Pembiasaan Akhlakul Mulia", desc: "Menanamkan nilai karakter Islami sejak dini.", icon: "favorite" },
  { title: "Tahfiz, Hadits & Do'a Harian", desc: "Hafalan rutin dan pembentukan kebiasaan spiritual harian.", icon: "menu_book" },
  { title: "Program Bahasa Arab & Inggris", desc: "Pengenalan bahasa internasional secara aktif dan interaktif.", icon: "language" },
  { title: "Metode Montessori", desc: "Stimulasi aspek Sensorik & Motorik anak secara optimal.", icon: "extension" },
  { title: "2027 Go Cambridge Curriculum", desc: "Persiapan matang menuju kurikulum berstandar internasional.", icon: "public" },
  { title: "Kegiatan Islami Praktis", desc: "Pelatihan Sholat, Mengaji, dasar Muamalah, serta Manasik Haji.", icon: "mosque" },
  { title: "Persiapan Masuk SD Unggulan", desc: "Program khusus kesiapan akademik, mental, dan kemandirian anak.", icon: "emoji_events" },
  { title: "Outing Class", desc: "Kegiatan pembelajaran kontekstual langsung di luar lingkungan sekolah.", icon: "nature_people" },
  { title: "Market Day", desc: "Menumbuhkan kreativitas dan jiwa kewirausahaan sejak dini.", icon: "storefront" },
  { title: "Cooking Class", desc: "Melatih kemandirian, motorik halus, dan kerja sama tim.", icon: "restaurant" },
  { title: "Ekstrakurikuler Pilihan", desc: "Olahraga sunnah yang sangat diminati yaitu Memanah & Berenang.", icon: "pool" },
];

export default function PaudTkLanding() {
  return (
    <>
      {/* Navbar/Header Specific to PAUD TK */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-[#F0F6F5] py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#172E40] rounded-full flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-headline-sm text-headline-sm text-[#172E40]">Merial Abadan</span>
        </div>
        <Link href="/program">
          <button className="flex items-center gap-2 font-label-md text-label-md text-[#172E40] hover:text-[#C89B53] transition-colors font-bold">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Portal Yayasan
          </button>
        </Link>
      </nav>

      <main className="pt-24 pb-16 bg-[#F0F6F5] min-h-screen relative overflow-hidden">
        {/* Full Page Doodle Background */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
          style={{ 
            backgroundImage: `url('/doodle-bg-kids.png')`,
            backgroundSize: '600px 600px',
            backgroundRepeat: 'repeat'
          }}
        ></div>

        {/* Random Running Children Background Animation */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Child 1: Boy running left to right, top area */}
          <motion.div
            className="absolute top-[15%] opacity-30"
            initial={{ x: "-10vw", y: 0 }}
            animate={{ x: "110vw", y: [0, -15, 10, -5, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 2 }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="overflow-visible">
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="45; -45; 45" dur="0.6s" repeatCount="indefinite" />
                  <path d="M0 0 L-10 12 L-5 20" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-50; 50; -50" dur="0.6s" repeatCount="indefinite" />
                  <path d="M0 0 L-8 12 L-12 20" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <path d="M30 28 L30 48" stroke="#4A7C7A" strokeWidth="8" strokeLinecap="round"/>
              <g transform="translate(30, 20)">
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.3s" repeatCount="indefinite" />
                  <circle cx="0" cy="0" r="10" fill="#FFE4E6" stroke="#4A7C7A" strokeWidth="4"/>
                  <path d="M-12 -2 Q0 -15 12 -2 Z" fill="#172E40" />
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="50; -50; 50" dur="0.6s" repeatCount="indefinite" />
                  <path d="M0 0 L8 12 L2 20" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-45; 45; -45" dur="0.6s" repeatCount="indefinite" />
                  <path d="M0 0 L10 12 L15 5" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
            </svg>
          </motion.div>

          {/* Child 2: Girl running right to left, middle area */}
          <motion.div
            className="absolute top-[45%] opacity-30"
            initial={{ x: "110vw", scaleX: -1, y: 0 }}
            animate={{ x: "-10vw", scaleX: -1, y: [0, 20, -10, 15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 0 }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="overflow-visible">
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="40; -40; 40" dur="0.5s" repeatCount="indefinite" />
                  <path d="M0 0 L-10 12 L-5 20" stroke="#F87171" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-45; 45; -45" dur="0.5s" repeatCount="indefinite" />
                  <path d="M0 0 L-8 12 L-12 20" stroke="#F87171" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 20)">
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.25s" repeatCount="indefinite" />
                  <path d="M0 8 L-10 30 L10 30 Z" fill="#FECACA" stroke="#F87171" strokeWidth="4" strokeLinejoin="round"/>
                  <circle cx="0" cy="0" r="10" fill="#FFE4E6" stroke="#F87171" strokeWidth="4"/>
                  <path d="M-12 0 Q0 -12 12 0 Q14 10 0 14 Q-14 10 -12 0 Z" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="3"/>
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="45; -45; 45" dur="0.5s" repeatCount="indefinite" />
                  <path d="M0 0 L8 12 L2 20" stroke="#F87171" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-40; 40; -40" dur="0.5s" repeatCount="indefinite" />
                  <path d="M0 0 L10 12 L15 5" stroke="#F87171" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
            </svg>
          </motion.div>

          {/* Child 3: Boy running left to right, bottom area */}
          <motion.div
            className="absolute bottom-[25%] opacity-30"
            initial={{ x: "-20vw", y: 0 }}
            animate={{ x: "120vw", y: [0, -15, 15, -10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 8 }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="overflow-visible">
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="45; -45; 45" dur="0.7s" repeatCount="indefinite" />
                  <path d="M0 0 L-10 12 L-5 20" stroke="#C89B53" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-50; 50; -50" dur="0.7s" repeatCount="indefinite" />
                  <path d="M0 0 L-8 12 L-12 20" stroke="#C89B53" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <path d="M30 28 L30 48" stroke="#C89B53" strokeWidth="8" strokeLinecap="round"/>
              <g transform="translate(30, 20)">
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.35s" repeatCount="indefinite" />
                  <circle cx="0" cy="0" r="10" fill="#FFE4E6" stroke="#C89B53" strokeWidth="4"/>
                  <path d="M-12 -2 Q0 -15 12 -2 Z" fill="#172E40" />
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="50; -50; 50" dur="0.7s" repeatCount="indefinite" />
                  <path d="M0 0 L8 12 L2 20" stroke="#C89B53" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-45; 45; -45" dur="0.7s" repeatCount="indefinite" />
                  <path d="M0 0 L10 12 L15 5" stroke="#C89B53" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
            </svg>
          </motion.div>

          {/* Child 4: Girl running right to left, lower bottom */}
          <motion.div
            className="absolute bottom-[10%] opacity-30"
            initial={{ x: "120vw", scaleX: -1, y: 0 }}
            animate={{ x: "-20vw", scaleX: -1, y: [0, 15, -15, 10, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="overflow-visible">
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="40; -40; 40" dur="0.8s" repeatCount="indefinite" />
                  <path d="M0 0 L-10 12 L-5 20" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-45; 45; -45" dur="0.8s" repeatCount="indefinite" />
                  <path d="M0 0 L-8 12 L-12 20" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 20)">
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.4s" repeatCount="indefinite" />
                  <path d="M0 8 L-10 30 L10 30 Z" fill="#A7F3D0" stroke="#4A7C7A" strokeWidth="4" strokeLinejoin="round"/>
                  <circle cx="0" cy="0" r="10" fill="#FFE4E6" stroke="#4A7C7A" strokeWidth="4"/>
                  <path d="M-12 0 Q0 -12 12 0 Q14 10 0 14 Q-14 10 -12 0 Z" fill="#FDE68A" stroke="#C89B53" strokeWidth="3"/>
                </g>
              </g>
              <g transform="translate(30, 48)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="45; -45; 45" dur="0.8s" repeatCount="indefinite" />
                  <path d="M0 0 L8 12 L2 20" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(30, 32)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-40; 40; -40" dur="0.8s" repeatCount="indefinite" />
                  <path d="M0 0 L10 12 L15 5" stroke="#4A7C7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16 relative z-10">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(23,46,64,0.1)] group">
            <div className="w-full h-[500px] relative">
              <Image 
                src="/paud_tk_islami_hero.png" 
                alt="Anak-anak PAUD & TK islami belajar ceria" 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#172E40]/80 via-[#172E40]/50 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-[#C89B53]/20 text-[#C89B53] rounded-full font-label-sm font-bold tracking-wide uppercase mb-4 w-max backdrop-blur-sm border border-[#C89B53]/30">Pendidikan Usia Dini</span>
              <h1 className="font-headline-xl text-[40px] md:text-[56px] leading-tight text-white mb-6 font-bold">
                Bermain, Belajar, dan Tumbuh Ceria
              </h1>
              <p className="font-body-lg text-body-lg text-white/90 mb-8 max-w-xl">
                Membangun pondasi karakter dan kecerdasan anak di lingkungan yang Islami, hangat, dan penuh kasih sayang.
              </p>
              <div className="flex gap-4">
                <Link href="/pendaftaran">
                  <button className="px-8 py-3.5 bg-[#C89B53] text-white font-label-lg font-bold rounded-full hover:bg-[#b08544] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300">
                    Daftar Sekarang
                  </button>
                </Link>
                <button className="px-8 py-3.5 bg-white text-[#172E40] font-label-lg font-bold rounded-full hover:bg-[#F0F6F5] transition-colors shadow-md hover:shadow-lg">
                  Lihat Galeri
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Pillars */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 mb-20 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-[#172E40] mb-4">Mengapa Memilih Kami?</h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Kami berdedikasi memberikan lingkungan belajar terbaik yang menggabungkan nilai-nilai agama dan kreativitas anak.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-[#F0F6F5] hover:border-[#4A7C7A] transition-colors text-center group"
            >
              <div className="w-16 h-16 bg-[#4A7C7A]/10 text-[#4A7C7A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">favorite</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#172E40] mb-3">Lingkungan Penuh Kasih</h3>
              <p className="font-body-md text-on-surface-variant">
                Guru yang penyayang dan berpengalaman dalam memahami psikologi dan tumbuh kembang anak usia dini.
              </p>
            </motion.div>
            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-[#F0F6F5] hover:border-[#C89B53] transition-colors text-center group"
            >
              <div className="w-16 h-16 bg-[#C89B53]/10 text-[#C89B53] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">extension</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#172E40] mb-3">Belajar Sambil Bermain</h3>
              <p className="font-body-md text-on-surface-variant">
                Kurikulum interaktif yang menstimulasi motorik, kognitif, dan kreativitas melalui permainan edukatif.
              </p>
            </motion.div>
            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(23,46,64,0.05)] border border-[#F0F6F5] hover:border-[#172E40] transition-colors text-center group"
            >
              <div className="w-16 h-16 bg-[#172E40]/10 text-[#172E40] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#172E40] mb-3">Pendidikan Karakter Islami</h3>
              <p className="font-body-md text-on-surface-variant">
                Pengenalan huruf hijaiyah, doa harian, dan pembiasaan adab Islami sejak dini secara menyenangkan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Program Unggulan Section */}
        <section className="relative py-24 mb-20 z-10">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-white/60 text-[#C89B53] rounded-full font-label-sm font-bold tracking-wide uppercase mb-4 shadow-sm border border-[#C89B53]/20">Program Unggulan</span>
              <h2 className="font-headline-lg text-headline-lg text-[#172E40] mb-4">Langkah Awal Menuju <span className="text-[#C89B53]">Prestasi Gemilang</span></h2>
              <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Kami merancang program khusus yang menyeimbangkan kemampuan akademik, keterampilan hidup, dan spiritualitas anak sejak dini dengan pendekatan yang menyenangkan.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {programUnggulan.map((program, index) => {
                // Strategic Marketing Colors: High readability, vibrant icons, engaging hover states
                const themeIndex = index % 3;
                
                let cardBorder, iconBg, iconColor, titleHover, shadowColor;
                
                if (themeIndex === 0) { // Soft Mint Focus
                  cardBorder = 'border-[#4A7C7A]/20 hover:border-[#4A7C7A]';
                  iconBg = 'bg-[#4A7C7A]';
                  iconColor = 'text-white';
                  titleHover = 'group-hover:text-[#4A7C7A]';
                  shadowColor = 'hover:shadow-[#4A7C7A]/20';
                } else if (themeIndex === 1) { // Warm Gold Focus
                  cardBorder = 'border-[#C89B53]/20 hover:border-[#C89B53]';
                  iconBg = 'bg-[#C89B53]';
                  iconColor = 'text-white';
                  titleHover = 'group-hover:text-[#C89B53]';
                  shadowColor = 'hover:shadow-[#C89B53]/20';
                } else { // Deep Blue Focus
                  cardBorder = 'border-[#172E40]/15 hover:border-[#172E40]';
                  iconBg = 'bg-[#172E40]';
                  iconColor = 'text-white';
                  titleHover = 'group-hover:text-[#172E40]';
                  shadowColor = 'hover:shadow-[#172E40]/20';
                }

                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                    className={`bg-white/90 backdrop-blur-sm p-6 rounded-[28px] border-2 ${cardBorder} shadow-[0_4px_15px_rgba(23,46,64,0.03)] ${shadowColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col`}
                  >
                    <div className={`w-14 h-14 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 rotate-[-3deg] group-hover:rotate-0 shadow-md`}>
                      <span className="material-symbols-outlined text-[28px]">{program.icon}</span>
                    </div>
                    <h3 className={`text-xl font-extrabold text-[#172E40] mb-3 leading-tight ${titleHover} transition-colors`}>{program.title}</h3>
                    <p className={`text-base font-medium text-[#172E40]/80 leading-relaxed`}>
                      {program.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Info Waktu Belajar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#C89B53]/20 shadow-[0_8px_30px_rgba(23,46,64,0.04)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C89B53]/10 rounded-full blur-2xl"></div>
              <div className="flex-1 relative z-10">
                <h3 className="font-headline-sm text-2xl font-bold text-[#172E40] mb-2">Pilihan Waktu Belajar</h3>
                <p className="font-body-md text-[#172E40]/80">Sesuaikan jadwal pendidikan anak dengan kebutuhan keluarga Anda.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full relative z-10">
                <div className="flex-1 bg-[#F0F6F5] rounded-2xl p-5 border border-[#4A7C7A]/30 hover:border-[#4A7C7A] transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#4A7C7A]">routine</span>
                    <span className="font-label-lg font-bold text-[#172E40]">Half Day</span>
                  </div>
                  <p className="font-body-sm text-[#172E40]/70">Setengah Hari</p>
                  <p className="font-title-md font-bold text-[#4A7C7A] mt-2">07:30 – 12:00 WIB</p>
                </div>
                <div className="flex-1 bg-[#F0F6F5] rounded-2xl p-5 border border-[#C89B53]/30 hover:border-[#C89B53] transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#C89B53]">today</span>
                    <span className="font-label-lg font-bold text-[#172E40]">Full Day</span>
                  </div>
                  <p className="font-body-sm text-[#172E40]/70">Sehari Penuh</p>
                  <p className="font-title-md font-bold text-[#C89B53] mt-2">07:30 – 17:00 WIB</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-[#172E40] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-white mb-4">Mari Bergabung Bersama Kami!</h2>
              <p className="font-body-lg text-white/80 mb-8 max-w-xl mx-auto">
                Pendaftaran siswa baru tahun ajaran 2024/2025 telah dibuka. Segera amankan kursi untuk si kecil!
              </p>
              <Link href="/pendaftaran">
                <button className="px-10 py-4 bg-[#C89B53] text-white font-label-lg font-bold rounded-full hover:bg-[#b08544] transition-all shadow-[0_4px_15px_rgba(200,155,83,0.4)] hover:shadow-[0_6px_20px_rgba(200,155,83,0.6)] hover:-translate-y-1">
                  Mulai Pendaftaran Online
                </button>
              </Link>
            </div>
            {/* Decorative background circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C89B53]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4A7C7A]/30 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </section>
      </main>
    </>
  );
}
