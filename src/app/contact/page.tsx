"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2, MessageSquare, Sparkles, Send } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "AI Agents",
    budget: "$5,000 - $15,000",
    message: "",
  });

  const navLinks = [
    { name: "HOME", href: "/#home" },
    { name: "SERVICES", href: "/#services" },
    { name: "SOLUTIONS", href: "/#solutions" },
    { name: "ABOUT US", href: "/#about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const servicesList = [
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
    <div className="relative min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-x-clip font-sans">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[550px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[-100px] w-[600px] h-[600px] bg-[#00E5BE]/5 rounded-full blur-[200px] pointer-events-none -z-10" />

      {/* 1. Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#060913]/85 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="py-3 sm:py-3.5 px-6 sm:px-12 lg:px-16 max-w-[1680px] mx-auto w-full flex items-center justify-between">
          
          {/* Left: Official Brand Logo */}
          <Link href="/" className="flex items-center group cursor-pointer">
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 cursor-pointer ${
                    link.name === "CONTACT" ? "text-[#00E5BE]" : "hover:text-[#00E5BE]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
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

      {/* 2. Main Contact Form & Details Section */}
      <main className="relative z-10 py-12 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-[1560px] mx-auto w-full flex-1">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[#00E5BE] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S TALK AI SOLUTIONS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Start Your <span className="text-[#00E5BE]">AI Transformation</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Ready to automate manual workflows, deploy intelligent sales agents, or consult on enterprise AI strategy? Tell us about your project below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE] text-[#00E5BE] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,190,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Message Received!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our AI engineering team in Riyadh will review your project details and get back to you at <span className="text-[#00E5BE]">{formData.email}</span> within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg btn-teal-outline text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Your Name <span className="text-[#00E5BE]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sultan Al-Otaibi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Work Email <span className="text-[#00E5BE]">*</span>
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
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Al-Nokhba Group"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] transition-colors text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Phone Number
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
                    Service of Interest
                  </label>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {servicesList.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
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
                    Project Details & Goals <span className="text-[#00E5BE]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your workflows, goals, or what challenges you want to solve with AI..."
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
                  <span>SUBMIT INQUIRY</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Info & Value Badges */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Email Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0d1d24] to-[#060913] border border-[#00E5BE]/30 shadow-[0_10px_40px_rgba(0,229,190,0.1)] space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE] text-[#00E5BE] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#00E5BE] tracking-widest uppercase">DIRECT CONTACT</span>
                <h3 className="text-2xl font-bold text-white">info@tahseenai.com</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  For RFPs, partnership proposals, or general inquiries, feel free to email our team directly anytime.
                </p>
              </div>
              <a
                href="mailto:info@tahseenai.com"
                className="inline-flex items-center text-xs font-bold text-[#00E5BE] hover:underline uppercase tracking-wider gap-1.5"
              >
                <span>SEND AN EMAIL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Office & Regional Hub Card */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00E5BE] flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Headquarters</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Riyadh, Kingdom of Saudi Arabia <br />
                    Serving enterprises and innovators nationwide.
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00E5BE] flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Response Time</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Sunday – Thursday: 9:00 AM – 6:00 PM (AST) <br />
                    Average inquiry response under 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Saudi Impact Notice */}
            <div className="p-6 rounded-2xl bg-[#00E5BE]/5 border border-[#00E5BE]/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00E5BE]/10 text-[#00E5BE] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">1% for Ehsan:</span> We proudly contribute 1% of all project proceeds to the <span className="text-[#00E5BE] font-medium">Ehsan Platform (منصة إحسان)</span>.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* 3. Footer */}
      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-xs text-gray-500 font-mono space-y-2">
        <div>© {new Date().getFullYear()} Tahseen AI (مجموعة تحسين للذكاء الاصطناعي). All rights reserved.</div>
        <div className="text-gray-600">Built with cutting-edge Artificial Intelligence • Riyadh, Saudi Arabia</div>
      </footer>

    </div>
  );
}
