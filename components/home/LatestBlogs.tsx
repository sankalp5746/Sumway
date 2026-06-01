"use client";

import React from "react";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BLOGS } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

export default function LatestBlogs() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00C2B2]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Insights & Trends"
          title="Latest from the Sumway Board"
          desc="Browse through strategic perspectives, tech breakdowns, and recruitment advisories directly from our leadership board in Jaipur."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {BLOGS.map((blog, index) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card flex flex-col justify-between overflow-hidden group h-full hover:border-[#F5C542]/20 cursor-pointer"
            >
              <div className="flex flex-col">
                {/* Thumbnail */}
                <div className="relative w-full h-52 overflow-hidden">
                  <FallbackImage
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    fallbackLabel={blog.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-[#0A0F1E] bg-[#F5C542] px-3 py-1 rounded-lg shadow-lg">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00C2B2]" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#00C2B2]" />
                      <span>{blog.author.split(" ")[0]}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide uppercase group-hover:text-[#F5C542] transition-colors leading-snug">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-white/6 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">{blog.readTime}</span>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 group-hover:text-[#F5C542] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
