import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { pipelineData } from '../../data/timeline';
import { scrollToSection } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Magnetic } from '../ui/Magnetic';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal,
  CheckCircle2,
  X
} from 'lucide-react';

export const Footer = () => {
  const footerRef = useRef(null);
  const giantNameRef = useRef(null);
  const glowRiseRef = useRef(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const terminalStep = pipelineData.find((s) => s.id === 'footer') || pipelineData[pipelineData.length - 1];

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Reversible giant typography reveal
      gsap.fromTo(
        giantNameRef.current,
        {
          yPercent: 30,
          opacity: 0.25,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        }
      );

      // 2. Soft gradient glow rising as pipeline settles
      if (glowRiseRef.current) {
        gsap.fromTo(
          glowRiseRef.current,
          { opacity: 0, scale: 0.85, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Terminal Easter Egg via "`" key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      } else if (e.key === 'Escape' && consoleOpen) {
        setConsoleOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [consoleOpen]);

  return (
    <>
      <footer
        id="footer"
        ref={footerRef}
        className="relative min-h-[85vh] flex flex-col justify-between section-container overflow-hidden pt-20 pb-12 border-t border-white/10"
      >
        {/* Soft Gradient Glow Rising Layer */}
        <div
          ref={glowRiseRef}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1200px] h-[350px] pointer-events-none will-change-transform opacity-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.16) 0%, rgba(20, 184, 166, 0.14) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Top Header: Mission Complete Milestone & Back to Top Orb Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8 mb-12 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] animate-pulse" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#fbbf24] font-bold block">
                MISSION COMPLETE // PIPELINE SETTLED
              </span>
              <span className="font-sans text-xs text-cream-muted">
                Pipeline execution verified. Full reverse traversal enabled.
              </span>
            </div>
          </div>

          {/* Back to Top Gradient Orb Button */}
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection('hero')}
              className="group px-5 py-2.5 rounded-full bg-[#070c18] border border-white/15 hover:border-[#fbbf24] text-cream-100 font-mono text-xs uppercase font-semibold flex items-center gap-2.5 transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Initialize Pipeline</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] flex items-center justify-center text-[#03060c] group-hover:-translate-y-1 transition-transform">
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </Magnetic>
        </div>

        {/* Center Giant Watermark Typography */}
        <div className="my-auto py-8 text-center select-none overflow-hidden relative z-10">
          <h2
            ref={giantNameRef}
            className="font-display text-[15vw] sm:text-[18vw] uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-cream-100/30 to-cream-100/5 will-change-transform"
          >
            {profileData.name}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#fbbf24] tracking-widest uppercase mt-2">
            {profileData.role} • Karachi, Pakistan
          </p>
        </div>

        {/* Bottom Row: Quick Navigation, Socials, Easter Egg Dot, Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Quick Step Jump Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-cream-muted">
            {pipelineData
              .filter((s) => s.id !== 'footer')
              .map((st) => (
                <button
                  key={`footer-${st.id}`}
                  onClick={() => scrollToSection(st.id)}
                  className="hover:text-[#fbbf24] transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {st.navLabel}
                </button>
              ))}
          </nav>

          {/* Social Icons & Interactive Terminal Dot Easter Egg */}
          <div className="flex items-center gap-4">
            {/* Hidden Console Easter Egg Button */}
            <button
              onClick={() => setConsoleOpen(true)}
              className="p-2 rounded-full border border-white/10 bg-[#070c18] text-cream-muted hover:text-[#fbbf24] hover:border-[#fbbf24]/50 transition-all cursor-pointer"
              title="Open System Terminal (Press `)"
              aria-label="Open system terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#fbbf24] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#fbbf24] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.socials.email}`}
              className="p-2 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#fbbf24] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright with clickable footer dot */}
          <div className="font-mono text-xs text-cream-muted text-center md:text-right flex items-center gap-2">
            <span>© {new Date().getFullYear()} {profileData.name}. All systems nominal.</span>
            <button
              onClick={() => setConsoleOpen(true)}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              title="Terminal Easter Egg"
              aria-label="Terminal dot"
            />
          </div>
        </div>
      </footer>

      {/* Hidden Terminal Easter Egg Modal Overlay */}
      {consoleOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#020409]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setConsoleOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#060b17] border border-white/15 p-6 shadow-2xl overflow-hidden font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <Terminal className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">
                  Hamza // Dev Terminal
                </span>
              </div>
              <button
                onClick={() => setConsoleOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-cream-muted hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-cream-muted leading-relaxed">
              <p className="text-emerald-400">&gt; System status: ONLINE</p>
              <p>&gt; Architect: Hamza (AI Engineer &amp; Full-Stack Architect)</p>
              <p>&gt; Location: Karachi, Pakistan (UTC+5)</p>
              <p>&gt; Specialties: LangGraph, CrewAI, ChromaDB, FastAPI, Next.js</p>
              <p>&gt; Mission: Crafting autonomous agents that execute with production reliability.</p>
              <p className="text-[#fbbf24] pt-2">&gt; Press [ESC] or close button to return to pipeline.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
