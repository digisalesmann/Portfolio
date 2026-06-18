import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const WEB3FORMS_KEY = "5990f7bc-58f5-4b00-8630-74158a28db18";

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const projectTypes = ["Web App", "Mobile App", "Web & Mobile", "API / Backend", "Not Sure Yet"];
const budgets = ["$1K – $3K", "$3K – $7K", "$7K – $15K", "$15K+", "Not Sure Yet"];
const timelines = ["ASAP (< 1 month)", "1–2 Months", "2–4 Months", "Flexible"];

const process = [
  { num: "01", title: "Brief Review",     desc: "I review your project details within 24 hours and note any clarifying questions." },
  { num: "02", title: "Discovery Call",    desc: "A short call to align on scope, goals, and constraints, usually 20-30 minutes." },
  { num: "03", title: "Fixed Proposal",    desc: "You receive a clear estimate with timeline and cost. No surprises, no obligation." },
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

function PillGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
              value === opt
                ? "bg-white text-black border-white"
                : "border-white/15 text-white/50 hover:text-white hover:border-white/35"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const inputCls = "w-full bg-transparent border-b border-white/[0.12] py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors";

export default function Quote() {
  const [form, setForm] = useState({
    name: "", email: "", company: "",
    projectType: "", budget: "", timeline: "", details: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setField = (field) => (val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.projectType || !form.budget || !form.timeline) {
      setStatus("incomplete");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New Quote Request",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", projectType: "", budget: "", timeline: "", details: "" });
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <Head>
        <title>Get a Quote: Victor Chinagoro</title>
        <meta name="description" content="Request a project estimate from Victor Chinagoro. Tell me about your web or mobile project and get a clear quote, no obligation." />
      </Head>
      <div className="bg-black text-white min-h-screen">

        {/* ── Header ───────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-white" style={{ top: "-150px", right: "-100px", opacity: 0.18 }} />
          <div className="container relative z-10">
            <Reveal>
              <p className="section-label mb-5">Project Estimate</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.05] max-w-2xl">
                Get a Quote
              </h1>
              <p className="text-white/45 text-base md:text-lg max-w-xl leading-relaxed">
                Tell me about your project and I&apos;ll send back a clear estimate.
                No obligation, no pressure, just a straight answer.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Main Grid ───────────────────────────── */}
        <section className="container pt-2 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

            {/* Left — process, no cards */}
            <div className="lg:col-span-2">
              <Reveal>
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-4">What Happens Next</p>
              </Reveal>
              <div className="divide-y divide-white/[0.07] border-t border-white/[0.07] mb-10">
                {process.map((step, i) => (
                  <Reveal key={step.num} delay={i * 0.07}>
                    <div className="py-7 flex items-start gap-4">
                      <span className="font-mono text-xs text-white/40 mt-0.5 shrink-0">{step.num}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1.5">{step.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.25}>
                <p className="text-sm text-white/30 leading-relaxed">
                  Prefer to just talk first? <Link href="/contact" className="text-white/70 hover:text-white transition-colors">Send a general message →</Link>
                </p>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.1} className="lg:col-span-3 border-t border-white/[0.07] lg:border-t-0 pt-10 lg:pt-0">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center border-t border-white/[0.07]">
                  <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-white">
                    <IconCheck />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Quote Request Sent!</h3>
                  <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                    Thanks for the details. I&apos;ll review your brief and get back to you within 24 hours.
                  </p>
                  <button onClick={() => setStatus("idle")} className="text-sm text-white/70 hover:text-white transition-colors">
                    Submit another request →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <PillGroup label="Project Type" options={projectTypes} value={form.projectType} onChange={setField("projectType")} />
                  <PillGroup label="Budget Range" options={budgets} value={form.budget} onChange={setField("budget")} />
                  <PillGroup label="Timeline" options={timelines} value={form.timeline} onChange={setField("timeline")} />

                  <div>
                    <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-3">Project Details</label>
                    <textarea name="details" value={form.details} onChange={handleChange} required rows={4}
                      placeholder="What are you building? Key features, goals, and anything else I should know..."
                      className={`${inputCls} resize-none`} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <div>
                      <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Your Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Company <span className="text-white/15">(optional)</span></label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your company or brand name" className={inputCls} />
                  </div>

                  {status === "incomplete" && (
                    <p className="text-sm text-red-400">Please select a project type, budget, and timeline above.</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-400">Something went wrong. Please email buildwithvictorhq@gmail.com directly.</p>
                  )}

                  <div>
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
                      ) : "Request Quote →"}
                    </button>
                    <p className="text-xs text-white/20 mt-5">I typically respond within 24 hours. All inquiries are confidential.</p>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
