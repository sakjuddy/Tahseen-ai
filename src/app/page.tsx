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
  Lock,
  Users,
  HelpCircle,
  Globe,
  Menu,
  X,
} from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const isAr = lang === "ar";
  const contactHref = isAr ? "/contact" : "/contact?lang=en";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);

  // Sync Language from URL param or LocalStorage on mount
  useEffect(() => {
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
    }
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
      if (nextLang === "ar") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", "en");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const navLinks = isAr
    ? [
        { name: "الرئيسية", href: "#home" },
        { name: "خدماتنا", href: "#services" },
        { name: "التحليلات", href: "#insights" },
        { name: "الحلول", href: "#solutions" },
        { name: "من نحن", href: "#about" },
        { name: "اتصل بنا", href: contactHref },
      ]
    : [
        { name: "HOME", href: "#home" },
        { name: "SERVICES", href: "#services" },
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
          total: "٠٤",
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
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-2 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-pulse" />
                  <span className="text-white font-bold text-[10px]">وكيل تحسين • محادثة حية</span>
                </div>
                <span className="text-[#00E5BE] text-[9px]">نشط الآن</span>
              </div>
              <div className="space-y-1.5 text-right font-sans">
                <div className="p-2 rounded-lg bg-white/[0.03] text-gray-300 leading-snug">
                  <span className="text-gray-500 font-mono text-[9px] block">العميل (واتساب):</span>
                  &ldquo;نحتاج أتمتة نظام إدارة علاقات العملاء (CRM) لفروعنا في الرياض.&rdquo;
                </div>
                <div className="p-2 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white leading-snug">
                  <span className="text-[#00E5BE] font-mono text-[9px] block">وكيل تحسين الذكي:</span>
                  &ldquo;أهلاً بك! نطلق أنظمة الأتمتة المخصصة خلال أسبوعين فقط. حجزت لك موعد تدشين غداً الساعة ٢:٠٠ ظهراً. هل تود التأكيد؟&rdquo;
                </div>
              </div>
            </div>
          ),
        },
        {
          step: "٠٢",
          total: "٠٤",
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
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-1.5 font-mono text-[10px] sm:text-[11px] text-right">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <span className="text-white font-bold text-[10px]">مسار تدفق البيانات المؤتمت</span>
                <span className="text-[#00E5BE] text-[9px]">مزامنة مستمرة</span>
              </div>
              <div className="space-y-1 font-sans">
                <div className="flex items-center gap-2 p-1.5 rounded bg-white/[0.03]">
                  <span className="w-4 h-4 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center text-[9px] font-bold flex-shrink-0">١</span>
                  <span className="truncate">استقبال الطلب واستخراج البيانات بالـ AI</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-white/[0.03]">
                  <span className="w-4 h-4 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center text-[9px] font-bold flex-shrink-0">٢</span>
                  <span className="truncate">التحقق الذكي وتقييم المخاطر اللحظي</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white">
                  <span className="w-4 h-4 rounded-full bg-[#00E5BE] text-[#060913] flex items-center justify-center text-[9px] font-bold flex-shrink-0">✓</span>
                  <span className="truncate">مزامنة فورية مع قاعدة البيانات</span>
                </div>
              </div>
            </div>
          ),
        },
        {
          step: "٠٣",
          total: "٠٤",
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
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-2 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <span className="text-white font-bold text-[10px]">تحليلات العمليات الحية</span>
                <span className="text-[#00E5BE] text-[9px]">بث مباشر</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-center">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-sm font-bold text-white font-sans">١٢,٤٨٠</div>
                  <div className="text-[8px] text-gray-400 uppercase">طلب / يومياً</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-sm font-bold text-[#00E5BE] font-sans">+٤٥٪</div>
                  <div className="text-[8px] text-gray-400 uppercase">زيادة التحويل</div>
                </div>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[94%]" />
              </div>
            </div>
          ),
        },
        {
          step: "٠٤",
          total: "٠٤",
          tag: "هندسة سيادية",
          title: "الذكاء الاصطناعي السيادي والأمن المؤسسي",
          subtitle: "حماية تامة وسرية مطلقة لبيانات ومعلومات مؤسستك الخاصة.",
          desc: "نماذج ذكاء اصطناعي مخصصة وأنظمة استرجاع خاصة مستضافة بالكامل داخل سحابة سعودية سيادية متوافقة مع المتطلبات والتشريعات المحلية.",
          metrics: [
            { label: "تشفير البيانات", val: "AES-256" },
            { label: "الاستضافة", val: "سحابة سيادية" },
            { label: "الضمان", val: "SLA صارم" },
          ],
          badge: "ذكاء اصطناعي سيادي",
          icon: <Lock className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-1.5 font-mono text-[10px] sm:text-[11px] text-right">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <span className="text-white font-bold text-[10px]">درع السيادة والأمان</span>
                <span className="text-[#00E5BE] text-[9px]">محمي ومشفر</span>
              </div>
              <div className="space-y-1 text-xs font-sans">
                <div className="p-1.5 rounded bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                  <span className="text-[10px]">بيئة سحابية خاصة معزولة ومنع تسريب البيانات</span>
                </div>
                <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] text-gray-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                  <span className="text-[10px]">توافق كامل مع التشريعات والمعايير في المملكة</span>
                </div>
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          step: "01",
          total: "04",
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
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-2 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00E5BE] animate-pulse" />
                  <span className="text-white font-bold text-[10px]">Tahseen Agent • Live</span>
                </div>
                <span className="text-[#00E5BE] text-[9px]">Active</span>
              </div>
              <div className="space-y-1.5 text-left font-sans">
                <div className="p-2 rounded-lg bg-white/[0.03] text-gray-300 leading-snug">
                  <span className="text-gray-500 font-mono text-[9px] block">Customer (WhatsApp):</span>
                  &ldquo;We need an automated CRM pipeline for our Riyadh branches.&rdquo;
                </div>
                <div className="p-2 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white leading-snug">
                  <span className="text-[#00E5BE] font-mono text-[9px] block">Tahseen AI:</span>
                  &ldquo;Certainly! Reserved an onboarding slot for tomorrow at 2:00 PM (AST). Confirm?&rdquo;
                </div>
              </div>
            </div>
          ),
        },
        {
          step: "02",
          total: "04",
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
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-1.5 font-mono text-[10px] sm:text-[11px] text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <span className="text-white font-bold text-[10px]">Automated Pipeline</span>
                <span className="text-[#00E5BE] text-[9px]">Continuous Sync</span>
              </div>
              <div className="space-y-1 font-sans">
                <div className="flex items-center gap-2 p-1.5 rounded bg-white/[0.03]">
                  <span className="w-4 h-4 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center text-[9px] font-bold flex-shrink-0">1</span>
                  <span className="truncate">RFP Ingestion & OCR Entity Parsing</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-white/[0.03]">
                  <span className="w-4 h-4 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center text-[9px] font-bold flex-shrink-0">2</span>
                  <span className="truncate">Intelligent Risk & Validation Scoring</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white">
                  <span className="w-4 h-4 rounded-full bg-[#00E5BE] text-[#060913] flex items-center justify-center text-[9px] font-bold flex-shrink-0">✓</span>
                  <span className="truncate">Auto-Sync to Database & Executive Alert</span>
                </div>
              </div>
            </div>
          ),
        },
        {
          step: "03",
          total: "04",
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
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-2 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <span className="text-white font-bold text-[10px]">Live Throughput</span>
                <span className="text-[#00E5BE] text-[9px]">Stream</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-center">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-sm font-bold text-white font-sans">12,480</div>
                  <div className="text-[8px] text-gray-400 uppercase">Requests / Day</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-sm font-bold text-[#00E5BE] font-sans">+45%</div>
                  <div className="text-[8px] text-gray-400 uppercase">Conversion Lift</div>
                </div>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[94%]" />
              </div>
            </div>
          ),
        },
        {
          step: "04",
          total: "04",
          tag: "SOVEREIGN ARCHITECTURE",
          title: "Sovereign AI & Enterprise Security",
          subtitle: "Keep your proprietary organizational knowledge private, compliant, and protected.",
          desc: "Tailored AI models and private retrieval pipelines hosted inside secure Saudi cloud environments, adhering strictly to regional regulatory and data sovereignty standards.",
          metrics: [
            { label: "Encryption", val: "AES-256" },
            { label: "Hosting", val: "KSA Cloud" },
            { label: "SLA", val: "Strict" },
          ],
          badge: "Sovereign AI",
          icon: <Lock className="w-5 h-5 text-[#00E5BE]" />,
          mockup: (
            <div className="p-3 rounded-xl bg-[#060913]/90 border border-white/10 space-y-1.5 font-mono text-[10px] sm:text-[11px] text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-400">
                <span className="text-white font-bold text-[10px]">Sovereignty Shield</span>
                <span className="text-[#00E5BE] text-[9px]">Protected</span>
              </div>
              <div className="space-y-1 text-xs font-sans">
                <div className="p-1.5 rounded bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                  <span className="text-[10px]">Isolated Local VPC & Zero Data Leaks</span>
                </div>
                <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] text-gray-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                  <span className="text-[10px]">Full Regulatory Alignment in Saudi Arabia</span>
                </div>
              </div>
            </div>
          ),
        },
      ];

  const plans = isAr
    ? [
        {
          tag: "الاستراتيجية والتبني",
          title: "استشارات الذكاء الاصطناعي",
          subtitle: "حسب المشروع",
          desc: "استراتيجيات وخارطة طريق تنفيذية ذكية لتحقيق الكفاءة التشغيلية والتحول الرقمي.",
          features: [
            "استراتيجية AI لرفع الكفاءة والتدشين",
            "تدريب الموظفين على أحدث أدوات الذكاء الاصطناعي",
            "زيادة مؤكدة في إنتاجية الفريق والعمليات",
            "مستشار تنفيذي مخصص لمتابعة التقدم",
            "متابعة دورية وتقييم نتائج الأداء",
          ],
          popular: false,
        },
        {
          tag: "الأكثر طلباً",
          title: "وكلاء الذكاء الاصطناعي والأتمتة",
          subtitle: "حسب المشروع",
          desc: "وكلاء أذكياء مستقلون لأتمتة المبيعات، والتسويق، والعمليات على مدار الساعة.",
          features: [
            "أداء يفوق موظفي المبيعات اليدويين بثلاثة أضعاف",
            "لوحات تحكم وتقارير حية ومخصصة",
            "أمان وتشفير بيانات بمستوى مؤسسي متقدم",
            "تكامل سلس مع كافة أنظمتك وقواعد بياناتك",
            "مدير حساب مخصص واتفاقية مستوى خدمة SLA",
          ],
          popular: true,
        },
        {
          tag: "الهندسة البرمجية",
          title: "تطوير الويب والتطبيقات",
          subtitle: "حسب المشروع",
          desc: "تطوير منصات ويب متكاملة وتطبيقات جوال ذكية مدعومة بنماذج الذكاء الاصطناعي.",
          features: [
            "تطوير شامل لمواقع وتطبيقات الجوال المتقدمة",
            "دمج مخصص لنماذج اللغة والذكاء الاصطناعي",
            "محرك تحليلات فورية ومباشرة للأداء",
            "بنية تحتية سحابية متقدمة وأعلى معايير الأمان",
            "دعم فني وصيانة مستمرة على مدار الساعة",
          ],
          popular: false,
        },
      ]
    : [
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
          quote: "فريقنا الآن يركز على الاستراتيجية بدلاً من المهام المتكررة — تولت تحسين الباقي بكل احترافية.",
          author: "إسماعيل محمد",
          role: "مالك، ديكونيك (Deconec)",
          metrics: "+١٠٠ ساعة موفرة شهرياً",
        },
        {
          quote: "شهدنا مكاسب ملموسة في الكفاءة التشغيلية ورضا العملاء. نوصي بحلول تحسين بشدة لأي منشأة.",
          author: "صالح العمري",
          role: "الرئيس التنفيذي، كاناسيو (Canacio)",
          metrics: "+٣٥٪ كفاءة تشغيلية",
        },
        {
          quote: "قمنا بربط تحسين دون الحاجة لبرمجة معقدة. النتائج كانت فورية — سرعة في العمليات ودقة في تحليلات العملاء.",
          author: "طارق عامر",
          role: "المدير العام، جيتو (Gito)",
          metrics: "عائد استثمار فوري في ٣ أسابيع",
        },
        {
          quote: "مسارات الأتمتة سلسة ومبتكرة ووفرت علينا ساعات طويلة. الدعم الفني كان متميزاً ومتواجداً دائماً.",
          author: "أسامة مازن",
          role: "مؤسس، آي أوبتب (Ioptp)",
          metrics: "٩٩.٩٪ موثوقية النظام",
        },
      ]
    : [
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

  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

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
          a: "نعم. بالإضافة إلى الحلول المؤسسية الكبرى (Enterprise)، نوفر باقات مرنة وعالية الأثر مخصصة للشركات الناشئة ورواد الأعمال لمساعدتهم على النمو المتسارع.",
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
          a: "Yes. In addition to enterprise B2B solutions, Tahseen AI provides adaptable, high-impact AI packages tailored for growing startups, entrepreneurs, and professional teams.",
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
        "سحابة سعودية سيادية",
        "تدفقات عمل مؤتمتة",
      ]
    : [
        "Increased Efficiency",
        "Cost-Effective",
        "Smart Spending",
        "Data-Driven Decisions",
        "Sovereign Saudi Cloud",
        "Automated Workflows",
      ];

  const pillsRow1 = [...basePillsRow1, ...basePillsRow1];
  const pillsRow2 = [...basePillsRow2, ...basePillsRow2];

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-x-clip font-sans"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-0 right-1/4 w-[350px] sm:w-[700px] h-[350px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-[140px] sm:blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-[45%] left-[-100px] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#00E5BE]/5 rounded-full blur-[160px] sm:blur-[200px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-80px] w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] bg-cyan-500/8 rounded-full blur-[160px] sm:blur-[200px] pointer-events-none -z-10" />

      {/* 1. Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#060913]/90 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="py-2.5 sm:py-3 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative h-8 w-36 sm:h-9 sm:w-44 lg:h-10 lg:w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/tahseen-logo.png"
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 144px, 192px"
                className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links & Controls */}
          <div className="hidden md:flex items-center gap-4 lg:gap-7">
            <nav className="flex items-center gap-4 lg:gap-7 text-xs font-semibold tracking-wider text-gray-300">
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

          {/* Mobile Right Controls: Language Switcher & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
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

      {/* 2. Hero Section */}
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
            <p className="text-xs sm:text-[13px] text-gray-300 max-w-sm sm:max-w-md font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {isAr
                ? "نبتكر وكلاء ذكاء اصطناعي وأنظمة أتمتة متقدمة تمكّن الشركات والمؤسسات من العمل بذكاء وسرعة وكفاءة أعلى."
                : "We build AI agents and automation systems that help businesses work smarter, faster, and more efficiently."}
            </p>

            {/* Primary CTA Button */}
            <div className="pt-1">
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, "#services")}
                className="inline-flex items-center justify-center px-5 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline group cursor-pointer hover:shadow-[0_0_18px_rgba(0,229,190,0.4)] w-full sm:w-auto text-center"
              >
                <span>{isAr ? "لنبدأ بالبناء معاً" : "LET'S BUILD TOGETHER"}</span>
                <ArrowRight className={`w-3.5 h-3.5 mx-2 text-[#00E5BE] group-hover:translate-x-1 transition-transform duration-200 ${isAr ? "rotate-180" : ""}`} />
              </a>
            </div>

          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

        </div>

        {/* 3. Bottom 4 Services Row */}
        <div id="services" className="mt-12 sm:mt-20 pt-8 sm:pt-10 scroll-mt-24 sm:scroll-mt-28 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-4 text-center justify-items-center relative z-10 max-w-[1360px] mx-auto w-full">
          
          {/* Card 1: AI Agents */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="26" height="26" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              {isAr ? "وكلاء الذكاء الاصطناعي" : "AI Agents"}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              {isAr
                ? "وكلاء أذكياء لأتمتة وتوسيع نطاق عملياتك على مدار الساعة."
                : "Intelligent agents that automate and scale your operations."}
            </p>
          </div>

          {/* Card 2: Automation */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="26" height="26" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4L22.2 7.8C23.5 9.3 25.5 10.1 27.5 9.9L32.2 9.5L33 14.2C33.3 16.2 34.6 17.9 36.5 18.7L37 19L36.5 19.3C34.6 20.1 33.3 21.8 33 23.8L32.2 28.5L27.5 28.1C25.5 27.9 23.5 28.7 22.2 30.2L19 34L15.8 30.2C14.5 28.7 12.5 27.9 10.5 28.1L5.8 28.5L5 23.8C4.7 21.8 3.4 20.1 1.5 19.3L1 19L1.5 18.7C3.4 17.9 4.7 16.2 5 14.2L5.8 9.5L10.5 9.9C12.5 10.1 14.5 9.3 15.8 7.8L19 4Z" stroke="#00E5BE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="19" r="4.5" stroke="#00E5BE" strokeWidth="2.2"/>
                <circle cx="19" cy="19" r="1.5" fill="#00E5BE"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-center group-hover:text-[#00E5BE] transition-colors duration-200">
              {isAr ? "أتمتة العمليات" : "Automation"}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal max-w-[210px] text-center mx-auto group-hover:text-gray-200 transition-colors">
              {isAr
                ? "تبسيط تدفقات العمل والقضاء التام على المهام اليدوية المتكررة."
                : "Streamline workflows and eliminate repetitive tasks."}
            </p>
          </div>

          {/* Card 3: Consulting */}
          <div className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#00E5BE]/40 space-y-2.5 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,229,190,0.1)] cursor-default">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5BE]/20 group-hover:border-[#00E5BE]/50 mx-auto">
              <svg width="26" height="26" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          
          {/* Logo 1: Zana Cultural Entity */}
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-1.png"
              alt="Saudi Cultural Entity"
              fill
              sizes="(max-width: 640px) 48px, 64px"
              className="object-contain"
            />
          </div>

          {/* Logo 2: Imam Abdulrahman Bin Faisal University */}
          <div className="relative h-10 w-44 sm:h-14 sm:w-64 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-2.svg"
              alt="Imam Abdulrahman Bin Faisal University"
              fill
              sizes="(max-width: 640px) 176px, 256px"
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
      <section id="insights" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.07] bg-gradient-to-b from-white/[0.015] via-transparent to-transparent">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          
          {/* Card 1: Real-Time Oversight */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 hover:border-[#00E5BE]/60 space-y-5 shadow-[0_12px_40px_rgba(0,229,190,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:scale-110 transition-all">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-[#00E5BE] tracking-widest uppercase">
                  {isAr ? "المتابعة اللحظية" : "LIVE OVERSIGHT"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00E5BE] transition-colors">
                  {isAr ? "رؤى لحظية مباشرة" : "Real-Time Insights"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {isAr
                    ? "راقب حملاتك ونقاط اتصال العملاء في الوقت الفعلي لضمان أعلى فاعلية تشغيلية واكتشاف فرص التحسين فوراً."
                    : "Monitor your campaigns and customer touchpoints in real time to ensure maximum operational effectiveness and identify optimization opportunities instantly."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {(isAr
                  ? ["الحفاظ على العملاء (+٤٠٪)", "تكامل سلس مع الأنظمة", "تقارير فورية مباشرة", "تفاعل مخصص وذكي"]
                  : ["Customer Retention (+40%)", "Seamless Integrations", "Real-Time Reports", "Personalized Engagement"]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/15 border border-white/[0.08] hover:border-[#00E5BE]/40 text-xs font-medium text-gray-200 hover:text-white transition-all cursor-default">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#060913]/90 border border-white/[0.08] space-y-2.5">
              <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E5BE] animate-pulse" />
                  <span className="font-bold text-white text-[11px] sm:text-xs">{isAr ? "بيانات تشغيل الوكلاء الحية" : "Live Agent Telemetry"}</span>
                </div>
                <span className="text-[#00E5BE] font-mono font-semibold text-[11px] sm:text-xs">{isAr ? "٩٩.٩٨٪ توافر" : "99.98% Uptime"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-sm sm:text-base font-bold text-white">{isAr ? "~٠.٤ ثانية" : "~0.4s"}</div>
                  <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase">{isAr ? "الاستجابة" : "Latency"}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-sm sm:text-base font-bold text-[#00E5BE]">{isAr ? "٣.٢X" : "3.2X"}</div>
                  <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase">{isAr ? "التحويل" : "Conversion"}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-sm sm:text-base font-bold text-white">{isAr ? "٢٤/٧" : "24/7"}</div>
                  <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase">{isAr ? "نشط" : "Active"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Actionable Data */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1e24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 hover:border-[#00E5BE]/60 space-y-5 shadow-[0_12px_40px_rgba(0,229,190,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:scale-110 transition-all">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-[#00E5BE] tracking-widest uppercase">
                  {isAr ? "الكفاءة الاستراتيجية" : "STRATEGIC EFFICIENCY"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00E5BE] transition-colors">
                  {isAr ? "بيانات قابلة للتنفيذ" : "Actionable Data"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {isAr
                    ? "استفد من التحليلات المتقدمة لتحسين تدفقات العمل، وزيادة التفاعل، واتخاذ قرارات مبنية على البيانات تقلل التكاليف وتعزز العائد."
                    : "Leverage analytics to enhance team workflows, boost engagement, and make data-driven decisions that reduce overhead and increase marketing ROI."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {(isAr
                  ? ["نشر فعال واقتصادي", "إنفاق مالي ذكي", "قرارات مبنية على البيانات", "زيادة الكفاءة التشغيلية"]
                  : ["Cost-Effective Deployment", "Smart Spending", "Data-Driven Decisions", "Increased Efficiency"]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/15 border border-white/[0.08] hover:border-[#00E5BE]/40 text-xs font-medium text-gray-200 hover:text-white transition-all cursor-default">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5BE] flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#060913]/90 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
                <span className="font-bold text-white text-[11px] sm:text-xs">{isAr ? "مكاسب كفاءة العمليات" : "Workflow Efficiency Gain"}</span>
                <span className="text-[#00E5BE] font-mono font-semibold text-[11px] sm:text-xs">{isAr ? "+٤٥٪ كفاءة" : "+45% Gain"}</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>{isAr ? "تقليص المهام اليدوية" : "Manual Task Reduction"}</span>
                    <span className="text-[#00E5BE] font-bold">{isAr ? "٤٢٪" : "42%"}</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[42%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>{isAr ? "سرعة الاستجابة للعملاء" : "Lead Response Speed"}</span>
                    <span className="text-[#00E5BE] font-bold">{isAr ? "٨٥٪" : "85%"}</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00B8A9] to-[#00E5BE] w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dual-Row Animated Streaming Value Pills */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/[0.06] space-y-3 sm:space-y-4 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#060913] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#060913] to-transparent z-10 pointer-events-none" />

          {/* Row 1 */}
          <div className="overflow-hidden flex">
            <div className="animate-marquee-left flex items-center gap-2.5 sm:gap-4 py-1">
              {pillsRow1.map((pill, idx) => (
                <div
                  key={idx}
                  className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.03] hover:bg-[#00E5BE]/15 border border-white/10 hover:border-[#00E5BE]/50 text-[11px] sm:text-xs font-semibold text-gray-200 hover:text-white transition-all duration-200 cursor-default shadow-sm hover:scale-105 whitespace-nowrap flex-shrink-0"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden flex">
            <div className="animate-marquee-right flex items-center gap-2.5 sm:gap-4 py-1">
              {pillsRow2.map((pill, idx) => (
                <div
                  key={idx}
                  className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.03] hover:bg-[#00E5BE]/15 border border-white/10 hover:border-[#00E5BE]/50 text-[11px] sm:text-xs font-semibold text-gray-200 hover:text-white transition-all duration-200 cursor-default shadow-sm hover:scale-105 whitespace-nowrap flex-shrink-0"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* 6. Sticky Interactive Solutions Showcase */}
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

            {/* Step Navigation Pill Selector (Mobile Horizontal Swipe) */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
              {showcaseSolutions.map((sol, idx) => (
                <button
                  key={sol.step}
                  onClick={() => {
                    setActiveSolution(idx);
                    const elem = document.getElementById(`solution-step-${idx}`);
                    if (elem) elem.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`flex-shrink-0 lg:w-full p-2.5 sm:p-3 rounded-xl border text-start transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    activeSolution === idx
                      ? "bg-white/[0.06] border-[#00E5BE] text-white shadow-[0_0_20px_rgba(0,229,190,0.15)]"
                      : "bg-transparent border-white/[0.06] text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`font-mono text-xs font-bold ${activeSolution === idx ? "text-[#00E5BE]" : "text-gray-500"}`}>
                      {sol.step}
                    </span>
                    <span className="text-xs font-bold whitespace-nowrap">{sol.title}</span>
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
                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">{sol.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">{sol.desc}</p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
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

      {/* 7. Flexible Service Packages */}
      <section id="pricing" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.06] bg-gradient-to-b from-[#08121a]/30 to-transparent">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#00E5BE] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            {isAr ? "تعاقد شفاف ونتائج ملموسة" : "TRANSPARENT ENGAGEMENT, MEASURABLE RESULTS"}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>
                باقات مرنة تناسب <span className="text-[#00E5BE]">الشركات والمؤسسات</span>
              </>
            ) : (
              <>
                Flexible Plans for <span className="text-[#00E5BE]">Companies & SMEs</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal">
            {isAr
              ? "اختر نموذج العمل الذي يحقق أهدافك التشغيلية وتوسع بسلاسة مع نمو أعمالك."
              : "Choose the engagement model that fits your operational goals and scale seamlessly as you grow."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group ${
                plan.popular
                  ? "bg-gradient-to-b from-[#0d1c24] to-[#060913] border-2 border-[#00E5BE] shadow-[0_0_35px_rgba(0,229,190,0.18)] lg:-translate-y-1.5"
                  : "bg-white/[0.02] hover:bg-gradient-to-b hover:from-[#0c262c] hover:via-[#081c22] hover:to-[#060913] border border-white/[0.08] hover:border-[#00E5BE] hover:shadow-[0_16px_50px_rgba(0,229,190,0.22)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#00E5BE] text-[#060913] text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase shadow-[0_0_12px_rgba(0,229,190,0.5)]">
                  {plan.tag}
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#00E5BE] tracking-wider uppercase">{plan.subtitle}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 transition-colors duration-200 group-hover:text-[#00E5BE]">{plan.title}</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="h-px bg-white/10" />

                <ul className="space-y-2.5 sm:space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5BE] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 sm:pt-6 mt-4 sm:mt-5 border-t border-white/5">
                <Link
                  href={contactHref}
                  className={`w-full inline-flex items-center justify-center py-3 text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? "bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] shadow-[0_4px_16px_rgba(0,229,190,0.4)]"
                      : "btn-teal-outline group-hover:bg-[#00E5BE] group-hover:text-[#060913] group-hover:shadow-[0_4px_20px_rgba(0,229,190,0.5)]"
                  }`}
                >
                  <span>{isAr ? "ابدأ الآن" : "GET STARTED"}</span>
                  <ArrowRight className={`w-3.5 h-3.5 mx-1.5 ${isAr ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Interactive Testimonial Carousel */}
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

        {/* Carousel Viewport */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
        >
          <div
            className="flex transition-transform duration-700 ease-out gap-4 sm:gap-6"
            style={{
              transform: `translateX(${isAr ? "" : "-"}${carouselIndex * (100 / (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : typeof window !== "undefined" && window.innerWidth < 1024 ? 2 : 3))}%)`,
            }}
          >
            {extendedTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent border border-white/[0.08] hover:border-[#00E5BE]/50 flex flex-col justify-between space-y-4 sm:space-y-5 transition-all duration-300 text-start"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE]">
                      <Quote className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-0.5 text-[#00E5BE]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#00E5BE]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-200 group-hover:text-white leading-relaxed font-normal italic transition-colors">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/[0.06] space-y-1">
                  <div className="font-bold text-white text-xs sm:text-sm group-hover:text-[#00E5BE] transition-colors">{t.author}</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400 font-medium">{t.role}</div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E5BE]/10 text-[#00E5BE] text-[9px] sm:text-[10px] font-semibold">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{t.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/20 border border-white/10 hover:border-[#00E5BE]/50 flex items-center justify-center text-white hover:text-[#00E5BE] transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCarouselIndex(dotIdx)}
                aria-label={`Jump to slide ${dotIdx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  carouselIndex === dotIdx
                    ? "w-5 sm:w-6 bg-[#00E5BE] shadow-[0_0_10px_rgba(0,229,190,0.8)]"
                    : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.03] hover:bg-[#00E5BE]/20 border border-white/10 hover:border-[#00E5BE]/50 flex items-center justify-center text-white hover:text-[#00E5BE] transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          </button>
        </div>
      </section>

      {/* 9. Interactive FAQ Section */}
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
              ? "إجابات شاملة ومباشرة عن إمكانيات تحسين للذكاء الاصطناعي وكيفية تكاملها مع منشأتك."
              : "Find clear answers to common questions about Tahseen AI's capabilities and integration process."}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl sm:rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#00E5BE]/40 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-3 font-bold text-xs sm:text-base text-white hover:text-[#00E5BE] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#00E5BE] flex-shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0.5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. High-Impact CTA & Telemetry Banner */}
      <section id="contact" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08]">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1f24] via-[#08131c] to-[#060913] border border-[#00E5BE]/30 p-6 sm:p-10 lg:p-14 shadow-[0_0_50px_rgba(0,229,190,0.15)] hover:border-[#00E5BE]/60 transition-all duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-semibold text-gray-300">
                <Users className="w-3.5 h-3.5 text-[#00E5BE]" />
                <span>{isAr ? "موثوق من أكثر من ١٠ آلاف جهة عمل" : "Trusted by 10k + businesses"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                {isAr ? (
                  <>
                    ابنِ حل الذكاء الاصطناعي <br />
                    الخاص بك الآن!
                  </>
                ) : (
                  <>
                    Build AI-Powered <br />
                    Solution Now!
                  </>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                {isAr
                  ? "أتمت توليد العملاء المحتملين والتفاعل الذكي في بيئات العمل الحقيقية والديناميكية."
                  : "Automate lead generation and customer engagement in diverse and dynamic real-world settings"}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider rounded-xl bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] transition-all shadow-[0_4px_25px_rgba(0,229,190,0.5)] cursor-pointer text-center"
                >
                  <span>{isAr ? "ابدأ الآن" : "Get Started"}</span>
                  <ArrowRight className={`w-4 h-4 mx-2 text-[#060913] ${isAr ? "rotate-180" : ""}`} />
                </Link>

                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider rounded-xl bg-[#1E293B] border border-white/10 text-white hover:bg-[#334155] transition-all shadow-lg cursor-pointer gap-2 text-center"
                >
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                  <span>{isAr ? "معرفة المزيد" : "Learn More"}</span>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 sm:p-6 shadow-2xl space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 text-start">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{isAr ? "الرصيد والقيمة" : "Balance"}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00E5BE]/15 border border-[#00E5BE]/30 text-[#00E5BE] text-[10px] sm:text-[11px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isAr ? "على المسار الصحيح" : "On track"}</span>
                  </span>
                </div>

                <div className="rounded-xl bg-[#060913]/95 border border-white/10 p-4 sm:p-5 shadow-2xl space-y-3 text-start sm:translate-x-3 sm:translate-y-1">
                  <div>
                    <div className="text-[10px] sm:text-[11px] text-gray-400 font-medium">{isAr ? "إجمالي العائد المحقق" : "Total Spent"}</div>
                    <div className="text-xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">$682.5K</div>
                  </div>

                  <div className="relative pt-1 sm:pt-2">
                    <div className="w-full border-b border-dashed border-[#00E5BE]/30 absolute top-3 left-0" />
                    
                    <div className="flex items-end justify-between gap-1 sm:gap-2 h-24 sm:h-28 pt-3 sm:pt-4">
                      {[
                        { m: isAr ? "يناير" : "Jan", h: "35%", active: false },
                        { m: isAr ? "فبراير" : "Feb", h: "75%", active: false },
                        { m: isAr ? "مارس" : "Mar", h: "55%", active: false },
                        { m: isAr ? "أبريل" : "Apr", h: "65%", active: false },
                        { m: isAr ? "مايو" : "May", h: "50%", active: false },
                        { m: isAr ? "يونيو" : "Jun", h: "95%", active: true },
                        { m: isAr ? "يوليو" : "Jul", h: "45%", active: false },
                        { m: isAr ? "أغسطس" : "Aug", h: "75%", active: false },
                        { m: isAr ? "سبتمبر" : "Sep", h: "30%", active: false },
                        { m: isAr ? "أكتوبر" : "Oct", h: "60%", active: false },
                      ].map((bar) => (
                        <div key={bar.m} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                          <div
                            style={{ height: bar.h }}
                            className={`w-full rounded-md transition-all duration-300 ${
                              bar.active
                                ? "bg-[#00E5BE] shadow-[0_0_15px_rgba(0,229,190,0.8)] scale-y-105"
                                : "bg-white/10 group-hover:bg-white/20"
                            }`}
                          />
                          <span className={`text-[7px] sm:text-[9px] font-mono ${bar.active ? "text-[#00E5BE] font-bold" : "text-gray-500"}`}>
                            {bar.m}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. Enterprise Footer */}
      <Footer lang={lang} />

    </div>
  );
}
