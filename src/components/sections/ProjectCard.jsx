import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Magnetic } from '../ui/Magnetic';
import { ExternalLink, Github, ArrowUpRight, Play } from 'lucide-react';

export const ProjectCard = ({ project, index, onOpenModal }) => {
  const cardRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const reducedMotion = useReducedMotion();

  // Alternating layout on desktop
  const isImageRight = index % 2 === 1;

  useLayoutEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Reversible card entrance with slide
      gsap.fromTo(
        cardEl,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Subtle 3D tilt on card hover
      const handleMouseMove = (e) => {
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(cardEl, {
          rotateY: x * 0.015,
          rotateX: -y * 0.015,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardEl, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      };

      cardEl.addEventListener('mousemove', handleMouseMove);
      cardEl.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cardEl.removeEventListener('mousemove', handleMouseMove);
        cardEl.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Video hover playback control
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !videoError) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !videoError) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-[#070c18]/80 border border-white/10 hover:border-[#fbbf24]/40 transition-colors p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          isImageRight ? 'lg:grid-flow-dense' : ''
        }`}
      >
        {/* Project Visual Container */}
        <div
          ref={mediaRef}
          onClick={() => onOpenModal(project)}
          className={`lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden bg-[#03060e] border border-white/10 group-hover:border-[#fbbf24]/30 transition-all cursor-pointer shadow-lg ${
            isImageRight ? 'lg:col-start-7' : 'lg:col-start-1'
          }`}
        >
          {/* Cover Image */}
          <img
            src={project.cover}
            alt={project.title}
            className={`w-full h-full object-cover transition-opacity duration-500 will-change-transform ${
              isHovered && !videoError && project.video ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {/* Looping Muted Preview Video on Hover */}
          {!videoError && project.video && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.poster || project.cover}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}

          {/* Hover View Badge Overlay */}
          <div className="absolute inset-0 bg-[#03060e]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>View Dossier</span>
            </div>
          </div>
        </div>

        {/* Project Meta Details */}
        <div
          className={`lg:col-span-6 flex flex-col justify-between ${
            isImageRight ? 'lg:col-start-1' : 'lg:col-start-7'
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
                Deployment Node 0{index + 1}
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-cream-muted uppercase">
                {project.year}
              </span>
              <span className="text-white/20">•</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#2dd4bf] font-mono text-[10px] uppercase font-semibold">
                {project.status}
              </span>
            </div>

            <h4
              onClick={() => onOpenModal(project)}
              className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-cream-50 leading-tight group-hover:text-[#fbbf24] transition-colors cursor-pointer"
            >
              {project.title}
            </h4>

            <p className="font-sans text-xs sm:text-sm text-cream-muted mt-3 line-clamp-2 leading-relaxed">
              {project.tagline}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.tech.map((t, tIdx) => (
                <span
                  key={`card-t-${tIdx}`}
                  className="px-2.5 py-1 rounded-md bg-[#03060e] border border-white/5 font-mono text-xs text-cream-100 hover:border-[#fbbf24]/40 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
            <Magnetic strength={0.2}>
              <button
                onClick={() => onOpenModal(project)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Explore Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#03060e] border border-white/10 hover:border-[#fbbf24]/40 text-cream-100 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-[#03060e] border border-white/10 hover:border-[#fbbf24]/40 text-cream-100 font-mono text-xs flex items-center transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
