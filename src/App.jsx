import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { LenisProvider } from './hooks/useLenis';
import { AgentField } from './components/agents/AgentField';
import { PipelineProgress } from './components/agents/PipelineProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/ui/Preloader';
import { ProgressBar } from './components/ui/ProgressBar';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Certificates } from './components/sections/Certificates';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

export const App = () => {
  const [isHeroReady, setIsHeroReady] = useState(true);
  const [isTopNavVisible, setIsTopNavVisible] = useState(true);

  useEffect(() => {
    // 1. Initial refresh
    ScrollTrigger.refresh();

    // 2. Refresh once webfonts are ready
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // 3. Staggered refreshes to catch async DOM, SVG rendering, and layout shifts
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#050811] text-cream-100 selection:bg-[#f59e0b] selection:text-[#020409]">
        {/* Accessible Skip to Content Link */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gradient-to-r focus:from-[#f59e0b] focus:to-[#14b8a6] focus:text-[#020409] focus:font-mono focus:text-xs focus:rounded-full focus:shadow-xl"
        >
          Skip to main content
        </a>

        {/* Cinematic Film Overlays */}
        <div className="film-grain" />
        <div className="cinematic-vignette" />

        {/* Global UI Extras & Engine */}
        <ProgressBar />
        <PipelineProgress isTopNavVisible={isTopNavVisible} />
        <CustomCursor />
        <Preloader onComplete={() => setIsHeroReady(true)} />
        <Navbar onVisibilityChange={setIsTopNavVisible} />
        <AgentField />

        {/* ================= ALL AGENT PIPELINE SECTIONS ================= */}
        <main className="relative z-10">
          {/* Section 00: Initialize (Hero Section) */}
          <Hero isReady={isHeroReady} />

          {/* Section 01: Agent 01 / Context (About & Memory Nodes) */}
          <About />

          {/* Section 02: Agent 02 / Build (Projects & Flagship MVP) */}
          <Projects />

          {/* Section 03: Agent 03 / Knowledge (Certificates & Honors) */}
          <Certificates />

          {/* Section 04: Agent 04 / Feedback (Testimonials & Logs) */}
          <Testimonials />

          {/* Section 05: Agent 05 / Deploy (Contact & Task Intake) */}
          <Contact />
        </main>

        {/* Mission Complete Footer */}
        <Footer />
      </div>
    </LenisProvider>
  );
};

export default App;
