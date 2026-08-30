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
  Check,
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  const showcaseSolutions = isAr
    ? [
        {
          step: "٠١",
          total: "٠٣",
          tag: "العمليات الذاتية",
          title: "وكلاء الذكاء الاصطناعي للمبيعات والتسويق",
          subtitle: "ذكاء اصطناعي تفاعلي متعدد القنوات لتأهيل العملاء وإغلاق الصفقات على مدار الساعة.",
          desc: "انشر وكلاء أذكياء عبر الواتساب والموقع الإلكتروني والبريد للإجابة على الاستفسارات المعقدة، وحجز الاجتماعات في تقويمك، وتحويل العملاء المؤهلين مباشرة.",
          metrics: [
            { label: "نمو أداء المبيعات", val: "٣ أضعاف" },
            { label: "سرعة الاستجابة", val: "< ١٠ ثوانٍ" },
            { label: "التوافر والجاهزية", val: "٢٤/٧ / ٣٦٥" },
          ],
          features: [
            "تكامل مباشر مع الواتساب وبوابات المحادثة الحية",
            "جدولة تلقائية للاجتماعات وتحديث التقويم",
            "تأهيل دقيق للعملاء المحتملين وتمرير البيانات للـ CRM",
          ],
          icon: <Bot className="w-5 h-5 text-[#00E5BE]" />,
        },
        {
          step: "٠٢",
          total: "٠٣",
          tag: "أتمتة العمليات",
          title: "أتمتة العمليات المؤسسية الشاملة",
          subtitle: "القضاء التام على الاختناقات اليدوية عبر مختلف الأقسام والفرق.",
          desc: "اربط أنظمة تخطيط الموارد (ERP)، وقواعد البيانات، والدعم الفني، وبوابات الدفع بقواعد ذكية ذاتية المعالجة تقلص المهام اليدوية بأكثر من ٤٠٪.",
          metrics: [
            { label: "تقليص العمل اليدوي", val: "-٤٢٪" },
            { label: "دقة معالجة البيانات", val: "٩٩.٩٪" },
            { label: "سرعة التدشين", val: "١٤ يوماً" },
          ],
          features: [
            "معالجة واستخراج بيانات المستندات والفواتير آلياً",
            "مزامنة مستمرة مع قواعد بيانات Oracle و SAP",
            "سلاسل موافقات ذكية مع توثيق تدقيق كامل",
          ],
          icon: <Workflow className="w-5 h-5 text-[#00E5BE]" />,
        },
        {
          step: "٠٣",
          total: "٠٣",
          tag: "متابعة فورية",
          title: "المتابعة اللحظية والبيانات الميدانية",
          subtitle: "رؤية كاملة لجميع التفاعلات المؤتمتة وأداء الحملات بدقة عالية.",
          desc: "لوحات تحليلات مباشرة ترصد كفاءة الحملات، ورضا العملاء، ودقة الوكلاء، ونسب التحويل في الوقت الفعلي دون أي تكهنات.",
          metrics: [
            { label: "سرعة الاستجابة", val: "~٠.٤ ثانية" },
            { label: "نسبة التوافر", val: "٩٩.٩٨٪" },
            { label: "الامتثال", val: "١٠٠٪" },
          ],
          features: [
            "لوحات تحكم تفاعلية لرصد كفاءة كل مسار عمل",
            "تنبيهات فورية عند رصد أي اختناق تشغيلي",
            "تحليلات تنبؤية لتحسين تجربة العملاء ونمو الإيرادات",
          ],
          icon: <LineChart className="w-5 h-5 text-[#00E5BE]" />,
        },
      ]
    : [
        {
          step: "01",
          total: "03",
          tag: "AUTONOMOUS OPERATIONS",
          title: "AI Agents for Sales & Marketing",
          subtitle: "Autonomous multi-channel intelligence that qualifies leads and converts 24/7.",
          desc: "Deploy intelligent agents across WhatsApp, website chat, and email that answer complex inquiries, schedule meetings directly into your calendar, and hand off qualified leads with full context.",
          metrics: [
            { label: "Sales Boost", val: "3X Growth" },
            { label: "Response Time", val: "< 10s" },
            { label: "Availability", val: "24/7 / 365" },
          ],
          features: [
            "Native WhatsApp and live-chat integrations",
            "Automated calendar booking and CRM synchronization",
            "Multi-channel contextual lead qualification",
          ],
          icon: <Bot className="w-5 h-5 text-[#00E5BE]" />,
        },
        {
          step: "02",
          total: "03",
          tag: "WORKFLOW AUTOMATION",
          title: "End-to-End Enterprise Automation",
          subtitle: "Eliminate repetitive manual bottlenecks across cross-functional operations.",
          desc: "Connect your ERP, databases, customer support, and payment gateways with intelligent rules and self-healing automated logic that reduces manual processing by over 40%.",
          metrics: [
            { label: "Manual Work Reduced", val: "-42%" },
            { label: "Data Accuracy", val: "99.9%" },
            { label: "Deployment Speed", val: "14 Days" },
          ],
          features: [
            "Automated document, RFP, and invoice ingestion",
            "Seamless two-way sync with ERP systems",
            "Smart approval chains with complete audit trails",
          ],
          icon: <Workflow className="w-5 h-5 text-[#00E5BE]" />,
        },
        {
          step: "03",
          total: "03",
          tag: "REAL-TIME TELEMETRY",
          title: "Live Oversight & Actionable Data",
          subtitle: "Complete visibility over every automated interaction and campaign performance.",
          desc: "Live analytics dashboards that track campaign throughput, customer sentiment, agent accuracy, and conversion metrics in real time with zero guesswork.",
          metrics: [
            { label: "Latency", val: "~0.4s" },
            { label: "Uptime", val: "99.98%" },
            { label: "Compliance", val: "100%" },
          ],
          features: [
            "Real-time operational visibility across all workflows",
            "Proactive bottleneck and anomaly alerts",
            "Continuous conversion rate optimization metrics",
          ],
          icon: <LineChart className="w-5 h-5 text-[#00E5BE]" />,
        },
      ];

  const testimonials = isAr
    ? [
        {
          quote: "ساهمت تحسين في تبسيط عملياتنا الداخلية — قلصنا أكثر من ٤٠٪ من المهام اليدوية خلال أسابيع قليلة.",
          author: "أحمد المطيري",
          role: "مدير العمليات",
          company: "FutureTech KSA",
          metrics: "تقليص ٤٠٪ من العمل اليدوي",
        },
        {
          quote: "أتمتة الذكاء الاصطناعي كانت سهلة التدشين وساعدتنا على خدمة عملائنا في المملكة بسرعة وثبات فائقين.",
          author: "سارة الحربي",
          role: "رئيسة النمو",
          company: "DataPlus",
          metrics: "٣ أضعاف سرعة الرد",
        },
        {
          quote: "الوكلاء الأذكياء وفروا تجربة تفاعلية مميزة لعملائنا ورفعوا معدلات التحويل المالي بأكثر من ٤٥٪.",
          author: "خالد الغامدي",
          role: "الرئيس التنفيذي",
          company: "CloudSphere",
          metrics: "+٤٥٪ زيادة المبيعات",
        },
      ]
    : [
        {
          quote: "Tahseen streamlined our operations end-to-end — we eliminated repetitive manual workflows in just weeks.",
          author: "Ahmed Al-Mutairi",
          role: "Head of Operations",
          company: "FutureTech KSA",
          metrics: "-42% Manual Workload",
        },
        {
          quote: "The autonomous agent deployment was seamless and allows us to serve enterprise clients across KSA with speed and precision.",
          author: "Sarah Al-Harbi",
          role: "Growth Director",
          company: "DataPlus",
          metrics: "3X Lead Response Time",
        },
        {
          quote: "Tahseen AI delivers incredible ROI and enterprise clarity. Their intelligent workflows increased our conversion rates significantly.",
          author: "Khaled Al-Ghamdi",
          role: "CEO",
          company: "CloudSphere",
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

  const faqs = isAr
    ? [
        {
          q: "ما هي مجموعة تحسين للذكاء الاصطناعي (Tahseen AI)؟",
          a: "تحسين هي شركة تقنية سعودية رائدة متخصصة في إعادة تعريف وتطوير العمليات المؤسسية عبر حلول الذكاء الاصطناعي المتقدمة، وأتمتة مسارات العمل، ونظم الوكلاء الأذكياء المستقلة.",
        },
        {
          q: "ما هي أبرز الخدمات التي تقدمها تحسين للذكاء الاصطناعي؟",
          a: "نقدم استشارات واستراتيجيات الذكاء الاصطناعي، وتطوير مواقع وتطبيقات الجوال الذكية، وبناء وكلاء ذكاء اصطناعي للمبيعات والتسويق، وحلول مراكز الاتصال الذكية، وأتمتة العمليات المتكاملة.",
        },
        {
          q: "لماذا تحتاج منشأتي إلى حلول تحسين للذكاء الاصطناعي؟",
          a: "توفر تحسين قيمة استثنائية عبر تقليص أكثر من ٤٠٪ من المهام اليدوية المتكررة، ومضاعفة سرعة الاستجابة للعملاء، ونشر أنظمة ذكية ذاتية التشغيل ومصممة خصيصاً لتحقيق أهدافك.",
        },
        {
          q: "هل يمكن تخصيص حلول تحسين لتتطابق مع هوية ونبرة علامتي التجارية؟",
          a: "بالتأكيد. كل وكيل ذكي ونظام أتمتة يتم تدريبه وتخصيصه بالكامل ليتوافق مع هوية منشأتك، ونبرة مخاطبة عملائك، وقواعد بياناتك الداخلية.",
        },
        {
          q: "هل توفر تحسين خدماتها للشركات الناشئة ورواد الأعمال؟",
          a: "نعم. بالإضافة إلى الحلول المؤسسية الكبرى (Enterprise)، نوفر حلولاً مخصصة وعالية الأثر للشركات الناشئة ورواد الأعمال لمساعدتهم على النمو المتسارع.",
        },
      ]
    : [
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
          a: "Yes. In addition to enterprise B2B solutions, Tahseen AI provides adaptable, high-impact AI solutions tailored for growing startups, entrepreneurs, and professional teams.",
        },
      ];

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
        isLight ? "bg-[#F8FAFC] text-slate-900" : "bg-[#060913] text-white"
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

        {/* 3. Core 4 Services Section (Sharp Bento Boxes) */}
        <div id="services" className="relative z-10 pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pointer-events-auto scroll-mt-24 sm:scroll-mt-28">
          
          {/* Card 1: AI Agents */}
          <div className="w-full p-5 sharp-bento space-y-3 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="w-10 h-10 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-105 mx-auto">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "وكلاء الذكاء الاصطناعي" : "AI Agents"}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[210px] text-center mx-auto">
              {isAr
                ? "وكلاء أذكياء يعملون بشكل مستقل لأتمتة وتوسيع نطاق عملياتك."
                : "Intelligent agents that automate and scale your operations."}
            </p>
          </div>

          {/* Card 2: Automation */}
          <div className="w-full p-5 sharp-bento space-y-3 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="w-10 h-10 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-105 mx-auto">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "أتمتة العمليات" : "Automation"}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[210px] text-center mx-auto">
              {isAr
                ? "تبسيط مسارات العمل والتخلص من المهام اليدوية المتكررة."
                : "Streamline workflows and eliminate repetitive tasks."}
            </p>
          </div>

          {/* Card 3: Consulting */}
          <div className="w-full p-5 sharp-bento space-y-3 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="w-10 h-10 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-105 mx-auto">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "استشارات الذكاء الاصطناعي" : "Consulting"}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[210px] text-center mx-auto">
              {isAr
                ? "استراتيجيات وخارطة طريق ذكية متوافقة مع أهدافك المؤسسية."
                : "AI strategy and roadmap aligned with your business goals."}
            </p>
          </div>

          {/* Card 4: Development */}
          <div className="w-full p-5 sharp-bento space-y-3 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="w-10 h-10 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-105 mx-auto">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "التطوير المخصص" : "Development"}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[210px] text-center mx-auto">
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
          <h4 className="text-xs sm:text-base md:text-lg font-bold text-gray-300 text-center tracking-tight leading-relaxed max-w-xl">
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

        {/* Sharp White/Teal Container Box */}
        <div className="rounded-md bg-white/[0.96] backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 shadow-lg flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 transition-all duration-300">
          
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

      {/* 5. Comprehensive Insights Section */}
      <section id="insights" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.07]">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>{isAr ? "رؤى تشغيلية ومؤشرات لحظية" : "REAL-TIME INSIGHTS & ACTIONABLE DATA"}</span>
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

        {/* 2-Column Sharp Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Lead Velocity & Autonomous Qualification */}
          <div className="p-6 sm:p-8 sharp-bento space-y-5 text-start">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#00E5BE] font-bold">
                {isAr ? "استجابة فورية" : "Instant Ingestion"}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold">
                {isAr ? "تأهيل العملاء وإغلاق الصفقات آلياً" : "Autonomous Lead Routing & Engagement"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed font-normal">
                {isAr
                  ? "يتولى الوكلاء الأذكياء الرد الفوري على الاستفسارات، وفحص المتطلبات وتأهيلها، وتحديد المواعيد مباشرة في تقويم فريقك."
                  : "Intelligent agents qualify inquiries across WhatsApp, chat, and email, mapping context directly into your CRM."}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00E5BE] flex-shrink-0" />
                <span>{isAr ? "رد فوري في أقل من ١٠ ثوانٍ على مدار الساعة" : "Sub-10s multi-channel customer response time"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00E5BE] flex-shrink-0" />
                <span>{isAr ? "مضاعفة معدلات تحويل العملاء المحتملين ٣ أضعاف" : "3X increase in qualified deal pipeline speed"}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Operations & Data Synchronization */}
          <div className="p-6 sm:p-8 sharp-bento space-y-5 text-start">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <Workflow className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#38BDF8] font-bold">
                99.9% Data Accuracy
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold">
                {isAr ? "مزامنة العمليات المؤسسية وسلاسل العمل" : "Zero-Friction Enterprise Integration"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed font-normal">
                {isAr
                  ? "ربط فوري بين أنظمة تخطيط الموارد (ERP)، واستخراج المستندات، والتوافق الضريبي دون أي حاجة لتدخل يدوي متكرر."
                  : "Connect databases, payment gateways, and ERP systems with self-healing automation logic."}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>{isAr ? "تقليص أكثر من ٤٠٪ من الأعباء اليدوية الروتينية" : "Over 40% reduction in manual processing tasks"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>{isAr ? "توافق تام مع التشريعات والمعايير المحلية في المملكة" : "Strict compliance with regional data regulations"}</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 6. Solutions Showcase */}
      <section id="solutions" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08] bg-[#050814]/80">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isAr ? "مُصمم للتوسع المؤسسي عالي الكفاءة" : "BUILT FOR HIGH-ASSURANCE SCALE"}</span>
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
        </div>

        {/* 3 Sharp Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {showcaseSolutions.map((sol) => (
            <div
              key={sol.step}
              className="p-6 sm:p-8 sharp-bento flex flex-col justify-between space-y-6 text-start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#00E5BE]">{sol.step}</span>
                    <span className="text-xs text-gray-500 font-mono">/ {sol.total}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00E5BE]/10 text-[#00E5BE] text-[10px] font-mono font-bold uppercase">
                    {sol.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{sol.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">{sol.desc}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  {sol.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 text-center font-mono">
                {sol.metrics.map((m) => (
                  <div key={m.label} className="p-2 rounded-md bg-white/[0.02] border border-white/5">
                    <div className="text-xs font-bold text-[#00E5BE]">{m.val}</div>
                    <div className="text-[8px] text-gray-500 truncate mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 7. Value Marquee */}
      <section className="relative z-10 py-12 sm:py-16 overflow-hidden border-t border-b border-white/[0.06] bg-[#050814]/60">
        <div className="space-y-4">
          <div className="flex gap-4 animate-marquee-left">
            {pillsRow1.map((pill, idx) => (
              <div
                key={`p1-${idx}`}
                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-xs sm:text-sm font-semibold tracking-wide border border-white/[0.06] bg-[#09161f] text-gray-200 hover:border-[#00E5BE]/40 transition-all select-none cursor-default"
              >
                {pill}
              </div>
            ))}
          </div>
          <div className="flex gap-4 animate-marquee-right">
            {pillsRow2.map((pill, idx) => (
              <div
                key={`p2-${idx}`}
                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-xs sm:text-sm font-semibold tracking-wide border border-white/[0.06] bg-[#09161f] text-gray-200 hover:border-[#00E5BE]/40 transition-all select-none cursor-default"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Tahseen Education (Flagship Ecosystem Highlight) */}
      <section id="education" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-gradient-to-b from-[#061219]/40 via-[#050814] to-[#061219]/40">
        
        {/* Section Tag */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,190,0.15)]">
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
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {isAr
              ? "المنظومة التعليمية الذكية الشاملة لطلاب المرحلة الثانوية في المملكة العربية السعودية — ثلاث محطات متتالية، حساب واحد، ومسار واضح حتى باب الجامعة."
              : "The unified AI learning ecosystem for Saudi high school students — three sequential stations, one account, and a clear pathway to top university admission."}
          </p>
        </div>

        {/* Sharp Highlight Card */}
        <div className="relative rounded-md p-6 sm:p-10 lg:p-12 sharp-bento border-2 border-[#00E5BE] shadow-[0_20px_60px_rgba(0,229,190,0.22)] mb-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-md bg-[#00E5BE] text-[#060913] text-[10px] sm:text-[11px] font-mono font-extrabold tracking-wider uppercase">
                  {isAr ? "المنصة الرئيسية • edutahseen.com" : "MAIN PLATFORM • EDUTAHSEEN.COM"}
                </span>
                <span className="px-3 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "٤,٣٠٠+ طالب وطالبة" : "4,300+ Active Students"}
                </span>
                <span className="px-3 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-md bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00E5BE] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "المعلم الذكي التفاعلي" : "AI Smart Tutor"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "يشرح طريقة التفكير وحل المسائل خطوة بخطوة" : "Breaks down problem-solving logic step by step"}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00E5BE] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "تقارير مستوى دورية" : "Parent Diagnostics"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "متابعة دقيقة لنقاط القوة والضعف في كل مادة" : "Detailed tracking of strengths & skill gaps per subject"}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-white/[0.03] border border-white/[0.08] space-y-1">
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

            <div className="lg:col-span-4 flex flex-col justify-center items-stretch gap-4 p-6 sm:p-8 rounded-md bg-[#060913]/90 border border-white/10 text-center">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#00E5BE] uppercase tracking-widest block font-bold">
                  {isAr ? "منظومة موحدة" : "UNIFIED PLATFORM"}
                </span>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {isAr ? "حساب واحد لجميع الاختبارات" : "One Account for All Exams"}
                </div>
                <p className="text-[11px] text-gray-400">
                  {isAr ? "وصول كامل للقدرات والتحصيلي وبوصلتي" : "Full access to Qudurat, Tahsili & Bausalty"}
                </p>
              </div>

              <a
                href="https://edutahseen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-md text-xs font-extrabold tracking-widest uppercase bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_20px_rgba(0,229,190,0.5)] transition-all cursor-pointer"
              >
                <span>{isAr ? "زيارة منصة تحسين التعليمية" : "VISIT EDUTAHSEEN.COM"}</span>
                <ExternalLink className="w-4 h-4 mx-1.5" />
              </a>
            </div>

          </div>
        </div>

        {/* 3 Sharp Sub-Mentions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <a
            href="https://edutahseen.com/qudurat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] flex-shrink-0 group-hover:scale-105 transition-transform">
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

          <a
            href="https://edutahseen.com/tahsili"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] flex-shrink-0 group-hover:scale-105 transition-transform">
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

          <a
            href="https://edutahseen.com/busalati"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] flex-shrink-0 group-hover:scale-105 transition-transform">
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

      </section>

      {/* 9. Testimonials */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-white/[0.01]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? "مُجرب وموثوق على مستوى المملكة" : "TESTED & TRUSTED NATIONWIDE"}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-6 sm:p-8 rounded-md sharp-bento flex flex-col justify-between space-y-6 text-start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#00E5BE]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#00E5BE]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00E5BE]/10 text-[#00E5BE] text-[10px] font-mono font-bold">
                    {t.metrics}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="font-bold text-white text-sm">{t.author}</div>
                <div className="text-[11px] text-gray-400">{t.role} • {t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Saudi Ehsan Platform 1% Social Pledge Banner */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1200px] mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-md sharp-bento bg-gradient-to-r from-[#061e1b]/80 via-[#060913] to-[#061e1b]/80 border border-[#00E5BE]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] flex-shrink-0">
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
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline flex-shrink-0 cursor-pointer"
          >
            <span>{isAr ? "تواصل معنا" : "GET IN TOUCH"}</span>
          </Link>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1000px] mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#00E5BE] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
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
              : "Everything you need to know about our AI systems, implementation speed, and enterprise integration."}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-md sharp-bento overflow-hidden"
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

      {/* 12. Final CTA Banner */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-[1300px] mx-auto w-full">
        <div className="relative rounded-md p-8 sm:p-14 lg:p-20 text-center overflow-hidden bg-gradient-to-b from-[#081720]/90 to-[#060913] border-2 border-[#00E5BE]/40 shadow-[0_20px_80px_rgba(0,229,190,0.2)] text-white">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[#00E5BE] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {isAr ? "ابدأ رحلة التحول الذكي اليوم" : "START YOUR INTELLIGENT TRANSFORMATION"}
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
                className="inline-flex items-center gap-2 px-8 py-4 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-lg bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_25px_rgba(0,229,190,0.6)] transition-all cursor-pointer"
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
