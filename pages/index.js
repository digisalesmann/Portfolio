import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import PortraitRevealHero from "../components/PortraitRevealHero";

/* ── Data ─────────────────────────────────────────── */
const stats = [
  { value: 12,  suffix: "+", label: "Projects Shipped" },
  { value: 3,   suffix: "+", label: "Years Building" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 8,   suffix: "",  label: "Open Source Contributions" },
];

const services = [
  {
    num: "01",
    title: "Web Applications",
    desc: "Full-stack web apps with React, Next.js, and Node.js. Fast, accessible, and production-ready.",
    logos: [
      { name: "React",      src: "/logos/reactnative-original.svg" },
      { name: "Next.js",    src: "/logos/nextjs-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
    ],
  },
  {
    num: "02",
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android with React Native and Flutter. One codebase, native performance.",
    logos: [
      { name: "React Native", src: "/logos/reactnative-original.svg" },
      { name: "Flutter",      src: "/logos/flutter-original.svg" },
      { name: "Dart",         src: "/logos/dart-original.svg" },
      { name: "Firebase",     src: "/logos/firebase-original.svg" },
    ],
  },
  {
    num: "03",
    title: "API & Integrations",
    desc: "Clean REST and GraphQL APIs, payment flows, third-party services, and backend automation.",
    logos: [
      { name: "Express",    src: "/logos/express-original.svg", invert: true },
      { name: "GraphQL",    src: "/logos/graphql-plain.svg" },
      { name: "Supabase",   src: "/logos/supabase-original.svg" },
      { name: "PostgreSQL", src: "/logos/postgresql-original.svg" },
    ],
  },
];

const projects = [
  {
    title: "BitVest",
    category: "Fintech · Web",
    excerpt: "Financial investment platform with real-time portfolio tracking and analytics.",
    image: "/images/bitvest.jpeg",
    link: "https://bitvestapp.com/",
  },
  {
    title: "Koraq",
    category: "AI · Web & App",
    excerpt: "AI-powered business assistant for SMEs, automates workflows and insights.",
    image: "/images/koraq.png",
    link: "https://play.google.com/store/apps/details?id=com.koraq.app.koraq",
  },
  {
    title: "Ace Experience",
    category: "F&B · Web",
    excerpt: "Professional culinary platform connecting chefs to a premium clientele.",
    image: "/images/ace.png",
    link: "https://ace-xperience.vercel.app/",
  },
];

const techIcons = [
  { name: "JavaScript",   src: "/logos/javascript-original.svg" },
  { name: "TypeScript",   src: "/logos/typescript-original.svg" },
  { name: "React",        src: "/logos/reactnative-original.svg" },
  { name: "Next.js",      src: "/logos/nextjs-original.svg" },
  { name: "React Native", src: "/logos/reactnative-original.svg" },
  { name: "Flutter",      src: "/logos/flutter-original.svg" },
  { name: "Dart",         src: "/logos/dart-original.svg" },
  { name: "Tailwind",     src: "/logos/tailwindcss-original.svg" },
  { name: "Node.js",      src: "/logos/nodejs-original.svg" },
  { name: "Express",      src: "/logos/express-original.svg",  invert: true },
  { name: "Python",       src: "/logos/python-original.svg" },
  { name: "Firebase",     src: "/logos/firebase-original.svg" },
  { name: "Supabase",     src: "/logos/supabase-original.svg" },
  { name: "MongoDB",      src: "/logos/mongodb-original.svg" },
  { name: "PostgreSQL",   src: "/logos/postgresql-original.svg" },
  { name: "GitHub",       src: "/logos/github-original.svg",   invert: true },
  { name: "Vercel",       src: "/logos/vercel-original.svg",   invert: true },
];

const marqueeItems = [
  "React", "Next.js", "TypeScript", "React Native", "Flutter",
  "Node.js", "Firebase", "Supabase", "GraphQL", "Tailwind CSS",
  "Python", "MongoDB", "PostgreSQL", "Express", "Vercel",
];

const reelVideos = [
  { src: "/videos/bitvest.mp4",  label: "BitVest" },
  { src: "/videos/koraq.mp4",    label: "Koraq" },
  { src: "/videos/actora.mp4",   label: "Actora Labs" },
  { src: "/videos/medilab.mp4",  label: "MediLab" },
  { src: "/videos/ppay.mp4",     label: "PPAY" },
  { src: "/videos/velau.mp4",    label: "Velau" },
];

/* ── Counter ──────────────────────────────────────── */
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * value));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Reveal ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── VideoCard ────────────────────────────────────── */
function VideoCard({ src, label, num }) {
  return (
    <div className="group relative shrink-0 w-[280px] md:w-[360px] h-[200px] md:h-[240px] rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/[0.08] hover:border-white/25 transition-colors duration-300">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />

      {/* Corner brackets — HUD frame */}
      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-l border-t border-white/25 group-hover:border-white/60 transition-colors duration-300" />
      <span className="absolute top-2.5 right-2.5 w-3 h-3 border-r border-t border-white/25 group-hover:border-white/60 transition-colors duration-300" />
      <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-l border-b border-white/25 group-hover:border-white/60 transition-colors duration-300" />
      <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-r border-b border-white/25 group-hover:border-white/60 transition-colors duration-300" />

      {/* Live indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="font-mono text-[9px] tracking-widest text-white/50 uppercase">Live</span>
      </div>

      {/* Mono technical label */}
      <div className="absolute bottom-3 left-3.5 flex items-baseline gap-2">
        <span className="font-mono text-[10px] text-white/35">{num}</span>
        <span className="text-xs font-medium text-white/75 tracking-wide">{label}</span>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Head>
        <title>Victor Chinagoro: Web &amp; Mobile Developer</title>
        <meta name="description" content="Cross-platform developer building fast, elegant web and mobile apps. Available for remote contracts worldwide." />
        <meta property="og:title" content="Victor Chinagoro: Web & Mobile Developer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@buildwthvictor" />
      </Head>

      <div className="bg-black text-white overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
                className="lg:col-span-7 order-2 lg:order-1">
                <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 max-w-2xl">
                  I Build Web &amp; Mobile<br />
                  <span className="text-white/60">Apps That Ship.</span>
                </h1>

                <p className="text-base md:text-lg text-white/50 max-w-xl mb-10 leading-relaxed">
                  Cross-platform developer with 3+ years building fast, elegant digital products,
                   from fintech dashboards to AI-powered mobile apps.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link href="/projects" className="btn-primary text-sm px-7 py-3.5">View My Work →</Link>
                  <Link href="/contact" className="btn-outline text-sm px-7 py-3.5">Let&apos;s Talk</Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Remote · Nigeria
                  </span>
                  <span>·</span>
                  <span>Open to contracts &amp; full-time remote roles</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.15 }}
                className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                <PortraitRevealHero />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────── */}
        <section className="border-y border-white/[0.07] bg-[#080808]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07]">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.07} className="h-full">
                <div className="bg-[#080808] text-center md:text-left px-6 py-10 md:py-12 h-full">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2 tabular-nums">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-white/35 font-medium uppercase tracking-wider leading-snug">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────── */}
        <section className="py-9 overflow-hidden border-b border-white/[0.04]">
          <div className="flex w-max animate-marquee gap-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-xs font-semibold text-white/20 uppercase tracking-[0.2em] whitespace-nowrap">
                {item}<span className="ml-10 text-white/20">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────── */}
        <section className="py-24 md:py-32">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">What I Build</p>
              <h2 className="section-heading max-w-lg">End-to-End Digital Products</h2>
            </Reveal>

            {/* Separator list — no cards */}
            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {services.map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-center">
                    <span className="text-xs font-mono text-white/40 md:col-span-1">{s.num}</span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white md:col-span-3">{s.title}</h3>
                    <p className="text-white/45 text-sm md:text-base leading-relaxed md:col-span-5">{s.desc}</p>
                    <div className="md:col-span-3 flex items-center gap-4 flex-wrap">
                      {s.logos.map((l) => (
                        <img key={l.name} src={l.src} alt={l.name} title={l.name}
                          className={`w-6 h-6 object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all${l.invert ? " invert" : ""}`} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── VIDEO REEL ───────────────────────────── */}
        <section className="relative py-16 overflow-hidden border-y border-white/[0.05] bg-[#050505]">
          {/* Faint technical grid backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="container mb-8 relative z-10">
            <Reveal className="flex items-end justify-between">
              <div>
                <p className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">Live Work</span>
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Projects in Motion</h2>
              </div>
              <Link href="/projects" className="font-mono text-xs text-white/50 hover:text-white transition-colors font-medium">
                {String(reelVideos.length).padStart(2, "0")} FEEDS →
              </Link>
            </Reveal>
          </div>
          <div className="relative z-10 flex gap-4 mb-4 animate-marquee" style={{ animationDuration: "40s" }}>
            {[...reelVideos, ...reelVideos].map((v, i) => (
              <VideoCard key={i} src={v.src} label={v.label} num={String((i % reelVideos.length) + 1).padStart(2, "0")} />
            ))}
          </div>
          <div className="relative z-10 flex gap-4" style={{ animation: "marquee 50s linear infinite reverse" }}>
            {[...reelVideos.slice().reverse(), ...reelVideos.slice().reverse()].map((v, i) => (
              <VideoCard key={i} src={v.src} label={v.label} num={String(reelVideos.length - (i % reelVideos.length)).padStart(2, "0")} />
            ))}
          </div>
        </section>

        {/* ── FEATURED WORK ────────────────────────── */}
        <section className="py-24 md:py-32">
          <div className="container">
            <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div>
                <p className="section-label mb-4">Selected Work</p>
                <h2 className="section-heading">Projects That Shipped</h2>
              </div>
              <Link href="/projects" className="text-sm text-white/70 hover:text-white transition-colors font-medium whitespace-nowrap">
                View All →
              </Link>
            </Reveal>

            {/* No card borders — just image + text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
              {projects.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.a href={p.link} target={p.link !== "#" ? "_blank" : undefined} rel="noreferrer"
                    whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group flex flex-col gap-4 cursor-pointer">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#111]">
                      <img src={p.image} alt={p.title}
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
                        onError={(e) => { e.target.style.display = "none"; e.target.parentElement.style.background = "linear-gradient(135deg,#1e1040,#0d0d1a)"; }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-medium mb-1.5">{p.category}</p>
                      <h3 className="text-base font-semibold text-white mb-1.5">{p.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{p.excerpt}</p>
                      <span className="inline-block mt-3 text-xs text-white/25 group-hover:text-white transition-colors font-medium">View Project →</span>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ───────────────────────────── */}
        <section className="py-24 md:py-32 bg-[#050505] border-y border-white/[0.05]">
          <div className="container">
            <Reveal className="text-center mb-16">
              <p className="section-label justify-center mb-4">My Stack</p>
              <h2 className="section-heading">Tools I Ship With</h2>
            </Reveal>
            {/* No background boxes — logos only */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
              {techIcons.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.025}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}
                    className="flex flex-col items-center gap-2.5 group cursor-default w-16">
                    <img src={t.src} alt={t.name} className={`w-9 h-9 object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all${t.invert ? " invert" : ""}`} />
                    <span className="text-[10px] text-white/30 font-medium text-center leading-tight group-hover:text-white/60 transition-colors">{t.name}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT TEASER ─────────────────────────── */}
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <Reveal>
                <p className="section-label mb-6">Who I Am</p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-baseline gap-4 border-b border-white/[0.07] pb-6">
                    <span className="text-5xl md:text-6xl font-bold text-white tabular-nums">3+</span>
                    <span className="text-white/40 text-sm">Years of Professional Experience</span>
                  </div>
                  <div className="flex items-baseline gap-4 pb-6">
                    <span className="text-5xl md:text-6xl font-bold text-white tabular-nums">12+</span>
                    <span className="text-white/40 text-sm">Products Shipped Across Platforms</span>
                  </div>
                </div>
                <Link href="/about" className="btn-outline text-sm">More About Me →</Link>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="space-y-5">
                  <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    I&apos;m Victor, a cross-platform developer based in Nigeria, working remotely with
                    clients worldwide. I specialize in web and mobile products that are fast, beautiful,
                    and production-ready.
                  </p>
                  <p className="text-base text-white/40 leading-relaxed">
                    From early-stage startups to established brands, I&apos;ve helped teams ship in fintech,
                    Web3, AI, and consumer apps. Clean code, great UX, shipped on time.
                  </p>
                  <p className="text-sm text-white/30 pt-2">Fintech · Web3 · AI Apps · Cross-Platform · Remote</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="relative py-32 md:py-48 overflow-hidden text-center">
          <div className="planet-arc animate-glow-pulse" />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label justify-center mb-5">Let&apos;s Build Together</p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.05]">
                Ready to Ship Something<span className="text-white/60"> Great?</span>
              </h2>
              <p className="text-white/40 text-base mb-10 max-w-md mx-auto leading-relaxed">
                Available for remote contracts, freelance projects, and full-time opportunities worldwide.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-8 py-4">Hire Me →</Link>
                <Link href="/projects" className="btn-outline text-sm px-8 py-4">See My Work</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
