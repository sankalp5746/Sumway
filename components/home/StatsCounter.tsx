"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  trigger: boolean;
  desc?: string;
}

function StatItem({ target, suffix, label, trigger, desc }: StatItemProps) {
  const count = useCounter(target, 2000, trigger);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6">
      <div className="stat-number text-4xl md:text-6xl text-slate-100 light:text-[#111827]">
        {count.toLocaleString()}
        <span className="text-[#F5C542]">{suffix}</span>
      </div>
      <div className="text-sm font-bold uppercase tracking-widest text-[#00C2B2] mt-3">
        {label}
      </div>
      {desc && (
        <p className="text-xs text-slate-500 light:text-slate-500 mt-1.5 max-w-[140px] leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

export default function StatsCounter() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section className="relative w-full py-16 md:py-20 bg-[#0c1220] dark:bg-[#0c1220] light:bg-slate-200 border-y border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(0,194,178,0.07),transparent)]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C542]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C2B2]/15 to-transparent" />

      <motion.div
        onViewportEnter={() => setIsInView(true)}
        className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-0 items-center"
      >
        {[
          { target: 150, suffix: "+", label: "Clients Served", desc: "Across multiple industries" },
          { target: 2500, suffix: "+", label: "Professionals Placed", desc: "Vetted & deployed" },
          { target: 8, suffix: "", label: "Sectors Covered", desc: "BPO, IT, Marketing & more" },
          { target: 98, suffix: "%", label: "SLA Satisfaction", desc: "Consistent performance" },
        ].map((stat, i) => (
          <React.Fragment key={stat.label}>
            <StatItem
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              trigger={isInView}
              desc={stat.desc}
            />
            {i < 3 && (
              <div className="hidden lg:block absolute h-16 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent"
                style={{ left: `${(i + 1) * 25}%` }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
