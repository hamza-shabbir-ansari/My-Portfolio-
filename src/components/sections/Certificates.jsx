import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { certificatesData } from '../../data/certificates';
import { pipelineData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Award, ExternalLink, Eye, X, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

export const Certificates = () => {
  const containerRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const [lightboxCert, setLightboxCert] = useState(null);
  const reducedMotion = useReducedMotion();

  const certStep = pipelineData.find((s) => s.id === 'certificates') || pipelineData[3];

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = horizontalTrackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // === DESKTOP PINNED HORIZONTAL SCROLL (>= 1024px) ===
      mm.add('(min-width: 1024px)', () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - track.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${Math.max(100, track.scrollWidth - track.clientWidth + 200)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // === MOBILE REVERSIBLE ENTRANCE (< 1024px) ===
      mm.add('(max-width: 1023px)', () => {
        const cards = track.querySelectorAll('.credential-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative section-container overflow-hidden py-16 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center"
    >
      {/* Agent Header */}
      <div className="mb-6 lg:mb-8">
        <AgentLabel
          agent={certStep.agentKey || 'AGENT 03'}
          name={certStep.name}
          status="active"
          subtitle={certStep.subtext}
        />
      </div>

      <div className="mb-8 lg:mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#14b8a6]" />
          <span>Accredited Knowledge Benchmarks</span>
        </div>
        <h2 className="font-h1-fluid text-cream-50 uppercase tracking-tight leading-none mb-3">
          Validated Credentials &amp; Honors
        </h2>
        <p className="font-body-lg text-cream-muted leading-relaxed">
          Five verified credentials spanning Agentic AI architectures, generative vector pipelines, and software engineering diplomas.
        </p>
      </div>

      {/* Horizontal Holographic Credential Track */}
      <div
        ref={horizontalTrackRef}
        className="flex flex-col lg:flex-row gap-6 lg:gap-8 will-change-transform lg:overflow-visible pb-4"
      >
        {certificatesData.map((cert) => (
          <div
            key={cert.id}
            className="credential-card group relative shrink-0 w-full lg:w-[460px] rounded-3xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/50 p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.08)] overflow-hidden flex flex-col justify-between transition-all duration-300"
          >
            {/* Holographic Shine Sweep on Hover */}
            <div
              className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -rotate-45 group-hover:translate-x-full transition-transform duration-1000 ease-out"
            />

            {/* Header: Credential ID & Level Protocol */}
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
                    {cert.credentialId}
                  </span>
                </div>
                <span className="font-mono text-xs text-cream-muted uppercase">
                  {cert.benchmarkLevel}
                </span>
              </div>

              {/* Title & Issuer */}
              <div className="mb-4">
                <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider block mb-1">
                  {cert.issuer}
                </span>
                <h3 className="font-display text-3xl uppercase tracking-wide text-cream-50 leading-tight">
                  {cert.title}
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-cream-muted leading-relaxed mb-6">
                {cert.description}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {cert.skills.map((skill, sIdx) => (
                  <span
                    key={`cert-sk-${sIdx}`}
                    className="px-2.5 py-1 rounded bg-[#03060e] border border-white/5 font-mono text-[11px] text-cream-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Credential Footer: Verification Hash & Actions */}
            <div className="pt-4 border-t border-dashed border-white/15 flex items-center justify-between relative z-10">
              <div className="font-mono text-[10px] text-cream-muted tracking-wider uppercase opacity-60">
                SHA-256 // VERIFIED
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxCert(cert)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#f59e0b] hover:to-[#14b8a6] hover:text-[#03060c] border border-white/15 text-[#fbbf24] font-mono text-xs uppercase font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Pass</span>
                </button>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-[#03060e] border border-white/10 hover:border-[#fbbf24]/40 text-cream-muted hover:text-[#fbbf24] transition-colors"
                    title="External Verification"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Credential Modal */}
      {lightboxCert && (
        <div
          className="fixed inset-0 z-50 bg-[#020409]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#060b17] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                <span>Verified Benchmark Credential</span>
              </div>
              <button
                onClick={() => setLightboxCert(null)}
                className="w-9 h-9 rounded-full bg-[#03060e] border border-white/10 flex items-center justify-center text-cream-muted hover:text-[#fbbf24] transition-colors cursor-pointer"
                aria-label="Close credential preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#03060e] border border-white/10 mb-6">
              <img
                src={lightboxCert.image}
                alt={lightboxCert.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-2xl uppercase tracking-wider text-cream-50">
                  {lightboxCert.title}
                </h4>
                <p className="font-mono text-xs text-cream-muted">
                  {lightboxCert.issuer} • {lightboxCert.year}
                </p>
              </div>
              <button
                onClick={() => setLightboxCert(null)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
