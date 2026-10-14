import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { pipelineData } from '../../data/timeline';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CoreOrb = () => {
  const containerRef = useRef(null);
  const orbRef = useRef(null);
  const beamRef = useRef(null);
  const mobileOrbRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const [activeStepId, setActiveStepId] = useState('hero');
  const reducedMotion = useReducedMotion();

  // Watch active section changes to trigger gentle orb pulse/expansion
  useEffect(() => {
    const triggers = pipelineData.map((step) => {
      const el = document.getElementById(step.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveStepId(step.id),
        onEnterBack: () => setActiveStepId(step.id),
      });
    });

    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Orchestrator Track & Orb (>= 768px)
      mm.add('(min-width: 768px)', () => {
        if (orbRef.current && beamRef.current) {
          // Orb glides vertically down along the beam scrubbed to page scroll
          gsap.fromTo(
            orbRef.current,
            { top: '12%' },
            {
              top: '86%',
              ease: 'none',
              scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.8,
              },
            }
          );

          // Beam glowing active fill
          gsap.fromTo(
            beamRef.current.querySelector('.beam-fill'),
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
              },
            }
          );
        }
      });

      // Mobile Track & Slim Marker (< 768px)
      mm.add('(max-width: 767px)', () => {
        if (mobileOrbRef.current) {
          gsap.fromTo(
            mobileOrbRef.current,
            { top: '0%' },
            {
              top: '100%',
              ease: 'none',
              scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle flare animation when entering a new agent section
  useEffect(() => {
    if (reducedMotion) return;

    if (orbRef.current) {
      gsap.fromTo(
        orbRef.current,
        { scale: 1 },
        {
          scale: 1.28,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      );
    }
  }, [activeStepId, reducedMotion]);

  const activeStep = pipelineData.find((s) => s.id === activeStepId) || pipelineData[0];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none select-none z-30"
      aria-hidden="true"
    >
      {/* ================= DESKTOP ORCHESTRATOR BEAM & ORB (>= 768px) ================= */}
      <div className="hidden md:block fixed right-6 lg:right-10 top-0 bottom-0 w-12 pointer-events-none">
        {/* Vertical Glowing Beam */}
        <div
          ref={beamRef}
          className="relative w-[2px] h-[78vh] mx-auto top-[11vh] bg-white/5 rounded-full overflow-hidden"
        >
          <div className="beam-fill absolute inset-0 bg-gradient-to-b from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] origin-top will-change-transform opacity-70" />
        </div>

        {/* Milestone Node Anchors along the beam */}
        <div className="absolute inset-y-[11vh] left-1/2 -translate-x-1/2 w-4 flex flex-col justify-between py-2">
          {pipelineData.map((step) => {
            const isActive = activeStepId === step.id;
            return (
              <div
                key={`orb-node-${step.id}`}
                className="relative flex items-center justify-center"
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#fbbf24] scale-125 shadow-[0_0_10px_rgba(251,191,36,0.9)]'
                      : 'bg-slate-700/60'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Gliding Glowing Core Orb */}
        <div
          ref={orbRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 will-change-transform"
          style={{ top: '12%' }}
        >
          {/* Ambient Outer Halo Pulse */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#f59e0b]/40 to-[#14b8a6]/40 blur-md animate-pulse" />

          {/* Core Orb Sphere */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] p-[2px] shadow-[0_0_24px_rgba(245,158,11,0.8),0_0_40px_rgba(20,184,166,0.4)]">
            <div className="w-full h-full rounded-full bg-[#050811] flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] animate-ping opacity-75" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-cream-50" />
            </div>
          </div>

          {/* Floating Telemetry Tooltip */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#0a101d]/90 border border-white/10 backdrop-blur-md opacity-0 hover:opacity-100 lg:opacity-75 transition-opacity whitespace-nowrap shadow-xl">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#fbbf24] block">
              {activeStep.agentKey || 'ORCHESTRATOR'}
            </span>
            <span className="font-display text-xs text-cream-50 uppercase tracking-wide">
              {activeStep.name}
            </span>
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW (< 768px): SLIM VERTICAL TRACK ================= */}
      <div className="md:hidden fixed left-3 top-24 bottom-24 w-5 pointer-events-none z-30 flex flex-col items-center">
        <div
          ref={mobileTrackRef}
          className="relative w-[2px] h-full bg-slate-800 rounded-full overflow-visible"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] opacity-60 rounded-full" />

          {/* Node Milestones */}
          {pipelineData.map((step, i) => {
            const topPct = (i / (pipelineData.length - 1)) * 100;
            const isActive = activeStepId === step.id;
            return (
              <div
                key={`mob-node-${step.id}`}
                className={`absolute -left-[3px] w-2 h-2 rounded-full border border-white/20 -translate-y-1/2 transition-colors ${
                  isActive
                    ? 'bg-[#fbbf24] border-[#f59e0b] shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                    : 'bg-[#050811]'
                }`}
                style={{ top: `${topPct}%` }}
              />
            );
          })}

          {/* Mobile Moving Mini Orb */}
          <div
            ref={mobileOrbRef}
            className="absolute -left-[5px] w-3 h-3 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] shadow-[0_0_12px_rgba(251,191,36,1)] -translate-y-1/2 will-change-transform flex items-center justify-center"
            style={{ top: '0%' }}
          >
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreOrb;
