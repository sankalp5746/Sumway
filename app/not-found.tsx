"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, PhoneCall, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080d1a] light:bg-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF555F]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#4AABCA]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center gap-6 glass-card p-8 sm:p-12 border-white/10 shadow-2xl">
        {/* Badge / Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#FF555F]/10 border border-[#FF555F]/20 flex items-center justify-center text-[#FF555F] shadow-inner">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display font-extrabold text-6xl text-[#FF555F] tracking-widest">
            404
          </span>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium mt-1">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us guide you back to safety.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <Link
            href="/"
            className="flex-1 btn-primary justify-center !py-3 !text-xs whitespace-nowrap"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/contact"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/10 light:border-slate-300 bg-white/5 light:bg-slate-200 text-slate-200 light:text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-[#4AABCA]" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
