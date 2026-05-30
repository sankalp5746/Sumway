"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { COMPANY_DETAILS } from "@/lib/constants";

export default function HeroBanner() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  const handleScrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0A0F1E]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <FallbackImage
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"
          alt="Modern corporate office workspace"
          fill
          className="object-cover opacity-25"
          priority
          fallbackLabel="Corporate Office"
        />
      </div>
      {/* Background Animated Gradient Mesh Overlay */}
      <div className="absolute inset-0 animated-mesh opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,178,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/50 via-[#0A0F1E]/70 to-[#0A0F1E]" />

      {/* Floating Abstract Shapes */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-12 w-32 h-32 rounded-full border border-slate-700/20 dark:border-slate-700/20 light:border-slate-300 blur-sm pointer-events-none hidden md:block"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-16 w-48 h-48 rounded-full border border-[#00C2B2]/10 blur-sm pointer-events-none hidden md:block"
      />
      
      {/* Dynamic Content Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Core Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#00C2B2] bg-[#00C2B2]/10 px-4.5 py-2 rounded-full border border-[#00C2B2]/20">
            {COMPANY_DETAILS.tagline}
          </span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-3xl md:text-6xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight leading-tight uppercase max-w-4xl"
        >
          Empowering Businesses with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C542] via-[#00C2B2] to-[#F5C542] animate-mesh" style={{ backgroundSize: "300% 300%" }}>
            Global Workforce Solutions
          </span>
        </motion.h1>

        {/* Secondary Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-6 max-w-2xl leading-relaxed font-medium"
        >
          Sumway Global Management is your enterprise gateway for strategic recruitment, 
          BPO operations, premium digital transformations, and high-performance talent curation. 
          Jaipur-crafted, globally aligned.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <button
            onClick={() => openEnquiry("Enterprise Recruitment")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5C542] text-[#0A0F1E] text-xs font-bold uppercase tracking-wider hover:bg-[#F5C542]/90 shadow-[0_4px_20px_rgba(245,197,66,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleScrollToServices}
            className="px-6 py-3.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-bold uppercase tracking-wider hover:border-[#F5C542]/30 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-300 transition-all cursor-pointer"
          >
            Explore Our Services
          </button>
        </motion.div>
      </div>

      {/* Bouncing Chevron down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-slate-500 hover:text-[#F5C542] transition-colors"
        onClick={handleScrollToServices}
      >
        <span className="text-[9px] font-bold tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 text-[#F5C542]" />
      </motion.div>
    </section>
  );
}
