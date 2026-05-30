"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, PhoneCall, ShieldCheck, TrendingUp, 
  AlertTriangle, CheckSquare, ArrowUpRight 
} from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

const iconMap: { [key: string]: any } = {
  Clock,
  PhoneCall,
  ShieldCheck,
  TrendingUp
};

export default function BusinessSolutions() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0].id);

  const activeSolution = SOLUTIONS.find((s) => s.id === activeTab) || SOLUTIONS[0];
  const ActiveIcon = iconMap[activeSolution.icon] || ShieldCheck;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00C2B2]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          badge="Enterprise Architecture"
          title="BUSINESS-DRIVEN SOLUTIONS"
          desc="Custom, high-performing corporate strategy layers crafted to resolve critical bottlenecks, reduce operating overhead, and scale operations rapidly."
        />

        {/* Tab Controls (Horizontal bar with sliding background) */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-xl bg-[#111827] max-w-4xl mx-auto mt-12 border border-[#F5C542]/10">
          {SOLUTIONS.map((sol) => {
            const TabIcon = iconMap[sol.icon] || ShieldCheck;
            const isSelected = activeTab === sol.id;

            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
                  isSelected 
                    ? "text-[#0A0F1E]" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSolutionTab"
                    className="absolute inset-0 bg-[#F5C542] rounded-lg -z-10 shadow-[0_4px_12px_rgba(245,197,66,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <TabIcon className="w-4 h-4 shrink-0" />
                <span>{sol.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Panel */}
        <div className="max-w-4xl mx-auto mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side: Context details */}
              <div className="md:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2]">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide uppercase">
                    {activeSolution.title}
                  </h3>
                </div>

                {/* Problem Statement Pull Quote */}
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 flex gap-3 items-start">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Client Bottleneck</span>
                    <p className="text-xs text-slate-400 mt-1 italic leading-relaxed">
                      &ldquo;{activeSolution.problem}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Solution Deliverables Checklist */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-[#00C2B2] uppercase tracking-widest">Key Deliverables</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-300">
                    {activeSolution.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckSquare className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: High-res teaser illustration layout */}
              <div className="md:col-span-5 bg-[#0A0F1E] dark:bg-[#0A0F1E] light:bg-slate-100 border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-64 md:h-72">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#00C2B2]">Operational Matrix</span>
                  <h4 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                    Sumway Strategy Layer
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                    Integrated systems structured to maximize client KPIs. Includes complete onboarding workflows, security verification, and statutory payroll setups.
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-[9px] text-[#F5C542] font-bold tracking-widest uppercase">99.8% System SLA</span>
                  <a 
                    href={activeSolution.href}
                    className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-[#F5C542]"
                  >
                    <span>Read Metrics</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
