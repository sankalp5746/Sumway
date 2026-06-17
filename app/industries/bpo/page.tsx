"use client";

import React from "react";
import { AlertOctagon, CheckCircle2, Headphones, Activity, ShieldAlert, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FallbackImage from "@/components/shared/FallbackImage";
import { useAppStore } from "@/lib/store";

export default function BPOIndustry() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero
        title="BPO & Customer Care"
        subtitle="Operational voice and chat desk systems delivering 24/7 client happiness."
      />

      {/* Challenges (Red Accent) */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full uppercase">
            Sector Challenges
          </span>
          <h2 className="font-display font-extrabold text-xl sm:text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-4">
            Operational Friction in Support Desks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">High Staff Attrition</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Standard call centers suffer from extreme staff turnover, driving up recruiting and training costs.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">SLA & Queue Slippage</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Unpredictable call surges lead to long queues, dropouts, and catastrophic customer satisfaction plunges.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Compliance Fractures</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Operating cross-continental support requires strict compliance audits, customer data protection, and NDAs.</p>
          </div>
        </div>
      </section>

      {/* Our Solutions (Green Accent) */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">Our Strategy</span>
            <h2 className="font-display font-extrabold text-xl sm:text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              HIGH-EFFICIENCY support HUBS
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We operate dedicated high-performance voice, chat, and support desks inside our Stock Exchange HQ in Jaipur. Our BPO solutions are engineered with dedicated servers, robust operational isolation, and continuous board audits.
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#4AABCA] shrink-0" />
                <span>Rotational shifts supporting global timezones</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#4AABCA] shrink-0" />
                <span>Pre-trained helpdesk associates (Agile onboarding)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#4AABCA] shrink-0" />
                <span>Dedicated strict NDA compliance & data safety</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/6 light:border-slate-300 shadow-xl">
              <FallbackImage
                src="/images/bpo.png"
                alt="BPO Operations Hub"
                fill
                className="object-cover"
                fallbackLabel="BPO Operations Desk"
              />
            </div>

            <div className="glass-card p-8 flex flex-col gap-6">
              <h3 className="font-display font-bold text-sm text-[#FF555F] uppercase tracking-wide">
                Voice & Chat Case Study
              </h3>
              <div className="flex flex-col gap-3 text-xs leading-relaxed">
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <span className="text-[9px] font-bold text-red-400 uppercase">Client Challenge</span>
                  <p className="text-slate-400 mt-1 italic font-medium">&ldquo;High call drops during peak retail sales drove support scores down.&rdquo;</p>
                </div>
                <div className="p-3 bg-[#4AABCA]/5 border border-[#4AABCA]/10 rounded-lg">
                  <span className="text-[9px] font-bold text-[#4AABCA] uppercase">Sumway Strategy</span>
                  <p className="text-slate-400 mt-1 font-medium">Deployed an active team of 18 pre-screened helpdesk associates handling rotational shifts.</p>
                </div>
                <div className="p-3 bg-[#FF555F]/5 border border-[#FF555F]/10 rounded-lg">
                  <span className="text-[9px] font-bold text-[#FF555F] uppercase">Delivered Result</span>
                  <p className="text-slate-300 font-bold">Queue time reduced to &lt;45s; customer support scores rose to 4.8/5 stars.</p>
                </div>
              </div>

              <button
                onClick={() => openEnquiry("BPO Operations Desk")}
                className="w-full flex items-center justify-center gap-2 mt-2 py-3 rounded-lg bg-[#FF555F] text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-[#FF555F]/90 active:scale-95 transition-all cursor-pointer"
              >
                <span>Setup BPO Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
