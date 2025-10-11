"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, Zap, ChevronRight, User, Globe } from "lucide-react";

/* ---------------------------
 * Reusable Components (Minor Adjustments)
 * --------------------------- */

function StackLogo({ name, size = 36 }) {
  const lower = name.toLowerCase().replace(/\s+|[.]/g, ""); // removes spaces & dots

  const aliases = {
    node: "nodejs-original",
    nodejs: "nodejs-original",
    nextjs: "nextjs-original",
    react: "reactnative-original",
    reactnative: "reactnative-original",
  };

  // NOTE: This assumes you have the /logos directory and SVGs named correctly.
  const fileName = aliases[lower] || `${lower}-original`;
  const src = `/logos/${fileName}.svg`;

  return (
    <img
      src={src}
      alt={name}
      className="object-contain transition-transform hover:scale-110 flex-shrink-0"
      style={{ width: size, height: size }}
      // Hide the broken image icon
      onError={(e) => { e.target.style.display = "none"; }} 
    />
  );
}

function IconRow({ stack = [] }) {
  return (
    // MOBILE IMPROVEMENT: Tighter gap-2 for better horizontal space
    <div className="flex flex-wrap gap-2 items-center mt-3">
      {stack.map((s) => (
        // MOBILE IMPROVEMENT: Smaller StackLogo size for IconRow (size 20)
        <StackLogo key={s} name={s} size={20} /> 
      ))}
    </div>
  );
}

/* ----------------------------------------------------
 * NEW Component: TechMarquee (Unchanged, already good)
 * ---------------------------------------------------- */
