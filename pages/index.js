import { motion } from "framer-motion";
import Link from "next/link";
import { Section, FadeUp } from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import rocketAnim from "@/public/lotties/rocket.json";

// temporary blog posts (replace with your md loader later)
const posts = [
  {
    slug: "ai-medicine",
    title: "AI in Medicine Availability",
    date: "2025-09-01",
    tags: ["AI", "Healthcare"],
    excerpt: "Exploring how ML models can optimize medicine distribution in Nigeria.",
  },
  {
    slug: "monadguard-release",
    title: "Launching MonadGuard",
    date: "2025-08-15",
    tags: ["Web3", "Security"],
    excerpt: "How we built a Sybil checker and allocation simulator for Monad.",
  },
];

// tech stack logos (place svgs in /public/logos/)
const skills = [
  { name: "React", icon: "/logos/reactnative-original.svg" },
  { name: "Next.js", icon: "/logos/nextjs-original.svg" },
  { name: "Node.js", icon: "/logos/nodejs-original.svg" },
  { name: "Python", icon: "/logos/python-original.svg" },
  { name: "TensorFlow", icon: "/logos/tensorflow-original.svg" },
  { name: "Solidity", icon: "/logos/solidity-original.svg" },
  { name: "Firebase", icon: "/logos/firebase-original.svg" },
  { name: "MongoDB", icon: "/logos/mongoose-original.svg" },
];

// services section
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
      "Writing research-driven articles on AI/ML, Web3, and modern software engineering.",
    icon: "fas fa-pen-nib",
  },
];

// testimonials (replace with real ones later)
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
        {/* Glow Background */}
        <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />

        {/* 🚀 Lottie Rockets */}
        <div className="absolute -top-10 -left-16 w-40 md:w-56 opacity-90 pointer-events-none">
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
          <span className="bg-gradient-to-r from-brand to-pink-500 bg-clip-text text-transparent">
            Victor
          </span>{" "}
          — Full-Stack Dev • Web3 Builder • AI/ML
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="muted mt-4 max-w-2xl"
        >
          I build production-ready apps (React/Next.js, Node/Firebase), research
          and write on AI/ML, and contribute to the Monad/Web3 ecosystem.
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
          <Link href="/blog" className="btn-outline">
            Read Articles
          </Link>
        </motion.div>
      </section>


      {/* SERVICES */}
      <Section className="section text-center">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
          <p className="muted mt-1">What I can do for you</p>
        </FadeUp>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 shadow-sm hover:shadow-lg cursor-pointer"
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
          <h2 className="text-2xl md:text-3xl font-semibold">Tech Stack</h2>
          <p className="muted mt-1">Languages, Frameworks & Tools I use</p>
        </FadeUp>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 place-items-center">
          {skills.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <img src={s.icon} alt={s.name} className="h-12 w-12" />
              <span className="text-sm font-medium">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section className="section">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-semibold">Featured Projects</h2>
          <p className="muted mt-1">Web, Web3, and AI/ML builds</p>
        </FadeUp>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      {/* BLOG PREVIEW */}
      <Section className="section">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-semibold">Latest Articles</h2>
          <p className="muted mt-1">Insights on AI, Web3 & Dev</p>
        </FadeUp>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <FadeUp key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-2xl border border-black/10 dark:border-white/10 p-5 hover:shadow-xl hover:border-brand transition"
              >
                <p className="text-xs text-gray-500">
                  {new Date(p.date).toLocaleDateString()} — {p.tags.join(", ")}
                </p>
                <h3 className="text-lg font-semibold mt-2">{p.title}</h3>
                <p className="muted text-sm mt-2">{p.excerpt}</p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section className="section">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
          <p className="muted mt-1">My journey so far</p>
        </FadeUp>
        <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
          {/* Timeline */}
          <ul className="space-y-6 border-l-2 border-brand/30 pl-6">
            <li>
              <h3 className="font-semibold">2025 — Final Year, FUTO</h3>
              <p className="muted text-sm">
                Building MediLab, MonadGuard, and Cashier Management as capstone.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">2024 — Web3 Cadet</h3>
              <p className="muted text-sm">
                Joined Monad ecosystem, contributed to testnets & dev culture.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">2022 — Full-Stack Path</h3>
              <p className="muted text-sm">
                Started React/Node, Firebase, and explored AI/ML research.
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
          <h2 className="text-2xl md:text-3xl font-semibold">Testimonials</h2>
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
          <h2 className="text-2xl md:text-3xl font-semibold">
            Let’s <span className="underline decoration-brand">build together</span>
          </h2>
          <p className="muted mt-2">
            I’m open to collaborations, freelance work, and research.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            {/* GitHub */}
            <Link href="https://github.com/digisalesmann" target="_blank">
              <span className="sr-only">GitHub</span>
              <i className="fab fa-github text-2xl hover:text-brand"></i>
            </Link>

            {/* X (Twitter) */}
            <Link href="https://x.com/0xdsm" target="_blank">
              <span className="sr-only">Twitter / X</span>
              <i className="fa-brands fa-x-twitter text-2xl hover:text-brand"></i>
            </Link>

            {/* LinkedIn */}
            <Link href="https://linkedin.com/in/your-linkedin-username" target="_blank">
              <span className="sr-only">LinkedIn</span>
              <i className="fab fa-linkedin text-2xl hover:text-brand"></i>
            </Link>

            {/* Discord */}
            <Link href="https://discord.gg/your-discord-invite" target="_blank">
              <span className="sr-only">Discord</span>
              <i className="fab fa-discord text-2xl hover:text-brand"></i>
            </Link>

            {/* Email */}
            <Link href="mailto:youremail@example.com">
              <span className="sr-only">Email</span>
              <i className="fas fa-envelope text-2xl hover:text-brand"></i>
            </Link>
          </div>
        </FadeUp>
      </Section>

    </>
  );
}
