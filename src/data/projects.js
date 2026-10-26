/**
 * ============================================================================
 * PROJECTS DATA
 * ============================================================================
 * Order of projects:
 * 1. SparkX (Flagship, Startup MVP)
 * 2. Draftly.AI
 * 3. NextOra.AI
 * 4. Riwayat
 * 
 * TODO: Hamza will fill in detailed descriptions, tech stacks, live links,
 * repo links, problem/solution statements and metrics for each project.
 * ============================================================================
 */

export const projectsData = [
  {
    id: "sparkx",
    featured: true,
    // Project 1: Flagship Startup MVP
    title: "SparkX",
    tagline: "AI-Powered Storefront Builder with Virtual Model Try-On & Catalog Support",
    description: "An e-commerce platform created for independent fashion brands and online merchants. SparkX combines visual and prompt-driven storefront design with an AI virtual photoshoot studio and an inventory-aware customer assistant.",
    role: "Founder & Full-Stack AI Engineer",
    tech: ["PHP", "MySQL", "JavaScript", "GSAP", "OpenRouter AI", "Diffusion Models", "Sortable.js"],
    year: "2025",
    status: "Startup MVP",
    liveUrl: "https://www.linkedin.com/in/hamzashabbiransari/",
    repoUrl: "https://github.com/hamza-shabbir-ansari",
    cover: "/images/project-sparkx-cover.svg",
    poster: "/images/project-sparkx-poster.svg",
    video: "", // Video demo will be added later; cover SVG displays cleanly
    // Flagship Startup MVP Attributes
    problem: "Independent fashion sellers face three major roadblocks: high development costs or rigid templates, heavy production expenses for human models and studio photoshoots, and lost sales from delayed customer support.",
    solution: "SparkX brings storefront creation, virtual model photography, and 24/7 customer care into a unified dashboard—pairing a 3-mode visual builder with AI virtual try-on and live catalog intelligence.",
    highlights: [
      "3-in-1 store builder: Visual drag-and-drop, natural language AI prompts, and raw code editing",
      "Virtual try-on studio: Transforms flat garment uploads into on-model fashion imagery via diffusion models",
      "Store-aware AI assistant: Uses dynamic catalog retrieval to answer shopper inquiries with live stock and pricing",
      "Multi-model failover: Automated backend fallback ensures round-the-clock chatbot availability"
    ],
    metrics: [
      { label: "Store Creation", value: "3 Modes" },
      { label: "Photoshoot Cost", value: "Zero Studio" },
      { label: "Shopper Support", value: "24/7 Live RAG" },
      { label: "Product Stage", value: "Active MVP" }
    ]
  },
  {
    id: "draftly-ai",
    featured: false,
    // Project 2: Draftly.Ai
    title: "Draftly.Ai",
    tagline: "Autonomous Multi-Agent Content Engine for LinkedIn Posts & Twitter Threads",
    description: "An autonomous AI content generation platform powered by Next.js, FastAPI, and CrewAI. It orchestrates a sequential three-agent pipeline—Researcher, Writer, and Editor—to convert raw topics into publication-ready LinkedIn posts and 5-tweet threads with automated tone calibration and one-click copy utilities.",
    role: "Full-Stack AI Engineer & System Architect",
    tech: ["Next.js", "Python", "FastAPI", "CrewAI", "Google Gemini", "TypeScript", "Tailwind CSS"],
    year: "2025",
    status: "Production Ready",
    liveUrl: "https://www.linkedin.com/in/hamzashabbiransari/",
    repoUrl: "https://github.com/hamza-shabbir-ansari/Draftly.Ai",
    cover: "/images/project-draftly-cover.svg",
    poster: "/images/project-draftly-poster.svg",
    video: "", // Video demo will be added later; cover SVG displays cleanly
    problem: "Creating consistent, platform-native content across LinkedIn and Twitter is tedious. Simple single-prompt LLM wrappers produce generic, unstructured text that ignores strict character limits, hashtag strategies, and tone nuances, requiring heavy manual rewriting.",
    solution: "Draftly architectures a three-step assembly line using specialized CrewAI agents. Instead of one model doing everything at once, separate Researcher, Writer, and Editor agents collaborate sequentially—producing verified, platform-ready copy with automated hashtag generation.",
    highlights: [
      "Three-agent sequential pipeline separating research, drafting, and editorial review",
      "Automated generation of 5-hashtag LinkedIn posts and numbered 5-tweet Twitter threads",
      "Configurable tone calibration for professional, conversational, and inspirational styles",
      "Case-insensitive regex parsing engine with async ThreadPoolExecutor latency control"
    ],
    metrics: [
      { label: "Agent Pipeline", value: "3 Agents" },
      { label: "Deliverables", value: "Post + Thread" },
      { label: "LLM Engine", value: "Gemini 1.5" },
      { label: "Test Suite", value: "100% Pytest" }
    ]
  },
  {
    id: "nextora-ai",
    featured: false,
    // Project 3: NextOra.AI
    title: "NextOra.AI",
    tagline: "ML-Powered Career Guidance Engine & Interactive Roadmap Navigator",
    description: "An intelligent career discovery platform powered by Python Flask and scikit-learn. NextOra predicts personalized career paths across 59 domains using a Multinomial Naive Bayes NLP model, delivering 177 structured curriculum roadmaps, 3-tier project blueprints, and direct links to active enterprise job openings.",
    role: "Full-Stack Developer & Machine Learning Engineer",
    tech: ["Python", "Flask", "scikit-learn", "JavaScript", "HTML5 Canvas", "GSAP", "TF-IDF"],
    year: "2025",
    status: "Production Ready",
    liveUrl: "https://www.linkedin.com/in/hamzashabbiransari/",
    repoUrl: "https://github.com/hamza-shabbir-ansari/NextOra.AI-Career-Guide",
    cover: "/images/project-nextora-cover.svg",
    poster: "/images/project-nextora-poster.svg",
    video: "", // Video demo will be added later; cover SVG displays cleanly
    problem: "Students and career switchers struggle to find clear direction and structured learning paths. Scattered online tutorials lack practical project blueprints, sequential curriculum roadmaps, and direct connections to hiring tech companies.",
    solution: "NextOra.AI unites career prediction, curriculum roadmaps, and job discovery into a single stateless platform—coupling a trained TF-IDF Naive Bayes text classifier with 177 career sub-pages, 3-tier project specifications, and live opportunity directories.",
    highlights: [
      "Machine learning career evaluation: Trained Multinomial Naive Bayes classifier evaluating profiles across 59 career tracks",
      "177 dedicated curriculum guides: Comprehensive step-by-step roadmaps, tiered project blueprints, and video tutorials",
      "Interactive AI Navigator: High-speed, zero-latency client-side career exploration with instant category filtering",
      "Futuristic dark interface: Native HTML5 Canvas particle system integrated with GSAP ScrollTrigger animations"
    ],
    metrics: [
      { label: "Career Tracks", value: "59 Domains" },
      { label: "Curriculum Pages", value: "177 Guides" },
      { label: "ML Classifier", value: "Naive Bayes" },
      { label: "Client Latency", value: "0ms Instant" }
    ]
  },
  {
    id: "riwayat",
    featured: false,
    // Project 4: Riwayat
    title: "Riwayat",
    tagline: "Full-Stack Vintage E-Commerce Platform with Multi-Role Portals & Cheque Verification",
    description: "A bespoke full-stack e-commerce application engineered for antique collectors and vintage specialty goods. Riwayat pairs an interactive customer storefront with multi-role administrative portals, supporting dual-angle specification displays, atomic checkout transactions, offline bank cheque verification, and automated low-stock threshold monitoring.",
    role: "Full-Stack Developer & Database Architect",
    tech: ["PHP 8.2", "MySQL", "JavaScript", "GSAP", "CSS Glassmorphism", "PDO Transactions", "REST API"],
    year: "2024",
    status: "Client Deployed",
    liveUrl: "https://www.linkedin.com/in/hamzashabbiransari/",
    repoUrl: "https://github.com/hamza-shabbir-ansari",
    cover: "/images/project-riwayat-cover.svg",
    poster: "/images/project-riwayat-poster.svg",
    video: "", // Video demo will be added later; cover SVG displays cleanly
    problem: "Generic e-commerce platforms treat rare vintage items like standard commodities, lacking dual-angle previews, material details, and usage condition specs. Furthermore, antique dealers frequently process offline bank cheques without integrated verification workflows or role-isolated employee processing portals.",
    solution: "Riwayat unifies catalog curation with specialized payment workflows: dual-perspective product detail pages, an atomic checkout pipeline supporting uploaded cheque validation, and role-based panels allowing staff to handle order lifecycles and returns without exposing system configurations.",
    highlights: [
      "Atomic checkout architecture: Wrapped in PDO transactions with automated rollback to prevent orphaned records",
      "Specialized cheque verification: Customer cheque upload pipeline with admin review and approval status controls",
      "Three-tier role-based access: Secure PHP sessions separating customer, employee fulfillment, and admin operations",
      "Automated inventory telemetry: Real-time low-stock threshold monitoring and composite structured order tracking"
    ],
    metrics: [
      { label: "User Roles", value: "3 Portals" },
      { label: "Transaction Safety", value: "Atomic PDO" },
      { label: "Catalog Engine", value: "Dual-Angle" },
      { label: "Payment Verification", value: "Cheque + Card" }
    ]
  }
];

export default projectsData;
