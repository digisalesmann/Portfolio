"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import projects from "@/data/projects";
import logos from "@/data/logos.json"; // ✅ external JSON with name + icon

const testimonials = [
  {
    name: "DeFi Hunter",
    role: "Admin, CryptoClan",
    text:
      "Victor produced a highly original and technically rigorous final-year project. Deep understanding of system design and deployment.",
  },
  {
    name: "Jennifer Andrew",
    role: "Content Writer, TechBlog",
    text:
      "Working with my man was seamless. His skills across full-stack and AI/ML made our project a success.",
  },
];

// ---------------- Small blocks ----------------
function Badge({ children }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {children}
    </span>
  );
}

function IconRow({ stack = [] }) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {stack.map((s) => {
        const logoObj = logos.find(
          (l) => l.name.toLowerCase() === s.toLowerCase()
        );
        return (
          <img
            key={s}
            src={
              logoObj
                ? logoObj.icon
                : `/icons/${s.toLowerCase()}/${s.toLowerCase()}-original.svg`
            }
            alt={s}
            className="h-6 w-6"
            onError={(e) => ((e.target).style.display = "none")}
          />
        );
      })}
    </div>
  );
}

function ImpactCounters({ projects }) {
  const totalProjects = projects.length;
  const uniqueTechs = Array.from(new Set(projects.flatMap((p) => p.stack))).length;
  const users = projects.reduce((acc, p) => acc + (p.metrics?.users || 0), 0);

  const stats = [
    { label: "Projects", value: totalProjects },
    { label: "Technologies", value: uniqueTechs },
    { label: "Users Impacted", value: users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center mt-10">
      {stats.map((s) => (
        <div
          key={s.label}
          className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/60 border border-black/10 dark:border-white/10 shadow"
        >
          <div className="text-2xl font-extrabold">{s.value}</div>
          <div className="text-sm muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ title, description, image, stack, href, repo }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/50 shadow hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-44 object-cover" />
      <div className="p-6 space-y-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="muted text-sm">{description}</p>
        <IconRow stack={stack} />
        <div className="flex gap-2 mt-4 flex-wrap">
          {href && (
            <a href={href} target="_blank" rel="noreferrer" className="btn-primary">
              Demo
            </a>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="btn-outline">
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function TechRadar({ projects }) {
  const techCounts = useMemo(() => {
    const counts = {};
    projects.forEach((p) =>
      p.stack.forEach((s) => (counts[s] = (counts[s] || 0) + 1))
    );
    return Object.keys(counts).map((k) => ({ tech: k, projects: counts[k] }));
  }, [projects]);

  return (
    <div className="rounded-2xl p-6 border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/50 shadow h-full">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={techCounts}>
          <PolarGrid />
          <PolarAngleAxis dataKey="tech" />
          <PolarRadiusAxis />
          <Radar
            name="Projects"
            dataKey="projects"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ---------------- Main Page ----------------
export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", "Web", "Web3", "AI/ML", "Research", "Tools"];
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);
  const searched = filtered.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );
  const featured = projects.find((p) => p.featured) || projects[0];

  // ✅ Randomized snowfall configs (only generated once)
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const logo = logos[i % logos.length];
        return {
          ...logo,
          left: Math.random() * 100, // random %
          duration: 6 + Math.random() * 6, // 6–12s
          delay: Math.random() * 10, // stagger
          size: ["w-4 h-4 sm:w-6 sm:h-6", "w-5 h-5 sm:w-7 sm:h-7", "w-6 h-6 sm:w-8 sm:h-8"][
            Math.floor(Math.random() * 3)
          ],
        };
      }),
    []
  );

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* HERO with random stack snowfall */}
      <section className="relative text-center py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden w-full">
        <div className="absolute inset-0 -z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          {snowflakes.map((flake, i) => (
            <motion.img
              key={i}
              src={flake.icon}
              alt={flake.name}
              loading="lazy"
              className={`absolute opacity-40 ${flake.size}`}
              style={{ left: `${flake.left}%` }}
              initial={{ y: "-10%" }}
              animate={{ y: "110%" }}
              transition={{
                duration: flake.duration,
                repeat: Infinity,
                ease: "linear",
                delay: flake.delay,
              }}
            />
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold">
          💻 Projects & Case Studies
        </h1>
        <p className="muted mt-4 sm:mt-6 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
          Explore apps, protocols, AI models, and tools I’ve engineered.
          Every project is a journey from challenge to solution.
        </p>
        <ImpactCounters projects={projects} />
      </section>

      {/* SEARCH + FILTERS */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search projects or tech..."
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/50"
          />
          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center md:justify-start">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm ${
                  active === c
                    ? "bg-brand text-white"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-white/90 dark:bg-gray-900/60">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">{featured.title}</h3>
              <p className="muted text-sm sm:text-base">{featured.description}</p>
              <IconRow stack={featured.stack} />
              <div className="flex gap-3 mt-4 flex-wrap">
                {featured.href && (
                  <a href={featured.href} className="btn-primary">
                    Live Demo
                  </a>
                )}
                {featured.repo && (
                  <a href={featured.repo} className="btn-outline">
                    Code
                  </a>
                )}
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Badge>Users: {featured.metrics?.users || "—"}</Badge>
                <Badge>Latency: {featured.metrics?.latency || "—"}</Badge>
                <Badge>Improvement: {featured.metrics?.reduction || "—"}</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
          All Projects
        </h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {searched.length ? (
              searched.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  <ProjectCard {...p} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center muted">
                No results — try another filter
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">📖 Case Studies</h2>
        <p className="muted mb-4 sm:mb-6">Deep technical dives</p>
        <div className="space-y-6">
          {projects.slice(0, 2).map((p) => (
            <div
              key={p.title}
              className="p-4 sm:p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/50 shadow hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="muted mt-2 text-sm sm:text-base">
                    {p.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-brand">Problem</h4>
                  <p className="muted text-sm mt-1">
                    Short summary of the technical challenge.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-brand">Impact</h4>
                  <p className="muted text-sm mt-1">
                    Numbers, latency reduction, adoption, etc.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RADAR + TESTIMONIALS */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TechRadar projects={projects} />
          </div>
          <div className="rounded-2xl p-4 sm:p-6 border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/50 shadow space-y-4">
            <h4 className="font-semibold">Testimonials</h4>
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="font-medium">{t.name}</div>
                <div className="text-sm muted">{t.role}</div>
                <div className="mt-2 text-sm">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl p-6 sm:p-10 text-center border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/50 shadow">
          <h3 className="text-lg sm:text-xl font-semibold">
            Let’s build something together
          </h3>
          <p className="muted mt-2 text-sm sm:text-base">
            Open to freelance, collaboration, and exciting fulltime roles.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="mailto:you@domain.com" className="btn-primary">
              Contact
            </a>
            <a href="/resume.pdf" className="btn-outline">
              Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
