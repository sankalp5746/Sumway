"use client";

import React from "react";
import { Leaf, GraduationCap, Users, Heart } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const projects = [
  {
    title: "Youth Skill Sponsorships",
    desc: "Sponsoring comprehensive training modules and pre-internship industrial programs for underprivileged graduates in Jaipur.",
    icon: GraduationCap
  },
  {
    title: "Green Digital Offices",
    desc: "Optimizing server workloads, using energy-efficient workspace appliances, and deploying local paperless BPO tools inside our JLN Marg HQ.",
    icon: Leaf
  },
  {
    title: "Jaipur Community Outreach",
    desc: "Direct support programs collaborating with local Rajasthan NGOs to support education, healthcare and clean drinking water frameworks.",
    icon: Heart
  }
];

export default function CSR() {
  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="CSR Initiatives" 
        subtitle="Social responsibility, clean computing and skill-development sponsorships in Rajasthan."
      />

      {/* Overview */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
              Corporate Governance
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              SUSTAINABILITY IN THE DIGITAL ERA
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              At <strong className="text-slate-200">Sumway Global</strong>, corporate social responsibility is not an afterthought—it is woven directly into our business model. Since our incorporation on <strong className="text-slate-200">30 September 2024</strong>, we have focused on giving back to the community that houses our Jaipur HQ.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We focus our efforts on bridging educational gaps, optimizing energy footprints, and sponsoring talent training modules to make graduates globally employable.
            </p>
          </div>
          
          <div className="lg:col-span-6 flex flex-col gap-4">
            {projects.map((proj) => {
              const Icon = proj.icon;
              return (
                <div 
                  key={proj.title}
                  className="glass-card p-5 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold text-slate-200 uppercase">{proj.title}</h3>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{proj.desc}</p>
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
