import React, { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const { lenis } = useLenis();

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

      setVideoError(false);

      const ctx = gsap.context(() => {
        gsap.to(overlay, {
          autoAlpha: 1,
          duration: 0.35,
          ease: 'power2.out',
        });

        gsap.fromTo(
          content,
          { y: 40, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            delay: 0.05,
          }
        );
      });

      return () => ctx.revert();
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';

      const ctx = gsap.context(() => {
        gsap.to(content, {
          y: 30,
          scale: 0.96,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
        });

        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      });

      return () => ctx.revert();
    }
  }, [isOpen, lenis]);

  if (!project) return null;

  const isFlagship = project.featured;

  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 z-50 bg-[#020409]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10 invisible opacity-0 overflow-y-auto"
      style={{ zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === modalOverlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-5xl rounded-3xl bg-[#060b17] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#03060e]/80 backdrop-blur-md sticky top-0 z-20">
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

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
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

          {/* Detailed Problem / Solution Panels (for Flagship) or Overview Description */}
          {isFlagship ? (
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

          {/* Flagship Metrics & Key Highlights */}
          {isFlagship && project.metrics && (
            <div>
              <span className="font-mono text-xs text-cream-muted uppercase tracking-widest block mb-3">
                Key Telemetry &amp; Performance Highlights
              </span>
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
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10 bg-[#03060e]/90 sticky bottom-0 z-20">
          <div className="font-mono text-xs text-cream-muted">
            Status: <span className="text-[#fbbf24] font-semibold">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 text-cream-100 font-mono text-xs flex items-center gap-2 transition-colors"
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
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
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
};

export default ProjectModal;
