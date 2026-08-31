"use client";

import { useEffect, useRef } from "react";

interface AmbientWaveParticlesProps {
  theme?: "dark" | "light";
}

export default function AmbientWaveParticles({ theme = "dark" }: AmbientWaveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isLight = theme === "light";

    // 85 Viewport-floating luminous wave particles
    const particleCount = 80;
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      glowColor: string;
      speedX: number;
      speedY: number;
      amplitude: number;
      phase: number;
      alpha: number;
    }> = [];

    const paletteDark = [
      { core: "rgba(255, 255, 255, ", glow: "rgba(0, 229, 190, " },   // Teal / White core
      { core: "rgba(0, 245, 212, ", glow: "rgba(6, 182, 212, " },    // Cyan / Neon
      { core: "rgba(56, 189, 248, ", glow: "rgba(14, 165, 233, " },  // Sky Blue
      { core: "rgba(0, 229, 190, ", glow: "rgba(0, 229, 190, " },   // Brand Teal
    ];

    const paletteLight = [
      { core: "rgba(13, 148, 136, ", glow: "rgba(20, 184, 166, " },
      { core: "rgba(8, 145, 178, ", glow: "rgba(6, 182, 212, " },
      { core: "rgba(2, 132, 199, ", glow: "rgba(56, 189, 248, " },
    ];

    const palette = isLight ? paletteLight : paletteDark;

    for (let i = 0; i < particleCount; i++) {
      const pColor = palette[Math.floor(Math.random() * palette.length)];
      const baseX = Math.random() * width;
      const baseY = Math.random() * height;
      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 2.8 + 1.6,
        color: pColor.core,
        glowColor: pColor.glow,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.35,
        amplitude: Math.random() * 30 + 15,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.4 + (isLight ? 0.35 : 0.55),
      });
    }

    let time = 0;
    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = () => {
      time += 0.018;
      // Smooth scroll lerp for vertical parallax
      scrollY += (targetScrollY - scrollY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle connective filament lines between nearby particles
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * (isLight ? 0.15 : 0.25);
            ctx.strokeStyle = `rgba(0, 229, 190, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw luminous glowing wave particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sinusoidal wave oscillation
        p.x = p.baseX + Math.sin(time * 0.9 + p.phase) * p.amplitude + Math.cos(time * 0.45 + p.phase) * (p.amplitude * 0.4);
        p.y = (p.baseY - (scrollY * 0.25) % height + height) % height + Math.cos(time * 0.7 + p.phase) * (p.amplitude * 0.5);

        // Slow base drift
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        if (p.baseX < -20) p.baseX = width + 20;
        if (p.baseX > width + 20) p.baseX = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        if (p.baseY > height + 20) p.baseY = -20;

        // Breathing pulse alpha
        const currentAlpha = p.alpha * (0.85 + Math.sin(time * 2.5 + p.phase) * 0.25);

        // Radiant Outer Glow Gradient
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4.5);
        radGrad.addColorStop(0, `${p.glowColor}${currentAlpha * 0.95})`);
        radGrad.addColorStop(0.35, `${p.glowColor}${currentAlpha * 0.5})`);
        radGrad.addColorStop(0.7, `${p.glowColor}${currentAlpha * 0.15})`);
        radGrad.addColorStop(1, `${p.glowColor}0)`);

        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.size * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Luminous Core Dot
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1.0, currentAlpha * 1.5)})`;
        ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] select-none"
    />
  );
}
