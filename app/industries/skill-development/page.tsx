"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Award, Users, BookOpen, ShieldAlert, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FallbackImage from "@/components/shared/FallbackImage";
import { useAppStore } from "@/lib/store";

export default function SkillDevelopmentIndustry() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero
        title="Skill Development"
        subtitle="Bridging raw academic capability with actual corporate guidelines in Jaipur, RJ."
      />

      {/* Challenges (Red Accent) */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full uppercase">
            Sector Challenges
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-4">
            Graduate employability gap & training cost
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Theoretical Bias</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Standard university curriculums focus strictly on theoretical structures, leaving graduates unprepared for live enterprise operations.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Massive Training Overhead</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">Firms spend massive capital and onboarding time training raw candidate hires on simple tools and systems.</p>
          </div>

          <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase">Soft Skill Deficiencies</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-medium">A lack of professional voice coordination, client empathy, and written communication isolates graduates from international roles.</p>
          </div>
        </div>
      </section>

      {/* Solutions (Green Accent) */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">Our Approach</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              DELIVERING JOB-READY PROFESSIONALS
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We operate dedicated skill-development and pre-internship modules. Trainees work directly on live projects under our Jaipur board director guidance, learning real tools and professional voice coordinate protocols.
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Hands-on BPO voice coordination and helpdesk software training</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>React, Next.js and TypeScript coding practice modules</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00C2B2] shrink-0" />
                <span>Interactive boardroom communication and presentation skills</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/6 light:border-slate-300 shadow-xl">
              <FallbackImage
                src="/images/skill.png"
                alt="Skill Development Hub"
                fill
                className="object-cover"
                fallbackLabel="Skill Development Programs"
              />
            </div>

            <div className="glass-card p-8 flex flex-col gap-6">
              <h3 className="font-display font-bold text-sm text-[#F5C542] uppercase tracking-wide">
                Placement Case Study
              </h3>
              <div className="flex flex-col gap-3 text-xs leading-relaxed">
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <span className="text-[9px] font-bold text-red-400 uppercase">Client Challenge</span>
                  <p className="text-slate-400 mt-1 italic font-medium">&ldquo;High onboarding time and costs for junior customer service hires.&rdquo;</p>
                </div>
                <div className="p-3 bg-[#00C2B2]/5 border border-[#00C2B2]/10 rounded-lg">
                  <span className="text-[9px] font-bold text-[#00C2B2] uppercase">Sumway Strategy</span>
                  <p className="text-slate-400 mt-1 font-medium">Supplied 12 pre-screened graduates trained on voice channels and CRM software.</p>
                </div>
                <div className="p-3 bg-[#F5C542]/5 border border-[#F5C542]/10 rounded-lg">
                  <span className="text-[9px] font-bold text-[#F5C542] uppercase">Delivered Result</span>
                  <p className="text-slate-300 font-bold">Graduates achieved full project efficiency in 5 days; onboarding budgets reduced by 70%.</p>
                </div>
              </div>

              <button
                onClick={() => openEnquiry("Skill Development Sponsorships")}
                className="w-full flex items-center justify-center gap-2 mt-2 py-3 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 active:scale-95 transition-all cursor-pointer"
              >
                <span>Sponsor Training Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
