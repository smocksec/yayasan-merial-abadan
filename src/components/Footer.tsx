import Link from "next/link";
import Image from "next/image";
import logoYayasan from "../../public/logo-yayasan.jpg";

export default function Footer() {
  return (
    <footer className="w-full py-section-gap px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter bg-primary border-t border-outline-variant md:rounded-t-[3rem] md:mx-4 md:w-[calc(100%-2rem)]">
      <div className="flex flex-col gap-3 items-center md:items-start">
        <Image
          alt="Yayasan Merial Abadan Madani Logo"
          className="h-20 w-auto object-contain invert grayscale contrast-200 opacity-60 mix-blend-screen"
          src={logoYayasan}
        />
        <span className="font-headline-md text-headline-md text-on-primary mt-2">
          Yayasan Merial Abadan Madani
        </span>
        <p className="font-body-md text-body-md text-on-primary/80 text-center md:text-left">
          © 2024 Yayasan Merial Abadan Madani. Menebar Kebaikan, Merawat Peradaban.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-6 md:mt-0 bg-white/5 px-6 py-3 rounded-full">
        <Link
          className="font-label-md text-label-md text-on-primary/80 hover:text-warm-gold transition-colors"
          href="#"
        >
          Kebijakan Privasi
        </Link>
        <Link
          className="font-label-md text-label-md text-on-primary/80 hover:text-warm-gold transition-colors"
          href="#"
        >
          Syarat &amp; Ketentuan
        </Link>
        <Link
          className="font-label-md text-label-md text-on-primary/80 hover:text-warm-gold transition-colors"
          href="#"
        >
          Peta Situs
        </Link>
      </div>
    </footer>
  );
}
