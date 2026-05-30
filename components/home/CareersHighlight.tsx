"use client";

import React from "react";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, MapPin, Tag } from "lucide-react";
import { JOBS } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

export default function CareersHighlight() {
  // Tease the first two jobs
  const teaserJobs = JOBS.slice(0, 2);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00C2B2]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          badge="Careers & Culture"
          title="WE ARE GROWING. JOIN US!"
          desc="Tired of rigid hierarchies? At Sumway Global, we support high adaptability, continuous industrial skill building, and active work-life integration in Jaipur."
        />

        {/* Highlight Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Left Column: Context Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Workspace Image */}
            <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <FallbackImage
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800&auto=format&fit=crop"
                alt="Modern Jaipur corporate workspace"
                fill
                className="object-cover brightness-90"
                fallbackLabel="Corporate Workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
            </div>

            <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide uppercase">
              ARCHITECTING INDIAN TALENT
            </h3>
            
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We operate multiple specialized corporate verticals in Jaipur, India. Whether you are a voice expert, custom software builder, or marketing creative, we provide structured mentoring and premium workspace environments.
            </p>

            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C2B2]" />
                <span>Jaipur JLN Marg Prime Workspaces</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C2B2]" />
                <span>Comprehensive Health coverage plans</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C2B2]" />
                <span>Performance-based golden incentives</span>
              </li>
            </ul>

            <div className="mt-4 shrink-0">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5C542] text-[#0A0F1E] text-xs font-bold uppercase tracking-wider hover:bg-[#F5C542]/90 hover:shadow-lg active:scale-95 transition-all"
              >
                <span>View All Openings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Teaser Open Openings Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {teaserJobs.map((job, index) => {
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#00C2B2]/30"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#00C2B2]">
                      {job.dept}
                    </span>
                    <h4 className="font-display font-bold text-sm md:text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                      {job.title}
                    </h4>
                    
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F5C542]" />
                        <span>{job.loc}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#F5C542]" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 mt-2 sm:mt-0">
                    <Link
                      href={`/careers/apply/${job.id}`}
                      className="px-4 py-2.5 rounded-lg border border-slate-700 hover:border-[#00C2B2]/40 text-xs font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-[#00C2B2]/5 hover:text-[#00C2B2] transition-all"
                    >
                      Apply Now
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
