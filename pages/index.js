"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section, FadeUp } from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import rocketAnim from "@/public/lotties/rocket.json";

// Articles carousel
const posts = [
  {
    slug: "ai-medicine",
    title: "AI in Medicine Availability",
    date: "2025-09-01",
    tags: ["AI", "Healthcare"],
    excerpt:
      "Exploring how ML models can optimize medicine distribution in Nigeria.",
    cover: "/images/ai.png",
  },
  {
    slug: "fullstack-cloud",
    title: "Modern Cloud for Full-Stack Apps",
    date: "2025-07-20",
    tags: ["Cloud", "DevOps"],
    excerpt:
      "Best practices for scaling React/Next.js apps with edge and serverless.",
    cover: "/images/cloud.png",
  },
  {
    slug: "ai-ethics",
    title: "AI Ethics in 2025",
    date: "2025-06-10",
    tags: ["AI", "Ethics"],
    excerpt:
      "What developers should consider when building models that affect millions.",
    cover: "/images/ethics.png",
  },
];

// Categorized tech stacks
const techStack = {
  Frontend: [
    { name: "React", icon: "/logos/reactnative-original.svg" },
    { name: "Next.js", icon: "/logos/nextjs-original.svg" },
    { name: "TailwindCSS", icon: "/logos/tailwindcss-original.svg" },
    { name: "Bootstrap", icon: "/logos/bootstrap-original.svg" },
    { name: "JavaScript", icon: "/logos/javascript-original.svg" },
    { name: "TypeScript", icon: "/logos/typescript-original.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "/logos/nodejs-original.svg" },
    { name: "Express", icon: "/logos/express-original.svg" },
    { name: "MongoDB", icon: "/logos/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "/logos/postgresql-original.svg" },
    { name: "MySQL", icon: "/logos/mysql-original.svg" },
    { name: "GraphQL", icon: "/logos/graphql-plain.svg" },
  ],
  AI_ML: [
    { name: "Python", icon: "/logos/python-original.svg" },
    { name: "TensorFlow", icon: "/logos/tensorflow-original.svg" },
    { name: "PyTorch", icon: "/logos/pytorch-original.svg" },
    { name: "Pandas", icon: "/logos/pandas-original.svg" },
    { name: "Scikit-learn", icon: "/logos/scikitlearn-original.svg" },
  ],
  Tools: [
    { name: "Firebase", icon: "/logos/firebase-original.svg" },
    { name: "Docker", icon: "/logos/docker-original.svg" },
    { name: "Kubernetes", icon: "/logos/kubernetes-original.svg" },
    { name: "GitHub", icon: "/logos/github-original.svg" },
    { name: "Git", icon: "/logos/git-original.svg" },
    { name: "Vercel", icon: "/logos/vercel-original.svg" },
  ],
};

// Services
const services = [
  {
    title: "Full-Stack Development",
    description:
      "Building production-ready apps with React, Next.js, Node.js, and modern cloud platforms.",
    icon: "fas fa-laptop-code",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Designing intelligent systems with Python, TensorFlow, and data-driven solutions.",
    icon: "fas fa-brain",
  },
  {
    title: "Web3 & Blockchain",
    description:
      "Creating decentralized apps, smart contracts, and tools for the future of the internet.",
    icon: "fas fa-cube",
  },
  {
    title: "Technical Writing",
    description:
      "Research-driven articles on AI/ML, Web3, and modern software engineering.",
    icon: "fas fa-pen-nib",
  },
];

// Testimonials
const testimonials = [
  {
    name: "DeFi Hunter",
    role: "Admin, CryptoClan",
    avatar: "/avatars/defi.png",
    feedback:
      "Victor consistently demonstrates innovation and excellence in his projects. His MediLab app shows true impact potential.",
  },
  {
    name: "Monad Community",
    role: "Web3 Builder",
    avatar: "/avatars/Monad.png",
    feedback:
      "Victor’s contributions to testnets and tools like MonadGuard have been highly valuable. A true builder spirit.",
  },
  {
    name: "Teammate",
    role: "Collaborator",
    avatar: "/avatars/team.jpg",
    feedback:
      "Working with Victor was seamless. His skills across full-stack and AI/ML made our project a success.",
  },
];

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand z-50"
        style={{ width: `${progress}%` }}
      />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />

        {/* 🚀 Lotties */}
        <div className="absolute -top-12 -left-20 w-40 md:w-56 opacity-90 pointer-events-none">
          <Lottie animationData={rocketAnim} loop={true} />
        </div>
        <div className="absolute bottom-0 right-0 w-40 md:w-56 opacity-90 pointer-events-none">
          <Lottie animationData={rocketAnim} loop={true} />
        </div>

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Victor,
          </span>{" "}
          Building the future with{" "}
          <span className="bg-gradient-to-r from-brand to-indigo-400 bg-clip-text text-transparent">
            Full Stack → Web3 ← AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="muted mt-4 max-w-2xl"
        >
          I craft apps with React/Next.js, explore AI/ML research, and build in
          the Monad/Web3 ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <Link href="/projects" className="btn-primary">
            See Projects
          </Link>
          <Link href="/articles" className="btn-outline">
            Read Articles
          </Link>
        </motion.div>
      </section>

      {/* SERVICES */}
      <Section className="section text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-brand bg-clip-text text-transparent">
            Services
          </h2>
          <p className="muted mt-1">What I can do for you</p>
        </FadeUp>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 shadow-sm hover:shadow-lg"
            >
              <i className={`${s.icon} text-3xl text-brand`}></i>
              <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
              <p className="muted text-sm mt-2">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TECH STACK */}
      <Section className="section text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-brand bg bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="muted mt-1">Languages, Frameworks & Tools</p>
        </FadeUp>

        <div className="mt-10 space-y-12">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="rounded-2xl p-6 bg-white/70 dark:bg-gray-900/40 shadow border border-black/5 dark:border-white/10">
              <h3 className="text-xl font-bold mb-6 text-left bg-gradient-to-r from-purple-500 to-brand bg-clip-text text-transparent">
                {category.replace("_", " & ")}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
                {items.map((s) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-2"
                  >
                    <img src={s.icon} alt={s.name} className="h-12 w-12" />
                    <span className="text-sm font-medium">{s.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section className="section">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-brand bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="muted mt-1">Web, Web3, and AI/ML builds</p>
        </FadeUp>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      {/* ARTICLES CAROUSEL */}
      <Section className="section">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-brand bg-clip-text text-transparent">
            Latest Articles
          </h2>
          <p className="muted mt-1">Insights on AI, Web3 & Dev</p>
        </FadeUp>
        <div className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory px-2 scrollbar-hide">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/articles/${p.slug}`}
              className="snap-center min-w-[300px] max-w-sm flex-shrink-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 shadow hover:shadow-lg transition"
            >
              <img
                src={p.cover}
                alt={p.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs text-gray-500">
                  {new Date(p.date).toLocaleDateString()} — {p.tags.join(", ")}
                </p>
                <h3 className="text-lg font-semibold mt-2">{p.title}</h3>
                <p className="muted text-sm mt-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ABOUT + STATS */}
      <Section className="section">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-brand bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="muted mt-1">My journey so far</p>
        </FadeUp>
        <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
          {/* Timeline */}
          <ul className="space-y-6 border-l-2 border-brand/30 pl-6">
            <li>
              <h3 className="font-semibold">2025 → Final Year, FUTO</h3>
              <p className="muted text-sm">
                Building MediLab, Actora, and some really cool stuffs.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">2024 → Web3 Cadet</h3>
              <p className="muted text-sm">
                Joined Monad ecosystem, contributed to testnets & dev culture.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">2022 → Somewhere juggling multiple roles</h3>
              <p className="muted text-sm">
                Learning, failing, and growing.
              </p>
            </li>
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Projects", value: "10+" },
              { label: "Years Coding", value: "3+" },
              { label: "Web3 Roles", value: "5+" },
              { label: "AI/ML Articles", value: "2+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="section text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-brand bg-clip-text text-transparent">
            Testimonials
          </h2>
          <p className="muted mt-1">What people say about me</p>
        </FadeUp>
        <div className="mt-10 flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide px-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="snap-center min-w-[300px] max-w-sm flex-shrink-0 rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/80 dark:bg-gray-900/50 shadow-md hover:shadow-xl"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full mx-auto"
              />
              <h3 className="font-semibold mt-4">{t.name}</h3>
              <p className="text-xs text-gray-500">{t.role}</p>
              <p className="muted text-sm mt-3">{t.feedback}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT CTA */}
      <Section className="section text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Let’s{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            build
          </span>
          <span className="underline decoration-brand"> together</span>
          </h2>
          <p className="muted mt-2">
            I’m open to collaborations, freelance work, and research.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <Link href="https://github.com/digisalesmann" target="_blank">
              <i className="fab fa-github text-2xl hover:text-brand"></i>
            </Link>
            <Link href="https://x.com/0xdsm" target="_blank">
              <i className="fa-brands fa-x-twitter text-2xl hover:text-brand"></i>
            </Link>
            <Link
              href="https://linkedin.com/in/your-linkedin-username"
              target="_blank"
            >
              <i className="fab fa-linkedin text-2xl hover:text-brand"></i>
            </Link>
            <Link href="https://discord.gg/your-discord-invite" target="_blank">
              <i className="fab fa-discord text-2xl hover:text-brand"></i>
            </Link>
            <Link href="mailto:youremail@example.com">
              <i className="fas fa-envelope text-2xl hover:text-brand"></i>
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
