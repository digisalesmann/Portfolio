"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, Zap, ChevronRight, User, Globe } from "lucide-react";

function StackLogo({ name, size = 36 }) {
  const lower = name.toLowerCase().replace(/\s+|[.]/g, ""); // removes spaces & dots

  const aliases = {
    node: "nodejs-original",
    nodejs: "nodejs-original",
    nextjs: "nextjs-original",
    react: "reactnative-original",
    reactnative: "reactnative-original",
  };

  const fileName = aliases[lower] || `${lower}-original`;
  const src = `/logos/${fileName}.svg`;

  // MOBILE IMPROVEMENT: Use size props and object-contain
  return (
    <img
      src={src}
      alt={name}
      className="object-contain transition-transform hover:scale-110"
      style={{ width: size, height: size }}
      onError={(e) => (e.target.style.display = "none")}
    />
  );
}

function IconRow({ stack = [] }) {
  // MOBILE IMPROVEMENT: Changed gap-4 to a responsive smaller gap-2 on mobile
  return (
    <div className="flex flex-wrap gap-2 items-center mt-3">
      {stack.map((s) => (
        // MOBILE IMPROVEMENT: Smaller StackLogo size for IconRow on mobile
        <StackLogo key={s} name={s} size={24} /> 
      ))}
    </div>
  );
}

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

      // Get the correct radius based on current size
      const currentMinDim = Math.min(rect.width, rect.height) / 2;
      
      nodes.forEach((node, i) => {
        const idx = i + 1;
        // Adjusted radius calculation for better appearance across sizes. 
        // Base radius is now calculated from the current smallest dimension of the container.
        const radius = Math.max(
          currentMinDim * 0.3, // Min radius is 30% of half the smallest dimension
          currentMinDim * (0.3 + (idx % 6) * 0.05)
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
      el.removeEventListener("pointerenter", () => setHovering(true));
      el.removeEventListener("pointerleave", () => setHovering(false));
    };
  }, [hovering]);

  return (
    // MOBILE IMPROVEMENT: Increased container size on mobile (h-72) and mx-0 (removes margin)
    <div
      ref={containerRef}
      className="relative w-full max-w-xl h-72 sm:h-80 md:h-96 mx-auto rounded-full"
      aria-hidden="true"
      style={{ perspective: 800 }}
    >
      {/* Earth core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          // MOBILE IMPROVEMENT: Smaller core on mobile (w-20 h-20)
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/50 flex items-center justify-center text-white font-extrabold text-lg md:text-2xl"
        >
          Victor
        </motion.div>
      </div>

      {/* orbit items */}
      {items.map((name, i) => (
        <div
          key={name + i}
          // MOBILE IMPROVEMENT: Smaller orbit items on mobile (w-8 h-8)
          className="orbit-item absolute w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border border-indigo-100 dark:border-gray-700"
          style={{ transform: "translate3d(-9999px,-9999px,0)" }}
        >
          {/* Adjusted logo size to match container size on mobile */}
          <StackLogo name={name} size={28} /> 
        </div>
      ))}
    </div>
  );
}

