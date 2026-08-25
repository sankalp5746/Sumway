"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, PhoneCall, ShieldCheck, TrendingUp,
  AlertTriangle, CheckSquare, ArrowUpRight
} from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

const iconMap: { [key: string]: any } = {
  Clock, PhoneCall, ShieldCheck, TrendingUp
};

export default function BusinessSolutions() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0].id);
  const activeSolution = SOLUTIONS.find((s) => s.id === activeTab) || SOLUTIONS[0];
  const ActiveIcon = iconMap[activeSolution.icon] || ShieldCheck;

  return (
    <section className="relative py-10 sm:py-12 md:py-16 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4AABCA]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Enterprise Architecture"
          title="Business-Driven Solutions"
          desc="Custom, high-performing corporate strategy layers crafted to resolve critical bottlenecks, reduce operating overhead, and scale operations rapidly."
        />

        {/* Tab controls */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#0c1220] light:bg-slate-100 max-w-4xl mx-auto mt-8 sm:mt-14 border border-white/6 light:border-slate-300">
          {SOLUTIONS.map((sol) => {
            const TabIcon = iconMap[sol.icon] || ShieldCheck;
            const isSelected = activeTab === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
                  isSelected ? "text-[#0A1128]" : "text-slate-400 light:text-slate-650 hover:text-slate-200 light:hover:text-[#4AABCA]"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSolutionTab"
                    className="absolute inset-0 bg-[#FF555F] rounded-xl -z-10 shadow-[0_4px_16px_rgba(245,197,66,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{sol.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="glass-card p-4 sm:p-7 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch"
            >
              {/* Left */}
              <div className="md:col-span-7 flex flex-col gap-4 sm:gap-5 justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="icon-box-teal shrink-0">
                    <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide uppercase">
                    {activeSolution.title}
                  </h3>
                </div>

                {/* Problem statement */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex gap-2.5 sm:gap-3 items-start">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-widest">Client Bottleneck</span>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 italic leading-relaxed">
                      &ldquo;{activeSolution.problem}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#4AABCA] uppercase tracking-widest">Key Deliverables</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-2.5">
                    {activeSolution.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-300 light:text-slate-700">
                        <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF555F] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Teaser card */}
              <div className="md:col-span-5 bg-[#080d1a] light:bg-slate-100 border border-white/6 light:border-slate-300 rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#4AABCA]">Operational Matrix</span>
                  <h4 className="font-display font-bold text-base sm:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-1.5">
                    Sumway Strategy Layer
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                    Integrated systems structured to maximize client KPIs. Includes complete onboarding workflows, security verification, and statutory payroll setups.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3.5 border-t border-white/6 light:border-slate-200">
                  <span className="text-[10px] sm:text-xs text-[#FF555F] font-bold tracking-widest uppercase whitespace-nowrap">
                    99.8% System SLA
                  </span>
                  <Link
                    href={activeSolution.href}
                    className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors shrink-0"
                  >
                    <span>Read Metrics</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
