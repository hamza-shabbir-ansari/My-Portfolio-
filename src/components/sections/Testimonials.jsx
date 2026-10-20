import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { testimonialsData } from '../../data/testimonials';
import { pipelineData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Star, MessageSquareCode, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const feedbackStep = pipelineData.find((s) => s.id === 'testimonials') || pipelineData[4];

  // Divide testimonials into 2 rows for desktop marquee
  const row1 = [...testimonialsData.slice(0, 3), ...testimonialsData.slice(0, 3)];
  const row2 = [...testimonialsData.slice(3, 6), ...testimonialsData.slice(3, 6)];

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // === DESKTOP MARQUEE DYNAMICS (>= 1024px) ===
      mm.add('(min-width: 1024px)', () => {
        // Continuous auto marquee row 1 (moving left)
        const tween1 = gsap.to(row1Ref.current, {
          xPercent: -50,
          ease: 'none',
          duration: 32,
          repeat: -1,
        });

        // Continuous auto marquee row 2 (moving right)
        gsap.set(row2Ref.current, { xPercent: -50 });
        const tween2 = gsap.to(row2Ref.current, {
          xPercent: 0,
          ease: 'none',
          duration: 32,
          repeat: -1,
        });

        // Modulate speed with scroll velocity
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity() / 300);
            const timeScale = Math.min(3.5, 1 + velocity);
            gsap.to([tween1, tween2], {
              timeScale: timeScale,
              duration: 0.3,
              overwrite: 'auto',
            });
          },
        });

        // Pause on hover
        const handleMouseEnter = () => {
          gsap.to([tween1, tween2], { timeScale: 0.15, duration: 0.4 });
        };
        const handleMouseLeave = () => {
          gsap.to([tween1, tween2], { timeScale: 1, duration: 0.6 });
        };

        const r1 = row1Ref.current;
        const r2 = row2Ref.current;
        if (r1) {
          r1.addEventListener('mouseenter', handleMouseEnter);
          r1.addEventListener('mouseleave', handleMouseLeave);
        }
        if (r2) {
          r2.addEventListener('mouseenter', handleMouseEnter);
          r2.addEventListener('mouseleave', handleMouseLeave);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1 text-[#fbbf24]">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" />
      ))}
    </div>
  );

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative section-spacing section-container overflow-hidden pt-16 pb-24"
    >
      {/* Agent Header */}
      <div className="mb-10">
        <AgentLabel
          agent={feedbackStep.agentKey || 'AGENT 04'}
          name={feedbackStep.name}
          status="active"
          subtitle={feedbackStep.subtext}
        />
      </div>

      <div className="mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-3">
          <MessageSquareCode className="w-3.5 h-3.5 text-[#14b8a6]" />
          <span>Collaborator Dispatches &amp; Logs</span>
        </div>
        <h2 className="font-h1-fluid text-cream-50 uppercase tracking-tight leading-none mb-3">
          System Feedback &amp; Reports
        </h2>
        <p className="font-body-lg text-cream-muted leading-relaxed">
          Verifications and direct reviews from startup founders, engineering leads, and technical teams.
        </p>
      </div>

      {/* ================= REVIEWS SHOWCASE (SEAMLESS FULL BACKGROUND) ================= */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 py-10 sm:py-14 select-none overflow-hidden my-2">
        {/* Full Seamless Background Image Layer (No Box, No Border) */}
        <div className="absolute inset-0 pointer-events-none -z-0">
          <img
            src="/images/review-bg.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_68%] select-none opacity-90"
          />
          {/* Seamless top and bottom soft blends into page background */}
          <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#050811] via-[#050811]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-transparent pointer-events-none" />
          {/* Subtle side edge fades for smooth marquee entry and exit */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#050811] via-[#050811]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#050811] via-[#050811]/70 to-transparent z-10 pointer-events-none" />
        </div>

        {/* ================= DESKTOP DUAL-ROW MARQUEE (>= 1024px) ================= */}
        <div className="hidden lg:flex flex-col gap-6 relative z-10">
          {/* Row 1: Leftward (Teal Themed) */}
          <div className="overflow-hidden">
            <div ref={row1Ref} className="flex gap-6 w-max will-change-transform py-1">
              {row1.map((item, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="w-[420px] rounded-3xl bg-[#070c18]/80 hover:bg-[#070c18]/90 border border-white/10 hover:border-[#14b8a6]/50 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#14b8a6]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#2dd4bf] font-medium">
                          {item.logId}
                        </span>
                      </div>
                      {renderStars(item.rating)}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <h4 className="font-display text-lg uppercase tracking-wide text-cream-50 leading-none">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[11px] text-cream-muted mt-0.5">
                        {item.role} • <span className="text-[#fbbf24]">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward (Amber Themed) */}
          <div className="overflow-hidden">
            <div ref={row2Ref} className="flex gap-6 w-max will-change-transform py-1">
              {row2.map((item, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="w-[420px] rounded-3xl bg-[#070c18]/80 hover:bg-[#070c18]/90 border border-white/10 hover:border-[#fbbf24]/50 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#fbbf24] font-medium">
                          {item.logId}
                        </span>
                      </div>
                      {renderStars(item.rating)}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <h4 className="font-display text-lg uppercase tracking-wide text-cream-50 leading-none">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[11px] text-cream-muted mt-0.5">
                        {item.role} • <span className="text-[#2dd4bf]">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MOBILE SWIPEABLE CAROUSEL (< 1024px) ================= */}
        <div className="lg:hidden flex flex-col relative z-10 px-4 sm:px-8 max-w-xl mx-auto">
          <div className="relative rounded-3xl bg-[#070c18]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs text-[#fbbf24] uppercase font-semibold">
                {testimonialsData[mobileIndex].logId}
              </span>
              {renderStars(testimonialsData[mobileIndex].rating)}
            </div>

            <p className="font-sans text-sm sm:text-base text-cream-100 italic leading-relaxed mb-6">
              "{testimonialsData[mobileIndex].quote}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <img
                src={testimonialsData[mobileIndex].avatar}
                alt={testimonialsData[mobileIndex].name}
                className="w-11 h-11 rounded-full border border-white/15"
              />
              <div>
                <h4 className="font-display text-xl uppercase tracking-wide text-cream-50">
                  {testimonialsData[mobileIndex].name}
                </h4>
                <p className="font-mono text-xs text-cream-muted">
                  {testimonialsData[mobileIndex].role} • {testimonialsData[mobileIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={() =>
                setMobileIndex((prev) => (prev > 0 ? prev - 1 : testimonialsData.length - 1))
              }
              className="w-10 h-10 rounded-full bg-[#070c18] border border-white/15 flex items-center justify-center text-cream-100 hover:text-[#fbbf24]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => setMobileIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    mobileIndex === i
                      ? 'w-6 bg-gradient-to-r from-[#f59e0b] to-[#14b8a6]'
                      : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setMobileIndex((prev) => (prev < testimonialsData.length - 1 ? prev + 1 : 0))
              }
              className="w-10 h-10 rounded-full bg-[#070c18] border border-white/15 flex items-center justify-center text-cream-100 hover:text-[#fbbf24]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
