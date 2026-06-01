"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { LEADERSHIP } from "@/lib/constants";
import PageHero from "@/components/shared/PageHero";

export default function LeadershipTeam() {
  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Leadership Team" 
        subtitle="Meet the executive board steering global staffing and technology growth."
      />

      {/* Leadership Profile Cards Grid */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
            Board of Directors
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            Steering Global Growth
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 leading-relaxed font-medium">
            Our leadership compiles over 15+ years of strategic recruitment architectures, technical development management and corporate BPO infrastructure setups in India and globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader) => {
            return (
              <div 
                key={leader.name}
                className="glass-card overflow-hidden group hover:border-[#F5C542]/20 flex flex-col justify-between h-full"
              >
                {/* Photo and Header */}
                <div className="relative w-full h-80 bg-slate-800 overflow-hidden">
                  <FallbackImage 
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                    fallbackLabel={leader.name}
                  />
                  {/* Visual gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/10 to-transparent" />
                </div>

                {/* Content details */}
                <div className="p-6 flex flex-col gap-3 relative z-10 flex-grow">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#00C2B2]">
                    {leader.role}
                  </span>
                  
                  <h3 className="font-display font-extrabold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide">
                    {leader.name}
                  </h3>
                  
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium mt-1">
                    {leader.bio}
                  </p>
                </div>

                {/* Social channels footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-800/60 flex items-center gap-3">
                  <a 
                    href={leader.linkedin}
                    className="w-8 h-8 rounded-full border border-slate-700 bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 transition-all cursor-pointer"
                    aria-label={`${leader.name} LinkedIn Profile`}
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:sumwayglobal@gmail.com"
                    className="w-8 h-8 rounded-full border border-slate-700 bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 transition-all cursor-pointer"
                    aria-label={`Email ${leader.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
