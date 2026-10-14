import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

const LenisContext = createContext(null);

let activeLenisInstance = null;

export const scrollToSection = (targetId, options = {}) => {
  if (typeof window === 'undefined') return;

  const cleanId = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const targetElement = document.getElementById(cleanId);

  if (activeLenisInstance) {
    if (targetElement) {
      activeLenisInstance.scrollTo(targetElement, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    } else {
      activeLenisInstance.scrollTo(0, { duration: 1.2, ...options });
    }
  } else if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = instance;
    activeLenisInstance = instance;
    setLenis(instance);

    // Sync Lenis scroll with GSAP ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // Standard lag smoothing to prevent sudden jumps after tab switching
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh ScrollTrigger to sync with Lenis initial layout
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      lenisRef.current = null;
      activeLenisInstance = null;
    };
  }, []);

  return React.createElement(
    LenisContext.Provider,
    { value: { lenis, scrollToSection } },
    children
  );
};

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context || { lenis: null, scrollToSection };
};

export default useLenis;
