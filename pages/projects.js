"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------------------
   Utility: load actual logo
---------------------------- */
function StackLogo({ name, size = 36 }) {
  const src = `/icons/${name.toLowerCase().replace(/\s+/g, "")}/${name
    .toLowerCase()
    .replace(/\s+/g, "")}-original.svg`;
  return (
    <img
      src={src}
      alt={name}
      className="object-contain"
      style={{ width: size, height: size }}
      onError={(e) => ((e.target.style.display = "none"))}
    />
  );
}

function IconRow({ stack = [] }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {stack.map((s) => (
        <StackLogo key={s} name={s} size={28} />
      ))}
    </div>
  );
}

/* ---------------------------
   Rolling Orbit (Earth-like globe)
---------------------------- */
function TechOrbit({ items }) {
  const containerRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll(".orbit-item"));
    let raf = 0;
    let t = 0;

    function update() {
      t += 0.008;
      const rect = el.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const pointerX = pointerRef.current.x;
      const pointerY = pointerRef.current.y;
      nodes.forEach((node, i) => {
        const idx = i + 1;
        const radius = Math.max(
          60,
          Math.min(cx, cy) * (0.35 + (idx % 6) * 0.05)
        );
        const angle =
          t * (1 + (i % 3) * 0.06) + (i * Math.PI * 2) / nodes.length;
        const px = (pointerX - cx) / cx;
        const py = (pointerY - cy) / cy;
        const angleOffset = hovering ? px * 0.7 + py * 0.2 : 0;
        const x =
          Math.cos(angle + angleOffset) * radius +
          cx -
          node.offsetWidth / 2;
        const y =
          Math.sin(angle + angleOffset) * radius +
          cy -
          node.offsetHeight / 2;
        node.style.transform = `translate3d(${x.toFixed(
          2
        )}px, ${y.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(update);
    }

    raf = requestAnimationFrame(update);

    const handleMove = (ev) => {
      const r = el.getBoundingClientRect();
      pointerRef.current.x = ev.clientX - r.left;
      pointerRef.current.y = ev.clientY - r.top;
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerenter", () => setHovering(true));
    el.addEventListener("pointerleave", () => setHovering(false));

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", handleMove);
    };
  }, [hovering]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl h-80 md:h-96 mx-auto rounded-full"
      aria-hidden="true"
      style={{ perspective: 800 }}
    >
      {/* Earth core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center text-white font-bold"
        >
          Victor
        </motion.div>
      </div>

      {/* orbit items */}
      {items.map((name, i) => (
        <div
          key={name + i}
          className="orbit-item absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-md flex items-center justify-center"
          style={{ transform: "translate3d(-9999px,-9999px,0)" }}
        >
          <StackLogo name={name} size={48} />
        </div>
      ))}
    </div>
  );
}

/* ---------------------------
   Sample Data
---------------------------- */
const sampleProjects = [
  {
    title: "MonadGuard",
    subtitle: "Sybil Checker & Allocation Simulator",
    description:
      "Sybil analysis and allocation simulations for the Monad ecosystem with crisp charts and reports.",
    stack: ["React", "Node.js", "Charts"],
    href: "https://monadguard.vercel.app",
    repo: "https://github.com/digisalesmann/monadguard",
    image: "/images/monad.png",
    category: "Web3",
    metrics: { users: 5000, reports: 120 },
  },
  {
    title: "MediLab",
    subtitle: "Healthcare • Geo • Realtime",
    description:
      "Find and reserve medicines across pharmacies with QR verification, geolocation, and admin dashboards.",
    stack: ["Next.js", "Firebase", "TailwindCSS", "Maps"],
    href: "https://medilab.vercel.app",
    repo: "https://github.com/digisalesmann/medilab",
    image: "/images/testt.png",
    category: "Web",
    featured: true,
    metrics: { users: 15200, latency: "120ms" },
  },
  {
    title: "Actora Labs",
    subtitle: "Web3 Growth Engine",
    description:
      "Whether you're an early-stage builder or an ecosystem leader, Actora gives you full-stack tools to launch, grow, and thrive in Web3.",
    stack: ["Next.js", "Postgres", "Prisma", "Shadcn/ui"],
    href: "https://actoralabs.vercel.app",
    repo: "https://github.com/digisalesmann/actoralabs",
    image: "/images/actora.png",
    category: "Web",
    metrics: { projects: 80, partners: 12 },
  },
  {
    title: "GeoSearch Pharmacy",
    description:
      "Geo-aware pharmacy discovery with reservation flow and QR pickup.",
    stack: ["Next.js", "TailwindCSS", "Mapbox"],
    image: "/images/geo.png",
    href: "#",
    repo: "#",
    metrics: { users: 9200 },
  },
  {
    title: "Realtime Dashboard",
    description:
      "Live analytics with alerts and notifications for admins.",
    stack: ["React", "Socket.IO", "D3.js"],
    image: "/images/dash.webp",
    href: "#",
    repo: "#",
    metrics: { users: 7100 },
  },
  {
    title: "Secure API Gateway",
    description:
      "Role-based auth, rate limiting and audit logging.",
    stack: ["Node.js", "Express", "Redis"],
    image: "/images/secure.png",
    href: "#",
    repo: "#",
    metrics: { users: 4300 },
  },
];

const processSteps = [
  { title: "Discover", text: "Understand objectives, stakeholders and constraints." },
  { title: "Plan", text: "Define scope, metrics and milestones." },
  { title: "Design", text: "High-fidelity UX, accessible components, brand polish." },
  { title: "Build", text: "Iterative development with tests and CI/CD." },
  { title: "Launch", text: "Deploy, observe, iterate and optimize." },
];

const testimonials = [
  { name: "Jennifer Andrew", text: "This platform transformed healthcare access in my region." },
  { name: "iData Inc.", text: "We gained observability and cut operational costs." },
  { name: "PharmaHub", text: "Reservation + QR reduced wait times by 60%." },
];

const awards = [
  { name: "Top Health Tech 2024", detail: "Regional recognition for healthcare innovation" },
  { name: "Best UX Award", detail: "Accessible and usable design for patients" },
];

const techStack = [
  "React",
  "Firebase",
  "TailwindCSS",
  "GitHub",
  "Python",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "HTML5",
];

/* ---------------------------
   Projects Section
---------------------------- */
function ProjectsSection({ projects }) {
  const featured = projects.find((p) => p.featured) || projects[0];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Featured */}
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src={featured.image} alt={featured.title} className="w-full h-64 object-cover" />
        </div>
        <div className="space-y-4 flex flex-col justify-center">
          <h3 className="text-3xl font-bold">{featured.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{featured.description}</p>
          <IconRow stack={featured.stack} />
          <div className="mt-4 flex gap-3">
            <a href={featured.href} className="btn-primary">View Live</a>
            <a href={featured.repo} className="btn-outline">Repo</a>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(15,23,42,0.12)" }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow"
          >
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />
            <h4 className="mt-4 font-semibold">{p.title}</h4>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">{p.description}</p>
            <div className="mt-3 flex gap-2 items-center">
              <IconRow stack={p.stack} />
              <div className="ml-auto flex gap-2">
                <a href={p.href} className="text-indigo-600 text-sm font-medium">Live</a>
                <a href={p.repo} className="text-slate-400 text-sm">Code</a>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}

/* ---------------------------
   Process Timeline
---------------------------- */
function ProcessTimeline({ steps }) {
  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 to-transparent opacity-30" />
      <div className="space-y-12">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="relative p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md md:max-w-2xl"
            style={{ marginLeft: i % 2 === 0 ? 0 : "auto" }}
          >
            <div className="absolute -left-6 top-6 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 text-white flex items-center justify-center font-bold">
              {i + 1}
            </div>
            <h4 className="text-lg font-semibold">{s.title}</h4>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------
   Testimonials
---------------------------- */
function Testimonials({ items }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[index].name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
        >
          <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic">
            “{items[index].text}”
          </blockquote>
          <div className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
            {items[index].name}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------
   Awards
---------------------------- */
function Awards() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {awards.map((a) => (
          <div key={a.name} className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
            <div className="font-semibold">{a.name}</div>
            <div className="text-sm mt-2 text-slate-600 dark:text-slate-400">{a.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------
   CTA
---------------------------- */
function CTA() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 -skew-y-6 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Ready to Build Something Impactful?
        </motion.h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          I collaborate on meaningful products — from research to production.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} className="mt-8 inline-flex gap-4">
          <a href="mailto:you@domain.com" className="btn-primary px-6 py-3 rounded-full">
            Contact Me
          </a>
          <a href="/resume.pdf" className="btn-outline px-6 py-3 rounded-full">
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------
   Main Page
---------------------------- */
export default function ProjectsPage() {
  return (
    <div>
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Projects
          </span>{" "}
          & Case Studies
        </motion.h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore apps, Web3 tools, AI models, and experiments I’ve built. Discover demos, code,
          and insights.
        </p>

        {/* Rolling orbit */}
        <div className="mt-12">
          <TechOrbit items={techStack} />
        </div>
      </header>

      {/* Projects */}
      <main id="projects" className="pb-12">
        <ProjectsSection projects={sampleProjects} />
      </main>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Process</h2>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What people say</h2>
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* Awards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">Awards & Recognition</h3>
          <Awards />
        </div>
      </section>

      {/* CTA */}
      <CTA />

      {/* Local button styles */}
      <style jsx global>{`
        .btn-primary {
          background: linear-gradient(90deg, #6366f1, #ec4899);
          color: white;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.18);
        }
        .btn-outline {
          background: white;
          border: 1px solid rgba(15, 23, 42, 0.06);
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}