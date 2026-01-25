"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sun, ChevronRight, User, Terminal, BookOpen, Database,
    Send, ArrowRight, Star, Lightbulb, HeartHandshake, ExternalLink, Shield, Globe
} from "lucide-react";

// --- Data & Firebase Imports ---
import { blogMetadata, sectionsContent } from "../../data/blogContent";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, addDoc, onSnapshot, collection, query, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9tufXHLryYiRRndTe9rbiXZjl4faAIzE",
    authDomain: "portfolio-22c56.firebaseapp.com",
    projectId: "portfolio-22c56",
    storageBucket: "portfolio-22c56.firebasestorage.app",
    messagingSenderId: "790009382969",
    appId: "1:790009382969:web:b1390f3481fe750728e5e8",
};

const SystemBadge = ({ label, value }) => (
    <div className="flex flex-col border-l border-indigo-500/30 pl-4 py-1">
        <span className="text-[8px] font-mono text-indigo-500 uppercase tracking-[0.2em]">{label}</span>
        <span className="text-xs font-bold text-gray-300 uppercase truncate">{value}</span>
    </div>
);

export default function AIArtifactPage() {
    const [activeSection, setActiveSection] = useState("intro");
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(null);
    const [userName, setUserName] = useState('');
    const [newCommentText, setNewCommentText] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    // 1. Firebase Logic
    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const firestoreDb = getFirestore(app);
        const authInstance = getAuth(app);
        setDb(firestoreDb);

        const savedName = localStorage.getItem('commentUserName');
        if (savedName) setUserName(savedName);

        const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
            if (user) setUserId(user.uid);
            else {
                const anon = await signInAnonymously(authInstance);
                setUserId(anon.user.uid);
            }
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!db || !isAuthReady) return;
        setCommentsLoading(true);
        setCommentsError(null);
        const appId = blogMetadata.reportId;
        const commentsPath = `artifacts/${appId}/public/data/premium_article_comments`;
        const qry = query(collection(db, commentsPath));
        const unsubscribe = onSnapshot(qry, (snap) => {
            try {
                const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setComments(fetched.sort((a, b) => {
                    const aTime = a.timestamp?.toMillis?.() || 0;
                    const bTime = b.timestamp?.toMillis?.() || 0;
                    return bTime - aTime;
                }));
                setCommentsLoading(false);
            } catch (err) {
                setCommentsError('Failed to load comments.');
                setCommentsLoading(false);
            }
        }, (err) => {
            setCommentsError('Failed to load comments.');
            setCommentsLoading(false);
        });
        return () => unsubscribe();
    }, [db, isAuthReady]);

    // 2. ScrollSpy
    useEffect(() => {
        const handleScroll = () => {
            const ids = sectionsData.map(s => s.id);
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 300) {
                    setActiveSection(id);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!newCommentText.trim() || !userName.trim() || !db) return;
        setIsPosting(true);
        try {
            const appId = blogMetadata.reportId;
            const commentsPath = `artifacts/${appId}/public/data/premium_article_comments`;
            await addDoc(collection(db, commentsPath), {
                userId,
                userName: userName.trim(),
                text: newCommentText.trim(),
                timestamp: serverTimestamp()
            });
            localStorage.setItem('commentUserName', userName.trim());
            setNewCommentText("");
        } catch (err) { console.error(err); }
        finally { setIsPosting(false); }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30">
            
            {/* HERO HUD */}
            <header className="relative h-[85vh] flex flex-col justify-end overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale">
                    <source src={blogMetadata.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-6 pb-20 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/30 bg-indigo-500/5 mb-8">
                        <Terminal size={12} className="text-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-[0.4em]">{blogMetadata.title}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
                        The Future Of <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-white">Intelligence</span>
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
                        <SystemBadge label="Author" value={blogMetadata.author} />
                        <SystemBadge label="Date" value={blogMetadata.timestamp} />
                        <SystemBadge label="Read Time" value={blogMetadata.readTime} />
                        <SystemBadge label="Status" value="Published" />
                    </div>
                </motion.div>
            </header>

            <div className="container mx-auto px-4 md:px-6 py-24 flex flex-col lg:flex-row gap-16">
                {/* NAV SIDEBAR (Hidden on mobile, sticky on desktop) */}
                <aside className="hidden lg:block w-64 sticky top-32 h-fit">
                    <h3 className="text-[10px] font-mono font-black text-indigo-500 tracking-[0.3em] mb-8">Sections</h3>
                    <nav className="space-y-1 text-xs font-bold uppercase tracking-widest">
                        {sectionsData.map(s => (
                            <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'})}
                                className={`flex items-center gap-4 w-full text-left py-2 transition-all ${activeSection === s.id ? "text-white" : "text-gray-600 hover:text-gray-400"}`}>
                                <span className={`text-[9px] font-mono ${activeSection === s.id ? "text-indigo-500" : "text-gray-800"}`}>{s.id.substring(0,3)}</span>
                                {s.label}
                                {activeSection === s.id && <div className="w-1 h-1 bg-indigo-500 rotate-45 ml-auto" />}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 max-w-4xl space-y-32">
                    
                    {/* 01_INTRODUCTION */}
                    <section id="intro" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-8">Introduction</h2>
                        <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">{sectionsContent.intro.title}</h3>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-400 italic">{sectionsContent.intro.content}</p>
                    </section>

                    {/* 02_CORE_FOUNDATIONS */}
                    <section id="core" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Core Ideas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                            {/* Use new icons for core ideas */}
                            {sectionsContent.core.map((item, i) => (
                                <div key={i} className="bg-[#0a0a0a] p-8 hover:bg-black transition-colors border border-white/5">
                                    {i === 0 && <BookOpen className="w-6 h-6 text-indigo-500 mb-6" />}
                                    {i === 1 && <Lightbulb className="w-6 h-6 text-indigo-500 mb-6" />}
                                    {i === 2 && <Shield className="w-6 h-6 text-indigo-500 mb-6" />}
                                    <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">{item.title}</h4>
                                    <p className="text-[10px] text-gray-500 font-mono leading-relaxed uppercase">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 03_EVOLUTION_LOG */}
                    <section id="timeline" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Evolution</h2>
                        <div className="space-y-1">
                            {sectionsContent.timeline.map((item, i) => (
                                <div key={i} className="flex gap-8 p-6 border border-white/5 bg-[#0a0a0a] hover:bg-white/[0.02] transition-all group">
                                    <span className="text-xs font-mono text-gray-700">{item.y}</span>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-indigo-400 mb-1 tracking-widest">{item.t}</h4>
                                        <p className="text-xs text-gray-500 uppercase leading-relaxed font-mono">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 04_COMPARISON */}
                    <section id="compare" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Comparison</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-[#0a0a0a] border border-white/5 relative">
                                <Star className="text-indigo-500 mb-6" size={24} />
                                <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Artificial Intelligence</h4>
                                <ul className="space-y-4">
                                    {sectionsContent.comparison.ai.map((pt, i) => (
                                        <li key={i} className="text-[10px] font-mono text-gray-500 uppercase border-b border-white/5 pb-2">{pt}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-8 bg-[#0a0a0a] border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.05)] relative">
                                <HeartHandshake className="text-indigo-400 mb-6" size={24} />
                                <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Human Creativity</h4>
                                <ul className="space-y-4">
                                    {sectionsContent.comparison.human.map((pt, i) => (
                                        <li key={i} className="text-[10px] font-mono text-indigo-300/60 uppercase border-b border-white/5 pb-2">{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 05_STRATEGIC_INSIGHTS */}
                    <section id="pre" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Insights</h2>
                        <div className="space-y-4">
                            {/* Use new icons for insights */}
                            {sectionsContent.insights.map((insight, i) => (
                                <div key={i} className="flex items-start gap-6 p-6 bg-gradient-to-r from-[#0a0a0a] to-transparent border-l-2 border-indigo-500">
                                    {i === 0 && <Sun className="text-indigo-500 mt-1 shrink-0" size={24} />}
                                    {i === 1 && <Lightbulb className="text-indigo-500 mt-1 shrink-0" size={24} />}
                                    {i === 2 && <Globe className="text-indigo-500 mt-1 shrink-0" size={24} />}
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide leading-relaxed font-mono">{insight.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 06_SYSTEM_QUERY_LOG (FAQ) */}
                    <section id="faq" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Q&A</h2>
                        <div className="grid gap-4">
                            {sectionsContent.faq.map((item, i) => (
                                <details key={i} className="group border border-white/5 bg-[#0a0a0a] p-6 hover:border-indigo-500/30 transition-all cursor-pointer">
                                    <summary className="list-none flex justify-between items-center text-xs font-bold text-white uppercase tracking-widest">
                                        {item.q}
                                        <ChevronRight size={16} className="group-open:rotate-90 transition-transform text-indigo-500" />
                                    </summary>
                                    <p className="mt-4 text-[10px] font-mono text-gray-500 leading-relaxed uppercase border-t border-white/5 pt-4">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* 07_RELATED_ASSETS */}
                    <section id="related" className="scroll-mt-32">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Related</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                            {sectionsContent.related.map((article, i) => (
                                <a href={article.link} key={i} className="group block bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-black transition-all p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-sm font-black text-white uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{article.title}</h4>
                                        <ExternalLink size={14} className="text-gray-700 group-hover:text-indigo-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-mono leading-relaxed">{article.excerpt}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* 08_AUTHOR_ID */}
                    <section id="author" className="scroll-mt-32 border-t border-white/5 pt-20 text-center">
                        <h2 className="text-xs font-mono text-indigo-500 tracking-[0.4em] mb-12">Author</h2>
                        <div className="inline-flex flex-col items-center">
                                                        <img
                                                            src={blogMetadata.authorImage}
                                                            alt={blogMetadata.author}
                                                            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30 mb-6 shadow-[0_0_50px_rgba(79,70,229,0.1)]"
                                                        />
                            <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{blogMetadata.author}</h4>
                            <p className="text-[10px] font-mono text-gray-600 mt-4 italic tracking-[0.3em]">Lead Engineer // AI Architect</p>
                        </div>
                    </section>

                    {/* 09_DISCUSSION_LEDGER */}
                    <section id="comments" className="scroll-mt-32 border-t border-white/5 pt-20">
                        <div className="flex items-center gap-4 mb-12">
                            <Database size={20} className="text-indigo-500" />
                            <h2 className="text-2xl font-black uppercase text-white tracking-tighter">Comments</h2>
                        </div>
                        <form onSubmit={handlePostComment} className="space-y-4 mb-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    className="bg-black border border-white/10 p-4 text-[10px] font-mono focus:border-indigo-500 outline-none placeholder:text-gray-800"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isPosting}
                                    className="bg-indigo-600 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all py-4"
                                >
                                    {isPosting ? "Posting..." : "Post Comment"}
                                </button>
                            </div>
                            <textarea
                                rows={4}
                                placeholder="Your Comment"
                                value={newCommentText}
                                onChange={e => setNewCommentText(e.target.value)}
                                className="w-full bg-black border border-white/10 p-4 text-[10px] font-mono focus:border-indigo-500 outline-none placeholder:text-gray-800"
                                required
                            />
                        </form>

                        <div className="space-y-4">
                            {commentsLoading ? (
                                <div className="py-8 text-center text-gray-500 font-mono text-xs">Loading comments...</div>
                            ) : commentsError ? (
                                <div className="py-8 text-center text-red-400 font-mono text-xs">{commentsError}</div>
                            ) : comments.length === 0 ? (
                                <div className="py-8 text-center text-gray-500 font-mono text-xs">No comments yet. Be the first to post!</div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {comments.slice(0, 20).map((c, i) => (
                                        <motion.div key={c.id || i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} 
                                            className="p-6 bg-[#0a0a0a] border border-white/5 flex gap-6">
                                            <div className="w-10 h-10 bg-indigo-500/10 shrink-0 flex items-center justify-center text-indigo-500 font-mono text-xs uppercase border border-indigo-500/20">{c.userName?.[0] || 'U'}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-[10px] font-mono font-bold text-white uppercase truncate">{c.userName}</span>
                                                    <span className="text-[8px] font-mono text-gray-700 uppercase italic shrink-0 ml-2">VERIFIED</span>
                                                </div>
                                                <p className="text-xs text-gray-500 uppercase leading-relaxed font-mono break-words">{c.text}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </section>
                </main>
            </div>

            <footer className="py-32 bg-black border-t border-indigo-500/20 text-center px-4">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-12 leading-none">Get In Touch</h2>
                <div className="flex justify-center">
                    <a href="mailto:buildwithvictorhq@gmail.com" className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-12 py-5 font-black uppercase tracking-[0.4em] text-xs hover:bg-indigo-500 hover:text-white transition-all">
                        Contact <ArrowRight size={16} />
                    </a>
                </div>
            </footer>
        </div>
    );
}

const sectionsData = [
    { id: "intro", label: "01. Introduction" },
    { id: "core", label: "02. Core Ideas" },
    { id: "timeline", label: "03. Evolution" },
    { id: "compare", label: "04. Comparison" },
    { id: "pre", label: "05. Insights" },
    { id: "faq", label: "06. Q&A" },
    { id: "related", label: "07. Related" },
    { id: "author", label: "08. Author" },
    { id: "comments", label: "09. Discussion" },
];