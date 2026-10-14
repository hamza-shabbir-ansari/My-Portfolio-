import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../../lib/gsap';

export const ProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        el.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] shadow-[0_0_10px_rgba(245,158,11,0.8)] origin-left scale-x-0 will-change-transform"
      />
    </div>
  );
};

export default ProgressBar;
