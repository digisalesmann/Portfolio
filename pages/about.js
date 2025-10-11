import React, { useState, useEffect, useRef, useCallback } from 'react';

// NOTE: We rely on the global CSS provided for .card, .section, .btn-primary, etc.

// --- 0. Custom Hook for Scroll-Based Animation (No Change) ---
const useVisibilityAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    const handleIntersect = useCallback(([entry]) => {
        if (entry.isIntersecting && !isVisible) { 
            setIsVisible(true);
        }
    }, [isVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, { threshold });
        const currentRef = elementRef.current;
        
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [handleIntersect, threshold]);

    return [elementRef, isVisible];
};

// Tailwind classes for the animation effect (No Change)
const ANIMATION_CLASSES = "transition-all duration-1000 ease-out transform";
const HIDDEN_CLASSES = "opacity-0 translate-y-8";
const VISIBLE_CLASSES = "opacity-100 translate-y-0";


// --- 1. Helper: Typing Animation Component (No Change) ---
const TYPING_PHRASE = "I design and build premium, high-performance web applications that scale. I'm Victor, a Senior Lead Architect ready for your next ambitious project.";
const TypingText = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const typingSpeed = 25;

    useEffect(() => {
        if (index < TYPING_PHRASE.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + TYPING_PHRASE[index]);
                setIndex(index + 1);
            }, typingSpeed);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <p className="text-xl sm:text-2xl font-light muted max-w-4xl min-h-[4rem]">
            {text}
            {/* Cursor color remains consistent with brand accent */}
            <span className="ml-1 inline-block w-0.5 h-6 bg-fuchsia-500 dark:bg-rose-400 align-middle animate-pulse"></span>
        </p>
    );
};

// --- 2. Data Definitions (No Change) ---
const SKILLS_DATA = [
    { name: 'Architecture & Scalability', icon: 'fas fa-drafting-compass', description: 'Designing multi-tenant, cloud-native systems for millions of users, ensuring high availability and low latency globally.' },
    { name: 'Elegance & UX/UI', icon: 'fas fa-palette', description: 'Transforming complexity into delightful, responsive, and accessible user experiences that drive conversion and retention.' },
    { name: 'Optimization & Performance', icon: 'fas fa-tachometer-alt', description: 'Delivering sub-100ms load times and high Lighthouse scores by deep-diving into bundling, asset delivery, and rendering strategies.' },
    { name: 'DevOps & Automation', icon: 'fas fa-cogs', description: 'Implementing robust CI/CD pipelines and infrastructure-as-code to enable fast, reliable, and secure deployment cycles.' },
];

const STACK_DATA = [
    // Expanded to 9 items
    { name: 'Next.js', svgPath: '/logos/nextjs-original.svg', color: 'text-gray-900 dark:text-gray-100' },
    { name: 'Node.js', svgPath: '/logos/nodejs-original.svg', color: 'text-green-500' },
    { name: 'TypeScript', svgPath: '/logos/typescript-original.svg', color: 'text-blue-600' },
    { name: 'React Native', svgPath: '/logos/reactnative-original.svg', color: 'text-sky-500' },
    { name: 'Tailwind CSS', svgPath: '/logos/tailwindcss-original.svg', color: 'text-teal-500' },
    { name: 'PostgreSQL', svgPath: '/logos/postgresql-original.svg', color: 'text-blue-700' },
    { name: 'GraphQL', svgPath: '/logos/graphql-plain.svg', color: 'text-pink-500' },
    { name: 'Python', svgPath: '/logos/python-original.svg', color: 'text-orange-500' },
    { name: 'Docker', svgPath: '/logos/docker-original.svg', color: 'text-blue-400' },
];

const STATS_DATA = [
    { number: '100+', label: 'Projects Completed', icon: 'fas fa-briefcase' },
    { number: '99%', label: 'Uptime Commitment', icon: 'fas fa-server' },
    { number: '4M+', label: 'Monthly Active Users Served', icon: 'fas fa-users' },
    { number: '1,500+', label: 'Commits on GitHub', icon: 'fab fa-github' },
];

