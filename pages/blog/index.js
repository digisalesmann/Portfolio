
"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* --------------------------------------------
   MOCK DATA — replace with CMS later
---------------------------------------------*/
const ARTICLES = [
  {
    slug: "nextjs-architecture",
    title: "Production-Grade Next.js Architecture: From Monorepo to Edge",
    excerpt:
      "A practical blueprint for building, shipping, and observing resilient Next.js apps at scale.",
    cover: "/images/articles/next-arch.jpg",
    author: { name: "Victor E.", avatar: "/avatars/victor.jpg" },
    date: "2025-08-21",
    readMin: 10,
    tags: ["Next.js", "Architecture", "DevOps"],
    featured: true,
    topic: "Engineering",
  },
  {
    slug: "ai-product-discovery",
    title: "AI for Product Discovery: Cutting Through the Noise",
    excerpt:
      "How to pair user research with embeddings, LLMs, and feedback loops to find signal early.",
    cover: "/images/articles/ai-discovery.jpg",
    author: { name: "Ada L.", avatar: "/avatars/ada.jpg" },
    date: "2025-07-10",
    readMin: 8,
    tags: ["AI", "Product"],
    featured: true,
    topic: "AI",
  },
  {
    slug: "web3-wallet-experiences",
    title: "Designing Wallet Experiences People Actually Love",
    excerpt:
      "UX patterns that make onboarding and transactions feel normal, not scary.",
    cover: "/images/articles/wallets.jpg",
    author: { name: "Ray M.", avatar: "/avatars/ray.jpg" },
    date: "2025-06-01",
    readMin: 7,
    tags: ["Web3", "UX"],
    featured: true,
    topic: "Web3",
  },
  {
    slug: "devex-metrics",
    title: "Developer Experience Metrics that Matter",
    excerpt:
      "Cycle time, CFR, lead time… and the human signals behind your dashboards.",
    cover: "/images/articles/devex.jpg",
    author: { name: "Victor E.", avatar: "/avatars/victor.jpg" },
    date: "2025-05-17",
    readMin: 6,
    tags: ["DX", "Culture"],
    topic: "Engineering",
  },
  {
    slug: "vector-databases",
    title: "Vector Databases Demystified (and When You Don’t Need One)",
    excerpt:
      "Embeddings, similarity, hybrid search — plus honest guidance on costs & tradeoffs.",
    cover: "/images/articles/vector-db.jpg",
    author: { name: "Ada L.", avatar: "/avatars/ada.jpg" },
    date: "2025-04-28",
    readMin: 9,
    tags: ["AI", "Search"],
    topic: "AI",
  },
  {
    slug: "perf-budgets",
    title: "Performance Budgets that Teams Actually Keep",
    excerpt:
      "Lightweight rules, guardrails, and CI checks that make fast the default.",
    cover: "/images/articles/perf.jpg",
    author: { name: "Ray M.", avatar: "/avatars/ray.jpg" },
    date: "2025-03-19",
    readMin: 5,
    tags: ["Frontend", "Performance"],
    topic: "Engineering",
  },
];

const TOPICS = ["All", "Engineering", "AI", "Web3", "Product", "Culture"];

/* --------------------------------------------
   Helpers
---------------------------------------------*/
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/* --------------------------------------------
   UI Atoms
---------------------------------------------*/
function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm transition border ${
        active
          ? "bg-brand text-white border-brand"
          : "bg-white/70 dark:bg-gray-900/60 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      {children}
    </span>
  );
}

