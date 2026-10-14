import React, { useState, useEffect } from 'react';
import { pipelineData } from '../../data/timeline';
import { scrollToSection } from '../../hooks/useLenis';
import { ScrollTrigger } from '../../lib/gsap';

export const PipelineProgress = ({ isTopNavVisible = true, className = '' }) => {
  const [activeStepId, setActiveStepId] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    // Setup ScrollTriggers for each pipeline step section
    const triggers = pipelineData.map((step) => {
      const sectionEl = document.getElementById(step.id);
      if (!sectionEl) return null;

      return ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => setActiveStepId(step.id),
        onEnterBack: () => setActiveStepId(step.id),
      });
    });

    // Detect when user enters footer section to smoothly hide bottom navbar
    let footerTrigger = null;
    const footerEl = document.getElementById('footer');
    if (footerEl) {
      footerTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: 'top 85%',
        onEnter: () => setIsInFooter(true),
        onLeaveBack: () => setIsInFooter(false),
        onEnterBack: () => setIsInFooter(false),
      });
    }

    // Global scroll progress listener
    const globalProgressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(Math.round(self.progress * 100));
      },
    });

    return () => {
      triggers.forEach((t) => t && t.kill());
      footerTrigger && footerTrigger.kill();
      globalProgressTrigger && globalProgressTrigger.kill();
    };
  }, []);

  // Show bottom navbar ONLY when top navbar is hidden AND user is not in footer
  const shouldShow = !isTopNavVisible && !isInFooter;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:block pointer-events-none"
      aria-hidden={!shouldShow}
    >
      <nav
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#03060e]/90 backdrop-blur-md border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.18)] transition-all duration-500 ease-out ${
          shouldShow
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-8 opacity-0 pointer-events-none'
        } ${className}`}
        aria-label="Multi-agent pipeline progress"
      >
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/10 mr-1">
          <span className="font-mono text-[10px] tracking-wider text-[#fbbf24] font-semibold uppercase">
            PIPELINE
          </span>
          <span className="font-mono text-[10px] text-cream-muted">
            {scrollProgress}%
          </span>
        </div>

        <div className="flex items-center gap-1">
          {pipelineData.map((step, idx) => {
            const isActive = activeStepId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => scrollToSection(step.id)}
                className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white/10 text-cream-50 font-medium border border-white/20 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'text-cream-muted hover:text-cream-50 hover:bg-white/5 border border-transparent'
                }`}
                title={`${step.name}: ${step.tagline || ''}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] scale-125 shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                      : 'bg-slate-600 group-hover:bg-slate-400'
                  }`}
                />
                <span className="tracking-wide">
                  {step.navLabel}
                </span>

                {/* Connecting line to next step */}
                {idx < pipelineData.length - 1 && (
                  <span className="hidden xl:inline-block w-2 h-[1px] bg-white/10 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default PipelineProgress;
