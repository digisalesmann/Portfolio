export const allProjects = [
  {
    title: "Bitvest Web",
    slug: "bitvest-web",
    category: "Web",
    tags: "Fintech · React · Next.js",
    excerpt: "Financial investment platform with real-time portfolio tracking, analytics dashboards, and secure payment flows.",
    image: "/images/bitvest.jpeg",
    link: "https://bitvestapp.com/",
    year: "2025",
    duration: "6 weeks",
    role: "Full-Stack Developer",
    overview:
      "BitVest is a web-based investment platform that lets users track portfolios, monitor market data in real time, and execute secure payment flows. The client needed a product that felt premium, loaded fast, and could scale with a growing user base.",
    challenge:
      "Handling live financial data without overwhelming the UI was the core challenge, users needed clarity, not noise. The platform also required a robust auth system and a payment gateway integration that met compliance standards.",
    solution:
      "Built on Next.js for server-side rendering and fast initial loads. Firebase Realtime Database powers live portfolio updates. Stripe handles deposits and withdrawals. A custom charting layer built on Recharts matches the dark brand aesthetic.",
    results: [
      "500+ registered users within the first month of launch",
      "Sub-1.8s average page load on mobile",
      "Zero critical security incidents post-launch",
    ],
    techStack: [
      { name: "Next.js",    src: "/logos/nextjs-original.svg" },
      { name: "React",      src: "/logos/reactnative-original.svg" },
      { name: "Firebase",   src: "/logos/firebase-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Tailwind",   src: "/logos/tailwindcss-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
    ],
    features: [
      { num: "01", title: "Real-Time Portfolio",  desc: "Live portfolio values and market prices updating every 5 seconds via Firebase Realtime Database." },
      { num: "02", title: "Analytics Dashboard",  desc: "Custom charts showing performance trends, allocation breakdown, and gain/loss over time." },
      { num: "03", title: "Secure Payments",      desc: "Stripe-powered deposits and withdrawals with a full audit trail and fraud detection layer." },
      { num: "04", title: "Auth & Permissions",   desc: "Multi-role authentication with email verification and 2FA support out of the box." },
    ],
  },
  {
    title: "Actora Labs",
    slug: "actora-labs",
    category: "Web",
    tags: "Web3 · React · Community",
    excerpt: "Coordination platform for Web3 communities, governance, task management, and on-chain contributor rewards.",
    image: "/images/actoraa.png",
    link: "https://actoralabs.com/",
    year: "2025",
    duration: "12 weeks",
    role: "Full-Stack Developer",
    overview:
      "Actora Labs is a coordination and governance platform for Web3 communities. It enables DAOs and community-run projects to manage tasks, vote on proposals, and automatically distribute rewards to contributors, all in one place.",
    challenge:
      "Web3 communities were coordinating via Discord threads and spreadsheets, fragile, opaque, and impossible to scale. They needed an on-chain-native platform that felt as polished as a Web2 SaaS product.",
    solution:
      "React frontend with wallet-based authentication via wagmi. Smart contract integration for on-chain voting and reward distribution. Supabase for off-chain task and community data with real-time subscriptions for live updates.",
    results: [
      "Used by 5 Web3 communities with 200+ combined members",
      "Reduced coordination overhead by an estimated 70%",
      "On-chain reward distribution with zero manual intervention",
    ],
    techStack: [
      { name: "React",      src: "/logos/reactnative-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Supabase",   src: "/logos/supabase-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
    ],
    features: [
      { num: "01", title: "Task Management",     desc: "Assign, track, and verify community tasks with on-chain completion proofs." },
      { num: "02", title: "Governance Voting",   desc: "On-chain proposal voting with quorum rules and time-locked execution." },
      { num: "03", title: "Contributor Rewards", desc: "Automated token distribution based on verified task completion, no admin required." },
      { num: "04", title: "Community Dashboard", desc: "Real-time view of activity, open tasks, and a contributor leaderboard." },
    ],
  },
  {
    title: "MediLab",
    slug: "medilab",
    category: "Web",
    tags: "Healthcare · Next.js · Firebase",
    excerpt: "Pharmacy inventory and diagnostic automation platform for clinics and labs.",
    image: "/images/testt.png",
    link: "https://medilab-kappa.vercel.app/",
    year: "2025",
    duration: "8 weeks",
    role: "Full-Stack Developer",
    overview:
      "MediLab is a web platform for pharmacies and diagnostic labs to automate inventory tracking, reduce manual errors, and streamline patient record management. Designed for clinic staff with minimal technical training.",
    challenge:
      "Manual inventory systems were causing stock-outs, expired stock slip-throughs, and hours of reconciliation every week. The client needed a tool that non-technical staff could use without any formal training.",
    solution:
      "Next.js with Firebase as the backend. A clean, low-cognitive-load UI focused on speed of use. Barcode scanning via browser APIs. Real-time low-stock alerts via Firebase Cloud Messaging.",
    results: [
      "60% reduction in inventory-related errors within 30 days",
      "Adopted by clinic staff with zero formal training sessions",
      "Handles 200+ SKUs with real-time tracking",
    ],
    techStack: [
      { name: "Next.js",  src: "/logos/nextjs-original.svg" },
      { name: "Firebase", src: "/logos/firebase-original.svg" },
      { name: "React",    src: "/logos/reactnative-original.svg" },
      { name: "Tailwind", src: "/logos/tailwindcss-original.svg" },
    ],
    features: [
      { num: "01", title: "Inventory Tracking", desc: "Real-time stock levels with automated low-stock alerts and expiry date monitoring." },
      { num: "02", title: "Diagnostic Records", desc: "Patient diagnostic history stored securely and accessible by authorized staff only." },
      { num: "03", title: "Barcode Support",    desc: "Scan product barcodes via browser camera for fast stock entry and lookup." },
      { num: "04", title: "Reporting",          desc: "Daily and monthly inventory reports exportable to PDF." },
    ],
  },
  {
    title: "MonadGuard",
    slug: "monadguard",
    category: "Web",
    tags: "Web3 · Security · React",
    excerpt: "On-chain Sybil detection and wallet analysis tool for the Monad ecosystem.",
    image: "/images/gg.png",
    link: "https://monadguard-cv2w.vercel.app/",
    year: "2025",
    duration: "5 weeks",
    role: "Frontend Developer",
    overview:
      "MonadGuard is a security tool built for the Monad blockchain ecosystem. It analyzes wallet behavior to detect Sybil attacks, where a single actor operates many wallets to game airdrop campaigns or governance votes.",
    challenge:
      "Web3 projects were losing significant value to Sybil farmers. Teams needed a fast, reliable way to score wallets and flag suspicious activity without requiring deep on-chain data expertise.",
    solution:
      "React frontend consuming on-chain data via Monad RPC nodes. A Node.js scoring engine analyzes transaction patterns, contract interactions, and timing heuristics. Results are cached and surfaced in an interactive dashboard.",
    results: [
      "Wallet analysis completed in under 3 seconds per address",
      "Adopted by 3 Web3 projects for pre-airdrop screening",
      "Flagged 12%+ of tested wallets as likely Sybil accounts",
    ],
    techStack: [
      { name: "React",      src: "/logos/reactnative-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
      { name: "Tailwind",   src: "/logos/tailwindcss-original.svg" },
    ],
    features: [
      { num: "01", title: "Sybil Scoring",    desc: "Each wallet receives a 0-100 risk score based on behavioral analysis across 12 on-chain signals." },
      { num: "02", title: "Wallet Graph",     desc: "Visual graph of wallet-to-wallet connections to surface clusters of related accounts." },
      { num: "03", title: "Batch Analysis",   desc: "Upload a CSV of wallet addresses for bulk scoring, ideal for airdrop vetting at scale." },
      { num: "04", title: "Export Reports",   desc: "Download a full analysis report per wallet or batch for internal team review." },
    ],
  },
  {
    title: "Ace Experience",
    slug: "ace-experience",
    category: "Web",
    tags: "F&B · Next.js · Tailwind",
    excerpt: "Premium culinary platform connecting professional chefs to high-end clientele.",
    image: "/images/ace.png",
    link: "https://ace-xperience.vercel.app/",
    year: "2025",
    duration: "4 weeks",
    role: "Frontend Developer",
    overview:
      "Ace Experience is a luxury culinary platform connecting private chefs with high-end clients for bespoke dining events, private dinners, and catering. The brand required a premium editorial aesthetic that matched the exclusivity of the service.",
    challenge:
      "The client needed a platform that felt like a Michelin-starred restaurant website, not a generic marketplace. It had to attract affluent clients and make chefs look world-class, while still converting visitors into booking inquiries.",
    solution:
      "Next.js for performance and SEO. Custom editorial design with full-bleed photography and refined typography. Framer Motion for smooth transitions. Chef profiles, menu showcases, and a multi-step inquiry booking flow.",
    results: [
      "30+ chef profiles onboarded at launch",
      "Booking inquiries up 40% vs. previous static site",
      "98 Lighthouse performance score on desktop",
    ],
    techStack: [
      { name: "Next.js",    src: "/logos/nextjs-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Tailwind",   src: "/logos/tailwindcss-original.svg" },
    ],
    features: [
      { num: "01", title: "Chef Profiles",  desc: "Rich profile pages with bio, cuisine specialty, gallery, and social links." },
      { num: "02", title: "Menu Showcase",  desc: "Beautiful menu presentation with dish photography and dietary filters." },
      { num: "03", title: "Booking Flow",   desc: "Multi-step inquiry form collecting event details, date, guest count, and preferences." },
      { num: "04", title: "SEO Optimized",  desc: "Structured data, og tags, and per-page meta for local and national search visibility." },
    ],
  },
  {
    title: "Indstr",
    slug: "indstr",
    category: "Web",
    tags: "DeFi · NFT · React",
    excerpt: "Decentralized finance and NFT marketplace with a sleek unified trading interface.",
    image: "/images/indstr.png",
    link: "#",
    year: "2025",
    duration: "7 weeks",
    role: "Frontend Developer",
    overview:
      "Indstr combines DeFi token trading with an NFT marketplace in a single, unified interface. Designed for experienced Web3 users who expect speed, clarity, and professional-grade tooling from a product.",
    challenge:
      "Most DeFi interfaces are cluttered and intimidating. Indstr needed to stand out with a clean aesthetic, powerful features behind a minimal UI, while handling real-time on-chain data reliably.",
    solution:
      "React with custom trading components. Web3 wallet integration via wagmi and viem. Real-time price feeds from on-chain oracles. An NFT display and bidding system built from scratch without heavy dependencies.",
    results: [
      "Interface praised for clarity in early user testing sessions",
      "Live trading and NFT listing features shipped on schedule",
      "Sub-200ms UI response time on all trading interactions",
    ],
    techStack: [
      { name: "React",      src: "/logos/reactnative-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
      { name: "Tailwind",   src: "/logos/tailwindcss-original.svg" },
    ],
    features: [
      { num: "01", title: "Token Trading",   desc: "Swap tokens with live price impact calculation, slippage control, and gas estimation." },
      { num: "02", title: "NFT Marketplace", desc: "List, discover, and bid on NFTs with rarity traits and full ownership history." },
      { num: "03", title: "Portfolio View",  desc: "Unified view of all token holdings and NFT assets across connected wallets." },
      { num: "04", title: "Analytics",       desc: "Historical price charts and trading volume per asset over custom time ranges." },
    ],
  },
  {
    title: "Koraq",
    slug: "koraq",
    category: "App",
    tags: "AI · Flutter · SME",
    excerpt: "AI-powered business assistant for SMEs, automates reporting, insights, and client communication.",
    image: "/images/koraq.png",
    link: "https://play.google.com/store/apps/details?id=com.koraq.app.koraq",
    year: "2026",
    duration: "10 weeks",
    role: "Mobile Developer",
    overview:
      "Koraq is an Android app that acts as an intelligent business assistant for small and medium enterprises. Available on Google Play, it automates routine reporting, surfaces key insights, and handles client follow-ups, giving owners hours back every week.",
    challenge:
      "SME owners wear too many hats. The challenge was building an AI assistant that felt genuinely useful, one that could ingest messy business data and return clean, actionable output without requiring any technical skill from the user.",
    solution:
      "Flutter with Dart for a high-performance Android experience. GPT-4 API handles natural language report generation and insights. Supabase stores business data. Push notifications drive automated reminders and follow-up prompts.",
    results: [
      "Saves business owners 5+ hours per week on average",
      "Live on Google Play with a polished native Android experience",
      "AI report generation under 4 seconds end-to-end",
    ],
    techStack: [
      { name: "Flutter",    src: "/logos/flutter-original.svg" },
      { name: "Dart",       src: "/logos/dart-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Supabase",   src: "/logos/supabase-original.svg" },
      { name: "Python",     src: "/logos/python-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
    ],
    features: [
      { num: "01", title: "AI Report Generation", desc: "Ask Koraq for a weekly summary or monthly revenue breakdown, answered in plain English." },
      { num: "02", title: "Client Comms",          desc: "AI-drafted follow-up messages reviewed and sent by the business owner in one tap." },
      { num: "03", title: "Business Metrics",      desc: "Dashboard tracking revenue, expenses, client activity, and growth KPIs." },
      { num: "04", title: "Native Android",        desc: "Built with Flutter for a smooth, performant experience on Android devices." },
    ],
  },
  {
    title: "Bitvest App",
    slug: "bitvest-app",
    category: "App",
    tags: "Fintech · Flutter · Mobile",
    excerpt: "Mobile investment app with biometric auth, portfolio management, and real-time market data.",
    image: "/images/bitvest.jpeg",
    link: "#",
    year: "2025",
    duration: "8 weeks",
    role: "Mobile Developer",
    overview:
      "The BitVest mobile app brings the full investment platform experience to Android. Users can monitor portfolios, execute transactions, and receive market alerts, with enterprise-grade security baked in from day one.",
    challenge:
      "Translating a data-rich web platform to mobile without losing information density or usability. Security was non-negotiable: biometric authentication and encrypted local storage were hard requirements from the start.",
    solution:
      "Flutter with Dart for a high-performance Android build. Biometric auth via flutter_local_auth. Efficient data fetching and seamless background sync. Custom chart components optimized for touch interaction and small screens.",
    results: [
      "Full feature parity with the web platform in a native Android build",
      "Biometric auth works across fingerprint devices",
      "Background sync keeps portfolio data fresh without noticeable battery drain",
    ],
    techStack: [
      { name: "Flutter",    src: "/logos/flutter-original.svg" },
      { name: "Dart",       src: "/logos/dart-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
      { name: "Firebase",   src: "/logos/firebase-original.svg" },
    ],
    features: [
      { num: "01", title: "Biometric Auth",      desc: "Face ID and fingerprint login with a fallback PIN for unsupported devices." },
      { num: "02", title: "Live Market Data",    desc: "Real-time asset prices and portfolio valuation updated every 30 seconds." },
      { num: "03", title: "Push Alerts",         desc: "Price movement and portfolio milestone notifications delivered instantly." },
      { num: "04", title: "In-App Transactions", desc: "Deposit, withdraw, and transfer within the app with clear confirmation flows." },
    ],
  },
  {
    title: "PPAY",
    slug: "ppay",
    category: "App",
    tags: "Payments · Flutter · Cross-Platform",
    excerpt: "Digital payments ecosystem for seamless peer-to-peer transfers and merchant payments.",
    image: "/images/ppay.png",
    link: "#",
    year: "2026",
    duration: "10 weeks",
    role: "Full-Stack Mobile Developer",
    overview:
      "PPAY is a digital payments app targeting peer-to-peer transfers and merchant point-of-sale use cases across Africa. The goal was a payments experience as smooth as Cash App, localized for the African market and optimized for low-bandwidth networks.",
    challenge:
      "Payments apps require handling regulatory compliance, edge-case failure modes, and network latency, all without breaking UX. Trust signals and perceived security were critical to user adoption.",
    solution:
      "Flutter with Dart for a polished, performant mobile build. Flutterwave for payment processing. An offline-capable transaction queue that syncs when connectivity returns. End-to-end transaction encryption.",
    results: [
      "P2P transfers complete in under 3 seconds on average",
      "Works on 2G/3G with offline transaction queuing",
      "Onboarding to first transaction in under 2 minutes",
    ],
    techStack: [
      { name: "Flutter",    src: "/logos/flutter-original.svg" },
      { name: "Dart",       src: "/logos/dart-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
      { name: "PostgreSQL", src: "/logos/postgresql-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
    ],
    features: [
      { num: "01", title: "P2P Transfers",       desc: "Send money to contacts instantly using just a phone number or username." },
      { num: "02", title: "Merchant Payments",   desc: "QR-code based merchant payments with a built-in sales dashboard." },
      { num: "03", title: "Offline Queue",       desc: "Transactions queue locally and execute automatically when connectivity returns." },
      { num: "04", title: "Transaction History", desc: "Full history with receipts, status tracking, and one-tap dispute initiation." },
    ],
  },
  {
    title: "Velau",
    slug: "velau",
    category: "App",
    tags: "Trading · Automation · Flutter",
    excerpt: "Automated gold trading engine with algorithmic strategies and live portfolio dashboards.",
    image: "/images/velau.png",
    link: "#",
    year: "2026",
    duration: "9 weeks",
    role: "Mobile Developer",
    overview:
      "Velau is an automated trading app focused on gold commodities. Users set algorithmic strategies that execute automatically on market conditions, making active trading accessible to people without a trading background.",
    challenge:
      "Algorithmic trading requires precise execution and clear feedback. The app had to make complex strategy configuration feel simple, while the backend had to ingest market data and execute trades with low latency and no downtime.",
    solution:
      "Flutter frontend with Dart, featuring a visual strategy builder built around simple if-then logic. Python backend for market data ingestion and trade execution. Real-time portfolio PnL via WebSocket connections.",
    results: [
      "Strategy builder usable by non-technical traders within 10 minutes",
      "Average trade execution latency under 500ms",
      "Live portfolio PnL updates in real time via WebSocket",
    ],
    techStack: [
      { name: "Flutter",    src: "/logos/flutter-original.svg" },
      { name: "Dart",       src: "/logos/dart-original.svg" },
      { name: "Python",     src: "/logos/python-original.svg" },
      { name: "Node.js",    src: "/logos/nodejs-original.svg" },
      { name: "TypeScript", src: "/logos/typescript-original.svg" },
    ],
    features: [
      { num: "01", title: "Strategy Builder",    desc: "Visual if-then logic builder for creating custom automated trading rules without code." },
      { num: "02", title: "Live Execution",      desc: "Strategies execute automatically 24/7 without any manual intervention." },
      { num: "03", title: "Portfolio Dashboard", desc: "Real-time PnL, open positions, and historical performance with drawdown metrics." },
      { num: "04", title: "Risk Controls",       desc: "Stop-loss, take-profit, and daily drawdown limits configurable per strategy." },
    ],
  },
];
