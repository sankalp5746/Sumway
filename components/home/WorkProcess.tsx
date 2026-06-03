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
    icon: HelpCircle,
    color: "#F5C542"
  },
  {
    num: "02",
    title: "Strategize",
    desc: "Architect custom SLAs, technical guidelines, and team pricing bounds.",
    icon: Settings,
    color: "#00C2B2"
  },
  {
    num: "03",
    title: "Source",
    desc: "Recruit from vetted skill pools and deploy target-matched assets.",
    icon: Search,
    color: "#F5C542"
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Integrate team hires, cloud channels, and statutory compliance.",
    icon: Cpu,
    color: "#00C2B2"
  },
  {
    num: "05",
    title: "Support",
    desc: "Ongoing SLA audit, 24/7 virtual helpdesk support, and expansions.",
    icon: LifeBuoy,
    color: "#F5C542"
  }
];

export default function WorkProcess() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#00C2B2]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Operational Blueprint"
          title="Our 5-Step Workflow"
          desc="From initial boardroom mapping to active deployment and support operations, we ensure structured delivery at every milestone."
        />

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute top-10 left-[10%] right-[10%] h-px border-t-2 border-dashed border-[#F5C542]/15 hidden lg:block z-0" />

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center relative z-10 max-w-[200px] group"
                >
                  {/* Circle */}
                  <div
                    className="w-20 h-20 rounded-full bg-[#0c1220] light:bg-slate-100 border-2 flex items-center justify-center shadow-xl relative transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(245,197,66,0.25)]"
                    style={{ borderColor: `${step.color}30` }}
                  >
                    {/* Step number badge */}
                    <span
                      className="absolute -top-1.5 -right-1.5 text-[9px] font-extrabold text-[#0A0F1E] px-1.5 py-0.5 rounded-full"
                      style={{ background: step.color }}
                    >
                      {step.num}
                    </span>
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>

                  <h3
                    className="font-display font-bold text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] mt-5 uppercase transition-colors"
                    style={{ color: undefined }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
