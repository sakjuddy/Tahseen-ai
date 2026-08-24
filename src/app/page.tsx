"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";

export default function Home() {
  const navLinks = [
    { name: "HOME", href: "#" },
    { name: "SERVICES", href: "#" },
    { name: "SOLUTIONS", href: "#" },
    { name: "ABOUT US", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  return (
    <div className="relative min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 1. Header / Navbar */}
      <header className="relative z-20 pt-8 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full flex items-center justify-between">
        
        {/* Left: Official Brand Logo */}
        <Link href="#" className="flex items-center group">
          <div className="relative h-10 w-48 sm:h-11 sm:w-56 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/tahseen-logo.png"
              alt="Tahseen AI"
              fill
              sizes="224px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Right: Nav Links & LET'S TALK Button */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-wider text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg btn-teal-outline"
          >
            <span>LET&apos;S TALK</span>
          </a>
        </div>

      </header>

      {/* 2. Hero Section (Full-Span 3D Wave Underneath Text & Brand Ring) */}
      <main className="relative z-10 my-auto pt-6 pb-12 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full">
        
        {/* Full-width 3D Canvas Layer */}
        <HeroRing3D />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] pointer-events-none">
          
          {/* Left Hero Column: Text overlaps the particle wave directly */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 sm:space-y-8 text-left pointer-events-auto">
            
            {/* Headline with subtle shadow for high readability over the particle wave */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
              AI Solutions That <br />
              <span className="text-[#0bdac2]">Enhance</span> Your Work
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 max-w-md font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              We build AI agents and automation systems that help businesses work smarter, faster, and more efficiently.
            </p>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline group"
              >
                <span>LET&apos;S BUILD TOGETHER</span>
                <ArrowRight className="w-4 h-4 ml-2.5 text-[#0bdac2] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Hero Column: Spacer holding visual alignment for the 3D ring */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

        </div>

        {/* 3. Bottom 4 Services Row */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left relative z-10">
          
          {/* Card 1: AI Agents */}
          <div className="space-y-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="24" height="24" rx="4" stroke="#00E5BE" strokeWidth="2" />
                <rect x="9" y="9" width="14" height="14" rx="2" transform="rotate(45 16 16)" stroke="#00E5BE" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="2.5" fill="#00E5BE" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">AI Agents</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Intelligent agents that automate and scale your operations.
            </p>
          </div>

          {/* Card 2: Automation */}
          <div className="space-y-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#00E5BE" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="16" cy="16" r="3" fill="#00E5BE" />
                <line x1="16" y1="13" x2="16" y2="6" stroke="#00E5BE" strokeWidth="1.5" />
                <line x1="13.5" y1="17.5" x2="7.5" y2="21" stroke="#00E5BE" strokeWidth="1.5" />
                <line x1="18.5" y1="17.5" x2="24.5" y2="21" stroke="#00E5BE" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Automation</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Streamline workflows and eliminate repetitive tasks.
            </p>
          </div>

          {/* Card 3: Consulting */}
          <div className="space-y-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="7" width="24" height="18" rx="4" stroke="#00E5BE" strokeWidth="2" />
                <circle cx="14" cy="16" r="4.5" stroke="#00E5BE" strokeWidth="2" />
                <circle cx="14" cy="16" r="1.5" fill="#00E5BE" />
                <circle cx="23" cy="12" r="1.5" fill="#00E5BE" />
                <circle cx="7" cy="4" r="1.5" stroke="#00E5BE" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Consulting</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI strategy and roadmap aligned with your business goals.
            </p>
          </div>

          {/* Card 4: Development */}
          <div className="space-y-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="4" stroke="#00E5BE" strokeWidth="2" />
                <circle cx="16" cy="16" r="1.5" fill="#00E5BE" />
                <circle cx="16" cy="4" r="1.5" fill="#00E5BE" />
                <circle cx="16" cy="28" r="1.5" fill="#00E5BE" />
                <circle cx="4" cy="16" r="1.5" fill="#00E5BE" />
                <circle cx="28" cy="16" r="1.5" fill="#00E5BE" />
                <circle cx="7.5" cy="7.5" r="1.5" fill="#00E5BE" />
                <circle cx="24.5" cy="24.5" r="1.5" fill="#00E5BE" />
                <circle cx="24.5" cy="7.5" r="1.5" fill="#00E5BE" />
                <circle cx="7.5" cy="24.5" r="1.5" fill="#00E5BE" />
                <line x1="16" y1="6" x2="16" y2="12" stroke="#00E5BE" strokeWidth="1.5" />
                <line x1="16" y1="20" x2="16" y2="26" stroke="#00E5BE" strokeWidth="1.5" />
                <line x1="6" y1="16" x2="12" y2="16" stroke="#00E5BE" strokeWidth="1.5" />
                <line x1="20" y1="16" x2="26" y2="16" stroke="#00E5BE" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Development</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Custom AI solutions built for real-world impact.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-gray-600 font-mono">
        © {new Date().getFullYear()} Tahseen AI. All rights reserved.
      </footer>

    </div>
  );
}
