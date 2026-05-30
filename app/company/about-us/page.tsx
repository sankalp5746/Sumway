"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Globe, Award, Sparkles } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const timelineEvents = [
  {
    year: "September 2024",
    title: "Corporate Inception",
    desc: "Sumway Global Management Private Limited is officially incorporated on 30 September 2024 with a vision to build globally competitive recruitment frameworks from Jaipur, Rajasthan.",
    icon: Calendar
  },
  {
    year: "Mid 2025",
    title: "BPO Operations Launch",
    desc: "Deploying our first dedicated voice, chat and virtual desk support operations, delivering 24/7 helpdesk systems for international e-commerce and retail firms.",
    icon: Globe
  },
  {
    year: "Late 2025",
    title: "IT & Software Integrations",
    desc: "Assembling a specialized custom software and React/Next.js engineering department, helping traditional corporate clients modernize their server infrastructures.",
    icon: Sparkles
  },
  {
    year: "2026 & Beyond",
    title: "Global Consulting Footprint",
    desc: "Expanding consulting offices, catering to over 150+ international clients, and achieving statutory compliance parameters with rigorous SLA retainments.",
    icon: Award
  }
];

export default function AboutUs() {
  return (
    <div className="bg-[#0A0F1E]">
      <PageHero 
        title="About Our Firm" 
        subtitle="Bridging raw capability with premium corporate execution since 2024."
      />

      {/* History Story Block */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
              Our Journey
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase leading-snug">
              CRAFTED IN THE PINK CITY, <br />
              <span className="text-[#F5C542]">Globally Structured</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              Established on <strong className="text-slate-200">30 September 2024</strong> in the Jaipur Stock Exchange Building on JLN Marg, Malviya Nagar, <strong className="text-slate-200">Sumway Global Management Private Limited</strong> was born to disrupt the conventional recruitment and BPO landscape.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We recognized that modern enterprises face extreme scaling friction—ranging from soaring onboarding budgets to timezone helpdesk support shortages and legacy IT constraints. By compiling premium recruitment pipelines, BPO channels, and digital developers in a single corporate agency, we deliver robust end-to-end operational stability.
            </p>
          </div>
          
          {/* Static Stats card panel with Image */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <FallbackImage
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                alt="Corporate consultation team"
                fill
                className="object-cover brightness-95"
                fallbackLabel="Corporate Team"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
            </div>

            <div className="glass-card p-6 bg-gradient-to-br from-[#111827] to-[#0A0F1E] flex flex-col gap-4 border-[#F5C542]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C2B2]/5 rounded-bl-full pointer-events-none" />
              <h3 className="font-display font-extrabold text-sm text-[#F5C542] uppercase tracking-wide">
                Corporate Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-semibold text-slate-300">
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Incorporation Date</span>
                <span>30 September 2024</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Corporate HQ Location</span>
                <span>Malviya Nagar, Jaipur, RJ</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Primary Focus Area</span>
                <span>Staffing, BPO & Software IT</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">SLA Performance</span>
                <span>99.8% Core Retention</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Vertical Milestone Timeline */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
              Milestone Timeline
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              Corporate Chronology
            </h2>
          </div>

          <div className="relative border-l border-slate-800/80 ml-4 md:ml-32 pl-6 md:pl-10 flex flex-col gap-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div 
                  key={event.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex flex-col gap-2"
                >
                  {/* Timeline Badge/Dot */}
                  <div className="absolute -left-12.5 md:-left-16.5 w-12 h-12 rounded-full bg-[#111827] border-2 border-[#F5C542]/30 flex items-center justify-center text-[#F5C542] shadow-xl">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Left Floating Year Label (desktop only) */}
                  <div className="absolute left-[-160px] top-3 text-xs font-bold uppercase tracking-wider text-[#00C2B2] hidden md:block w-32 text-right">
                    {event.year}
                  </div>

                  {/* Text Details */}
                  <div className="glass-card p-6 border-slate-800 hover:border-[#00C2B2]/20">
                    <span className="text-[10px] font-bold text-[#00C2B2] md:hidden">
                      {event.year}
                    </span>
                    <h3 className="font-display font-bold text-sm md:text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                      {event.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 leading-relaxed font-medium">
                      {event.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
