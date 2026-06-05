"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ROUTES = [
  "/",
  "/profil",
  "/program",
  "/jadwal",
  "/kontak",
  "/register",
  "/login",
  "/pendaftaran",
];

const NO_LAYOUT_ROUTES = [
  "/login",
  "/register",
  "/dashboard",
];

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [direction, setDirection] = useState(1);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      const currentIndex = ROUTES.indexOf(pathname);
      const previousIndex = ROUTES.indexOf(prevPath);
      
      if (currentIndex !== -1 && previousIndex !== -1) {
        setDirection(currentIndex > previousIndex ? 1 : -1);
      } else {
        setDirection(1);
      }
      setPrevPath(pathname);
    }
  }, [pathname, prevPath]);

  const variants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const showLayout = !NO_LAYOUT_ROUTES.some(route => pathname.startsWith(route));

  return (
    <>
      {showLayout && <Navbar />}
      <div className="overflow-x-hidden w-full min-h-screen relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={pathname}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      {showLayout && <Footer />}
    </>
  );
}
