"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, Settings, Cpu, LifeBuoy } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Consult",
    desc: "Understand corporate bottlenecks and define strategic deliverables.",
    icon: HelpCircle
  },
  {
    num: "02",
    title: "Strategize",
    desc: "Architect custom SLAs, technical guidelines, and team pricing bounds.",
    icon: Settings
  },
  {
    num: "03",
    title: "Source",
    desc: "Recruit from vetted skill pools and deploy target-matched assets.",
    icon: Search
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Integrate team hires, cloud channels, and statutory compliance.",
    icon: Cpu
  },
  {
    num: "05",
    title: "Support",
    desc: "Ongoing SLA audit, 24/7 virtual helpdesk support, and expansions.",
    icon: LifeBuoy
  }
];

export default function WorkProcess() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#00C2B2]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          badge="Operational Blueprint"
          title="OUR 5-STEP WORKFLOW"
          desc="From initial boardroom mapping to active deployment and support operations, we ensure structured delivery at every milestone."
        />

        {/* Steps Flow Container */}
        <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-4 mt-16">
          
          {/* Connecting dotted line on desktop */}
          <div className="absolute top-8 left-16 right-16 h-0.5 border-t-2 border-dashed border-[#F5C542]/20 hidden lg:block z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center relative z-10 max-w-[200px]"
              >
                {/* Step Circle Badge */}
                <div className="w-16 h-16 rounded-full bg-[#111827] border-2 border-[#F5C542]/30 flex items-center justify-center text-[#F5C542] shadow-[0_4px_15px_rgba(0,0,0,0.4)] relative group hover:border-[#F5C542] hover:shadow-[0_0_20px_rgba(245,197,66,0.3)] transition-all duration-300">
                  {/* Step Number Tag */}
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-[#00C2B2] text-white px-1.5 py-0.5 rounded-full">
                    {step.num}
                  </span>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] mt-5 uppercase">
                  {step.title}
                </h3>
                
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
