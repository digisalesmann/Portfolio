// data/blogContent.js
import { BarChart3, Brain, Compass, ShieldCheck, Zap, Cpu, Globe, Heart, Lightbulb } from "lucide-react";

export const blogMetadata = {
    title: "The Future of Intelligence",
    author: "Chinagoro Victor",
    authorImage: "/images/kenny.jpg",
    timestamp: "Oct 22, 2025",
    readTime: "08 MIN",
    reportId: "Analysis_Report_v.2026",
    videoUrl: "/infographics/boy.mp4"
};

export const sectionsContent = {
    intro: {
        title: "The Next Era of Intelligence",
        content: "Artificial Intelligence has moved beyond labs and research centers. It now powers everyday tools, from health monitoring to predictive logistics. We are no longer just using machines; we are entering the era of the augmented human, where biological creativity meets synthetic speed."
    },
    core: [
        { 
            icon: BarChart3, 
            title: "Data Logic", 
            desc: "Decision making based on high-density data processing and real-time algorithmic refinement." 
        },
        { 
            icon: Brain, 
            title: "Neural Mesh", 
            desc: "Complex learning layers simulating human cognition to solve non-linear problems." 
        },
        { 
            icon: Compass, 
            title: "Ethics Layer", 
            desc: "Hard-coded transparency and fairness protocols to ensure AI remains a force for human good." 
        }
    ],
    timeline: [
        { y: "1950", t: "CONCEPTUAL BIRTH", d: "Alan Turing and the Dartmouth workshop establish the foundations of machine logic." },
        { y: "1980", t: "SYSTEM WINTER", d: "Technical limitations lead to reduced funding and a shift toward niche industrial applications." },
        { y: "2010", t: "BIG DATA SURGE", d: "The explosion of cloud computing and GPU power allows deep learning to go mainstream." },
        { y: "2025+", t: "THE ZENITH", d: "Universal integration across healthcare, finance, and global coordination protocols." }
    ],
    comparison: {
        ai: [
            "Computational Speed: Executing millions of calculations in milliseconds.",
            "Pattern Recognition: Spotting trends in datasets too vast for human eyes.",
            "Scalability: Operating 24/7 without fatigue across global timezones."
        ],
        human: [
            "Creative Insight: Generating novel ideas outside of existing datasets.",
            "Emotional Intelligence: Navigating nuanced social and moral dilemmas.",
            "Ethical Judgment: Applying value systems that code cannot fully replicate."
        ]
    },
    insights: [
        { 
            icon: Zap, 
            text: "AI adoption is shifting from a 'nice-to-have' novelty to a core survival strategy for global industries." 
        },
        { 
            icon: ShieldCheck, 
            text: "The 'Black Box' problem is being solved by Explainable AI (XAI), ensuring humans understand why machines make specific choices." 
        },
        { 
            icon: Globe, 
            text: "The future is Decentralized Intelligence, where AI models live on the edge to protect user privacy." 
        }
    ],
    faq: [
        { 
            q: "Will AI replace high-level professional roles?", 
            a: "AI acts as a co-pilot. While it automates tasks, it increases the demand for 'System Orchestrators'—humans who can direct AI toward complex goals." 
        },
        { 
            q: "How secure is the data used to train these models?", 
            a: "Modern industrial AI utilizes Federated Learning, meaning your sensitive data never leaves your device during the training process." 
        },
        { 
            q: "What is the environmental cost of massive AI systems?", 
            a: "The industry is moving toward 'Small Language Models' (SLMs) and green data centers to reduce the carbon footprint of intelligence." 
        }
    ],
    related: [
        {
            title: "Building BitVest",
            excerpt: "How we integrated AI into financial asset management for real-time security.",
            image: "/images/bitvest-web.png",
            link: "#"
        },
        {
            title: "Actora Protocols",
            excerpt: "Using reputation algorithms to verify human effort in decentralized networks.",
            image: "/images/actora.png",
            link: "#"
        }
    ]
};
