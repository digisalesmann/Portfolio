"use client";

import React, { useState, useMemo, useRef } from "react";

// --- Web3Forms Config ---
const WEB3FORMS_ACCESS_KEY = "5990f7bc-58f5-4b00-8630-74158a28db18";
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Terminal, ExternalLink, Zap, Monitor, Smartphone } from "lucide-react";

/* ---------------------------
 * Reusable Components
 * --------------------------- */

function TechTag({ children }) {
  return (
    <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono text-indigo-400 uppercase tracking-widest">
      {children}
    </span>
  );
}

function TechMarquee({ items }) {
  const marqueeItems = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden w-full py-3 border-y border-white/5 bg-black/80 backdrop-blur-md z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {marqueeItems.map((name, i) => (
          <div key={name + i} className="flex items-center px-8 gap-3">
            <div className="w-1.5 h-1.5 bg-indigo-600 rotate-45" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-400">{name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
}

/* ---------------------------
 * Browser Chrome Mockup (Websites)
 * --------------------------- */
function BrowserMockup({ image, video, title }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Browser chrome bar */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-t-lg px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2 bg-black/50 border border-white/5 rounded px-2 py-0.5 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
          <span className="text-[8px] font-mono text-gray-600 truncate">{title.toLowerCase().replace(/\s/g, '')}.xyz</span>
        </div>
        <Monitor size={10} className="text-gray-600" />
      </div>

      {/* Screen area */}
      <div className="relative border border-t-0 border-white/10 overflow-hidden bg-zinc-900" style={{ aspectRatio: '16/10' }}>
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered && video ? 'opacity-0' : 'opacity-100'}`}
        />
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {!isHovered && video && (
          <div className="absolute inset-0 flex items-end justify-start p-3 pointer-events-none">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/70 border border-white/10 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider">Hover to preview</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------
 * Phone Mockup (Mobile Apps)
 * Video autoplays immediately on mount — no static image.
 * --------------------------- */
function PhoneMockup({ video, title }) {
  const videoRef = useRef(null);

  React.useEffect(() => {
    if (videoRef.current && video) {
      videoRef.current.play().catch(() => {});
    }
  }, [video]);

  return (
    <div className="relative w-full flex items-center justify-center py-4 bg-[#0d0d0d]">
      {/* Centered phone shell */}
      <div className="relative" style={{ width: '140px', height: '280px' }}>
        {/* Phone outer shell */}
        <div className="absolute inset-0 rounded-[2rem] border-2 border-white/15 bg-[#111] shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#111] rounded-b-xl z-10 flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div className="w-4 h-1 rounded-full bg-gray-700" />
          </div>

          {/* Screen area */}
          <div className="absolute inset-[3px] rounded-[1.7rem] overflow-hidden bg-zinc-900">
            {video ? (
              <video
                ref={videoRef}
                src={video}
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Smartphone size={32} className="text-gray-700" />
              </div>
            )}
          </div>
        </div>

        {/* Home bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20 z-10" />

        {/* Side buttons */}
        <div className="absolute left-[-3px] top-16 w-1 h-6 rounded-l bg-white/10" />
        <div className="absolute left-[-3px] top-24 w-1 h-6 rounded-l bg-white/10" />
        <div className="absolute right-[-3px] top-20 w-1 h-8 rounded-r bg-white/10" />
      </div>

      {/* Label */}
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20">
        <Smartphone size={9} className="text-indigo-400" />
        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider">Mobile App</span>
      </div>
    </div>
  );
}

/* ---------------------------
 * Project Card
 * --------------------------- */
function ProjectCard({ project, onRequestAccess }) {
  const isApp = project.type === "app";

  return (
    <motion.div
      layout
      key={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group relative bg-[#0a0a0a] flex flex-col h-full"
    >
      {/* Media area */}
      <div className="relative border-b border-white/5">
        {isApp ? (
          <PhoneMockup video={project.video} title={project.title} />
        ) : (
          <BrowserMockup image={project.image} video={project.video} title={project.title} />
        )}
        <div className="absolute top-4 left-4 z-10">
          <TechTag>{project.tag}</TechTag>
        </div>
      </div>

      {/* Card content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className={`inline-flex items-center gap-1.5 mb-3 px-2 py-1 border w-fit ${
          isApp ? 'border-violet-500/20 bg-violet-500/5' : 'border-cyan-500/20 bg-cyan-500/5'
        }`}>
          {isApp
            ? <Smartphone size={9} className="text-violet-400" />
            : <Monitor size={9} className="text-cyan-400" />
          }
          <span className={`text-[8px] font-mono uppercase tracking-widest font-bold ${isApp ? 'text-violet-400' : 'text-cyan-400'}`}>
            {isApp ? 'Mobile App' : 'Website'}
          </span>
        </div>

        <h3 className="text-2xl font-black uppercase tracking-tighter text-white transition-colors mb-4">
          {project.title}
        </h3>
        <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase tracking-wide mb-8">
          {project.description}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <Link href={project.href} target="_blank" className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-indigo-400 hover:text-white transition-colors">
            <ExternalLink size={12} /> {isApp ? 'Download App' : 'Visit Site'}
          </Link>
          <button onClick={onRequestAccess} className="text-[10px] font-mono font-bold uppercase text-gray-600 hover:text-white">
            Request Access
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------
 * Main Page Component
 * --------------------------- */
export default function UpdatedProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return sampleProjects;
    if (activeFilter === "Websites") return sampleProjects.filter(p => p.type === "website");
    if (activeFilter === "Apps") return sampleProjects.filter(p => p.type === "app");
    return sampleProjects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const triggerAccessDenied = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const [footerForm, setFooterForm] = useState({ name: '', email: '', message: '' });
  const [footerStatus, setFooterStatus] = useState('IDLE');

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setFooterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    setFooterStatus('SUBMITTING');
    const payload = {
      ...footerForm,
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `PROJECTS_FOOTER: Inquiry from ${footerForm.name}`,
    };
    try {
      const response = await fetch(WEB3FORMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setFooterStatus('SUCCESS');
        setFooterForm({ name: '', email: '', message: '' });
        setTimeout(() => setFooterStatus('IDLE'), 6000);
      } else {
        setFooterStatus('ERROR');
      }
    } catch {
      setFooterStatus('ERROR');
    }
  };

  const websiteCount = sampleProjects.filter(p => p.type === 'website').length;
  const appCount = sampleProjects.filter(p => p.type === 'app').length;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">

      {/* --- BACKGROUND GRID --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4f46e520_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* --- HERO --- */}
      <header className="relative pt-32 pb-20 px-6 container mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/30 bg-indigo-500/5 mb-8">
            <Zap size={12} className="text-indigo-500 fill-indigo-500" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-indigo-400">Projects 2026</span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.85]">
            My Work<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 text-4xl md:text-7xl lg:text-8xl block mt-4">Simple Solutions</span>
          </h1>
          <p className="max-w-xl mx-auto font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 leading-relaxed">
            I build <span className="text-indigo-400">useful</span> tools for finance, communities, and daily life.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-cyan-400" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{websiteCount} Websites</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-violet-400" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{appCount} Mobile Apps</span>
            </div>
          </div>
        </motion.div>
      </header>

      <TechMarquee items={techStack} />

      {/* --- PROJECT GRID --- */}
      <main className="relative py-20 container mx-auto px-4 md:px-6">

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map(({ name, filter }) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 transition-all ${
                activeFilter === filter ? 'text-white border-indigo-500 bg-indigo-600/10' : 'text-gray-500 border-white/10 hover:border-white/20'
              } border backdrop-blur-md`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">{name}</span>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-1 px-2 py-1 border border-cyan-500/20 bg-cyan-500/5">
            <Monitor size={9} className="text-cyan-400" />
            <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Website</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 border border-violet-500/20 bg-violet-500/5">
            <Smartphone size={9} className="text-violet-400" />
            <span className="text-[8px] font-mono text-violet-400 uppercase tracking-widest">Mobile App</span>
          </div>
          <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">— hover cards to preview demo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onRequestAccess={triggerAccessDenied}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- HOW I WORK --- */}
      <section className="py-24 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.4em] mb-12">How I Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="text-2xl font-black text-white/10 italic">{i + 1}</div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{step.title}</h4>
                <p className="text-[10px] text-gray-600 font-mono leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 bg-[#050505] border-t border-indigo-500/20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">Contact Me</h2>
          <p className="text-[10px] font-mono text-gray-600 tracking-widest mb-12 italic">Let's connect! Fill out the form below and I'll get back to you soon.</p>
          <div className="space-y-3">
            {footerStatus === 'SUCCESS' ? (
              <div className="py-8 border border-green-500/30 bg-green-500/5 text-green-400 font-mono text-xs rounded">
                Message sent successfully! I'll respond soon.
              </div>
            ) : footerStatus === 'ERROR' ? (
              <div className="py-8 border border-red-500/30 bg-red-500/5 text-red-400 font-mono text-xs rounded">
                Error sending message. Please try again.
              </div>
            ) : (
              <form onSubmit={handleFooterSubmit} className="space-y-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <input type="text" name="name" placeholder="Your Name" value={footerForm.name} onChange={handleFooterChange} required
                    className="flex-1 bg-black border border-white/10 p-4 font-mono text-[10px] focus:border-indigo-500 outline-none" />
                  <input type="email" name="email" placeholder="Your Email" value={footerForm.email} onChange={handleFooterChange} required
                    className="flex-1 bg-black border border-white/10 p-4 font-mono text-[10px] focus:border-indigo-500 outline-none" />
                </div>
                <textarea rows={4} name="message" placeholder="How can I help you?" value={footerForm.message} onChange={handleFooterChange} required
                  className="w-full bg-black border border-white/10 p-4 font-mono text-[10px] focus:border-indigo-500 outline-none" />
                <button type="submit" disabled={footerStatus === 'SUBMITTING'}
                  className="w-full bg-indigo-600 text-white py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all disabled:opacity-50">
                  {footerStatus === 'SUBMITTING' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </footer>

      {/* --- TOAST --- */}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-8 right-8 z-[100] p-4 bg-black border-l-4 border-red-500 text-red-500 font-mono text-[10px] flex items-center gap-4 shadow-2xl">
            <Terminal size={16} />
            <span>Access denied. Please request access directly.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------
 * Data
 * --------------------------- */
const sampleProjects = [
  // ── Websites ──
  {
    title: "BitVest Web",
    description: "The full-scale web headquarters for BitVest, enabling high-volume transactions and deep portfolio management.",
    tag: "Web Platform",
    href: "https://bitvestapp.com",
    image: "/images/bit.png",
    video: "/videos/bitvestweb.mp4",
    category: "Finance",
    type: "website",
  },
  {
    title: "Actora Labs",
    description: "A coordination hub for Web3 communities, turning anonymous users into a verified network of builders.",
    tag: "Infrastructure",
    href: "https://actoralabs.xyz",
    image: "/images/actoraa.png",
    video: "/videos/actora.mp4",
    category: "Community",
    type: "website",
  },
  {
    title: "MediLab",
    description: "A smart inventory system for pharmacies to track medicine and help patients find critical stock nearby.",
    tag: "Health Tool",
    href: "https://medilab-kappa.vercel.app",
    image: "/images/ss.png",
    video: "/videos/medilab.mp4",
    category: "Apps",
    type: "website",
  },
  {
    title: "MonadGuard",
    description: "Security layers designed to protect online ecosystems from automated bot activity.",
    tag: "Security",
    href: "https://monadguard-cv2w.vercel.app/",
    image: "/images/gg.png",
    video: "/videos/monadguard-demo.mp4",
    category: "Community",
    type: "website",
  },
  {
    title: "Ace Experience",
    description: "A culinary tech platform blending tradition with innovation for a seamless dining experience.",
    tag: "Culinary Tech",
    href: "https://ace-xperience.vercel.app/",
    image: "/images/wendy.png",
    video: "/videos/wendy.mp4",
    category: "Apps",
    type: "website",
  },
  {
    title: "Indstr",
    description: "A DeFi and NFT platform for the next generation of digital assets.",
    tag: "DeFi & NFT",
    href: "https://industrial-platform-zeta.vercel.app/",
    image: "/images/indstr.png",
    video: "/videos/ind.mp4",
    category: "Finance",
    type: "website",
  },
  {
    title: "Koraq",
    description: "A high-performance financial operating system for SMEs, featuring an AI business coach, automated reporting, and secure cloud synchronization.",
    tag: "AI Assistant",
    href: "https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/Koraq.apk?alt=media&token=5eadc9ee-f8fc-4220-b754-9031aa62cbc4",
    image: "/images/koraqai.png",
    video: "/videos/kor.mp4",
    category: "Business & Finance",
    type: "website",
  },

  // ── Mobile Apps — no image field; video autoplays directly ──
  {
    title: "BitVest App",
    description: "A mobile-first investment platform built for speed and security, putting powerful financial tools in your pocket.",
    tag: "Mobile App",
    href: "https://bitvestapp.com/api/download",
    video: "/videos/bitvest.mp4",
    category: "Finance",
    type: "app",
  },
  {
    title: "PPAY",
    description: "A hybrid financial ecosystem bridging global digital wealth preservation with local utility.",
    tag: "Consumer App",
    href: "https://ppay.app/download",
    video: "/videos/ppay.mp4",
    category: "Payments",
    type: "app",
  },
  {
    title: "Velau",
    description: "A sophisticated gold trading engine that combines VADER sentiment analysis, ATR volatility filtering, and RSI-EMA technical confluence to execute high-probability autonomous trades.",
    tag: "Trading Bot",
    href: "https://velau.com/invest",
    video: "/videos/velau.mp4",
    category: "Finance",
    type: "app",
  },
  {
    title: "Koraq",
    description: "A high-performance financial operating system for SMEs, featuring an AI business coach, automated reporting, and secure cloud synchronization.",
    tag: "AI Assistant",
    href: "https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/Koraq.apk?alt=media&token=5eadc9ee-f8fc-4220-b754-9031aa62cbc4",
    video: "/videos/koraq.mp4",
    category: "Business & Finance",
    type: "app",
  },
];

const categories = [
  { name: "View All", filter: "All" },
  { name: "Websites", filter: "Websites" },
  { name: "Mobile Apps", filter: "Apps" },
  { name: "Finance", filter: "Finance" },
  { name: "Community Tech", filter: "Community" },
  { name: "Business & Finance", filter: "Business & Finance" },
];

const processSteps = [
  { title: "Define", text: "We identify the problem and pick the best tools for the job." },
  { title: "Design", text: "Creating a clean interface and a strong digital foundation." },
  { title: "Execute", text: "Building with speed and testing every feature for safety." },
  { title: "Support", text: "Watching the system live and ensuring it stays lightning fast." },
];

const techStack = ["Next.js", "React", "Mobile Dev", "FinTech", "Security", "Cloud", "Community"];