function TechMarquee({ items }) {
  // Duplicate the items to ensure a seamless loop
  const marqueeItems = [...items, ...items, ...items];
  const totalItems = items.length;

  return (
    // Premium UI: Large, subtle gradient container
    <div className="relative overflow-hidden w-full py-6 md:py-8 bg-gradient-to-r from-pink-50/50 via-white dark:from-gray-900 dark:via-gray-950 shadow-inner">
      
      {/* CSS Animation Keyframes for continuous scroll */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalItems * 33.3333}%); } /* Adjust to cover all unique items */
        }
        .marquee-content {
            animation: marquee 60s linear infinite;
        }
      `}</style>
      
      {/* Premium UI: Subtle Fade Masks at the edges */}
      {/* COLOR CHANGE: White/Pink gradient for fade to match light mode theme */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-pink-50 dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-pink-50 dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>

      <div className="flex marquee-content hover:animation-play-state:paused" style={{ width: `${300 / 1}%` }}>
        {marqueeItems.map((name, i) => (
          <div 
            key={name + i} 
            className="flex-shrink-0 px-4 flex items-center justify-center" 
            style={{ width: `${100 / items.length}%` }}
          >
            {/* MOBILE IMPROVEMENT: Smaller logo size (size 40) for Marquee */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                // COLOR CHANGE: Card background to white in light mode
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
            >
                <StackLogo name={name} size={40} /> 
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ----------------------------------------------------
 * Project Card (Unchanged, already mobile-optimized)
 * ---------------------------------------------------- */

function ModernProjectCard({ project, index }) {
  const isFeatured = project.featured;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -6, boxShadow: "0 20px 40px rgba(15,23,42,0.12)" },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
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
      
      <div className="h-40 sm:h-48 w-full overflow-hidden rounded-xl mb-4">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" 
        />
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h4 className={`text-lg sm:text-xl font-bold ${isFeatured ? 'text-purple-300' : 'text-gray-900 dark:text-white'}`}>{project.title}</h4>
          <p className="text-xs font-medium mt-0.5 sm:mt-1 text-indigo-500 dark:text-indigo-400">{project.subtitle}</p>
        </div>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0 ${isFeatured ? 'bg-purple-800 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
          {project.category}
        </span>
      </div>

      <p className={`text-sm mt-3 ${isFeatured ? 'text-gray-300' : 'text-slate-600 dark:text-slate-400'}`}>{project.description}</p>
      
      <div className={`flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t ${isFeatured ? 'border-gray-700' : 'border-gray-100 dark:border-gray-800'}`}>
          {Object.entries(project.metrics || {}).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className={`text-xs font-semibold uppercase ${isFeatured ? 'text-purple-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{key}</span>
              <span className={`text-sm ${isFeatured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{value}</span>
            </div>
          ))}
      </div>

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
    // { name: "AI/ML Experiments", filter: "AI" }, 
  ];
  
const processSteps = [
  { title: "Discover & Define", icon: <User size={24} />, text: "Understand objectives, stakeholders, constraints, and define core metrics." },
  { title: "Architect & Plan", icon: <Zap size={24} />, text: "Define the system architecture, select the tech stack, and set milestones." },
  { title: "Design & UX", icon: <Globe size={24} />, text: "High-fidelity UX, accessible component design, and brand polish." },
  { title: "Build & Test", icon: <Github size={24} />, text: "Iterative development, code reviews, rigorous testing, and CI/CD." },
  { title: "Deploy & Optimize", icon: <ChevronRight size={24} />, text: "Launch to production, real-time monitoring, and performance optimization." },
];

const testimonials = [
  { name: "Jennifer Andrew", text: "Victor's platform transformed healthcare access in my region. True impact.", role: "CEO, Health Connect" },
  { name: "iData Inc.", text: "We gained observability, cut operational costs by 20%, and scaled effortlessly.", role: "CTO" },
  { name: "PharmaHub", text: "The reservation + QR feature reduced patient wait times by over 60%. Highly efficient.", role: "Operations Lead" },
];

const awards = [
  { name: "Top Health Tech 2024", detail: "Regional recognition for the MediLab healthcare innovation.", icon: <Zap size={24} /> },
  { name: "Best Monad Builder", detail: "Recognized for contributions to the Monad ecosystem and developer tools.", icon: <User size={24} /> },
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

/* ---------------------------
 * Section Components
 * --------------------------- */

function SkillsGrid() {
  return (
    // COLOR CHANGE: Subtle pink for light mode background
    <section className="py-12 sm:py-20 bg-pink-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Core Technology Stack
        </h2>
        {/* Tighter grid on mobile (3 columns) and reduced gap (gap-3) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6">
          {techStack.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              // COLOR CHANGE: Card background to white in light mode
              className="p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col items-center border border-gray-100 dark:border-gray-800"
            >
              {/* Smaller logo on mobile (size={36}) */}
              <StackLogo name={s} size={36} /> 
              {/* Smaller text on mobile (text-xs) */}
              <div className="mt-2 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">{s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * NEW: AnimatedProcessTimeline Component
 * Implements a modern, responsive, staggered timeline animation.
 */
function AnimatedProcessTimeline({ steps }) {
  return (
    <section className="py-12 sm:py-20 bg-gray-900 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
          My <span className="text-white"></span> Development Process
        </h2>
        <div className="relative">
          {/* Timeline vertical line - more subtle and gradient */}
          <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-indigo-600 to-gray-800 opacity-60 rounded-full z-0"></div>
          
          <div className="space-y-10 sm:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title + i}
                // Animation: slide in from the side and fade in
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                
                // Layout: Always single column, left-aligned on mobile
                className="relative flex items-start pl-16 pr-4 sm:pr-0" 
              >
                {/* Numbered gradient circle & icon */}
                <div className="z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-2xl border-4 border-gray-900 absolute top-0 left-0">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, delay: i * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                  >
                    {step.icon || i + 1}
                  </motion.div>
                </div>
                
                {/* Card */}
                <motion.div 
                    whileHover={{ scale: 1.02, backgroundColor: '#374151' }} // Subtle hover effect for dark mode card
                    className="flex-1 p-5 rounded-2xl shadow-xl border border-pink-700/30 text-left bg-gray-800 w-full transform origin-left"
                >
                  <div className="font-extrabold text-white text-lg sm:text-xl mb-1 flex items-center gap-2">
                    {step.title}
                  </div>
                  <div className="text-slate-300 text-sm sm:text-base">{step.text}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* COLOR CHANGE: Gradient includes pink for consistency */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Insights & Articles</h2>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
          {posts.map((p, i) => (
            <motion.article 
              key={p.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              // COLOR CHANGE: Card background to white in light mode
              className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
            >
              <h3 className="font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{p.excerpt}</p>
              <div className="text-xs mt-4 text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                Read More <ChevronRight size={14} />
              </div>
            </motion.article>
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
      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* COLOR CHANGE: Gradient includes pink for consistency */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div 
                key={f.q} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                // COLOR CHANGE: Card background to white in light mode
                className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between text-left font-semibold text-base sm:text-lg" 
                >
                  {f.q}
                  {/* Premium UI: Smooth rotation of icon */}
                  <motion.span 
                    animate={{ rotate: open === i ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-indigo-600 dark:text-indigo-400 text-xl flex-shrink-0"
                  >
                    <ChevronRight size={24} />
                  </motion.span>
                </button>
                <AnimatePresence>
                    {open === i && (
                        <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 text-slate-600 dark:text-slate-400 overflow-hidden text-sm sm:text-base" 
                        >
                            {f.a}
                        </motion.p>
                    )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

function Contact() {
    return (
      // COLOR CHANGE: Background gradient uses pink and purple for a consistent, soft-toned feel in light mode
        <section className="py-12 sm:py-20 bg-gradient-to-tr from-pink-100 to-purple-50 dark:from-gray-900 dark:to-gray-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                    Let’s Turn Ideas into Impact 💡
                </h2>
                <p className="mb-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                    Ready to start a project? I'm currently open to full-stack, AI, and Web3 collaborations.
                </p>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    // COLOR CHANGE: Card background to white in light mode
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 sm:p-8 mx-auto max-w-xl border border-pink-200 dark:border-gray-700"
                >
                    <form className="flex flex-col gap-4">
                        <input type="text" placeholder="Your name" className="p-3 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base" required />
                        <input type="email" placeholder="Your email" className="p-3 rounded-xl border dark:border-border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base" required />
                        <textarea placeholder="Tell me about your project..." rows={4} className="p-3 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base" required />
                        {/* COLOR CHANGE: Button uses Pink/Purple gradient */}
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white w-full px-6 py-3 rounded-xl shadow-lg text-base font-semibold transition duration-300"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
                
                <div className="mt-8 flex justify-center gap-6">
                    <a href="#" target="_blank" aria-label="Twitter profile" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition"><Twitter size={24} /></a>
                    <a href="#" target="_blank" aria-label="LinkedIn profile" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition"><Linkedin size={24} /></a>
                    <a href="#" target="_blank" aria-label="GitHub profile" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition"><Github size={24} /></a>
                    <a href="mailto:test@email.com" aria-label="Send an email" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition"><Mail size={24} /></a>
                </div>
            </div>
        </section>
    );
}

/* ---------------------------
 * Main Page Component
 * --------------------------- */

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return sampleProjects;
    return sampleProjects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    // PRIMARY CHANGE: Consistent pink-50 background for light mode
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950">
      
      {/* --- HERO SECTION --- */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-0 sm:pb-0 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
        >
          {/* COLOR CHANGE: Gradient includes pink for consistency */}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            My Projects
          </span>{" "}
          & Case Studies
        </motion.h1>
        <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          A deep dive into the engineering, design, and impact of my full-stack, Web3, and AI solutions.
        </p>
      </header>

      {/* --- TECH MARQUEE (The Engaging Replacement) --- */}
      <div className="mt-8 sm:mt-12">
        <TechMarquee items={techStack} />
      </div>

      {/* --- PROJECTS & FILTER --- */}
      {/* COLOR CHANGE: Background section uses subtle pink-50/50 */}
      <main id="projects" className="py-12 sm:py-16 bg-pink-50/50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            // COLOR CHANGE: Card background to white in light mode
            className="flex flex-nowrap overflow-x-auto justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg max-w-md mx-auto border border-gray-100 dark:border-gray-800"
          >
            {categories.map(({ name, filter }) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-3 py-1 sm:px-4 sm:py-2 text-sm font-semibold rounded-full transition-all duration-300
                  ${activeFilter === filter
                    // COLOR CHANGE: Filter button uses pink-600/pink-500 for a pop
                    ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md shadow-pink-500/30'
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
      
      {/* --- SKILLS GRID --- */}
      <SkillsGrid />

      {/* --- PROCESS - Animated Timeline (NEW COMPONENT) --- */}
      <AnimatedProcessTimeline steps={processSteps} />

      {/* --- TESTIMONIALS & AWARDS --- */}
      {/* COLOR CHANGE: Background section uses white (or light pink-50/50 from main container) for clean contrast */}
      <section className="py-12 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* COLOR CHANGE: Header uses pink for consistency */}
          <h2 className="text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-pink-600 dark:text-pink-400 drop-shadow-md">
            Impact & Recognition
          </h2>
          
          {/* Awards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {awards.map((a, i) => (
              <motion.div 
                key={a.name + i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                // COLOR CHANGE: Card background to white/light-gray in light mode, border is pink
                className="p-6 bg-pink-50 dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center border-l-4 border-pink-500"
              >
                <span className="text-pink-500 mb-2">{a.icon}</span>
                <h4 className="font-bold text-xl mb-1">{a.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{a.detail}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                // COLOR CHANGE: Card background to white in light mode
                className="text-left p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
              >
                <p className="italic text-base sm:text-lg mb-4 text-slate-700 dark:text-slate-300">"{t.text}"</p>
                <div className="font-semibold text-pink-600 dark:text-pink-400">{t.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG PREVIEW --- */}
      <BlogPreview />

      {/* --- FAQ --- */}
      <FAQ />

      {/* --- CONTACT --- */}
      <Contact />
    </div>
  );
}