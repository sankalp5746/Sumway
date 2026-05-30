"use client";

import React from "react";
import { Target, Eye, ShieldCheck, Heart, Sparkles, Award, Star } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const coreValues = [
  {
    title: "Operational Integrity",
    desc: "Complete statutory compliance, secure cloud architectures, strict non-disclosure compliance, and transparent delivery SLAs.",
    icon: ShieldCheck
  },
  {
    title: "Client Empathy",
    desc: "Our tagline, 'Your Happiness Our Resolution', drives our round-the-clock commitment to resolving enterprise pain points.",
    icon: Heart
  },
  {
    title: "Continuous Innovation",
    desc: "Constantly upgrading BPO virtual desks, using frameworks like React and Next.js, and integrating automation systems.",
    icon: Sparkles
  },
  {
    title: "Indian Talent Curation",
    desc: "Empowering university graduates and career shifters in Jaipur, Rajasthan, and pipelining them directly to global operations.",
    icon: Award
  },
  {
    title: "Absolute Transparency",
    desc: "Honest boardroom reporting, clear transparent pricing systems, and reliable candidate profiles.",
    icon: Star
  }
];

export default function MissionVision() {
  return (
    <div className="bg-[#0A0F1E]">
      <PageHero 
        title="Mission & Vision" 
        subtitle="Empowering cross-continental enterprise growth with absolute structural integrity."
      />

      {/* Split-card layouts */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mission Card */}
        <div className="glass-card p-8 md:p-12 border-[#00C2B2]/20 hover:border-[#00C2B2]/40 bg-gradient-to-br from-[#111827] to-[#0A0F1E] flex flex-col gap-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C2B2]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2]">
            <Target className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
            Our Mission
          </h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
            To empower global organizations by delivering premium recruitment architectures, secure customer service outsourcing (BPO), custom tech transformations, and robust virtual support. We are dedicated to bridging capabilities with seamless execution, ensuring statutory compliance, operational transparency, and continuous SLA excellence.
          </p>
        </div>

        {/* Vision Card */}
        <div className="glass-card p-8 md:p-12 border-[#F5C542]/20 hover:border-[#F5C542]/40 bg-gradient-to-br from-[#111827] to-[#0A0F1E] flex flex-col gap-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5C542]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
            <Eye className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
            Our Vision
          </h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
            To be recognized as a premier corporate global management partner. We aspire to position Jaipur, Rajasthan, as a top-tier hub for cross-continental workforce sourcing, software engineering and digital services, steering global corporate integrations while fostering Indian professional talent.
          </p>
        </div>
      </section>

      {/* Core Values grid */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
              How We Execute
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              OUR CORE CORPORATE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div 
                  key={val.title}
                  className="glass-card p-6 flex flex-col gap-4 border-slate-800 hover:border-[#00C2B2]/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                      {val.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
