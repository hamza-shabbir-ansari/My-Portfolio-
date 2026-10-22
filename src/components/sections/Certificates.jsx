import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { certificatesData } from '../../data/certificates';
import { pipelineData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  ShieldCheck,
  CheckCircle2,
  X,
  ExternalLink,
  Bot,
  Sparkles,
  Cpu,
  Binary,
  Workflow,
  TrendingUp,
  Award,
  Compass,
  GitBranch,
  GraduationCap,
  Eye,
  ArrowUpRight
} from 'lucide-react';

// Tailored cybernetic color systems for each credential benchmark
const certificateThemes = {
  'cert-agentic-ai': {
    accentGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 55%, #14b8a6 100%)',
    bottomLine: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, #14b8a6 100%)',
    bottomGlow: 'from-[#f59e0b]/35 via-[#fbbf24]/40 to-[#14b8a6]/30',
    spotlight: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(20, 184, 166, 0.18) 55%, transparent 75%)',
    badgeClass: 'bg-amber-500/10 border-amber-500/35 text-[#fbbf24]',
    dotClass: 'bg-[#fbbf24]',
    tagText: 'SMIT // AGENTIC AI',
    category: 'AUTONOMOUS AGENTS',
    icon: Bot,
    primaryColor: '#fbbf24',
    secondaryColor: '#14b8a6',
  },
  'cert-gen-ai': {
    accentGradient: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #14b8a6 100%)',
    bottomLine: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #14b8a6 100%)',
    bottomGlow: 'from-[#f59e0b]/30 via-[#fbbf24]/40 to-[#14b8a6]/40',
    spotlight: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(20, 184, 166, 0.3) 55%, transparent 75%)',
    badgeClass: 'bg-gradient-to-r from-amber-500/15 to-teal-500/15 border-amber-500/30 text-[#fbbf24]',
    dotClass: 'bg-[#2dd4bf]',
    tagText: 'SMIT // GEN-AI',
    category: 'NEURAL VECTOR RAG',
    icon: Sparkles,
    primaryColor: '#2dd4bf',
    secondaryColor: '#fbbf24',
  },
  'cert-google-ai-agents': {
    accentGradient: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #0ea5e9 0%, #14b8a6 55%, #fbbf24 100%)',
    bottomGlow: 'from-[#0ea5e9]/35 via-[#14b8a6]/40 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(20, 184, 166, 0.22) 55%, transparent 75%)',
    badgeClass: 'bg-sky-500/10 border-sky-500/35 text-[#38bdf8]',
    dotClass: 'bg-[#38bdf8]',
    tagText: 'GOOGLE // KAGGLE',
    category: 'AI AGENTS INTENSIVE',
    icon: Cpu,
    primaryColor: '#38bdf8',
    secondaryColor: '#14b8a6',
  },
  'cert-datacamp-ai-engineer': {
    accentGradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #10b981 0%, #14b8a6 60%, #fbbf24 100%)',
    bottomGlow: 'from-[#10b981]/35 via-[#14b8a6]/40 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(251, 191, 36, 0.2) 55%, transparent 75%)',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/35 text-[#34d399]',
    dotClass: 'bg-[#34d399]',
    tagText: 'DATACAMP // 40 HR',
    category: 'APPLIED AI ENGINEERING',
    icon: Binary,
    primaryColor: '#34d399',
    secondaryColor: '#fbbf24',
  },
  'cert-datacamp-agent-fundamentals': {
    accentGradient: 'linear-gradient(135deg, #f59e0b 0%, #14b8a6 60%, #2dd4bf 100%)',
    bottomLine: 'linear-gradient(90deg, #f59e0b 0%, #14b8a6 50%, #2dd4bf 100%)',
    bottomGlow: 'from-[#f59e0b]/35 via-[#14b8a6]/40 to-[#2dd4bf]/35',
    spotlight: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(45, 212, 191, 0.22) 55%, transparent 75%)',
    badgeClass: 'bg-amber-500/10 border-teal-500/35 text-[#fbbf24]',
    dotClass: 'bg-[#2dd4bf]',
    tagText: 'DATACAMP // AGENTS',
    category: 'AGENT ARCHITECTURE',
    icon: Workflow,
    primaryColor: '#fbbf24',
    secondaryColor: '#2dd4bf',
  },
  'cert-datacamp-genai-business': {
    accentGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 45%, #14b8a6 100%)',
    bottomLine: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #14b8a6 100%)',
    bottomGlow: 'from-[#fbbf24]/35 via-[#f59e0b]/40 to-[#14b8a6]/35',
    spotlight: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(20, 184, 166, 0.22) 55%, transparent 75%)',
    badgeClass: 'bg-amber-500/10 border-amber-500/30 text-[#fbbf24]',
    dotClass: 'bg-[#fbbf24]',
    tagText: 'DATACAMP // ENTERPRISE',
    category: 'ENTERPRISE GEN-AI',
    icon: TrendingUp,
    primaryColor: '#fbbf24',
    secondaryColor: '#14b8a6',
  },
  'cert-datacamp-openai-api': {
    accentGradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #10b981 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomGlow: 'from-[#10b981]/35 via-[#14b8a6]/40 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(20, 184, 166, 0.22) 55%, transparent 75%)',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/35 text-[#34d399]',
    dotClass: 'bg-[#34d399]',
    tagText: 'DATACAMP // OPENAI',
    category: 'LLM INTEGRATION',
    icon: Sparkles,
    primaryColor: '#34d399',
    secondaryColor: '#fbbf24',
  },
  'cert-datacamp-ai-leadership': {
    accentGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #fbbf24 100%)',
    bottomGlow: 'from-[#a855f7]/35 via-[#ec4899]/35 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(251, 191, 36, 0.2) 55%, transparent 75%)',
    badgeClass: 'bg-purple-500/10 border-purple-500/35 text-[#c084fc]',
    dotClass: 'bg-[#c084fc]',
    tagText: 'DATACAMP // LEADERSHIP',
    category: 'AI LEADERSHIP',
    icon: Award,
    primaryColor: '#c084fc',
    secondaryColor: '#fbbf24',
  },
  'cert-datacamp-ai-fundamentals': {
    accentGradient: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomGlow: 'from-[#06b6d4]/35 via-[#14b8a6]/40 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(20, 184, 166, 0.22) 55%, transparent 75%)',
    badgeClass: 'bg-cyan-500/10 border-cyan-500/35 text-[#22d3ee]',
    dotClass: 'bg-[#22d3ee]',
    tagText: 'DATACAMP // CERTIFIED',
    category: 'CORE AI FOUNDATIONS',
    icon: Compass,
    primaryColor: '#22d3ee',
    secondaryColor: '#14b8a6',
  },
  'cert-microsoft-ambassador': {
    accentGradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #14b8a6 100%)',
    bottomLine: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #14b8a6 100%)',
    bottomGlow: 'from-[#3b82f6]/35 via-[#6366f1]/35 to-[#14b8a6]/30',
    spotlight: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(20, 184, 166, 0.2) 55%, transparent 75%)',
    badgeClass: 'bg-blue-500/10 border-blue-500/35 text-[#60a5fa]',
    dotClass: 'bg-[#60a5fa]',
    tagText: 'MICROSOFT // LEARN',
    category: 'DEVELOPER TOOLKIT',
    icon: GitBranch,
    primaryColor: '#60a5fa',
    secondaryColor: '#14b8a6',
  },
  'cert-google-soft-skills': {
    accentGradient: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #14b8a6 0%, #2dd4bf 50%, #fbbf24 100%)',
    bottomGlow: 'from-[#14b8a6]/35 via-[#2dd4bf]/40 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(20, 184, 166, 0.35) 0%, rgba(251, 191, 36, 0.2) 55%, transparent 75%)',
    badgeClass: 'bg-teal-500/10 border-teal-500/35 text-[#2dd4bf]',
    dotClass: 'bg-[#2dd4bf]',
    tagText: 'GOOGLE // PAFLA',
    category: 'PROFESSIONAL EXCELLENCE',
    icon: GraduationCap,
    primaryColor: '#2dd4bf',
    secondaryColor: '#fbbf24',
  },
};

