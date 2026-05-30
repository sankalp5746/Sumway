"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, Laptop, Code, Cpu, ShieldAlert, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useAppStore } from "@/lib/store";

export default function ITSoftwareIndustry() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  return (
    <div className="bg-[#0A0F1E]">
      <PageHero 
        title="IT & Software Development" 
        subtitle="Modern cloud architectures, React/Next.js systems, and full-stack software development."
      />

      {/* Challenges (Red Accent) */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full uppercase">
            Sector Challenges
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-4">
            Engineering friction & Legacy drag
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Legacy System Overheads</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Outdated technology stacks and slow code execution drag down user engagement and enterprise performance.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Qualified Dev Deficit</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Securing high-performing React, Next.js, and TypeScript developers in global markets remains extremely expensive.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Cloud Scaling friction</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Configuring robust database pipelines, secure user access controls, and serverless scaling requires expert management.</p>
          </div>
        </div>
      </section>

      {/* Solutions (Green Accent) */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">Our Solutions</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              MODERN AGILE SOFTWARE ENGINEERING
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We compile highly skilled, vetted engineering divisions. From custom full-stack React and Next.js applications to complex SQL configuration and cloud migrations, we provide continuous delivery.
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Modern Next.js and TypeScript custom application development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Rigorous type-safety and visual animation integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Dedicated cloud architecture & stat database setup</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 glass-card p-8 bg-[#111827] border-slate-800 flex flex-col gap-6">
            <h3 className="font-display font-bold text-sm text-[#F5C542] uppercase tracking-wide">
              Software Transformation Case Study
            </h3>
            <div className="flex flex-col gap-3 text-xs leading-relaxed">
              <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                <span className="text-[9px] font-bold text-red-400 uppercase">Client Challenge</span>
                <p className="text-slate-400 mt-1 italic font-medium">&ldquo;Inability to recruit React developers delayed core SaaS product roadmap.&rdquo;</p>
              </div>
              <div className="p-3 bg-[#00C2B2]/5 border border-[#00C2B2]/10 rounded-lg">
                <span className="text-[9px] font-bold text-[#00C2B2] uppercase">Sumway Strategy</span>
                <p className="text-slate-400 mt-1 font-medium">Assigned a vetted team of 4 full-stack TypeScript engineers using agile sprints.</p>
              </div>
              <div className="p-3 bg-[#F5C542]/5 border border-[#F5C542]/10 rounded-lg">
                <span className="text-[9px] font-bold text-[#F5C542] uppercase">Delivered Result</span>
                <p className="text-slate-300 font-bold">Successfully deployed 4 key SaaS modules; cut hiring and operational budgets by 45%.</p>
              </div>
            </div>

            <button
              onClick={() => openEnquiry("IT & Software Outsourcing")}
              className="w-full flex items-center justify-center gap-2 mt-2 py-3 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Partner for IT Dev</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
