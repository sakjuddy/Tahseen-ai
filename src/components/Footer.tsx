"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";

export default function Footer() {
  const handleScroll = (href: string) => {
    if (href.startsWith("#")) {
      const elem = document.getElementById(href.replace("#", ""));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative z-10 bg-[#04060d] border-t border-white/[0.06] pt-16 sm:pt-20 pb-12 text-gray-400 font-sans">
      <div className="max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Column 1: Brand Info & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative h-11 w-52 sm:h-12 sm:w-60 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/tahseen-logo.png"
                  alt="Tahseen AI"
                  fill
                  sizes="(max-width: 640px) 208px, 240px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-normal">
              Pioneering sovereign Artificial Intelligence and automated workflows that empower Saudi enterprises and SMEs to scale smarter, faster, and more securely.
            </p>

            {/* Saudi Regional Identity & Ehsan Pledge */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                <MapPin className="w-4 h-4 text-[#00E5BE] flex-shrink-0" />
                <span>Headquartered in Riyadh, Kingdom of Saudi Arabia</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <HeartHandshake className="w-4 h-4 text-[#00E5BE] flex-shrink-0" />
                <span>1% of proceeds donated to <strong className="text-white">Ehsan Platform (منصة إحسان)</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions & Capabilities (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Solutions & Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#services" className="hover:text-[#00E5BE] transition-colors">
                  Autonomous AI Agents
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#00E5BE] transition-colors">
                  Enterprise Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/#insights" className="hover:text-[#00E5BE] transition-colors">
                  Real-Time Insights & Oversight
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[#00E5BE] transition-colors">
                  Campaign & Outreach Automation
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#00E5BE] transition-colors">
                  AI Consultation & Strategy
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#00E5BE] transition-colors">
                  Full-Stack Web & Mobile Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Governance (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="hover:text-[#00E5BE] transition-colors">
                  About Tahseen AI
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#00E5BE] transition-colors">
                  Our Purpose & Vision
                </Link>
              </li>
              <li>
                <Link href="/#insights" className="hover:text-[#00E5BE] transition-colors">
                  Client Success Stories
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[#00E5BE] transition-colors">
                  Security & Sovereign AI
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00E5BE] transition-colors">
                  Careers & Partnerships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00E5BE] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected & Direct Inquiries (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Direct Contact
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Have an RFP, integration question, or need AI consulting? Connect directly with our team.
            </p>

            <a
              href="mailto:info@tahseenai.com"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#00E5BE]/40 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00E5BE]/10 text-[#00E5BE] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-gray-400">Email Engineering</div>
                <div className="text-xs font-bold text-white group-hover:text-[#00E5BE] transition-colors">
                  info@tahseenai.com
                </div>
              </div>
            </a>

            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-lg bg-[#00E5BE] text-[#060913] hover:bg-[#26FFDF] font-bold text-xs uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(0,229,190,0.3)] gap-1.5"
            >
              <span>LET&apos;S TALK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            © {new Date().getFullYear()} Tahseen AI (مجموعة تحسين للذكاء الاصطناعي). All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <Link href="/#about" className="hover:text-[#00E5BE] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#about" className="hover:text-[#00E5BE] transition-colors">
              Terms of Service
            </Link>
            <Link href="/#insights" className="hover:text-[#00E5BE] transition-colors">
              System Security
            </Link>
            <span className="text-[#00E5BE] font-semibold">KSA • Vision 2030</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
