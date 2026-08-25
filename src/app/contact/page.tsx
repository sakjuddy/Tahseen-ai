"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2, MessageSquare, Sparkles, Send, Globe } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [lang, isAr]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: isAr ? "وكلاء الذكاء الاصطناعي والأتمتة" : "AI Agents & Automation",
    budget: "$5,000 - $15,000",
    message: "",
  });

  const navLinks = isAr
    ? [
        { name: "الرئيسية", href: "/#home" },
        { name: "خدماتنا", href: "/#services" },
        { name: "التحليلات", href: "/#insights" },
        { name: "الحلول", href: "/#solutions" },
        { name: "من نحن", href: "/#about" },
        { name: "اتصل بنا", href: "/contact" },
      ]
    : [
        { name: "HOME", href: "/#home" },
        { name: "SERVICES", href: "/#services" },
        { name: "INSIGHTS", href: "/#insights" },
        { name: "SOLUTIONS", href: "/#solutions" },
        { name: "ABOUT US", href: "/#about" },
        { name: "CONTACT", href: "/contact" },
      ];

  const servicesList = isAr
    ? [
        "وكلاء الذكاء الاصطناعي والأتمتة",
        "استشارات واستراتيجيات AI",
        "تطوير الويب وتطبيقات الجوال",
        "مراكز الاتصال والدردشة الذكية",
        "دمج وتدريب نماذج LLM المخصصة",
      ]
    : [
        "AI Agents & Automation",
        "AI Consulting & Strategy",
        "Full-stack Web & App Dev",
        "AI Chat & Call Center",
        "Custom LLM Integration",
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-x-clip font-sans"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[550px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[-100px] w-[600px] h-[600px] bg-[#00E5BE]/5 rounded-full blur-[200px] pointer-events-none -z-10" />

      {/* 1. Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#060913]/85 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="py-2.5 sm:py-3 px-6 sm:px-12 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <div className="relative h-9 w-44 sm:h-10 sm:w-48 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/tahseen-logo.png"
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 176px, 192px"
                className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                priority
              />
            </div>
          </Link>

          {/* Right: Nav Links & Language Switcher & LET'S TALK Button */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[11px] sm:text-xs font-semibold tracking-wider text-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 cursor-pointer ${
                    link.href === "/contact" ? "text-[#00E5BE]" : "hover:text-[#00E5BE]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Language Toggle Button */}
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5BE]/40 text-gray-200 hover:text-[#00E5BE] transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#00E5BE]" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2 text-[11px] sm:text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>{isAr ? "تحدث معنا" : "LET'S TALK"}</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Contact Form & Details Section */}
      <main className="relative z-10 py-12 sm:py-20 px-6 sm:px-10 lg:px-12 xl:px-16 max-w-[1400px] mx-auto w-full flex-1">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? "تحدث مع خبراء الذكاء الاصطناعي" : "LET'S TALK AI SOLUTIONS"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>
                ابدأ رحلة <span className="text-[#00E5BE]">التحول بالذكاء الاصطناعي</span>
              </>
            ) : (
              <>
                Start Your <span className="text-[#00E5BE]">AI Transformation</span>
              </>
            )}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "جاهز لأتمتة تدفقات العمل اليدوية، وتدشين وكلاء مبيعات أذكياء، أو استشارة فريقنا المتخصص؟ شاركنا تفاصيل مشروعك أدناه."
              : "Ready to automate manual workflows, deploy intelligent sales agents, or consult on enterprise AI strategy? Tell us about your project below."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-start">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE] text-[#00E5BE] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,190,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {isAr ? "تم استلام رسالتك بنجاح!" : "Message Received!"}
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    {isAr ? (
                      <>
                        شكراً لك، <span className="text-white font-semibold">{formData.fullName}</span>. سيقوم فريقنا الهندسي في الرياض بمراجعة تفاصيل مشروعك والتواصل معك عبر البريد <span className="text-[#00E5BE]">{formData.email}</span> خلال ٢٤ ساعة عمل.
                      </>
                    ) : (
                      <>
                        Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our AI engineering team in Riyadh will review your project details and get back to you at <span className="text-[#00E5BE]">{formData.email}</span> within 24 business hours.
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg btn-teal-outline text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {isAr ? "إرسال استفسار آخر" : "Send Another Inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "الاسم الكامل" : "Your Name"} <span className="text-[#00E5BE]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? "مثال: سلطان العتيبي" : "e.g. Sultan Al-Otaibi"}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "البريد الإلكتروني للعمل" : "Work Email"} <span className="text-[#00E5BE]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sultan@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "الشركة / المؤسسة" : "Company / Organization"}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? "مثال: مجموعة النخبة" : "e.g. Al-Nokhba Group"}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "رقم الجوال" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      placeholder="+966 5X XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    {isAr ? "الخدمة المطلوبة" : "Service of Interest"}
                  </label>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {servicesList.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          formData.service === svc
                            ? "bg-[#00E5BE] text-[#060913] shadow-[0_0_15px_rgba(0,229,190,0.4)]"
                            : "bg-white/[0.04] text-gray-300 border border-white/10 hover:border-white/30"
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    {isAr ? "تفاصيل وأهداف المشروع" : "Project Details & Goals"} <span className="text-[#00E5BE]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      isAr
                        ? "صف لنا تدفقات العمل الحالية، وأهدافك، أو التحديات التي ترغب في حلها بالذكاء الاصطناعي..."
                        : "Describe your workflows, goals, or what challenges you want to solve with AI..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(0,229,190,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                  <span>{isAr ? "إرسال طلب المشروع ←" : "SEND INQUIRY →"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info & Why Choose Us */}
          <div className="lg:col-span-5 space-y-8 text-start">
            
            {/* Direct Contact Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c1f24] via-[#07131a] to-[#060913] border border-[#00E5BE]/30 space-y-6 shadow-[0_12px_40px_rgba(0,229,190,0.1)]">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {isAr ? "معلومات التواصل المباشر" : "Direct Contact Details"}
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:info@tahseenai.com"
                  className="flex items-center gap-3.5 text-sm text-gray-300 hover:text-[#00E5BE] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {isAr ? "البريد الإلكتروني المباشر" : "Direct Email"}
                    </div>
                    <div className="font-semibold text-white">info@tahseenai.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 text-sm text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {isAr ? "المقر الرئيسي" : "Headquarters"}
                    </div>
                    <div className="font-semibold text-white">
                      {isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, Kingdom of Saudi Arabia"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {isAr ? "ساعات الاستجابة" : "Working Hours"}
                    </div>
                    <div className="font-semibold text-white">
                      {isAr ? "الأحد – الخميس (الرد خلال ٢٤ ساعة)" : "Sunday – Thursday (Response in <24 hrs)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Commitment & Trust */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-[#00E5BE] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "التزامنا تجاه المجتمع السعودي" : "National Impact Pledge"}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {isAr ? (
                  <>
                    نلتزم بالتبرع بنسبة <strong className="text-white">١٪ من عوائد أعمالنا</strong> لصالح <strong className="text-[#00E5BE]">منصة إحسان (Ehsan Platform)</strong> لدعم المبادرات الخيرية في المملكة.
                  </>
                ) : (
                  <>
                    We proudly donate <strong className="text-white">1% of all revenue</strong> to the <strong className="text-[#00E5BE]">Ehsan Platform (منصة إحسان)</strong> to support social development across Saudi Arabia.
                  </>
                )}
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* 3. Enterprise Footer */}
      <Footer lang={lang} />

    </div>
  );
}
