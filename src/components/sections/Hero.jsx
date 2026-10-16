import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { pipelineData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { Magnetic } from '../ui/Magnetic';
import { scrollToSection } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Hero = ({ isReady = true }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineMasksRef = useRef([]);
  const roleBadgeRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageParallaxRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const heroStep = pipelineData[0];

  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      const headlineLines = headlineMasksRef.current.filter(Boolean);
      const buttons = ctaButtonsRef.current?.querySelectorAll('.hero-btn-item') || [];

      // Initial State
      gsap.set(
        [
          badgeRef.current,
          roleBadgeRef.current,
          taglineRef.current,
          imageContainerRef.current,
          ...buttons,
        ],
        {
          opacity: 0,
          y: 28,
        }
      );
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { opacity: 0, y: 40 });
      }
      if (headlineLines.length) {
        gsap.set(headlineLines, { yPercent: 125, opacity: 0 });
      }

      // If reduced motion is requested
      if (reducedMotion) {
        gsap.set(
          [
            badgeRef.current,
            roleBadgeRef.current,
            taglineRef.current,
            imageContainerRef.current,
            ...buttons,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
        if (headlineLines.length) {
          gsap.set(headlineLines, { yPercent: 0, opacity: 1 });
        }
        return;
      }

      if (!isReady) return;

      // Measured, Smooth & Professional Cascading Entrance Timeline
      const introTl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      // Step 1: Agent Label Badge
      if (badgeRef.current) {
        introTl.fromTo(
          badgeRef.current,
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
      }

      // Step 2: Line 1 - "I build"
      if (headlineLines[0]) {
        introTl.fromTo(
          headlineLines[0],
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          '-=0.35'
        );
      }

      // Step 3: Line 2 - "intelligent"
      if (headlineLines[1]) {
        introTl.fromTo(
          headlineLines[1],
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          '-=0.75'
        );
      }

      // Step 4: Line 3 - "things."
      if (headlineLines[2]) {
        introTl.fromTo(
          headlineLines[2],
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          '-=0.75'
        );
      }

      // Step 5: Giant Background Hero Image Entrance
      if (imageContainerRef.current) {
        introTl.fromTo(
          imageContainerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.85'
        );
      }

      // Step 6: Role Pill ("AI Engineer & Full-Stack Developer")
      if (roleBadgeRef.current) {
        introTl.fromTo(
          roleBadgeRef.current,
          { y: 16, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.65'
        );
      }

      // Step 7: Bio / Description text paragraph
      if (taglineRef.current) {
        introTl.fromTo(
          taglineRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // Step 8: Action Buttons ("View Projects" & "Contact Me")
      if (buttons && buttons.length) {
        introTl.fromTo(
          buttons,
          { y: 18, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.55'
        );
      }

      introTl.play();

      // Only animate on mouse movement (no idle/self-floating loop, strictly professional)
      if (imageParallaxRef.current) {
        const xTo = gsap.quickTo(imageParallaxRef.current, 'x', {
          duration: 1.0,
          ease: 'power2.out',
        });
        const yTo = gsap.quickTo(imageParallaxRef.current, 'y', {
          duration: 1.0,
          ease: 'power2.out',
        });

        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const x = (clientX / innerWidth - 0.5) * 26;
          const y = (clientY / innerHeight - 0.5) * 26;
          xTo(x);
          yTo(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }

      // Subtle, natural Parallax on scroll
      gsap.to(contentRef.current, {
        yPercent: -6,
        opacity: 0.75,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      if (imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isReady, reducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[95vh] flex flex-col justify-center overflow-visible pt-28 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Ambient Backlight Behind Giant Image */}
      <div
        className="absolute right-0 xl:right-[4%] top-[8%] w-[550px] h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-gradient-to-tr from-amber-500/12 via-teal-500/8 to-transparent blur-3xl pointer-events-none z-0 opacity-60"
        aria-hidden="true"
      />

      {/* Giant Background Hero Image extending into next section */}
      <div
        ref={imageContainerRef}
        className="absolute right-[-6%] sm:right-[-2%] md:right-0 xl:right-[2%] 2xl:right-[5%] top-[6%] sm:top-[4%] lg:top-[2%] z-10 pointer-events-none select-none will-change-transform flex justify-end"
      >
        <div ref={imageParallaxRef} className="relative will-change-transform">
          <img
            src="/images/hero-hamza.png"
            alt="Hamza - AI Engineer & Full-Stack Developer"
            className="h-[680px] sm:h-[840px] md:h-[980px] lg:h-[1180px] xl:h-[1300px] 2xl:h-[1420px] w-auto max-w-none object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] opacity-30 sm:opacity-45 lg:opacity-100"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
            }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Foreground Content Container (Z-20, Large Bold Headline, Accessible) */}
      <div className="section-container relative z-20 pointer-events-none">
        <div
          ref={contentRef}
          className="max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-start will-change-transform pointer-events-auto"
        >
          {/* Agent Label Badge */}
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
            <h1 className="font-display uppercase tracking-[0.025em] leading-[0.98] text-[clamp(3.85rem,10vw,10.5rem)] text-cream-50 pb-1">
              <span className="block overflow-hidden py-1 sm:py-1.5">
                <span
                  ref={(el) => (headlineMasksRef.current[0] = el)}
                  className="block will-change-transform"
                >
                  I build
                </span>
              </span>
              <span className="block overflow-hidden py-1 sm:py-1.5">
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
              <span className="block overflow-hidden py-1 sm:py-1.5">
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
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-400/30 text-[#fbbf24] font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>{profileData.role}</span>
            </div>
            <p
              ref={taglineRef}
              className="font-body-lg text-cream-muted max-w-xl lg:max-w-2xl mt-4 leading-relaxed"
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
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#06b6d4] text-[#02050a] font-mono text-xs sm:text-sm uppercase font-extrabold tracking-widest shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 border border-amber-300/40"
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
                  className="px-7 py-3.5 rounded-full bg-[#0a101d]/90 hover:bg-white/10 border border-white/15 hover:border-amber-400/50 text-cream-100 font-mono text-xs sm:text-sm uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                >
                  Contact Me
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
