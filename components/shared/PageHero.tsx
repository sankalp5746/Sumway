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
  
  // Generate breadcrumb items from URL path
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
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {isLast ? (
            <span className="text-[#F5C542] font-semibold">{label}</span>
          ) : (
            <Link 
              href={href} 
              className="hover:text-[#F5C542] text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors"
            >
              {label}
            </Link>
          )}
        </li>
      );
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0F1E] dark:bg-[#0A0F1E] light:bg-slate-100 border-b border-[#F5C542]/10 pt-32 pb-16 md:pt-40 md:pb-24 transition-colors duration-400">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <FallbackImage
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
          alt="Corporate skyline"
          fill
          className="object-cover opacity-10"
          fallbackLabel="Corporate Skyline"
        />
      </div>
      {/* Mesh backdrop details */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(0,194,178,0.1),rgba(0,0,0,0))]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#F5C542]/5 blur-3xl" />
      
      {/* Floating geometric visuals */}
      <div className="absolute top-1/2 left-10 w-24 h-24 rounded-full border border-slate-700/20 dark:border-slate-700/20 light:border-slate-300 animate-float pointer-events-none opacity-50" />
      <div className="absolute top-1/4 right-20 w-16 h-16 rounded-full border border-[#00C2B2]/10 animate-float-slow pointer-events-none opacity-45" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex" aria-label="Breadcrumb">
            <ul className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-1 hover:text-[#F5C542] transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              {generateBreadcrumbs()}
            </ul>
          </nav>

          {/* Heading and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mt-2"
          >
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight leading-tight uppercase">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-3 leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
