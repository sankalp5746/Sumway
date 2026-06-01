"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, Tag, ArrowRight, CheckCircle, ShieldAlert, Award, Star } from "lucide-react";
import { JOBS } from "@/lib/constants";
import PageHero from "@/components/shared/PageHero";

const benefits = [
  { title: "Prime OfficeHQ JLN Marg", desc: "Work in the state-of-the-art Jaipur Stock Exchange Building.", icon: MapPin },
  { title: "Medical Health Plans", desc: "Comprehensive health insurance coverage for you and your family.", icon: CheckCircle },
  { title: "Continuous Mentoring", desc: "Get direct operational training and structural advisory from the board.", icon: Award },
  { title: "Performance Incentives", desc: "Generous golden incentives matching performance achievements.", icon: Star },
  { title: "Zone Shift Allowances", desc: "Rotational shift bonuses for BPO voice and support desks.", icon: Clock },
  { title: "Work-Life Integration", desc: "High scheduling flexibility to balance family and professional goals.", icon: Tag }
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");

  const departments = ["All", "BPO Operations", "IT & Software", "Digital Marketing"];

  const filteredJobs = activeDept === "All" 
    ? JOBS 
    : JOBS.filter(job => job.dept === activeDept);

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Careers & Culture" 
        subtitle="We are growing! Partner with our Jaipur teams and unlock your professional limits."
      />

      {/* Benefits / Work Culture Section */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
            Workplace Perks
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            WHY ASSOCIATE WITH SUMWAY?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div 
                key={b.title}
                className="glass-card p-6 flex flex-col gap-4 hover:border-[#00C2B2]/20"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-bold text-base text-slate-100 uppercase">
                    {b.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Current Openings with Live Filter */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
              Current Openings
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              EXPLORE ACTIVE VACANCIES
            </h2>
          </div>

          {/* Department Filter Controls */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {departments.map((dept) => {
              const isSelected = activeDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-[#F5C542] text-[#0A0F1E] shadow-md" 
                        : "bg-[#111827] dark:bg-[#111827] light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-slate-200"
                    }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Jobs Listing grid */}
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#00C2B2]/20"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#00C2B2]">
                      {job.dept}
                    </span>
                    <h3 className="font-display font-extrabold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xl font-medium mt-1 leading-relaxed">
                      {job.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-semibold mt-2.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#F5C542]" />
                        <span>{job.loc}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#F5C542]" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <Link
                      href={`/careers/apply/${job.id}`}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#F5C542] text-[#0A0F1E] text-xs font-bold uppercase tracking-wider hover:bg-[#F5C542]/90 active:scale-95 transition-all shadow-md"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 glass-card p-6">
                <ShieldAlert className="w-8 h-8 text-slate-650 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No open positions found in this department. Please select another filter or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
