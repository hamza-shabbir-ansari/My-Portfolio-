import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const AgentLabel = ({
  agent = 'AGENT 01',
  name = 'CONTEXT',
  status = 'active',
  subtitle = '',
  className = '',
}) => {
  const labelRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = labelRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, labelRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={labelRef}
      className={`inline-flex flex-col items-start gap-1 p-3.5 sm:p-4 rounded-2xl bg-[#0a101d]/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(245,158,11,0.1)] ${className}`}
    >
      <div className="flex items-center gap-2.5 w-full">
        {/* Status indicator dot */}
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f59e0b]" />
        </span>
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#fbbf24] uppercase">
          {agent}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
          {status}
        </span>
      </div>

      <div className="mt-1 flex items-baseline gap-3">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wider text-cream-50 uppercase leading-none">
          {name}
        </h2>
      </div>

      {subtitle && (
        <p className="text-xs sm:text-sm text-cream-muted font-sans font-light tracking-wide mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AgentLabel;
