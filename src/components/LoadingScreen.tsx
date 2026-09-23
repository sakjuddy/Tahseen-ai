"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(12);
  const [isDone, setIsDone] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fast, responsive progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + increment, 98);
      });
    }, 120);

    // Complete loading after initial assets are ready
    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          setShouldRemove(true);
        }, 700); // Wait for fade-out transition
      }, 350);
    };

    if (document.readyState === "complete") {
      setTimeout(handleComplete, 800);
    } else {
      window.addEventListener("load", () => {
        setTimeout(handleComplete, 600);
      });
      // Fallback timeout so user never gets stuck
      setTimeout(handleComplete, 1800);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!mounted || shouldRemove) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060913] transition-all duration-700 ease-out ${
        isDone ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-[#00E5BE]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] bg-[#008688]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative flex flex-col items-center space-y-8 z-10">
        
        {/* 3D Brand Ring Emblem with Animated Spinning Halo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          
          {/* Rotating Outer Dashed Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#00E5BE]/30 animate-[spin_8s_linear_infinite]" />
          
          {/* Luminous Pulsing Perimeter Halo */}
          <div className="absolute -inset-3 rounded-full border border-[#00E5BE]/20 blur-[2px] animate-[pulse_2s_easeInOut_infinite]" />
          
          {/* Counter-rotating Glow Arc */}
          <div
            className="absolute -inset-1 rounded-full border-t-2 border-r border-[#00E5BE] opacity-70 animate-[spin_3s_linear_infinite]"
            style={{ animationDirection: "reverse" }}
          />

          {/* Core 3D Brand Ring */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 animate-[bounce_3s_easeInOut_infinite]">
            <Image
              src="/brand-mark.png"
              alt="Tahseen AI Mark"
              fill
              sizes="96px"
              className="object-contain drop-shadow-[0_0_25px_rgba(0,229,190,0.6)]"
              priority
            />
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg sm:text-xl font-black tracking-[0.25em] text-white uppercase font-sans">
              TAHSEEN
            </span>
            <span className="text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded bg-[#00E5BE]/15 text-[#00E5BE] border border-[#00E5BE]/40 tracking-wider">
              AI
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
            ENHANCE YOUR WORK
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-48 sm:w-56 space-y-2">
          <div className="relative h-1 w-full bg-white/[0.08] rounded-full overflow-hidden border border-white/[0.04]">
            <div
              className="h-full bg-gradient-to-r from-[#008688] via-[#00E5BE] to-[#26FFDF] rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,229,190,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 px-0.5">
            <span className="text-[#00E5BE]/80">SYSTEM READY</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
