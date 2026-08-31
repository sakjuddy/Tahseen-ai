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
    let height = (canvas.height = document.documentElement.scrollHeight || 4000);

    const isLight = theme === "light";

    // Create clusters of wave particles distributed vertically down the webpage
    const particleCount = 75;
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      amplitude: number;
      phase: number;
      alpha: number;
    }> = [];

    const colorsDark = [
      "rgba(0, 229, 190, ",   // Teal
      "rgba(6, 182, 212, ",   // Cyan
      "rgba(56, 189, 248, ",  // Sky Blue
      "rgba(0, 245, 212, ",   // Bright Teal
    ];

    const colorsLight = [
      "rgba(13, 148, 136, ",  // Slate Teal
      "rgba(8, 145, 178, ",   // Slate Cyan
      "rgba(2, 132, 199, ",   // Slate Blue
    ];

    const palette = isLight ? colorsLight : colorsDark;

    for (let i = 0; i < particleCount; i++) {
      const baseX = Math.random() * width;
      // Distribute from under hero (e.g. 500px) down to the bottom
      const baseY = 450 + Math.random() * (height - 600);
      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 2.4 + 1.2,
        color: palette[Math.floor(Math.random() * palette.length)],
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.25,
        amplitude: Math.random() * 25 + 10,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.45 + (isLight ? 0.2 : 0.3),
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connective filaments between nearby particles in the same section
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * (isLight ? 0.08 : 0.14);
            ctx.strokeStyle = `rgba(0, 229, 190, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and animate particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic sinusoidal wave drift
        p.x = p.baseX + Math.sin(time * 0.8 + p.phase) * p.amplitude + Math.cos(time * 0.4 + p.phase) * (p.amplitude * 0.4);
        p.y = p.baseY + Math.cos(time * 0.6 + p.phase) * (p.amplitude * 0.6) + Math.sin(time * 0.3) * (p.amplitude * 0.3);

        // Slowly drift base position
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 400) p.baseY = height - 200;
        if (p.baseY > height - 100) p.baseY = 450;

        // Glowing particle circle with gradient aura
        const currentAlpha = p.alpha * (0.8 + Math.sin(time * 2 + p.phase) * 0.2);
        
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2);
        radGrad.addColorStop(0, `${p.color}${currentAlpha})`);
        radGrad.addColorStop(0.4, `${p.color}${currentAlpha * 0.6})`);
        radGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Solid core dot
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1.0, currentAlpha * 1.4)})`;
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight || 4000;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 select-none overflow-hidden"
    />
  );
}
