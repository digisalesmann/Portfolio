import { motion } from "framer-motion";
import Link from "next/link";
import { Section, FadeUp } from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";

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

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />
        <div className="absolute inset-0 -z-10">
          <div className="w-2 h-2 bg-brand rounded-full absolute top-20 left-1/4 animate-ping" />
          <div className="w-3 h-3 bg-blue-400 rounded-full absolute bottom-32 right-1/3 animate-pulse" />
          <div className="w-2 h-2 bg-pink-400 rounded-full absolute top-1/2 left-1/2 animate-bounce" />
        </div>

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
                className="block rounded-2xl border border-black/10 dark:border-white/10 p-5 hover:shadow-lg transition"
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
            <div className="text-center p-4 rounded-2xl border border-black/10 dark:border-white/10">
              <h3 className="text-2xl font-bold">10+</h3>
              <p className="muted text-sm">Projects</p>
            </div>
            <div className="text-center p-4 rounded-2xl border border-black/10 dark:border-white/10">
              <h3 className="text-2xl font-bold">3+</h3>
              <p className="muted text-sm">Years Coding</p>
            </div>
            <div className="text-center p-4 rounded-2xl border border-black/10 dark:border-white/10">
              <h3 className="text-2xl font-bold">5+</h3>
              <p className="muted text-sm">Web3 Roles</p>
            </div>
            <div className="text-center p-4 rounded-2xl border border-black/10 dark:border-white/10">
              <h3 className="text-2xl font-bold">2+</h3>
              <p className="muted text-sm">AI/ML Articles</p>
            </div>
          </div>
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
            <Link href="https://github.com/digisalesmann" target="_blank">
              <span className="sr-only">GitHub</span>
              <i className="fab fa-github text-2xl hover:text-brand"></i>
            </Link>
            <Link href="https://twitter.com/0xdsm" target="_blank">
              <span className="sr-only">Twitter</span>
              <i className="fab fa-twitter text-2xl hover:text-brand"></i>
            </Link>
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
