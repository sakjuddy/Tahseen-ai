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
  HeartHandshake,
  Mail,
  Activity,
  BarChart3,
  TrendingUp,
  Quote,
  Star,
  Bot,
  Workflow,
  LineChart,
  Users,
  HelpCircle,
  Globe,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Compass,
  ExternalLink,
  Sun,
  Moon,
  Cpu,
  ShieldCheck,
  Terminal,
  Zap,
  Check,
  Search,
  MessageSquare,
  FileText,
  Sliders,
  Send,
  Layers,
  Clock,
  Play,
  Share2,
} from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isAr = lang === "ar";
  const isLight = theme === "light";
  const contactHref = isAr ? "/contact?lang=ar" : "/contact";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqFilter, setFaqFilter] = useState<string>("all");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<"sales" | "marketing" | "customer" | "operations">("sales");
  const [activeEduStation, setActiveEduStation] = useState<"qudurat" | "tahsili" | "bausalty">("qudurat");
  const [activeBentoTab, setActiveBentoTab] = useState<"chat" | "email" | "flow">("chat");

  // Sync Language & Theme from LocalStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang");
        if (urlLang === "en" || urlLang === "ar") {
          setLang(urlLang as "ar" | "en");
        } else {
          const saved = localStorage.getItem("tahseen_lang");
          if (saved === "en" || saved === "ar") {
            setLang(saved as "ar" | "en");
          }
        }

        const savedTheme = localStorage.getItem("tahseen_theme") as "dark" | "light" | null;
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme);
          document.documentElement.classList.remove("dark", "light");
          document.documentElement.classList.add(savedTheme);
        } else {
          document.documentElement.classList.add("dark");
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [lang, isAr]);

  const toggleLanguage = () => {
    const nextLang = isAr ? "en" : "ar";
    setLang(nextLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("tahseen_lang", nextLang);
      const url = new URL(window.location.href);
      if (nextLang === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", "ar");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("tahseen_theme", nextTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(nextTheme);
    }
  };

  const navLinks = isAr
    ? [
        { name: "الرئيسية", href: "#home" },
        { name: "خدماتنا", href: "#services" },
        { name: "تحسين التعليمية", href: "#education" },
        { name: "التحليلات", href: "#insights" },
        { name: "الحلول", href: "#solutions" },
        { name: "من نحن", href: "#about" },
        { name: "اتصل بنا", href: contactHref },
      ]
    : [
        { name: "HOME", href: "#home" },
        { name: "SERVICES", href: "#services" },
        { name: "EDUCATION", href: "#education" },
        { name: "INSIGHTS", href: "#insights" },
        { name: "SOLUTIONS", href: "#solutions" },
        { name: "ABOUT US", href: "#about" },
        { name: "CONTACT", href: contactHref },
      ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
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

  const testimonials = isAr
    ? [
        {
          quote: "ساهمت تحسين في تبسيط عملياتنا الداخلية — قلصنا أكثر من ٤٠٪ من المهام اليدوية خلال أسابيع قليلة.",
          author: "أحمد المطيري",
          role: "مدير العمليات، FutureTech",
          company: "FutureTech KSA",
          avatar: "AM",
          metrics: "تقليص ٤٠٪ من العمل اليدوي",
        },
        {
          quote: "أتمتة الذكاء الاصطناعي كانت سهلة التدشين وساعدتنا على خدمة عملائنا في المملكة بسرعة وثبات فائقين.",
          author: "سارة الحربي",
          role: "رئيسة النمو، DataPlus",
          company: "DataPlus Riyadh",
          avatar: "SH",
          metrics: "٣ أضعاف سرعة الرد",
        },
        {
          quote: "الوكلاء الأذكياء وفروا تجربة تفاعلية مميزة لعملائنا ورفعوا معدلات التحويل المالي بأكثر من ٤٥٪.",
          author: "خالد الغامدي",
          role: "الرئيس التنفيذي، CloudSphere",
          company: "CloudSphere",
          avatar: "KG",
          metrics: "+٤٥٪ زيادة المبيعات",
        },
      ]
    : [
        {
          quote: "Tahseen streamlined our operations end-to-end — we eliminated repetitive manual workflows in just weeks.",
          author: "Ahmed Al-Mutairi",
          role: "Head of Operations",
          company: "FutureTech KSA",
          avatar: "AM",
          metrics: "-42% Manual Workload",
        },
        {
          quote: "The autonomous agent deployment was seamless and allows us to serve enterprise clients across KSA with speed and precision.",
          author: "Sarah Al-Harbi",
          role: "Growth Director",
          company: "DataPlus Riyadh",
          avatar: "SH",
          metrics: "3X Lead Response Time",
        },
        {
          quote: "Tahseen AI delivers incredible ROI and enterprise clarity. Their intelligent workflows increased our conversion rates significantly.",
          author: "Khaled Al-Ghamdi",
          role: "CEO",
          company: "CloudSphere",
          avatar: "KG",
          metrics: "+45% Conversion Lift",
        },
      ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const rawFaqs = isAr
    ? [
        {
          category: "services",
          q: "ما هي مجموعة تحسين للذكاء الاصطناعي (Tahseen AI)؟",
          a: "تحسين هي شركة تقنية سعودية رائدة متخصصة في إعادة تعريف وتطوير العمليات المؤسسية عبر حلول الذكاء الاصطناعي المتقدمة، وأتمتة مسارات العمل، ونظم الوكلاء الأذكياء المستقلة.",
        },
        {
          category: "services",
          q: "ما هي أبرز الخدمات التي تقدمها تحسين للذكاء الاصطناعي؟",
          a: "نقدم استشارات واستراتيجيات الذكاء الاصطناعي، وتطوير مواقع وتطبيقات الجوال الذكية، وبناء وكلاء ذكاء اصطناعي للمبيعات والتسويق، وحلول مراكز الاتصال الذكية، وأتمتة العمليات المتكاملة.",
        },
        {
          category: "enterprise",
          q: "لماذا تحتاج منشأتي إلى حلول تحسين للذكاء الاصطناعي؟",
          a: "توفر تحسين قيمة استثنائية عبر تقليص أكثر من ٤٠٪ من المهام اليدوية المتكررة، ومضاعفة سرعة الاستجابة للعملاء، ونشر أنظمة ذكية ذاتية التشغيل ومصممة خصيصاً لتحقيق أهدافك.",
        },
        {
          category: "customization",
          q: "هل يمكن تخصيص حلول تحسين لتتطابق مع هوية ونبرة علامتي التجارية؟",
          a: "بالتأكيد. كل وكيل ذكي ونظام أتمتة يتم تدريبه وتخصيصه بالكامل ليتوافق مع هوية منشأتك، ونبرة مخاطبة عملائك، وقواعد بياناتك الداخلية.",
        },
        {
          category: "enterprise",
          q: "هل توفر تحسين خدماتها للشركات الناشئة ورواد الأعمال؟",
          a: "نعم. بالإضافة إلى الحلول المؤسسية الكبرى (Enterprise)، نوفر حلولاً مخصصة وعالية الأثر للشركات الناشئة ورواد الأعمال لمساعدتهم على النمو المتسارع.",
        },
      ]
    : [
        {
          category: "services",
          q: "What is Tahseen AI?",
          a: "Tahseen AI is a pioneering Saudi Arabian startup poised to redefine B2B operations across SMEs through cutting-edge artificial intelligence, workflow automation, and custom intelligent agent systems.",
        },
        {
          category: "services",
          q: "What are Tahseen AI's primary services?",
          a: "We provide AI Consultation & Strategy, Full-stack Web & Mobile Development, AI Agents for Sales & Marketing, Corporate AI Training & Workshops, AI Chat & Call Centre Solutions, and End-to-End Workflow Automation.",
        },
        {
          category: "enterprise",
          q: "Why do I need Tahseen AI solutions?",
          a: "Tahseen AI delivers unparalleled value by reducing repetitive manual tasks by over 40%, accelerating response times, and deploying scalable autonomous systems tailored specifically to your business goals.",
        },
        {
          category: "customization",
          q: "Can I customize Tahseen AI to fit my brand?",
          a: "Absolutely. Every AI agent, workflow, and web platform is fully tailored to match your brand identity, tone of voice, internal databases, and operational requirements.",
        },
        {
          category: "enterprise",
          q: "Does Tahseen AI provide services to individuals and startups?",
          a: "Yes. In addition to enterprise B2B solutions, Tahseen AI provides adaptable, high-impact AI solutions tailored for growing startups, entrepreneurs, and professional teams.",
        },
      ];

  const filteredFaqs = rawFaqs.filter((faq) => {
    if (faqFilter === "all") return true;
    return faq.category === faqFilter;
  });

  const basePillsRow1 = isAr
    ? [
        "تقارير فورية مباشرة",
        "تفاعل مخصص وذكي",
        "الحفاظ على العملاء",
        "تكامل سلس مع الأنظمة",
        "بث بيانات مباشر",
        "دقة معالجة استثنائية",
      ]
    : [
        "Real-Time Reports",
        "Personalized Engagement",
        "Customer Retention",
        "Seamless Integrations",
        "Live Telemetry Stream",
        "High-Assurance AI",
      ];

  const basePillsRow2 = isAr
    ? [
        "زيادة الكفاءة التشغيلية",
        "اقتصادي ومجدٍ",
        "إنفاق مالي ذكي",
        "قرارات مدفوعة بالبيانات",
        "تدفقات عمل مؤتمتة",
      ]
    : [
        "Increased Efficiency",
        "Cost-Effective",
        "Smart Spending",
        "Data-Driven Decisions",
        "Automated Workflows",
      ];

  const pillsRow1 = [...basePillsRow1, ...basePillsRow1];
  const pillsRow2 = [...basePillsRow2, ...basePillsRow2];

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`relative min-h-screen flex flex-col justify-between overflow-x-clip font-sans transition-colors duration-300 ${
        isLight ? "bg-[#FAFAFA] text-slate-900" : "bg-[#060913] text-white"
      }`}
    >
      {/* Background ambient radial glows */}
      <div className={`absolute top-0 right-1/4 w-[350px] sm:w-[700px] h-[350px] sm:h-[550px] rounded-full pointer-events-none -z-10 ${
        isLight ? "bg-cyan-500/5 blur-[120px]" : "bg-cyan-500/10 blur-[140px] sm:blur-[170px]"
      }`} />
      <div className={`absolute top-[45%] left-[-100px] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full pointer-events-none -z-10 ${
        isLight ? "bg-[#00E5BE]/4 blur-[140px]" : "bg-[#00E5BE]/5 blur-[160px] sm:blur-[200px]"
      }`} />
      <div className={`absolute bottom-[10%] right-[-80px] w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] rounded-full pointer-events-none -z-10 ${
        isLight ? "bg-cyan-500/4 blur-[140px]" : "bg-cyan-500/8 blur-[160px] sm:blur-[200px]"
      }`} />

      {/* 1. Sticky Header / Navbar (Kept Untouched as Requested) */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-all duration-300 ${
        isLight ? "bg-white/90 border-slate-200/80 shadow-xs" : "bg-[#060913]/90 border-white/[0.04]"
      }`}>
        <div className="py-2.5 sm:py-3 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative h-8 w-36 sm:h-9 sm:w-44 lg:h-10 lg:w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={isLight ? "/tahseen-logo-light.png" : "/tahseen-logo.png"}
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 144px, 192px"
                className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links & Controls */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <nav className={`flex items-center gap-4 lg:gap-6 text-xs font-semibold tracking-wider ${
              isLight ? "text-slate-700" : "text-gray-300"
            }`}>
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

            {/* Little Theme Switch Slider (RTL/LTR Normalized with dir="ltr") */}
            <button
              onClick={toggleTheme}
              type="button"
              dir="ltr"
              role="switch"
              aria-checked={isLight}
              aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              className="relative inline-flex items-center w-12 h-6 p-0.5 rounded-full border border-white/20 bg-white/10 transition-colors duration-300 cursor-pointer flex-shrink-0"
            >
              <div className="w-full flex justify-between items-center px-1 text-xs select-none pointer-events-none">
                <Sun className={`w-3 h-3 ${isLight ? "text-amber-500 opacity-100" : "text-gray-400 opacity-40"}`} />
                <Moon className={`w-3 h-3 ${!isLight ? "text-cyan-300 opacity-100" : "text-gray-400 opacity-40"}`} />
              </div>
              <span
                style={{ left: "2px" }}
                className={`absolute top-0.5 bottom-0.5 w-5 h-5 rounded-full bg-[#00E5BE] shadow-xs flex items-center justify-center text-[#060913] transition-transform duration-300 transform ${
                  isLight ? "translate-x-0" : "translate-x-6"
                }`}
              >
                {isLight ? <Sun className="w-3 h-3 text-[#060913]" /> : <Moon className="w-3 h-3 text-[#060913]" />}
              </span>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5BE]/40 text-gray-200 hover:text-[#00E5BE] transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#00E5BE]" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            {/* Contact Action Button */}
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>{isAr ? "تحدث معنا" : "LET'S TALK"}</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Switcher, Language & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Little Theme Slider */}
            <button
              onClick={toggleTheme}
              type="button"
              dir="ltr"
              aria-label="Toggle theme"
              className="relative inline-flex items-center w-11 h-5.5 p-0.5 rounded-full border border-white/20 bg-white/10 transition-colors"
            >
              <div className="w-full flex justify-between items-center px-1 text-[10px]">
                <Sun className={`w-2.5 h-2.5 ${isLight ? "text-amber-500" : "text-gray-400 opacity-40"}`} />
                <Moon className={`w-2.5 h-2.5 ${!isLight ? "text-cyan-300" : "text-gray-400 opacity-40"}`} />
              </div>
              <span
                style={{ left: "2px" }}
                className={`absolute top-0.5 bottom-0.5 w-4.5 h-4.5 rounded-full bg-[#00E5BE] shadow-xs flex items-center justify-center text-[#060913] transition-transform duration-300 transform ${
                  isLight ? "translate-x-0" : "translate-x-5"
                }`}
              >
                {isLight ? <Sun className="w-2.5 h-2.5" /> : <Moon className="w-2.5 h-2.5" />}
              </span>
            </button>

            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/[0.04] border border-white/10 text-gray-200 hover:text-[#00E5BE]"
            >
              <Globe className="w-3 h-3 text-[#00E5BE]" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </button>

            <Link
              href={contactHref}
              className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-md btn-teal-outline"
            >
              <span>{isAr ? "تواصل" : "TALK"}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white hover:text-[#00E5BE] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#060913]/98 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-sm font-bold">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 border-b border-white/5 text-gray-200 hover:text-[#00E5BE] transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 text-gray-500 ${isAr ? "rotate-180" : ""}`} />
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="py-2.5 border-b border-white/5 text-gray-200 hover:text-[#00E5BE] transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 text-gray-500 ${isAr ? "rotate-180" : ""}`} />
                  </a>
                )
              )}
            </nav>

            <div className="pt-2">
              <Link
                href={contactHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 text-xs font-bold tracking-widest uppercase rounded-xl bg-[#00E5BE] text-[#060913] shadow-[0_4px_20px_rgba(0,229,190,0.4)]"
              >
                <span>{isAr ? "ابدأ مشروعك معنا ←" : "LET'S TALK / CONTACT →"}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Kept Untouched as Requested) */}
      <main id="home" className="relative z-10 pt-4 sm:pt-6 pb-10 px-4 sm:px-8 lg:px-16 max-w-[1680px] mx-auto w-full">
        
        {/* 3D Canvas Layer */}
        <HeroRing3D mirrored={isAr} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[460px] sm:min-h-[480px] lg:min-h-[520px] pointer-events-none">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 text-start pointer-events-auto">
            
            {/* Primary Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              {isAr ? (
                <>
                  حلول ذكاء اصطناعي <br />
                  <span className="text-[#00E5BE]">تُعزز</span> وتطوّر أعمالك
                </>
              ) : (
                <>
                  AI Solutions That <br />
                  <span className="text-[#00E5BE]">Enhance</span> Your Work
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed font-normal max-w-lg">
              {isAr
                ? "نبتكر ونبني وكلاء ذكاء اصطناعي وأنظمة أتمتة متطورة تمكّن الشركات والمؤسسات من العمل بذكاء وسرعة وإنتاجية مضاعفة."
                : "We build agents and automation systems that help businesses work smarter, faster, and more efficiently."}
            </p>

            {/* Primary CTA Button */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer group"
              >
                <span>{isAr ? "لنبنِ معاً" : "LET'S BUILD TOGETHER"}</span>
                <ArrowRight className={`w-4 h-4 text-[#00E5BE] transition-transform duration-300 group-hover:translate-x-1 ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            </div>

          </div>

          {/* Right Empty Spacing for 3D Ring */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 h-[420px]" />

        </div>

        {/* 3. Core 4 Services Section */}
        <div id="services" className="relative z-10 pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pointer-events-auto scroll-mt-24 sm:scroll-mt-28">
          
          {/* Card 1: AI Agents */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="26" height="26" rx="6" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18L16 22L24 14" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="18" r="1.5" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "وكلاء الذكاء الاصطناعي" : "AI Agents"}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              {isAr
                ? "وكلاء أذكياء يعملون بشكل مستقل لأتمتة وتوسيع نطاق عملياتك."
                : "Intelligent agents that automate and scale your operations."}
            </p>
          </div>

          {/* Card 2: Automation */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="18,4 31,11 31,25 18,32 5,25 5,11" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="18" y1="4" x2="18" y2="18" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="18" x2="31" y2="25" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="18" x2="5" y2="25" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="2.5" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "أتمتة العمليات" : "Automation"}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              {isAr
                ? "تبسيط مسارات العمل والتخلص من المهام اليدوية المتكررة."
                : "Streamline workflows and eliminate repetitive tasks."}
            </p>
          </div>

          {/* Card 3: Consulting */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="24" height="24" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19C9 13.477 13.477 9 19 9C24.523 9 29 13.477 29 19C29 21.884 27.781 24.484 25.823 26.315L27 32L21.5 30.2C20.697 30.457 19.86 30.6 19 30.6C13.477 30.6 9 26.123 9 20.6V19Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C12 7.5 15 5 19 5C23 5 26 7.5 26 11" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3"/>
                <circle cx="19" cy="19" r="2.8" stroke="#00E5BE" strokeWidth="2"/>
                <circle cx="19" cy="19" r="1" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "استشارات الذكاء الاصطناعي" : "Consulting"}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              {isAr
                ? "استراتيجيات وخارطة طريق ذكية متوافقة مع أهدافك المؤسسية."
                : "AI strategy and roadmap aligned with your business goals."}
            </p>
          </div>

          {/* Card 4: Development */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="26" height="26" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              {isAr ? "التطوير المخصص" : "Development"}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              {isAr
                ? "حلول برمجية وذكاء اصطناعي مصممة خصيصاً لتحقيق أثر واقعي وملموس."
                : "Custom AI solutions built for real-world impact."}
            </p>
          </div>

        </div>

      </main>

      {/* 4. Enterprise Social Proof & Partner Logos */}
      <section id="about" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28">
        
        {/* Centered Heading with Dotted Divider Lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-8 w-full mb-8 sm:mb-10">
          <div className="hidden sm:block flex-1 border-t border-dashed border-white/20" />
          <h4 className="text-xs sm:text-base md:text-lg font-bold text-gray-200 text-center tracking-tight leading-relaxed max-w-xl">
            {isAr ? (
              <>
                معتمد وموثوق من قِبل كبرى المؤسسات الرائدة <br className="hidden sm:inline" />
                في المملكة العربية السعودية
              </>
            ) : (
              <>
                Adopted by renowned, trusted, and leading enterprises <br className="hidden sm:inline" />
                in Saudi Arabia
              </>
            )}
          </h4>
          <div className="hidden sm:block flex-1 border-t border-dashed border-white/20" />
        </div>

        {/* Crisp White/Teal Container Box */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/[0.96] backdrop-blur-2xl border-2 border-[#00E5BE]/40 p-5 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,229,190,0.18)] flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 transition-all duration-300">
          
          {/* Logo 1: Imam Abdulrahman Bin Faisal University */}
          <div className="relative h-12 w-28 sm:h-16 sm:w-40 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-1.png"
              alt="Imam Abdulrahman Bin Faisal University"
              fill
              sizes="(max-width: 640px) 112px, 160px"
              className="object-contain"
            />
          </div>

          {/* Logo 2: Zana */}
          <div className="relative h-10 w-24 sm:h-14 sm:w-32 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-2.png"
              alt="Zana - Empowering Startups"
              fill
              sizes="(max-width: 640px) 96px, 128px"
              className="object-contain"
            />
          </div>

          {/* Logo 3: ITQAN */}
          <div className="relative h-10 w-24 sm:h-14 sm:w-32 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-3.png"
              alt="ITQAN - Driven by Knowledge"
              fill
              sizes="(max-width: 640px) 96px, 128px"
              className="object-contain"
            />
          </div>

        </div>

      </section>

      {/* 5. VERTEX-INSPIRED 6-CARD BENTO GRID ("Everything you need to automate workflows") */}
      <section id="insights" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.07]">
        
        {/* Header Hook */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>{isAr ? "منظومة الأتمتة الشاملة" : "EVERYTHING YOU NEED TO AUTOMATE WORKFLOWS"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {isAr ? (
              <>
                تحليلات شاملة تقود <span className="text-[#00E5BE]">النمو والريادة</span>
              </>
            ) : (
              <>
                Comprehensive Insights That Drive <span className="text-[#00E5BE]">Growth</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {isAr
              ? "تتبّع كل حملة، ووكيل ذكي، وتفاعل مع العملاء بشكل فوري لتطوير استراتيجياتك والتخلص من التخمين."
              : "Track every campaign, automated agent, and customer interaction in real time to refine engagement strategies and eliminate guesswork."}
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Bento Card 1: Interactive Agent Copilot (Span 2 on desktop) */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl vertex-card flex flex-col justify-between space-y-6">
            <div className="space-y-3 text-start">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#00E5BE]/15 text-[#00E5BE] text-[10px] font-mono font-bold uppercase">
                  {isAr ? "محادثة تفاعلية فورية" : "LIVE AGENTIC COPILOT"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                  Latency: 0.12s
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {isAr ? "وكلاء الذكاء الاصطناعي للمبيعات والتواصل" : "AI-Powered Conversational Workflows"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                {isAr
                  ? "تأهيل العملاء المحتملين والإجابة على الاستفسارات المعقدة وجدولة الاجتماعات في التقويم آلياً."
                  : "Qualify leads, answer complex enterprise queries, and trigger downstream automations in real time."}
              </p>
            </div>

            {/* Interactive Chat Sandbox UI */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-sans text-xs text-start">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center font-bold font-mono text-[10px]">
                    TA
                  </div>
                  <span className="font-bold font-mono">Tahseen Sales Agent • WhatsApp Live</span>
                </div>
                <span className="text-[#00E5BE] font-mono text-[10px]">99.4% Match</span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-gray-300">
                  <div className="text-[9px] font-mono text-gray-500 mb-0.5">Enterprise Client (Riyadh, KSA)</div>
                  &ldquo;نحتاج ربط نظام نقاط البيع والمبيعات مع وكيل ذكاء اصطناعي للرد الفوري على استفسارات العقود.&rdquo;
                </div>
                <div className="p-3 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white">
                  <div className="text-[9px] font-mono text-[#00E5BE] mb-0.5 font-bold">Tahseen Autonomous Agent</div>
                  &ldquo;تم تحليل الطلب ومطابقة حلول الأتمتة المخصصة. تم حجز موعد تدشين غداً الساعة ٢:٠٠ ظهراً مع الفريق الهندسي.&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Workflow Analytics & Insights */}
          <div className="p-6 sm:p-8 rounded-3xl vertex-card flex flex-col justify-between space-y-6 text-start">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-2">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                {isAr ? "مؤشرات وتحليلات الأداء اللحظية" : "Workflow Analytics & Telemetry"}
              </h3>
              <p className="text-xs text-gray-400">
                {isAr
                  ? "رصد فوري لنسب نجاح الأتمتة ومعدلات التحويل مع تقليل الأخطاء البشرية."
                  : "Monitor automation performance with real-time success metrics and error-free execution."}
              </p>
            </div>

            {/* Metric Meters */}
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-[#00E5BE] font-bold">99.98%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[99.98%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-400">RESPONSE</div>
                  <div className="text-sm font-bold text-white">&lt; 0.4s</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-400">LIFT</div>
                  <div className="text-sm font-bold text-[#00E5BE]">+45%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Plain Language to Workflow */}
          <div className="p-6 sm:p-8 rounded-3xl vertex-card flex flex-col justify-between space-y-6 text-start">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-2">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                {isAr ? "من الفكرة إلى مسار عمل مؤتمت" : "Plain English to Workflow"}
              </h3>
              <p className="text-xs text-gray-400">
                {isAr
                  ? "صف المهام المطلوبة، ويقوم النظام ببناء مسار الأتمتة وربط قواعد البيانات تلقائياً."
                  : "Describe any operational goal. Tahseen turns it into an enterprise pipeline in seconds."}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Prompt: Auto-invoice parsing & ZATCA sync</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300">
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Pipeline: Ingest → OCR → Validate → Database</span>
              </div>
              <div className="flex items-center gap-2 text-[#00E5BE]">
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Status: Active & Auto-healing</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Meeting & Voice to Workflow (Span 2 on desktop) */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl vertex-card flex flex-col justify-between space-y-6">
            <div className="space-y-3 text-start">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#A855F7]/15 text-[#A855F7] text-[10px] font-mono font-bold uppercase">
                  {isAr ? "أتمتة الاجتماعات والاتصالات" : "TURN CONVERSATIONS INTO WORKFLOWS"}
                </span>
                <span className="text-xs text-gray-400 font-mono">AI Transcription & Action Items</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {isAr ? "تحويل الاجتماعات والمكالمات إلى مهام تنفيذية" : "Voice & Meeting Intelligence"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                {isAr
                  ? "تسجيل وتفريغ المكالمات واستخراج التوصيات والمهام وتعيين المسؤولين وتحديث الأنظمة فوراً."
                  : "Transcribe calls, surface key action items, and trigger automated downstream workflows effortlessly."}
              </p>
            </div>

            {/* Audio Waveform & Action Item UI */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-start">
              <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-4">
                <div className="flex items-center gap-2 text-[10px] text-[#00E5BE] font-mono">
                  <Play className="w-3 h-3 fill-[#00E5BE]" />
                  <span>Call Audio Analyzed • 14:45 min</span>
                </div>
                <p className="text-gray-300 italic text-[11px] leading-relaxed">
                  &ldquo;أكد العميل رغبته في تدشين الوكلاء الذكيين للفروع، مع ضرورة إرسال ملخص العقد المالي.&rdquo;
                </p>
              </div>

              <div className="space-y-2 sm:pl-2">
                <div className="text-[10px] text-gray-400 font-mono uppercase">Auto-Generated Actions:</div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                    <span>RFP & Contract Drafted in CRM</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                    <span>Follow-up WhatsApp Scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 6. VERTEX-INSPIRED DEPARTMENT WORKFLOW TABS ("Built for the scale of automation") */}
      <section id="solutions" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08] bg-[#050814]/80">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isAr ? "مُصمم للتوسع المؤسسي عالي الكفاءة" : "BUILT FOR THE SCALE OF ENTERPRISE AUTOMATION"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {isAr ? (
              <>
                حلول ذكاء اصطناعي مصممة <span className="text-[#00E5BE]">لقطاعك</span>
              </>
            ) : (
              <>
                AI Solutions Built for <span className="text-[#00E5BE]">Your Industry</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {isAr
              ? "تصفح حلولنا المتخصصة والمصممة للقضاء على القيود التشغيلية وتسريع نمو المؤسسات السعودية."
              : "Scroll through our specialized intelligence offerings engineered to eliminate manual friction and scale Saudi enterprise operations."}
          </p>

          {/* Department Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "sales", label: isAr ? "مسارات المبيعات" : "Sales Workflows", desc: "Lead routing & deal conversion" },
              { id: "marketing", label: isAr ? "مسارات التسويق" : "Marketing Workflows", desc: "Campaign triggers & scoring" },
              { id: "customer", label: isAr ? "خدمة العملاء" : "Customer Workflows", desc: "24/7 autonomous support" },
              { id: "operations", label: isAr ? "العمليات والـ ERP" : "Operations Workflows", desc: "Data sync & approval chains" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveWorkflowTab(tab.id as any)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeWorkflowTab === tab.id
                    ? "bg-[#00E5BE] text-[#060913] shadow-[0_0_20px_rgba(0,229,190,0.4)] scale-105"
                    : "bg-white/[0.03] text-gray-300 border border-white/10 hover:border-[#00E5BE]/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Workflow Tab Display Panel */}
        <div className="p-6 sm:p-10 rounded-3xl vertex-card max-w-5xl mx-auto text-start space-y-6">
          {activeWorkflowTab === "sales" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {isAr ? "وكلاء الذكاء الاصطناعي للمبيعات والتسويق" : "Sales Workflows & Lead Conversion"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {isAr ? "ذكاء اصطناعي تفاعلي متعدد القنوات لتأهيل العملاء وإغلاق الصفقات على مدار الساعة." : "Autonomous multi-channel intelligence that qualifies leads and converts 24/7."}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#00E5BE]/10 text-[#00E5BE] text-xs font-mono font-bold">
                    3X Growth
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-mono">
                    &lt; 10s Response
                  </span>
                </div>
              </div>

              {/* 3 Step Visual Sequence */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#00E5BE] font-bold text-[10px]">STEP 01</div>
                  <div className="font-bold text-white font-sans text-sm">Lead Ingestion</div>
                  <p className="text-[11px] text-gray-400 font-sans">Multi-channel WhatsApp, email & webchat capture.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#00E5BE] font-bold text-[10px]">STEP 02</div>
                  <div className="font-bold text-white font-sans text-sm">AI Qualification</div>
                  <p className="text-[11px] text-gray-400 font-sans">Budget check, intent analysis & instant CRM scoring.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 space-y-1.5 text-white">
                  <div className="text-[#00E5BE] font-bold text-[10px]">STEP 03</div>
                  <div className="font-bold font-sans text-sm">Auto-Booking</div>
                  <p className="text-[11px] text-gray-300 font-sans">Calendar slot reserved & executive summary dispatched.</p>
                </div>
              </div>
            </div>
          )}

          {activeWorkflowTab === "marketing" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {isAr ? "أتمتة الحملات والتسويق الذكي" : "Marketing Workflows & Lead Scoring"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {isAr ? "أتمتة استهداف العملاء وتوزيع المحتوى وقياس التفاعل اللحظي." : "Campaign automation, predictive scoring, and multi-channel engagement."}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-mono font-bold">
                  +45% Conversion Lift
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#38BDF8] font-bold text-[10px]">PHASE 01</div>
                  <div className="font-bold text-white font-sans text-sm">Audience Segmentation</div>
                  <p className="text-[11px] text-gray-400 font-sans">Predictive clustering of Saudi customer profiles.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#38BDF8] font-bold text-[10px]">PHASE 02</div>
                  <div className="font-bold text-white font-sans text-sm">Personalized Outreach</div>
                  <p className="text-[11px] text-gray-400 font-sans">Dynamic WhatsApp templates & tailored messaging.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 space-y-1.5 text-white">
                  <div className="text-[#38BDF8] font-bold text-[10px]">PHASE 03</div>
                  <div className="font-bold font-sans text-sm">Real-Time Attribution</div>
                  <p className="text-[11px] text-gray-300 font-sans">Live telemetry tracking ROI and conversions.</p>
                </div>
              </div>
            </div>
          )}

          {activeWorkflowTab === "customer" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {isAr ? "مراكز الاتصال وخدمة العملاء الذاتية" : "Customer Support & 24/7 Care"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {isAr ? "استجابة فورية لحل مشاكل العملاء وتوجيه التذاكر المعقدة." : "Instant autonomous query resolution and intelligent ticket routing."}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00E5BE]/10 text-[#00E5BE] text-xs font-mono font-bold">
                  24/7 / 365
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#00E5BE] font-bold text-[10px]">LAYER 01</div>
                  <div className="font-bold text-white font-sans text-sm">Contextual Ingestion</div>
                  <p className="text-[11px] text-gray-400 font-sans">Reads customer history from ERP and past interactions.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#00E5BE] font-bold text-[10px]">LAYER 02</div>
                  <div className="font-bold text-white font-sans text-sm">Instant Resolution</div>
                  <p className="text-[11px] text-gray-400 font-sans">Solves over 80% of inquiries in &lt; 5 seconds.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 space-y-1.5 text-white">
                  <div className="text-[#00E5BE] font-bold text-[10px]">LAYER 03</div>
                  <div className="font-bold font-sans text-sm">Warm Hand-off</div>
                  <p className="text-[11px] text-gray-300 font-sans">Transfers edge cases to human specialists with full briefing.</p>
                </div>
              </div>
            </div>
          )}

          {activeWorkflowTab === "operations" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {isAr ? "أتمتة العمليات المؤسسية والـ ERP" : "Operations & Data Synchronization"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {isAr ? "الربط التلقائي بين قواعد البيانات وبوابات الدفع والفواتير." : "End-to-end data pipelines connecting SAP, Oracle, ZATCA, and payment gateways."}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] text-xs font-mono font-bold">
                  99.9% Accuracy
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#A855F7] font-bold text-[10px]">STAGE 01</div>
                  <div className="font-bold text-white font-sans text-sm">Document Parsing</div>
                  <p className="text-[11px] text-gray-400 font-sans">Automated OCR entity extraction and tax validation.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-[#A855F7] font-bold text-[10px]">STAGE 02</div>
                  <div className="font-bold text-white font-sans text-sm">Validation & Scopes</div>
                  <p className="text-[11px] text-gray-400 font-sans">Cross-checks approval thresholds and budget codes.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#A855F7]/10 border border-[#A855F7]/30 space-y-1.5 text-white">
                  <div className="text-[#A855F7] font-bold text-[10px]">STAGE 03</div>
                  <div className="font-bold font-sans text-sm">ERP Write-back</div>
                  <p className="text-[11px] text-gray-300 font-sans">Direct database commit with immutable audit logging.</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* 7. CONTINUOUS VALUE PILLS MARQUEE */}
      <section className="relative z-10 py-12 sm:py-16 overflow-hidden border-t border-b border-white/[0.06] bg-[#050814]/60">
        <div className="space-y-4">
          <div className="flex gap-4 animate-marquee-left">
            {pillsRow1.map((pill, idx) => (
              <div
                key={`p1-${idx}`}
                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-wide border border-white/[0.06] bg-[#09161f] text-gray-200 hover:border-[#00E5BE]/40 transition-all select-none cursor-default"
              >
                {pill}
              </div>
            ))}
          </div>
          <div className="flex gap-4 animate-marquee-right">
            {pillsRow2.map((pill, idx) => (
              <div
                key={`p2-${idx}`}
                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-wide border border-white/[0.06] bg-[#09161f] text-gray-200 hover:border-[#00E5BE]/40 transition-all select-none cursor-default"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TAHSEEN EDUCATION (FLAGSHIP ECOSYSTEM SHOWCASE) */}
      <section id="education" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-gradient-to-b from-[#061219]/40 via-[#050814] to-[#061219]/40">
        
        {/* Section Tag */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,190,0.15)]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isAr ? "الذراع التعليمي • مجموعة تحسين للذكاء الاصطناعي" : "EDUCATIONAL DIVISION • TAHSEEN AI GROUP"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>
                تحسين التعليمية • <span className="text-[#00E5BE]">منظومة التفوق والتوجيه الجامعي</span>
              </>
            ) : (
              <>
                Tahseen Education • <span className="text-[#00E5BE]">AI-Powered High School Excellence</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {isAr
              ? "المنظومة التعليمية الذكية الشاملة لطلاب المرحلة الثانوية في المملكة العربية السعودية — ثلاث محطات متتالية، حساب واحد، ومسار واضح حتى باب الجامعة."
              : "The unified AI learning ecosystem for Saudi high school students — three sequential stations, one account, and a clear pathway to top university admission."}
          </p>
        </div>

        {/* MAIN HIGHLIGHT CARD: Tahseen Education Platform */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 vertex-card border-2 border-[#00E5BE] shadow-[0_20px_60px_rgba(0,229,190,0.22)] mb-8 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Main Column */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#00E5BE] text-[#060913] text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_12px_rgba(0,229,190,0.5)]">
                  {isAr ? "المنصة الرئيسية • edutahseen.com" : "MAIN PLATFORM • EDUTAHSEEN.COM"}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "٤,٣٠٠+ طالب وطالبة" : "4,300+ Active Students"}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "معايير قياس وهيئة تقويم التعليم (ETEC)" : "Saudi ETEC & Qiyas Standards"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {isAr
                    ? "منظومة واحدة متكاملة تغنيك عن الدروس الخصوصية"
                    : "One Unified Platform Replacing Private Tutoring"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {isAr
                    ? "صُممت تحسين لتكون بيئة تدريب منضبطة تضمن استثمار وقت الطالب وتركيزه على ما يحتاجه فعلياً. يعتمد نظامنا على المعلم الذكي التفاعلي الذي يشرح طريقة التفكير خطوة بخطوة، مع تقارير مستوى دورية لأولياء الأمور وتوجيه دراسي متكامل."
                    : "Tahseen Education is built to provide high school students with disciplined, adaptive practice powered by our interactive AI Smart Tutor. Includes instant step-by-step reasoning breakdown, comprehensive parent diagnostics, and integrated academic roadmaps."}
                </p>
              </div>

              {/* Core Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00E5BE] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "المعلم الذكي التفاعلي" : "AI Smart Tutor"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "يشرح طريقة التفكير وحل المسائل خطوة بخطوة" : "Breaks down problem-solving logic step by step"}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00E5BE] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "تقارير مستوى دورية" : "Parent Diagnostics"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "متابعة دقيقة لنقاط القوة والضعف في كل مادة" : "Detailed tracking of strengths & skill gaps per subject"}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00E5BE] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "محتوى معتمد وموثوق" : "ETEC & Qiyas Aligned"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "بنوك أسئلة متوافقة مع أحدث معايير قياس" : "Up-to-date question banks matching actual exams"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: AI Smart Tutor Interactive Sandbox */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-black/60 border border-white/10 space-y-4 text-start">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                  <span className="text-xs font-bold text-white font-mono">
                    {isAr ? "المعلم الذكي • تجربة سؤال حي" : "AI Smart Tutor • Live Sandbox"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#00E5BE] font-bold">Qiyas Simulated</span>
              </div>

              <div className="space-y-2.5 text-xs font-sans">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-200">
                  <span className="text-[10px] text-gray-400 block font-mono mb-1">
                    {isAr ? "سؤال قسم الحساب والهندسة (قدرات كمي):" : "Quantitative Problem Sample:"}
                  </span>
                  &ldquo;إذا كان ثمن ٣ أقلام ودفترين يساوي ٢٩ ريالاً، وثمن قلمين و٣ دفاتر يساوي ٢٦ ريالاً، فما ثمن القلم الواحد؟&rdquo;
                </div>

                <div className="p-3 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-[#00E5BE] font-mono font-bold">
                    <span>شرح المعلم الذكي خطوة بخطوة:</span>
                    <span>الحل: ٧ ريالات</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-normal">
                    ١. نجمع المعادلتين: ٥ أقلام + ٥ دفاتر = ٥٥ ريالاً ← قلم + دفتر = ١١ ريالاً. <br />
                    ٢. بالتعويض نجد ثمن القلم الواحد = <strong>٧ ريالات</strong> مباشرة.
                  </p>
                </div>
              </div>

              <a
                href="https://edutahseen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl text-xs font-extrabold tracking-widest uppercase bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_20px_rgba(0,229,190,0.5)] transition-all cursor-pointer"
              >
                <span>{isAr ? "زيارة منصة تحسين التعليمية" : "VISIT EDUTAHSEEN.COM"}</span>
                <ExternalLink className="w-4 h-4 mx-1.5" />
              </a>
            </div>

          </div>
        </div>

        {/* 3 SUB-MENTIONS / JOURNEY STATIONS */}
        <div className="space-y-4">
          <div className="text-start">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {isAr ? "محطات الرحلة التعليمية الثلاث المشمولة في المنصة:" : "The Three Educational Stations Included in the Platform:"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Mention 1: Qudurat */}
            <a
              href="https://edutahseen.com/qudurat"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl vertex-card flex items-center justify-between gap-3 text-start group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5BE] font-semibold uppercase">
                    {isAr ? "المحطة الأولى" : "Station 01"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00E5BE] transition-colors">
                    {isAr ? "قدرات AI (Qudurat)" : "Qudurat AI"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "تدريب تكيفي للكمي واللفظي" : "Adaptive Quantitative & Verbal Prep"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00E5BE] flex-shrink-0 transition-colors" />
            </a>

            {/* Mention 2: Tahsili */}
            <a
              href="https://edutahseen.com/tahsili"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl vertex-card flex items-center justify-between gap-3 text-start group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#38BDF8] font-semibold uppercase">
                    {isAr ? "المحطة الثانية" : "Station 02"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {isAr ? "تحصيلي AI (Tahsili)" : "Tahsili AI"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "إتقان المواد العلمية الأربع" : "4-Subject Science Mastery"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#38BDF8] flex-shrink-0 transition-colors" />
            </a>

            {/* Mention 3: Bausalty */}
            <a
              href="https://edutahseen.com/busalati"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl vertex-card flex items-center justify-between gap-3 text-start group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#A855F7] font-semibold uppercase">
                    {isAr ? "المحطة الثالثة" : "Station 03"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#A855F7] transition-colors">
                    {isAr ? "بوصلتي (Bausalty)" : "Bausalty AI"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "مقياس الميول والتوجيه الجامعي" : "RIASEC Major Matching Engine"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#A855F7] flex-shrink-0 transition-colors" />
            </a>

          </div>
        </div>

      </section>

      {/* 9. VERTEX-STYLE TESTIMONIALS ("Hear from teams automating smarter") */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-white/[0.01]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? "مُجرب وموثوق على مستوى المملكة" : "HEAR FROM TEAMS AUTOMATING SMARTER"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center">
            {isAr ? (
              <>
                ماذا يقول <span className="text-[#00E5BE]">عملاؤنا</span>
              </>
            ) : (
              <>
                What Our <span className="text-[#00E5BE]">Clients</span> Say
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal text-center">
            {isAr
              ? "آراء وتجارب مباشرة من قادة ومؤسسي الأعمال في السعودية الذين سرّعوا أعمالهم مع تحسين للذكاء الاصطناعي."
              : "Hear directly from founders and enterprise leaders across Saudi Arabia accelerating workflows with Tahseen AI."}
          </p>
        </div>

        {/* 3-Column Vertex Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={t.author}
              className="p-6 sm:p-8 rounded-3xl vertex-card flex flex-col justify-between space-y-6 text-start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#00E5BE]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#00E5BE]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00E5BE]/10 text-[#00E5BE] text-[10px] font-mono font-bold">
                    {t.metrics}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00E5BE] to-[#38BDF8] text-[#060913] font-bold font-mono text-xs flex items-center justify-center flex-shrink-0">
                  {t.avatar}
                </div>
                <div className="truncate">
                  <div className="font-bold text-white text-sm truncate">{t.author}</div>
                  <div className="text-[11px] text-gray-400 truncate">{t.role} • {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. SAUDI EHSAN PLATFORM 1% SOCIAL PLEDGE BANNER */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1200px] mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl vertex-card bg-gradient-to-r from-[#061e1b]/80 via-[#060913] to-[#061e1b]/80 border border-[#00E5BE]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] flex-shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#00E5BE] font-bold uppercase tracking-wider">
                {isAr ? "الأثر المجتمعي المستدام" : "SOCIAL IMPACT PLEDGE"}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isAr ? "نتبرع بنسبة ١٪ من أرباح أعمالنا لمنصة إحسان" : "We Donate 1% of Proceeds to the Ehsan Platform"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-normal">
                {isAr ? "التزاماً منا بالمسؤولية الاجتماعية ودعماً للقطاع الخيري وغير الربحي في المملكة العربية السعودية." : "Committed to sustainable social responsibility and empowering non-profit growth across Saudi Arabia."}
              </p>
            </div>
          </div>

          <Link
            href={contactHref}
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-xl btn-teal-outline flex-shrink-0 cursor-pointer"
          >
            <span>{isAr ? "تواصل معنا" : "GET IN TOUCH"}</span>
          </Link>
        </div>
      </section>

      {/* 11. VERTEX-STYLE FREQUENTLY ASKED QUESTIONS */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1100px] mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            {isAr ? "استفساراتك بإجابات واضحة" : "FREQUENTLY ASKED QUESTIONS"}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>
                الأسئلة <span className="text-[#00E5BE]">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-[#00E5BE]">Questions</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal">
            {isAr
              ? "كل ما تود معرفته حول خدمات تحسين للذكاء الاصطناعي وكيف نساعد منشأتك على التوسع الذكي."
              : "Quick answers about intelligent agents, enterprise workflows, integrations, and deployment."}
          </p>

          {/* Vertex Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: isAr ? "الكل" : "General" },
              { id: "services", label: isAr ? "الخدمات والحلول" : "Services" },
              { id: "enterprise", label: isAr ? "المؤسسات والشركات" : "Enterprise" },
              { id: "customization", label: isAr ? "التخصيص والأمان" : "Customization" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFaqFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  faqFilter === cat.id
                    ? "bg-[#00E5BE] text-[#060913] font-bold shadow-xs"
                    : "bg-white/[0.04] text-gray-300 border border-white/10 hover:border-[#00E5BE]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-2xl vertex-card overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-start font-bold text-xs sm:text-base text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5BE] flex-shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#00E5BE] transition-transform duration-300 flex-shrink-0 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. VERTEX-STYLE FINAL CTA BANNER */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-[1300px] mx-auto w-full">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 text-center overflow-hidden bg-gradient-to-b from-[#081720]/90 to-[#060913] border-2 border-[#00E5BE]/40 shadow-[0_20px_80px_rgba(0,229,190,0.2)] text-white">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              {isAr ? "ابدأ رحلة التحول الذكي اليوم" : "CONNECT YOUR STACK & START AUTOMATING"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {isAr ? (
                <>
                  ابنِ حلول الذكاء الاصطناعي <br />
                  <span className="text-[#00E5BE]">لمنشأتك الآن!</span>
                </>
              ) : (
                <>
                  Build Your AI-Powered <br />
                  <span className="text-[#00E5BE]">Solution Now!</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal max-w-xl mx-auto">
              {isAr
                ? "تواصل مع فريقنا الهندسي اليوم لتقييم فرص الأتمتة ونشر أنظمة الذكاء الاصطناعي المخصصة لأعمالك."
                : "Connect directly with our engineering team to assess automation opportunities and deploy custom intelligent agents."}
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-xl bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_25px_rgba(0,229,190,0.6)] transition-all cursor-pointer"
              >
                <span>{isAr ? "احجز استشارتك المجانية" : "SCHEDULE FREE CONSULTATION"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Global Master Footer */}
      <Footer lang={lang} theme={theme} />

    </div>
  );
}
