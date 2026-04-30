import Head from "next/head";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const timeline = [
  {
    year: "2026",
    title: "Senior Freelance Developer",
    company: "Remote. Worldwide",
    desc: "Working with global clients on high-impact web and mobile products. Specializing in fintech, Web3, and AI-powered apps.",
  },
  {
    year: "2025",
    title: "Full-Stack Developer",
    company: "Contract Projects",
    desc: "Delivered 6+ production apps including Bitvest, Koraq, and PPAY. React Native for cross-platform mobile, Next.js for web.",
  },
  {
    year: "2024",
    title: "Frontend Developer",
    company: "Freelance",
    desc: "Built responsive web applications for startups. Deepened expertise in React ecosystems, animation, and UX-driven development.",
  },
  {
    year: "2023",
    title: "Started Professional Development",
    company: "Self-taught + Bootcamp",
    desc: "Transitioned into professional software development. Built first production projects and established a workflow with modern tooling.",
  },
];

const values = [
  {
    num: "01",
    title: "Clarity Over Complexity",
    desc: "I build things that are easy to understand, maintain, and extend. Simple systems outlast clever ones.",
  },
  {
    num: "02",
    title: "Ship, Then Improve",
    desc: "I believe in getting to production fast, learning from real users, and iterating with purpose.",
  },
  {
    num: "03",
    title: "Client Partnership",
    desc: "I treat every project as a collaboration. Clear communication, honest feedback, and shared ownership.",
  },
];

const techStack = [
  { name: "JavaScript",   src: "/logos/javascript-original.svg" },
  { name: "TypeScript",   src: "/logos/typescript-original.svg" },
  { name: "React",        src: "/logos/reactnative-original.svg" },
  { name: "Next.js",      src: "/logos/nextjs-original.svg" },
  { name: "React Native", src: "/logos/reactnative-original.svg" },
  { name: "Flutter",      src: "/logos/flutter-original.svg" },
  { name: "Dart",         src: "/logos/dart-original.svg" },
  { name: "Tailwind",     src: "/logos/tailwindcss-original.svg" },
  { name: "Node.js",      src: "/logos/nodejs-original.svg" },
  { name: "Express",      src: "/logos/express-original.svg" },
  { name: "Python",       src: "/logos/python-original.svg" },
  { name: "Firebase",     src: "/logos/firebase-original.svg" },
  { name: "Supabase",     src: "/logos/supabase-original.svg" },
  { name: "MongoDB",      src: "/logos/mongodb-original.svg" },
  { name: "PostgreSQL",   src: "/logos/postgresql-original.svg" },
  { name: "GitHub",       src: "/logos/github-original.svg" },
  { name: "Vercel",       src: "/logos/vercel-original.svg" },
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <Head>
        <title>About: Victor Chinagoro</title>
        <meta name="description" content="Victor Chinagoro is a cross-platform web and mobile developer based in Nigeria, working remotely with clients worldwide." />
      </Head>
      <div className="bg-black text-white min-h-screen">

        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="orb w-[600px] h-[600px] bg-violet-600" style={{ top: "-200px", left: "-200px", opacity: 0.15 }} />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
              <Reveal>
                <p className="section-label mb-5">About Me</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 leading-[1.05]">
                  Victor Chinagoro
                </h1>
                <p className="text-violet-400 text-base font-medium mb-7">
                  Web &amp; Mobile Developer · Cross-Platform
                </p>
                <p className="text-white/55 text-base leading-relaxed mb-5">
                  Cross-platform developer based in Nigeria, working remotely with clients across
                  Africa, Europe, and North America. I build web and mobile products from concept
                  to deployment. Fast, clean, and built to last.
                </p>
                <p className="text-white/40 text-base leading-relaxed mb-8">
                  My background spans fintech, Web3, AI-powered apps, and consumer software. I care
                  about user experience, performance, and code that other developers enjoy working with.
                </p>
                <p className="text-sm text-white/25 mb-8">Fintech · Web3 · AI Apps · Cross-Platform · Remote</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary text-sm">Hire Me →</Link>
                  <a href="https://github.com/digisalesmann" target="_blank" rel="noreferrer" className="btn-outline text-sm">GitHub</a>
                </div>
              </Reveal>

              {/* Photo — no badge, no decoration */}
              <Reveal delay={0.15}>
                <div className="relative mx-auto md:mx-0 w-64 md:w-full max-w-sm">
                  <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] aspect-[4/5] bg-[#111]">
                    <Image src="/images/kenny.jpg" alt="Victor Chinagoro" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  {/* Available badge — clean, no V */}
                  <div className="absolute -bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-white/60 font-medium">Available for projects</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Values ──────────────────────────────── */}
        <section className="py-24 bg-[#050505] border-y border-white/[0.05]">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">How I Think</p>
              <h2 className="section-heading">My Working Values</h2>
            </Reveal>

            {/* Separator list — no cards */}
            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="py-9 md:py-11 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                    <span className="text-xs font-mono text-violet-400 md:col-span-1">{v.num}</span>
                    <h3 className="text-lg md:text-xl font-semibold text-white md:col-span-4">{v.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed md:col-span-7">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ──────────────────────────── */}
        <section className="py-24 md:py-32">
          <div className="container">
            <Reveal className="mb-16">
              <p className="section-label mb-4">Toolkit</p>
              <h2 className="section-heading">Technologies I Work With</h2>
            </Reveal>

            {/* No background boxes */}
            <div className="flex flex-wrap gap-x-8 gap-y-10">
              {techStack.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.03}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}
                    className="flex flex-col items-center gap-2.5 group cursor-default w-16">
                    <img src={t.src} alt={t.name} className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[10px] text-white/30 font-medium text-center leading-tight group-hover:text-white/60 transition-colors">{t.name}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ────────────────────────────── */}
        <section className="py-24 md:py-32 bg-[#050505] border-t border-white/[0.05]">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">Experience</p>
              <h2 className="section-heading">My Journey</h2>
            </Reveal>

            {/* Clean separator list */}
            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="py-9 md:py-11 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                    <span className="text-xs font-mono text-violet-400 md:col-span-2">{item.year}</span>
                    <div className="md:col-span-4">
                      <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-white/30">{item.company}</p>
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed md:col-span-6">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────── */}
        <section className="relative py-32 overflow-hidden text-center">
          <div className="planet-arc" style={{ opacity: 0.5 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label justify-center mb-5">Work Together</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                Let&apos;s Build Something<span className="text-violet-400"> Great</span>
              </h2>
              <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
                Available for remote contracts, freelance work, and full-time opportunities worldwide.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-8 py-4">Get in Touch →</Link>
                <Link href="/projects" className="btn-outline text-sm px-8 py-4">View My Work</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
