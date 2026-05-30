"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, Phone, Mail, Clock, ArrowUpRight 
} from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { COMPANY_DETAILS, SOCIAL_LINKS, NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0A0F1E] dark:bg-[#0A0F1E] light:bg-slate-100 border-t border-[#F5C542]/10 pt-16 pb-8 transition-colors duration-400">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,194,178,0.08),rgba(0,0,0,0))]" />
      
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden bg-white rounded-full flex items-center justify-center p-1 border border-[#F5C542]/20">
              <Image 
                src="/images/logo.png" 
                alt="Sumway Global Logo" 
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm md:text-base tracking-wider text-slate-100 dark:text-slate-100 light:text-[#0F172A]">
                SUMWAY GLOBAL
              </span>
              <span className="text-[9px] font-medium text-[#00C2B2] tracking-widest uppercase">
                MANAGEMENT
              </span>
            </div>
          </Link>
          
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
            Corporate workforce recruitment, BPO support, skill enhancement and custom software development solutions engineered in Jaipur, India.
          </p>
          
          <p className="text-xs font-semibold text-[#F5C542]">
            &ldquo;{COMPANY_DETAILS.tagline}&rdquo;
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-200 flex items-center justify-center hover:text-[#F5C542] hover:border-[#F5C542]/40 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all hover:-translate-y-1"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a 
              href={SOCIAL_LINKS.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-200 flex items-center justify-center hover:text-[#F5C542] hover:border-[#F5C542]/40 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all hover:-translate-y-1"
              aria-label="Twitter Account"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-200 flex items-center justify-center hover:text-[#F5C542] hover:border-[#F5C542]/40 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all hover:-translate-y-1"
              aria-label="Instagram Profile"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a 
              href={SOCIAL_LINKS.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-200 flex items-center justify-center hover:text-[#F5C542] hover:border-[#F5C542]/40 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all hover:-translate-y-1"
              aria-label="Facebook Profile"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00C2B2]">
            QUICK EXPLORER
          </span>
          <nav className="flex flex-col gap-2.5 text-xs font-medium">
            <Link href="/" className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors">
              Home Page
            </Link>
            <Link href="/company/about-us" className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors">
              About Our Firm
            </Link>
            <Link href="/services/staffing-solutions" className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors">
              Services Grid
            </Link>
            <Link href="/careers" className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors">
              Careers & Culture
            </Link>
            <Link href="/blog" className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors">
              Insights & Blogs
            </Link>
            <Link href="/contact" className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors">
              Contact Channels
            </Link>
          </nav>
        </div>

        {/* Column 3: Primary Services */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00C2B2]">
            OUR DEPARTMENTS
          </span>
          <nav className="flex flex-col gap-2.5 text-xs font-medium">
            {SERVICES.map((serv) => (
              <Link 
                key={serv.id} 
                href={serv.href}
                className="flex items-center justify-between group hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors"
              >
                {serv.title}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-[#F5C542]" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 4: Contact Coordinates */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00C2B2]">
            CONTACT DETAILS
          </span>
          <div className="flex flex-col gap-3 text-xs leading-relaxed text-slate-400 dark:text-slate-400 light:text-slate-600">
            <div className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
              <span>{COMPANY_DETAILS.address}</span>
            </div>
            
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-[#F5C542] shrink-0" />
              <a href={`tel:${COMPANY_DETAILS.phone}`} className="hover:text-[#F5C542] transition-colors">
                {COMPANY_DETAILS.phoneDisplay}
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-[#F5C542] shrink-0" />
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-[#F5C542] transition-colors">
                {COMPANY_DETAILS.email}
              </a>
            </div>

            <div className="flex gap-2 items-start mt-1">
              <Clock className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
              <span>{COMPANY_DETAILS.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 dark:text-slate-500 light:text-slate-600 font-medium">
        <span>
          Copyright &copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. Since 2024. All Rights Reserved.
        </span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-[#F5C542] transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#F5C542] transition-colors">
            Terms of Service
          </Link>
          <button 
            onClick={handleScrollToTop}
            className="hover:text-[#F5C542] transition-colors underline cursor-pointer"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
