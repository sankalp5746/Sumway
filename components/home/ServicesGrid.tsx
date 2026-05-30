"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, Briefcase, GraduationCap, Laptop, 
  Headphones, ArrowRight, CheckCircle2 
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

const iconMap: { [key: string]: any } = {
  Users,
  Briefcase,
  GraduationCap,
  Laptop,
  Headphones
};

export default function ServicesGrid() {
  return (
    <section 
      id="services-section" 
      className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#F5C542]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <SectionHeading 
          badge="Our Core Capabilities"
          title="PREMIUM GLOBAL SERVICES"
          desc="Sumway Global is an integrated enterprise agency. We blend staffing placements, custom software architectures, and international virtual support teams to steer corporate scaling."
        />

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {SERVICES.map((serv, index) => {
            const Icon = iconMap[serv.icon] || Users;

            return (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative"
              >
                {/* Asymmetric hover background highlights */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2B2]/5 via-transparent to-[#F5C542]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col gap-4 relative z-10">
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] group-hover:scale-110 transition-all border border-[#00C2B2]/20">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-display font-bold text-lg md:text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] group-hover:text-[#F5C542] transition-colors uppercase">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 leading-relaxed font-medium">
                      {serv.desc}
                    </p>
                  </div>

                  {/* Bullet Benefits (Revealed on hover / visible) */}
                  <ul className="flex flex-col gap-2 mt-4 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                    {serv.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C2B2] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore Service Trigger */}
                <div className="mt-8 flex justify-end relative z-10">
                  <Link 
                    href={serv.href}
                    className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-[#F5C542] hover:underline"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
