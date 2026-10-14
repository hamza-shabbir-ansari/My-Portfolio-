/**
 * ============================================================================
 * PROJECTS DATA & MEDIA DIRECTORY GUIDE
 * ============================================================================
 * Place real images and video files in the following folders:
 * 
 * 1. IMAGES & POSTERS: public/images/
 *    - Project 1 Flagship Cover:  public/images/project-omniflow-cover.svg (or .png / .webp)
 *    - Project 1 Video Poster:    public/images/project-omniflow-poster.svg
 *    - Project 2 Cover & Poster:  public/images/project-cognitive-cover.svg / poster
 *    - Project 3 Cover & Poster:  public/images/project-flowpulse-cover.svg / poster
 *    - Project 4 Cover & Poster:  public/images/project-apex-cover.svg / poster
 * 
 * 2. SHOWCASE VIDEOS: public/videos/
 *    - Project 1 Video: public/videos/project-omniflow.mp4
 *    - Project 2 Video: public/videos/project-cognitive.mp4
 *    - Project 3 Video: public/videos/project-flowpulse.mp4
 *    - Project 4 Video: public/videos/project-apex.mp4
 * 
 * Recommended video format: H.264 MP4, 1080p or 720p, 24-30fps, compressed for web.
 * If a video file is absent, the player gracefully falls back to the cover image.
 * ============================================================================
 */

export const projectsData = [
  {
    id: "omniflow-ai",
    featured: true,
    title: "OmniFlow AI: Autonomous Multi-Agent Workspace",
    tagline: "Autonomous Agent Orchestrator for Real-Time Enterprise Operations",
    description: "An orchestration platform designed to replace fragile webhook setups with stateful multi-agent workflows. OmniFlow allows engineering and operations teams to launch autonomous AI teams that write, execute, debug, and monitor complex cross-system pipelines with human review checkpoints.",
    role: "Founder & Lead AI Engineer",
    tech: ["LangGraph", "CrewAI", "FastAPI", "React", "ChromaDB", "Claude 3.5 Sonnet", "WebSockets", "Docker"],
    year: "2025",
    status: "Private Alpha MVP",
    liveUrl: "https://example.com/omniflow-live",
    repoUrl: "https://github.com/example/omniflow-core",
    cover: "/images/project-omniflow-cover.svg",
    poster: "/images/project-omniflow-poster.svg",
    video: "/videos/project-omniflow.mp4",
    // Special Flagship Attributes
    problem: "Modern operations suffer from fragmented tool stacks, repetitive manual handoffs, and fragile webhook setups that fail silently when edge conditions arise.",
    solution: "A self-healing multi-agent control center utilizing LangGraph state machines and CrewAI role-playing agents to plan, inspect, and execute operational workflows with live observability.",
    highlights: [
      "Stateful directed acyclic graph (DAG) execution with memory checkpointing",
      "Human in the loop approval gates for high security actions",
      "Real-time WebSocket telemetry with sub-80ms status dispatch",
      "Dynamic token routing between Anthropic Claude and OpenAI models"
    ],
    metrics: [
      { label: "Execution Speed", value: "3.8x faster" },
      { label: "Autonomous Tasks", value: "12,000+" },
      { label: "Workflow Reliability", value: "99.4%" },
      { label: "Token Efficiency", value: "42% saved" }
    ]
  },
  {
    id: "cognitive-query-rag",
    featured: false,
    title: "CognitiveQuery: Contextual Enterprise Knowledge RAG",
    tagline: "Ultra-fast hybrid semantic search across private technical knowledge bases",
    description: "Enterprise retrieval augmented generation platform that enables engineers and analysts to query dense documentation and internal wikis with verifiable citations and low latency.",
    role: "AI Engineer",
    tech: ["Python", "FastAPI", "ChromaDB", "LangChain", "OpenAI API", "React", "Tailwind CSS"],
    year: "2024",
    status: "Production Ready",
    liveUrl: "https://example.com/cognitive-query",
    repoUrl: "https://github.com/example/cognitive-query-rag",
    cover: "/images/project-cognitive-cover.svg",
    poster: "/images/project-cognitive-poster.svg",
    video: "/videos/project-cognitive.mp4"
  },
  {
    id: "flowpulse-middleware",
    featured: false,
    title: "FlowPulse: Event-Driven Automation Middleware",
    tagline: "Low-latency webhook orchestration integrating n8n, microservices, and queue brokers",
    description: "Robust automation backbone built to aggregate high-throughput SaaS webhooks, deduplicate events, and route idempotent payloads with zero message drop.",
    role: "Full-Stack Automation Engineer",
    tech: ["Node.js", "n8n", "Make.com", "Redis", "TypeScript", "Tailwind CSS", "WebSockets"],
    year: "2024",
    status: "Deployed to Production",
    liveUrl: "https://example.com/flowpulse-live",
    repoUrl: "https://github.com/example/flowpulse-middleware",
    cover: "/images/project-flowpulse-cover.svg",
    poster: "/images/project-flowpulse-poster.svg",
    video: "/videos/project-flowpulse.mp4"
  },
  {
    id: "apexmetrics-telemetry",
    featured: false,
    title: "ApexMetrics: Real-Time Intelligence & Telemetry Portal",
    tagline: "High-density dynamic telemetry dashboard with sub-100ms analytics streaming",
    description: "Executive and operational intelligence application streaming cross-channel transactional volumes, live server metrics, and automated risk scoring.",
    role: "Full-Stack Developer",
    tech: ["Next.js", "Laravel", "PHP", "FastAPI", "Tailwind CSS", "Chart.js", "PostgreSQL"],
    year: "2024",
    status: "Client Deployed",
    liveUrl: "https://example.com/apexmetrics-portal",
    repoUrl: "https://github.com/example/apexmetrics-telemetry",
    cover: "/images/project-apex-cover.svg",
    poster: "/images/project-apex-poster.svg",
    video: "/videos/project-apex.mp4"
  }
];
