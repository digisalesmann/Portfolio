import Link from "next/link";

const socials = [
  { label: "GitHub",    href: "https://github.com/digisalesmann" },
  { label: "Twitter",   href: "https://x.com/buildwthvictor" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/victor-chinagoro-1a032423a" },
  { label: "Instagram", href: "https://instagram.com/buildwthvictor" },
];

const navLinks = [
  { label: "Work",    href: "/projects" },
  { label: "About",  href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.07] pt-16 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand — wordmark only */}
          <div className="space-y-4">
            <Link href="/" className="flex items-baseline">
              <span className="font-bold text-white text-base tracking-tight">Victor</span>
              <span className="text-violet-400 font-bold text-xl leading-none">.</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Web &amp; mobile developer building fast, elegant cross-platform products for clients worldwide.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              Available for new projects
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Pages</p>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Social</p>
              <ul className="space-y-2.5">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Get in Touch</p>
            <a href="mailto:buildwithvictorhq@gmail.com" className="block text-sm text-white/70 hover:text-violet-400 transition-colors break-all">
              buildwithvictorhq@gmail.com
            </a>
            <a href="tel:+2349037884753" className="block text-sm text-white/40 hover:text-white transition-colors">
              +234 903 788 4753
            </a>
            <Link href="/contact" className="btn-primary text-xs px-5 py-2.5 mt-2 w-fit">
              Start a Project →
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Victor Chinagoro. All rights reserved.</p>
          <p className="text-xs text-white/25">Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
