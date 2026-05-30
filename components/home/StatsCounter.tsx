"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  trigger: boolean;
}

function StatItem({ target, suffix, label, trigger }: StatItemProps) {
  const count = useCounter(target, 2000, trigger);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <span className="font-display font-extrabold text-3xl md:text-5xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight">
        {count.toLocaleString()}
        <span className="text-[#F5C542]">{suffix}</span>
      </span>
      
      <span className="text-[10px] uppercase font-bold tracking-widest text-[#00C2B2] mt-2.5">
        {label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-y border-[#F5C542]/10 overflow-hidden transition-colors duration-400">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,194,178,0.06),transparent)]" />
      
      <motion.div
        onViewportEnter={() => setIsInView(true)}
        className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center lg:divide-x divide-slate-800/80"
      >
        <StatItem 
          target={150} 
          suffix="+" 
          label="Clients Served" 
          trigger={isInView} 
        />
        <StatItem 
          target={2500} 
          suffix="+" 
          label="Professionals Placed" 
          trigger={isInView} 
        />
        <StatItem 
          target={8} 
          suffix="" 
          label="Sectors Covered" 
          trigger={isInView} 
        />
        <StatItem 
          target={98} 
          suffix="%" 
          label="SLA Satisfaction" 
          trigger={isInView} 
        />
      </motion.div>
    </section>
  );
}
