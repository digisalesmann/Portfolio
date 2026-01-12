"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- DATA CONFIGURATION ---
const techStack = {
  Frontend: [
    { name: "React", icon: "/logos/reactnative-original.svg" },
    { name: "Next.js", icon: "/logos/nextjs-original.svg" },
    { name: "Tailwind", icon: "/logos/tailwindcss-original.svg" },
    { name: "TypeScript", icon: "/logos/typescript-original.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "/logos/nodejs-original.svg" },
    { name: "Postgres", icon: "/logos/postgresql-original.svg" },
    { name: "MongoDB", icon: "/logos/mongodb-original.svg" },
    { name: "GraphQL", icon: "/logos/graphql-plain.svg" },
  ],
  "AI & ML": [
    { name: "Python", icon: "/logos/python-original.svg" },
    { name: "TensorFlow", icon: "/logos/tensorflow-original.svg" },
    { name: "PyTorch", icon: "/logos/pytorch-original.svg" },
    { name: "Scikit", icon: "/logos/scikitlearn-original.svg" },
  ],
  Infrastructure: [
    { name: "Docker", icon: "/logos/docker-original.svg" },
    { name: "Kubernetes", icon: "/logos/kubernetes-original.svg" },
    { name: "Vercel", icon: "/logos/vercel-original.svg" },
    { name: "GitHub", icon: "/logos/github-original.svg" },
  ],
};

const projects = [
  {
    title: "MediLab",
    id: "MD-01",
    excerpt: "Intelligent medical platform for diagnostic automation.",
    link: "https://medilab-kappa.vercel.app/",
    image: "/images/testt.png"
  },
  {
    title: "Ace Experience",
    id: "AX-02",
    excerpt: "Heritage-rich professional culinary tech platform.",
    link: "https://ace-xperience.vercel.app/",
    image: "/images/ace.png"
  },
  {
    title: "MonadGuard",
    id: "MG-03",
    excerpt: "Sybil analysis and allocation sims for Monad ecosystem.",
    link: "https://monadguard-cv2w.vercel.app/",
    image: "/images/gg.png"
  },
];

const stats = [
  { label: "Production Builds", value: "12+" },
  { label: "Systems Architecture", value: "3 YRS" },
  { label: "Web3 Protocol Contribs", value: "08" },
  { label: "Success Rate", value: "100%" },
];

// --- MAIN COMPONENT ---
export default function IndustrialHome() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = ["Next-Gen Stack", "Web3 Infra", "Neural Arch"];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fullText = phrases[phraseIndex];
    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setCurrentText(fullText.substring(0, isDeleting ? currentText.length - 1 : currentText.length + 1));
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <div className="bg-[#050505] text-[#e5e5e5] font-sans selection:bg-indigo-500 selection:text-white">
      {/* Precision Scroll Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 origin-left z-[100]" style={{ scaleX }} />

      {/* --- HERO: THE COMMAND CENTER --- */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.15]" 
             style={{ backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8 mt-10 sm:mt-0"
          >
            <span className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-xs font-mono tracking-[0.3em] text-indigo-400 uppercase">System Status: Active</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10">
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
              {currentText}
            </span>
            <span className="inline-block w-2 h-12 md:h-24 bg-indigo-500 ml-3 animate-pulse" />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Victor: Full-stack engineer building web, mobile, and cloud solutions. Experienced with React, Next.js, Node.js, and modern infrastructure.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/projects" className="group relative px-10 py-5 bg-white text-black font-bold tracking-tighter overflow-hidden transition-all uppercase text-sm">
                <span className="relative z-10">Execute Project_View</span>
                <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link href="/contact" className="px-10 py-5 border border-white/10 hover:border-white/40 transition-all font-bold uppercase tracking-tighter text-sm">
                Initiate_Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS: TECHNICAL BENCHMARKS --- */}
      <section className="border-b border-white/5 py-12 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-1">{stat.value}</span>
                <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENTO TECH STACK --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-indigo-500 uppercase tracking-[0.5em] mb-4">// Capability_Log</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Core Infrastructure</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {Object.entries(techStack).map(([category, items], idx) => (
            <motion.div 
              key={category}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className={`p-10 border border-white/5 bg-[#0a0a0a] rounded-none flex flex-col justify-between transition-all 
                         ${idx === 0 || idx === 3 ? 'md:col-span-7' : 'md:col-span-5'}`}
            >
              <div className="flex justify-between items-start mb-12">
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">{category}</h4>
                <span className="text-[10px] text-indigo-500/50 font-mono">STK_0{idx + 1}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {items.map(tech => (
                  <div key={tech.name} className="group flex flex-col items-center text-center gap-3">
                    <img src={tech.icon} alt={tech.name} className="h-10 w-10 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100 scale-90 group-hover:scale-110" />
                    <span className="text-[10px] font-mono uppercase text-gray-600 group-hover:text-indigo-400 transition-colors">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PROJECT HUD: MINIMALIST GRID --- */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6">
            <div className="mb-16 gap-6 flex flex-col md:flex-row md:justify-between md:items-end items-start">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none text-left">Protocol <br/> Deployments</h2>
              <Link href="/projects" className="text-xs font-mono text-indigo-500 hover:text-white transition-colors underline underline-offset-8 text-left md:text-right">VIEW_ALL_REPOS</Link>
            </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
             {projects.map((p, i) => (
               <div key={i} className="group relative aspect-[4/5] overflow-hidden bg-black transition-all">
                 <img src={p.image} className="object-cover w-full h-full opacity-30 group-hover:opacity-60 transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-indigo-500 bg-indigo-500/10 self-start px-2 py-1">{p.id}</span>
                    <div>
                      <h4 className="text-2xl font-bold uppercase mb-3 tracking-tighter">{p.title}</h4>
                      <p className="text-sm text-gray-500 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p.excerpt}</p>
                      <Link href={p.link} className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-indigo-500 pb-1 hover:text-indigo-400 transition-colors">
                        Launch_Instance →
                      </Link>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- CTA: FINAL HANDSHAKE --- */}
      <section className="py-32 relative overflow-hidden text-center border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10">READY TO <br/> <span className="text-indigo-500">ARCHITECT?</span></h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12 font-light">Available for high-stakes engineering roles, Web3 protocol development, and specialized AI research in 2026.</p>
          <Link href="/contact" className="inline-block bg-white text-black px-12 py-6 font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
            Open_Comms
          </Link>
        </div>
      </section>
    </div>
  );
}