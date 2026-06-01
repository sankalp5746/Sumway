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
  Users, Briefcase, GraduationCap, Laptop, Headphones
};

export default function ServicesGrid() {
  return (
    <section
      id="services-section"
      className="relative py-24 md:py-32 overflow-hidden bg-transparent border-t border-white/5"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#F5C542]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Core Capabilities"
          title="Premium Global Services"
          desc="Sumway Global is an integrated enterprise agency. We blend staffing placements, custom software architectures, and international virtual support teams to steer corporate scaling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((serv, index) => {
            const Icon = iconMap[serv.icon] || Users;

            return (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="glass-card p-7 md:p-8 flex flex-col justify-between group overflow-hidden relative"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2B2]/4 via-transparent to-[#F5C542]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.25rem]" />

                <div className="flex flex-col gap-5 relative z-10">
                  {/* Icon */}
                  <div className="icon-box-teal">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-100 light:text-[#111827] group-hover:text-[#F5C542] transition-colors uppercase leading-tight">
                      {serv.title}
                    </h3>
                    <p className="text-body-sm mt-2.5">
                      {serv.desc}
                    </p>
                  </div>

                  {/* Benefits */}
                  <ul className="flex flex-col gap-2 mt-1">
                    {serv.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2.5 text-sm text-slate-300 light:text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2B2] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-5 border-t border-white/6 flex justify-between items-center relative z-10">
                  <Link
                    href={serv.href}
                    className="flex items-center gap-1.5 text-sm font-bold text-[#F5C542] hover:gap-2.5 transition-all"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4" />
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
