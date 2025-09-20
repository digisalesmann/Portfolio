import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle"; // 🌗 Import toggle

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const panelRef = useRef(null);

  // solidify on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => {
    const handle = () => setOpen(false);
    router.events.on("routeChangeStart", handle);
    return () => router.events.off("routeChangeStart", handle);
  }, [router.events]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ${
        scrolled || open
          ? "bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 backdrop-blur-xl shadow-md h-16"
          : "bg-white/20 dark:bg-gray-900/20 border-transparent backdrop-blur-sm h-20"
      }`}
    >
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg bg-gradient-to-r from-brand to-pink-500 bg-clip-text text-transparent"
        >
          BuildWithVictor
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/blog">Articles</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <ThemeToggle /> {/* 🌗 Desktop toggle */}
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-9 w-9 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-gray-900/60 backdrop-blur hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
        >
          <Burger open={open} />
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {/* Mobile overlay + panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              ref={panelRef}
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed right-0 top-0 z-50 h-dvh w-[86%] sm:w-[420px] 
                        bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 flex flex-col"
            >
              {/* Top header strip */}
              <div className="flex items-center justify-between h-14 px-6 border-b border-gray-200 dark:border-gray-700">
                {/* Brand / Logo */}
                <Link
                  href="/"
                  className="font-bold text-lg bg-gradient-to-r from-brand to-pink-500 bg-clip-text text-transparent"
                >
                  BuildWithVictor
                </Link>

                <div className="flex items-center gap-3">
                  {/* 🌗 Mobile toggle */}
                  <ThemeToggle />
                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="text-3xl font-light hover:text-brand transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 text-lg p-6">
                <MobileLink href="/projects">Projects</MobileLink>
                <MobileLink href="/blog">Articles</MobileLink>
                <MobileLink href="/about">About</MobileLink>
                <MobileLink href="/contact">Contact</MobileLink>
              </nav>

              {/* CTA Buttons */}
              <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/digisalesmann"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline text-center"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:youremail@example.com"
                    className="btn-primary text-center"
                  >
                    Email
                  </a>
                </div>

                <p className="muted text-xs mt-6 text-center">
                  © {new Date().getFullYear()} BuildWithVictor
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- helpers ---------- */

function NavLink({ href, children }) {
  return (
    <Link href={href} className="hover:text-brand transition-colors">
      {children}
    </Link>
  );
}

function MobileLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
    >
      {children}
    </Link>
  );
}

// animated burger -> close icon
function Burger({ open }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center text-gray-900 dark:text-gray-100"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <motion.path
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            closed: { d: "M3 6h18" },
            open: { d: "M6 6l12 12" },
          }}
        />
        <motion.path
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          d="M3 12h18"
        />
        <motion.path
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            closed: { d: "M3 18h18" },
            open: { d: "M6 18L18 6" },
          }}
        />
      </svg>
    </div>
  );
}