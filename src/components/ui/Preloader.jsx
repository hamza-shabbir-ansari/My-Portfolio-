import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Terminal, ShieldCheck, Cpu } from 'lucide-react';

const BOOT_LOGS = [
  'Initializing multi-agent runtime environment...',
  'Loading vector memory & dynamic context embeddings...',
  'Connecting LangGraph orchestrator & tool execution bridges...',
  'All 5 pipeline agents online. System ready for dispatch.',
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Check session storage
    const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_visited');

    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    if (hasVisited) {
      // Instant skip on repeat visits
      const quickTimer = setTimeout(() => {
        document.body.style.overflow = '';
        setIsVisible(false);
        if (onComplete) onComplete();
        ScrollTrigger.refresh();
      }, 40);
      return () => clearTimeout(quickTimer);
    }

    // 0.45s snappy boot sequence animation
    const duration = 450;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      const logIdx = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((elapsed / duration) * BOOT_LOGS.length)
      );
      setActiveLogIndex(logIdx);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        // Completed loading, animate transition
        try {
          sessionStorage.setItem('portfolio_visited', 'true');
        } catch {
          // ignore storage error
        }

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = '';
              setIsVisible(false);
              if (onComplete) onComplete();
              ScrollTrigger.refresh();
            },
          });

          tl.to(cardRef.current, {
            y: -30,
            scale: 0.98,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          }).to(
            overlayRef.current,
            {
              opacity: 0,
              duration: 0.2,
              ease: 'power2.out',
            },
            '-=0.1'
          );
        });

        return () => ctx.revert();
      }
    };

    const animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03060e] px-4 select-none"
      style={{ zIndex: 99999 }}
      aria-label="System boot initialization"
    >
      {/* Terminal System Boot Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-lg rounded-2xl bg-[#070c18] border border-white/10 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.15)] overflow-hidden"
      >
        {/* Glow corner accents */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#f59e0b]/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-[#14b8a6]/15 to-transparent pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cream-100 flex items-center gap-1.5 ml-2">
              <Terminal className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>ORCHESTRATOR BOOT</span>
            </span>
          </div>
          <span className="font-mono text-[11px] text-cream-muted uppercase">
            v2.5 // CORE
          </span>
        </div>

        {/* System Meta Telemetry */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#03060e]/80 border border-white/5">
            <div className="text-[10px] text-cream-muted uppercase tracking-wider">
              System Architect
            </div>
            <div className="text-cream-50 font-sans font-semibold text-sm mt-0.5">
              {profileData.name}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#03060e]/80 border border-white/5">
            <div className="text-[10px] text-cream-muted uppercase tracking-wider">
              Runtime Target
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MULTI-AGENT NET</span>
            </div>
          </div>
        </div>

        {/* Live Typing Boot Logs */}
        <div className="mt-5 p-3.5 rounded-xl bg-[#03060e] border border-white/5 font-mono text-xs text-cream-muted space-y-1.5 min-h-[96px]">
          {BOOT_LOGS.slice(0, activeLogIndex + 1).map((log, idx) => (
            <div
              key={`boot-log-${idx}`}
              className={`flex items-start gap-2 leading-relaxed ${
                idx === activeLogIndex ? 'text-[#fbbf24]' : 'text-cream-muted/70'
              }`}
            >
              <span className="text-[#14b8a6] select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Gradient Progress Bar & Percentage */}
        <div className="mt-6">
          <div className="flex items-center justify-between font-mono text-xs mb-2">
            <span className="text-cream-muted uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Pipeline Sync</span>
            </span>
            <span className="text-[#fbbf24] font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(245,158,11,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-cream-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#14b8a6]" />
            <span>Autonomous State Engines Nominal</span>
          </span>
          <span className="text-cream-muted uppercase tracking-widest">
            Karachi, PK
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
