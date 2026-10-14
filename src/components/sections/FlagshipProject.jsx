import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Magnetic } from '../ui/Magnetic';
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  AlertCircle,
  Play
} from 'lucide-react';

export const FlagshipProject = ({ project, onOpenModal }) => {
  const containerRef = useRef(null);
  const pinSceneRef = useRef(null);
  const titleRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const infoPanelsRef = useRef(null);
  const particlesRef = useRef([]);
  const [videoError, setVideoError] = useState(false);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pinScene = pinSceneRef.current;
    if (!container || !pinScene || reducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // === DESKTOP PINNED CINEMATIC SEQUENCE (>= 1024px) ===
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=180%',
            pin: pinScene,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Step 1 & 2: Title slides into focus
        tl.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          0
        );

        // Step 3: Video frame scales into widescreen stage
        tl.fromTo(
          videoWrapperRef.current,
          { scale: 0.72, y: 50, opacity: 0.7 },
          { scale: 1, y: 0, opacity: 1, duration: 1.4, ease: 'power2.out' },
          0.3
        );

        // Step 4: Info panels appear
        const panels = infoPanelsRef.current?.querySelectorAll('.flagship-panel');
        if (panels && panels.length) {
          tl.fromTo(
            panels,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.25,
              ease: 'power3.out',
            },
            0.8
          );
        }
      });

      // === MOBILE / TABLET STACKED FLOW (< 1024px) ===
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        gsap.fromTo(
          videoWrapperRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        const panels = infoPanelsRef.current?.querySelectorAll('.flagship-panel');
        if (panels && panels.length) {
          panels.forEach((p) => {
            gsap.fromTo(
              p,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: p,
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          });
        }
      });

      // Floating particles
      const particles = particlesRef.current.filter(Boolean);
      if (particles.length) {
        particles.forEach((p, idx) => {
          gsap.to(p, {
            y: -25 - idx * 5,
            x: idx % 2 === 0 ? 15 : -15,
            opacity: idx % 2 === 0 ? 0.8 : 0.2,
            duration: 3 + idx * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="relative w-full lg:min-h-[260vh]">
      <div
        ref={pinSceneRef}
        className="w-full lg:h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden py-12 lg:py-0"
      >
        <div className="relative rounded-3xl bg-gradient-to-b from-[#070c18]/95 to-[#03060e]/95 border border-white/10 p-6 sm:p-8 lg:p-12 shadow-[0_0_60px_rgba(245,158,11,0.2),0_0_90px_rgba(20,184,166,0.12)] overflow-hidden">
          {/* Subtle Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { top: '15%', left: '10%' },
              { top: '35%', left: '88%' },
              { top: '75%', left: '15%' },
              { top: '80%', left: '80%' },
              { top: '20%', left: '50%' },
            ].map((pos, i) => (
              <span
                key={`fp-particle-${i}`}
                ref={(el) => (particlesRef.current[i] = el)}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] shadow-[0_0_8px_rgba(245,158,11,0.9)] opacity-40"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
          </div>

          {/* Animated Light Sweep Shimmer Line */}
          <div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -rotate-45 animate-pulse"
            style={{ animationDuration: '6s' }}
          />

          {/* Top Badge: FLAGSHIP / STARTUP MVP */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#f59e0b]/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-ping" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#fbbf24] uppercase">
                FLAGSHIP / STARTUP MVP
              </span>
            </div>

            <div className="font-mono text-xs text-cream-muted uppercase tracking-wider">
              Core Architecture Deployment
            </div>
          </div>

          {/* Giant Title & Tagline */}
          <div ref={titleRef} className="mb-8 relative z-10 will-change-transform">
            <h3 className="font-display text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tight text-cream-50 leading-[0.95]">
              {project.title}
            </h3>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-cream-muted mt-3 max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Center Stage: Scalable Video Frame / Cover Image Slot */}
          <div
            ref={videoWrapperRef}
            className="relative z-10 mb-8 rounded-2xl overflow-hidden bg-[#03060e] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.2)] aspect-video max-h-[460px] w-full will-change-transform"
          >
            {!videoError && project.video ? (
              <video
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={project.poster || project.cover}
                className="w-full h-full object-cover"
                onError={() => setVideoError(true)}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#03060e]/80 via-transparent to-transparent" />

            {/* Quick Explore Button */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={() => onOpenModal(project)}
                className="px-4 py-2 rounded-full bg-[#070c18]/90 hover:bg-gradient-to-r hover:from-[#f59e0b] hover:to-[#14b8a6] hover:text-[#03060c] border border-white/20 text-[#fbbf24] font-mono text-xs uppercase font-semibold flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-lg"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Expand Video &amp; Dossier</span>
              </button>
            </div>
          </div>

          {/* Info Panels: Challenge, Solution, Status & CTAs */}
          <div
            ref={infoPanelsRef}
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Panel 1: Challenge */}
            <div className="flagship-panel p-5 rounded-2xl bg-[#03060e]/75 border border-white/10 hover:border-[#fbbf24]/30 transition-colors backdrop-blur-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-wider mb-2 font-semibold">
                <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
                <span>The Challenge</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Panel 2: Solution */}
            <div className="flagship-panel p-5 rounded-2xl bg-[#03060e]/75 border border-white/10 hover:border-[#14b8a6]/30 transition-colors backdrop-blur-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf] uppercase tracking-wider mb-2 font-semibold">
                <Sparkles className="w-4 h-4 text-[#14b8a6]" />
                <span>Agent Architecture</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Panel 3: Status, Tech Chips & CTA Buttons */}
            <div className="flagship-panel p-5 rounded-2xl bg-[#03060e]/75 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-cream-muted uppercase">Status</span>
                  <span className="text-[#fbbf24] font-bold">{project.status}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 5).map((t, idx) => (
                    <span
                      key={`flag-t-${idx}`}
                      className="px-2 py-0.5 rounded bg-[#070c18] border border-white/5 font-mono text-[11px] text-cream-100"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="px-2 py-0.5 rounded bg-[#070c18] border border-white/5 font-mono text-[11px] text-cream-muted">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => onOpenModal(project)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  >
                    View Case Study
                  </button>
                </Magnetic>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-full bg-[#070c18] border border-white/15 hover:border-[#fbbf24]/40 text-cream-100 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-full bg-[#070c18] border border-white/15 hover:border-[#fbbf24]/40 text-cream-100 font-mono text-xs flex items-center transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlagshipProject;
