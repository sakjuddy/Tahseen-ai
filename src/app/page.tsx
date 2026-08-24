"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Bot, Zap, Compass, Code } from "lucide-react";

export default function Home() {
  const navLinks = [
    { name: "HOME", href: "#" },
    { name: "SERVICES", href: "#" },
    { name: "SOLUTIONS", href: "#" },
    { name: "ABOUT US", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  const cards = [
    {
      title: "AI Agents",
      desc: "Intelligent agents that automate and scale your operations.",
      icon: Bot,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Automation",
      desc: "Streamline workflows and eliminate repetitive tasks.",
      icon: Zap,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Consulting",
      desc: "AI strategy and roadmap aligned with your business goals.",
      icon: Compass,
      iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Development",
      desc: "Custom AI solutions built for real-world impact.",
      icon: Code,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050814] text-white flex flex-col justify-between overflow-hidden">
      
      {/* 1. Large Glowing Circle in the Hero Section */}
      <div className="hero-circle-container">
        <div className="hero-circle-ring-outer" />
        <div className="hero-circle-glow" />
      </div>

      {/* Background ambient light reflections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none -z-10" />

      {/* 2. Top Header / Navbar */}
      <header className="relative z-20 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Left Brand Logo */}
        <Link href="#" className="flex items-center group">
          <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-transform duration-200 group-hover:scale-105">
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

        {/* Center Floating Capsule Navbar */}
        <nav className="hidden md:flex items-center gap-1 px-5 py-2 rounded-full nav-pill">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full transition-all duration-200 ${
                idx === 0
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-1.5">
              Let&apos;s Talk
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

      </header>

      {/* 3. Hero Section (Centered) */}
      <main className="relative z-10 my-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d1527] border border-cyan-500/30 text-cyan-300 text-[11px] font-bold tracking-widest uppercase shadow-xl mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>AI SOLUTIONS THAT ENHANCE YOUR WORK</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          AI Solutions That <br />
          <span className="gradient-text">Enhance Your Work</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mt-6 mb-10">
          We build agents and automation systems that help businesses work smarter, faster, and more efficiently.
        </p>

        {/* Primary CTA Button */}
        <div className="flex items-center justify-center mb-16 sm:mb-20">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-white rounded-full cta-button group"
          >
            <span>LET&apos;S BUILD TOGETHER</span>
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4. 4 Core Service Cards Grid (Matching Reference Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="service-card rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Icon */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${card.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Action Icon */}
                <div className="pt-6 mt-4 flex items-center justify-end text-gray-500 group-hover:text-cyan-400 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer spacer */}
      <footer className="relative z-10 py-6 text-center text-xs text-gray-500 font-mono">
        © {new Date().getFullYear()} Tahseen AI. All rights reserved.
      </footer>

    </div>
  );
}
