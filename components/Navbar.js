"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle"; // 🌗 Import toggle
import Image from "next/image"; // Import Next.js Image component for optimization

// Custom component for the logo with the avatar
const LogoWithAvatar = () => (
  <Link
    href="/"
    className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-gray-100 group transition-colors"
  >
    {/* Avatar */}
    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-indigo-500 transition-colors duration-300">
      <Image
        src="/images/kenny.jpg" // Use your actual avatar path
        alt="Victor's Avatar"
        width={32}
        height={32}
        className="object-cover"
      />
    </div>

    {/* Brand Text */}
    <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
      BuildWithVictor
    </span>
  </Link>
);


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
      className={`fixed top-0 inset-x-0 z-40 border-b transition-all duration-500 ${
        scrolled || open
          ? "bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 backdrop-blur-xl shadow-md h-16"
          : "bg-white/20 dark:bg-gray-900/20 border-transparent backdrop-blur-sm h-20"
      }`}
    >
      <div className="container flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo (Desktop & Mobile Main) - Now uses the custom component */}
        <LogoWithAvatar />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/blog">Articles</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <ThemeToggle /> {/* 🌗 Desktop toggle */}
        </nav>

        {/* Mobile-specific controls: ThemeToggle and Hamburger (NEW/UPDATED) */}
        <div className="flex items-center gap-2 md:hidden">
          {/* 🌗 NEW: Mobile Main Nav Toggle */}
          <ThemeToggle /> 

          {/* Mobile hamburger - removed md:hidden since the parent handles it */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative h-9 w-9 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-gray-900/60 backdrop-blur hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/60"
          >
            <Burger open={open} />
            <span className="sr-only">Menu</span>
          </button>
        </div>
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
                {/* Brand / Logo - Now uses the custom component again */}
                <LogoWithAvatar /> 

                <div className="flex items-center gap-3">
                  {/* 🌗 Mobile toggle (kept here as part of the ham nav for convenience) */}
                  <ThemeToggle />
                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="text-3xl font-light hover:text-indigo-600 transition-colors"
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
                    className="w-full text-center px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:youremail@example.com"
                    className="w-full text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors"
                  >
                    Email
                  </a>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-xs mt-6 text-center">
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
  // Adjusted branding class for hover
  return (
    <Link href={href} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
      {children}
    </Link>
  );
}

function MobileLink({ href, children }) {
  // Adjusted branding class
  return (
    <Link
      href={href}
      className="block rounded-lg px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/60 transition-colors"
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