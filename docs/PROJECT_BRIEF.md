=== OWNER ===
Name: Hamza. Based in Karachi, Pakistan.
Role: AI Engineer, Full-Stack Developer, Software Architect.
Education: Studying at Virtual University of Pakistan. Completed a Software Engineering diploma at Aptech. Completed courses: Generative AI and Chatbot Development, and Agentic AI Development (SMIT).
Works as a freelancer in his skill areas.
Skills: LangChain, LangGraph, CrewAI, RAG, ChromaDB, OpenAI/Gemini/Anthropic APIs, React, Next.js, Node.js, FastAPI, Python, TypeScript, PHP, Laravel, n8n, Make.com, Zapier.
Goal: A portfolio that makes recruiters instantly find his projects and about info, while feeling like a living system.

=== CONCEPT: "THE AGENT SYSTEM" ===
The entire portfolio is framed around a living multi-agent AI system. The visitor scrolls through an active pipeline where each section is an Agent executing one core role:
Section 00 Initialize (Hero) -> Agent 01 Context (About & Memory Nodes) -> Agent 02 Build (Projects & Flagship MVP) -> Agent 03 Knowledge (Certificates & Accreditations) -> Agent 04 Feedback (Testimonials & Logs) -> Agent 05 Deploy (Contact & Task Intake) -> Mission Complete (Footer).
The background engine (<AgentField> and <CoreOrb>) visualizes the neural network: glowing data nodes, perspective grid, connection lines, data pulses, and the core orchestrator orb tracking scroll progression alongside the page. On mobile, the orchestrator simplifies to a vertical telemetry line with an active glowing marker.
All navigation jumps directly to pipeline steps with smooth Lenis scrolling.

=== VISUAL STYLE ===
Cinematic, dark, moody, ultra-modern. The color theme is derived from the exact gradient on the word "intelligent" in the hero headline (linear-gradient(90deg, #f59e0b, #fbbf24, #14b8a6)). Subtle film grain overlay, radial vignette, soft glowing borders, clean typography. Body text stays neutral for effortless readability.

=== ANIMATION RULES ===
- GSAP + ScrollTrigger + Lenis smooth scroll.
- Every scroll animation must be fully reversible on scroll up (scrub or toggleActions "play reverse play reverse").
- Text animations: line reveals and scrubbed word highlights.
- Object animations: cards with stagger, magnetic buttons, hover micro-interactions, holographic tilt.
- Respect prefers-reduced-motion.
- All animations created inside gsap.context / matchMedia and properly cleaned up (React StrictMode safe).

=== SECTIONS ===
Preloader (terminal system boot sequence), Navbar (with pipeline status indicator), Hero (Initialize), About (Agent 01 Context), Projects (Agent 02 Build), Certificates (Agent 03 Knowledge), Testimonials (Agent 04 Feedback), Contact (Agent 05 Deploy), Footer (Mission Complete with terminal easter egg), plus extras: custom cursor, top progress bar, 404-safe Netlify config, SEO meta tags.

=== PROJECTS ===
4 projects total, each with video support and cover visuals.
Project 1 is the Flagship Startup MVP (OmniFlow AI) with a full-screen pinned showcase scene, gradient glow border, and detailed dossier.
Projects 2, 3, 4 are execution pipeline deployments below it with alternating cards and hover video preview.

=== TECH + QUALITY RULES ===
- React 18 + Vite, Tailwind CSS v3, GSAP 3, Lenis, lucide-react.
- Centralized data in src/data/*.js (profile.js, timeline.js, projects.js, certificates.js, testimonials.js).
- Fully responsive from 320px to 4K.
- Zero console errors or warnings.
- Deploy target: Netlify (static).
- No em dashes in any copy.
- No mention of being self-taught anywhere.
