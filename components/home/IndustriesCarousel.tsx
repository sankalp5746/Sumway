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
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0A0F1E] to-transparent" />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#00C2B2]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Enterprise Targets"
          title="Industries We Serve"
          desc="Custom, high-performing vertical integrations tailored specifically for target sectors, ensuring deep alignment and immediate business scaling."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {INDUSTRIES.map((ind, index) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/8 bg-slate-900 shadow-2xl flex flex-col justify-end p-6 hover:-translate-y-2 hover:border-[#F5C542]/25 transition-all duration-500 cursor-pointer"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <FallbackImage
                  src={ind.image}
                  alt={ind.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.3] group-hover:brightness-[0.38]"
                  fallbackLabel={ind.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,194,178,0.08),transparent_70%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-3">
                <span className="self-start text-xs font-bold uppercase tracking-widest text-[#00C2B2] bg-[#00C2B2]/10 px-3 py-1 rounded-lg border border-[#00C2B2]/20">
                  {ind.stats}
                </span>

                <h3 className="font-display font-extrabold text-xl text-slate-100 tracking-tight leading-tight uppercase group-hover:text-[#F5C542] transition-colors">
                  {ind.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {ind.desc}
                </p>

                <div className="flex justify-end mt-3 pt-3 border-t border-white/8">
                  <Link
                    href={ind.href}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-[#F5C542] transition-colors"
                  >
                    <span>Read Strategy</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
