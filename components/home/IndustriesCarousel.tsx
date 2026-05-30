"use client";

import React from "react";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

export default function IndustriesCarousel() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      {/* Decorative details */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0A0F1E] to-transparent" />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#00C2B2]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          badge="Enterprise Targets"
          title="INDUSTRIES WE SERVE"
          desc="Custom, high-performing vertical integrations tailored specifically for target sectors, ensuring deep alignment and immediate business scaling."
        />

        {/* Industries Grid/Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {INDUSTRIES.map((ind, index) => {
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden border border-[#F5C542]/10 bg-slate-900 shadow-2xl flex flex-col justify-end p-6 hover:-translate-y-2 hover:border-[#F5C542]/30 transition-all duration-500 cursor-pointer"
              >
                {/* Background image overlay */}
                <div className="absolute inset-0 z-0">
                  <FallbackImage
                    src={ind.image}
                    alt={ind.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.35] group-hover:brightness-[0.4]"
                    fallbackLabel={ind.title}
                  />
                  {/* Glass visual overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,194,178,0.1),transparent_70%)]" />
                </div>

                {/* Card Content (relative layer) */}
                <div className="relative z-10 flex flex-col gap-3">
                  {/* Dynamic stats badge (visible by default) */}
                  <span className="self-start text-[9px] font-bold uppercase tracking-widest text-[#00C2B2] bg-[#00C2B2]/10 px-2.5 py-1 rounded-md border border-[#00C2B2]/20">
                    {ind.stats}
                  </span>

                  <h3 className="font-display font-extrabold text-lg md:text-xl text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight leading-tight uppercase group-hover:text-[#F5C542] transition-colors">
                    {ind.title}
                  </h3>
                  
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {ind.desc}
                  </p>

                  <div className="flex justify-end mt-4 pt-3 border-t border-slate-800/80">
                    <Link 
                      href={ind.href}
                      className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-300 hover:text-[#F5C542] transition-colors"
                    >
                      <span>Read Strategy</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
