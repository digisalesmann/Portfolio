import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { allProjects } from "../../lib/projects";

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

const IconArrow = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function CaseStudy({ project, prev, next }) {
  return (
    <>
      <Head>
        <title>{project.title}: Case Study · Victor Chinagoro</title>
        <meta name="description" content={project.excerpt} />
      </Head>
      <div className="bg-black text-white min-h-screen">

        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative pt-28 pb-14 overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-white" style={{ top: "-200px", left: "-100px", opacity: 0.12 }} />
          <div className="container relative z-10">
            <Reveal>
              <Link href="/projects" className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors mb-10 group">
                <svg className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                All Projects
              </Link>
            </Reveal>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <Reveal>
                <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-4">{project.tags}</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                  {project.title}
                </h1>
              </Reveal>
              {project.link !== "#" && (
                <Reveal delay={0.1}>
                  <a href={project.link} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors font-medium shrink-0">
                    Live Site <IconArrow />
                  </a>
                </Reveal>
              )}
            </div>

            {/* Meta strip */}
            <Reveal delay={0.15} className="mt-8">
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/[0.07]">
                {[
                  { label: "Year",     value: project.year },
                  { label: "Duration", value: project.duration },
                  { label: "Role",     value: project.role },
                  { label: "Category", value: project.category },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium mb-1">{m.label}</p>
                    <p className="text-sm text-white font-medium">{m.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Project image ─────────────────────────── */}
        <Reveal className="container mb-20 md:mb-28">
          <div className="group relative rounded-2xl overflow-hidden bg-[#111] aspect-[16/8] flex items-center justify-center">
            <img src={project.image} alt={project.title}
              className="w-full h-full object-contain grayscale group-hover:grayscale-0 opacity-90 transition-[filter] duration-500"
              onError={(e) => {
                e.target.parentElement.style.background = "linear-gradient(135deg,#1e1040,#0d0d1a)";
                e.target.remove();
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </Reveal>

        {/* ── Overview ──────────────────────────────── */}
        <section className="container pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <Reveal className="md:col-span-4">
              <p className="section-label mb-6">Overview</p>
              <div className="space-y-5 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                {[
                  { label: "Client Type", value: project.category === "App" ? "Mobile Product" : "Web Product" },
                  { label: "Delivered",   value: project.year },
                  { label: "Timeline",    value: project.duration },
                ].map((item) => (
                  <div key={item.label} className="pt-5">
                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium mb-1">{item.label}</p>
                    <p className="text-sm text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-8">
              <p className="text-xl md:text-2xl text-white/65 leading-relaxed">{project.overview}</p>
            </Reveal>
          </div>
        </section>

        {/* ── Challenge / Solution ──────────────────── */}
        <section className="py-20 md:py-28 bg-[#050505] border-y border-white/[0.05]">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <p className="section-label mb-6">The Challenge</p>
              <p className="text-white/55 text-base leading-relaxed">{project.challenge}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="section-label mb-6">The Solution</p>
              <p className="text-white/55 text-base leading-relaxed">{project.solution}</p>
            </Reveal>
          </div>
        </section>

        {/* ── Key Features ──────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">Features</p>
              <h2 className="section-heading">What Was Built</h2>
            </Reveal>
            <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {project.features.map((f, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="py-9 md:py-11 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                    <span className="text-xs font-mono text-white/40 md:col-span-1">{f.num}</span>
                    <h3 className="text-lg font-semibold text-white md:col-span-3">{f.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed md:col-span-8">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Results ───────────────────────────────── */}
        <section className="bg-[#050505] border-y border-white/[0.05]">
          <div className="container py-20 md:py-28">
            <Reveal className="mb-14">
              <p className="section-label mb-4">Outcomes</p>
              <h2 className="section-heading">Results</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07]">
              {project.results.map((r, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-[#050505] px-8 py-10">
                    <span className="text-2xl font-bold text-white/60 mb-1 block">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-white/70 text-base leading-relaxed">{r}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <Reveal className="mb-12">
              <p className="section-label mb-4">Stack</p>
              <h2 className="section-heading">Technologies Used</h2>
            </Reveal>
            <div className="flex flex-wrap gap-x-10 gap-y-10">
              {project.techStack.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.04}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}
                    className="flex flex-col items-center gap-2.5 group cursor-default w-16">
                    <img src={t.src} alt={t.name} className="w-9 h-9 object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all" />
                    <span className="text-[10px] text-white/30 font-medium text-center leading-tight group-hover:text-white/60 transition-colors">{t.name}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Prev / Next ───────────────────────────── */}
        <section className="border-t border-white/[0.07]">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            {prev ? (
              <Link href={`/project/${prev.slug}`}
                className="group flex flex-col gap-3 px-8 py-10 hover:bg-white/[0.02] transition-colors">
                <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium">← Previous</p>
                <p className="text-lg font-semibold text-white group-hover:text-white/60 transition-colors">{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/project/${next.slug}`}
                className="group flex flex-col gap-3 px-8 py-10 hover:bg-white/[0.02] transition-colors md:items-end text-right">
                <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium">Next →</p>
                <p className="text-lg font-semibold text-white group-hover:text-white/60 transition-colors">{next.title}</p>
              </Link>
            ) : <div />}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="relative py-32 overflow-hidden text-center">
          <div className="planet-arc" style={{ opacity: 0.5 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label justify-center mb-5">Work Together</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Want Something Like This?
              </h2>
              <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
                Let&apos;s talk about your project. I typically respond within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-8 py-4">Start a Project →</Link>
                <Link href="/projects" className="btn-outline text-sm px-8 py-4">View All Work</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const idx = allProjects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return { notFound: true };
  const project = allProjects[idx];
  const prev = idx > 0
    ? { title: allProjects[idx - 1].title, slug: allProjects[idx - 1].slug }
    : null;
  const next = idx < allProjects.length - 1
    ? { title: allProjects[idx + 1].title, slug: allProjects[idx + 1].slug }
    : null;
  return { props: { project, prev, next } };
}
