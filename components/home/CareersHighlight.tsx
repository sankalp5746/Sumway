"use client";

import React from "react";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import { useAppStore } from "@/lib/store";
import SectionHeading from "../shared/SectionHeading";

export default function CareersHighlight() {
  const jobs = useAppStore((state) => state.jobs) || [];
  const teaserJobs = jobs.slice(0, 2);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#4AABCA]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Careers & Culture"
          title="We Are Growing. Join Us!"
          desc="Tired of rigid hierarchies? At Sumway Global, we support high adaptability, continuous industrial skill building, and active work-life integration in Jaipur."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-14">

          {/* Left: Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full h-52 md:h-60 rounded-2xl overflow-hidden border border-white/8 shadow-xl">
              <FallbackImage
                src="/images/careers.png"
                alt="Modern Jaipur corporate workspace"
                fill
                className="object-cover brightness-90"
                fallbackLabel="Corporate Workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide uppercase">
                Architecting Indian Talent
              </h3>
              <p className="text-body mt-3">
                We operate multiple specialized corporate verticals in Jaipur, India. Whether you are a voice expert, custom software builder, or marketing creative, we provide structured mentoring and premium workspace environments.
              </p>
            </div>

            <ul className="flex flex-col gap-2.5">
              {[
                "Jaipur JLN Marg Prime Workspaces",
                "Comprehensive Health Coverage Plans",
                "Performance-based Golden Incentives",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-slate-300 light:text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4AABCA] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/careers"
              className="btn-primary inline-flex w-fit"
            >
              <span>View All Openings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Job teasers */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {teaserJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 md:p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-[#4AABCA]/25"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#4AABCA]">
                    {job.dept}
                  </span>
                  <h4 className="font-display font-bold text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                    {job.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold mt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF555F]" />
                      <span>{job.loc}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#FF555F]" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/careers/apply/${job.id}`}
                  className="shrink-0 px-5 py-2.5 rounded-xl border border-white/10 light:border-slate-300 text-sm font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-[#4AABCA]/8 hover:text-[#4AABCA] hover:border-[#4AABCA]/30 transition-all"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
