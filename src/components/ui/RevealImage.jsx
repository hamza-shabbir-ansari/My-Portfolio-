import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const RevealImage = ({
  src,
  alt = 'Visual showcase',
  className = '',
  imageClassName = '',
  aspectRatio = 'aspect-video',
  parallaxSpeed = 15,
  ...props
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Reversible clip-path reveal
      gsap.fromTo(
        container,
        {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          opacity: 0.6,
        },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Inner image parallax scrub
      gsap.fromTo(
        img,
        {
          scale: 1.18,
          yPercent: -parallaxSpeed,
        },
        {
          scale: 1.02,
          yPercent: parallaxSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [parallaxSpeed, reducedMotion, src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-night-900 border border-white/10 ${aspectRatio} ${className}`}
      {...props}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover will-change-transform ${imageClassName}`}
      />
      {/* Subtle cinematic gradient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-80" />
    </div>
  );
};

export default RevealImage;