const PILLARS_DATA = [
    { title: 'Full Ownership', text: 'I manage the entire feature lifecycle: conceptualization, architecture, development, deployment, and monitoring. You get one accountable expert.', icon: 'fas fa-bullseye' },
    { title: 'Future-Proof Code', text: 'Solutions are built with maintainability, testing, and modern language features (like TS/signals) in mind, minimizing technical debt.', icon: 'fas fa-cubes' },
    { title: 'Data-Driven Design', text: 'Leveraging analytics and user feedback to iterate quickly and ensure every development decision provides measurable business value.', icon: 'fas fa-chart-line' },
];

const EXPERTISE_DATA = [
    { 
        title: 'Frontend & UI Engineering', 
        icon: 'fas fa-laptop-code',
        skills: [
            { name: 'React/Next.js', detail: 'High-performance SPAs, SSR, and SSG for SEO and speed.' },
            { name: 'TypeScript', detail: 'Ensuring robust, scalable, and type-safe codebases.' },
            { name: 'State Management', detail: 'Expertise with Redux Toolkit, Zustand, and React Context API.' },
            { name: 'Tailwind CSS', detail: 'Utility-first styling for rapid, custom, and responsive design.' },
            { name: 'Mobile', detail: 'Cross-platform development using React Native (iOS/Android).' },
        ]
    },
    { 
        title: 'Backend & Core Services', 
        icon: 'fas fa-server',
        skills: [
            { name: 'Node.js/Express/NestJS', detail: 'Building RESTful and GraphQL APIs for heavy loads.' },
            { name: 'Databases', detail: 'PostgreSQL (Advanced SQL, ORMs), MongoDB, and Redis.' },
            { name: 'Authentication', detail: 'Implementing OAuth 2.0, JWT, and session-based security models.' },
            { name: 'Real-Time', detail: 'WebSocket implementation using Socket.IO for live features.' },
        ]
    },
    { 
        title: 'Cloud & DevOps', 
        icon: 'fas fa-cloud',
        skills: [
            { name: 'AWS/GCP/Vercel', detail: 'Deployment, scaling, and infrastructure setup.' },
            { name: 'Serverless', detail: 'Lambda, Cloud Functions, and Firebase for cost optimization.' },
            { name: 'CI/CD', detail: 'Automating builds and deployment pipelines with GitHub Actions/Jenkins.' },
            { name: 'Monitoring', detail: 'Setting up observability with Prometheus, Grafana, and APMs.' },
        ]
    },
];

// --- 3. Helper Components ---

// Component for a Core Value Card with Scroll Animation (No Change)
const AnimatedValueCard = ({ data, delay }) => {
    const [ref, isVisible] = useVisibilityAnimation(0.2); // Hook is correctly called here
    const classes = isVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;

    return (
        <div 
            ref={ref} 
            style={{ transitionDelay: `${delay}ms` }} 
            className={`p-6 md:p-8 card border-t-4 border-fuchsia-400 dark:border-rose-600 transition-all hover:shadow-xl hover:shadow-fuchsia-500/20 dark:hover:shadow-rose-500/20 ${ANIMATION_CLASSES} ${classes}`}>
            <i className={`${data.icon} text-3xl text-fuchsia-600 dark:text-rose-400 mb-4`}></i>
            <h3 className="text-xl font-bold mb-2">{data.name}</h3>
            <p className="muted text-sm">{data.description}</p>
        </div>
    );
};

// Component: Isolates the useVisibilityAnimation hook for PILLARS_DATA (UPDATED: Added inner gradient to card)
const PillarCard = ({ pillar, index }) => {
    const [ref, isVisible] = useVisibilityAnimation(0.3);
    const classes = isVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;
    
    return (
        <div 
            ref={ref} 
            key={index}
            style={{ transitionDelay: `${index * 200}ms` }} 
            // ADDED: bg-gradient-to-br class for a subtle inner card effect
            className={`text-center p-8 card border-t-8 border-fuchsia-600 dark:border-rose-500 shadow-xl bg-gradient-to-br from-white/90 to-fuchsia-50/70 dark:from-gray-900/90 dark:to-gray-800/70 ${ANIMATION_CLASSES} ${classes}`}>
            <i className={`${pillar.icon} text-5xl text-fuchsia-600 dark:text-rose-400 mb-4`}></i>
            <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
            <p className="muted">{pillar.text}</p>
        </div>
    );
};