function ModernProjectCard({ project, index }) {
  const isFeatured = project.featured;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    // PREMIUM IMPROVEMENT: Slight lift and increased shadow on hover
    hover: { y: -6, boxShadow: "0 20px 40px rgba(15,23,42,0.12)" },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
      // MOBILE IMPROVEMENT: Reduced padding on mobile (p-4)
      className={`relative rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-500 overflow-hidden 
        ${isFeatured 
          ? 'bg-gradient-to-br from-indigo-900 to-gray-900 text-white border-4 border-purple-500' 
          : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800'
        }`}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Zap size={14} className="text-yellow-300" /> Case Study
        </div>
      )}
      
      {/* MOBILE IMPROVEMENT: Reduced image height on mobile (h-40) */}
      <div className="h-40 sm:h-48 w-full overflow-hidden rounded-xl mb-4">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" 
        />
      </div>

      <div className="flex justify-between items-start">
        <div>
          {/* MOBILE IMPROVEMENT: Smaller title font on mobile (text-lg) */}
          <h4 className={`text-lg sm:text-xl font-bold ${isFeatured ? 'text-purple-300' : 'text-gray-900 dark:text-white'}`}>{project.title}</h4>
          {/* MOBILE IMPROVEMENT: Tighter margin top */}
          <p className="text-xs font-medium mt-0.5 sm:mt-1 text-indigo-500 dark:text-indigo-400">{project.subtitle}</p>
        </div>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0 ${isFeatured ? 'bg-purple-800 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
          {project.category}
        </span>
      </div>

      <p className={`text-sm mt-3 ${isFeatured ? 'text-gray-300' : 'text-slate-600 dark:text-slate-400'}`}>{project.description}</p>
      
      {/* Metrics Row - MOBILE IMPROVEMENT: Tighter gap on mobile (gap-x-4) */}
      <div className={`flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t ${isFeatured ? 'border-gray-700' : 'border-gray-100 dark:border-gray-800'}`}>
          {Object.entries(project.metrics || {}).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className={`text-xs font-semibold uppercase ${isFeatured ? 'text-purple-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{key}</span>
              <span className={`text-sm ${isFeatured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{value}</span>
            </div>
          ))}
      </div>

      {/* Stack & Links - MOBILE IMPROVEMENT: Tighter margin bottom (mb-1) */}
      <div className="mt-4 pt-4 border-t border-dashed border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-y-3">
        <IconRow stack={project.stack} />
        <div className="flex gap-4">
          <Link href={project.href} target="_blank" className={`text-sm font-semibold flex items-center gap-1 ${isFeatured ? 'text-yellow-400 hover:text-yellow-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
            Live <ChevronRight size={16} />
          </Link>
          <Link href={project.repo} target="_blank" className={`text-sm font-medium ${isFeatured ? 'text-gray-400 hover:text-gray-300' : 'text-slate-500 hover:text-slate-700'}`}>
            Code
          </Link>
        </div>
      </div>
    </motion.div>
  );
}


/* ---------------------------
 * Data (Unchanged)
 * --------------------------- */
const sampleProjects = [
    {
      title: "MediLab",
      subtitle: "Healthcare • Geo • Realtime",
      description:
        "Find and reserve medicines across pharmacies with QR verification, geolocation, and admin dashboards. Built for impact.",
      stack: ["Next.js", "Firebase", "TailwindCSS"],
      href: "https://medilab.vercel.app",
      repo: "https://github.com/digisalesmann/medilab",
      image: "/images/testt.png",
      category: "Web",
      featured: true,
      metrics: { users: "15.2K", latency: "120ms avg" },
    },
    {
      title: "MonadGuard",
      subtitle: "Sybil Checker & Allocation Simulator",
      description:
        "Sybil analysis and allocation simulations for the Monad ecosystem with crisp charts and reports.",
      stack: ["React", "Node.js"],
      href: "https://monadguard.vercel.app",
      repo: "https://github.com/digisalesmann/monadguard",
      image: "/images/monad.png",
      category: "Web3",
      metrics: { users: "5K+", reports: 120 },
    },
    {
      title: "Actora Labs",
      subtitle: "Web3 Growth Engine",
      description:
        "Full-stack growth tools for builders & ecosystems in Web3. Core infrastructure for community management.",
      stack: ["Next.js", "PostgreSQL", "Docker"],
      href: "https://actoralabs.vercel.app",
      repo: "https://github.com/digisalesmann/actoralabs",
      image: "/images/actora.png",
      category: "Web",
      metrics: { projects: 80, partners: 12 },
    },
    {
      title: "GeoSearch Pharmacy",
      subtitle: "Location-Based Services",
      description: "Geo-aware pharmacy discovery with reservation flow and QR pickup, improving logistics.",
      stack: ["Next.js", "TailwindCSS", "MongoDB"],
      image: "/images/geo.png",
      href: "#",
      repo: "#",
      category: "Web",
      metrics: { users: "9.2K" },
    },
    {
      title: "Secure API Gateway",
      subtitle: "Backend Infrastructure",
      description: "Implemented role-based authorization, rate limiting, and comprehensive audit logging for high-traffic APIs.",
      stack: ["Node.js", "Express"],
      image: "/images/secure.png",
      href: "#",
      repo: "#",
      category: "Web",
      metrics: { reqs: "1M+/day", latency: "50ms" },
    },
    {
      title: "Web3 Token Vesting App",
      subtitle: "DeFi Tool",
      description: "Smart contract interface for secure and time-locked token distribution for crypto projects.",
      stack: ["React", "Solidity"],
      image: "/images/vest.webp", // Assuming you have a relevant image
      href: "#",
      repo: "#",
      category: "Web3",
      metrics: { contracts: 15, value: "$500K+" },
    },
  ];

  const categories = [
    { name: "All Projects", filter: "All" },
    { name: "Web & SaaS", filter: "Web" },
    { name: "Blockchain", filter: "Web3" },
    // { name: "AI/ML Experiments", filter: "AI" }, // Add this if you have AI projects
  ];
  
const processSteps = [
  { title: "Discover & Define", text: "Understand objectives, stakeholders, constraints, and define core metrics." },
  { title: "Architect & Plan", text: "Define the system architecture, select the tech stack, and set milestones." },
  { title: "Design & UX", text: "High-fidelity UX, accessible component design, and brand polish." },
  { title: "Build & Test", text: "Iterative development, code reviews, rigorous testing, and CI/CD." },
  { title: "Deploy & Optimize", text: "Launch to production, real-time monitoring, and performance optimization." },
];

const testimonials = [
  { name: "Jennifer Andrew", text: "Victor's platform transformed healthcare access in my region. True impact.", role: "CEO, Health Connect" },
  { name: "iData Inc.", text: "We gained observability, cut operational costs by 20%, and scaled effortlessly.", role: "CTO" },
  { name: "PharmaHub", text: "The reservation + QR feature reduced patient wait times by over 60%. Highly efficient.", role: "Operations Lead" },
];

const awards = [
  { name: "Top Health Tech 2024", detail: "Regional recognition for the MediLab healthcare innovation.", icon: <Zap /> },
  { name: "Best Monad Builder", detail: "Recognized for contributions to the Monad ecosystem and developer tools.", icon: <User /> },
];

const techStack = [
  "Next.js",
  "React",
  "TailwindCSS",
  "Node.js",
  "PostgreSQL",
  "Firebase",
  "Solidity",
  "Docker",
  "Kubernetes",
];

function SkillsGrid() {
  return (
    // MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12)
    <section className="py-12 sm:py-20 bg-pink-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-3xl) */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            My Core Technologies
        </h2>
        {/* TechOrbit is already made more mobile-friendly */}
        <TechOrbit items={techStack} />
        {/* MOBILE IMPROVEMENT: Tighter grid on mobile (3 columns) and reduced gap (gap-3) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6">
          {techStack.map((s) => (
            <motion.div
              key={s}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
              // MOBILE IMPROVEMENT: Reduced padding on mobile (p-3)
              className="p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col items-center border border-gray-100 dark:border-gray-800"
            >
              {/* MOBILE IMPROVEMENT: Smaller logo on mobile (size={28}) */}
              <StackLogo name={s} size={28} /> 
              {/* MOBILE IMPROVEMENT: Smaller text on mobile (text-xs) */}
              <div className="mt-2 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">{s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function BlogPreview() {
  const posts = [
    { title: "Scaling Realtime Apps", excerpt: "How I optimized sockets for 50k users.", date: "Aug 2025" },
    { title: "AI in Healthcare", excerpt: "Privacy-preserving federated learning for IoT.", date: "Jul 2025" },
    { title: "Building Web3 Growth Engines", excerpt: "Lessons from Actora Labs.", date: "Jun 2025" },
  ];
  return (
    // MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12)
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-3xl) and reduced margin bottom */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Insights & Articles</h2>
        {/* MOBILE IMPROVEMENT: Grid defaults to 1 column on mobile, using md:grid-cols-3 */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
          {posts.map((p) => (
            <article key={p.title} className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{p.excerpt}</p>
              {/* PREMIUM IMPROVEMENT: Added subtle arrow to "Read More" */}
              <div className="text-xs mt-4 text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                Read More <ChevronRight size={14} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
    const [open, setOpen] = useState(null);
    const faqs = [
      { q: "Do you take freelance projects?", a: "Yes, I collaborate on impactful projects across Web, AI, and Web3. Send me a message to discuss scope." },
      { q: "What’s your core tech stack?", a: "I primarily use React, Next.js, Node.js, Postgres, and modern cloud infrastructure (AWS/Vercel). I'm also proficient in Solidity and Web3 frameworks." },
      { q: "Can we partner long-term?", a: "Absolutely — I thrive on building long-term partnerships, offering ongoing support, feature development, and architectural scaling." },
    ];
    return (
      // MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12)
      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-3xl) and reduced margin bottom */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={f.q} className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between text-left font-semibold text-base sm:text-lg" // MOBILE IMPROVEMENT: Smaller button font
                >
                  {f.q}
                  <span className="text-indigo-600 dark:text-indigo-400 text-xl transition-transform duration-300 transform"
                    style={{ transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    <ChevronRight size={24} />
                  </span>
                </button>
                <AnimatePresence>
                    {open === i && (
                        <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 text-slate-600 dark:text-slate-400 overflow-hidden text-sm sm:text-base" // MOBILE IMPROVEMENT: Smaller answer font
                        >
                            {f.a}
                        </motion.p>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

function Contact() {
    // Reusing the form but enhancing the look
    return (
        // MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12)
        <section className="py-12 sm:py-20 bg-gradient-to-tr from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-3xl) */}
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Let’s Turn Ideas into Impact
                </h2>
                {/* MOBILE IMPROVEMENT: Smaller font and margin bottom on mobile (text-base mb-6) */}
                <p className="mb-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                    Ready to start a project? I'm currently open to full-stack, AI, and Web3 collaborations.
                </p>
                
                {/* MOBILE IMPROVEMENT: Reduced padding on mobile (p-4) */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 sm:p-8 mx-auto max-w-xl">
                    <form className="flex flex-col gap-4">
                        {/* FIX: Removed conflicting 'focus:ring-2' in favor of the 'focus:ring-1' for a unified, slightly smaller focus */}
                        <input type="text" placeholder="Your name" className="p-3 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-indigo-500 transition text-sm sm:text-base" required />
                        <input type="email" placeholder="Your email" className="p-3 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-indigo-500 transition text-sm sm:text-base" required />
                        <textarea placeholder="Tell me about your project..." rows={4} className="p-3 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-indigo-500 transition text-sm sm:text-base" required />
                        {/* MOBILE IMPROVEMENT: Text size for button */}
                        <button type="submit" className="btn-primary w-full px-6 py-3 rounded-xl shadow-lg text-base">Send Message</button>
                    </form>
                </div>
                
                {/* MOBILE IMPROVEMENT: Reduced margin top on mobile (mt-8) */}
                <div className="mt-8 flex justify-center gap-6">
                    <a href="#" target="_blank" aria-label="Twitter profile" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"><Twitter size={24} /></a>
                    <a href="#" target="_blank" aria-label="LinkedIn profile" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"><Linkedin size={24} /></a>
                    <a href="#" target="_blank" aria-label="GitHub profile" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"><Github size={24} /></a>
                    <a href="mailto:test@email.com" aria-label="Send an email" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"><Mail size={24} /></a>
                </div>
            </div>
        </section>
    );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return sampleProjects;
    return sampleProjects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950">
      {/* --- HERO SECTION --- */}
      {/* MOBILE IMPROVEMENT: Tighter padding on mobile (pt-12 pb-8) */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8 sm:pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // MOBILE IMPROVEMENT: Smaller font on mobile (text-4xl) for better fit
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            My Projects
          </span>{" "}
          & Case Studies
        </motion.h1>
        {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-base) */}
        <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          A deep dive into the engineering, design, and impact of my full-stack, Web3, and AI solutions.
        </p>

        {/* Rolling orbit */}
        {/* MOBILE IMPROVEMENT: Reduced margin top (mt-10) */}
        <div className="mt-10 sm:mt-16">
          <TechOrbit items={techStack} />
        </div>
      </header>

      {/* --- PROJECTS & FILTER --- */}
      {/* MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12) */}
      <main id="projects" className="py-12 sm:py-16 bg-pink-50/50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter Bar - MOBILE IMPROVEMENT: Using overflow-x-auto for horizontal scroll on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            // MOBILE IMPROVEMENT: Tighter margin bottom (mb-8), reduced padding (p-2)
            className="flex flex-nowrap overflow-x-auto justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg max-w-md mx-auto border border-gray-100 dark:border-gray-800"

          >
            {categories.map(({ name, filter }) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                // MOBILE IMPROVEMENT: flex-shrink-0 ensures buttons don't scrunch, smaller padding (px-3 py-1) and font (text-sm)
                className={`flex-shrink-0 px-3 py-1 sm:px-4 sm:py-2 text-sm font-semibold rounded-full transition-all duration-300
                  ${activeFilter === filter
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {name}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                  <motion.div
                      key={activeFilter} // Key changes on filter change to trigger AnimatePresence
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      // MOBILE IMPROVEMENT: Grid defaults to 1 column on mobile, using md:grid-cols-2 lg:grid-cols-3
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" 
                  >
                      {filteredProjects.map((p, i) => (
                          <ModernProjectCard key={p.title} project={p} index={i} />
                      ))}
                      {filteredProjects.length === 0 && (
                          <p className="col-span-full text-center text-xl text-gray-500 py-16">No projects found in this category.</p>
                      )}
                  </motion.div>
              </AnimatePresence>
          </div>
        </div>
      </main>
      
      {/* --- SKILLS & TECH ORBIT --- */}
      <SkillsGrid />

      {/* --- PROCESS - Animated Timeline --- */}
      {/* MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12) */}
      <section className="py-12 sm:py-20 bg-gray-900 dark:bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-3xl) and reduced margin bottom */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 sm:mb-16 text-white">My Development Process</h2>
          <div className="relative">
            {/* Timeline vertical line - MOBILE IMPROVEMENT: Visible on mobile, shifted to the left */}
            <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-900 opacity-40 rounded-full" style={{zIndex:0}}></div>
            {/* MOBILE IMPROVEMENT: Tighter space between steps on mobile (space-y-10) */}
            <div className="space-y-10 sm:space-y-12">
              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.title + i}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    // MOBILE IMPROVEMENT: Always single column on mobile, using 'pl-16' to clear the vertical line, removing flex-row/reverse on mobile
                    className="relative flex flex-col items-start pl-16 md:pl-0 md:flex-row md:justify-start"
                  >
                    {/* Numbered gradient circle - MOBILE IMPROVEMENT: Fixed position on the left on mobile */}
                    <div className="z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-gray-900 absolute top-0 left-0 md:relative md:order-2 md:mx-auto md:w-14 md:h-14">
                      {i + 1}
                    </div>
                    {/* Card - MOBILE IMPROVEMENT: Adjusted margins for single column on mobile, smaller font (text-base) */}
                    <div className={`flex-1 p-5 rounded-2xl shadow-xl border border-indigo-700/30 text-left bg-gray-800 ${isLeft ? 'md:mr-12 md:ml-0' : 'md:ml-12 md:mr-0'} w-full`}>
                      <div className="font-extrabold text-white text-lg sm:text-xl mb-1">{step.title}</div>
                      <div className="text-slate-300 text-sm sm:text-base">{step.text}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS & AWARDS --- */}
      {/* MOBILE IMPROVEMENT: Reduced vertical padding on mobile (py-12) */}
      <section className="py-12 sm:py-20 bg-pink-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-3xl) and reduced margin bottom */}
          <h2 className="text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-purple-600 dark:text-purple-400 drop-shadow-md">
            Impact & Recognition
          </h2>
          
          {/* Awards - MOBILE IMPROVEMENT: Grid defaults to 1 column on mobile, using md:grid-cols-2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {awards.map((a, i) => (
              <motion.div 
                key={a.name + i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center border-l-4 border-purple-500"
              >
                <span className="text-purple-500 mb-2">{a.icon}</span>
                <div className="font-extrabold text-xl mb-1 text-purple-600 dark:text-purple-300">{a.name}</div>
                <p className="text-slate-600 dark:text-gray-300 text-center">{a.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials - MOBILE IMPROVEMENT: Grid defaults to 1 column on mobile, using md:grid-cols-3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name + i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-6 bg-white dark:bg-gray-950 rounded-2xl shadow-xl flex flex-col items-center border border-gray-100 dark:border-gray-800"
              >
                {/* MOBILE IMPROVEMENT: Smaller quote font (text-base) */}
                <p className="text-base italic text-gray-700 dark:text-gray-300 mb-4">“{t.text}”</p>
                <div className="font-semibold text-indigo-600 dark:text-indigo-300">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG PREVIEW --- */}
      <BlogPreview />
      
      {/* --- FAQ --- */}
      <FAQ />

      {/* --- GLOBAL CTA --- */}
      {/* MOBILE IMPROVEMENT: Tighter padding, smaller font, and use flex-col on mobile */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center my-8 sm:my-12 mx-4 md:mx-auto max-w-7xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-500/50">
        {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-2xl) */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight px-2">Ready to Build Something Impactful?</h2>
        {/* MOBILE IMPROVEMENT: Smaller font on mobile (text-sm) */}
        <p className="mb-6 text-sm sm:text-lg max-w-3xl mx-auto px-4">I collaborate on meaningful products — from research to production, ensuring scalable and reliable results.</p>
        {/* MOBILE IMPROVEMENT: Default to flex-col on mobile */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 px-4">
          <Link href="mailto:you@domain.com" className="btn-primary-inverse px-8 py-3 rounded-full text-base sm:text-lg">Contact Me</Link>
          <Link href="/resume.pdf" className="btn-outline-inverse px-8 py-3 rounded-full text-base sm:text-lg">Download CV</Link>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <Contact />

      {/* --- GLOBAL STYLES --- */}
      <style jsx global>{`
        .btn-primary {
          background: linear-gradient(90deg, #6366f1, #ec4899);
          color: white;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
          transition: transform 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        .btn-primary-inverse {
          background: white;
          color: #6366f1; /* text-indigo-500 */
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .btn-primary-inverse:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        .btn-outline-inverse {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: white;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn-outline-inverse:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}