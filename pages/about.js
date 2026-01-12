"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, Terminal, Cpu, Database, Shield, 
    ArrowRight, Activity, Layers, Code2, User 
} from "lucide-react";

/* ---------------------------
 * Reusable Industrial UI Blocks
 * --------------------------- */

const MetadataBadge = ({ label, value }) => (
    <div className="flex flex-col border-l border-indigo-500/30 pl-4 py-1">
        <span className="text-[8px] font-mono text-indigo-500 uppercase tracking-[0.2em]">{label}</span>
        <span className="text-xs font-bold text-gray-300 uppercase">{value}</span>
    </div>
);

const TechnicalCard = ({ icon: Icon, title, description, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="group relative bg-[#0a0a0a] border border-white/5 p-8 hover:bg-black transition-all"
    >
        <div className="absolute top-0 left-0 w-1 h-1 bg-indigo-500" />
        <Icon className="text-indigo-500 mb-6 shrink-0" size={24} />
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">{title}</h3>
        <p className="text-[10px] text-gray-500 font-mono leading-relaxed uppercase">{description}</p>
    </motion.div>
);

/* ---------------------------
 * Main About Component
 * --------------------------- */

export default function IndustrialAboutPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30">
            
            {/* --- 1. HERO / SYSTEM IDENTITY --- */}
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5">
                {/* HUD Background elements */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                    {/* Authorized Image */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
                        <div className="absolute -inset-4 border border-indigo-500/20 animate-pulse" />
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500" />
                        <img 
                            src="/images/kenny.jpg" 
                            alt="Victor Identity" 
                            className="w-full h-full object-cover grayscale opacity-80 filter contrast-125 shadow-2xl"
                        />
                        <div className="absolute bottom-4 left-4 bg-indigo-600 px-2 py-1 text-[8px] font-mono font-black text-white uppercase tracking-widest">
                            ACCESS_AUTHORIZED
                        </div>
                    </div>

                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/30 bg-indigo-500/5 mb-8">
                            <Terminal size={12} className="text-indigo-500" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-indigo-400">Personnel_Profile_v.1</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
                            Chinagoro <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-white">Victor E.</span>
                        </h1>
                        <p className="max-w-xl font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 leading-relaxed mx-auto lg:mx-0">
                            Senior Lead Architect specializing in high-frequency trading apps, 
                            scalable cloud ecosystems, and human-centric coordination layers.
                        </p>
                    </div>
                </div>
            </header>

            {/* --- 2. SYSTEM STATUS (STATS) --- */}
            <section className="bg-black border-b border-white/5 py-12">
                <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <MetadataBadge label="DEPLOYMENTS" value="10+ FLAGSHIP" />
                    <MetadataBadge label="UPTIME_RATIO" value="99.99% COMMIT" />
                    <MetadataBadge label="THROUGHPUT" value="500K+ MAU" />
                    <MetadataBadge label="AUTH_LEVEL" value="SENIOR_LEAD" />
                </div>
            </section>

            {/* --- 3. CORE PROTOCOLS (PILLARS) --- */}
            <main className="container mx-auto px-6 py-32 space-y-32">
                
                <section>
                    <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.4em] mb-12 text-center">// CORE_PROTOCOLS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                        <TechnicalCard 
                            icon={Layers} 
                            title="Full Ownership" 
                            description="Managing the entire lifecycle from conceptual architecture to live system monitoring."
                        />
                        <TechnicalCard 
                            icon={Cpu} 
                            title="Hardware Agnostic" 
                            description="Building maintainable, type-safe solutions that minimize technical debt and maximize scale."
                        />
                        <TechnicalCard 
                            icon={Activity} 
                            title="Data Driven" 
                            description="Leveraging real-time analytics to ensure every development decision yields measurable business value."
                        />
                    </div>
                </section>

                {/* --- 4. TECHNICAL MATRIX (STACK) --- */}
                <section>
                    <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.4em] mb-12 text-center">// TECHNICAL_MATRIX</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                        {STACK_DATA.map((tech) => (
                            <div key={tech.name} className="group flex flex-col items-center justify-center p-6 border border-white/5 bg-[#0a0a0a] hover:bg-indigo-600 transition-all duration-300">
                                <img src={tech.svgPath} alt={tech.name} className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 group-hover:brightness-200 transition-all" />
                                <span className="text-[8px] font-mono text-gray-600 group-hover:text-white mt-3 uppercase font-bold">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 5. TRAJECTORY (TIMELINE) --- */}
                <section className="max-w-4xl mx-auto">
                    <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.4em] mb-16">// TRAJECTORY_LOG</h2>
                    <div className="space-y-1">
                        {TIMELINE_DATA.map((log, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 p-8 border border-white/5 bg-[#0a0a0a] hover:bg-white/[0.02] transition-all">
                                <span className="text-xs font-mono text-gray-700">{log.year}_</span>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-2">{log.title}</h4>
                                    <p className="text-[10px] text-gray-500 font-mono uppercase leading-relaxed">{log.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* --- 6. CTA / LINK ESTABLISHMENT --- */}
            <footer className="py-32 bg-black border-t border-indigo-500/20 text-center">
                <div className="container mx-auto px-6 max-w-xl">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Initialize_Project</h2>
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-12 leading-relaxed italic">
                        Handshake protocol ready. Awaiting mission parameters for high-performance builds.
                    </p>
                    <a href="/contact" className="inline-flex items-center gap-4 bg-white text-black px-12 py-5 font-black uppercase tracking-[0.4em] text-xs hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        Establish_Link <ArrowRight size={16} />
                    </a>
                </div>
            </footer>
        </div>
    );
}

/* ---------------------------
 * Content Data
 * --------------------------- */

const STACK_DATA = [
    { name: 'Next.js', svgPath: '/logos/nextjs-original.svg' },
    { name: 'Node.js', svgPath: '/logos/nodejs-original.svg' },
    { name: 'TypeScript', svgPath: '/logos/typescript-original.svg' },
    { name: 'React Native', svgPath: '/logos/reactnative-original.svg' },
    { name: 'Tailwind', svgPath: '/logos/tailwindcss-original.svg' },
    { name: 'PostgreSQL', svgPath: '/logos/postgresql-original.svg' },
    { name: 'Docker', svgPath: '/logos/docker-original.svg' },
    { name: 'Python', svgPath: '/logos/python-original.svg' },
    { name: "TensorFlow", svgPath: "/logos/tensorflow-original.svg" },
];

const TIMELINE_DATA = [
    { year: '2026', title: 'Software Engineer', description: 'Worked on web applications and contributed to open-source projects. Focused on building scalable, maintainable code.' },
    { year: '2025', title: 'Frontend Developer', description: 'Specialized in React and Next.js, building user interfaces and collaborating with backend teams.' },
    { year: '2024', title: 'Intern / Junior Developer', description: 'Gained hands-on experience with JavaScript, Git, and agile workflows in a team environment.' },
    { year: '2023', title: 'Learning & Exploration', description: 'Started learning programming fundamentals, web development, and building personal projects.' },
];