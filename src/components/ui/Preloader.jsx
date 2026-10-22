import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { AiLoader } from './ai-loader';

export const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll during initial preloader
    document.body.style.overflow = 'hidden';

    // Snappy, elegant 1.1s theme loader display
    const timer = setTimeout(() => {

      if (containerRef.current) {
        gsap.to(loaderRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        });

        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          delay: 0.1,
          onComplete: () => {
            document.body.style.overflow = '';
            setIsVisible(false);
            if (onComplete) onComplete();
            ScrollTrigger.refresh();
          },
        });
      } else {
        document.body.style.overflow = '';
        setIsVisible(false);
        if (onComplete) onComplete();
        ScrollTrigger.refresh();
      }
    }, 1250);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#050811] select-none"
      style={{ zIndex: 99999 }}
      aria-label="Loading site"
    >
      {/* Subtle ambient background glow behind the loader orb */}
      <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-[#fbbf24]/20 via-[#f59e0b]/15 to-[#14b8a6]/10 blur-2xl pointer-events-none" />

      {/* Centered Theme Glowing Orb Loader */}
      <div ref={loaderRef} className="relative z-10 flex flex-col items-center justify-center">
        <AiLoader />
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#fbbf24]/80 uppercase mt-4 animate-pulse">
          Initializing
        </span>
      </div>
    </div>
  );
};

export default Preloader;
