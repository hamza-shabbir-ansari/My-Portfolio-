import React, { useRef, useLayoutEffect, useState } from 'react';
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
  Layers,
  Binary,
  Zap
} from 'lucide-react';

// Exact Button Signature Gradient System: Amber (#f59e0b) -> Gold (#fbbf24) -> Teal (#14b8a6) -> Turquoise (#2dd4bf)
const certificateThemes = {
  'cert-agentic-ai': {
    accentGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 55%, #14b8a6 100%)',
    bottomLine: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, #14b8a6 100%)',
    bottomGlow: 'from-[#f59e0b]/35 via-[#fbbf24]/40 to-[#14b8a6]/30',
    spotlight: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(20, 184, 166, 0.18) 55%, transparent 75%)',
    badgeClass: 'bg-amber-500/10 border-amber-500/35 text-[#fbbf24]',
    dotClass: 'bg-[#fbbf24]',
    tagText: 'SMIT // AI',
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
    tagText: 'SMIT // RAG',
    category: 'NEURAL VECTOR RAG',
    icon: Sparkles,
    primaryColor: '#2dd4bf',
    secondaryColor: '#fbbf24',
  },
  'cert-aptech-se': {
    accentGradient: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 50%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #14b8a6 0%, #2dd4bf 65%, #fbbf24 100%)',
    bottomGlow: 'from-[#14b8a6]/40 via-[#2dd4bf]/40 to-[#fbbf24]/30',
    spotlight: 'radial-gradient(circle, rgba(20, 184, 166, 0.35) 0%, rgba(251, 191, 36, 0.18) 55%, transparent 75%)',
    badgeClass: 'bg-teal-500/10 border-teal-500/35 text-[#2dd4bf]',
    dotClass: 'bg-[#fbbf24]',
    tagText: 'APTECH // ACCP',
    category: 'SYSTEMS ARCHITECTURE',
    icon: Layers,
    primaryColor: '#14b8a6',
    secondaryColor: '#fbbf24',
  },
  'cert-vu-cs': {
    accentGradient: 'linear-gradient(225deg, #2dd4bf 0%, #14b8a6 45%, #fbbf24 100%)',
    bottomLine: 'linear-gradient(90deg, #2dd4bf 0%, #14b8a6 50%, #fbbf24 100%)',
    bottomGlow: 'from-[#2dd4bf]/35 via-[#14b8a6]/40 to-[#f59e0b]/35',
    spotlight: 'radial-gradient(circle, rgba(45, 212, 191, 0.32) 0%, rgba(245, 158, 11, 0.22) 55%, transparent 75%)',
    badgeClass: 'bg-teal-500/10 border-amber-500/30 text-[#fbbf24]',
    dotClass: 'bg-[#2dd4bf]',
    tagText: 'VIRTUAL UNIV',
    category: 'COMPUTATIONAL CS',
    icon: Binary,
    primaryColor: '#fbbf24',
    secondaryColor: '#2dd4bf',
  },
  'cert-python-microservices': {
    accentGradient: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 40%, #14b8a6 100%)',
    bottomLine: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #14b8a6 100%)',
    bottomGlow: 'from-[#f59e0b]/35 via-[#fbbf24]/45 to-[#14b8a6]/35',
    spotlight: 'radial-gradient(circle, rgba(251, 191, 36, 0.32) 0%, rgba(20, 184, 166, 0.26) 55%, transparent 75%)',
    badgeClass: 'bg-amber-500/10 border-teal-500/30 text-[#2dd4bf]',
    dotClass: 'bg-[#fbbf24]',
    tagText: 'FASTAPI // ASYNC',
    category: 'ASYNC ENGINES',
    icon: Zap,
    primaryColor: '#f59e0b',
    secondaryColor: '#14b8a6',
  },
};

