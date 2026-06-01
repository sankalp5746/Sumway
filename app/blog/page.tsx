"use client";

import React, { useState } from "react";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Search, FileText, Download, ArrowRight, ShieldCheck } from "lucide-react";
import { BLOGS } from "@/lib/constants";
import PageHero from "@/components/shared/PageHero";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Recruitment", "Industry News", "Technology"];

  const filteredBlogs = BLOGS.filter((blog) => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Insights & Boardroom Blogs" 
        subtitle="Exploring the latest statutory compliance insights, hiring algorithms, and tech trends."
      />

      {/* Main Blog Section */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Blogs Archive */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Live Filter Controls */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isSelected 
                        ? "bg-[#F5C542] text-[#0A0F1E] shadow-md" 
                        : "bg-[#111827] text-slate-400 border border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((blog) => (
                  <motion.article
                    key={blog.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card flex flex-col justify-between overflow-hidden group h-full hover:border-[#F5C542]/20"
                  >
                    <div className="flex flex-col">
                      <div className="relative w-full h-48 overflow-hidden">
                        <FallbackImage
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                          fallbackLabel={blog.title}
                        />
                        <span className="absolute top-4 left-4 text-[8px] font-bold uppercase tracking-widest text-[#0A0F1E] bg-[#F5C542] px-2.5 py-1 rounded-md">
                          {blog.category}
                        </span>
                      </div>

                      <div className="p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#00C2B2]" />
                            <span>{blog.date}</span>
                          </div>
                          <span>&bull;</span>
                          <span>{blog.readTime}</span>
                        </div>

                        <h3 className="font-display font-bold text-sm text-slate-100 group-hover:text-[#F5C542] transition-colors leading-snug uppercase">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium line-clamp-3">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-500">By {blog.author}</span>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-300 group-hover:text-[#F5C542] transition-colors"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {filteredBlogs.length === 0 && (
                <div className="col-span-2 text-center py-12 glass-card">
                  <ShieldCheck className="w-8 h-8 text-slate-650 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-medium">No insights match your query. Try selecting another category filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Sidebar Search */}
            <div className="glass-card p-6 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-[#00C2B2] uppercase tracking-wider">Search Insights</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-[#0A0F1E] text-slate-100 text-xs focus:border-[#F5C542] focus:outline-none transition-colors"
                />
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
              </div>
            </div>

            {/* Sidebar Resources Section (Case studies / Whitepapers downloads) */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-[#00C2B2] uppercase tracking-wider">Free Whitepapers</h4>
              
              <div className="flex flex-col gap-3 text-xs leading-normal">
                {/* PDF 1 */}
                <div className="p-4 rounded-lg bg-white/5 border border-slate-800 flex items-center justify-between gap-3 group hover:border-[#F5C542]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542] shrink-0">
                      <FileText className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200 uppercase text-[9px] tracking-wide">Corporate RPO Curation</span>
                      <span className="text-[8px] text-slate-500 mt-0.5">PDF (2.4 MB)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Downloading PDF Whitepaper...")}
                    className="p-1.5 rounded bg-white/5 text-slate-400 group-hover:text-[#F5C542] hover:bg-[#F5C542]/10 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* PDF 2 */}
                <div className="p-4 rounded-lg bg-white/5 border border-slate-800 flex items-center justify-between gap-3 group hover:border-[#F5C542]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] shrink-0">
                      <FileText className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200 uppercase text-[9px] tracking-wide">BPO Compliance SLA</span>
                      <span className="text-[8px] text-slate-500 mt-0.5">PDF (1.8 MB)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Downloading PDF Whitepaper...")}
                    className="p-1.5 rounded bg-white/5 text-slate-400 group-hover:text-[#F5C542] hover:bg-[#F5C542]/10 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </section>
    </div>
  );
}
