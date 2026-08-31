"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { COMPANY_DETAILS, SOCIAL_LINKS, SERVICES } from "@/lib/constants";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060b17] light:bg-slate-100 border-t border-white/5 light:border-slate-200 pt-16 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,194,178,0.06),transparent)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FF555F]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1: Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="relative w-10 h-10 overflow-hidden bg-white rounded-full flex items-center justify-center p-1 border border-[#FF555F]/20 shadow-md">
              <Image
                src="/images/logo.png"
                alt="Sumway Global Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-sm tracking-wider text-slate-100 light:text-[#111827] group-hover:text-[#FF555F] transition-colors">
                SUMWAY GLOBAL
              </span>
              <span className="text-[9px] font-semibold text-[#4AABCA] tracking-[0.2em] uppercase mt-0.5">
                MANAGEMENT
              </span>
            </div>
          </Link>

          <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">
            Corporate workforce recruitment, BPO support, skill enhancement and custom software development solutions engineered in Jaipur, India.
          </p>

          <p className="text-sm font-semibold text-[#FF555F] italic">
            &ldquo;{COMPANY_DETAILS.tagline}&rdquo;
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 mt-1">
            {[
              { href: SOCIAL_LINKS.instagram, Icon: FaInstagram, label: "Instagram (@sumwayglobal)" },
              { href: SOCIAL_LINKS.twitter, Icon: FaXTwitter, label: "X / Twitter (@Sumwayglobal)" },
              { href: SOCIAL_LINKS.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
              { href: SOCIAL_LINKS.facebook, Icon: FaFacebookF, label: "Facebook" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/8 light:border-slate-300 bg-white/4 light:bg-slate-200 flex items-center justify-center text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#FF555F] hover:border-[#FF555F]/30 hover:bg-[#FF555F]/5 transition-all hover:-translate-y-0.5"
                aria-label={`${label} Profile`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4AABCA]">
            Quick Links
          </span>
          <nav className="flex flex-col gap-2.5">
            {[
              { label: "Home", href: "/" },
              { label: "About Our Firm", href: "/company/about-us" },
              { label: "Services", href: "/services/staffing-solutions" },
              { label: "Careers & Culture", href: "/careers" },
              { label: "Contact Us", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-slate-400 light:text-slate-600 hover:text-[#FF555F] transition-colors hover:translate-x-1 inline-block"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Services */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4AABCA]">
            Our Services
          </span>
          <nav className="flex flex-col gap-2.5">
            {SERVICES.map((serv) => (
              <Link
                key={serv.id}
                href={serv.href}
                className="flex items-center justify-between group text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#FF555F] transition-colors"
              >
                <span>{serv.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[#FF555F] shrink-0" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4AABCA]">
            Contact Details
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 text-[#FF555F] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                {COMPANY_DETAILS.address}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-[#FF555F] shrink-0" />
              <a
                href={`tel:${COMPANY_DETAILS.phone}`}
                className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#FF555F] transition-colors"
              >
                {COMPANY_DETAILS.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-[#FF555F] shrink-0" />
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#FF555F] transition-colors"
              >
                {COMPANY_DETAILS.email}
              </a>
            </div>
            <div className="flex gap-3 items-start">
              <Clock className="w-4 h-4 text-[#FF555F] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                {COMPANY_DETAILS.hours}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 light:text-slate-500 font-medium">
        <span>
          &copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. All Rights Reserved.
        </span>
        <div className="flex gap-5">
          <Link href="#" className="hover:text-[#FF555F] transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#FF555F] transition-colors">
            Terms of Service
          </Link>
          <button
            onClick={handleScrollToTop}
            className="hover:text-[#FF555F] transition-colors underline cursor-pointer"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