// Component: Isolates the useVisibilityAnimation hook for EXPERTISE_DATA (No Change)
const ExpertiseColumn = ({ category, index }) => {
    const [ref, isVisible] = useVisibilityAnimation(0.2);
    const classes = isVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;

    return (
        <div 
            ref={ref}
            key={index} 
            style={{ transitionDelay: `${index * 200}ms` }}
            className={`card p-6 shadow-lg border-b-4 border-indigo-400 dark:border-indigo-600 ${ANIMATION_CLASSES} ${classes}`}
        >
            <i className={`${category.icon} text-3xl text-indigo-500 dark:text-indigo-300 mb-4`}></i>
            <h3 className="text-xl font-bold mb-4">{category.title}</h3>
            <ul className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-start">
                        <i className="fas fa-check-circle text-fuchsia-500 dark:text-rose-400 mr-3 mt-1 text-base flex-shrink-0"></i>
                        <div className="leading-tight">
                            <span className="font-semibold">{skill.name}: </span>
                            <span className="muted text-sm">{skill.detail}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Component for SVG Logo Integration (No Change)
const SvgTechLogo = ({ item }) => (
    <div className="p-2 sm:p-4 card grid place-items-center transform hover:scale-[1.10] transition-transform duration-300 group cursor-pointer shadow-md hover:shadow-fuchsia-500/30 h-20 sm:h-28 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        <img 
            src={item.svgPath} 
            alt={`${item.name} Logo`} 
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
        />
        <span className={`text-xs font-semibold mt-2 transition-opacity ${item.color} block opacity-100 sm:opacity-0 sm:group-hover:opacity-100`}>{item.name}</span>
    </div>
);

// Component for Professional Statistic Counter (No Change)
const StatDisplay = ({ data }) => {
    const [ref, isVisible] = useVisibilityAnimation(0.5);
    const classes = isVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;
    
    // ... counter logic (omitted for brevity) ...
    const [count, setCount] = useState(0);
    const target = parseInt(data.number.replace('+', '').replace('M', '000000').replace(',', ''), 10);

    useEffect(() => {
        if (!isVisible || target === 0) return;

        let start = 0;
        const duration = 1500;
        const increment = target / (duration / 50);

        const timer = setInterval(() => {
            start += increment;
            if (start < target) {
                let display = Math.ceil(start).toLocaleString();
                if (data.number.includes('+')) display += '+';
                if (data.number.includes('M')) display = (Math.ceil(start) / 1000000).toFixed(1) + 'M+';
                
                setCount(display);
            } else {
                setCount(data.number);
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [isVisible, target, data.number]);

    return (
        <div 
            ref={ref} 
            className={`text-center p-6 card backdrop-blur-sm shadow-lg border-b-4 border-fuchsia-500 dark:border-rose-500 ${ANIMATION_CLASSES} ${classes}`}>
            <i className={`${data.icon} text-3xl mb-3 text-fuchsia-600 dark:text-rose-400`}></i>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 min-h-10">{isVisible ? count : data.number}</div>
            <p className="muted text-sm mt-1">{data.label}</p>
        </div>
    );
};


// --- 4. Main About Page Component ---

export default function AboutPage() {
    // Hooks called at the top level of the component
    const [timelineRef, timelineVisible] = useVisibilityAnimation(0.15);
    const [heroTitleRef, heroTitleVisible] = useVisibilityAnimation(0.1);
    const [heroCtaRef, heroCtaVisible] = useVisibilityAnimation(0.1);
    const [heroAvatarRef, heroAvatarVisible] = useVisibilityAnimation(0.1);
    const [finalCtaRef, finalCtaVisible] = useVisibilityAnimation(0.1); // New hook for final CTA

    const heroTitleClasses = heroTitleVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;
    const heroCtaClasses = heroCtaVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;
    // UPDATED: Added an initial rotation for a more dynamic look
    const heroAvatarClasses = heroAvatarVisible ? "opacity-100 scale-100 rotate-1" : "opacity-0 scale-90 rotate-3";
    const finalCtaClasses = finalCtaVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;

    return (
        <div className="min-h-screen pt-12 md:pt-16"> 
            
            {/* -------------------- 1. Premium Hero & Animated Intro -------------------- */}
            <section className="section text-center md:text-left pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-12 items-center">
                    
                    {/* Left Column: Text Content */}
                    <div className="md:col-span-7 mb-10 md:mb-0">
                        
                        {/* Title: Gradient blend to match global theme */}
                        <h1 
                            ref={heroTitleRef}
                            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 
                                bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-700 via-indigo-600 to-rose-600 dark:from-fuchsia-400 dark:via-indigo-400 dark:to-rose-400 
                                ${ANIMATION_CLASSES} ${heroTitleClasses}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            Building Digital Excellence.
                        </h1>
                        
                        <TypingText />

                        {/* CTA Buttons */}
                        <div 
                            ref={heroCtaRef}
                            className={`mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 ${ANIMATION_CLASSES} ${heroCtaClasses}`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            {/* Primary Button */}
                            <a href="/contact" className="btn-primary shadow-lg shadow-fuchsia-500/50 dark:shadow-rose-500/40 transform hover:scale-[1.03] transition-transform w-full sm:w-auto">
                                <i className="fas fa-rocket mr-2"></i> Launch Your Project
                            </a>
                            {/* Outline Button */}
                            <a 
                                href="#expertise-pillars" 
                                className="btn-outline w-full sm:w-auto">
                                <i className="fas fa-mouse-pointer mr-2"></i> Discover My Edge
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Premium Photo Container */}
                    <div className="md:col-span-5 relative flex justify-center p-8">
                        <div 
                            ref={heroAvatarRef}
                            // UPDATED: Changed base rotation to rotate-1 to maintain dynamism without hover
                            className={`relative w-full max-w-sm aspect-square ${ANIMATION_CLASSES} duration-1000 ${heroAvatarClasses}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            {/* Background shape/shadow (Color updated) */}
                            {/* Removed spin animation for a calmer, high-end feel */}
                            <div className="absolute inset-0 bg-fuchsia-200/50 dark:bg-rose-800/40 rounded-[2.5rem] transform transition-all duration-700 rotate-3 shadow-2xl z-0"></div>
                            
                            <img
                                src="/images/kenny.jpg"
                                alt="Victor's Professional Avatar"
                                // Removed hover transform to avoid jumping
                                className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-xl border-4 border-white dark:border-gray-950 transition-transform transform"
                                style={{clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)'}}
                            />
                            
                            {/* Subtle glow effect (Color updated) */}
                            <div className="absolute inset-0 rounded-[2.5rem] ring-8 ring-fuchsia-500/10 dark:ring-rose-500/10 animate-pulse-slow z-20 pointer-events-none"></div>
                        </div>
                    </div>

                </div>
            </section>
            
            {/* -------------------- 2. Vision and Philosophy -------------------- */}
            <section className="section py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-6">
                        My Guiding Philosophy
                    </h2>
                    {/* Removed ** for emphasis */}
                    <div className="text-center max-w-4xl mx-auto space-y-4 text-lg muted">
                        <p>
                            I believe in **delivering measurable business impact** through elegant, scalable software. Code quality is non-negotiable, and every architectural decision must be made with future growth and maintenance in mind.
                        </p>
                        <p className='font-semibold italic text-fuchsia-600 dark:text-rose-400'>
                            "Simplicity is the ultimate sophistication."
                        </p>
                    </div>
                </div>
            </section>
            
            {/* -------------------- 3. Proof Points / Professional Statistics -------------------- */}
            <section className="section bg-gradient-to-r from-rose-100/50 to-fuchsia-100/50 dark:from-gray-900 dark:to-gray-900 rounded-[2rem] py-16 shadow-inner">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {STATS_DATA.map((stat, index) => (
                        <StatDisplay key={index} data={stat} />
                    ))}
                </div>
            </section>
            
            {/* -------------------- 4. Core Expertise & Services -------------------- */}
            <section id="expertise-pillars" className="section">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
                    Core Focus Areas
                </h2>
                <p className="muted text-center max-w-3xl mx-auto mb-12">
                    My skill set is balanced between high-level architectural thinking and meticulous code implementation, ensuring robust delivery.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SKILLS_DATA.map((data, index) => (
                        <AnimatedValueCard key={index} data={data} delay={index * 150} />
                    ))}
                </div>
            </section>
            
            {/* -------------------- 5. Expertise Deep Dive (Technical Skills Matrix) -------------------- */}
            <section className="section">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
                    Technical Skills Matrix
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {EXPERTISE_DATA.map((category, index) => (
                        <ExpertiseColumn key={index} category={category} index={index} />
                    ))}
                </div>
            </section>

            {/* -------------------- 6. Service Pillars (UPDATED: PillarCard has inner gradient) -------------------- */}
            <section className="section bg-fuchsia-50/60 dark:bg-gray-900/60 rounded-[2rem] shadow-inner backdrop-blur-sm">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
                    The Victor Advantage
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PILLARS_DATA.map((pillar, index) => (
                        <PillarCard key={index} pillar={pillar} index={index} />
                    ))}
                </div>
            </section>

            {/* -------------------- 7. The Tech Stack (No Change) -------------------- */}
            <section className="section">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
                    Modern Toolset Mastery
                </h2>
                <p className="muted text-center max-w-3xl mx-auto mb-12">
                    The right tools applied with expert discipline yields predictable, high-quality results.
                </p>
                
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-4 max-w-7xl mx-auto">
                    {STACK_DATA.map((item, index) => (
                        <div key={item.name} className="lg:col-span-1"> {/* Ensure each item takes 1 column on lg/xl */}
                            <SvgTechLogo item={item} />
                        </div>
                    ))}
                </div>
            </section>
            
            {/* -------------------- 8. Project Snapshot / Case Study Highlight (No Change) -------------------- */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:bg-gray-800 text-white shadow-2xl">
                <section className="container rounded-none py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <i className="fas fa-trophy text-5xl text-white mb-6"></i>
                        <h3 className="text-3xl font-extrabold mb-4">Case Study Highlight: E-Commerce Platform</h3>
                        <p className="text-lg opacity-90 mb-6">
                            Designed and deployed a serverless, highly-available e-commerce platform capable of handling **50,000 requests per minute**. Reduced latency by **40%** by optimizing GraphQL query resolution and moving image assets to a global CDN.
                        </p>
                        {/* Inverting button colors for high contrast against the dark background */}
                        <a href="/portfolio" className="btn-primary !bg-white !text-indigo-700 hover:!bg-gray-100 border-none">
                            <i className="fas fa-eye mr-2"></i> View Full Portfolio
                        </a>
                    </div>
                </section>
            </div>


            {/* -------------------- 9. Testimonial / Social Proof Block (No Change) -------------------- */}
            <section className="section">
                <div className="max-w-4xl mx-auto text-center py-8 card border-l-8 border-fuchsia-500 dark:border-rose-400 bg-white/50 dark:bg-gray-950/50 shadow-xl">
                    <i className="fas fa-quote-left text-3xl text-fuchsia-400 dark:text-rose-400 mb-6"></i>
                    <blockquote className="text-xl font-light italic leading-relaxed mb-6 px-4">
                        "Victor didn't just meet the requirements; he elevated the entire product vision. His focus on performance and architectural integrity saved us months of future tech debt."
                    </blockquote>
                    <div className="font-semibold text-lg text-fuchsia-600 dark:text-rose-400">
                        — CEO, Global E-Commerce Startup
                    </div>
                    <p className="text-sm muted mt-1">
                        (Project delivery, Q2 2024)
                    </p>
                </div>
            </section>

            {/* -------------------- 10. My Professional Timeline (No Change) -------------------- */}
            <section className="section">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
                    Professional Trajectory
                </h2>
                <div ref={timelineRef} className="max-w-3xl mx-auto px-4 md:px-0">
                    {[{ year: '2025+', title: 'Strategic Consulting & Lead Architecture', description: 'Focused on high-level architecture reviews, team mentorship, and complex system design for venture-backed scale-ups.' },
                    { year: '2023-2024', title: 'Senior Lead Architect, SaaS Focus', description: 'Led the successful delivery of a major enterprise multi-tenant SaaS platform, specifically optimizing real-time data sync using Firestore and GraphQL subscriptions.' },
                    { year: '2020-2022', title: 'React Performance Specialist', description: 'Deep specialization in React performance, focusing on memoization, concurrent mode adoption, and large-scale state management with Redux/Zustand.' },
                    { year: '2017-2019', title: 'Full-Stack Foundation', description: 'Gained comprehensive experience across the entire stack, from foundational DevOps (CI/CD) to relational database design (PostgreSQL).' },
                    ].map((item, index, arr) => {
                        const classes = timelineVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES;
                        return (
                            <div key={index} 
                                style={{ transitionDelay: `${index * 300}ms` }}
                                className={`relative flex group ${ANIMATION_CLASSES} ${classes}`}>
                                <div className="flex flex-col items-center mr-4 md:mr-6">
                                    {/* Updated point color to fuchsia/rose */}
                                    <div className="w-5 h-5 rounded-full bg-fuchsia-600 dark:bg-rose-500 ring-4 ring-white dark:ring-gray-900 z-10 transition-transform group-hover:scale-125"></div>
                                    {index < arr.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                                    )}
                                </div>
                                <div className="pb-12 pt-0.5 w-full">
                                    <span className="text-sm font-semibold uppercase tracking-wider text-fuchsia-500 dark:text-rose-400">{item.year}</span>
                                    <h3 className="text-2xl font-extrabold mt-1 text-gray-900 dark:text-gray-100">{item.title}</h3>
                                    <p className="muted mt-2 max-w-lg">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* -------------------- 11. Final CTA Footer (REDESIGNED) -------------------- */}
            {/* NEW: Use a more dramatic, multi-gradient background with a dynamic clip-path for a "launch" effect. */}
            <div 
                ref={finalCtaRef}
                className={`w-full relative py-24 mt-16 text-white overflow-hidden shadow-2xl ${ANIMATION_CLASSES} duration-700 ${finalCtaClasses} `}
                // Custom style for the angular top edge
                style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0% 100%)' }}
            >
                {/* Background Layer 1: The main, subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-purple-800 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 hover:from-indigo-800 hover:to-purple-900"></div>
                
                {/* Background Layer 2: A subtle radial glow from the center */}
                <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>

                <section className="relative z-10 container text-center pt-8">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Let's Build Your Scalable Future.
                    </h2>
                    <p className="text-xl mb-12 opacity-90 max-w-4xl mx-auto font-light">
                        Stop managing complexity—start leading innovation. Schedule a call to turn your ambitious product vision into a scalable, high-performance reality.
                    </p>
                    {/* Primary Button remains inverted for high contrast */}
                    <a 
                        href="/contact" 
                        className="btn-primary !bg-white !text-indigo-700 hover:!bg-gray-100 shadow-2xl text-xl px-12 py-5 font-bold transform hover:scale-[1.05] transition-transform"
                    >
                        <i className="fas fa-calendar-check mr-3"></i> Schedule Discovery Call Today
                    </a>
                </section>
            </div>

            {/* Custom Styles (UPDATED: Added bg-radial-glow class for final CTA) */}
            <style jsx="true">{`
                .animate-pulse-slow {
                    animation: slow-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .bg-radial-glow {
                    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                }
                .dark .bg-radial-glow {
                    background: radial-gradient(circle at center, rgba(160, 0, 255, 0.15) 0%, transparent 70%);
                }
                @keyframes slow-pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.9; }
                }
                
                /* Custom utility classes based on your global theme (No change) */
                .text-brand {
                    color: theme('colors.fuchsia.600');
                }
                .dark .text-brand {
                    color: theme('colors.rose.400');
                }
            `}</style>

        </div>
    );
}