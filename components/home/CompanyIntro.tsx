"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { Calendar, Users, Target, Shield } from "lucide-react";
import { COMPANY_DETAILS, STATS } from "@/lib/constants";

const iconMap: { [key: string]: any } = {
  years: Calendar,
  clients: Users,
  industries: Target,
  placed: Shield
};

export default function CompanyIntro() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E]">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00C2B2]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Image + Stat Highlights Cards */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Corporate Team Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
          >
            <FallbackImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
              alt="Sumway Global corporate team collaboration"
              fill
              className="object-cover brightness-90"
              fallbackLabel="Team Collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-[9px] font-bold text-[#00C2B2] uppercase tracking-widest bg-[#0A0F1E]/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-[#00C2B2]/20">
              Our Jaipur HQ Team
            </div>
          </motion.div>

          {/* Stat grid below image */}
          <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, index) => {
            const Icon = iconMap[stat.id] || Target;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col gap-3 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#00C2B2]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                <div className="w-9 h-9 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col mt-2">
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A]">
                    {stat.value}
                    <span className="text-[#F5C542]">{stat.suffix}</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 leading-normal">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>

        {/* Right Side: Text & Corporate badge */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5C542] bg-[#F5C542]/10 px-3 py-1.5 rounded-md border border-[#F5C542]/10">
              SINCE 2024
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Founded 30 Sept 2024
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-2xl md:text-4xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight leading-tight uppercase"
          >
            GLOBAL MANAGEMENT EXCELLENCE, <br />
            <span className="text-[#00C2B2]">INJECTED FROM RAJASTHAN</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed"
          >
            Based in the prestigious Stock Exchange Building in Jaipur, <strong className="text-slate-200">Sumway Global Management Private Limited</strong> is engineered to bridge raw capability with corporate execution. We specialize in cross-continental staffing placements, seamless customer experience outsourcing (BPO), enterprise software architectures, and highly targeted brand transformations.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-600 italic leading-relaxed"
          >
            At Sumway Global, we don&apos;t just deliver resources; we architect ecosystems. We adhere to top-tier international standards while providing accessible support structures across global timezones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4 mt-2"
          >
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Office HQ Address</span>
              <span className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                {COMPANY_DETAILS.address}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
