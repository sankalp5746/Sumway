"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { Calendar, Users, Target, Shield, ArrowRight } from "lucide-react";
import { COMPANY_DETAILS, STATS } from "@/lib/constants";
import Link from "next/link";

const iconMap: { [key: string]: any } = {
  years: Calendar,
  clients: Users,
  industries: Target,
  placed: Shield
};

export default function CompanyIntro() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4AABCA]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Image + Stats */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-72 md:h-88 rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
          >
            <FallbackImage
              src="/images/team.png"
              alt="Sumway Global corporate team collaboration"
              fill
              className="object-cover brightness-90"
              fallbackLabel="Team Collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold text-[#4AABCA] uppercase tracking-widest bg-[#0A1128]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#4AABCA]/20">
                Our Jaipur HQ Team
              </span>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, index) => {
              const Icon = iconMap[stat.id] || Target;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card p-5 flex flex-col gap-3 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#4AABCA]/8 to-transparent rounded-bl-full" />
                  <div className="icon-box-teal w-10 h-10 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="stat-number text-3xl text-slate-100 light:text-[#111827]">
                      {stat.value}
                      <span className="text-[#FF555F]">{stat.suffix}</span>
                    </div>
                    <div className="text-xs uppercase font-bold tracking-widest text-slate-400 light:text-slate-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="badge-gold">Since 2024</span>
            <span className="text-sm font-medium text-slate-400 light:text-slate-600">
              Founded 30 Sept 2024
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="section-divider mb-4" />
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-100 light:text-[#111827] tracking-tight leading-[1.1] uppercase">
              Global Management
              <br />
              <span className="text-[#4AABCA]">From Rajasthan</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body"
          >
            Based in the prestigious Stock Exchange Building in Jaipur,{" "}
            <strong className="text-slate-200 light:text-slate-800 font-semibold">
              Sumway Global Management Private Limited
            </strong>{" "}
            is engineered to bridge raw capability with corporate execution. We specialize in
            cross-continental staffing placements, seamless customer experience outsourcing (BPO),
            enterprise software architectures, and highly targeted brand transformations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-body-sm italic"
          >
            At Sumway Global, we don&apos;t just deliver resources — we architect ecosystems. We adhere
            to top-tier international standards while providing accessible support structures across
            global timezones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/3 light:bg-slate-100 border border-white/6 light:border-slate-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FF555F]/10 flex items-center justify-center text-[#FF555F] shrink-0 mt-0.5">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Office HQ</span>
              <p className="text-sm font-medium text-slate-300 light:text-slate-700 mt-0.5 leading-relaxed">
                {COMPANY_DETAILS.address}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/company/about-us" className="btn-primary inline-flex">
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
