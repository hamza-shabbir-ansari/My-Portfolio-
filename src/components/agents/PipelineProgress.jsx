import React, { useState, useEffect, useRef } from 'react';
import { pipelineData } from '../../data/timeline';
import { scrollToSection } from '../../hooks/useLenis';
import { ScrollTrigger } from '../../lib/gsap';

export const PipelineProgress = ({ isTopNavVisible = true, className = '' }) => {
  const [activeStepId, setActiveStepId] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInFooter, setIsInFooter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const buttonGroupRef = useRef(null);
  const buttonsRef = useRef({});

  // Listen for modal open/close events to smoothly hide/show the bottom navbar
  useEffect(() => {
    const handleModalToggle = (e) => {
      setIsModalOpen(Boolean(e.detail?.isOpen));
    };

    window.addEventListener('portfolio:modal-change', handleModalToggle);
    return () => {
      window.removeEventListener('portfolio:modal-change', handleModalToggle);
    };
  }, []);

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

  // Update position of the sliding liquid glass indicator
  useEffect(() => {
    const updateIndicator = () => {
      const groupEl = buttonGroupRef.current;
      const activeBtn = buttonsRef.current[activeStepId];
      if (groupEl && activeBtn) {
        const groupRect = groupEl.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        setIndicatorStyle({
          left: btnRect.left - groupRect.left,
          top: btnRect.top - groupRect.top,
          width: btnRect.width,
          height: btnRect.height,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    // Re-check after layout transitions
    const timeout = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeStepId]);

  // Show bottom navbar ONLY when top navbar is hidden, user is not in footer, AND no modal is open
  const shouldShow = !isTopNavVisible && !isInFooter && !isModalOpen;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:block pointer-events-none"
      aria-hidden={!shouldShow}
    >
      <nav
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-500 ease-out overflow-hidden ${
          shouldShow
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-8 opacity-0 pointer-events-none'
        } ${className}`}
        style={{
          background: 'rgba(5, 8, 17, 0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        aria-label="Multi-agent pipeline progress"
      >
        {/* Specular Apple Glass Top Rim Reflection */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Ambient Moving Glass Sheen Reflection */}
        <div
          className="absolute -inset-y-2 w-28 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -skew-x-12 animate-glass-shine"
          aria-hidden="true"
        />

        {/* Left Status Metric */}
        <div className="relative z-10 flex items-center gap-1.5 pr-3 border-r border-white/15 mr-1 select-none">
          <span className="font-mono text-[10px] tracking-widest text-[#fbbf24] font-bold uppercase">
            PIPELINE
          </span>
          <span className="font-mono text-[10px] text-cream-100 font-semibold">
            {scrollProgress}%
          </span>
        </div>

        {/* Step Navigation Button Group with Sliding Glass Indicator */}
        <div ref={buttonGroupRef} className="relative flex items-center gap-1">
          {/* Fluid Sliding Active Glass Indicator Pill (Apple Spring physics) */}
          <span
            className="absolute rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-md pointer-events-none"
            style={{
              transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
              width: `${indicatorStyle.width}px`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          {pipelineData.map((step) => {
            const isActive = activeStepId === step.id;
            return (
              <button
                key={step.id}
                ref={(el) => (buttonsRef.current[step.id] = el)}
                onClick={() => scrollToSection(step.id)}
                className={`group relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'text-cream-50 font-bold'
                    : 'text-cream-muted hover:text-cream-50'
                }`}
                title={`${step.name}: ${step.tagline || ''}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] scale-125 shadow-[0_0_10px_rgba(251,191,36,0.9)]'
                      : 'bg-slate-400/50 group-hover:bg-slate-200'
                  }`}
                />
                <span className="tracking-wider text-[11px] uppercase">
                  {step.navLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default PipelineProgress;
