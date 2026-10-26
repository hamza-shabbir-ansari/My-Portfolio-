import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '../../lib/gsap';
import { useLenis } from '../../hooks/useLenis';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Play
} from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalOverlayRef = useRef(null);
  const modalContentRef = useRef(null);
  const scrollBodyRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dispatch global event when modal opens/closes so bottom navbar can smoothly hide/show
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('portfolio:modal-change', {
        detail: { isOpen: Boolean(isOpen) },
      })
    );
  }, [isOpen]);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Open/Close Animation & Scroll Lock
  useEffect(() => {
    if (!modalOverlayRef.current || !modalContentRef.current) return;

    const overlay = modalOverlayRef.current;
    const content = modalContentRef.current;

    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      document.body.classList.add('project-modal-open');

      setVideoError(false);

      // Reset scroll position to top when opened
      if (scrollBodyRef.current) {
        scrollBodyRef.current.scrollTop = 0;
      }

      const ctx = gsap.context(() => {
        gsap.to(overlay, {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.fromTo(
          content,
          { y: 35, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out',
            delay: 0.05,
          }
        );
      });

      return () => ctx.revert();
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.body.classList.remove('project-modal-open');

      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (_) {}
      }

      const ctx = gsap.context(() => {
        gsap.to(content, {
          y: 25,
          scale: 0.96,
          opacity: 0,
          duration: 0.25,
          ease: 'power3.in',
        });

        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'power2.in',
        });
      });

      return () => ctx.revert();
    }
  }, [isOpen, lenis]);

  if (!project || !mounted || typeof document === 'undefined') return null;

  const isFlagship = project.featured;

  // Forward wheel scrolling from header/footer/card background to scroll body
  const handleCardWheel = (e) => {
    e.stopPropagation();
    if (scrollBodyRef.current && e.target && !scrollBodyRef.current.contains(e.target)) {
      scrollBodyRef.current.scrollTop += e.deltaY;
    }
  };

  const modalJSX = (
    <div
      ref={modalOverlayRef}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 lg:p-10 invisible opacity-0 select-auto"
      style={{ zIndex: 99999 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Dedicated backdrop scrim - clicking here safely closes modal without interfering with scrollbars */}
      <div
        className="absolute inset-0 bg-[#020409]/95 backdrop-blur-xl -z-10 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalContentRef}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={handleCardWheel}
        className="relative w-full max-w-5xl rounded-3xl bg-[#060b17] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden my-auto max-h-[92vh] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#03060e]/95 backdrop-blur-md sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
              {isFlagship ? 'FLAGSHIP STARTUP CASE STUDY' : 'PROJECT DOSSIER'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#070c18] border border-white/10 flex items-center justify-center text-cream-muted hover:text-[#fbbf24] hover:border-[#fbbf24]/40 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body with Enhanced Mouse Control */}
        <div
          ref={scrollBodyRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className="modal-scroll-area overflow-y-auto p-6 sm:p-8 space-y-8 flex-1 overscroll-contain select-text"
        >
          {/* Video Showcase Player Slot */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#03060e] border border-white/10 shadow-2xl">
            {!videoError && project.video ? (
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                poster={project.poster || project.cover}
                className="w-full h-full object-cover"
                onError={() => setVideoError(true)}
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#03060e]/40 flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-[#070c18]/80 border border-white/20 text-[#fbbf24] font-mono text-xs flex items-center gap-2">
                    <Play className="w-3.5 h-3.5" />
                    <span>Visual Showcase Preview</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Project Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#fbbf24] font-mono text-xs uppercase font-medium">
                {project.year}
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#2dd4bf] font-mono text-xs uppercase font-medium">
                {project.status}
              </span>
              <span className="font-mono text-xs text-cream-muted ml-2">
                Role: {project.role}
              </span>
            </div>

            <h3 id="modal-project-title" className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-cream-50 leading-tight">
              {project.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-cream-muted mt-2 max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Detailed Problem / Solution Panels or Overview Description */}
          {project.problem && project.solution ? (
            <div className="space-y-6">
              {project.description && (
                <div className="p-5 rounded-2xl bg-[#03060e]/50 border border-white/5">
                  <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider block mb-1.5 font-semibold">
                    Core Overview
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#03060e]/70 border border-white/10 shadow-inner">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-wider mb-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
                    <span>The Challenge</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#03060e]/70 border border-white/10 shadow-inner">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#2dd4bf] uppercase tracking-wider mb-2 font-semibold">
                    <Sparkles className="w-4 h-4 text-[#14b8a6]" />
                    <span>Architected Solution</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#03060e]/60 border border-white/5">
              <span className="font-mono text-xs text-[#fbbf24] uppercase tracking-wider block mb-2 font-semibold">
                Project Overview
              </span>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Metrics & Key Highlights */}
          {(project.metrics || project.highlights) && (
            <div>
              <span className="font-mono text-xs text-cream-muted uppercase tracking-widest block mb-3">
                Key Telemetry &amp; Architecture Highlights
              </span>
              {project.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={`m-${idx}`}
                      className="p-4 rounded-xl bg-[#03060e] border border-white/10 text-center"
                    >
                      <div className="font-display text-2xl sm:text-3xl text-[#fbbf24]">
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] text-cream-muted uppercase mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {project.highlights && (
                <div className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <div
                      key={`h-${idx}`}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-cream-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <span className="font-mono text-xs text-cream-muted uppercase tracking-widest block mb-3">
              Technologies &amp; Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={`modal-t-${idx}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#03060e] border border-white/10 font-mono text-xs text-cream-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10 bg-[#03060e]/95 backdrop-blur-md sticky bottom-0 z-20 shrink-0">
          <div className="font-mono text-xs text-cream-muted">
            Status: <span className="text-[#fbbf24] font-semibold">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 text-cream-100 font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.body);
};

export default ProjectModal;
