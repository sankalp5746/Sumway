"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { COMPANY_DETAILS } from "@/lib/constants";

export default function HeroBanner() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  const handleScrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#080d1a] light:bg-slate-50">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <FallbackImage
          src="/images/hero.png"
          alt="Modern corporate office workspace"
          fill
          className="object-cover opacity-20 light:opacity-10"
          priority
          fallbackLabel="Corporate Office"
        />
      </div>

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 animated-mesh opacity-40 light:opacity-20" />

      {/* Radial glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,194,178,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(245,197,66,0.06),transparent)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F1E] light:from-slate-50 to-transparent" />

      {/* Floating shapes — desktop only */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full border border-slate-700/20 blur-sm pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 28, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-14 w-32 h-32 rounded-full border border-[#00C2B2]/10 blur-sm pointer-events-none hidden lg:block"
      />

      {/* Main content — pt accounts for fixed navbar */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pt-24 pb-20">

        {/* Tagline badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00C2B2] bg-[#00C2B2]/10 px-4 py-2 rounded-full border border-[#00C2B2]/20">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>{COMPANY_DETAILS.tagline}</span>
          </span>
        </motion.div>

        {/* Main headline — capped at text-5xl to prevent overflow */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-100 light:text-[#0F172A] tracking-tight leading-[1.08] uppercase"
        >
          Empowering Businesses
          <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C542] via-[#00C2B2] to-[#F5C542] animate-mesh"
            style={{ backgroundSize: "300% 300%" }}
          >
            with Global Workforce
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-sm sm:text-base md:text-lg text-slate-400 light:text-slate-600 mt-5 max-w-xl leading-relaxed"
        >
          Sumway Global Management is your enterprise gateway for strategic recruitment,
          BPO operations, premium digital transformations, and high-performance talent curation.{" "}
          <span className="text-slate-300 light:text-slate-700 font-medium">Jaipur-crafted, globally aligned.</span>
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex items-center gap-6 sm:gap-10 mt-7"
        >
          {[
            { value: "150+", label: "Clients" },
            { value: "2500+", label: "Placed" },
            { value: "99.8%", label: "SLA Rate" },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="w-px h-8 bg-white/10 light:bg-slate-300" />}
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-[#F5C542]">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 light:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
        >
          <button
            onClick={() => openEnquiry("Enterprise Recruitment")}
            className="btn-primary w-full sm:w-auto justify-center"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleScrollToServices}
            className="btn-outline w-full sm:w-auto justify-center"
          >
            Explore Our Services
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-slate-500 hover:text-[#F5C542] transition-colors"
        onClick={handleScrollToServices}
      >
        <span className="text-[9px] font-bold tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#F5C542]" />
      </motion.div>
    </section>
  );
}
