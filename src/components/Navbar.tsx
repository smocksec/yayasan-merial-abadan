"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../public/logo-yayasan.jpg";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    // For hash links, they are never "active" in the same way as a full route
    const isActive = path === "/" ? pathname === path : pathname?.startsWith(path) && path.length > 1;

    return `relative pb-1 font-label-md text-label-md font-medium transition-colors duration-300 ${isActive ? "text-secondary" : "text-on-surface-variant hover:text-secondary"
      } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
      }`;
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = path === "/" ? pathname === path : pathname?.startsWith(path) && path.length > 1;
    return `block py-3 font-label-md text-label-md font-medium border-b border-outline-variant/30 ${isActive ? "text-secondary font-bold" : "text-on-surface-variant"}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-margin-desktop py-4 max-w-[1280px] mx-auto bg-surface/95 backdrop-blur-md shadow-[0_4px_30px_rgba(23,46,64,0.08)] transition-all rounded-b-3xl md:mt-2 md:w-[calc(100%-2rem)] md:left-1/2 md:-translate-x-1/2">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image
            alt="Yayasan Merial Abadan Madani Logo"
            className="h-12 w-auto object-contain mix-blend-multiply"
            src={logoYayasan}
          />
          <span className="hidden md:block font-headline-md text-headline-md font-bold text-primary">
            Yayasan Merial Abadan Madani
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link className={getLinkClass("/")} href="/">
            Home
          </Link>
          <Link className={getLinkClass("/profil")} href="/profil">
            Profil
          </Link>
          <Link className={getLinkClass("/program")} href="/program">
            Program
          </Link>
          <Link className={getLinkClass("/jadwal")} href="/jadwal">
            Jadwal
          </Link>
          <Link className={getLinkClass("/kontak")} href="/kontak">
            Kontak
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block font-label-md text-label-md font-bold text-primary hover:text-secondary transition-colors">
            Masuk
          </Link>
          <Link href="/register">
            <button className="bg-[#C89B53] text-white font-label-md text-label-md px-6 py-2 rounded-full font-bold hover:opacity-90 shadow-md transition-all">
              Daftar
            </button>
          </Link>
          <button 
            className="md:hidden ml-2 text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface-container-lowest shadow-lg flex flex-col md:hidden py-4 px-6 border-t border-outline-variant mt-2 rounded-b-2xl">
          <Link className={getMobileLinkClass("/")} href="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link className={getMobileLinkClass("/profil")} href="/profil" onClick={() => setIsMobileMenuOpen(false)}>
            Profil
          </Link>
          <Link className={getMobileLinkClass("/program")} href="/program" onClick={() => setIsMobileMenuOpen(false)}>
            Program
          </Link>
          <Link className={getMobileLinkClass("/jadwal")} href="/jadwal" onClick={() => setIsMobileMenuOpen(false)}>
            Jadwal
          </Link>
          <Link className={getMobileLinkClass("/kontak")} href="/kontak" onClick={() => setIsMobileMenuOpen(false)}>
            Kontak
          </Link>
          <Link href="/login" className="block py-3 font-label-md text-label-md font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
            Masuk
          </Link>
        </div>
      )}
    </nav>
  );
}
