"use client";

import React from "react";
import { Users, Headphones, Laptop, GraduationCap } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const domains = [
  {
    title: "Contract & Permanent Staffing",
    desc: "Placing verified technology developers, helpdesk executives, digital managers, and administrative support personnel inside scaling firms.",
    icon: Users
  },
  {
    title: "Virtual Support BPO Desks",
    desc: "Deploying highly energetic voice, chat and helpdesk support associates operating 24/7 inside the Jaipur Stock Exchange HQ.",
    icon: Headphones
  },
  {
    title: "Software & Digital Engineering",
    desc: "Developing modern cloud-enabled custom applications, React/Next.js corporate landing nodes, and high-performance branding assets.",
    icon: Laptop
  },
  {
    title: "Training & Skill Enhancement",
    desc: "Curation modules bridging raw academic capability with actual corporate guidelines, delivering deployment-ready professionals.",
    icon: GraduationCap
  }
];

export default function WhatWeDo() {
  return (
    <div className="bg-[#0A0F1E]">
      <PageHero 
        title="What We Do" 
        subtitle="Exploring our integrated consulting streams, BPO networks and custom tech architectures."
      />

      {/* Overview */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">Our Capabilities</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            INTEGRATED CONSULTING VERTICALS
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 leading-relaxed font-medium">
            Sumway Global is an integrated enterprise. We don&apos;t limit our consulting to standard recruitment; we operate active voice desk systems, software engineering teams, and compliance support lines inside our Jaipur Stock Exchange offices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((dom) => {
            const Icon = dom.icon;
            return (
              <div 
                key={dom.title}
                className="glass-card p-8 flex gap-6 items-start border-slate-800 hover:border-[#F5C542]/20"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                    {dom.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                    {dom.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strategic Callout */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 text-center transition-colors duration-400">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-5">
          <span className="text-[9px] font-bold text-[#F5C542] uppercase tracking-widest">Jaipur HQ Resource Center</span>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
            Securing Statutory SLA Deliverability
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            We ensure completely seamless routing compliance. By routing BPO desks, custom software operations, and payroll consultation under statutory regulations, we insulate international enterprises from local administrative burdens.
          </p>
        </div>
      </section>
    </div>
  );
}
