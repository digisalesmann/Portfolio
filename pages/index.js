"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import rocketAnim from "@/public/lotties/rocket.json";

// --- DUMMY DATA ---

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
    { name: "NumPy", icon: "/logos/numpy-original.svg" },
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

// Map all tech stack items into a single, easy-to-search object {name: icon_path}
const allTechLogos = Object.values(techStack)
  .flat()
  .reduce((acc, { name, icon }) => {
    let key = name.toLowerCase().replace('.', '').replace('-', '').trim();
    
    if (name === "PostgreSQL") key = "postgresql";
    if (name === "React") key = "react"; 
    if (name === "Next.js") key = "next.js";
    if (name === "Python") key = "python";
    if (name === "TensorFlow") key = "tensorflow";
    
    acc[key] = icon;
    return acc;
  }, {
    // Manually add logos for tags not explicitly named in the stack object
    'next.js': '/logos/nextjs-original.svg',
    'nextjs': '/logos/nextjs-original.svg',           // allow both
    'react': '/logos/react-original.svg',
    'tailwindcss': '/logos/tailwindcss-original.svg',
    'tailwind': '/logos/tailwindcss-original.svg',   // alternate key
    'node.js': '/logos/nodejs-original.svg',
    'nodejs': '/logos/nodejs-original.svg',
    'postgresql': '/logos/postgresql-original.svg',
    'postgres': '/logos/postgresql-original.svg',
    'firebase': '/logos/firebase-original.svg',
    'solidity': '/logos/solidity-plain-original.svg', // already existed but included for clarity
    'docker': '/logos/docker-original.svg',
    'kubernetes': '/logos/kubernetes-original.svg',
});


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

const projects = [
    {
        title: "MediLab AI",
        excerpt: "AI-powered medical diagnosis tool leveraging React, Python, and cloud services for scalable deployment.",
        tags: ["Nextjs", "React", "Firebase"], 
        link: "https://medilab-kappa.vercel.app/",
        image: "/images/testt.png"
    },
    {
        title: "Actora Web3 Platform",
        excerpt: "A decentralized social platform built on the Monad ecosystem, featuring custom smart contracts and Next.js frontend.",
        tags: ["Next.js", "PostgreSQL", "Docker"],
        link: "#",
        image: "/images/actora.png"
    },
    {
        title: "MonadGuard",
        excerpt: "Sybil analysis and allocation simulations for the Monad ecosystem with crisp charts and reports.",
        tags: ["React", "Nodejs"],
        link: "https://monadguard-cv2w.vercel.app/",
        image: "/images/gg.png"
    },
];

// --- Helper Components ---

// ProjectCard uses logos for tags
const ProjectCard = ({ title, excerpt, tags, link, image }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)' }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden"
    >
        <img src={image} alt={title} className="h-48 w-full object-cover" />
        <div className="p-6">
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-3">{excerpt}</p>
            <div className="flex flex-wrap gap-4 mt-5 items-center">
                {tags.map((tag) => {
                    const logoPath = allTechLogos[tag.toLowerCase()];
                    if (!logoPath) return null;

                    return (
                        <motion.div 
                            key={tag}
                            whileHover={{ scale: 1.1 }}
                            title={tag}
                            className="flex items-center"
                        >
                            <img 
                                src={logoPath} 
                                alt={tag} 
                                className="h-6 w-6 object-contain" 
                            />
                        </motion.div>
                    );
                })}
            </div>
            <Link 
                href={link} 
                className="inline-block mt-6 text-base font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition"
            >
                Explore Project →
            </Link>
        </div>
    </motion.div>
);

// Simplified Section and FadeUp components for self-containment
const Section = ({ children, className }) => (
  <section className={`container px-4 mx-auto ${className}`}>{children}</section>
);
const FadeUp = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// --- Main Component ---

