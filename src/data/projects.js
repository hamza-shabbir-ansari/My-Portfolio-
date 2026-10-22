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
    // TODO: Update tagline, description and project details below
    tagline: "Autonomous Agent Orchestrator for Real-Time Operations",
    description: "An orchestration platform designed to replace fragile setups with stateful multi-agent workflows. Teams can launch autonomous AI teams that execute, debug, and monitor complex pipelines.",
    role: "Founder & Lead AI Engineer",
    tech: ["LangGraph", "CrewAI", "FastAPI", "React", "ChromaDB", "Claude", "Docker"],
    year: "2025",
    status: "Startup MVP",
    liveUrl: "https://example.com/sparkx",
    repoUrl: "https://github.com/example/sparkx",
    cover: "/images/project-omniflow-cover.svg",
    poster: "/images/project-omniflow-poster.svg",
    video: "/videos/project-omniflow.mp4",
    // Special Flagship Attributes (TODO: Customize for SparkX)
    problem: "Modern operations suffer from fragmented tool stacks, repetitive manual handoffs, and fragile setups that fail silently when edge conditions arise.",
    solution: "A self-healing multi-agent control center using LangGraph state machines and role-playing agents to plan, inspect, and execute operational workflows.",
    highlights: [
      "Stateful directed acyclic graph execution with memory checkpointing",
      "Human in the loop approval gates for high security actions",
      "Real-time WebSocket telemetry with sub-80ms status dispatch",
      "Direct token routing between model providers"
    ],
    metrics: [
      { label: "Execution Speed", value: "3.8x faster" },
      { label: "Autonomous Tasks", value: "12,000+" },
      { label: "Workflow Reliability", value: "99.4%" },
      { label: "Token Efficiency", value: "42% saved" }
    ]
  },
  {
    id: "draftly-ai",
    featured: false,
    // Project 2: Draftly.AI
    title: "Draftly.AI",
    // TODO: Update tagline, description and project details below
    tagline: "Contextual AI writing and document intelligence system",
    description: "An AI-powered content and document generation application providing verified citations, tone customization, and rapid drafting workflows.",
    role: "AI Engineer & Full-Stack Developer",
    tech: ["Python", "FastAPI", "OpenAI", "React", "Tailwind CSS"],
    year: "2025",
    status: "Production Ready",
    liveUrl: "https://example.com/draftly",
    repoUrl: "https://github.com/example/draftly-ai",
    cover: "/images/project-cognitive-cover.svg",
    poster: "/images/project-cognitive-poster.svg",
    video: "/videos/project-cognitive.mp4"
  },
  {
    id: "nextora-ai",
    featured: false,
    // Project 3: NextOra.AI
    title: "NextOra.AI",
    // TODO: Update tagline, description and project details below
    tagline: "Intelligent workflow automation and conversational agent platform",
    description: "An event-driven automation middleware aggregating SaaS webhooks, routing payloads and orchestrating multi-step AI tasks.",
    role: "Full-Stack Automation Engineer",
    tech: ["Node.js", "n8n", "LangChain", "TypeScript", "Tailwind CSS"],
    year: "2025",
    status: "Deployed to Production",
    liveUrl: "https://example.com/nextora",
    repoUrl: "https://github.com/example/nextora-ai",
    cover: "/images/project-flowpulse-cover.svg",
    poster: "/images/project-flowpulse-poster.svg",
    video: "/videos/project-flowpulse.mp4"
  },
  {
    id: "riwayat",
    featured: false,
    // Project 4: Riwayat
    title: "Riwayat",
    // TODO: Update tagline, description and project details below
    tagline: "Cultural archive and multimedia digital storytelling platform",
    description: "A full-stack web platform built for archival preservation, rich cultural narratives and high-performance digital content exploration.",
    role: "Full-Stack Developer",
    tech: ["Next.js", "Laravel", "PHP", "PostgreSQL", "Tailwind CSS"],
    year: "2024",
    status: "Client Deployed",
    liveUrl: "https://example.com/riwayat",
    repoUrl: "https://github.com/example/riwayat",
    cover: "/images/project-apex-cover.svg",
    poster: "/images/project-apex-poster.svg",
    video: "/videos/project-apex.mp4"
  }
];

export default projectsData;
