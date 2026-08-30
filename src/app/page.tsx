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
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [activeInsightTab, setActiveInsightTab] = useState<"sales" | "automation" | "telemetry">("sales");
  const [activeEduStation, setActiveEduStation] = useState<"qudurat" | "tahsili" | "bausalty">("qudurat");
  const [activeChartMonth, setActiveChartMonth] = useState<number>(5);

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
          badge: "نظام وكلاء ذكي",
          icon: <Bot className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className={`p-4 rounded-xl border space-y-3 font-mono text-[10px] sm:text-[11px] ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#060913]/90 border-white/10"}`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                  <span className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>وكيل تحسين • بث محادثة حية</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#00E5BE]/20 text-[#00E5BE] text-[9px] font-bold">نشط الآن</span>
              </div>
              <div className="space-y-2 text-right font-sans">
                <div className={`p-2.5 rounded-lg leading-snug border ${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.05] text-gray-300"}`}>
                  <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono mb-1">
                    <span>العميل (واتساب السعودية)</span>
                    <span>14:02:15</span>
                  </div>
                  &ldquo;نحتاج أتمتة نظام إدارة علاقات العملاء (CRM) لفروعنا في الرياض وربطه مع نقاط البيع.&rdquo;
                </div>
                <div className="p-2.5 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-emerald-950 dark:text-white leading-snug">
                  <div className="flex items-center justify-between text-[9px] text-[#00E5BE] font-mono mb-1 font-bold">
                    <span>وكيل تحسين الذكي (Agentic Flow)</span>
                    <span>14:02:16 • رد خلال ثانية</span>
                  </div>
                  &ldquo;أهلاً بك! تم تحليل البنية التقنية المطلوبة. نطلق الأتمتة المخصصة خلال أسبوعين. حجزت لك موعد تدشين غداً الساعة ٢:٠٠ ظهراً مع الفريق الهندسي. هل تود التأكيد؟&rdquo;
                </div>
              </div>
            </div>
          ),
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
          badge: "تدفقات فورية خالية من التأخير",
          icon: <Workflow className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className={`p-4 rounded-xl border space-y-2.5 font-mono text-[10px] sm:text-[11px] text-right ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#060913]/90 border-white/10"}`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
                <span className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>مسار تدفق البيانات المؤتمت (ERP Pipeline)</span>
                <span className="px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] text-[9px] font-bold">مزامنة مستمرة</span>
              </div>
              <div className="space-y-1.5 font-sans">
                <div className={`flex items-center justify-between p-2 rounded-lg border ${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.05]"}`}>
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center text-[10px] font-bold flex-shrink-0">١</span>
                    <span className="truncate">استقبال المعاملة واستخراج البيانات بالذكاء الاصطناعي</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#00E5BE] font-bold">مكتمل</span>
                </div>
                <div className={`flex items-center justify-between p-2 rounded-lg border ${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.05]"}`}>
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center text-[10px] font-bold flex-shrink-0">٢</span>
                    <span className="truncate">التحقق الذكي وتقييم المخاطر اللحظي للائتمان</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#38BDF8] font-bold">مكتمل</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-emerald-950 dark:text-white">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#00E5BE] text-[#060913] flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                    <span className="truncate">مزامنة فورية مع قاعدة البيانات المركزية وإشعار الإدارة</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#00E5BE] font-bold">لحظي</span>
                </div>
              </div>
            </div>
          ),
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
          badge: "بيانات بث مباشر",
          icon: <LineChart className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className={`p-4 rounded-xl border space-y-3 font-mono text-[10px] sm:text-[11px] ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#060913]/90 border-white/10"}`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
                <span className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>تحليلات العمليات الحية (Live Telemetry)</span>
                <span className="flex items-center gap-1 text-[#00E5BE] text-[9px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-ping" />
                  بث مباشر
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className={`p-2.5 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/[0.05]"}`}>
                  <div className={`text-base font-extrabold font-sans ${isLight ? "text-slate-900" : "text-white"}`}>١٢,٤٨٠</div>
                  <div className="text-[9px] text-gray-400 uppercase font-mono mt-0.5">طلب / يومياً</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/[0.05]"}`}>
                  <div className="text-base font-extrabold text-[#00E5BE] font-sans">+٤٥٪</div>
                  <div className="text-[9px] text-gray-400 uppercase font-mono mt-0.5">زيادة التحويل</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                  <span>سعة المعالجة اللحظية</span>
                  <span className="text-[#00E5BE]">٩٤٪ كفاءة</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[94%]" />
                </div>
              </div>
            </div>
          ),
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
          badge: "Agentic AI System",
          icon: <Bot className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className={`p-4 rounded-xl border space-y-3 font-mono text-[10px] sm:text-[11px] ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#060913]/90 border-white/10"}`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                  <span className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>Tahseen Agent • Live Stream</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#00E5BE]/20 text-[#00E5BE] text-[9px] font-bold">Active</span>
              </div>
              <div className="space-y-2 text-left font-sans">
                <div className={`p-2.5 rounded-lg leading-snug border ${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.05] text-gray-300"}`}>
                  <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono mb-1">
                    <span>Customer (WhatsApp KSA)</span>
                    <span>14:02:15</span>
                  </div>
                  &ldquo;We need an automated CRM pipeline for our Riyadh branches connected with POS databases.&rdquo;
                </div>
                <div className="p-2.5 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-emerald-950 dark:text-white leading-snug">
                  <div className="flex items-center justify-between text-[9px] text-[#00E5BE] font-mono mb-1 font-bold">
                    <span>Tahseen AI Agent (Agentic Flow)</span>
                    <span>14:02:16 • Latency 0.4s</span>
                  </div>
                  &ldquo;Certainly! We deploy custom automation pipelines within 14 days. I have reserved an onboarding slot for tomorrow at 2:00 PM AST. Confirm?&rdquo;
                </div>
              </div>
            </div>
          ),
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
          badge: "Zero-Latency Flows",
          icon: <Workflow className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className={`p-4 rounded-xl border space-y-2.5 font-mono text-[10px] sm:text-[11px] text-left ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#060913]/90 border-white/10"}`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
                <span className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>Automated ERP Pipeline</span>
                <span className="px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] text-[9px] font-bold">Continuous Sync</span>
              </div>
              <div className="space-y-1.5 font-sans">
                <div className={`flex items-center justify-between p-2 rounded-lg border ${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.05]"}`}>
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
                    <span className="truncate">RFP Ingestion & OCR Entity Parsing</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#00E5BE] font-bold">Processed</span>
                </div>
                <div className={`flex items-center justify-between p-2 rounded-lg border ${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.05]"}`}>
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
                    <span className="truncate">Intelligent Risk & Validation Scoring</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#38BDF8] font-bold">Verified</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-emerald-950 dark:text-white">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#00E5BE] text-[#060913] flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                    <span className="truncate">Auto-Sync to Database & Executive Alert</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#00E5BE] font-bold">Instant</span>
                </div>
              </div>
            </div>
          ),
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
          badge: "Real-Time Telemetry",
          icon: <LineChart className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className={`p-4 rounded-xl border space-y-3 font-mono text-[10px] sm:text-[11px] ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#060913]/90 border-white/10"}`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
                <span className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>Live Throughput Stream</span>
                <span className="flex items-center gap-1 text-[#00E5BE] text-[9px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-ping" />
                  Live Stream
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className={`p-2.5 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/[0.05]"}`}>
                  <div className={`text-base font-extrabold font-sans ${isLight ? "text-slate-900" : "text-white"}`}>12,480</div>
                  <div className="text-[9px] text-gray-400 uppercase font-mono mt-0.5">Requests / Day</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/[0.05]"}`}>
                  <div className="text-base font-extrabold text-[#00E5BE] font-sans">+45%</div>
                  <div className="text-[9px] text-gray-400 uppercase font-mono mt-0.5">Conversion Lift</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                  <span>Cluster Load</span>
                  <span className="text-[#00E5BE]">94% Optimal</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[94%]" />
                </div>
              </div>
            </div>
          ),
        },
      ];

  const testimonials = isAr
    ? [
        {
          quote: "ساهمت تحسين في تبسيط عملياتنا الداخلية — قلصنا أكثر من ٤٠٪ من المهام اليدوية خلال أسابيع قليلة.",
          author: "أحمد المطيري",
          role: "مدير العمليات، FutureTech",
          metrics: "تقليص ٤٠٪ من العمل اليدوي",
        },
        {
          quote: "أتمتة الذكاء الاصطناعي كانت سهلة التدشين وساعدتنا على خدمة عملائنا في المملكة بسرعة وثبات فائقين.",
          author: "سارة الحربي",
          role: "رئيسة النمو، DataPlus",
          metrics: "٣ أضعاف سرعة الرد",
        },
        {
          quote: "الوكلاء الأذكياء وفروا تجربة تفاعلية مميزة لعملائنا ورفعوا معدلات التحويل المالي بأكثر من ٤٥٪.",
          author: "خالد الغامدي",
          role: "الرئيس التنفيذي، CloudSphere",
          metrics: "+٤٥٪ زيادة المبيعات",
        },
      ]
    : [
        {
          quote: "Tahseen streamlined our operations end-to-end — we eliminated repetitive manual workflows in just weeks.",
          author: "Ahmed Al-Mutairi",
          role: "Head of Operations, FutureTech",
          metrics: "-42% Manual Workload",
        },
        {
          quote: "The autonomous agent deployment was seamless and allows us to serve enterprise clients across KSA with speed and precision.",
          author: "Sarah Al-Harbi",
          role: "Growth Director, DataPlus",
          metrics: "3X Lead Response Time",
        },
        {
          quote: "Tahseen AI delivers incredible ROI and enterprise clarity. Their intelligent workflows increased our conversion rates significantly.",
          author: "Khaled Al-Ghamdi",
          role: "CEO, CloudSphere",
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
    const matchesCat = faqFilter === "all" || faq.category === faqFilter;
    const matchesSearch =
      faqSearch.trim() === "" ||
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
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

      {/* 1. Sticky Header / Navbar (Kept Untouched) */}
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
              <div className="w-full flex justify-between items-center px-1 text-[10px] select-none pointer-events-none">
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

      {/* 5. DYNAMIC COMPREHENSIVE INSIGHTS & INTERACTIVE AI TESTBENCH */}
      <section id="insights" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.07] bg-gradient-to-b from-white/[0.015] via-transparent to-transparent">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>{isAr ? "متابعة حية وتحليلات فورية" : "LIVE OVERSIGHT & REAL-TIME ANALYTICS"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
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
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal">
            {isAr
              ? "تتبّع كل حملة، ووكيل ذكي، وتفاعل مع العملاء بشكل فوري لتطوير استراتيجياتك والتخلص من التخمين."
              : "Track every campaign, automated agent, and customer interaction in real time to refine engagement strategies and eliminate guesswork."}
          </p>
        </div>

        {/* Dynamic Bento Grid of Live Telemetry & Interactive Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-8">
          
          {/* Card 1: Interactive Agent Scenario Simulator (Left 7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 shadow-[0_12px_40px_rgba(0,229,190,0.08)] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {isAr ? "محاكي الوكلاء الأذكياء التفاعلي" : "Interactive Agent Testbench"}
                    </h3>
                    <span className="text-[10px] font-mono text-[#00E5BE]">
                      {isAr ? "اختر سيناريو تشغيلي لاختبار الاستجابة" : "Select an operational workflow to simulate live"}
                    </span>
                  </div>
                </div>

                {/* Scenario Selector Tabs */}
                <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setActiveInsightTab("sales")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeInsightTab === "sales" ? "bg-[#00E5BE] text-[#060913] font-bold shadow-xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isAr ? "المبيعات" : "Sales Agent"}
                  </button>
                  <button
                    onClick={() => setActiveInsightTab("automation")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeInsightTab === "automation" ? "bg-[#00E5BE] text-[#060913] font-bold shadow-xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isAr ? "الأتمتة" : "ERP Sync"}
                  </button>
                  <button
                    onClick={() => setActiveInsightTab("telemetry")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeInsightTab === "telemetry" ? "bg-[#00E5BE] text-[#060913] font-bold shadow-xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isAr ? "التحليلات" : "Telemetry"}
                  </button>
                </div>
              </div>

              {/* Dynamic Live Terminal Window */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-gray-400 ml-2">tahseen-agentic-runtime v2.4</span>
                  </div>
                  <span className="text-[#00E5BE] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-ping" />
                    STREAM READY
                  </span>
                </div>

                {/* Tab Content Display */}
                {activeInsightTab === "sales" && (
                  <div className="space-y-2 text-start font-sans">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-300">
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-1">
                        <span>INCOMING_LEAD (WhatsApp API)</span>
                        <span>0.12s latency</span>
                      </div>
                      <p className="text-xs">
                        &ldquo;مرحباً، نحتاج نظام أتمتة مبيعات متصل مع شات بوت ذكي لمتابعة العملاء المحتملين في الرياض.&rdquo;
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#00E5BE] mb-1 font-bold">
                        <span>TAHSEEN_AI_REASONING_CORE</span>
                        <span>Confidence: 99.4%</span>
                      </div>
                      <p className="text-xs">
                        &ldquo;أهلاً بك! تم تصنيف الطلب بنجاح كفرصة مؤسسية مؤهلة. قمنا بجدولة جلسة عمل هندسية غداً وحجز موعد في التقويم.&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {activeInsightTab === "automation" && (
                  <div className="space-y-2 text-start font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>[14:28:01]</span>
                      <span>INGEST: Enterprise Invoice #SA-9824 received</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-300">
                      <span>[14:28:02]</span>
                      <span>OCR_PARSE: Extracted 14 line items, Tax ID verified (ZATCA compliance 100%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#00E5BE]">
                      <span>[14:28:03]</span>
                      <span>ERP_SYNC: Updated Oracle / SAP database, zero human intervention needed.</span>
                    </div>
                  </div>
                )}

                {activeInsightTab === "telemetry" && (
                  <div className="grid grid-cols-3 gap-2 text-center font-mono py-1">
                    <div className="p-2 rounded bg-white/[0.04] border border-white/5">
                      <div className="text-[10px] text-gray-400">THROUGHPUT</div>
                      <div className="text-sm font-bold text-white mt-0.5">18,420 / min</div>
                    </div>
                    <div className="p-2 rounded bg-white/[0.04] border border-white/5">
                      <div className="text-[10px] text-gray-400">LATENCY</div>
                      <div className="text-sm font-bold text-[#00E5BE] mt-0.5">&lt; 0.38s</div>
                    </div>
                    <div className="p-2 rounded bg-white/[0.04] border border-white/5">
                      <div className="text-[10px] text-gray-400">AVAILABILITY</div>
                      <div className="text-sm font-bold text-cyan-300 mt-0.5">99.98%</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Value Proof Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/[0.08] text-center font-sans">
              <div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono">٤٠٪+</div>
                <div className="text-[10px] text-gray-400">{isAr ? "تقليص العمل اليدوي" : "Manual Workload Cut"}</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#00E5BE] font-mono">٣ أضعاف</div>
                <div className="text-[10px] text-gray-400">{isAr ? "سرعة تأهيل العملاء" : "Lead Conversion Speed"}</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-cyan-300 font-mono">٢٤/٧</div>
                <div className="text-[10px] text-gray-400">{isAr ? "جاهزية تشغيل مستمرة" : "Autonomous Uptime"}</div>
              </div>
            </div>

          </div>

          {/* Card 2: Interactive Monthly Performance Chart (Right 5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 shadow-[0_12px_40px_rgba(0,229,190,0.08)] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {isAr ? "نمو التحويل ومعدلات الكفاءة" : "Conversion & Velocity Growth"}
                    </h3>
                    <span className="text-[10px] font-mono text-[#00E5BE]">
                      {isAr ? "انقر على الأعمدة لمشاهدة البيانات" : "Interactive monthly trend analysis"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Bar Visualizer */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">{isAr ? "أداء الربع السنوي" : "Performance Index"}</span>
                  <span className="text-[#00E5BE] font-bold">
                    {isAr ? "+٤٥٪ نمو مستمر" : "+45% Consistent Lift"}
                  </span>
                </div>

                {/* Animated Interactive Bars */}
                <div className="flex items-end justify-between gap-1.5 h-32 pt-4">
                  {[
                    { month: isAr ? "يناير" : "Jan", height: "45%", val: "+22%" },
                    { month: isAr ? "فبراير" : "Feb", height: "60%", val: "+28%" },
                    { month: isAr ? "مارس" : "Mar", height: "55%", val: "+31%" },
                    { month: isAr ? "أبريل" : "Apr", height: "72%", val: "+38%" },
                    { month: isAr ? "مايو" : "May", height: "85%", val: "+42%" },
                    { month: isAr ? "يونيو" : "Jun", height: "98%", val: "+45%" },
                  ].map((bar, idx) => (
                    <button
                      key={bar.month}
                      onClick={() => setActiveChartMonth(idx)}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                    >
                      <div className={`text-[9px] font-mono transition-opacity ${activeChartMonth === idx ? "text-[#00E5BE] opacity-100 font-bold" : "text-gray-500 opacity-0 group-hover:opacity-100"}`}>
                        {bar.val}
                      </div>
                      <div
                        style={{ height: bar.height }}
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          activeChartMonth === idx
                            ? "bg-gradient-to-t from-[#00A389] to-[#00E5BE] shadow-[0_0_15px_rgba(0,229,190,0.6)] scale-x-105"
                            : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      />
                      <span className={`text-[9px] font-mono ${activeChartMonth === idx ? "text-[#00E5BE] font-bold" : "text-gray-400"}`}>
                        {bar.month}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-gray-300 font-medium">
                {isAr ? "متوسط سرعة الإنجاز بعد الأتمتة:" : "Average turnaround after deployment:"}
              </span>
              <span className="font-mono font-bold text-[#00E5BE]">
                {isAr ? "أقل من ١٠ ثوانٍ" : "&lt; 10 seconds"}
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* 6. Continuous Animated Value Pills Marquee */}
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

      {/* 7. Sticky Interactive Solutions Showcase */}
      <section id="solutions" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08] bg-[#050814]/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Sticky Title & Step Navigator */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-5 text-start">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{isAr ? "مُصمم للتوسع المؤسسي عالي الكفاءة" : "BUILT FOR HIGH-ASSURANCE SCALE"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
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
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {isAr
                  ? "تصفح حلولنا المتخصصة والمصممة للقضاء على القيود التشغيلية وتسريع نمو المؤسسات السعودية."
                  : "Scroll through our specialized intelligence offerings engineered to eliminate manual friction and scale Saudi enterprise operations."}
              </p>
            </div>

            {/* Step Navigation Pill Selector */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {showcaseSolutions.map((sol, idx) => (
                <button
                  key={sol.step}
                  onClick={() => {
                    setActiveSolution(idx);
                    const el = document.getElementById(`solution-step-${idx}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold transition-all text-start cursor-pointer flex-shrink-0 lg:flex-shrink ${
                    activeSolution === idx
                      ? "bg-[#00E5BE]/15 border-[#00E5BE] text-[#00E5BE] shadow-xs"
                      : "bg-white/[0.02] border-white/[0.06] text-gray-300 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs opacity-75">{sol.step}</span>
                    <span>{sol.title}</span>
                  </div>
                  {activeSolution === idx && (
                    <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00E5BE] hover:underline uppercase tracking-wider"
              >
                <span>{isAr ? "استشرنا حول تدفقات العمل المخصصة" : "CONSULT ON CUSTOM WORKFLOWS"}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>

          {/* Right Column: Scrollable Solution Showcase Cards */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {showcaseSolutions.map((sol, idx) => (
              <div
                key={sol.step}
                id={`solution-step-${idx}`}
                onMouseEnter={() => setActiveSolution(idx)}
                className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-500 space-y-4 text-start ${
                  activeSolution === idx
                    ? "bg-gradient-to-br from-[#0d1d24] via-[#07131a] to-[#060913] border-[#00E5BE]/60 shadow-[0_16px_50px_rgba(0,229,190,0.15)]"
                    : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base font-extrabold text-[#00E5BE]">{sol.step}</span>
                    <span className="font-mono text-xs text-gray-500">/ {sol.total}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mx-1.5">{sol.tag}</span>
                  </div>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[9px] sm:text-[10px] font-bold">
                    {sol.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                      {sol.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{sol.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">{sol.desc}</p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
                  {sol.metrics.map((m) => (
                    <div key={m.label} className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                      <div className="text-xs sm:text-sm font-extrabold text-[#00E5BE] font-sans">{m.val}</div>
                      <div className="text-[8px] sm:text-[9px] text-gray-400 font-medium tracking-tight mt-0.5 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Interactive Mockup */}
                <div className="pt-1">
                  {sol.mockup}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TAHSEEN EDUCATION (MAIN HIGHLIGHT WITH 3 SUB-MENTIONS & DYNAMIC SMART TUTOR PREVIEW) */}
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

        {/* MAIN HIGHLIGHT CARD: Tahseen Education Platform with Interactive Smart Tutor Preview */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0a1e28] via-[#07141b] to-[#050814] border-2 border-[#00E5BE] shadow-[0_20px_60px_rgba(0,229,190,0.22)] mb-8 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Main Column: Highlights & Key Strengths */}
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

              {/* Core Capabilities Row */}
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

            {/* Right Column: Interactive AI Smart Tutor Demo Sandbox */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-[#060913]/95 border border-white/10 space-y-4 text-start">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                  <span className="text-xs font-bold text-white font-mono">
                    {isAr ? "المعلم الذكي • تجربة سؤال حي" : "AI Smart Tutor • Live Sandbox"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#00E5BE] font-bold">Qiyas Simulated</span>
              </div>

              <div className="space-y-2.5 text-xs">
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
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#00E5BE]/50 transition-all duration-200 flex items-center justify-between gap-3 text-start group cursor-pointer"
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
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#38BDF8]/50 transition-all duration-200 flex items-center justify-between gap-3 text-start group cursor-pointer"
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
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#A855F7]/50 transition-all duration-200 flex items-center justify-between gap-3 text-start group cursor-pointer"
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

      {/* 9. Interactive Testimonial Carousel */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-white/[0.01]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
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
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal text-center">
            {isAr
              ? "آراء وتجارب مباشرة من قادة ومؤسسي الأعمال في السعودية الذين سرّعوا أعمالهم مع تحسين للذكاء الاصطناعي."
              : "Hear directly from founders and enterprise leaders across Saudi Arabia accelerating workflows with Tahseen AI."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-white/[0.08] transition-all text-start relative overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-1 text-[#00E5BE] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#00E5BE]" />
              ))}
            </div>
            <p className="text-sm sm:text-lg text-gray-200 leading-relaxed font-normal italic mb-6">
              &ldquo;{testimonials[carouselIndex].quote}&rdquo;
            </p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="font-bold text-white text-sm sm:text-base">
                  {testimonials[carouselIndex].author}
                </div>
                <div className="text-xs text-gray-400">
                  {testimonials[carouselIndex].role}
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-xs font-semibold">
                {testimonials[carouselIndex].metrics}
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#00E5BE]/50 flex items-center justify-center text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
            >
              <ChevronLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCarouselIndex(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    carouselIndex === dotIdx ? "w-6 bg-[#00E5BE]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#00E5BE]/50 flex items-center justify-center text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
            >
              <ChevronRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Saudi Ehsan Platform 1% Social Pledge Banner */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1200px] mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#061e1b]/80 via-[#060913] to-[#061e1b]/80 border border-[#00E5BE]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
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
              <p className="text-xs sm:text-sm text-gray-300 font-normal">
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

      {/* 11. DYNAMIC INTERACTIVE FAQ SECTION WITH QUICK FILTER */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1080px] mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            {isAr ? "استفساراتك بإجابات واضحة" : "YOUR QUERIES, SIMPLIFIED"}
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
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal">
            {isAr
              ? "كل ما تود معرفته حول خدمات تحسين للذكاء الاصطناعي وكيف نساعد منشأتك على التوسع الذكي."
              : "Everything you need to know about our AI systems, implementation speed, and enterprise integration."}
          </p>

          {/* Dynamic FAQ Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {[
              { id: "all", label: isAr ? "الكل" : "All" },
              { id: "services", label: isAr ? "الخدمات" : "Services" },
              { id: "enterprise", label: isAr ? "المؤسسات" : "Enterprise" },
              { id: "customization", label: isAr ? "التخصيص" : "Customization" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFaqFilter(cat.id)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start font-bold text-xs sm:text-base text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5BE] flex-shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#00E5BE] transition-transform duration-200 flex-shrink-0 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. Final High-Impact CTA Banner */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-[1300px] mx-auto w-full">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 text-center overflow-hidden bg-gradient-to-b from-[#081720]/90 to-[#060913] border-2 border-[#00E5BE]/40 shadow-[0_20px_80px_rgba(0,229,190,0.2)] text-white">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
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
