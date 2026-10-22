import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { profileData } from '../../data/profile';
import { pipelineData } from '../../data/timeline';
import { scrollToSection } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Magnetic } from '../ui/Magnetic';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail
} from 'lucide-react';

// Custom inline SVG icons for Facebook and Instagram matching Lucide style
const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer = () => {
  const footerRef = useRef(null);
  const giantNameRef = useRef(null);
  const glowRiseRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Reversible giant typography reveal
      gsap.fromTo(
        giantNameRef.current,
        {
          yPercent: 30,
          opacity: 0.25,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        }
      );

      // 2. Soft gradient glow rising as pipeline settles
      if (glowRiseRef.current) {
        gsap.fromTo(
          glowRiseRef.current,
          { opacity: 0, scale: 0.85, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    console.log(
      `%c> whoami\n%cHamza Shabbir, builds AI agents.\n%c> company\n%cFounder and CEO of Deploi3.\n%c> experience\n%c3+ years, 5 clients served.\n%c> status\n%cShipping. Always shipping.`,
      'color: #fbbf24; font-family: monospace; font-size: 12px; font-weight: bold;',
      'color: #e2e8f0; font-family: monospace; font-size: 11px;',
      'color: #14b8a6; font-family: monospace; font-size: 12px; font-weight: bold;',
      'color: #e2e8f0; font-family: monospace; font-size: 11px;',
      'color: #fbbf24; font-family: monospace; font-size: 12px; font-weight: bold;',
      'color: #e2e8f0; font-family: monospace; font-size: 11px;',
      'color: #2dd4bf; font-family: monospace; font-size: 12px; font-weight: bold;',
      'color: #e2e8f0; font-family: monospace; font-size: 11px;'
    );
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative min-h-[75vh] flex flex-col justify-between section-container overflow-hidden pt-16 pb-12 border-t border-white/10"
    >
      {/* Soft Gradient Glow Rising Layer */}
      <div
        ref={glowRiseRef}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1200px] h-[350px] pointer-events-none will-change-transform opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.16) 0%, rgba(20, 184, 166, 0.14) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Top Header: Back to Top Button */}
      <div className="flex items-center justify-end border-b border-white/10 pb-6 mb-10 relative z-10">
        <Magnetic strength={0.3}>
          <button
            onClick={() => scrollToSection('hero')}
            className="group px-5 py-2.5 rounded-full bg-[#070c18] border border-white/15 hover:border-[#fbbf24] text-cream-100 font-mono text-xs uppercase font-semibold flex items-center gap-2.5 transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Back to Top</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6] flex items-center justify-center text-[#03060c] group-hover:-translate-y-1 transition-transform">
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </Magnetic>
      </div>

      {/* Center Giant Watermark Typography with full name HAMZA SHABBIR */}
      <div className="my-auto py-8 text-center select-none overflow-hidden relative z-10">
        <h2
          ref={giantNameRef}
          className="font-display text-[17.5vw] sm:text-[14vw] uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-cream-100/60 via-cream-100/35 to-cream-100/10 will-change-transform"
        >
          HAMZA SHABBIR
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#fbbf24] tracking-widest uppercase mt-3">
          Agentic AI Engineer and Founder of Deploi3.
        </p>
      </div>

      {/* Bottom Row: Quick Navigation, Socials, Copyright */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Quick Step Jump Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-cream-muted">
          {pipelineData
            .filter((s) => s.id !== 'footer')
            .map((st) => (
              <button
                key={`footer-${st.id}`}
                onClick={() => scrollToSection(st.id)}
                className="hover:text-[#fbbf24] transition-colors uppercase tracking-wider cursor-pointer"
              >
                {st.navLabel}
              </button>
            ))}
        </nav>

        {/* Social Icons: LinkedIn, GitHub, Email, Facebook, Instagram */}
        <div className="flex items-center gap-3">
          {/* LinkedIn */}
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#fbbf24] hover:border-[#fbbf24]/50 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* GitHub */}
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#fbbf24] hover:border-[#fbbf24]/50 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${profileData.socials.email}`}
            className="p-2.5 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#fbbf24] hover:border-[#fbbf24]/50 transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Facebook */}
          <a
            href={profileData.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#1877f2] hover:border-[#1877f2]/50 transition-all"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          {/* Instagram */}
          <a
            href={profileData.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#070c18] border border-white/10 text-cream-muted hover:text-[#e4405f] hover:border-[#e4405f]/50 transition-all"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <div className="font-mono text-xs text-cream-muted text-center md:text-right">
          <span>© 2026 Hamza Shabbir</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
