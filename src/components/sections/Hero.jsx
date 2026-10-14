import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { pipelineData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { Magnetic } from '../ui/Magnetic';
import { scrollToSection } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

export const Hero = ({ isReady = true }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineMasksRef = useRef([]);
  const roleBadgeRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const scrollCueRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const heroStep = pipelineData[0];

  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation timeline (smooth, crisp & cinematic)
      const headlineLines = headlineMasksRef.current.filter(Boolean);
      const introTl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: 'power3.out' },
      });

      // A. Agent Label Badge
      if (badgeRef.current) {
        introTl.fromTo(
          badgeRef.current,
          { y: -18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 }
        );
      }

      // B. Giant 3-Line Headline reveal
      if (headlineLines.length) {
        introTl.fromTo(
          headlineLines,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.35'
        );
      }

      // C. Role pill badge ("AI Engineer & Full-Stack Developer")
      if (roleBadgeRef.current) {
        introTl.fromTo(
          roleBadgeRef.current,
          { y: 18, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.5)',
          },
          '-=0.45'
        );
      }

      // D. Tagline & Short Intro paragraph text
      if (taglineRef.current) {
        introTl.fromTo(
          taglineRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.35'
        );
      }

      // E. CTA action buttons entrance
      if (ctaButtonsRef.current) {
        introTl.fromTo(
          ctaButtonsRef.current.querySelectorAll('.hero-btn-item'),
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.45'
        );
      }

      // F. Right visual image card
      if (imageWrapperRef.current) {
        introTl.fromTo(
          imageWrapperRef.current,
          { scale: 0.92, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.8'
        );
      }

      // 2. Parallax scroll effect
      gsap.to(contentRef.current, {
        yPercent: -20,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // 3. Ken Burns subtle zoom on hero graphic
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current.querySelector('img'), {
          scale: 1.1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 4. Bobbing scroll cue
      if (scrollCueRef.current) {
        gsap.to(scrollCueRef.current, {
          y: 7,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center section-container overflow-hidden pt-24 pb-16"
    >
      <div
        ref={contentRef}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center will-change-transform"
      >
        {/* Left Column: Agent Badge & Headline */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div ref={badgeRef} className="mb-6">
            <AgentLabel
              agent={heroStep.agentKey || 'SYSTEM / 00'}
              name={heroStep.name}
              status="active"
              subtitle={heroStep.subtext}
            />
          </div>

          {/* Giant Headline with Line Mask Reveal */}
          <div className="overflow-visible w-full">
            <h1 className="font-display-fluid text-cream-50 uppercase tracking-tight leading-[0.98] pb-1">
              <span className="block overflow-hidden py-0.5">
                <span
                  ref={(el) => (headlineMasksRef.current[0] = el)}
                  className="block will-change-transform"
                >
                  I build
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span
                  ref={(el) => (headlineMasksRef.current[1] = el)}
                  className="inline-block will-change-transform font-bold text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #f59e0b 0%, #fbbf24 35%, #14b8a6 75%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  intelligent
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span
                  ref={(el) => (headlineMasksRef.current[2] = el)}
                  className="block will-change-transform text-cream-50"
                >
                  things.
                </span>
              </span>
            </h1>
          </div>

          {/* Subline & Role Intro */}
          <div className="mt-6">
            <div
              ref={roleBadgeRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-400/30 text-[#fbbf24] font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>{profileData.role}</span>
            </div>
            <p
              ref={taglineRef}
              className="font-body-lg text-cream-muted max-w-xl mt-4 leading-relaxed"
            >
              {profileData.tagline} {profileData.shortIntro}
            </p>
          </div>

          {/* Action Buttons */}
          <div ref={ctaButtonsRef} className="mt-8 flex flex-wrap items-center gap-4">
            <div className="hero-btn-item">
              <Magnetic strength={0.3}>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#06b6d4] text-[#02050a] font-mono text-xs sm:text-sm uppercase font-extrabold tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.55),0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.85),0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 border border-amber-300/40"
                >
                  <span>View Projects</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </button>
              </Magnetic>
            </div>

            <div className="hero-btn-item">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-7 py-3.5 rounded-full bg-[#0a101d]/90 hover:bg-white/10 border border-white/15 hover:border-amber-400/50 text-cream-100 font-mono text-xs sm:text-sm uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  Contact Me
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Right Column: Cinematic Frame with Ambient Light */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={imageWrapperRef}
            className="hero-fade-in relative w-full max-w-[460px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#070c18] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(245,158,11,0.15)]"
          >
            {/* Ambient Radial Gradient Aura */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 75% 25%, rgba(251, 191, 36, 0.2) 0%, transparent 60%)',
              }}
            />

            <img
              src="/images/hero-cinematic.svg"
              alt="Hamza cinematic visual terminal"
              className="w-full h-full object-cover object-center will-change-transform scale-100 transition-transform duration-1000 ease-out"
              loading="eager"
            />

            {/* Bottom Telemetry Card overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-xl bg-[#03060e]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#fbbf24] uppercase tracking-wider block">
                  Core Runtime
                </span>
                <span className="font-display text-sm tracking-wide text-cream-50 uppercase">
                  Karachi • All Agents Nominal
                </span>
              </div>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14b8a6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14b8a6]" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue at Bottom */}
      <div
        ref={scrollCueRef}
        className="hero-fade-in absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-auto"
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-cream-muted hover:text-[#fbbf24] transition-colors">
          Scroll to run the pipeline
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#fbbf24]" />
      </div>
    </section>
  );
};

export default Hero;
