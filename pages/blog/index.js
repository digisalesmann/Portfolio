"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
// Assuming these are local to your project:
import readingAnimation from "@/public/animations/reading.json"; 
import thinkingAnimation from "@/public/animations/thinking.json"; 
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
} from "lucide-react";
import Link from "next/link";

// --- Components for a cleaner structure ---

// 1. Icon Badge - Elevated design
const IconBadge = ({ Icon, className = "" }) => (
  <div
    className={`w-10 h-10 rounded-full flex items-center justify-center 
                bg-gradient-to-br from-indigo-500 to-purple-600 
                text-white shadow-lg shadow-indigo-500/40 ${className}`}
  >
    <Icon className="w-5 h-5" />
  </div>
);

// 2. Article Card - For Related Articles
const ArticleCard = ({ article, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true, amount: 0.4 }}
    className="relative border border-gray-200/50 dark:border-gray-700/50 
               rounded-2xl overflow-hidden shadow-xl 
               hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 
               bg-white dark:bg-gray-800 cursor-pointer group"
  >
    <div className="h-44 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
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
  </motion.div>
);

// --- Static Data ---
const relatedArticles = [
  {
    title: "Building a Scalable AI Platform",
    excerpt: "Discover how modern AI apps are built for scalability and reliability.",
    image: "images/cute.webp", // Placeholder, ensure path is correct
  },
  {
    title: "The Future of Web Development",
    excerpt: "A deep dive into trends shaping how we build for the web.",
    image: "images/web.png", // Placeholder, ensure path is correct
  },
  {
    title: "Design Systems That Scale",
    excerpt: "Why design systems are critical for large teams and products.",
    image: "images/scale.webp", // Placeholder, ensure path is correct
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
];

// --- Main Component ---

export default function PremiumArticlePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [isTOCVisible, setIsTOCVisible] = useState(false);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsTOCVisible(false); // Close mobile TOC on click
  }, []);

  // ScrollSpy Logic
  useEffect(() => {
    const handleScroll = () => {
      let current = "intro";
      // Find the currently visible section based on scroll position
      sectionsData.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = sec.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced Table of Contents (TOC) Component
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
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

      {/* Hero Section - Premium/Magazine Aesthetic */}
      <header className="relative w-full h-[70vh] flex items-end overflow-hidden">
        {/* Background Image/Gradient overlay */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/70 to-transparent"></div>
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
            
            {/* Custom Section Title Component */}
            {sectionsData.map(s => s.id).includes(activeSection) && (
              <motion.div 
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-950 p-3 border-b border-gray-200 dark:border-gray-800"
              >
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {sectionsData.find(s => s.id === activeSection)?.label}
                </p>
                <h2 className="text-xl font-bold mt-1">
                  {sectionsData.find(s => s.id === activeSection)?.title}
                </h2>
              </motion.div>
            )}

            {/* --- 01. Introduction --- */}
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

            {/* --- 02. Core Ideas --- */}
            <section id="core" className="py-12">
              <h2 className="text-3xl font-extrabold mb-6">{sectionsData[1].title}</h2>
              <p>
                At its heart, **AI thrives on data**. The more diverse and high-quality data it processes, the more accurate and useful it becomes. This shift from simple rule-based systems to complex pattern recognition is the defining feature of the modern AI revolution.
              </p>
              
              <div className="my-8 p-6 bg-indigo-50 dark:bg-gray-800 rounded-xl border-l-4 border-indigo-500 shadow-inner">
                <p className="text-lg italic font-medium text-indigo-800 dark:text-indigo-300">
                  “AI is not about replacing humans — it’s about **augmenting human potential** and automating the mundane to free up creativity.”
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-10">
                <Lottie animationData={readingAnimation} loop={true} className="h-48" />
                <Lottie animationData={thinkingAnimation} loop={true} className="h-48 col-span-2 hidden md:block" />
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

              {/* Added Infographic/Media section for content flow */}
              <div id="media" className="my-12">
                <h3 className="text-2xl font-bold mb-4">Market Trend Visuals</h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Note: Ensure this video path is correct in your project */}
                  <video
                    src="/infographics/ai-adoption.mp4" 
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    AI adoption trends in motion — watch how industries are embracing AI in 2025.
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

            {/* --- Newsletter CTA (Before Author/Comments) --- */}
            <section className="my-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-2xl shadow-indigo-500/40 text-center">
              <h3 className="text-3xl font-extrabold mb-3">Unlock Exclusive AI Insights</h3>
              <p className="mb-8 max-w-2xl mx-auto opacity-90">
                Join our premium newsletter for weekly deep-dives into AI engineering, future-proofing your career, and exclusive data analysis.
              </p>
              <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email to join"
                  className="px-6 py-3 border-2 border-white/50 rounded-xl w-full sm:w-80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition"
                />
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
                >
                  Subscribe Now
                </button>
              </form>
            </section>


            {/* --- 08. About the Author --- */}
            <section id="author" className="py-12">
              <h2 className="text-3xl font-extrabold mb-8">{sectionsData[7].title}</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <img
                  src="images/kenny.jpg" // Placeholder, ensure path is correct
                  alt="Author photo"
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-500/50 flex-shrink-0"
                />
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">Chinagoro Victor E.</h3>
                  <p className="text-md mb-3 text-indigo-600 dark:text-indigo-400 font-semibold">AI Researcher & Full-Stack Developer</p>
                  <p className="text-base mb-4 text-gray-600 dark:text-gray-400">
                    Victor specializes in building scalable, ethical AI solutions and high-performance, responsive UIs. He believes in technology that empowers human ingenuity.
                  </p>
                  <div className="flex space-x-4">
                    <Link href="#" aria-label="Twitter" className="text-gray-500 hover:text-twitter transition-colors"><Twitter size={20} /></Link>
                    <Link href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-linkedin transition-colors"><Linkedin size={20} /></Link>
                    <Link href="#" aria-label="GitHub" className="text-gray-500 hover:text-github transition-colors"><Github size={20} /></Link>
                    <Link href="mailto:test@email.com" aria-label="Email" className="text-gray-500 hover:text-indigo-600 transition-colors"><Mail size={20} /></Link>
                  </div>
                </div>
              </motion.div>
            </section>
            
            {/* --- Comments (Placeholder) --- */}
            <section id="comments" className="py-12">
              <h2 className="text-3xl font-extrabold mb-8 border-l-4 border-indigo-600 pl-4">Community Discussion</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/70 shadow-sm border border-gray-100 dark:border-gray-700">
                  <p className="font-bold">Tony Stark</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Take my credit card, you deserve it! This piece perfectly articulates the augmentation vs. replacement debate.
                  </p>
                  <span className="text-xs text-gray-400 block mt-2">5 hours ago</span>
                </div>
                
                {/* Comment Form */}
                <form className="mt-8 space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-indigo-100 dark:border-gray-700">
                  <h4 className="font-bold text-xl">Leave a Comment</h4>
                  <textarea
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Share your thoughts..."
                    rows={4}
                  ></textarea>
                  <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                    Post Comment
                  </button>
                </form>
              </div>
            </section>

          </article>
          
          {/* Footer CTA - Work with Me */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 p-10 bg-gradient-to-r from-pink-600 to-fuchsia-700 text-white rounded-3xl text-center shadow-2xl shadow-pink-500/30"
          >
            <h2 className="text-4xl font-extrabold mb-4">Ready to Build the Future?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
              Need a premium AI solution, a highly responsive full-stack application, or a complete design system that scales? Let's collaborate and bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-white text-fuchsia-700 font-bold text-lg rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.05]"
            >
              Start a Project
            </Link>
          </motion.section>
          
        </main>
      </div>
    </div>
  );
}