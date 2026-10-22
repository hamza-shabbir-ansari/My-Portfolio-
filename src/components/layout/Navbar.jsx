import React, { useState, useEffect, useRef } from 'react';
import { profileData } from '../../data/profile';
import { pipelineData } from '../../data/timeline';
import { scrollToSection } from '../../hooks/useLenis';
import { Magnetic } from '../ui/Magnetic';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ onVisibilityChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeStepId, setActiveStepId] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScrollYRef = useRef(0);

  // Notify parent on visibility changes
  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  // Filter pipeline links for the navbar (keep About, Projects, Certificates, Testimonials, Contact)
  const navLinks = pipelineData.filter((s) => s.id !== 'hero' && s.id !== 'footer');

  useEffect(() => {
    // 1. Scroll listener for hide-on-down / show-on-up & glass effect
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur glass toggle
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollYRef.current + 6) {
          setIsVisible(false);
          onVisibilityChange?.(false);
        } else if (currentScrollY < lastScrollYRef.current - 6) {
          setIsVisible(true);
          onVisibilityChange?.(true);
        }
      } else {
        setIsVisible(true);
        onVisibilityChange?.(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Setup ScrollTriggers for active section detection
    const triggers = pipelineData.map((step) => {
      const el = document.getElementById(step.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveStepId(step.id),
        onEnterBack: () => setActiveStepId(step.id),
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      triggers.forEach((t) => t && t.kill());
    };
  }, []);

  // Handle Mobile Menu Open/Close Animation
  useEffect(() => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    const ctx = gsap.context(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';

        gsap.to(menuEl, {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power3.out',
        });

        gsap.fromTo(
          menuEl.querySelectorAll('.mobile-nav-link'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      } else {
        document.body.style.overflow = '';
        gsap.to(menuEl, {
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power3.in',
        });
      }
    }, mobileMenuRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    scrollToSection(id);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-3.5 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled
            ? 'bg-[#03060e]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Name: HAMZA SHABBIR */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group text-left cursor-pointer select-none"
            aria-label="Hamza Shabbir Home"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-wider text-cream-50 uppercase leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#f59e0b] group-hover:via-[#fbbf24] group-hover:to-[#06b6d4] transition-all duration-300">
              HAMZA SHABBIR
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#06b6d4] shadow-[0_0_10px_rgba(251,191,36,0.9)] group-hover:scale-125 transition-transform" />
          </button>

          {/* Desktop Navigation Links (unchanged labels: About, Projects, Certificates, Testimonials, Contact) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0a101d]/75 border border-white/10 backdrop-blur-sm">
            {navLinks.map((step) => {
              const isActive = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => handleNavClick(step.id)}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${isActive
                    ? 'text-cream-50 font-semibold bg-white/10 shadow-[0_0_14px_rgba(245,158,11,0.25)]'
                    : 'text-cream-muted hover:text-cream-50 hover:bg-white/5'
                    }`}
                >
                  {step.navLabel}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: "Hire Me" Magnetic Vibrant Gradient Button */}
          <div className="hidden md:flex items-center gap-4">
            <Magnetic strength={0.25}>
              <button
                onClick={() => handleNavClick('contact')}
                className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#06b6d4] text-[#02050a] font-mono text-xs uppercase font-extrabold tracking-widest shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40"
              >
                <span className="relative z-10 flex items-center gap-1.5 font-bold">
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-white/25 pointer-events-none" />
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[#070c18] border border-white/15 flex items-center justify-center text-cream-50 hover:text-[#fbbf24] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-[#03060e]/95 backdrop-blur-xl flex flex-col justify-between p-8 invisible opacity-0 md:hidden"
        style={{ zIndex: 9999 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#14b8a6]" />
            <span className="font-mono text-xs tracking-widest text-[#fbbf24] uppercase">
              AGENT PIPELINE
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-[#070c18] border border-white/10 flex items-center justify-center text-cream-50 hover:text-[#fbbf24] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-5 my-auto">
          {pipelineData.map((step) => (
            <button
              key={`mob-${step.id}`}
              onClick={() => handleNavClick(step.id)}
              className="mobile-nav-link group flex items-baseline justify-between text-left py-2 border-b border-white/5 cursor-pointer"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#fbbf24]">
                  {step.stepNumber}
                </span>
                <span className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-cream-100 group-hover:text-[#fbbf24] transition-colors">
                  {step.name}
                </span>
              </div>
              <span className="font-mono text-xs text-cream-muted uppercase">
                {step.agentKey || 'STEP'}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="font-mono text-xs text-cream-muted">
            Karachi, Pakistan • Available for new projects
          </div>
          <button
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#06b6d4] text-[#03060c] font-mono text-xs uppercase font-extrabold tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
