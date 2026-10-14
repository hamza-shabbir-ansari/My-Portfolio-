# Hamza | Cinematic Portfolio - "The Agent System"

A cinematic, dark, multi-agent AI system portfolio website built with React 18, Vite, Tailwind CSS v3, GSAP 3, and Lenis smooth scrolling. The entire experience is framed around an autonomous multi-agent pipeline:
- **Section 00 // Initialize (Hero)**: Orchestrator activation and system boot.
- **Agent 01 // Context (About)**: Memory nodes, origin background, and engineering repertoire.
- **Agent 02 // Build (Projects)**: Pinned flagship startup MVP showcase (OmniFlow AI) and core production builds.
- **Agent 03 // Knowledge (Certificates)**: Holographic verified credentials and accredited honors.
- **Agent 04 // Feedback (Testimonials)**: Collaborator dispatches, logs, and technical performance reviews.
- **Agent 05 // Deploy (Contact)**: Prompt-style task intake queue and direct communication channels.
- **Mission Complete (Footer)**: Settling neural network, back to top orchestrator orb, and interactive terminal easter egg.

---

## Color Theme & Gradient Architecture

The entire visual identity is powered by the exact gradient from the word "intelligent" in the hero headline:
- **Gradient**: `linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #14b8a6 100%)`
- **Stop 1 (`--c1`)**: `#f59e0b` (warm gold / amber)
- **Stop 2 (`--c2`)**: `#fbbf24` (bright solar amber)
- **Stop 3 (`--c3`)**: `#14b8a6` (electric cyan / teal)
- **Glow**: `0 0 25px rgba(245, 158, 11, 0.35), 0 0 50px rgba(20, 184, 166, 0.18)`

---

## Centralized Content Directory Guide

All copy, profile information, project dossiers, credentials, and testimonials are located in `src/data/`. You never need to touch React components to edit your content:

1. **Profile & Skills**: `src/data/profile.js`
   - Edit name, role, bio, location, education entries, skill groups, and socials.
2. **Pipeline Timeline & Memory Nodes**: `src/data/timeline.js`
   - Edit agent pipeline steps and chronological memory nodes.
3. **Projects & Flagship Startup MVP**: `src/data/projects.js`
   - Edit project titles, problem/solution narratives, tech stack chips, metrics, and demo URLs.
   - `featured: true` flags the pinned full-screen showcase.
4. **Credentials & Accreditations**: `src/data/certificates.js`
   - Edit credential titles, benchmark levels, issuers, dates, and verification links.
5. **Collaborator Logs**: `src/data/testimonials.js`
   - Update client quotes, reviewer names, companies, and ratings.

---

## Images & Video Assets Guide

- **Images Directory**: `public/images/`
  - Flagship cover: `public/images/project-omniflow-cover.svg` (or `.webp` / `.png`)
  - Project covers: `project-cognitive-cover.svg`, `project-flowpulse-cover.svg`, `project-apex-cover.svg`
  - Portrait image: `public/images/portrait-hamza.svg`
  - Certificate visuals: `cert-agentic.svg`, `cert-genai.svg`, `cert-aptech.svg`, `cert-backend.svg`
  - Avatar images: `avatar-1.svg`, `avatar-2.svg`, `avatar-3.svg`
- **Videos Directory**: `public/videos/`
  - Flagship video: `public/videos/project-omniflow.mp4`
  - Project videos: `project-cognitive.mp4`, `project-flowpulse.mp4`, `project-apex.mp4`

---

## Netlify Deployment Guide

### Option A: Automatic Git Deployment (Recommended)
1. Commit and push repository:
   ```bash
   git add .
   git commit -m "feat: agent system redesign"
   git push origin main
   ```
2. In [Netlify Dashboard](https://app.netlify.com/), click **Add new site** > **Import an existing project**.
3. Select your repository. Configuration from `netlify.toml` is detected automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**. Netlify Forms and SPA routing are pre-configured.

### Option B: Manual Drag & Drop Deployment
1. Run local production build:
   ```bash
   npm run build
   ```
2. Drag and drop the generated `dist/` directory into your Netlify dashboard.

---

## Local Development Commands

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```
