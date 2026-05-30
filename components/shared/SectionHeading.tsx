"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: string;
  desc?: string;
  align?: "left" | "center" | "right";
}

export default function SectionHeading({
  badge,
  title,
  desc,
  align = "center"
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isRight = align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : isRight ? "ml-auto text-right" : "text-left"
      }`}
    >
      <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase bg-[#00C2B2]/10 px-3 py-1.5 rounded-full">
        {badge}
      </span>
      
      <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight mt-4 leading-tight">
        {title}
      </h2>
      
      {desc && (
        <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 leading-relaxed">
          {desc}
        </p>
      )}
    </motion.div>
  );
}
