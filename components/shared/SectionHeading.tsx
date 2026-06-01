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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : isRight ? "ml-auto text-right" : "text-left"
      }`}
    >
      {/* Badge */}
      <span className="badge-teal">
        {badge}
      </span>

      {/* Divider line */}
      <div className={`mt-4 mb-3 ${isCenter ? "flex justify-center" : isRight ? "flex justify-end" : ""}`}>
        <div className="section-divider" />
      </div>

      {/* Heading */}
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-100 light:text-[#111827] tracking-tight leading-[1.12]">
        {title}
      </h2>

      {/* Description */}
      {desc && (
        <p
          className="text-body mt-4"
          style={{ marginLeft: isCenter ? "auto" : undefined, marginRight: isCenter ? "auto" : undefined, maxWidth: "42rem" }}
        >
          {desc}
        </p>
      )}
    </motion.div>
  );
}
