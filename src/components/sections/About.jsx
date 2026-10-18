import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { pipelineData, memoryNodesData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  Cpu,
  Layers,
  Workflow,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Network,
  Terminal,
  Activity,
  Zap,
  ShieldCheck,
  Database,
  Bot,
  GitBranch,
  Code2
} from 'lucide-react';

export const About = () => {
  const aboutRef = useRef(null);
  const storyParagraphRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineSvgPathRef = useRef(null);
  const countersRef = useRef(null);
  const quickFactsRef = useRef(null);
  const hudRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // State for animated counters (defaults to target numbers as safety fallback)
  const [counterValues, setCounterValues] = useState(
    profileData.counters.map((c) => c.target)
  );

  // State for interactive Agent Core HUD
  const [activeHudTab, setActiveHudTab] = useState('pipeline');
  const [activeDagStep, setActiveDagStep] = useState(1);

  // Gentle auto-cycle through DAG steps to display live orchestration
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDagStep((prev) => (prev + 1) % 4);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const dagSteps = [
    {
      num: '01',
      title: 'Context & Vector Recall',
      tech: 'ChromaDB // Semantic RAG',
      desc: 'Retrieves relevant memory embeddings, documents and state history with sub-30ms latency.',
      badge: 'CONTEXT INGESTION',
      icon: Database,
    },
    {
      num: '02',
      title: 'LangGraph Orchestrator',
      tech: 'StateGraph // Multi-Agent',
      desc: 'Stateful supervisor routes execution across specialist agents with cyclic feedback loops.',
      badge: 'ACTIVE SUPERVISOR',
      icon: Bot,
    },
    {
      num: '03',
      title: 'Async Tool Execution',
      tech: 'FastAPI // Async Workers',
      desc: 'Non-blocking tool calling, external API integrations, and database state mutations.',
      badge: 'TOOL RUNTIME',
      icon: Zap,
    },
    {
      num: '04',
      title: 'Validated Output & UI',
      tech: 'Pydantic // Next.js & React',
      desc: 'Schema-validated deterministic payload streamed to reactive frontend components.',
      badge: 'PRODUCTION READY',
      icon: ShieldCheck,
    },
  ];

  const architectureSpecs = [
    {
      category: 'Orchestration Core',
      spec: 'LangGraph, CrewAI, LangChain, Anthropic & OpenAI APIs',
      highlight: 'Cyclic Multi-Agent Workflows',
    },
    {
      category: 'Backend & High-Throughput',
      spec: 'FastAPI (Python 3.12 uvloop), Node.js, Express, REST & WebSockets',
      highlight: 'Asynchronous Microservices',
    },
    {
      category: 'Vector Memory & Stores',
      spec: 'ChromaDB, Redis State Checkpoints, PostgreSQL, SQLite',
      highlight: 'Sub-40ms Embedding Retrieval',
    },
    {
      category: 'Design Philosophy',
      spec: 'Clean Architecture, Hexagonal / Ports & Adapters, Domain-Driven Design',
      highlight: 'Zero Coupling & High Testability',
    },
    {
      category: 'Frontend & Cinematic UX',
      spec: 'React 18, Next.js, GSAP 3, Tailwind CSS, Lenis Smooth Scroll',
      highlight: '60fps GPU-Accelerated UI',
    },
    {
      category: 'Infrastructure & Ops',
      spec: 'Docker Containerization, Git CI/CD, Netlify & Cloud Run',
      highlight: 'Production Battle-Tested',
    },
  ];

  const telemetryMetrics = [
    {
      label: 'Agent Determinism Rate',
      value: '99.2%',
      metric: 'Validated JSON Schemas & Pydantic',
      bar: '99%',
      color: 'from-[#f59e0b] to-[#fbbf24]',
    },
    {
      label: 'Tool Routing Accuracy',
      value: '98.6%',
      metric: 'Multi-Turn Benchmark Score',
      bar: '98%',
      color: 'from-[#14b8a6] to-[#2dd4bf]',
    },
    {
      label: 'API Pipeline Throughput',
      value: '~18ms',
      metric: 'FastAPI Async Execution (uvloop)',
      bar: '95%',
      color: 'from-[#fbbf24] to-[#14b8a6]',
    },
    {
      label: 'State Recovery & Checkpointing',
      value: '99.9%',
      metric: 'Graph Memory Persistence',
      bar: '99%',
      color: 'from-[#2dd4bf] to-cyan-400',
    },
  ];

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

      // 1. Smooth, crisp reveal of story text and HUD when in view (fully legible, crisp & bright)
      const storyWords = storyParagraphRef.current?.querySelectorAll('.story-word');
      if (storyWords && storyWords.length) {
        gsap.fromTo(
          storyWords,
          {
            opacity: 0.4,
            y: 6,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.008,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: storyParagraphRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // HUD Terminal Entrance
      if (hudRef.current) {
        gsap.fromTo(
          hudRef.current,
          {
            y: 20,
            opacity: 0.4,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: hudRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
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
            className={`quick-fact-card p-3.5 sm:p-4 rounded-xl bg-[#070c18]/80 border border-white/10 hover:border-[#fbbf24]/40 transition-colors backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 ${
              idx === 4 ? 'col-span-2 md:col-span-1' : ''
            }`}
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

      {/* Two Column Layout: Enhanced Story Text & Autonomous Agent Architecture HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
        {/* Left: Enhanced Story Text Reveal with Crystal-Clear Legibility */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Agent Memory &amp; Engineering Trajectory</span>
            </div>

            <h2 className="font-h2-fluid text-cream-50 uppercase tracking-tight leading-tight mb-6">
              From Clean Architecture Roots to Autonomous Intelligence
            </h2>

            <div
              ref={storyParagraphRef}
              className="text-base sm:text-lg lg:text-xl font-sans leading-relaxed tracking-wide text-slate-200"
            >
              {words.map((word, wIdx) => {
                const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
                const isHighlightAmber = ['langgraph', 'crewai', 'autonomous', 'multi-agent'].includes(cleanWord);
                const isHighlightTeal = ['fastapi', 'node', 'backends'].includes(cleanWord);
                const isHighlightWhite = ['clean', 'architecture', 'architectures', 'cinematic'].includes(cleanWord);

                let colorClass = 'text-slate-300';
                if (isHighlightAmber) colorClass = 'text-[#fbbf24] font-semibold';
                else if (isHighlightTeal) colorClass = 'text-[#2dd4bf] font-semibold';
                else if (isHighlightWhite) colorClass = 'text-white font-medium';

                return (
                  <span
                    key={`story-w-${wIdx}`}
                    className={`story-word inline-block mr-[0.28em] will-change-transform ${colorClass}`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Engineering Philosophy Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#070c18]/90 border border-white/10 hover:border-[#fbbf24]/40 transition-colors">
                <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] mb-1.5">
                  <Bot className="w-4 h-4 text-[#f59e0b]" />
                  <span className="font-semibold uppercase tracking-wider">Autonomous Systems</span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Building deterministic multi-agent graphs with LangGraph, persistent state channels, and self-correcting tool loops.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#070c18]/90 border border-white/10 hover:border-[#14b8a6]/40 transition-colors">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf] mb-1.5">
                  <Layers className="w-4 h-4 text-[#14b8a6]" />
                  <span className="font-semibold uppercase tracking-wider">Clean Architecture</span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Enterprise hexagonal design decoupling business logic, making systems highly testable, resilient, and ready to scale.
                </p>
              </div>
            </div>

            {/* Core Metrics Badge Banner */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#070c18] border border-[#f59e0b]/30 font-mono text-[11px] sm:text-xs text-[#fbbf24] hover:border-[#f59e0b] transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>LangGraph Multi-Agent Workflows</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#070c18] border border-[#14b8a6]/30 font-mono text-[11px] sm:text-xs text-[#2dd4bf] hover:border-[#14b8a6] transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14b8a6]" />
                <span>Full-Stack FastAPI &amp; Next.js</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#070c18] border border-white/10 font-mono text-[11px] sm:text-xs text-slate-300 hover:border-white/30 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Production Startup Founder MVP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Autonomous Agent Architecture & Telemetry Terminal */}
        <div ref={hudRef} className="lg:col-span-5 flex flex-col w-full">
          <div className="relative rounded-2xl bg-[#070c18]/90 border border-white/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(245,158,11,0.08)] overflow-hidden transition-all duration-300 hover:border-[#fbbf24]/30">
            {/* Glowing Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6]" />

            {/* Terminal Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-[#03060e]/90 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-mono text-[11px] sm:text-xs text-cream-50 uppercase tracking-wider font-semibold ml-2">
                  AGENT_CORE // RUNTIME_HUD
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="p-2 sm:p-2.5 bg-[#050914] border-b border-white/10 grid grid-cols-3 gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => setActiveHudTab('pipeline')}
                className={`px-2 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  activeHudTab === 'pipeline'
                    ? 'bg-gradient-to-r from-[#f59e0b]/20 to-[#14b8a6]/20 border border-[#fbbf24]/40 text-[#fbbf24] shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Workflow className="w-3 h-3" />
                <span className="truncate">Pipeline DAG</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveHudTab('specs')}
                className={`px-2 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  activeHudTab === 'specs'
                    ? 'bg-gradient-to-r from-[#f59e0b]/20 to-[#14b8a6]/20 border border-[#fbbf24]/40 text-[#fbbf24] shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span className="truncate">Core Specs</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveHudTab('telemetry')}
                className={`px-2 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  activeHudTab === 'telemetry'
                    ? 'bg-gradient-to-r from-[#f59e0b]/20 to-[#14b8a6]/20 border border-[#fbbf24]/40 text-[#fbbf24] shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Activity className="w-3 h-3" />
                <span className="truncate">Telemetry</span>
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="p-3.5 sm:p-5 min-h-[350px] flex flex-col justify-between">
              {/* 1. PIPELINE DAG TAB */}
              {activeHudTab === 'pipeline' && (
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase text-[#fbbf24] tracking-widest flex items-center gap-1.5">
                      <GitBranch className="w-3 h-3" />
                      <span>LangGraph State Graph Execution</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Live Loop: Auto-Sync
                    </span>
                  </div>

                  <div className="space-y-2">
                    {dagSteps.map((step, sIdx) => {
                      const StepIcon = step.icon;
                      const isCurrent = activeDagStep === sIdx;
                      return (
                        <div
                          key={`dag-${step.num}`}
                          onClick={() => setActiveDagStep(sIdx)}
                          className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-gradient-to-r from-[#0d1627] to-[#0a1f26] border-[#fbbf24]/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] scale-[1.01]'
                              : 'bg-[#03060e]/60 border-white/5 hover:border-white/15 opacity-75 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${
                                  isCurrent
                                    ? 'bg-[#fbbf24] text-[#020409]'
                                    : 'bg-white/5 text-slate-400 border border-white/10'
                                }`}
                              >
                                {step.num}
                              </div>
                              <span className="font-mono text-xs font-semibold text-cream-50">
                                {step.title}
                              </span>
                            </div>

                            <span
                              className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                                isCurrent
                                  ? 'bg-[#fbbf24]/10 border-[#fbbf24]/40 text-[#fbbf24]'
                                  : 'bg-white/5 border-white/10 text-slate-400'
                              }`}
                            >
                              {step.badge}
                            </span>
                          </div>

                          <p className="font-sans text-[11px] text-slate-400 pl-7 sm:pl-8 leading-snug">
                            {step.desc}
                          </p>

                          <div className="pl-7 sm:pl-8 mt-1.5 flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#2dd4bf]">
                              {step.tech}
                            </span>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                RUNNING
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. ARCHITECTURE SPECS TAB */}
              {activeHudTab === 'specs' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase text-[#2dd4bf] tracking-widest flex items-center gap-1.5">
                      <Code2 className="w-3 h-3" />
                      <span>Full-Stack &amp; AI Framework Stack</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Verified Production Stack
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {architectureSpecs.map((spec, sIdx) => (
                      <div
                        key={`spec-${sIdx}`}
                        className="p-2.5 sm:p-3 rounded-xl bg-[#03060e]/80 border border-white/5 hover:border-white/15 transition-colors"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#fbbf24] mb-1">
                          {spec.category}
                        </div>
                        <div className="font-sans text-xs text-cream-50 font-medium mb-1 leading-snug">
                          {spec.spec}
                        </div>
                        <div className="font-mono text-[10px] text-[#2dd4bf]">
                          ✦ {spec.highlight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. LIVE TELEMETRY TAB */}
              {activeHudTab === 'telemetry' && (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase text-[#fbbf24] tracking-widest flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#fbbf24]" />
                      <span>Autonomous System Health &amp; Benchmarks</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      HEALTHY
                    </span>
                  </div>

                  <div className="space-y-3">
                    {telemetryMetrics.map((item, mIdx) => (
                      <div
                        key={`metric-${mIdx}`}
                        className="p-2.5 sm:p-3 rounded-xl bg-[#03060e]/80 border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-sans text-xs text-slate-300 font-medium">
                            {item.label}
                          </span>
                          <span className="font-mono text-xs font-bold text-cream-50">
                            {item.value}
                          </span>
                        </div>

                        {/* Meter Progress Bar */}
                        <div className="h-1.5 sm:h-2 w-full rounded-full bg-white/5 overflow-hidden mb-1.5">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                            style={{ width: item.bar }}
                          />
                        </div>

                        <div className="font-mono text-[10px] text-slate-400">
                          {item.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Terminal Footer Strip */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#fbbf24]" />
                  <span>HAMZA_AI // UTC+5</span>
                </span>
                <span className="text-[#2dd4bf] font-semibold">
                  DISPATCH_READY
                </span>
              </div>
            </div>
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

      {/* Neural Memory Path: Milestones as Memory Nodes with Fixed Full-Screen Background Image */}
      <div
        ref={timelineRef}
        className="relative -mx-[clamp(1.25rem,5vw,4rem)] px-[clamp(1.25rem,5vw,4rem)] py-20 sm:py-28 my-14 rounded-3xl overflow-hidden isolate shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10"
      >
        {/* Full-bleed Fixed Background Image */}
        <div
          className="absolute inset-0 -z-20 bg-fixed bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/about-image.png')",
          }}
          aria-hidden="true"
        />

        {/* Multi-layer Dark Vignette & Gradient Overlays for Readability and Seamless Blending */}
        <div
          className="absolute inset-0 -z-10 bg-[#050811]/70 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050811] via-transparent to-[#050811]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050811]/60 via-transparent to-[#050811]/60"
          aria-hidden="true"
        />

        <div className="mb-14 text-center max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-3 px-3.5 py-1.5 rounded-full bg-[#070c18]/90 border border-[#fbbf24]/30 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Network className="w-4 h-4 text-[#14b8a6]" />
            <span>Neural Memory Path</span>
          </div>
          <h3 className="font-h2-fluid text-cream-50 uppercase tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            System Timeline &amp; Memory Nodes
          </h3>
          <p className="font-sans text-sm sm:text-base text-slate-200 mt-2 max-w-xl mx-auto font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#060a15]/92 border border-white/15 hover:border-[#fbbf24]/50 transition-all backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(0,0,0,0.4)]">
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

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-300 mb-3">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#f59e0b]" />
                          {node.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#14b8a6]" />
                          {node.period}
                        </span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
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
