import Head from "next/head";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

const allProjects = [
  {
    slug: "bitvest-web",
    title: "Bitvest Web",
    category: "Web",
    tags: "Fintech · React · Next.js",
    excerpt: "Financial investment platform with real-time portfolio tracking, analytics dashboards, and secure payment flows.",
    image: "/images/bitvest.jpeg",
    link: "https://bitvestapp.com/",
    year: "2025",
  },
  {
    slug: "actora-labs",
    title: "Actora Labs",
    category: "Web",
    tags: "Web3 · React · Community",
    excerpt: "Coordination platform for Web3 communities, governance tools, task management, and contributor rewards.",
    image: "/images/actoraa.png",
    link: "https://actoralabs.com/",
    year: "2025",
  },
  {
    slug: "medilab",
    title: "MediLab",
    category: "Web",
    tags: "Healthcare · Next.js · Firebase",
    excerpt: "Pharmacy inventory and diagnostic automation platform for clinics and labs.",
    image: "/images/testt.png",
    link: "https://medilab-kappa.vercel.app/",
    year: "2025",
  },
  {
    slug: "monadguard",
    title: "MonadGuard",
    category: "Web",
    tags: "Web3 · Security · React",
    excerpt: "On-chain Sybil detection and wallet analysis tool for the Monad ecosystem.",
    image: "/images/gg.png",
    link: "https://monadguard-cv2w.vercel.app/",
    year: "2025",
  },
  {
    slug: "ace-experience",
    title: "Ace Experience",
    category: "Web",
    tags: "F&B · Next.js · Tailwind",
    excerpt: "Premium culinary platform connecting professional chefs to high-end clientele.",
    image: "/images/ace.png",
    link: "https://ace-xperience.vercel.app/",
    year: "2025",
  },
  {
    slug: "indstr",
    title: "Indstr",
    category: "Web",
    tags: "DeFi · NFT · React",
    excerpt: "Decentralized finance and NFT marketplace with a sleek trading interface.",
    image: "/images/indstr.png",
    link: "#",
    year: "2025",
  },
  {
    slug: "koraq",
    title: "Koraq",
    category: "App",
    tags: "AI · Flutter · SME",
    excerpt: "AI-powered business assistant for SMEs, automates reporting, insights, and client communication.",
    image: "/images/koraq.png",
    link: "https://play.google.com/store/apps/details?id=com.koraq.app.koraq",
    year: "2026",
  },
  {
    slug: "bitvest-app",
    title: "Bitvest App",
    category: "App",
    tags: "Fintech · Flutter · Mobile",
    excerpt: "Mobile investment app with biometric auth, portfolio management, and real-time market data.",
    image: "/images/bitvest.jpeg",
    link: "https://firebasestorage.googleapis.com/v0/b/bitvest-bc688.firebasestorage.app/o/downloads%2FBitvest.apk?alt=media&token=38074188-f4f6-4403-9622-524e9355f59d",
    year: "2025",
  },
  {
    slug: "ppay",
    title: "PPAY",
    category: "App",
    tags: "Payments · Flutter · Cross-Platform",
    excerpt: "Digital payments ecosystem for seamless peer-to-peer transfers and merchant payments.",
    image: "/images/ppay.png",
    link: "#",
    year: "2026",
  },
  {
    slug: "velau",
    title: "Velau",
    category: "App",
    tags: "Trading · Automation · Flutter",
    excerpt: "Automated gold trading engine with algorithmic strategies and live portfolio dashboards.",
    image: "/images/velau.png",
    link: "#",
    year: "2026",
  },
];

const filterTabs = ["All", "Web", "App"];

const IconArrow = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <>
      <Head>
        <title>Projects: Victor Chinagoro</title>
        <meta name="description" content="Web and mobile apps built by Victor Chinagoro. Fintech, Web3, AI, and consumer products." />
      </Head>
      <div className="bg-black text-white min-h-screen">

        {/* ── Header ───────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-violet-600" style={{ top: "-150px", right: "-100px", opacity: 0.2 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label mb-5">My Work</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-5 max-w-3xl leading-[1.05]">
                Products I&apos;ve Shipped
              </h1>
              <p className="text-white/45 text-base md:text-lg max-w-xl leading-relaxed">
                A selection of web and mobile projects across fintech, Web3, AI, and consumer apps.
                Every project is production-ready and built end-to-end.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Filter tabs ──────────────────────────── */}
        <div className="container mb-12">
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === tab
                    ? "bg-violet-500 text-white"
                    : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                {tab}
                <span className={`ml-2 text-xs ${active === tab ? "text-white/70" : "text-white/25"}`}>
                  {tab === "All"
                    ? allProjects.length
                    : allProjects.filter((p) => p.category === tab).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Project list — separator rows ─────────── */}
        <section className="container pb-32">
          <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
            <AnimatePresence mode="wait">
              {filtered.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <motion.div
                    layout
                    className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center group"
                  >
                    {/* Image */}
                    <div className="md:col-span-4 relative rounded-xl overflow-hidden bg-[#111] aspect-video">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                        onError={(e) => {
                          e.target.parentElement.style.background =
                            "linear-gradient(135deg, #1e1040, #0d0d1a)";
                          e.target.remove();
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-6 flex flex-col gap-2.5">
                      <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium">{p.tags}</p>
                      <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">{p.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{p.excerpt}</p>
                    </div>

                    {/* Meta + links */}
                    <div className="md:col-span-2 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
                      <span className="text-xs font-mono text-violet-400">{p.year}</span>
                      <Link
                        href={`/project/${p.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-violet-400 transition-colors font-medium"
                      >
                        Case Study →
                      </Link>
                      {p.link !== "#" && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white transition-colors"
                        >
                          Live <IconArrow />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── Process ──────────────────────────────── */}
        <section className="py-24 md:py-32 bg-[#050505] border-t border-white/[0.05]">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">Process</p>
              <h2 className="section-heading">How I Work</h2>
            </Reveal>

            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {[
                { num: "01", title: "Discovery",       desc: "We align on goals, scope, timeline, and the metrics that matter." },
                { num: "02", title: "Design & Plan",   desc: "Wireframes, architecture decisions, and a clear roadmap before writing a line of code." },
                { num: "03", title: "Build & Iterate", desc: "Agile sprints with weekly check-ins. You see progress early and often." },
                { num: "04", title: "Ship & Support",  desc: "Launch to production, hand off with docs, and stay available post-launch." },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="py-9 md:py-11 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                    <span className="text-xs font-mono text-violet-400 md:col-span-1">{step.num}</span>
                    <h3 className="text-lg font-semibold text-white md:col-span-3">{step.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed md:col-span-8">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="relative py-32 overflow-hidden text-center">
          <div className="planet-arc" style={{ opacity: 0.6 }} />
          <div className="container relative z-10">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                Like What You See?
              </h2>
              <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
                Let&apos;s discuss your project and what we can build together.
              </p>
              <Link href="/contact" className="btn-primary text-sm px-8 py-4">
                Start a Project →
              </Link>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
