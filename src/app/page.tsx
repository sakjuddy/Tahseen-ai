"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
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
  Cpu,
  Layers,
} from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";
import Footer from "@/components/Footer";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14L18 4L28 14V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V14Z" />
          <path d="M12 18L16 22L22 14" />
        </svg>
      ),
    },
    {
      title: "Personalized Outreach",
      desc: "Deliver tailored messages to each customer for more impactful, targeted, and engaging communication.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="11" />
          <polyline points="16,9 16,16 21,19" />
        </svg>
      ),
    },
    {
      title: "Future-Proof Architecture",
      desc: "Stay ahead with continuous AI model updates, enterprise security, and built-in adaptability for evolving needs.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      role: "FutureTech",
    },
    {
      quote: "The AI automation was easy to deploy and helped us serve clients faster and more consistently across Saudi Arabia.",
      author: "Sara Al-Harbi",
      role: "DataPlus",
    },
    {
      quote: "Our team now focuses on strategy instead of repetitive tasks — Tahseen took care of the rest seamlessly.",
      author: "Ismael Mohammad",
      role: "Owner of Deconec",
    },
    {
      quote: "We saw measurable gains in operational efficiency and client satisfaction. Highly recommend Tahseen for any business.",
      author: "Saleh El Oamry",
      role: "Owner of Canacio",
    },
  ];

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

      {/* 1. Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#060913]/85 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="py-3 sm:py-3.5 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full flex items-center justify-between">
          
          {/* Left: Official Brand Logo (Scrolls to Top / Home) */}
          <Link
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative h-11 w-52 sm:h-12 sm:w-60 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/tahseen-logo.png"
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 208px, 240px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Right: Nav Links & LET'S TALK Button */}
          <div className="flex items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-14">
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-12 text-sm sm:text-[15px] font-semibold tracking-wider text-gray-200">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-[#00E5BE] transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-[#00E5BE] transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </a>
                )
              )}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>LET&apos;S TALK</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Section (Home Anchor) */}
      <main id="home" className="relative z-10 pt-2 sm:pt-4 pb-12 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full">
        
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

            {/* Primary CTA Button (Smooth scrolls to Services) */}
            <div className="pt-2">
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, "#services")}
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline group cursor-pointer"
              >
                <span>LET&apos;S BUILD TOGETHER</span>
                <ArrowRight className="w-4 h-4 ml-2.5 text-[#00E5BE] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Hero Column: Spacer holding visual alignment for the 3D ring */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

        </div>

        {/* 3. Bottom 4 Services Row (Services Anchor with Scroll Margin) */}
        <div id="services" className="mt-24 sm:mt-32 pt-16 scroll-mt-28 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 text-center justify-items-center relative z-10 max-w-[1560px] mx-auto w-full">
          
          {/* Card 1: AI Agents */}
          <div className="space-y-4 sm:space-y-5 group flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center text-[#00E5BE] transition-transform duration-200 group-hover:scale-110 mx-auto">
              <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6C13.477 6 9 10.477 9 16C9 19.387 10.686 22.38 13.286 24.19L14 28H24L24.714 24.19C27.314 22.38 29 19.387 29 16C29 10.477 24.523 6 19 6Z" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5 31.5H23.5" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
                <path d="M16 35H22" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
                <circle cx="19" cy="15.5" r="2.5" fill="#00E5BE"/>
                <line x1="19" y1="1.5" x2="19" y2="3.5" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
                <line x1="6.5" y1="9" x2="4.5" y2="7.5" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
                <line x1="31.5" y1="9" x2="33.5" y2="7.5" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
                <line x1="4.5" y1="18.5" x2="2.5" y2="18.5" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
                <line x1="33.5" y1="18.5" x2="35.5" y2="18.5" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center">AI Agents</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-[300px] text-center mx-auto">
              Intelligent agents that <br />
              automate and scale your <br />
              operations.
            </p>
          </div>

          {/* Card 2: Automation */}
          <div className="space-y-4 sm:space-y-5 group flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center text-[#00E5BE] transition-transform duration-200 group-hover:scale-110 mx-auto">
              <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4L22.2 7.8C23.5 9.3 25.5 10.1 27.5 9.9L32.2 9.5L33 14.2C33.3 16.2 34.6 17.9 36.5 18.7L37 19L36.5 19.3C34.6 20.1 33.3 21.8 33 23.8L32.2 28.5L27.5 28.1C25.5 27.9 23.5 28.7 22.2 30.2L19 34L15.8 30.2C14.5 28.7 12.5 27.9 10.5 28.1L5.8 28.5L5 23.8C4.7 21.8 3.4 20.1 1.5 19.3L1 19L1.5 18.7C3.4 17.9 4.7 16.2 5 14.2L5.8 9.5L10.5 9.9C12.5 10.1 14.5 9.3 15.8 7.8L19 4Z" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="19" r="5" stroke="#00E5BE" strokeWidth="2.4"/>
                <circle cx="19" cy="19" r="1.5" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center">Automation</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-[300px] text-center mx-auto">
              Streamline workflows <br />
              and eliminate repetitive <br />
              tasks.
            </p>
          </div>

          {/* Card 3: Consulting */}
          <div className="space-y-4 sm:space-y-5 group flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center text-[#00E5BE] transition-transform duration-200 group-hover:scale-110 mx-auto">
              <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19C9 13.477 13.477 9 19 9C24.523 9 29 13.477 29 19C29 21.884 27.781 24.484 25.823 26.315L27 32L21.5 30.2C20.697 30.457 19.86 30.6 19 30.6C13.477 30.6 9 26.123 9 20.6V19Z" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C12 7.5 15 5 19 5C23 5 26 7.5 26 11" stroke="#00E5BE" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 3"/>
                <circle cx="19" cy="19" r="3" stroke="#00E5BE" strokeWidth="2.2"/>
                <circle cx="19" cy="19" r="1.2" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center">Consulting</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-[300px] text-center mx-auto">
              AI strategy and roadmap <br />
              aligned with your business <br />
              goals.
            </p>
          </div>

          {/* Card 4: Development */}
          <div className="space-y-4 sm:space-y-5 group flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center text-[#00E5BE] transition-transform duration-200 group-hover:scale-110 mx-auto">
              <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5H7C5.895 5 5 5.895 5 7V12" stroke="#00E5BE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26 5H31C32.105 5 33 5.895 33 7V12" stroke="#00E5BE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 26V31C5 32.105 5.895 33 7 33H12" stroke="#00E5BE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M33 26V31C33 32.105 32.105 33 31 33H26" stroke="#00E5BE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="19" r="5" stroke="#00E5BE" strokeWidth="2.2"/>
                <circle cx="19" cy="19" r="2" fill="#00E5BE"/>
                <line x1="19" y1="10" x2="19" y2="12" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="19" y1="26" x2="19" y2="28" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="10" y1="19" x2="12" y2="19" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="26" y1="19" x2="28" y2="19" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center">Development</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-[300px] text-center mx-auto">
              Custom AI solutions <br />
              built for real-world <br />
              impact.
            </p>
          </div>

        </div>

      </main>

      {/* 4. Social Proof & National Impact Strip */}
      <section id="about" className="relative z-10 py-12 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full scroll-mt-28">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#00E5BE] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Pioneering Saudi AI Innovation</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Adopted by leading enterprises across Saudi Arabia & SMEs
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Transforming operations with custom AI agents, automated sales pipelines, and bespoke intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE]">
            <HeartHandshake className="w-5 h-5 flex-shrink-0" />
            <div className="text-left text-xs font-medium">
              <span className="font-bold text-white">Social Impact:</span> We donate 1% of proceeds to the <span className="underline decoration-[#00E5BE]">Ehsan Platform (منصة إحسان)</span>.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Insights Section (Real-Time Oversight & Actionable Data) */}
      <section id="insights" className="relative z-10 py-20 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full scroll-mt-28">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-xs font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>LIVE OVERSIGHT & REAL-TIME ANALYTICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Insights That Drive <span className="text-[#00E5BE]">Growth</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Track every campaign, automated agent, and customer interaction in real time to refine engagement strategies and eliminate guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Real-Time Oversight & Intelligence */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 space-y-8 shadow-[0_10px_40px_rgba(0,229,190,0.08)] flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#00E5BE] tracking-widest uppercase">LIVE OVERSIGHT</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Real-Time Insights</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Monitor your campaigns and customer touchpoints in real time to ensure maximum operational effectiveness and identify optimization opportunities instantly.
                </p>
              </div>

              {/* Metric Tags */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {["Customer Retention (+40%)", "Seamless Integrations", "Real-Time Reports", "Personalized Engagement"].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interactive Telemetry Widget Simulation */}
            <div className="p-5 rounded-2xl bg-[#060913]/90 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00E5BE] animate-pulse" />
                  <span className="font-bold text-white">Live AI Agent Telemetry</span>
                </div>
                <span className="text-[#00E5BE] font-mono font-semibold">99.98% Uptime</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-lg sm:text-xl font-bold text-white">~0.4s</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Latency</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-lg sm:text-xl font-bold text-[#00E5BE]">3.2X</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Conversion</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-lg sm:text-xl font-bold text-white">24/7</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Active Run</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Actionable Data & Smart Spending */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 space-y-8 shadow-[0_10px_40px_rgba(0,229,190,0.08)] flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#00E5BE] tracking-widest uppercase">STRATEGIC EFFICIENCY</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Actionable Data</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Leverage analytics to enhance team workflows, boost engagement, and make data-driven decisions that reduce overhead and increase marketing ROI.
                </p>
              </div>

              {/* Metric Tags */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {["Cost-Effective Deployment", "Smart Spending", "Data-Driven Decisions", "Increased Efficiency"].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Graphic Simulation */}
            <div className="p-5 rounded-2xl bg-[#060913]/90 border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-3">
                <span className="font-bold text-white">Monthly Workflow Efficiency</span>
                <span className="text-[#00E5BE] font-mono font-semibold">+45% Gain</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Manual Task Reduction</span>
                    <span className="text-[#00E5BE] font-bold">42%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[42%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Lead Response Speed</span>
                    <span className="text-[#00E5BE] font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Comprehensive AI Solutions Section */}
      <section id="solutions" className="relative z-10 py-20 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full scroll-mt-28">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5BE] text-xs sm:text-sm font-bold tracking-widest uppercase">
            EFFORTLESS DEPLOYMENT & REAL-TIME OVERSIGHT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AI-Powered Solutions Built for <span className="text-[#00E5BE]">Scale</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Simplify deployment, optimize data workflows, and deliver automated intelligence across every touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.title}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00E5BE]/40 transition-all duration-300 space-y-4 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,190,0.1)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                {sol.icon}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{sol.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">{sol.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Flexible Service Packages */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5BE] text-xs sm:text-sm font-bold tracking-widest uppercase">
            TRANSPARENT ENGAGEMENT, MEASURABLE RESULTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Flexible Plans for <span className="text-[#00E5BE]">Companies & SMEs</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Choose the engagement model that fits your operational goals and scale seamlessly as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#0d1c24] to-[#060913] border-2 border-[#00E5BE] shadow-[0_0_40px_rgba(0,229,190,0.2)] lg:-translate-y-2"
                  : "bg-white/[0.02] border border-white/[0.06] hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00E5BE] text-[#060913] text-[11px] font-extrabold tracking-widest uppercase">
                  {plan.tag}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#00E5BE] tracking-wider uppercase">{plan.subtitle}</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{plan.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="h-px bg-white/10" />

                <ul className="space-y-3.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#00E5BE] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-white/5">
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_20px_rgba(0,229,190,0.4)]"
                      : "btn-teal-outline"
                  }`}
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. What Our Clients Say (Testimonials) */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5BE] text-xs sm:text-sm font-bold tracking-widest uppercase">
            TRUSTED BY INNOVATORS NATIONWIDE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What Our <span className="text-[#00E5BE]">Clients</span> Say
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Hear from forward-thinking leaders who have modernized their workflows with Tahseen AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00E5BE]/30 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <p className="text-sm text-gray-300 leading-relaxed font-normal italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-white/5">
                <div className="font-bold text-white text-base">{t.author}</div>
                <div className="text-xs text-[#00E5BE] font-semibold">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Interactive FAQ Section */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-16 max-w-[1200px] mx-auto w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5BE] text-xs sm:text-sm font-bold tracking-widest uppercase">
            YOUR QUERIES, SIMPLIFIED
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-[#00E5BE]">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Find clear answers to common questions about Tahseen AI&apos;s capabilities and integration process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-colors duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00E5BE] flex-shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Final High-Impact CTA Banner & Contact Routing */}
      <section id="contact" className="relative z-10 py-20 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full scroll-mt-28">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1f24] via-[#08131c] to-[#060913] border border-[#00E5BE]/30 p-10 sm:p-16 text-center space-y-8 shadow-[0_0_60px_rgba(0,229,190,0.15)]">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[#00E5BE] text-xs sm:text-sm font-bold tracking-widest uppercase">
              TAKE THE NEXT STEP
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Build Your AI-Powered Solution <span className="text-[#00E5BE]">Now</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Automate lead generation, customer engagement, and business workflows with Saudi Arabia&apos;s leading AI transformation partner.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-lg bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] transition-all shadow-[0_4px_25px_rgba(0,229,190,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 mr-2.5" />
              <span>LET&apos;S TALK / CONTACT US</span>
            </Link>

            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
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
