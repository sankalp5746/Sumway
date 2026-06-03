"use client";

import React from "react";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      const isLast = index === paths.length - 1;

      return (
        <li key={path} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          {isLast ? (
            <span className="text-[#F5C542] font-semibold">{label}</span>
          ) : (
            <Link
              href={href}
              className="hover:text-[#F5C542] text-slate-400 light:text-slate-500 transition-colors"
            >
              {label}
            </Link>
          )}
        </li>
      );
    });
  };

  return (
    <section
      className="relative overflow-hidden bg-[#080d1a] light:bg-slate-100 border-b border-white/5 light:border-slate-200"
      style={{ paddingTop: "120px", paddingBottom: "48px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <FallbackImage
          src="/images/skyline.png"
          alt="Corporate skyline"
          fill
          className="object-cover opacity-[0.06] light:opacity-[0.04]"
          fallbackLabel="Corporate Skyline"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a]/60 light:from-slate-100/60 via-transparent to-[#0A0F1E] light:to-slate-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,rgba(0,194,178,0.08),transparent)]" />

      {/* Decorative orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F5C542]/4 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#00C2B2]/4 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ul className="flex items-center flex-wrap gap-1 text-xs font-medium text-slate-400 light:text-slate-500 uppercase tracking-wider">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-[#F5C542] transition-colors"
              >
                <Home className="w-3 h-3" />
                <span>Home</span>
              </Link>
            </li>
            {generateBreadcrumbs()}
          </ul>
        </nav>

        {/* Title & subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Accent line */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-0.5 bg-[#F5C542] rounded-full" />
            <div className="w-3.5 h-0.5 bg-[#00C2B2] rounded-full" />
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-100 light:text-[#111827] tracking-tight leading-[1.08] uppercase">
            {title}
          </h1>

          {subtitle && (
            <p className="text-body mt-3 max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
