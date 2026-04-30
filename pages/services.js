import Head from "next/head";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Applications",
    desc: "Full-stack web apps built for scale, SaaS platforms, dashboards, fintech tools, and consumer products. From architecture to deployment, delivered fast and production-ready.",
    includes: ["UI/UX Implementation", "REST & GraphQL APIs", "Auth & Payments", "Deployment & CI/CD"],
    logos: [
      { name: "Next.js",    src: "/logos/nextjs-original.svg" },
      { name: "React",      src: "/logos/reactnative-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
    ],
  },
  {
    num: "02",
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android apps with React Native and Flutter. One codebase, native performance, and a refined user experience on every device.",
    includes: ["iOS & Android", "App Store Submission", "Biometric Auth", "Push Notifications"],
    logos: [
      { name: "React Native", src: "/logos/reactnative-original.svg" },
      { name: "Flutter",      src: "/logos/flutter-original.svg" },
      { name: "Dart",         src: "/logos/dart-original.svg" },
      { name: "Firebase",     src: "/logos/firebase-original.svg" },
    ],
  },
  {
    num: "03",
    title: "API & Backend",
    desc: "Scalable backend systems, clean REST and GraphQL APIs, payment flows, third-party integrations, and cloud-hosted databases built for reliability.",
    includes: ["API Design", "Payment Integration", "Database Architecture", "Third-Party APIs"],
    logos: [
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
      { name: "Python",     src: "/logos/python-original.svg" },
      { name: "PostgreSQL", src: "/logos/postgresql-original.svg" },
      { name: "Supabase",   src: "/logos/supabase-original.svg" },
    ],
  },
  {
    num: "04",
    title: "Fintech, Web3 & AI",
    desc: "Specialist products in high-complexity verticals. Investment platforms, digital wallets, DeFi tools, Sybil detection, and AI-powered product features built with domain expertise.",
    includes: ["Payment Systems", "Smart Contracts", "AI Integrations", "On-Chain Analytics"],
    logos: [
      { name: "Firebase",   src: "/logos/firebase-original.svg" },
      { name: "Supabase",   src: "/logos/supabase-original.svg" },
      { name: "Python",     src: "/logos/python-original.svg" },
      { name: "MongoDB",    src: "/logos/mongodb-original.svg" },
    ],
  },
];

const engagements = [
  {
    num: "01",
    title: "Fixed-Price Project",
    desc: "Defined scope, clear timeline, single delivery. Best for MVPs, new products, and well-scoped feature builds. You get a full proposal with timeline and cost before any work begins.",
  },
  {
    num: "02",
    title: "Ongoing Retainer",
    desc: "A set block of hours per month for continuous development, feature additions, or maintenance. Best for teams that need a reliable developer without hiring full-time.",
  },
  {
    num: "03",
    title: "Technical Consulting",
    desc: "Architecture reviews, code audits, technical strategy, or helping you evaluate a stack. Billed hourly. No long-term commitment required.",
  },
];

const differentiators = [
  {
    num: "01",
    title: "Full-Stack, Cross-Platform",
    desc: "I cover the entire stack, web, mobile, and backend. You don't need to coordinate between multiple specialists to ship a complete product.",
  },
  {
    num: "02",
    title: "Specialist Verticals",
    desc: "Deep experience in fintech, Web3, and AI-powered products. I understand the constraints and expectations of these domains, not just the code.",
  },
  {
    num: "03",
    title: "Remote-First, Global",
    desc: "I've worked with clients across the US, UK, Europe, and Africa. Async-friendly workflow, clear communication, and zero timezone surprises.",
  },
  {
    num: "04",
    title: "Delivery-Focused",
    desc: "I work in focused sprints with weekly updates. You see real progress early and can redirect before anything goes off course.",
  },
];

const faqs = [
  {
    q: "How does the process start?",
    a: "With a short discovery call, usually 30 minutes. We align on scope, goals, and timeline. I then send a detailed proposal before any work begins.",
  },
  {
    q: "How do you handle projects in different time zones?",
    a: "Asynchronously by default. I maintain clear written updates and work well with US, UK, and European time zones. Overlap hours can be agreed for meetings.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. Many of my projects have been zero-to-one builds for early-stage founders. I understand the need to move fast and stay lean.",
  },
  {
    q: "Can you join an existing team?",
    a: "Absolutely. I've embedded in existing development teams as a contractor. I adapt to your workflow, tooling, and communication style.",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      <Head>
        <title>Services: Victor Chinagoro</title>
        <meta name="description" content="Web and mobile development services by Victor Chinagoro. Web apps, mobile apps, APIs, fintech, Web3, and AI-powered products." />
      </Head>
      <div className="bg-black text-white min-h-screen">

        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-violet-600" style={{ top: "-150px", right: "-100px", opacity: 0.18 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label mb-5">What I Build</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.05] max-w-3xl">
                Services
              </h1>
              <p className="text-white/45 text-base md:text-lg max-w-xl leading-relaxed">
                End-to-end development across web, mobile, and backend. Available for project-based
                work, retainers, and consulting, fully remote.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Currently available for new projects
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Services ─────────────────────────────── */}
        <section className="py-4 pb-24 md:pb-32">
          <div className="container">
            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {services.map((s, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <span className="text-xs font-mono text-violet-400 md:col-span-1">{s.num}</span>

                    <div className="md:col-span-3">
                      <h3 className="text-xl font-semibold text-white mb-4">{s.title}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        {s.logos.map((l) => (
                          <img key={l.name} src={l.src} alt={l.name} title={l.name}
                            className="w-5 h-5 object-contain opacity-50 hover:opacity-100 transition-opacity" />
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <p className="text-white/50 text-base leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="md:col-span-3">
                      <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium mb-3">Includes</p>
                      <ul className="space-y-1.5">
                        {s.includes.map((item) => (
                          <li key={item} className="text-sm text-white/40 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-violet-500/60 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Engagement Models ────────────────────── */}
        <section className="py-24 md:py-32 bg-[#050505] border-y border-white/[0.05]">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">How We Work</p>
              <h2 className="section-heading">Engagement Models</h2>
            </Reveal>

            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {engagements.map((e, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                    <span className="text-xs font-mono text-violet-400 md:col-span-1">{e.num}</span>
                    <h3 className="text-lg font-semibold text-white md:col-span-3">{e.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed md:col-span-8">{e.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Work With Me ─────────────────────── */}
        <section className="py-24 md:py-32">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">Why Me</p>
              <h2 className="section-heading">What Sets My Work Apart</h2>
            </Reveal>

            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {differentiators.map((d, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="py-9 md:py-11 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                    <span className="text-xs font-mono text-violet-400 md:col-span-1">{d.num}</span>
                    <h3 className="text-lg font-semibold text-white md:col-span-4">{d.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed md:col-span-7">{d.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="py-24 bg-[#050505] border-t border-white/[0.05]">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">FAQ</p>
              <h2 className="section-heading">Common Questions</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.07]">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className={`py-8 border-b border-white/[0.07] ${
                    i % 2 === 0 ? "md:pr-12 md:border-r" : "md:pl-12"
                  }`}>
                    <h3 className="text-sm font-semibold text-white mb-3">{faq.q}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="relative py-32 overflow-hidden text-center">
          <div className="planet-arc animate-glow-pulse" style={{ opacity: 0.5 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label justify-center mb-5">Ready to Start?</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                Let&apos;s Build Something<span className="text-violet-400"> Great.</span>
              </h2>
              <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
                Tell me about your project, I&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-8 py-4">Get in Touch →</Link>
                <Link href="/projects" className="btn-outline text-sm px-8 py-4">See My Work</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
