"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Terminal, Cpu, Database, Shield, 
    ArrowRight, Activity, Layers, Code2, User,
    Send, Mail, Phone, MapPin, Loader2, CheckCircle,
    AlertTriangle, Linkedin, Twitter, Github, Instagram, ExternalLink
} from "lucide-react";

// --- Global Configuration ---
const WEB3FORMS_ACCESS_KEY = "5990f7bc-58f5-4b00-8630-74158a28db18"; 
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";

/* ---------------------------
 * Reusable Industrial Components
 * --------------------------- */

const MetadataBadge = ({ label, value }) => (
    <div className="flex flex-col border-l border-indigo-500/30 pl-4 py-1">
        <span className="text-[8px] font-mono text-indigo-500 uppercase tracking-[0.2em]">{label}</span>
        <span className="text-xs font-bold text-gray-300 uppercase">{value}</span>
    </div>
);

const FormInput = ({ label, id, type = 'text', value, onChange, required = false, rows, placeholder }) => {
    const isTextArea = rows > 0;
    const InputTag = isTextArea ? 'textarea' : 'input';

    return (
        <div className="space-y-2 group">
            <label htmlFor={id} className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest group-focus-within:text-indigo-500 transition-colors">
                // {label} {required && "[REQUIRED]"}
            </label>
            <div className="relative">
                <InputTag
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={rows}
                    placeholder={placeholder}
                    className="w-full bg-black border border-white/10 p-4 text-[11px] font-mono text-white focus:border-indigo-500 outline-none uppercase placeholder:text-gray-800 transition-all rounded-none"
                />
            </div>
        </div>
    );
};

const ContactEntry = ({ icon: Icon, label, value, href }) => (
    <a 
        href={href}
        className="flex items-start gap-6 p-6 border border-white/5 bg-[#0a0a0a] hover:bg-white/[0.02] transition-all group"
    >
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-black transition-all">
            <Icon size={18} className="text-indigo-400 group-hover:text-inherit" />
        </div>
        <div>
            <span className="text-[8px] font-mono text-indigo-500 uppercase tracking-[0.3em] block mb-1">{label}</span>
            <span className="text-sm font-bold text-white uppercase tracking-tight">{value}</span>
        </div>
    </a>
);

/* ---------------------------
 * Main Contact Page
 * --------------------------- */