export default function Home() {
  const [progress, setProgress] = useState(0);

  // --- Typewriter Animation Logic START ---
  const phrases = ["Full Stack", "Web3", "AI/ML"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = phrases[phraseIndex];
    let typeTimer;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(prev => fullText.substring(0, prev.length + 1));
        if (currentText === fullText) {
          typeTimer = setTimeout(() => setIsDeleting(true), 1500); // Pause at full text
          return;
        }
        typeTimer = setTimeout(handleTyping, 100); // Typing speed
      } else {
        // Deleting
        setCurrentText(prev => fullText.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setPhraseIndex(prev => (prev + 1) % phrases.length); // Move to next phrase
          typeTimer = setTimeout(handleTyping, 500); // Short pause before next phrase
          return;
        }
        typeTimer = setTimeout(handleTyping, 50); // Deleting speed
      }
    };

    typeTimer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(typeTimer);
  }, [currentText, isDeleting, phraseIndex, phrases]);


  // --- Scroll Progress Logic (kept) ---
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
  // --- Typewriter Animation Logic END ---


  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-indigo-600 z-50 shadow-md"
        style={{ width: `${progress}%` }}
      />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] overflow-hidden pt-20">
        {/* Glow background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/15 via-transparent to-pink-500/15 blur-[8rem]" />

        {/* Lotties (Kept) */}
        <div className="absolute -top-12 -left-20 w-40 md:w-56 opacity-70 pointer-events-none">
          <Lottie animationData={rocketAnim} loop={true} />
        </div>
        <div className="absolute bottom-0 right-0 w-40 md:w-56 opacity-70 pointer-events-none">
          <Lottie animationData={rocketAnim} loop={true} />
        </div>

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-snug max-w-4xl" 
        >
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Victor,
          </span>{" "}
          Building the future with{" "}
          <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            {currentText}
            {/* Blinking Cursor - CORRECTED STYLING */}
            <motion.span 
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                className="inline-block w-0.5 align-middle bg-red-500 ml-1" 
                style={{ height: '0.9em' }} 
            >
              |
            </motion.span>
          </span>
        </motion.h1>

        {/* REFINED SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-gray-700 dark:text-gray-300 mt-6 px-4 max-w-3xl font-light"
        >
          I craft production-ready applications using 
          <span className="font-bold text-indigo-600 dark:text-indigo-400"> React/Next.js</span>, 
          dive into 
          <span className="font-bold text-red-600 dark:text-red-400"> AI/ML research</span>, 
          and actively build in the 
          <span className="font-bold text-purple-600 dark:text-purple-400"> Web3</span> ecosystem. 
          Let's create something impactful.
        </motion.p>

        {/* BUTTONS (STYLED) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 px-4"
        >
          <Link 
            href="/projects" 
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-2xl hover:bg-indigo-700 hover:shadow-3xl transition-all flex items-center justify-center" 
          >
            <i className="fas fa-rocket mr-2"></i>
            See Projects
          </Link>
          <Link 
            href="/blog" 
            className="w-full sm:w-auto px-8 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg hover:bg-indigo-50/20 transition-all flex items-center justify-center" 
          >
            <i className="fas fa-scroll mr-2"></i>
            Read Articles
          </Link>
        </motion.div>
      </section>

      {/* --- */}

      {/* SERVICES */}
      <Section className="section py-20 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Core Expertise
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">What I can do for you</p>
        </FadeUp>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-indigo-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 shadow-xl transition-all"
            >
              <i className={`${s.icon} text-4xl text-indigo-600`}></i>
              <h3 className="mt-5 font-bold text-xl">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base mt-3">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- */}

      {/* TECH STACK (STYLED) */}
      <Section className="section py-20 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Languages, Frameworks & Tools I use</p>
        </FadeUp>

        <div className="mt-16 space-y-12">
          {Object.entries(techStack).map(([category, items]) => (
            <div
              key={category}
              className="rounded-3xl p-8 bg-white/90 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">
                {category.replace("_", " & ")}
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-10 place-items-center">
                {items.map((s) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <img src={s.icon} alt={s.name} className="h-14 w-14 transition-all duration-300 hover:scale-115" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* --- */}

      {/* FEATURED PROJECTS (STYLED) */}
      <Section className="section py-20">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 text-center">Web, Web3, and AI/ML builds</p>
        </FadeUp>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Link href="/projects" className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-50/20 transition-all">
                View All Projects (10+) →
            </Link>
        </div>
      </Section>

      {/* --- */}

      {/* ARTICLES CAROUSEL (CLEANED) */}
      <Section className="section py-20">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent text-center">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 text-center">Insights on AI, Web3 & Dev</p>
        </FadeUp>
        <div className="mt-16 flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 pb-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/articles/${p.slug}`}
              className="snap-start min-w-[320px] max-w-sm flex-shrink-0 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 
              bg-white/50 dark:bg-gray-900/30 transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-600"
            >
              <img
                src={p.cover}
                alt={p.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {p.tags.join(" • ")}
                </p>
                <h3 className="text-xl font-bold mt-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{p.excerpt}</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
                    {new Date(p.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* --- */}

      {/* ABOUT + STATS */}
      <Section className="section py-20">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent text-center">
            My Journey
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 text-center">My experience and key milestones</p>
        </FadeUp>
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <ul className="space-y-8 border-l-4 border-indigo-600/30 pl-8">
            <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white dark:border-gray-900"></div>
                <h3 className="font-bold text-lg">2025 → Final Year, FUTO</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Building MediLab, Actora, and some really cool stuffs.
                </p>
            </motion.li>
            <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white dark:border-gray-900"></div>
                <h3 className="font-bold text-lg">2024 → Web3 Cadet</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Joined Monad ecosystem, contributed to testnets & dev culture.
                </p>
            </motion.li>
            <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white dark:border-gray-900"></div>
                <h3 className="font-bold text-lg">2022 → Juggling Multiple Roles</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Learning, failing, and growing into a full-stack/AI developer.
                </p>
            </motion.li>
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Projects Built", value: "10+" },
              { label: "Years Experience", value: "3+" },
              { label: "Web3 Contributions", value: "5+" },
              { label: "Technical Articles", value: "2+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)' }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-3xl border-2 border-indigo-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/50 shadow-lg transition-all"
              >
                <h3 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- */}

      {/* TESTIMONIALS (CLEANED) */}
      <Section className="section py-20 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Praise
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">What people say about working with me</p>
        </FadeUp>
        <div className="mt-16 flex overflow-x-auto gap-8 snap-x snap-mandatory scrollbar-hide px-4 pb-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="snap-start min-w-[320px] max-w-sm flex-shrink-0 rounded-3xl border border-indigo-100 dark:border-gray-800 p-8 
              bg-white/50 dark:bg-gray-900/30 transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-600"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto ring-4 ring-indigo-500/50"
              />
              <h3 className="font-bold text-lg mt-4">{t.name}</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{t.role}</p>
              <p className="text-base italic text-gray-700 dark:text-gray-300 mt-4">"{t.feedback}"</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- */}

      {/* CONTACT CTA */}
      <Section className="section py-20 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Ready to {" "}
            <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Collaborate
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            I’m open to collaborations, freelance work, and research in full-stack, AI/ML, and Web3.
          </p>
        </FadeUp>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8"
        >
            <Link href="/contact" className="px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-indigo-700 hover:shadow-3xl transition-all">
                Get In Touch →
            </Link>
        </motion.div>
      </Section>
    </>
  );
}