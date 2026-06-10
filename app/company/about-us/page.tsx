"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { motion } from "framer-motion";
import {
  Calendar, Briefcase, Globe, Award, Sparkles,
  Target, Eye, ShieldCheck, Heart, Star, Leaf, GraduationCap
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const coreValues = [
  {
    title: "Operational Integrity",
    desc: "Complete statutory compliance, secure cloud architectures, strict non-disclosure compliance, and transparent delivery SLAs.",
    icon: ShieldCheck
  },
  {
    title: "Client Empathy",
    desc: "Our tagline, 'Your Happiness Our Resolution', drives our round-the-clock commitment to resolving enterprise pain points.",
    icon: Heart
  },
  {
    title: "Continuous Innovation",
    desc: "Constantly upgrading BPO virtual desks, using frameworks like React and Next.js, and integrating automation systems.",
    icon: Sparkles
  },
  {
    title: "Indian Talent Curation",
    desc: "Empowering university graduates and career shifters in Jaipur, Rajasthan, and pipelining them directly to global operations.",
    icon: Award
  },
  {
    title: "Absolute Transparency",
    desc: "Honest boardroom reporting, clear transparent pricing systems, and reliable candidate profiles.",
    icon: Star
  }
];

const csrProjects = [
  {
    title: "Youth Skill Sponsorships",
    desc: "Sponsoring comprehensive training modules and pre-internship industrial programs for underprivileged graduates in Jaipur.",
    icon: GraduationCap
  },
  {
    title: "Green Digital Offices",
    desc: "Optimizing server workloads, using energy-efficient workspace appliances, and deploying local paperless BPO tools inside our JLN Marg HQ.",
    icon: Leaf
  },
  {
    title: "Jaipur Community Outreach",
    desc: "Direct support programs collaborating with local Rajasthan NGOs to support education, healthcare and clean drinking water frameworks.",
    icon: Heart
  }
];

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
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="About Our Firm" 
        subtitle="Bridging raw capability with premium corporate execution since 2024."
      />

      {/* History Story Block */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
              Our Journey
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase leading-snug">
              CRAFTED IN THE PINK CITY, <br />
              <span className="text-[#FF555F]">Globally Structured</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              Established on <strong className="text-slate-200 light:text-slate-800">30 September 2024</strong> in the Jaipur Stock Exchange Building on JLN Marg, Malviya Nagar, <strong className="text-slate-200 light:text-slate-800">Sumway Global Management Private Limited</strong> was born to disrupt the conventional recruitment and BPO landscape.
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] dark:from-[#0A1128] light:from-slate-50 via-transparent to-transparent" />
            </div>

            <div className="glass-card p-6 bg-gradient-to-br from-[#111827] dark:from-[#111827] light:from-white to-[#0A1128] dark:to-[#0A1128] light:to-slate-100 flex flex-col gap-4 border-[#FF555F]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4AABCA]/5 rounded-bl-full pointer-events-none" />
              <h3 className="font-display font-extrabold text-sm text-[#FF555F] uppercase tracking-wide">
                Corporate Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Incorporation Date</span>
                <span>30 September 2024</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Corporate HQ Location</span>
                <span>Malviya Nagar, Jaipur, RJ</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Primary Focus Area</span>
                <span>Staffing, BPO & Software IT</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold">SLA Performance</span>
                <span>99.8% Core Retention</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Vertical Milestone Timeline */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
              Milestone Timeline
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              Corporate Chronology
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-700/60 ml-6 md:ml-40 pl-8 md:pl-12 flex flex-col gap-12">
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
                  <div className="absolute w-12 h-12 rounded-full bg-[#111827] dark:bg-[#111827] light:bg-slate-100 border-2 border-[#FF555F]/30 flex items-center justify-center text-[#FF555F] shadow-xl" style={{ left: '-3.25rem', top: '0.5rem' }}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Left Floating Year Label (desktop only) */}
                  <div className="absolute top-3 text-xs font-bold uppercase tracking-wider text-[#4AABCA] hidden md:block w-32 text-right" style={{ left: '-12rem' }}>
                    {event.year}
                  </div>

                  {/* Text Details */}
                  <div className="glass-card p-6 hover:border-[#4AABCA]/20">
                    <span className="text-[10px] font-bold text-[#4AABCA] md:hidden">
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

      {/* Consolidating Mission & Vision split cards */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#FF555F]/5">
        
        {/* Mission Card */}
        <div className="glass-card p-8 md:p-12 border-[#4AABCA]/20 hover:border-[#4AABCA]/40 flex flex-col gap-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#4AABCA]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA]">
            <Target className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
            Our Mission
          </h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
            To empower global organizations by delivering premium recruitment architectures, secure customer service outsourcing (BPO), custom tech transformations, and robust virtual support. We are dedicated to bridging capabilities with seamless execution, ensuring statutory compliance, operational transparency, and continuous SLA excellence.
          </p>
        </div>

        {/* Vision Card */}
        <div className="glass-card p-8 md:p-12 border-[#FF555F]/20 hover:border-[#FF555F]/40 flex flex-col gap-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF555F]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-[#FF555F]/10 flex items-center justify-center text-[#FF555F]">
            <Eye className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
            Our Vision
          </h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
            To be recognized as a premier corporate global management partner. We aspire to position Jaipur, Rajasthan, as a top-tier hub for cross-continental workforce sourcing, software engineering and digital services, steering global corporate integrations while fostering Indian professional talent.
          </p>
        </div>
      </section>

      {/* Core Corporate Values */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
              How We Execute
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              OUR CORE CORPORATE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div 
                  key={val.title}
                  className="glass-card p-6 flex flex-col gap-4 hover:border-[#4AABCA]/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                      {val.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consolidating CSR initiatives */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-[#FF555F]/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
              Corporate Governance
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              SUSTAINABILITY IN THE DIGITAL ERA
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              At <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800">Sumway Global</strong>, corporate social responsibility is not an afterthought—it is woven directly into our business model. Since our incorporation on <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800">30 September 2024</strong>, we have focused on giving back to the community that houses our Jaipur HQ.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We focus our efforts on bridging educational gaps, optimizing energy footprints, and sponsoring talent training modules to make graduates globally employable.
            </p>
          </div>
          
          <div className="lg:col-span-6 flex flex-col gap-4">
            {csrProjects.map((proj) => {
              const Icon = proj.icon;
              return (
                <div 
                  key={proj.title}
                  className="glass-card p-5 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-850 uppercase">{proj.title}</h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">{proj.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
