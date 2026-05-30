"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(0,194,178,0.06),transparent)]" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F5C542]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          badge="Global Feedback"
          title="TRUSTED BY SCALING BRANDS"
          desc="Discover how our staffing pipelines, virtual assistant models, and technology transformations fuel corporate growth internationally."
        />

        {/* Testimonials Slider */}
        <div className="max-w-3xl mx-auto mt-12 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-12 relative flex flex-col gap-6"
            >
              {/* Quote Mark watermark */}
              <Quote className="absolute top-6 right-8 w-16 h-16 text-slate-800/40 pointer-events-none" />
              
              {/* Stars Rating */}
              <div className="flex items-center gap-1">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5C542] text-[#F5C542]" />
                ))}
              </div>

              {/* Quote Statement */}
              <p className="font-display font-medium text-sm md:text-lg text-slate-200 leading-relaxed italic">
                &ldquo;{active.quote}&rdquo;
              </p>

              {/* Client Profile Metadata */}
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F5C542] to-[#00C2B2] flex items-center justify-center font-display font-extrabold text-[#0A0F1E] text-sm uppercase">
                  {active.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-100 dark:text-slate-100 light:text-[#0F172A]">
                    {active.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    {active.role} &mdash; <span className="text-[#00C2B2] font-semibold">{active.company}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-slate-800 bg-[#111827] text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            
            {/* Sliding Dots Indicators */}
            <div className="flex items-center gap-1.5 px-3">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx 
                      ? "w-6 bg-[#F5C542]" 
                      : "bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-slate-800 bg-[#111827] text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer"
              aria-label="Next quote"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
