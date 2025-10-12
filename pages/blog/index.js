import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Linkedin,
    Twitter,
    Github,
    Mail,
    Lightbulb,
    CheckCircle,
    Brain,
    Zap,
    BarChart3,
    Globe,
    Heart,
    Compass,
    Menu,
    X,
    ArrowRight,
    Send,
    Loader2,
    User, 
} from "lucide-react";

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, addDoc, onSnapshot, collection, query, serverTimestamp } from 'firebase/firestore';
import { setLogLevel } from 'firebase/firestore';

// --- Utility Components (Unchanged) ---
const IconBadge = ({ Icon, className = "" }) => (
    <div
        className={`w-10 h-10 rounded-full flex items-center justify-center 
                bg-gradient-to-br from-indigo-500 to-purple-600 
                text-white shadow-lg shadow-indigo-500/40 ${className}`}
    >
        <Icon className="w-5 h-5" />
    </div>
);

const ArticleCard = ({ article, index }) => (
    <motion.a
        href="#" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative border border-gray-200/50 dark:border-gray-700/50 
                rounded-2xl overflow-hidden shadow-xl 
                hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 
                bg-white dark:bg-gray-800 cursor-pointer group block"
    >
        <div className="h-44 overflow-hidden">
            <img
                src={article.image}
                alt={article.title}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/3730a3/ffffff?text=Image+Missing"; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="p-5">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition">
                {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{article.excerpt}</p>
            <div className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-2 text-sm">
                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </motion.a>
);

const CommentDisplay = ({ comment, currentUserId }) => {
    const formatTimestamp = (date) => {
        if (!date) return 'Just now';
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        
        if (seconds < 60) return `Less than a minute ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`; 

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const isAuthor = comment.userId === currentUserId;
    
    const timestampDate = comment.timestamp instanceof Date ? comment.timestamp : 
                          (comment.timestamp && comment.timestamp.toMillis ? new Date(comment.timestamp.toMillis()) : null);

    // Use a user-friendly name, falling back to 'User'
    const displayUserName = comment.userName || 'User'; 

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex space-x-4 p-4 rounded-xl border-l-4 shadow-md transition-all duration-300
                        ${isAuthor 
                            ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-500' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        }`}
        >
            <img 
                src={comment.avatarUrl || `https://placehold.co/100x100/4c51bf/ffffff?text=${displayUserName[0]}`} 
                alt={`${displayUserName} avatar`}
                className="w-10 h-10 rounded-full flex-shrink-0 object-cover border border-gray-200 dark:border-gray-700"
            />
            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold text-gray-900 dark:text-gray-100 truncate">
                            {displayUserName}
                        </span>
                        {isAuthor && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500 text-white flex-shrink-0">You</span>}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {formatTimestamp(timestampDate)}
                    </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{comment.text}</p>
                {/* <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mt-2 break-all">
                    ID: {comment.userId}
                </p> */}
            </div>
        </motion.div>
    );
};


// --- Static Data (Unchanged) ---
const relatedArticles = [
    {
        title: "Building a Scalable AI Platform",
        excerpt: "Discover how modern AI apps are built for scalability and reliability.",
        image: "https://placehold.co/600x400/4f46e5/ffffff?text=AI+Platform",
    },
    {
        title: "The Future of Web Development",
        excerpt: "A deep dive into trends shaping how we build for the web.",
        image: "https://placehold.co/600x400/a855f7/ffffff?text=Web+Dev+Future",
    },
    {
        title: "Design Systems That Scale",
        excerpt: "Why design systems are critical for large teams and products.",
        image: "https://placehold.co/600x400/ec4899/ffffff?text=Design+System",
    },
];

const sectionsData = [
    { id: "intro", label: "01. Introduction", title: "The Next Era of Intelligence" },
    { id: "core", label: "02. Core Ideas", title: "Foundations of Modern AI" },
    { id: "timeline", label: "03. Evolution Timeline", title: "A Brief History of AI" },
    { id: "compare", label: "04. AI vs Human", title: "Symbiosis of Strengths" },
    { id: "premium-insights", label: "05. Premium Insights", title: "Key Takeaways" },
    { id: "faq", label: "06. Quick Q&A", title: "Frequently Asked Questions" },
    { id: "related", label: "07. Explore More", title: "Related Articles" },
    { id: "author", label: "08. Author", title: "Meet the Author" },
    { id: "comments", label: "09. Discussion", title: "Community Discussion" },
];


// --- Main Component ---

export default function App() {
    const [activeSection, setActiveSection] = useState("intro");
    const [isTOCVisible, setIsTOCVisible] = useState(false);

    // Firebase State
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Comments State (Effective Practice applied here)
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [postSuccess, setPostSuccess] = useState(false);
    // 💡 NEW/UPDATED: User-provided name, persisted via local storage
    const [userName, setUserName] = useState(''); 
    
    // Newsletter State (REAL Web3Forms Key applied here)
    const WEB3FORMS_ACCESS_KEY = '5990f7bc-58f5-4b00-8630-74158a28db18';
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState('');


    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsTOCVisible(false); 
    }, []);

    // --- Firebase Initialization and Auth ---
    useEffect(() => {
        // NOTE: In a real app, ensure __app_id and __firebase_config are correctly injected
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        
        // --- FIX Check: Ensure your firebaseConfig has an apiKey ---
        if (!firebaseConfig.apiKey) {
            console.error("Firebase config not available. Cannot initialize. Please define __firebase_config.");
            setIsAuthReady(true);
            return;
        }

        setLogLevel('error'); 

        try {
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const authInstance = getAuth(app);

            setDb(firestoreDb);
            setAuth(authInstance);

            // 💡 PERSISTENCE: Retrieve the saved name from local storage
            const savedUserName = localStorage.getItem('commentUserName');
            if (savedUserName) {
                setUserName(savedUserName);
            }

            const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    try {
                        // Using Anonymous Sign-in for non-signed-in users
                        const anonUser = await signInAnonymously(authInstance);
                        setUserId(anonUser.user.uid);
                    } catch (error) {
                        console.error("Anonymous authentication failed:", error);
                        // Fallback unique ID if auth completely fails
                        setUserId(`guest-${crypto.randomUUID()}`); 
                    }
                }
                setIsAuthReady(true); 
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization error:", error);
            setIsAuthReady(true);
        }
    }, []);

    // --- Real-time Comments Fetch ---
    useEffect(() => {
        if (!db || !isAuthReady) return;

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const commentsCollectionRef = collection(db, `artifacts/${appId}/public/data/premium_article_comments`);
        const commentsQuery = query(commentsCollectionRef); 

        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp, 
            }));
            
            // Sort comments by timestamp descending (newest first)
            fetchedComments.sort((a, b) => {
                const timeA = a.timestamp && a.timestamp.toMillis ? a.timestamp.toMillis() : 0;
                const timeB = b.timestamp && b.timestamp.toMillis ? b.timestamp.toMillis() : 0;
                return timeB - timeA;
            });
            
            setComments(fetchedComments);
        }, (error) => {
            console.error("Error fetching comments:", error);
        });

        return () => unsubscribe();
    }, [db, isAuthReady]); 

    // --- Post Comment Handler (Updated for User Name) ---
    const handlePostComment = useCallback(async (e) => {
        e.preventDefault();

        // 💡 UPDATED CHECK: Must require both text and a name
        if (!newCommentText.trim()) {
            setPostError("Please write a comment before posting.");
            return;
        }
        if (!userName.trim()) {
            setPostError("Please provide your name before posting.");
            return;
        }

        if (!db || !userId) {
            setPostError("Unable to post comment. Authentication not ready.");
            return;
        }

        setIsPosting(true);
        setPostError(null);
        setPostSuccess(false);

        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const commentsRef = collection(db, `artifacts/${appId}/public/data/premium_article_comments`);

            const finalUserName = userName.trim();

            await addDoc(commentsRef, {
                userId,
                userName: finalUserName, // 💡 USE USER-PROVIDED NAME
                avatarUrl: `https://placehold.co/100x100/4f46e5/ffffff?text=${finalUserName[0].toUpperCase()}`,
                text: newCommentText.trim(),
                timestamp: serverTimestamp()
            });

            // 💡 PERSISTENCE: Save the user's name on successful post
            localStorage.setItem('commentUserName', finalUserName);

            setNewCommentText("");
            setPostSuccess(true);
            setTimeout(() => setPostSuccess(false), 3000);

        } catch (error) {
            console.error("Error posting comment:", error);
            setPostError("Failed to post comment. Please try again.");
        } finally {
            setIsPosting(false);
        }
    }, [newCommentText, userName, db, userId]); // Added userName to dependencies

    // --- Newsletter Subscribe Handler (REAL Web3Forms Key) ---
    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubscribeMessage('');

        if (email.trim() === '') {
            setSubscribeMessage("Please enter a valid email address.");
            return;
        }

        setIsSubscribing(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY, // 🔑 REAL KEY APPLIED
                    subject: "New Newsletter Subscriber for AI Article",
                    email: email,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubscribeMessage("Subscribed successfully! Check your inbox.");
                setEmail('');
            } else {
                console.error("Web3Forms Error:", result.message);
                setSubscribeMessage(`Subscription failed: ${result.message}`);
            }

        } catch (error) {
            console.error("Network or API call failed:", error);
            setSubscribeMessage("An unexpected error occurred. Please try again later.");
        } finally {
            setIsSubscribing(false);
        }
    };


    // ScrollSpy Logic (Unchanged)
    useEffect(() => {
        const handleScroll = () => {
            let current = "intro";
            sectionsData.forEach((sec) => {
                const element = document.getElementById(sec.id);
                if (element && window.scrollY >= element.offsetTop - 180) { 
                    current = sec.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const TOC = ({ isMobile = false }) => (
        <nav className={isMobile ? "p-4" : "sticky top-28 h-fit"}>
            <h3 className="text-xs tracking-widest uppercase text-indigo-600 dark:text-indigo-400 font-bold mb-5">
                Article Contents
            </h3>
            <ul className="space-y-4 text-base">
                {sectionsData.map((s) => (
                    <li key={s.id}>
                        <button
                            onClick={() => scrollToSection(s.id)}
                            className={`block text-left transition-all duration-300 w-full
                                        ${
                                            activeSection === s.id
                                                ? "text-indigo-600 dark:text-indigo-400 font-extrabold border-l-4 border-indigo-500 pl-3"
                                                : "text-gray-600 dark:text-gray-400 hover:text-indigo-500 pl-4"
                                        }`}
                        >
                            <span className="text-sm opacity-70 mr-2">{s.label.split('.')[0]}.</span>
                            {s.label.split('.')[1].trim()}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );

    const WorkWithMeFooter = () => (
        <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 p-10 relative bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
        >
            <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                <Globe className="w-full h-full text-indigo-500/20 dark:text-fuchsia-400/20 animate-[spin_60s_linear_infinite] scale-150 transform rotate-12" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <IconBadge Icon={Send} className="mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-xl shadow-fuchsia-500/40" />

                <h2 className="text-4xl font-extrabold mb-4 
                                bg-gradient-to-r from-indigo-600 to-fuchsia-700 
                                dark:from-indigo-400 dark:to-fuchsia-500 bg-clip-text text-transparent">
                    Ready to Build the Future?
                </h2>
                <p className="mb-8 mx-auto text-lg text-gray-700 dark:text-gray-300">
                    Need a premium AI solution, a highly responsive full-stack application, or a complete design system that scales? Let's collaborate and bring your vision to life.
                </p>
                <a 
                    href="#"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-700 text-white font-bold text-lg rounded-xl shadow-xl shadow-fuchsia-500/40 
                            hover:shadow-fuchsia-500/60 transition-all duration-300 transform hover:scale-[1.02]"
                >
                    Start a Project <ArrowRight className="w-5 h-5 ml-1" />
                </a>
            </div>
        </motion.section>
    );


    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
            {/* Mobile TOC Button */}
            <button
                onClick={() => setIsTOCVisible(!isTOCVisible)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full 
                            bg-indigo-600 text-white shadow-2xl shadow-indigo-500/50 
                            hover:bg-indigo-700 transition"
            >
                {isTOCVisible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile TOC Overlay */}
            <AnimatePresence>
                {isTOCVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-gray-950 p-6 pt-20 lg:hidden overflow-y-auto"
                    >
                        <TOC isMobile={true} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <header className="relative w-full h-[70vh] flex items-end overflow-hidden pt-20">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x800/1e293b/ffffff?text=AI+Future+Header')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/60 to-gray-950/30"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative max-w-5xl mx-auto px-4 md:px-8 pb-16 text-white"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                        The Future of AI in Everyday Life
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-80">
                        A deep dive into how Artificial Intelligence is reshaping industries, augmenting human potential, and driving global innovation.
                    </p>
                    <div className="flex flex-wrap items-center space-x-4 text-sm font-medium border-l-4 border-indigo-500 pl-4">
                        <span>By <strong>Victor E.</strong></span>
                        <span>·</span>
                        <span>Sept 2025</span>
                        <span>·</span>
                        <span className="text-yellow-400">8 min read</span>
                    </div>
                </motion.div>
            </header>

            {/* Main Content Layout */}
            <div className="flex w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
                {/* TOC Sidebar */}
                <aside className="hidden lg:block w-1/4 pr-12">
                    <TOC />
                </aside>

                {/* Main Article Content */}
                <main className="w-full lg:w-3/4">
                    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-extrabold prose-headings:text-indigo-600 dark:prose-headings:text-indigo-400">

                        {/* --- 01. Introduction --- (Unchanged) */}
                        <section id="intro" className="py-8 pt-16 lg:pt-8"> 
                            <h2 className="text-4xl font-extrabold mb-6 hidden lg:block">{sectionsData[0].title}</h2>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-xl leading-relaxed italic text-gray-700 dark:text-gray-300"
                            >
                                Artificial Intelligence has moved beyond labs and research centers. It now powers everyday apps, from health monitoring wearables to predictive text on your phone. In this article, we explore its growing impact and what it means for the future of work and society.
                            </motion.p>
                        </section>

                        {/* ... (Sections 02, 03, 04, 05, 06, 07 - Unchanged) ... */}

                        {/* --- 02. Core Ideas (Lottie Replacement) --- */}
                        <section id="core" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-6">{sectionsData[1].title}</h2>
                            <p>
                                At its heart, AI thrives on data. The more diverse and high-quality data it processes, the more accurate and useful it becomes. This shift from simple rule-based systems to complex pattern recognition is the defining feature of the modern AI revolution.
                            </p>
                            
                            <div className="my-8 p-6 bg-indigo-50 dark:bg-gray-800 rounded-xl border-l-4 border-indigo-500 shadow-inner">
                                <p className="text-lg italic font-medium text-indigo-800 dark:text-indigo-300">
                                    “AI is not about replacing humans, it’s about augmenting human potential and automating the mundane to free up creativity.”
                                </p>
                            </div>

                            {/* Lottie Replacement with Icon Cards */}
                            <div className="grid md:grid-cols-3 gap-6 my-10 text-center">
                                {[
                                    { icon: BarChart3, title: "Data Driven", description: "Models train on massive, diverse datasets for robust decision-making." },
                                    { icon: Brain, title: "Deep Learning", description: "Complex neural networks simulate human cognitive processes." },
                                    { icon: Compass, title: "Ethical Direction", description: "Focus on fairness and transparency to prevent algorithmic bias." }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, y: 20 }} 
                                        whileInView={{ opacity: 1, y: 0 }} 
                                        transition={{ duration: 0.5, delay: i * 0.1 }} 
                                        viewport={{ once: true }} 
                                        className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-indigo-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                                    >
                                        <item.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                        <p className="font-medium text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* --- 03. Evolution Timeline --- */}
                        <section id="timeline" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-10">{sectionsData[2].title}</h2>
                            <div className="space-y-10 border-l-4 border-purple-500 pl-6 relative">
                                {[
                                    { year: "1950s", title: "The Birth of AI", description: "Early experiments in machine logic and computation, marked by the Dartmouth workshop." },
                                    { year: "1980s", title: "The First AI Winter", description: "Funding cuts and skepticism due to overpromising and limitations of early technology." },
                                    { year: "2000s", title: "The Data Explosion", description: "The rise of the internet and big data enables deep learning breakthroughs and a new wave of research." },
                                    { year: "2020s", title: "Everyday AI Integration", description: "AI integrated into daily life — from large language models to AI-driven healthcare, finance, and education." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.2 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        className="relative"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-white dark:ring-gray-950"></div>
                                        <h3 className="font-extrabold text-xl mb-1 text-gray-900 dark:text-gray-100">{item.year}: {item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                        
                        {/* --- 04. AI vs Human Strengths (Comparison) --- */}
                        <section id="compare" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-10 text-center">
                                <span className="text-gray-900 dark:text-gray-100">AI </span>
                                <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-600 bg-clip-text text-transparent">
                                    | vs |
                                </span>
                                <span className="text-gray-900 dark:text-gray-100"> Human Strengths</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* AI Card */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-white/90 to-indigo-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl 
                                                rounded-3xl p-8 shadow-2xl border border-indigo-200/50 dark:border-indigo-900/50 
                                                hover:shadow-indigo-500/20 transition-all duration-500"
                                >
                                    <h3 className="font-extrabold mb-6 flex items-center gap-3 text-2xl text-indigo-700 dark:text-indigo-300">
                                        <IconBadge Icon={Zap} className="shadow-lg shadow-indigo-500/50" />
                                        AI Capabilities
                                    </h3>
                                    <ul className="space-y-5 text-base">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium"><strong>Computational Speed:</strong> Executes complex calculations instantaneously.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium"><strong>Pattern Recognition:</strong> Identifies subtle correlations in massive datasets.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium"><strong>Scalability:</strong> Operates 24/7 and scales to millions of users instantly.</span>
                                        </li>
                                    </ul>
                                </motion.div>

                                {/* Humans Card */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-white/90 to-purple-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl 
                                                rounded-3xl p-8 shadow-2xl border border-purple-200/50 dark:border-purple-900/50 
                                                hover:shadow-purple-500/20 transition-all duration-500"
                                >
                                    <h3 className="font-extrabold mb-6 flex items-center gap-3 text-2xl text-purple-700 dark:text-purple-300">
                                        <IconBadge Icon={Heart} className="shadow-lg shadow-purple-500/50 bg-gradient-to-br from-purple-500 to-fuchsia-600" />
                                        Human Strengths
                                    </h3>
                                    <ul className="space-y-5 text-base">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium"><strong>Creative Insight:</strong> Generates truly novel ideas outside learned parameters.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium"><strong>Emotional Intelligence:</strong> Navigates complex social and interpersonal dynamics.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium"><strong>Ethical Judgment:</strong> Applies moral frameworks to make complex, non-algorithmic decisions.</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </section>

                        {/* --- 05. Premium Insights (Series of Engaging Content) --- */}
                        <section id="premium-insights" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-8">{sectionsData[4].title}</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { icon: Brain, text: "AI adoption is rapidly accelerating, shifting from novelty to core business strategy in most sectors." },
                                    { icon: CheckCircle, text: "Responsible AI is the new mandate, ensuring fairness, transparency, and building public trust." },
                                    { icon: Lightbulb, text: "The future is Human-Centered AI, where technology augments skills rather than just replacing tasks." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.15 }}
                                        viewport={{ once: true, amount: 0.8 }}
                                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-indigo-100 dark:border-gray-700 flex flex-col items-center text-center group transition-all hover:bg-indigo-50 dark:hover:bg-gray-700"
                                    >
                                        <div className="mb-3 p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 group-hover:bg-indigo-500 transition-colors">
                                            <item.icon className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                                        </div>
                                        <p className="font-medium">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div id="media" className="my-12">
                                <h3 className="text-2xl font-bold mb-4">Market Trend Visuals</h3>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                                >
                                    <video
                                        src="https://www.w3schools.com/tags/mov_bbb.mp4" 
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full h-auto max-h-96 object-cover"
                                        poster="https://placehold.co/1280x720/1f2937/ffffff?text=AI+Trend+Video+Placeholder"
                                    />
                                    <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                                        AI adoption trends in motion — watch how industries are embracing AI in 2025. (Using a public sample video).
                                    </div>
                                </motion.div>
                            </div>
                        </section>


                        {/* --- 06. FAQ --- */}
                        <section id="faq" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-8">{sectionsData[5].title}</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "Will AI replace jobs?", a: "AI will automate routine tasks, leading to the creation of new roles focused on AI development, maintenance, and human-AI collaboration. The goal is augmentation, not replacement." },
                                    { q: "How can small businesses leverage AI?", a: "Small businesses can use off-the-shelf SaaS tools like AI-powered chatbots for customer service, cloud analytics for forecasting, and automated marketing tools to scale their operations affordably." },
                                    { q: "What are the ethical concerns?", a: "The main concerns revolve around bias in training data, transparency (the 'black box' problem), and job displacement. **Responsible AI development** is the industry's response to these challenges." }
                                ].map((item, i) => (
                                    <motion.details
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 group hover:border-indigo-400 transition"
                                    >
                                        <summary className="cursor-pointer font-bold text-lg text-indigo-700 dark:text-indigo-400 flex justify-between items-center">
                                            {item.q}
                                        </summary>
                                        <p className="mt-4 text-base pl-4 border-l-2 border-indigo-300 dark:border-indigo-600 text-gray-700 dark:text-gray-300">
                                            {item.a}
                                        </p>
                                    </motion.details>
                                ))}
                            </div>
                        </section>

                        {/* --- 07. Related Articles (Series/Multiple Content) --- */}
                        <section id="related" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-8">{sectionsData[6].title}</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedArticles.map((a, i) => (
                                    <ArticleCard key={i} article={a} index={i} />
                                ))}
                            </div>
                        </section>

                        {/* --- Newsletter CTA (REAL Web3Forms Integration) --- */}
                        <section className="my-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-2xl shadow-indigo-500/40 text-center">
                            <h3 className="text-3xl font-extrabold mb-3">Unlock Exclusive AI Insights</h3>
                            <p className="mb-8 max-w-2xl mx-auto opacity-90">
                                Join our premium newsletter for weekly deep-dives into AI engineering, future-proofing your career, and exclusive data analysis.
                            </p>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email to join"
                                    className="px-6 py-3 border-2 border-white/50 rounded-xl w-full sm:w-80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition"
                                    aria-label="Email for newsletter"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubscribing}
                                    className={`px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-md transition-colors flex items-center justify-center 
                                        ${isSubscribing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                                >
                                    {isSubscribing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Subscribe'}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            </form>
                            {subscribeMessage && (
                                <p className={`mt-4 font-medium ${subscribeMessage.includes('successfully') ? 'text-green-200' : 'text-red-200'}`}>
                                    {subscribeMessage}
                                </p>
                            )}
                        </section>

                        {/* --- 08. Author --- */}
                        <section id="author" className="py-12 border-t border-gray-200 dark:border-gray-800 pt-16">
                            <h2 className="text-3xl font-extrabold mb-8">{sectionsData[7].title}</h2>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-indigo-100 dark:border-gray-700"
                            >
                                <img
                                    src="https://placehold.co/150x150/4f46e5/ffffff?text=V.E"
                                    alt="Victor E. Author"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md flex-shrink-0"
                                />
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Victor E.</h3>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">Senior AI Architect & Full-Stack Developer</p>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Victor specializes in designing and deploying production-ready, scalable AI solutions. With over a decade of experience, he focuses on the ethical and practical integration of machine learning into consumer-facing applications.
                                    </p>
                                    <div className="flex space-x-4">
                                        <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"><Linkedin className="w-6 h-6" /></a>
                                        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"><Twitter className="w-6 h-6" /></a>
                                        <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"><Github className="w-6 h-6" /></a>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* --- 09. Community Discussion (Effective Practice Applied) --- */}
                        <section id="comments" className="py-12">
                            <h2 className="text-3xl font-extrabold mb-6">{sectionsData[8].title}</h2>

                            {/* User Status / Public ID */}
                            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {isAuthReady ? (
                                    <>
                                        You are commenting as: 
                                        <code className="font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">
                                            {userName || "New User"}
                                        </code>
                                    </>
                                ) : (
                                    <>Connecting to secure discussion… <Loader2 className="w-4 h-4 animate-spin text-indigo-500" /></>
                                )}
                            </div>

                            <form onSubmit={handlePostComment} className="space-y-4">
                                
                                {/* 💡 USER NAME INPUT: Required for effective non-sign-in identity */}
                                <input
                                    type="text"
                                    disabled={!isAuthReady || isPosting}
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder={isAuthReady ? "Your Name (Required)" : "Connecting…"}
                                    className={`w-full p-3 rounded-xl border bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500
                                        ${(!isAuthReady || isPosting) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    required
                                    maxLength={30}
                                />
                                
                                <textarea
                                    disabled={!isAuthReady || isPosting}
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    placeholder={isAuthReady ? "Write your thoughts..." : "Connecting… Please wait."}
                                    className={`w-full p-4 rounded-xl border bg-white dark:bg-gray-900 shadow-md focus:ring-2 focus:ring-indigo-500
                                        ${(!isAuthReady || isPosting) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    rows={4}
                                />

                                {postError && <div className="text-red-500 text-sm">{postError}</div>}
                                {postSuccess && <div className="text-green-500 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Posted successfully!</div>}

                                <button
                                    type="submit"
                                    // 💡 UPDATED DISABLED LOGIC: Must require text AND a name
                                    disabled={!isAuthReady || isPosting || newCommentText.trim() === '' || userName.trim() === ''}
                                    className={`px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 
                                        ${(!isAuthReady || isPosting || newCommentText.trim() === '' || userName.trim() === '') ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                                >
                                    {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    Post Comment
                                </button>
                            </form>

                            {/* Comments List */}
                            <div className="mt-10 space-y-6">
                                <AnimatePresence initial={false}>
                                    {comments.length ? comments.map((c) => (
                                        <CommentDisplay key={c.id} comment={c} currentUserId={userId} />
                                    )) : (
                                        <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </section>


                        {/* End of Article CTA */}
                        <WorkWithMeFooter />

                    </article>
                </main>
            </div>
        </div>
    );
}