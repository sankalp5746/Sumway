"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

const SLIDES = [
  {
    videoDesktopUrl: "/videos/slide1_desktop.mp4",
    videoMobileUrl: "/videos/slide1_mobile.mp4",
    tag: "Digital Transformation & AI",
    title: "Empowering Enterprises with Digital Workforce",
    ctaText: "Get Started Now",
    enquiryType: "Enterprise Recruitment"
  },
  {
    videoDesktopUrl: "/videos/slide2_desktop.mp4",
    videoMobileUrl: "/videos/slide2_mobile.mp4",
    tag: "Premium Global Staffing",
    title: "Connect with Elite Professional Talent",
    ctaText: "Hire Elite Talent",
    enquiryType: "Staffing Enquiry"
  },
  {
    videoDesktopUrl: "/videos/slide3_desktop.mp4",
    videoMobileUrl: "/videos/slide3_mobile.mp4",
    tag: "Secure BPO Curation",
    title: "24/7/365 Virtual Operations Centers",
    ctaText: "Explore BPO Desks",
    enquiryType: "BPO Enquiry"
  }
];

export default function HeroBanner() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Slide autoplay interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 7000); // 7 seconds per slide
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const handleScrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#0A1128] light:bg-white">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/45 light:bg-white/65 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] light:from-white via-transparent to-black/20 light:to-white/10 z-10 pointer-events-none" />

        {/* Ambient Blurred Background Video (Visible only on mobile/portrait viewports for premium visual flow) */}
        <video
          key={`bg-${currentSlide}`}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 md:hidden pointer-events-none"
        >
          <source src={SLIDES[currentSlide].videoMobileUrl} type="video/mp4" />
        </video>

        {/* Main Video: object-cover background on desktop/tablet, hidden on mobile */}
        <video
          key={`main-desktop-${currentSlide}`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-85 light:opacity-75 hidden md:block"
        >
          <source src={SLIDES[currentSlide].videoDesktopUrl} type="video/mp4" />
        </video>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between min-h-screen pt-24 pb-28 md:justify-center md:pt-24 md:pb-20">
        {/* Visually hidden H1 heading for screen readers and SEO */}
        <h1 className="sr-only">
          {SLIDES[currentSlide].title}
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center flex flex-col items-center max-w-4xl"
          >
            {/* Tagline Badge */}
            <div className="mb-2 md:mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4AABCA] bg-[#4AABCA]/10 px-4 py-2 rounded-full border border-[#4AABCA]/20">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{SLIDES[currentSlide].tag}</span>
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Mobile Video Player: visible only on mobile/portrait viewports to prevent text overlap */}
        <div className="w-full max-w-md my-4 md:hidden z-10">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 light:border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-black">
            <video
              key={`main-mobile-${currentSlide}`}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={SLIDES[currentSlide].videoMobileUrl} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex items-center gap-4 sm:gap-10 mt-4 md:mt-12 border-t border-white/10 light:border-slate-200 pt-6 sm:pt-8 w-full max-w-lg justify-center z-10">
          {[
            { value: "150+", label: "Clients" },
            { value: "2500+", label: "Placed" },
            { value: "99.8%", label: "SLA Rate" },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="w-px h-6 sm:h-8 bg-white/10 light:bg-slate-200" />}
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold text-lg sm:text-2xl text-[#FF555F]">
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 light:text-slate-600 font-semibold uppercase tracking-wider mt-0.5 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Manual Arrow Controls (Desktop only) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 light:border-slate-250 bg-black/30 light:bg-slate-100 hover:bg-[#FF555F] hover:border-[#FF555F] hover:text-white text-white/80 light:text-slate-700 flex items-center justify-center transition-all z-20 cursor-pointer hidden md:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 light:border-slate-250 bg-black/30 light:bg-slate-100 hover:bg-[#FF555F] hover:border-[#FF555F] hover:text-white text-white/80 light:text-slate-700 flex items-center justify-center transition-all z-20 cursor-pointer hidden md:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Controls Panel (Indicators + Play/Pause) */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6 z-20">
        {/* Indicators */}
        <div className="flex items-center gap-2.5">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${index === currentSlide ? "w-8 bg-[#FF555F]" : "w-2.5 bg-white/30 light:bg-slate-300 hover:bg-white/50 light:hover:bg-slate-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full border border-white/15 light:border-slate-250 bg-black/40 light:bg-slate-100 text-white light:text-slate-700 flex items-center justify-center hover:bg-[#FF555F] hover:border-[#FF555F] hover:text-white transition-all cursor-pointer"
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-slate-400 light:text-slate-500 hover:text-[#FF555F] transition-colors z-20"
        onClick={handleScrollToServices}
      >
        <span className="text-[9px] font-bold tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 text-[#FF555F] animate-bounce" />
      </div>
    </section>
  );
}
