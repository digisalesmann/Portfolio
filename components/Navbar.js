import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/projects",  label: "Work" },
  { href: "/services",  label: "Services" },
  { href: "/about",     label: "About" },
  { href: "/contact",   label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [router.asPath]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled || open
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container h-16 flex items-center justify-between">
        {/* Wordmark only — no icon */}
        <Link href="/" className="flex items-baseline group">
          <span className="font-bold text-white text-base tracking-tight">Victor</span>
          <span className="text-violet-400 font-bold text-xl leading-none">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                router.pathname === l.href
                  ? "text-white bg-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-white/40">
            Available
          </span>
          <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
            Hire Me
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden z-[110] w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
        >
          <span className={`w-5 h-[1.5px] bg-white origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`w-5 h-[1.5px] bg-white origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 z-[105] h-screen w-[75vw] max-w-[320px] bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col p-8 md:hidden"
            >
              <div className="mb-10">
                <Link href="/" className="flex items-baseline">
                  <span className="font-bold text-white text-base">Victor</span>
                  <span className="text-violet-400 font-bold text-xl leading-none">.</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    <Link href={l.href} className="block py-3 px-4 rounded-xl text-xl font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-white/[0.06] space-y-4">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  Available for new projects
                </div>
                <Link href="/contact" className="btn-primary w-full text-sm justify-center">Let&apos;s Talk</Link>
                <div className="flex gap-5 pt-2">
                  <a href="https://github.com/digisalesmann" target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white transition-colors">GitHub</a>
                  <a href="https://x.com/buildwthvictor" target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white transition-colors">Twitter</a>
                  <a href="https://linkedin.com/in/victor-chinagoro-1a032423a" target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
