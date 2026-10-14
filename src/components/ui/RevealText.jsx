import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const RevealText = ({
  children,
  as: Component = 'div',
  type = 'words', // 'words' | 'chars'
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  className = '',
  scrub = false,
  start = 'top 85%',
  end = 'bottom 20%',
  ...props
}) => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('.split-child');
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        {
          yPercent: 110,
          rotateZ: 2,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: scrub
            ? {
                trigger: el,
                start: start,
                end: end,
                scrub: 0.8,
              }
            : {
                trigger: el,
                start: start,
                toggleActions: 'play reverse play reverse',
              },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [type, delay, stagger, duration, scrub, start, end, reducedMotion, children]);

  // If text is string, split into masked words
  if (typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Component ref={containerRef} className={`overflow-visible ${className}`} {...props}>
        {words.map((word, wIdx) => {
          if (type === 'chars') {
            return (
              <span key={`w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split('').map((char, cIdx) => (
                  <span key={`c-${cIdx}`} className="inline-block overflow-hidden align-top">
                    <span className="inline-block split-child will-change-transform">{char}</span>
                  </span>
                ))}
              </span>
            );
          }

          return (
            <span key={`w-${wIdx}`} className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0">
              <span className="inline-block split-child will-change-transform">{word}</span>
            </span>
          );
        })}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={className} {...props}>
      <span className="inline-block overflow-hidden align-top w-full">
        <span className="inline-block split-child will-change-transform w-full">{children}</span>
      </span>
    </Component>
  );
};

export default RevealText;
