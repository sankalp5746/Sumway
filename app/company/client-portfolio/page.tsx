"use client";

import React from "react";
import { Award, Target, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const caseStudies = [
  {
    title: "TechnoStack Global (IT Staffing)",
    problem: "Sourcing certified cloud developer hires took over 60 days on average, dragging down critical SaaS delivery.",
    solution: "Deployed a dedicated RPO pipeline matching vetted React & Node developers from our Jaipur resource divisions.",
    result: "Average sourcing time reduced to 21 days; successfully deployed 14 senior engineer placements with a 98% retention rate."
  },
  {
    title: "Apex Retail US (24/7 BPO Support)",
    problem: "Sizable customer call surges during seasonal shopping caused major queue dropouts and poor support ratings.",
    solution: "Assigned an active 24/7 team of 18 voice & chat customer support associates operating rotational shifts.",
    result: "Average pickup queue reduced below 45 seconds; customer CSAT ratings rose to a historic 4.8 out of 5 stars."
  }
];

export default function ClientPortfolio() {
  return (
    <div className="bg-[#0A0F1E]">
      <PageHero 
        title="Client Portfolio" 
        subtitle="Exploring the corporate scaling partners, BPO deployments and custom case studies."
      />

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
            Operational Studies
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            DELIVERED BUSINESS METRICS
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 leading-relaxed font-medium">
            Review how our dedicated recruitment pipelines, active support helpdesks, and custom software systems successfully resolved enterprise blockages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs) => (
            <div 
              key={cs.title}
              className="glass-card p-8 bg-[#111827] border-slate-800 hover:border-[#F5C542]/20 flex flex-col gap-5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00C2B2]/5 to-transparent rounded-bl-full group-hover:scale-125 transition-transform" />
              
              <div className="w-10 h-10 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] border border-[#00C2B2]/20">
                <Award className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display font-bold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                  {cs.title}
                </h3>
                
                <div className="mt-2 space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-lg bg-red-500/5 border border-red-500/10 flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Enterprise Bottleneck</span>
                    <p className="text-slate-400 italic font-medium">&ldquo;{cs.problem}&rdquo;</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#00C2B2]/5 border border-[#00C2B2]/10 flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-[#00C2B2] uppercase tracking-widest">Sumway Strategy</span>
                    <p className="text-slate-400 font-medium">{cs.solution}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#F5C542]/5 border border-[#F5C542]/10 flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-[#F5C542] uppercase tracking-widest">Delivered Result</span>
                    <p className="text-slate-300 font-bold">{cs.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