function ArticleCard({ a, onBookmark, bookmarked }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/80 dark:bg-gray-900/60 shadow hover:shadow-xl transition"
    >
      <Link href={`/articles/${a.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-brand/50">
        <div className="relative">
          <img src={a.cover} alt={a.title} className="w-full h-44 sm:h-52 object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Tag>{a.topic}</Tag>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onBookmark(a.slug);
            }}
            aria-label="Bookmark"
            className="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-gray-900/80 px-3 py-2 text-xs shadow hover:scale-105 transition"
          >
            {bookmarked ? "★ Saved" : "☆ Save"}
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold leading-snug group-hover:underline">
            {a.title}
          </h3>
          <p className="muted text-sm mt-2 line-clamp-3">{a.excerpt}</p>

          <div className="mt-4 flex items-center gap-3">
            <img src={a.author.avatar} alt={a.author.name} className="w-7 h-7 rounded-full" />
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {a.author.name} • {formatDate(a.date)} • {a.readMin} min read
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* --------------------------------------------
   Extras
---------------------------------------------*/
function TagCloud({ tags }) {
  return (
    <div className="rounded-2xl p-5 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-gray-900/60 shadow-sm">
      <h4 className="font-semibold">Popular Tags</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t}
            href={`/tags/${t}`}
            className="px-3 py-1 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-brand hover:text-white transition"
          >
            {t}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NewsletterCTA() {
  return (
    <div className="rounded-2xl p-6 border border-black/10 dark:border-white/10 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b12] dark:to-[#0b0b12] shadow">
      <h4 className="text-lg font-semibold">Stay in the loop</h4>
      <p className="muted mt-1 text-sm">Weekly deep dives on Engineering, AI, and Web3.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Subscribed (demo)!");
        }}
        className="mt-4 flex gap-3 flex-col sm:flex-row"
      >
        <input
          type="email"
          required
          placeholder="you@domain.com"
          className="flex-1 px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/60"
        />
        <button className="btn-primary px-5 py-3 rounded-xl">Subscribe</button>
      </form>
    </div>
  );
}

/* --------------------------------------------
   Main Page
---------------------------------------------*/
export default function ArticlesPage() {
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState(new Set());
  const [limit, setLimit] = useState(6);
  const [history, setHistory] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const okTopic = topic === "All" || a.topic === topic;
      const okQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return okTopic && okQuery;
    });
  }, [topic, query]);

  const visible = filtered.slice(0, limit);

  function toggleBookmark(slug) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  // demo: recently viewed
  useEffect(() => {
    setHistory(ARTICLES.slice(0, 2));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-fuchsia-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-pink-500">
            The Build Log
          </span>
        </motion.h1>
        <p className="muted mt-3 max-w-2xl mx-auto">
          Deep, practical stories on Engineering, AI, and Web3 — for builders who ship.
        </p>

        {/* Stats bar */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <span>{ARTICLES.length} Articles</span>
          <span>3 Authors</span>
          <span>{TOPICS.length - 1} Topics</span>
        </div>
      </section>

      {/* Search + Topics */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search articles, tags, topics..."
            className="flex-1 px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/60"
          />
          <div className="flex gap-2 overflow-x-auto">
            {TOPICS.map((t) => (
              <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((a, i) => (
              <ArticleCard
                key={a.slug}
                a={a}
                onBookmark={toggleBookmark}
                bookmarked={bookmarks.has(a.slug)}
              />
            ))}
          </AnimatePresence>
        </div>

        {limit < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setLimit((n) => n + 6)}
              className="btn-outline px-6 py-3 rounded-xl"
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* Sidebar-like extras */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NewsletterCTA />
        </div>
        <div className="space-y-8">
          <TagCloud tags={["Next.js", "AI", "UX", "Web3", "DX", "Security", "Search"]} />

          {/* Recently viewed */}
          <div className="rounded-2xl p-5 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-gray-900/60 shadow-sm">
            <h4 className="font-semibold">Recently Viewed</h4>
            <div className="mt-4 space-y-3">
              {history.map((h) => (
                <Link key={h.slug} href={`/articles/${h.slug}`} className="flex items-center gap-3 group">
                  <img src={h.cover} className="w-16 h-12 object-cover rounded-md" />
                  <div>
                    <div className="text-sm font-medium group-hover:underline">{h.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{h.readMin} min read</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
