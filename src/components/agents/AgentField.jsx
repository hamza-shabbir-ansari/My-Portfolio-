import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const AgentField = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const meshRef = useRef(null);
  const gridRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isTabVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 14 : 36;
    const maxDistance = isMobile ? 120 : 180;

    // Node graph generation
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 1.2,
      baseRadius: Math.random() * 2.2 + 1.2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Data pulses traveling along connections
    const pulses = Array.from({ length: isMobile ? 4 : 10 }, () => ({
      source: Math.floor(Math.random() * nodeCount),
      target: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.008,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !reducedMotion && !animId) {
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    let scrollProgress = 0;

    // Scroll scrub timeline to shift perspective and network density
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    const render = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Density modulator based on scroll progress
      const densityAlpha = 0.5 + scrollProgress * 0.4;

      // 1. Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22 * densityAlpha;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Subtle gradient line between #f59e0b (amber) and #14b8a6 (teal)
            const grad = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            grad.addColorStop(0, `rgba(245, 158, 11, ${alpha})`);
            grad.addColorStop(1, `rgba(20, 184, 166, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update pulses traveling along active links
      if (!reducedMotion) {
        pulses.forEach((p) => {
          const n1 = nodes[p.source];
          const n2 = nodes[p.target];
          if (!n1 || !n2) return;

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance + 50) {
            p.progress += p.speed;
            if (p.progress >= 1) {
              p.progress = 0;
              p.source = Math.floor(Math.random() * nodeCount);
              p.target = Math.floor(Math.random() * nodeCount);
            }

            const px = n1.x + dx * p.progress;
            const py = n1.y + dy * p.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            p.source = Math.floor(Math.random() * nodeCount);
            p.target = Math.floor(Math.random() * nodeCount);
            p.progress = 0;
          }
        });
      }

      // 3. Draw nodes
      nodes.forEach((n) => {
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          n.pulsePhase += 0.02;
          n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#14b8a6';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      st.kill();
    };
  }, [reducedMotion]);

  // GSAP scroll scrub on CSS mesh & grid
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      if (meshRef.current) {
        tl.to(
          meshRef.current,
          {
            yPercent: -15,
            scale: 1.15,
            ease: 'none',
          },
          0
        );
      }

      if (gridRef.current) {
        tl.to(
          gridRef.current,
          {
            backgroundPositionY: '120px',
            opacity: 0.22,
            ease: 'none',
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base deep void background */}
      <div className="absolute inset-0 bg-[#050811]" />

      {/* 2. Soft Animated Gradient Mesh using Theme Tokens */}
      <div
        ref={meshRef}
        className="absolute -inset-[20%] opacity-40 will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 20% 25%, rgba(245, 158, 11, 0.16) 0%, transparent 50%), radial-gradient(circle at 80% 65%, rgba(20, 184, 166, 0.18) 0%, transparent 55%), radial-gradient(circle at 50% 85%, rgba(251, 191, 36, 0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 3. Faint Perspective Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-15 will-change-transform"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245, 158, 11, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.12) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* 4. Canvas Floating Nodes, Links & Data Pulses */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default AgentField;
