import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Magnetic = ({
  children,
  strength = 0.35,
  className = '',
  ...props
}) => {
  const magneticRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = magneticRef.current;
    if (!el || reducedMotion) return;

    let xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' });
    let yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, reducedMotion]);

  return (
    <div ref={magneticRef} className={`inline-block will-change-transform ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Magnetic;
