import Head from "next/head";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const WEB3FORMS_KEY = "5990f7bc-58f5-4b00-8630-74158a28db18";

/* ── SVG icons — no emojis ───────────────────────── */
const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.48 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const contactItems = [
  { label: "Email",            value: "buildwithvictorhq@gmail.com", href: "mailto:buildwithvictorhq@gmail.com", Icon: IconEmail },
  { label: "Phone / WhatsApp", value: "+234 903 788 4753",            href: "tel:+2349037884753",                Icon: IconPhone },
  { label: "Location",         value: "Nigeria · Remote Worldwide",    href: null,                               Icon: IconLocation },
];

const socials = [
  { label: "GitHub",     href: "https://github.com/digisalesmann",                   username: "@digisalesmann" },
  { label: "Twitter / X", href: "https://x.com/buildwthvictor",                     username: "@buildwthvictor" },
  { label: "LinkedIn",   href: "https://linkedin.com/in/victor-chinagoro-1a032423a", username: "Victor Chinagoro" },
  { label: "Instagram",  href: "https://instagram.com/buildwthvictor",               username: "@buildwthvictor" },
];

const faqs = [
  {
    q: "What types of projects do you take on?",
    a: "Web apps, mobile apps (iOS & Android), and API backends. I specialize in fintech, Web3, and AI-powered products.",
  },
  {
    q: "What are your rates?",
    a: "Project-based or hourly depending on scope. I share a detailed quote after an initial discovery call, no surprises.",
  },
  {
    q: "How long does a project typically take?",
    a: "An MVP can be ready in 4-8 weeks. Larger products vary by scope. I always provide clear timelines upfront.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes, I work remotely with clients worldwide. I've worked with clients in the US, UK, Europe, and across Africa.",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const inputCls = "w-full bg-transparent border-b border-white/[0.12] py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <Head>
        <title>Contact: Victor Chinagoro</title>
        <meta name="description" content="Get in touch with Victor Chinagoro for web and mobile app development projects, contracts, or collaborations." />
      </Head>
      <div className="bg-black text-white min-h-screen">

        {/* ── Header ───────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-violet-600" style={{ top: "-150px", right: "-100px", opacity: 0.18 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label mb-5">Let&apos;s Talk</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.05]">
                Start a Project
              </h1>
              <p className="text-white/45 text-base md:text-lg max-w-xl leading-relaxed">
                Have an idea, a problem to solve, or a project to build?
                I&apos;d love to hear about it. Response within 24 hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Main Grid ───────────────────────────── */}
        <section className="container pt-2 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

            {/* Left — contact info, no cards */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="flex items-center gap-2 mb-10 text-xs text-emerald-400">
                  Available for new projects worldwide
                </div>
              </Reveal>

              {/* Contact items — separator list */}
              <div className="divide-y divide-white/[0.07] border-t border-white/[0.07] mb-8 lg:mb-12">
                {contactItems.map((item, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="py-5 flex items-center gap-4">
                      <span className="text-violet-400 shrink-0"><item.Icon /></span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-white hover:text-violet-400 transition-colors truncate block">{item.value}</a>
                        ) : (
                          <p className="text-sm text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Socials — separator list */}
              <Reveal delay={0.2}>
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-4">Social</p>
                <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="flex items-center justify-between py-4 group">
                      <span className="text-sm text-white/50 group-hover:text-white transition-colors">{s.label}</span>
                      <span className="text-xs text-white/25 group-hover:text-violet-400 transition-colors">{s.username}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — form, minimal styling */}
            <Reveal delay={0.1} className="lg:col-span-3 border-t border-white/[0.07] lg:border-t-0 pt-10 lg:pt-0">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center border-t border-white/[0.07]">
                  <div className="w-14 h-14 rounded-full border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <IconCheck />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                  <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setStatus("idle")} className="text-sm text-violet-400 hover:text-white transition-colors">
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                    <div className="mb-7">
                      <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Your Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className={inputCls} />
                    </div>
                    <div className="mb-7">
                      <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Subject</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Project inquiry / Collaboration" className={inputCls} />
                  </div>
                  <div className="pt-10">
                    <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-3">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project, what you want to build, your timeline, and budget..."
                      className={`${inputCls} resize-none`} />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400 pt-6">Something went wrong. Please email buildwithvictorhq@gmail.com directly.</p>
                  )}

                  <div className="pt-10">
                    <button type="submit" disabled={status === "loading"}
                      className="btn-primary text-sm px-8 py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : "Send Message →"}
                    </button>
                    <p className="text-xs text-white/20 mt-5">I typically respond within 24 hours. All inquiries are confidential.</p>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* ── FAQs — true 2-column on desktop ─────── */}
        <section className="py-24 bg-[#050505] border-t border-white/[0.05]">
          <div className="container">
            <Reveal className="mb-14">
              <p className="section-label mb-4">FAQ</p>
              <h2 className="section-heading">Common Questions</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.07]">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className={`py-8 border-b border-white/[0.07] ${
                    i % 2 === 0 ? "md:pr-12 md:border-r" : "md:pl-12"
                  }`}>
                    <h3 className="text-sm font-semibold text-white mb-3">{faq.q}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
