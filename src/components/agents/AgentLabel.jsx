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
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        }
      );
    }, labelRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={labelRef}
      className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0a101d]/85 backdrop-blur-md border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.35),0_0_12px_rgba(245,158,11,0.06)] max-w-full ${className}`}
    >
      {/* Status indicator dot */}
      <span className="flex h-2 w-2 relative shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]" />
      </span>

      {/* Agent Key */}
      <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-[#fbbf24] uppercase shrink-0">
        {agent}
      </span>

      <span className="text-white/20 text-[10px] sm:text-xs font-mono shrink-0">/</span>

      {/* Step Name */}
      <span className="font-mono text-[10px] sm:text-xs font-medium tracking-wide text-cream-100 uppercase truncate">
        {name}
      </span>

      {/* Status Badge */}
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shrink-0">
        {status}
      </span>
    </div>
  );
};

export default AgentLabel;
