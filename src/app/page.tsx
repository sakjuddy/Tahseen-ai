"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Zap,
  ShieldCheck,
  HeartHandshake,
  Mail,
  Activity,
  BarChart3,
  TrendingUp,
  Quote,
  Star,
} from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";
import Footer from "@/components/Footer";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "SERVICES", href: "#services" },
    { name: "INSIGHTS", href: "#insights" },
    { name: "SOLUTIONS", href: "#solutions" },
    { name: "ABOUT US", href: "#about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const solutions = [
    {
      title: "Campaign Automation",
      desc: "Create and execute campaigns with ease using AI-driven automation for maximum efficiency and scale.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14L18 4L28 14V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V14Z" />
          <path d="M12 18L16 22L22 14" />
        </svg>
      ),
    },
    {
      title: "Personalized Outreach",
      desc: "Deliver tailored messages to each customer for more impactful, targeted, and engaging communication.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="11" r="5" />
          <path d="M6 26C6 21 10.5 18 16 18C21.5 18 26 21 26 26" />
          <path d="M22 6L25 9L29 4" />
        </svg>
      ),
    },
    {
      title: "Data Optimization",
      desc: "Analyze performance with detailed real-time analytics to fine-tune workflows and boost business results.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 28H28" />
          <path d="M8 22V16" />
          <path d="M14 22V10" />
          <path d="M20 22V13" />
          <path d="M26 22V6" />
        </svg>
      ),
    },
    {
      title: "Seamless Collaboration",
      desc: "Seamlessly integrate with existing systems and tools to enhance team productivity and cross-unit coordination.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="16" r="4" />
          <circle cx="23" cy="16" r="4" />
          <path d="M13 16H19" />
          <path d="M16 13V19" />
        </svg>
      ),
    },
    {
      title: "Real-Time Oversight",
      desc: "Monitor customer interactions and operations in real time to adapt strategies dynamically for optimal engagement.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="11" />
          <polyline points="16,9 16,16 21,19" />
        </svg>
      ),
    },
    {
      title: "Future-Proof Architecture",
      desc: "Stay ahead with continuous AI model updates, enterprise security, and built-in adaptability for evolving needs.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3L28 8V16C28 23 23 28 16 30C9 28 4 23 4 16V8L16 3Z" />
          <path d="M12 16L15 19L21 13" />
        </svg>
      ),
    },
  ];

  const plans = [
    {
      tag: "STRATEGY & ADOPTION",
      title: "AI Consulting",
      subtitle: "Project Based",
      desc: "AI strategy for operational efficiency, workflow auditing, and executive deployment.",
      features: [
        "AI Strategy for efficiency & deployment",
        "Employee training on modern AI tools",
        "Measurable employee productivity boost",
        "Dedicated executive AI advisor",
        "Continuous progress oversight",
      ],
      popular: false,
    },
    {
      tag: "MOST POPULAR",
      title: "AI Agents & Automation",
      subtitle: "Project Based",
      desc: "Autonomous intelligent agents for 24/7 sales, marketing, and workflow automation.",
      features: [
        "3X performance over manual sales reps",
        "Custom live reports & dashboards",
        "Enterprise-grade security & encryption",
        "Seamless 3rd-party system integration",
        "Dedicated account manager & SLA",
      ],
      popular: true,
    },
    {
      tag: "ENGINEERING",
      title: "Web & App Development",
      subtitle: "Project Based",
      desc: "Custom full-stack web platforms and mobile applications powered by AI intelligence.",
      features: [
        "Full-stack web & mobile app engineering",
        "Native AI & LLM model integrations",
        "Advanced real-time analytics engine",
        "Top-grade cloud infrastructure & security",
        "24/7 technical maintenance & support",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote: "Tahseen streamlined our internal processes — we reduced manual work by over 40% in just weeks.",
      author: "Ahmed AL-Mutairi",
      role: "Operations Director, FutureTech",
      metrics: "40% Manual Work Reduced",
    },
    {
      quote: "The AI automation was easy to deploy and helped us serve clients faster and more consistently across Saudi Arabia.",
      author: "Sara Al-Harbi",
      role: "Head of Growth, DataPlus",
      metrics: "3X Lead Response Speed",
    },
    {
      quote: "Our team now focuses on strategy instead of repetitive tasks — Tahseen took care of the rest seamlessly.",
      author: "Ismael Mohammad",
      role: "Owner, Deconec",
      metrics: "100+ Hours Saved / Month",
    },
    {
      quote: "We saw measurable gains in operational efficiency and client satisfaction. Highly recommend Tahseen for any business.",
      author: "Saleh El Oamry",
      role: "CEO, Canacio",
      metrics: "+35% Operational Efficiency",
    },
    {
      quote: "We integrated Tahseen without coding. The results were immediate — faster operations and better customer insights.",
      author: "Tarek Amer",
      role: "Managing Director, Gito",
      metrics: "Instant ROI in 3 Weeks",
    },
    {
      quote: "The automation flows are intuitive and saved us countless hours. Support was highly responsive and forward-deployed.",
      author: "Osama Mazen",
      role: "Founder, Ioptp",
      metrics: "99.9% Pipeline Reliability",
    },
  ];

  // Extended duplicate testimonials for seamless continuous looping without empty gaps
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Auto advance carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % testimonials.length);
  };

  const faqs = [
    {
      q: "What is Tahseen AI?",
      a: "Tahseen AI is a pioneering Saudi Arabian startup poised to redefine B2B operations across SMEs through cutting-edge artificial intelligence, workflow automation, and custom intelligent agent systems.",
    },
    {
      q: "What are Tahseen AI's primary services?",
      a: "We provide AI Consultation & Strategy, Full-stack Web & Mobile Development, AI Agents for Sales & Marketing, Corporate AI Training & Workshops, AI Chat & Call Centre Solutions, and End-to-End Workflow Automation.",
    },
    {
      q: "Why do I need Tahseen AI solutions?",
      a: "Tahseen AI delivers unparalleled value by reducing repetitive manual tasks by over 40%, accelerating response times, and deploying scalable autonomous systems tailored specifically to your business goals.",
    },
    {
      q: "Can I customize Tahseen AI to fit my brand?",
      a: "Absolutely. Every AI agent, workflow, and web platform is fully tailored to match your brand identity, tone of voice, internal databases, and operational requirements.",
    },
    {
      q: "Does Tahseen AI provide services to individuals and startups?",
      a: "Yes. In addition to enterprise B2B solutions, Tahseen AI provides adaptable, high-impact AI packages tailored for growing startups, entrepreneurs, and professional teams.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-x-clip font-sans">
      
      {/* Background ambient radial glows */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-[45%] left-[-150px] w-[600px] h-[600px] bg-[#00E5BE]/5 rounded-full blur-[200px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-100px] w-[650px] h-[650px] bg-cyan-500/8 rounded-full blur-[200px] pointer-events-none -z-10" />

      {/* 1. Sticky Header / Navbar (Brought Slightly Inward Towards Center) */}
      <header className="sticky top-0 z-50 w-full bg-[#060913]/85 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="py-2.5 sm:py-3 px-6 sm:px-12 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full flex items-center justify-between">
          
          {/* Left: Official Brand Logo */}
          <Link
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative h-9 w-44 sm:h-10 sm:w-48 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,229,190,0.3)]">
              <Image
                src="/tahseen-logo.png"
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 176px, 192px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Right: Nav Links & LET'S TALK Button */}
          <div className="flex items-center gap-5 sm:gap-7 lg:gap-8 xl:gap-10">
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[11px] sm:text-xs font-semibold tracking-wider text-gray-300">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-[#00E5BE] hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-[#00E5BE] hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    {link.name}
                  </a>
                )
              )}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2 text-[11px] sm:text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>LET&apos;S TALK</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Section (Widescreen + Slightly Smaller Refined Proportions) */}
      <main id="home" className="relative z-10 pt-2 sm:pt-4 pb-10 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full">
        
        {/* Full-width 3D Canvas Layer */}
        <HeroRing3D />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] pointer-events-none">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 text-left pointer-events-auto">
            
            {/* Primary Headline: SF Pro Display Bold with #00E5BE Highlight */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              AI Solutions That <br />
              <span className="text-[#00E5BE]">Enhance</span> Your Work
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-gray-300 max-w-sm font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              We build AI agents and automation systems <br />
              that help businesses work smarter, faster, <br />
              and more efficiently.
            </p>

            {/* Primary CTA Button */}
            <div className="pt-1">
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, "#services")}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline group cursor-pointer hover:shadow-[0_0_18px_rgba(0,229,190,0.4)]"
              >
                <span>LET&apos;S BUILD TOGETHER</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 text-[#00E5BE] group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

          </div>

          {/* Right Hero Column: Spacer holding visual alignment for the 3D ring */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

        </div>

        {/* 3. Bottom 4 Services Row (Slightly Smaller & Cleanly Spaced) */}
        <div id="services" className="mt-16 sm:mt-20 pt-10 scroll-mt-28 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 text-center justify-items-center relative z-10 max-w-[1360px] mx-auto w-full">
          
          {/* Card 1: AI Agents */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6C13.477 6 9 10.477 9 16C9 19.387 10.686 22.38 13.286 24.19L14 28H24L24.714 24.19C27.314 22.38 29 19.387 29 16C29 10.477 24.523 6 19 6Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5 31.5H23.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <path d="M16 35H22" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="19" cy="15.5" r="2" fill="#00E5BE"/>
                <line x1="19" y1="1.5" x2="19" y2="3.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="6.5" y1="9" x2="4.5" y2="7.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="31.5" y1="9" x2="33.5" y2="7.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="4.5" y1="18.5" x2="2.5" y2="18.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="33.5" y1="18.5" x2="35.5" y2="18.5" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              AI Agents
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              Intelligent agents that <br />
              automate and scale your <br />
              operations.
            </p>
          </div>

          {/* Card 2: Automation */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4L22.2 7.8C23.5 9.3 25.5 10.1 27.5 9.9L32.2 9.5L33 14.2C33.3 16.2 34.6 17.9 36.5 18.7L37 19L36.5 19.3C34.6 20.1 33.3 21.8 33 23.8L32.2 28.5L27.5 28.1C25.5 27.9 23.5 28.7 22.2 30.2L19 34L15.8 30.2C14.5 28.7 12.5 27.9 10.5 28.1L5.8 28.5L5 23.8C4.7 21.8 3.4 20.1 1.5 19.3L1 19L1.5 18.7C3.4 17.9 4.7 16.2 5 14.2L5.8 9.5L10.5 9.9C12.5 10.1 14.5 9.3 15.8 7.8L19 4Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="19" r="4.5" stroke="#00E5BE" strokeWidth="2.2"/>
                <circle cx="19" cy="19" r="1.5" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              Automation
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              Streamline workflows <br />
              and eliminate repetitive <br />
              tasks.
            </p>
          </div>

          {/* Card 3: Consulting */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19C9 13.477 13.477 9 19 9C24.523 9 29 13.477 29 19C29 21.884 27.781 24.484 25.823 26.315L27 32L21.5 30.2C20.697 30.457 19.86 30.6 19 30.6C13.477 30.6 9 26.123 9 20.6V19Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C12 7.5 15 5 19 5C23 5 26 7.5 26 11" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3"/>
                <circle cx="19" cy="19" r="2.8" stroke="#00E5BE" strokeWidth="2"/>
                <circle cx="19" cy="19" r="1" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              Consulting
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              AI strategy and roadmap <br />
              aligned with your business <br />
              goals.
            </p>
          </div>

          {/* Card 4: Development */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5H7C5.895 5 5 5.895 5 7V12" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26 5H31C32.105 5 33 5.895 33 7V12" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 26V31C5 32.105 5.895 33 7 33H12" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M33 26V31C33 32.105 32.105 33 31 33H26" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="19" r="4.5" stroke="#00E5BE" strokeWidth="2"/>
                <circle cx="19" cy="19" r="1.6" fill="#00E5BE"/>
                <line x1="19" y1="10" x2="19" y2="12" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="19" y1="26" x2="19" y2="28" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="10" y1="19" x2="12" y2="19" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="26" y1="19" x2="28" y2="19" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              Development
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              Custom AI solutions <br />
              built for real-world <br />
              impact.
            </p>
          </div>

        </div>

      </main>

      {/* 4. Social Proof & National Impact Strip */}
      <section id="about" className="relative z-10 py-8 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto w-full scroll-mt-28">
        <div className="rounded-2xl bg-white/[0.02] hover:bg-white/[0.03] border border-white/[0.06] hover:border-[#00E5BE]/30 backdrop-blur-md p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left transition-all duration-300">
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Pioneering Saudi AI Innovation</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              Adopted by leading enterprises across Saudi Arabia & SMEs
            </h4>
            <p className="text-[11px] text-gray-400">
              Transforming operations with custom AI agents, automated sales pipelines, and bespoke intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] hover:scale-105 transition-transform duration-200">
            <HeartHandshake className="w-4 h-4 flex-shrink-0" />
            <div className="text-left text-[11px] font-medium">
              <span className="font-bold text-white">Social Impact:</span> We donate 1% of proceeds to the <span className="underline decoration-[#00E5BE]">Ehsan Platform (منصة إحسان)</span>.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Insights Section */}
      <section id="insights" className="relative z-10 py-14 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto w-full scroll-mt-28">
        <div className="text-center space-y-2.5 max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase">
            <Activity className="w-3 h-3" />
            <span>LIVE OVERSIGHT & REAL-TIME ANALYTICS</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Insights That Drive <span className="text-[#00E5BE]">Growth</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            Track every campaign, automated agent, and customer interaction in real time to refine engagement strategies and eliminate guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          
          {/* Card 1: Real-Time Oversight & Intelligence */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 hover:border-[#00E5BE]/60 space-y-5 shadow-[0_8px_30px_rgba(0,229,190,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:scale-110 transition-all">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#00E5BE] tracking-widest uppercase">LIVE OVERSIGHT</span>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00E5BE] transition-colors">Real-Time Insights</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Monitor your campaigns and customer touchpoints in real time to ensure maximum operational effectiveness and identify optimization opportunities instantly.
                </p>
              </div>

              {/* Metric Tags */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {["Customer Retention (+40%)", "Seamless Integrations", "Real-Time Reports", "Personalized Engagement"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/15 border border-white/[0.08] hover:border-[#00E5BE]/40 text-[10px] font-medium text-gray-200 hover:text-white transition-all cursor-default">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#00E5BE] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interactive Telemetry Widget */}
            <div className="p-3.5 rounded-xl bg-[#060913]/90 border border-white/[0.08] space-y-2.5">
              <div className="flex items-center justify-between text-[10px] border-b border-white/[0.06] pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-pulse" />
                  <span className="font-bold text-white">Live Agent Telemetry</span>
                </div>
                <span className="text-[#00E5BE] font-mono font-semibold">99.98% Uptime</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-sm font-bold text-white">~0.4s</div>
                  <div className="text-[8px] text-gray-400 uppercase tracking-wider">Latency</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-sm font-bold text-[#00E5BE]">3.2X</div>
                  <div className="text-[8px] text-gray-400 uppercase tracking-wider">Conversion</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-sm font-bold text-white">24/7</div>
                  <div className="text-[8px] text-gray-400 uppercase tracking-wider">Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Actionable Data & Strategic Efficiency */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 hover:border-[#00E5BE]/60 space-y-5 shadow-[0_8px_30px_rgba(0,229,190,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:scale-110 transition-all">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#00E5BE] tracking-widest uppercase">STRATEGIC EFFICIENCY</span>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00E5BE] transition-colors">Actionable Data</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Leverage analytics to enhance team workflows, boost engagement, and make data-driven decisions that reduce overhead and increase marketing ROI.
                </p>
              </div>

              {/* Metric Tags */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {["Cost-Effective Deployment", "Smart Spending", "Data-Driven Decisions", "Increased Efficiency"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/15 border border-white/[0.08] hover:border-[#00E5BE]/40 text-[10px] font-medium text-gray-200 hover:text-white transition-all cursor-default">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#00E5BE] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Graphic Simulation */}
            <div className="p-3.5 rounded-xl bg-[#060913]/90 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-[10px] border-b border-white/[0.06] pb-2">
                <span className="font-bold text-white">Workflow Efficiency Gain</span>
                <span className="text-[#00E5BE] font-mono font-semibold">+45% Gain</span>
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[9px] text-gray-400 mb-0.5">
                    <span>Manual Task Reduction</span>
                    <span className="text-[#00E5BE] font-bold">42%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[42%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-gray-400 mb-0.5">
                    <span>Lead Response Speed</span>
                    <span className="text-[#00E5BE] font-bold">85%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Comprehensive AI Solutions Section */}
      <section id="solutions" className="relative z-10 py-14 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto w-full scroll-mt-28">
        <div className="text-center space-y-2.5 max-w-xl mx-auto mb-10">
          <span className="text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase">
            EFFORTLESS DEPLOYMENT & REAL-TIME OVERSIGHT
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AI-Powered Solutions Built for <span className="text-[#00E5BE]">Scale</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            Simplify deployment, optimize data workflows, and deliver automated intelligence across every touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((sol) => (
            <div
              key={sol.title}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#00E5BE]/50 transition-all duration-300 space-y-3 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,190,0.1)] cursor-default"
            >
              <div className="w-9 h-9 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                {sol.icon}
              </div>
              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#00E5BE] transition-colors">{sol.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal group-hover:text-gray-200 transition-colors">{sol.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Flexible Service Packages */}
      <section className="relative z-10 py-14 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto w-full">
        <div className="text-center space-y-2.5 max-w-xl mx-auto mb-10">
          <span className="text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase">
            TRANSPARENT ENGAGEMENT, MEASURABLE RESULTS
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Flexible Plans for <span className="text-[#00E5BE]">Companies & SMEs</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            Choose the engagement model that fits your operational goals and scale seamlessly as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#0d1c24] to-[#060913] border-2 border-[#00E5BE] shadow-[0_0_30px_rgba(0,229,190,0.15)] lg:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,229,190,0.25)]"
                  : "bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.06] hover:border-[#00E5BE]/40 hover:-translate-y-0.5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00E5BE] text-[#060913] text-[9px] font-extrabold tracking-widest uppercase shadow-[0_0_10px_rgba(0,229,190,0.5)]">
                  {plan.tag}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-[#00E5BE] tracking-wider uppercase">{plan.subtitle}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{plan.title}</h3>
                  <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="h-px bg-white/10" />

                <ul className="space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-gray-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-white/5">
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_14px_rgba(0,229,190,0.4)]"
                      : "btn-teal-outline"
                  }`}
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-3 h-3 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Interactive Testimonial Carousel */}
      <section className="relative z-10 py-14 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5 max-w-lg text-left">
            <span className="text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>TESTED & TRUSTED NATIONWIDE</span>
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              What Our <span className="text-[#00E5BE]">Clients</span> Say
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              Hear directly from founders and enterprise leaders across Saudi Arabia accelerating workflows with Tahseen AI.
            </p>
          </div>

          {/* Carousel Arrow Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/20 border border-white/10 hover:border-[#00E5BE]/50 flex items-center justify-center text-white hover:text-[#00E5BE] transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/20 border border-white/10 hover:border-[#00E5BE]/50 flex items-center justify-center text-white hover:text-[#00E5BE] transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport (Continuous Seamless Loop) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
        >
          <div
            className="flex transition-transform duration-700 ease-out gap-4 sm:gap-5"
            style={{
              transform: `translateX(-${carouselIndex * (100 / (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : typeof window !== "undefined" && window.innerWidth < 1024 ? 2 : 3))}%)`,
            }}
          >
            {extendedTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex-shrink-0 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent border border-white/[0.08] hover:border-[#00E5BE]/50 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,190,0.1)] group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                      <Quote className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-0.5 text-[#00E5BE]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#00E5BE]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-200 group-hover:text-white leading-relaxed font-normal italic transition-colors">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-1">
                  <div className="font-bold text-white text-xs group-hover:text-[#00E5BE] transition-colors">{t.author}</div>
                  <div className="text-[10px] text-gray-400 font-medium">{t.role}</div>
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#00E5BE]/10 text-[#00E5BE] text-[9px] font-semibold">
                    <CheckCircle2 className="w-2 h-2" />
                    <span>{t.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {testimonials.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCarouselIndex(dotIdx)}
              aria-label={`Jump to slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                carouselIndex === dotIdx
                  ? "w-5 bg-[#00E5BE] shadow-[0_0_8px_rgba(0,229,190,0.8)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 9. Interactive FAQ Section */}
      <section className="relative z-10 py-14 px-6 sm:px-10 lg:px-12 max-w-[960px] mx-auto w-full">
        <div className="text-center space-y-2.5 max-w-xl mx-auto mb-10">
          <span className="text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase">
            YOUR QUERIES, SIMPLIFIED
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-[#00E5BE]">Questions</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            Find clear answers to common questions about Tahseen AI&apos;s capabilities and integration process.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#00E5BE]/40 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-0.5 text-xs text-gray-300 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Final High-Impact CTA Banner & Contact Routing */}
      <section id="contact" className="relative z-10 py-14 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto w-full scroll-mt-28">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1f24] via-[#08131c] to-[#060913] border border-[#00E5BE]/30 p-7 sm:p-10 text-center space-y-5 shadow-[0_0_40px_rgba(0,229,190,0.12)] hover:border-[#00E5BE]/60 transition-all duration-500">
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[#00E5BE] text-[10px] font-bold tracking-widest uppercase">
              TAKE THE NEXT STEP
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Build Your AI-Powered Solution <span className="text-[#00E5BE]">Now</span>
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Automate lead generation, customer engagement, and business workflows with Saudi Arabia&apos;s leading AI transformation partner.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] transition-all shadow-[0_4px_16px_rgba(0,229,190,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              <span>LET&apos;S TALK / CONTACT US</span>
            </Link>

            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>BACK TO TOP ↑</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. Enterprise Footer */}
      <Footer />

    </div>
  );
}