export const Certificates = () => {
  const containerRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const [lightboxCert, setLightboxCert] = useState(null);
  const [mousePositions, setMousePositions] = useState({});
  const reducedMotion = useReducedMotion();

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
      className="relative section-container min-h-screen lg:h-screen lg:max-h-[1050px] flex flex-col justify-center py-16 lg:py-10"
    >
      {/* Header Container - Proportional, compact, never clipped */}
      <div className="mb-6 lg:mb-8 shrink-0">
        <div className="mb-3">
          <AgentLabel
            agent={certStep.agentKey || 'AGENT 03'}
            name={certStep.name}
            status="active"
            subtitle={certStep.subtext}
          />
        </div>

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#14b8a6]" />
            <span>Accredited Knowledge Benchmarks</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream-50 uppercase tracking-tight leading-none mb-2">
            Validated Credentials &amp; Honors
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300">
            Verified academic degrees and specialized certifications in AI engineering &amp; software architectures.
          </p>
        </div>
      </div>

      {/* Horizontal / Stacked Interactive Glowing Cards Track */}
      <div
        ref={horizontalTrackRef}
        className="flex flex-col lg:flex-row gap-6 lg:gap-8 will-change-transform pb-6 lg:pb-4 items-stretch"
      >
        {certificatesData.map((cert) => {
          const theme = certificateThemes[cert.id] || certificateThemes['cert-agentic-ai'];
          const IconComponent = theme.icon;
          const mousePos = mousePositions[cert.id];

          return (
            <div
              key={cert.id}
              onClick={() => setLightboxCert(cert)}
              onMouseMove={(e) => handleMouseMove(cert.id, e)}
              onMouseLeave={() => handleMouseLeave(cert.id)}
              className="credential-card group relative shrink-0 w-full sm:max-w-[380px] lg:w-[350px] h-[410px] lg:h-[430px] rounded-[28px] bg-[#070c18]/92 border border-white/10 hover:border-[#fbbf24]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-xl mx-auto lg:mx-0 select-none"
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

              {/* Bottom Glowing Neon Aura (Button Gradient Theme) */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-r ${theme.bottomGlow} rounded-full blur-xl pointer-events-none opacity-75 group-hover:opacity-100 transition-opacity duration-500`}
                aria-hidden="true"
              />

              {/* Bottom Neon Accent Line (Exact Gradient of View Projects Button) */}
              <div
                className="absolute bottom-0 inset-x-8 h-[2.5px] transition-all duration-300"
                style={{
                  background: theme.bottomLine,
                  boxShadow: '0 0 16px rgba(245, 158, 11, 0.45), 0 0 20px rgba(20, 184, 166, 0.35)',
                }}
                aria-hidden="true"
              />

              {/* Top Row: Clean Status & Issuer Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 tracking-wider">
                  Verified • {cert.year}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase px-3 py-1 rounded-full border font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)] ${theme.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass} animate-pulse`} />
                  {theme.tagText}
                </span>
              </div>

              {/* Center Visual: Holographic Orbit Core with Button Gradient Accents */}
              <div className="relative z-10 my-auto w-full flex flex-col items-center justify-center py-4">
                <div className="relative flex items-center justify-center">
                  {/* Outer Ambient Glow Blob (Amber to Teal) */}
                  <div
                    className="absolute w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-45 group-hover:opacity-85 group-hover:scale-125 transition-all duration-700"
                    style={{
                      background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(20,184,166,0.3) 70%, transparent 100%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Concentric Cyber Orbit Ring 1 (Dashed Gold/Teal) */}
                  <div
                    className="w-28 h-28 rounded-full border border-dashed border-[#fbbf24]/30 flex items-center justify-center group-hover:rotate-45 transition-transform duration-1000 ease-out"
                  >
                    {/* Concentric Cyber Orbit Ring 2 (Smooth Teal) */}
                    <div
                      className="w-20 h-20 rounded-full border border-[#14b8a6]/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                    >
                      {/* Central Glowing Icon Capsule */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#050914] border border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-110 group-hover:border-[#fbbf24]/50 transition-all duration-300"
                      >
                        <IconComponent
                          className="w-7 h-7 text-[#fbbf24] group-hover:text-[#2dd4bf] transition-colors duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4 Orbital Satellite Dots (Matching Button Gradient Stops) */}
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#f59e0b] bg-[#f59e0b]"
                  />
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#14b8a6] bg-[#14b8a6]"
                  />
                  <span
                    className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#fbbf24] bg-[#fbbf24]"
                  />
                  <span
                    className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#2dd4bf] bg-[#2dd4bf]"
                  />
                </div>
              </div>

              {/* Bottom Section: Core Course Information Only (Clean & Focused) */}
              <div className="relative z-10 pt-3 border-t border-white/5">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest font-semibold block mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6]"
                >
                  {theme.category}
                </span>

                <h3 className="font-display text-2xl lg:text-3xl uppercase tracking-wide text-cream-50 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#fbbf24] group-hover:to-[#2dd4bf] transition-all line-clamp-2">
                  {cert.title}
                </h3>

                <div className="mt-2.5 flex items-center justify-between">
                  <span className="font-sans text-xs text-slate-300 font-medium truncate max-w-[210px]">
                    {cert.issuer}
                  </span>
                  <span
                    className="font-mono text-[11px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#2dd4bf] group-hover:translate-x-1 transition-all"
                  >
                    View Pass ↗
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Credential Modal */}
      {lightboxCert && (
        <div
          className="fixed inset-0 z-50 bg-[#020409]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#060b17] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                <span>Verified Benchmark Credential</span>
              </div>
              <button
                onClick={() => setLightboxCert(null)}
                className="w-9 h-9 rounded-full bg-[#03060e] border border-white/10 flex items-center justify-center text-cream-muted hover:text-[#fbbf24] transition-colors cursor-pointer"
                aria-label="Close credential preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#03060e] border border-white/10 mb-6">
              <img
                src={lightboxCert.image}
                alt={lightboxCert.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-display text-2xl uppercase tracking-wider text-cream-50">
                  {lightboxCert.title}
                </h4>
                <p className="font-mono text-xs text-slate-400">
                  {lightboxCert.issuer} • {lightboxCert.year}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {lightboxCert.credentialUrl && (
                  <a
                    href={lightboxCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 font-mono text-xs text-[#fbbf24] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setLightboxCert(null)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
