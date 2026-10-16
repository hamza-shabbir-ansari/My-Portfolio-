import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { pipelineData, memoryNodesData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { RevealImage } from '../ui/RevealImage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  Cpu,
  Layers,
  Workflow,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Network
} from 'lucide-react';

export const About = () => {
  const aboutRef = useRef(null);
  const storyParagraphRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineSvgPathRef = useRef(null);
  const countersRef = useRef(null);
  const quickFactsRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // State for animated counters (defaults to target numbers as safety fallback)
  const [counterValues, setCounterValues] = useState(
    profileData.counters.map((c) => c.target)
  );

  const aboutStep = pipelineData.find((s) => s.id === 'about') || pipelineData[1];

  useLayoutEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 0. Quick Scan Cards - Clean, smooth show & hide with reversible ScrollTrigger
      const quickCards = quickFactsRef.current?.querySelectorAll('.quick-fact-card');
      if (quickCards && quickCards.length) {
        gsap.fromTo(
          quickCards,
          {
            y: 22,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quickFactsRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 1. Scrubbed word-by-word highlight text reveal
      const storyWords = storyParagraphRef.current?.querySelectorAll('.story-word');
      if (storyWords && storyWords.length) {
        gsap.fromTo(
          storyWords,
          {
            opacity: 0.2,
            color: '#64748b',
          },
          {
            opacity: 1,
            color: '#f8fafc',
            duration: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: storyParagraphRef.current,
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Animated Counters (Counts up when visible, resets on reverse)
      if (countersRef.current) {
        const dummyObjects = profileData.counters.map(() => ({ val: 0 }));

        ScrollTrigger.create({
          trigger: countersRef.current,
          start: 'top 85%',
          onEnter: () => {
            dummyObjects.forEach((obj, idx) => {
              obj.val = 0;
              gsap.to(obj, {
                val: profileData.counters[idx].target,
                duration: 1.8,
                ease: 'power3.out',
                onUpdate: () => {
                  setCounterValues((prev) => {
                    const next = [...prev];
                    next[idx] = Math.round(obj.val);
                    return next;
                  });
                },
              });
            });
          },
          onEnterBack: () => {
            dummyObjects.forEach((obj, idx) => {
              obj.val = 0;
              gsap.to(obj, {
                val: profileData.counters[idx].target,
                duration: 1.8,
                ease: 'power3.out',
                onUpdate: () => {
                  setCounterValues((prev) => {
                    const next = [...prev];
                    next[idx] = Math.round(obj.val);
                    return next;
                  });
                },
              });
            });
          },
          onLeaveBack: () => {
            dummyObjects.forEach((obj, idx) => {
              obj.val = 0;
              setCounterValues((prev) => {
                const next = [...prev];
                next[idx] = 0;
                return next;
              });
            });
          },
        });
      }

      // 3. Neural Path SVG draw (scrubbed & reversible)
      const pathEl = timelineSvgPathRef.current;
      if (pathEl) {
        const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 800;
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathEl, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: 0.8,
          },
        });
      }

      // 4. Memory Node Cards slide in (reversible)
      const memoryCards = timelineRef.current?.querySelectorAll('.memory-node-card');
      if (memoryCards && memoryCards.length) {
        memoryCards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 45,
              opacity: 0,
              scale: 0.96,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      }

      // 5. Skill Chips stagger reveal
      const skillGroups = el.querySelectorAll('.skill-group-container');
      if (skillGroups && skillGroups.length) {
        skillGroups.forEach((group) => {
          const chips = group.querySelectorAll('.skill-chip');
          gsap.fromTo(
            chips,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.04,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const words = profileData.aboutStory.split(' ');

  const getSkillIcon = (index) => {
    switch (index) {
      case 0:
        return <Cpu className="w-4 h-4 text-[#fbbf24]" />;
      case 1:
        return <Layers className="w-4 h-4 text-[#14b8a6]" />;
      default:
        return <Workflow className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      className="section-spacing section-container overflow-hidden pt-16 pb-24"
    >
      {/* Agent Header */}
      <div className="mb-12">
        <AgentLabel
          agent={aboutStep.agentKey || 'AGENT 01'}
          name={aboutStep.name}
          status="active"
          subtitle={aboutStep.subtext}
        />
      </div>

      {/* Recruiter Quick Scan Row */}
      <div
        ref={quickFactsRef}
        className="mb-16 grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4"
      >
        {profileData.quickFacts.map((fact, idx) => (
          <div
            key={`fact-${idx}`}
            className="quick-fact-card p-3.5 sm:p-4 rounded-xl bg-[#070c18]/80 border border-white/10 hover:border-[#fbbf24]/40 transition-colors backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#fbbf24] block mb-1">
              {fact.label}
            </span>
            <span className="font-sans font-medium text-xs sm:text-sm text-cream-50 leading-snug block">
              {fact.value}
            </span>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Scrubbed Story Text & Portrait Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
        {/* Left: Scrubbed Text Reveal */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agent Memory &amp; Engineering Trajectory</span>
          </div>

          <h2 className="font-h2-fluid text-cream-50 uppercase tracking-tight leading-tight mb-6">
            From Clean Architecture Roots to Autonomous Intelligence
          </h2>

          <div
            ref={storyParagraphRef}
            className="text-base sm:text-lg lg:text-xl font-sans leading-relaxed tracking-wide text-slate-400"
          >
            {words.map((word, wIdx) => (
              <span
                key={`story-w-${wIdx}`}
                className="story-word inline-block mr-[0.28em] will-change-transform transition-colors"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Core Metrics Badge Banner */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070c18] border border-[#f59e0b]/30 font-mono text-xs text-[#fbbf24]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>LangGraph Multi-Agent Workflows</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070c18] border border-[#14b8a6]/30 font-mono text-xs text-[#2dd4bf]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#14b8a6]" />
              <span>Full-Stack FastAPI &amp; Next.js</span>
            </div>
          </div>
        </div>

        {/* Right: Large Portrait Image Slot with Parallax */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[420px]">
            <RevealImage
              src="/images/portrait-hamza.svg"
              alt="Hamza portrait visual"
              aspectRatio="aspect-[4/5]"
              parallaxSpeed={12}
              className="shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)]"
            />
          </div>
        </div>
      </div>

      {/* Animated Numerical Counters Row */}
      <div
        ref={countersRef}
        className="mb-24 p-6 sm:p-8 rounded-2xl bg-[#070c18]/60 border border-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
      >
        {profileData.counters.map((c, idx) => (
          <div key={`counter-${idx}`} className="flex flex-col items-center">
            <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6]">
                {counterValues[idx]}
              </span>
              <span className="text-[#fbbf24]">{c.suffix}</span>
            </div>
            <span className="font-mono text-xs sm:text-sm text-cream-muted uppercase tracking-widest mt-2">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Skills in 3 Groups with Gradient Chips */}
      <div className="mb-24">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#fbbf24] uppercase tracking-widest block mb-1">
            Technical Repertoire
          </span>
          <h3 className="font-h2-fluid text-cream-50 uppercase tracking-tight">
            Specialized Stack Across 3 Domains
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profileData.skillGroups.map((group, gIdx) => (
            <div
              key={`grp-${gIdx}`}
              className="skill-group-container p-6 rounded-2xl bg-[#070c18]/80 border border-white/10 hover:border-[#fbbf24]/30 transition-all backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-lg bg-[#03060e] border border-white/10">
                    {getSkillIcon(gIdx)}
                  </div>
                  <h4 className="font-display text-xl uppercase tracking-wider text-cream-50">
                    {group.group}
                  </h4>
                </div>
                <p className="font-sans text-xs text-cream-muted mb-6">
                  {group.highlight}
                </p>

                {/* Animated Gradient Chips */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={`skill-${gIdx}-${sIdx}`}
                      className="skill-chip px-3 py-1.5 rounded-lg bg-[#03060e]/80 border border-white/5 text-xs font-mono text-cream-100 hover:border-[#f59e0b] hover:text-[#fbbf24] hover:shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neural Memory Path: Milestones as Memory Nodes */}
      <div ref={timelineRef} className="relative">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-2">
            <Network className="w-4 h-4 text-[#14b8a6]" />
            <span>Neural Memory Path</span>
          </div>
          <h3 className="font-h2-fluid text-cream-50 uppercase tracking-tight">
            System Timeline &amp; Memory Nodes
          </h3>
          <p className="font-sans text-sm text-cream-muted mt-2">
            Evolution from software engineering fundamentals to autonomous multi-agent pipelines and startup MVP.
          </p>
        </div>

        {/* Neural Path Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical SVG Neural Path Line drawn with ScrollTrigger scrub */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-6 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 24 1000"
              preserveAspectRatio="none"
            >
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="1000"
                stroke="#1e293b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line
                ref={timelineSvgPathRef}
                x1="12"
                y1="0"
                x2="12"
                y2="1000"
                stroke="url(#neuralGrad)"
                strokeWidth="3.5"
              />
              <defs>
                <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Memory Node Cards */}
          <div className="space-y-12 relative z-10 pl-14 md:pl-0">
            {memoryNodesData.map((node, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={`node-${idx}`}
                  className={`memory-node-card md:flex items-center ${isEven ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  <div className="md:w-1/2 md:px-8">
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#070c18]/90 border border-white/10 hover:border-[#fbbf24]/40 transition-all backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-[#fbbf24] uppercase tracking-wider">
                          Node {node.nodeNumber} // {node.nodeTitle || 'State'}
                        </span>
                        <span className="font-mono text-[10px] text-cream-muted px-2 py-0.5 rounded bg-white/5 border border-white/10">
                          {node.tag}
                        </span>
                      </div>

                      <h4 className="font-display text-2xl uppercase tracking-wide text-cream-50 leading-tight mb-1">
                        {node.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-cream-muted mb-3">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#f59e0b]" />
                          {node.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#14b8a6]" />
                          {node.period}
                        </span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-cream-muted leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  {/* Neural Node Connector Anchor */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#03060e] border-2 border-[#fbbf24] flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6]" />
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