export default function IndustrialContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        const payload = {
            ...formData,
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `LEDGER_INQUIRY: ${formData.subject}`, 
        };

        try {
            const response = await fetch(WEB3FORMS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('SUCCESS');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('IDLE'), 6000);
            } else {
                setStatus('ERROR');
            }
        } catch (error) {
            setStatus('ERROR');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            
            {/* --- 1. HUD HEADER --- */}
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%]" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/30 bg-indigo-500/5 mb-8">
                        <Terminal size={12} className="text-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-indigo-400">Comms_Protocol_v.2026</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
                        Initialize <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-white">The Link</span>
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
                        <MetadataBadge label="ENDPOINT" value="ENCRYPTED" />
                        <MetadataBadge label="LATENCY" value="SUB-10MS" />
                        <MetadataBadge label="PRIORITY" value="LEVEL_01" />
                        <MetadataBadge label="STATUS" value="LISTENING" />
                    </div>
                </div>
            </header>

            {/* --- 2. MAIN COMMS INTERFACE --- */}
            <main className="container mx-auto px-4 md:px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left: System Details */}
                    <div className="lg:col-span-4 space-y-12">
                        <section>
                            <h2 className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-[0.3em] mb-8">// DIRECT_CHANNELS</h2>
                            <div className="grid gap-4">
                                <ContactEntry icon={Mail} label="General_Relay" value="buildwithvictorhq@gmail.com" href="mailto:buildwithvictorhq@gmail.com" />
                                <ContactEntry icon={Shield} label="Secure_Personal" value="chinagorovictor59@gmail.com" href="mailto:chinagorovictor59@gmail.com" />
                                <ContactEntry icon={Phone} label="Emergency_Uplink" value="+234 903 788 4753" href="tel:+2349037884753" />
                                <ContactEntry icon={MapPin} label="Global_HQ" value="REMOTE / CLOUD_SCALE" href="#" />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-[0.3em] mb-8">// SOCIAL_MESH</h2>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { icon: Linkedin, url: 'https://www.linkedin.com/in/victor-chinagoro-1a032423a/' },
                                    { icon: Twitter, url: 'https://x.com/buildwthvictor' },
                                    { icon: Github, url: 'https://github.com/digisalesmann' },
                                    { icon: Instagram, url: 'https://www.instagram.com/buildwthvictor/' }
                                ].map((social, i) => (
                                    <a key={i} href={social.url} target="_blank" rel="noreferrer" 
                                       className="p-4 bg-[#0a0a0a] border border-white/5 text-gray-600 hover:text-indigo-500 hover:border-indigo-500/50 transition-all">
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Submission Terminal */}
                    <div className="lg:col-span-8 relative">
                        <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-indigo-500/20 pointer-events-none" />
                        
                        <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl relative">
                            <div className="flex items-center gap-4 mb-12">
                                <Database size={20} className="text-indigo-500" />
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Transmission_Form</h2>
                            </div>

                            <AnimatePresence mode="wait">
                                {status === 'SUCCESS' ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-20 text-center border border-dashed border-green-500/30 bg-green-500/5"
                                    >
                                        <CheckCircle size={48} className="text-green-500 mx-auto mb-6" />
                                        <h3 className="text-2xl font-black text-white uppercase mb-2">Sync Complete</h3>
                                        <p className="font-mono text-[10px] text-green-500 uppercase tracking-widest">Inquiry encrypted and routed. Awaiting response cycle.</p>
                                    </motion.div>
                                ) : status === 'ERROR' ? (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-20 text-center border border-dashed border-red-500/30 bg-red-500/5"
                                    >
                                        <AlertTriangle size={48} className="text-red-500 mx-auto mb-6" />
                                        <h3 className="text-2xl font-black text-white uppercase mb-2">Uplink Failed</h3>
                                        <button onClick={() => setStatus('IDLE')} className="text-[10px] font-mono text-red-400 underline uppercase tracking-widest">Restart_Protocol</button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <FormInput 
                                                label="Your Name" 
                                                id="name" 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                required 
                                                placeholder="Enter your name" 
                                            />
                                            <FormInput 
                                                label="Your Email" 
                                                id="email" 
                                                type="email" 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                required 
                                                placeholder="Enter your email address" 
                                            />
                                        </div>

                                        <FormInput 
                                            label="Subject" 
                                            id="subject" 
                                            value={formData.subject} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="What is your message about?" 
                                        />

                                        <FormInput 
                                            label="Message" 
                                            id="message" 
                                            rows={6} 
                                            value={formData.message} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="Type your message here" 
                                        />

                                        <button
                                            type="submit"
                                            disabled={status === 'SUBMITTING'}
                                            className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                                        >
                                            {status === 'SUBMITTING' ? (
                                                <Loader2 className="animate-spin" size={16} />
                                            ) : (
                                                <Send size={16} />
                                            )}
                                            {status === 'SUBMITTING' ? 'TRANSMITTING...' : 'Push_To_Mainframe'}
                                        </button>
                                        
                                        <div className="flex items-center justify-center gap-3 opacity-30 group cursor-default">
                                            <Shield size={12} />
                                            <span className="text-[8px] font-mono uppercase tracking-[0.3em]">End-To-End_Encryption_Active</span>
                                        </div>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- 3. INDUSTRIAL FOOTER --- */}
            <footer className="py-32 bg-black border-t border-indigo-500/20 text-center">
                <div className="container mx-auto px-6 max-w-xl">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Initialize_Build</h2>
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-12 leading-relaxed italic">
                        Deploying premium AI solutions, scalable protocols, and industrial-grade coordination systems.
                    </p>
                    <div className="inline-flex items-center gap-4 text-[10px] font-mono text-indigo-500/50 uppercase tracking-[0.4em]">
                        <Activity size={12} /> System_Operational // v.2026.01
                    </div>
                </div>
            </footer>
        </div>
    );
}