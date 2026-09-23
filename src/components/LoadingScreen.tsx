"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleComplete = () => {
      setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          setShouldRemove(true);
        }, 600); // Smooth fade-out duration
      }, 400);
    };

    if (document.readyState === "complete") {
      setTimeout(handleComplete, 600);
    } else {
      window.addEventListener("load", () => {
        setTimeout(handleComplete, 500);
      });
      // Safety timeout
      setTimeout(handleComplete, 1400);
    }
  }, []);

  if (!mounted || shouldRemove) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#060913] transition-all duration-600 ease-out ${
        isDone ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Subtle ambient teal background halo */}
      <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#00E5BE]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Centered Minimal Brand Circle */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
        
        {/* Luminous Pulsing Perimeter Halo */}
        <div className="absolute -inset-2.5 rounded-full border border-[#00E5BE]/25 blur-[1.5px] animate-[pulse_2s_easeInOut_infinite]" />
        
        {/* Subtle Counter-rotating Tech Arc */}
        <div
          className="absolute -inset-1 rounded-full border-t border-r border-[#00E5BE]/60 animate-[spin_2.5s_linear_infinite]"
          style={{ animationDirection: "reverse" }}
        />

        {/* 3D Brand Circle Mark */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 animate-[pulse_2.2s_easeInOut_infinite]">
          <Image
            src="/brand-mark.png"
            alt="Tahseen AI"
            fill
            sizes="80px"
            className="object-contain drop-shadow-[0_0_20px_rgba(0,229,190,0.55)]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