export const Certificates = () => {
  const containerRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const [lightboxCert, setLightboxCert] = useState(null);
  const [mousePositions, setMousePositions] = useState({});
  const reducedMotion = useReducedMotion();

  // Notify portfolio of modal state so bottom navbar smoothly hides
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('portfolio:modal-change', {
        detail: { isOpen: Boolean(lightboxCert) },
      })
    );
  }, [lightboxCert]);

  const certStep = pipelineData.find((s) => s.id === 'certificates') || pipelineData[3];

  const handleMouseMove = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  };

  const handleMouseLeave = (id) => {
    setMousePositions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = horizontalTrackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // === DESKTOP PINNED HORIZONTAL SCROLL (>= 1024px) ===
      mm.add('(min-width: 1024px)', () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - track.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${Math.max(100, track.scrollWidth - track.clientWidth + 300)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // === MOBILE ENTRANCE (< 1024px) ===
      mm.add('(max-width: 1023px)', () => {
        const cards = track.querySelectorAll('.credential-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative section-container min-h-screen lg:h-screen lg:max-h-[1050px] flex flex-col justify-center py-16 lg:py-8"
    >
      {/* Header Container */}
      <div className="mb-5 lg:mb-6 shrink-0">
        <div className="mb-2.5">
          <AgentLabel
            agent={certStep.agentKey || 'AGENT 03'}
            name={certStep.name}
            status="active"
            subtitle={certStep.subtext}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14b8a6]" />
              <span>Accredited Knowledge Benchmarks</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream-50 uppercase tracking-tight leading-none mb-1.5">
              Credentials
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Technical certifications in AI engineering and autonomous agents.
            </p>
          </div>

          {/* Quick visual note for horizontal scroll on desktop */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
            <span>Scroll or drag horizontally to view all cards →</span>
          </div>
        </div>
      </div>

      {/* Horizontal / Stacked Interactive Glowing Cards Track */}
      <div
        ref={horizontalTrackRef}
        className="flex flex-col lg:flex-row gap-5 lg:gap-6 will-change-transform pb-6 lg:pb-3 items-stretch"
      >
        {certificatesData.map((cert) => {
          const theme = certificateThemes[cert.id] || certificateThemes['cert-agentic-ai'];
          const IconComponent = theme.icon || Bot;
          const mousePos = mousePositions[cert.id];

          return (
            <div
              key={cert.id}
              onClick={() => setLightboxCert(cert)}
              onMouseMove={(e) => handleMouseMove(cert.id, e)}
              onMouseLeave={() => handleMouseLeave(cert.id)}
              className="credential-card group relative shrink-0 w-full sm:max-w-[380px] lg:w-[350px] min-h-[440px] rounded-[24px] bg-[#070c18]/92 border border-white/10 hover:border-[#fbbf24]/50 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-xl mx-auto lg:mx-0 select-none"
            >
              {/* Subtle Cyber Grid Texture inside card */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none opacity-40"
                aria-hidden="true"
              />

              {/* Dynamic Interactive Mouse-Follow Spotlight Glow in Button Gradient Hue */}
              {mousePos && (
                <div
                  className="absolute pointer-events-none rounded-full blur-2xl transition-opacity duration-200"
                  style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    width: '260px',
                    height: '260px',
                    transform: 'translate(-50%, -50%)',
                    background: theme.spotlight,
                    opacity: 0.95,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Bottom Glowing Neon Aura */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-r ${theme.bottomGlow} rounded-full blur-xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                aria-hidden="true"
              />

              {/* Bottom Neon Accent Line */}
              <div
                className="absolute bottom-0 inset-x-6 h-[2.5px] transition-all duration-300"
                style={{
                  background: theme.bottomLine,
                  boxShadow: '0 0 16px rgba(245, 158, 11, 0.45), 0 0 20px rgba(20, 184, 166, 0.35)',
                }}
                aria-hidden="true"
              />

              {/* Top Row: Clean Status & Issuer Badge */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-slate-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                  Verified • {cert.year}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,0,0,0.5)] ${theme.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass} animate-pulse`} />
                  {theme.tagText}
                </span>
              </div>

              {/* Visual Presentation: Sleek Certificate Preview Window */}
              <div className="relative z-10 w-full my-3">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#03060e] border border-white/10 group-hover:border-[#fbbf24]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  {/* Certificate Image / Mock */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Dark Glass Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070c18]/85 via-black/10 to-transparent pointer-events-none" />

                  {/* Floating Glowing Icon Capsule */}
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center bg-[#070c18]/90 backdrop-blur-md border border-white/15 shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4 text-[#fbbf24] group-hover:text-[#2dd4bf] transition-colors" />
                  </div>

                  {/* Quick Hover Inspect Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="px-3 py-1 rounded-full bg-[#070c18]/95 border border-[#fbbf24]/50 text-[11px] font-mono text-[#fbbf24] font-semibold flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-3.5 h-3.5 text-[#2dd4bf]" />
                      Inspect Credential
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Course Information & Action Link */}
              <div className="relative z-10 pt-2 border-t border-white/5 flex flex-col justify-between flex-grow">
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest font-semibold block mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6]"
                  >
                    {theme.category}
                  </span>

                  <h3 className="font-display text-xl lg:text-2xl uppercase tracking-wide text-cream-50 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#fbbf24] group-hover:to-[#2dd4bf] transition-all line-clamp-2 min-h-[2.5rem]">
                    {cert.title}
                  </h3>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-sans text-xs text-slate-400 font-medium truncate max-w-[200px]">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {cert.credentialId}
                    </span>
                  </div>
                </div>

                {/* Action Links Row */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                  {/* Verify Link: Target="_blank" to directly open the certificate in a new tab */}
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/40 text-[11px] font-mono font-semibold text-[#fbbf24] hover:text-[#fef08a] transition-all group/link cursor-pointer shadow-sm"
                    title="Open verified certificate in a new tab"
                  >
                    <span>Verify Link</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#14b8a6] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Preview Button: Opens the full modal lightbox */}
                  <button
                    type="button"
                    onClick={() => setLightboxCert(cert)}
                    className="font-mono text-[11px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#2dd4bf] hover:brightness-125 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Preview</span>
                    <Eye className="w-3 h-3 text-[#2dd4bf]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Credential Modal */}
      {lightboxCert && typeof document !== 'undefined' && createPortal(
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: 99999 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop scrim */}
          <div
            className="absolute inset-0 bg-[#020409]/95 backdrop-blur-md -z-10 cursor-pointer"
            onClick={() => setLightboxCert(null)}
            aria-hidden="true"
          />

          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="relative w-full max-w-3xl rounded-3xl bg-[#060b17] border border-white/15 p-5 sm:p-7 shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                <span>Verified Benchmark Credential</span>
              </div>
              <button
                onClick={() => setLightboxCert(null)}
                className="w-8 h-8 rounded-full bg-[#03060e] border border-white/10 flex items-center justify-center text-cream-muted hover:text-[#fbbf24] transition-colors cursor-pointer"
                aria-label="Close credential preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#03060e] border border-white/10 mb-5 relative flex items-center justify-center">
              <img
                src={lightboxCert.image}
                alt={lightboxCert.title}
                className="w-full h-full object-contain p-2 sm:p-3"
              />
            </div>

            {/* Modal Details & Action Buttons */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#fbbf24] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {lightboxCert.benchmarkLevel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    ID: {lightboxCert.credentialId}
                  </span>
                </div>
                <h4 className="font-display text-2xl uppercase tracking-wider text-cream-50 leading-tight">
                  {lightboxCert.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-1">
                  {lightboxCert.issuer} • {lightboxCert.year}
                </p>
                {lightboxCert.description && (
                  <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                    {lightboxCert.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {lightboxCert.credentialUrl && (
                  <a
                    href={lightboxCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setLightboxCert(null)}
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Certificates;
