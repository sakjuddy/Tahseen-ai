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
      <header className="relative z-20 pt-6 sm:pt-8 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full flex items-center justify-between">
        
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
          
          {/* Left Hero Column: Exact Typography from Brand Spec */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 sm:space-y-8 text-left pointer-events-auto">
            
            {/* Primary Headline: SF Pro Display Bold with #00E5BE Highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
              AI Solutions That <br />
              <span className="text-[#00E5BE]">Enhance</span> Your Work
            </h1>

            {/* Subtitle: Inter Regular / Light broken into 3 clean lines matching spec */}
            <p className="text-sm sm:text-base text-gray-300 max-w-md font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              We build AI agents and automation systems <br />
              that help businesses work smarter, faster, <br />
              and more efficiently.
            </p>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline group"
              >
                <span>LET&apos;S BUILD TOGETHER</span>
                <ArrowRight className="w-4 h-4 ml-2.5 text-[#00E5BE] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Hero Column: Spacer holding visual alignment for the 3D ring */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

        </div>

        {/* 3. Bottom 4 Services Row (Increased Size & Exact Brand Iconography) */}
        <div className="mt-20 sm:mt-28 pt-14 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 text-left relative z-10">
          
          {/* Card 1: AI Agents (Lightbulb with Radiating Intelligence Ticks) */}
          <div className="space-y-3.5 group">
            <div className="w-11 h-11 flex items-center justify-start text-[#00E5BE] transition-transform duration-200 group-hover:scale-110">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Lightbulb Dome */}
                <path d="M19 6C13.477 6 9 10.477 9 16C9 19.387 10.686 22.38 13.286 24.19L14 28H24L24.714 24.19C27.314 22.38 29 19.387 29 16C29 10.477 24.523 6 19 6Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Socket Base */}
                <path d="M14.5 31.5H23.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <path d="M16 35H22" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                {/* Center Node Filament */}
                <circle cx="19" cy="15.5" r="2.5" fill="#00E5BE"/>
                {/* Radiating Energy Lines */}
                <line x1="19" y1="1.5" x2="19" y2="3.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="6.5" y1="9" x2="4.5" y2="7.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="31.5" y1="9" x2="33.5" y2="7.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="4.5" y1="18.5" x2="2.5" y2="18.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="33.5" y1="18.5" x2="35.5" y2="18.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">AI Agents</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Intelligent agents that automate and scale your operations.
            </p>
          </div>

          {/* Card 2: Automation (8-Pointed Scalloped Cog Badge) */}
          <div className="space-y-3.5 group">
            <div className="w-11 h-11 flex items-center justify-start text-[#00E5BE] transition-transform duration-200 group-hover:scale-110">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Scalloped Star/Flower Cog Perimeter */}
                <path d="M19 4L22.2 7.8C23.5 9.3 25.5 10.1 27.5 9.9L32.2 9.5L33 14.2C33.3 16.2 34.6 17.9 36.5 18.7L37 19L36.5 19.3C34.6 20.1 33.3 21.8 33 23.8L32.2 28.5L27.5 28.1C25.5 27.9 23.5 28.7 22.2 30.2L19 34L15.8 30.2C14.5 28.7 12.5 27.9 10.5 28.1L5.8 28.5L5 23.8C4.7 21.8 3.4 20.1 1.5 19.3L1 19L1.5 18.7C3.4 17.9 4.7 16.2 5 14.2L5.8 9.5L10.5 9.9C12.5 10.1 14.5 9.3 15.8 7.8L19 4Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Inner Concentric Circle */}
                <circle cx="19" cy="19" r="5" stroke="#00E5BE" strokeWidth="2.2"/>
                {/* Center Core Node */}
                <circle cx="19" cy="19" r="1.5" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Automation</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Streamline workflows and eliminate repetitive tasks.
            </p>
          </div>

          {/* Card 3: Consulting (Interlocking Strategy / Advisory Dialogue Bubbles) */}
          <div className="space-y-3.5 group">
            <div className="w-11 h-11 flex items-center justify-start text-[#00E5BE] transition-transform duration-200 group-hover:scale-110">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main Speech Brain Arc */}
                <path d="M9 19C9 13.477 13.477 9 19 9C24.523 9 29 13.477 29 19C29 21.884 27.781 24.484 25.823 26.315L27 32L21.5 30.2C20.697 30.457 19.86 30.6 19 30.6C13.477 30.6 9 26.123 9 20.6V19Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Overlapping Thought Loop */}
                <path d="M12 11C12 7.5 15 5 19 5C23 5 26 7.5 26 11" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3"/>
                {/* Dialogue Insight Node */}
                <circle cx="19" cy="19" r="3" stroke="#00E5BE" strokeWidth="2"/>
                <circle cx="19" cy="19" r="1.2" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Consulting</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              AI strategy and roadmap aligned with your business goals.
            </p>
          </div>

          {/* Card 4: Development (4-Corner Bracket Modular System with Central Core) */}
          <div className="space-y-3.5 group">
            <div className="w-11 h-11 flex items-center justify-start text-[#00E5BE] transition-transform duration-200 group-hover:scale-110">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top-Left Bracket */}
                <path d="M12 5H7C5.895 5 5 5.895 5 7V12" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Top-Right Bracket */}
                <path d="M26 5H31C32.105 5 33 5.895 33 7V12" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Bottom-Left Bracket */}
                <path d="M5 26V31C5 32.105 5.895 33 7 33H12" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Bottom-Right Bracket */}
                <path d="M33 26V31C33 32.105 32.105 33 31 33H26" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Center Logic Module / Cloud Node */}
                <circle cx="19" cy="19" r="5" stroke="#00E5BE" strokeWidth="2"/>
                <circle cx="19" cy="19" r="2" fill="#00E5BE"/>
                {/* Cross Connector Ticks */}
                <line x1="19" y1="10" x2="19" y2="12" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="19" y1="26" x2="19" y2="28" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="10" y1="19" x2="12" y2="19" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="26" y1="19" x2="28" y2="19" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Development</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
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
