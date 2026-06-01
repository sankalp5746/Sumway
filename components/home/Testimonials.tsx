"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(0,194,178,0.06),transparent)]" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F5C542]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Global Feedback"
          title="Trusted by Scaling Brands"
          desc="Discover how our staffing pipelines, virtual assistant models, and technology transformations fuel corporate growth internationally."
        />

        <div className="max-w-3xl mx-auto mt-14 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-12 relative flex flex-col gap-6"
            >
              {/* Watermark quote */}
              <Quote className="absolute top-6 right-8 w-20 h-20 text-white/4 pointer-events-none" />

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F5C542] text-[#F5C542]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-display font-medium text-lg md:text-xl text-slate-200 light:text-slate-700 leading-relaxed italic">
                &ldquo;{active.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-2 pt-6 border-t border-white/8 light:border-slate-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F5C542] to-[#00C2B2] flex items-center justify-center font-display font-extrabold text-[#0A0F1E] text-sm uppercase shrink-0">
                  {active.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100 light:text-[#111827]">
                    {active.name}
                  </div>
                  <div className="text-xs text-slate-400 light:text-slate-500 mt-0.5 font-medium">
                    {active.role} &mdash;{" "}
                    <span className="text-[#00C2B2] font-semibold">{active.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-white/10 bg-white/4 text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-7 h-2.5 bg-[#F5C542]"
                      : "w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-white/10 bg-white/4 text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
