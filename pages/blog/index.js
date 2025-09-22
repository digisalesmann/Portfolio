"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import readingAnimation from "@/public/animations/reading.json";
import thinkingAnimation from "@/public/animations/thinking.json";
import { Linkedin, Twitter, Github, Mail, Lightbulb, CheckCircle, Brain } from "lucide-react";
import Link from "next/link";
import { Zap, BarChart3, Globe, Heart, Compass } from "lucide-react";

const IconBadge = ({ Icon }) => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center 
                  bg-gradient-to-br from-indigo-500/90 to-purple-600/90 
                  text-white shadow-md shadow-indigo-500/30">
    <Icon className="w-5 h-5" />
  </div>
);

const relatedArticles = [
  {
    title: "Building a Scalable AI Platform",
    excerpt: "Discover how modern AI apps are built for scalability and reliability.",
    image: "images/cute.webp",
  },
  {
    title: "The Future of Web Development",
    excerpt: "A deep dive into trends shaping how we build for the web.",
    image: "images/web.png",
  },
  {
    title: "Design Systems That Scale",
    excerpt: "Why design systems are critical for large teams and products.",
    image: "images/scale.webp",
  },
];

export default function ArticlePage() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "core", label: "Core Ideas" },
    { id: "timeline", label: "AI Evolution Timeline" },
    { id: "compare", label: "AI vs Human Strengths" },
    { id: "media", label: "Rich Media" },
    { id: "quotes", label: "Highlights" },
    { id: "infographics", label: "Infographics" },
    { id: "takeaways", label: "Premium Insights" },
    { id: "faq", label: "FAQ" },
    { id: "related", label: "Related Articles" },
    { id: "author", label: "About Author" },
    { id: "comments", label: "Comments" },
  ];

  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      let current = "intro";
      sections.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = sec.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-fuchsia-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="relative w-full h-[65vh] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            The Future of AI in Everyday Life
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            How Artificial Intelligence is reshaping industries and daily experiences.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span>By <strong>Victor E.</strong></span>
            <span>→</span>
            <span>Sept 2025</span>
            <span>→</span>
            <span>8 min read</span>
          </div>
        </motion.div>
      </section>

      <div className="flex w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* TOC */}
        <aside className="hidden lg:block w-1/4 pr-8 sticky top-28 h-fit">
          <h3 className="font-semibold mb-3">Contents</h3>
          <ul className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className={`transition ${
                    activeSection === s.id
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="w-full lg:w-3/4 prose prose-lg max-w-none dark:prose-invert">
          {/* Intro */}
          <section id="intro" className="mb-16">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Artificial Intelligence has moved beyond labs and research centers.
              It now powers everyday apps, from health monitoring wearables to
              predictive text on your phone. In this article, we explore its
              growing impact and what it means for the future.
            </motion.p>
          </section>

          {/* Core */}
          <section id="core" className="mb-16">
            <h2>Core Ideas</h2>
            <p>
              At its heart, AI thrives on data. The more diverse and high-quality
              data it processes, the more accurate it becomes.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic">
              “AI is not about replacing humans — it’s about augmenting human potential.”
            </blockquote>
          </section>

          {/* Timeline */}
          <section id="timeline" className="mb-16">
            <h2>AI Evolution Timeline</h2>
            <div className="space-y-6 border-l-2 border-indigo-500 pl-6">
              <div>
                <h4 className="font-semibold">1950s: Birth of AI</h4>
                <p>Early experiments in machine logic and computation.</p>
              </div>
              <div>
                <h4 className="font-semibold">2000s: Data Explosion</h4>
                <p>Big data enables deep learning breakthroughs.</p>
              </div>
              <div>
                <h4 className="font-semibold">2020s: Everyday AI</h4>
                <p>AI integrated into daily life — healthcare, finance, education.</p>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section id="compare" className="mb-20">
            <h2 className="text-3xl font-extrabold mb-12 text-left">
              <span className="text-gray-900 dark:text-gray-100">AI </span>
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                vs
              </span>
              <span className="text-gray-900 dark:text-gray-100"> Human Strengths</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* AI */}
              <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl 
                              rounded-2xl p-8 shadow-xl border border-white/20 
                              hover:shadow-2xl hover:-translate-y-1 transition">
                <h4 className="font-bold mb-6 flex items-center gap-3 text-lg">
                  <IconBadge Icon={Zap} />
                  AI
                </h4>
                <ul className="space-y-5 text-base">
                  <li className="flex items-center gap-3">
                    <IconBadge Icon={Zap} />
                    <span className="font-medium">Fast computation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <IconBadge Icon={BarChart3} />
                    <span className="font-medium">Pattern recognition</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <IconBadge Icon={Globe} />
                    <span className="font-medium">Scalability</span>
                  </li>
                </ul>
              </div>

              {/* Humans */}
              <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl 
                              rounded-2xl p-8 shadow-xl border border-white/20 
                              hover:shadow-2xl hover:-translate-y-1 transition">
                <h4 className="font-bold mb-6 flex items-center gap-3 text-lg">
                  <IconBadge Icon={Heart} />
                  Humans
                </h4>
                <ul className="space-y-5 text-base">
                  <li className="flex items-center gap-3">
                    <IconBadge Icon={Lightbulb} />
                    <span className="font-medium">Creativity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <IconBadge Icon={Heart} />
                    <span className="font-medium">Emotional intelligence</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <IconBadge Icon={Compass} />
                    <span className="font-medium">Ethical judgment</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Media */}
          <section id="media" className="mb-16">
            <div className="w-full max-w-xl mx-auto">
              <Lottie animationData={readingAnimation} loop={true} />
            </div>
          </section>

          {/* Highlights */}
          <section id="quotes" className="mb-16">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
              <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                Key Insight: The fusion of AI with IoT devices could transform
                smart cities into living, adaptive ecosystems.
              </p>
            </div>
            <div className="mt-8 w-full max-w-lg mx-auto">
              <Lottie animationData={thinkingAnimation} loop={true} />
            </div>
          </section>

          {/* Infographics */}
          <section id="infographics" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-left">Infographics</h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden"
            >
              <video
                src="/infographics/ai-adoption.mp4"
                controls
                autoPlay
                muted
                loop
                className="w-full object-cover"
              />
              <div className="p-4 text-left text-sm text-gray-600 dark:text-gray-300">
                AI adoption trends in motion — watch how industries are embracing AI in 2025.
              </div>
            </motion.div>
          </section>

          {/* Premium Insights */}
          <section id="takeaways" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-left border-l-4 border-indigo-500 pl-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">Premium Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Brain, text: "AI adoption is accelerating across industries." },
                { icon: CheckCircle, text: "Responsible AI ensures fairness & trust." },
                { icon: Lightbulb, text: "Human-centered AI creates real impact." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-xl p-6 shadow-lg flex flex-col items-center text-center"
                >
                  <item.icon className="w-10 h-10 text-indigo-600 mb-3" />
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-left border-l-4 border-purple-500 pl-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">FAQ</h2>
            <details className="mb-3 p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 shadow">
              <summary className="cursor-pointer font-semibold">Will AI replace jobs?</summary>
              <p className="mt-2 text-sm">AI will automate some tasks, but create new roles too.</p>
            </details>
            <details className="mb-3 p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 shadow">
              <summary className="cursor-pointer font-semibold">How can small businesses use AI?</summary>
              <p className="mt-2 text-sm">Through SaaS tools, chatbots, and cloud analytics.</p>
            </details>
          </section>

          {/* Related */}
          <section id="related" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-left border-l-4 border-fuchsia-500 pl-4 bg-gradient-to-r from-fuchsia-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white/70 dark:bg-gray-800/70 backdrop-blur"
                >
                  <img src={a.image} alt={a.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{a.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Author */}
          <section id="author" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-left border-l-4 border-indigo-400 pl-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">About the Author</h2>
            <div className="flex items-center space-x-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur p-6 rounded-xl shadow">
              <img src="images/kiki.png" alt="Author photo" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <h4 className="font-bold">Chinagoro Victor E.</h4>
                <p className="text-sm mb-2">AI Researcher & Developer</p>
                <div className="flex space-x-3">
                  <Link href="#"><Twitter size={18} /></Link>
                  <Link href="#"><Linkedin size={18} /></Link>
                  <Link href="#"><Github size={18} /></Link>
                  <Link href="mailto:test@email.com"><Mail size={18} /></Link>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="mb-16 text-left">
            <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="mb-6">Subscribe to get premium insights delivered to your inbox.</p>
            <form className="flex flex-col md:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border dark:border-gray-700 rounded-lg w-72 dark:bg-gray-800 dark:text-gray-100"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                Subscribe
              </button>
            </form>
          </section>

          {/* Comments */}
          <section id="comments" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-left border-l-4 border-indigo-600 pl-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">Comments</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-semibold">Tony Stark</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Take my credit card, you deserve it! Type shi
                </p>
              </div>
              <form className="mt-6 space-y-3">
                <textarea
                  className="w-full border dark:border-gray-700 rounded-lg p-3 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Post Comment
                </button>
              </form>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Work with me</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Need a premium AI solution, full-stack app, or design system that scales? Let's collaborate.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Contact Me
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
