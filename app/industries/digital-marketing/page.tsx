"use client";

import React from "react";
import { AlertCircle, CheckCircle2, TrendingUp, Sparkles, Target, ShieldAlert, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useAppStore } from "@/lib/store";

export default function DigitalMarketingIndustry() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Digital Marketing" 
        subtitle="Data-driven search engine optimization, pay-per-click ad assets and brand transformations."
      />

      {/* Challenges (Red Accent) */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full uppercase">
            Sector Challenges
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-4">
            High customer acquisition costs & low conversions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Poor Search Visibility</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Failing to index on primary Google search keywords isolates brands from high-intent local and global buyers.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Wasted Ad Budget</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Unoptimized PPC keyword targeting and boring visual design assets burn through substantial marketing capital.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Unintegrated Funnels</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Generating clicks without robust landing pages and smooth conversion paths results in zero sales growth.</p>
          </div>
        </div>
      </section>

      {/* Solutions (Green Accent) */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">Our Solutions</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              DATA-DRIVEN CONVERSION ENGINE
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We engineer comprehensive search engine indexing systems, optimize paid acquisition campaigns, and construct exquisite visual identity assets that command audience engagement.
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Thorough technical SEO site auditing & keyword optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>High-performance Google & social media pay-per-click management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Conversion rate optimization (CRO) landing pages engineering</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 glass-card p-8 flex flex-col gap-6">
            <h3 className="font-display font-bold text-sm text-[#F5C542] uppercase tracking-wide">
              Organic Optimization Case Study
            </h3>
            <div className="flex flex-col gap-3 text-xs leading-relaxed">
              <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                <span className="text-[9px] font-bold text-red-400 uppercase">Client Challenge</span>
                <p className="text-slate-400 mt-1 italic font-medium">&ldquo;Corporate site generated zero search clicks, relying heavily on expensive paid ads.&rdquo;</p>
              </div>
              <div className="p-3 bg-[#00C2B2]/5 border border-[#00C2B2]/10 rounded-lg">
                <span className="text-[9px] font-bold text-[#00C2B2] uppercase">Sumway Strategy</span>
                <p className="text-slate-400 mt-1 font-medium">Conducted complete schema structuring, technical SEO fixes, and backlink pipelines.</p>
              </div>
              <div className="p-3 bg-[#F5C542]/5 border border-[#F5C542]/10 rounded-lg">
                <span className="text-[9px] font-bold text-[#F5C542] uppercase">Delivered Result</span>
                <p className="text-slate-300 font-bold">Achieved #1 ranking for 18 primary keywords; organic inbound inquiries grew by 320%.</p>
              </div>
            </div>

            <button
              onClick={() => openEnquiry("Digital Marketing Campaign")}
              className="w-full flex items-center justify-center gap-2 mt-2 py-3 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Audit My Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
