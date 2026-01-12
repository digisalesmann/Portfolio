"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function TimeDisplay() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-indigo-500/50">TIME: {time || "--:--:--"}</span>;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-16 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* --- Brand Block --- */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-tighter text-white">
                Victor.Sys <span className="text-gray-600 font-mono font-normal"></span>
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase leading-relaxed tracking-widest">
              Architecting resilient digital protocols and neural infrastructures for the 2026 tech landscape.
            </p>
          </div>

          {/* --- System Directory --- */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[9px] font-mono text-indigo-500 uppercase tracking-[0.3em]">Directory</h4>
              <ul className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <li><Link href="/projects" className="hover:text-white transition-colors">Deployments</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Archives</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Kernel_Bio</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[9px] font-mono text-indigo-500 uppercase tracking-[0.3em]">Social_Links</h4>
              <ul className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <li><Link href="https://github.com/digisalesmann" target="_blank" className="hover:text-white transition-colors">Github</Link></li>
                <li><Link href="https://x.com/buildwthvictor" target="_blank" className="hover:text-white transition-colors">X_Terminal</Link></li>
                <li><Link href="https://linkedin.com/in/victor-chinagoro-1a032423a" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>

          {/* --- Contact Output --- */}
          <div className="md:col-span-4 space-y-4 text-right md:text-left">
            <h4 className="text-[9px] font-mono text-indigo-500 uppercase tracking-[0.3em]">Direct_Comms</h4>
            <Link 
              href="mailto:buildwithvictorhq@gmail.com"
              className="group inline-flex items-center gap-3 border border-white/10 px-4 py-2 bg-white/5 hover:bg-indigo-500 transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors">
                buildwithvictorhq@gmail.com
              </span>
              <span className="text-indigo-500 group-hover:text-black">→</span>
            </Link>
          </div>
        </div>

        {/* --- Metadata Bottom Bar --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-[9px] font-mono text-gray-600 uppercase tracking-tighter">
            <span>LOC: NIGERIA_BASE</span>
            <span>OS: NEXT_RE_V15</span>
            {/* Hydration-safe time rendering */}
            <TimeDisplay />
          </div>
          
          <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
            © {currentYear} Victor.Sys // Built for high-performance scale
          </p>
        </div>
      </div>
    </footer>
  );
}