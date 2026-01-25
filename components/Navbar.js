"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const LogoWithAvatar = () => (
  <Link href="/" className="flex items-center gap-3 group">
    <div className="relative w-8 h-8 border border-white/10 bg-[#111]">
      <Image
        src="/images/kenny.jpg"
        alt="Victor"
        fill
        className="object-cover transition-all duration-700"
      />
      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-indigo-500" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xs font-black tracking-tighter text-white uppercase">Victor.E</span>
      <span className="text-[7px] font-mono text-gray-500 uppercase tracking-[0.2em] mt-1">Welcome</span>
    </div>
  </Link>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when side-menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
      scrolled || open 
        ? "h-14 bg-[#050505]/90 border-b border-white/5 backdrop-blur-md" 
        : "h-20 bg-transparent border-b border-transparent"
    }`}>
      <div className="container h-full px-6 mx-auto flex items-center justify-between">
        <LogoWithAvatar />

        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/projects" num="01" title="Projects" />
          <NavLink href="/blog" num="02" title="Articles" />
          <NavLink href="/about" num="03" title="About" />
          <NavLink href="/contact" num="04" title="Contact" />
          <div className="ml-4 pl-4 border-l border-white/10">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </div>
        </nav>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden relative z-[110] w-8 h-8 flex flex-col justify-center items-end gap-1.5"
        >
          <span className={`h-px bg-white transition-all duration-300 ${open ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <span className={`h-px bg-indigo-500 transition-all duration-300 ${open ? "opacity-0" : "w-4"}`} />
          <span className={`h-px bg-white transition-all duration-300 ${open ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
        </button>
      </div>

      {/* --- MOBILE SIDE PANEL (Restored Previous Version) --- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Side Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-[105] h-screen w-[80%] max-w-[360px] bg-[#050505] border-l border-white/10 p-10 flex flex-col md:hidden"
            >
              <div className="mb-12">
                 <LogoWithAvatar />
              </div>

              <nav className="flex flex-col gap-6">
                <MobileLink href="/projects" num="01">Projects</MobileLink>
                <MobileLink href="/blog" num="02">Articles</MobileLink>
                <MobileLink href="/about" num="03">About</MobileLink>
                <MobileLink href="/contact" num="04">Contact</MobileLink>
              </nav>

              <div className="mt-auto pt-10 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">Connect</p>
                <div className="flex gap-6">
                   <a href="#" className="text-xs hover:text-indigo-500 transition-colors">GitHub</a>
                   <a href="#" className="text-xs hover:text-indigo-500 transition-colors">LinkedIn</a>
                   <a href="#" className="text-xs hover:text-indigo-500 transition-colors">Twitter</a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* --- Sub-components --- */

function NavLink({ href, num, title }) {
  return (
    <Link href={href} className="group flex flex-col px-4 py-1">
      <span className="font-mono text-[8px] text-gray-600 mb-1 group-hover:text-indigo-500 transition-colors">{num}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">{title}</span>
    </Link>
  );
}

function MobileLink({ href, num, children }) {
  return (
    <Link href={href} className="group flex flex-col py-2 border-b border-white/5">
      <span className="font-mono text-[10px] text-indigo-500 mb-1">{num}</span>
      <span className="text-2xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
        {children}
      </span>
    </Link>
  );
}