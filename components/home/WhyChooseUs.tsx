"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldAlert, Landmark, HelpCircle, 
  MapPin, ShieldCheck, Zap, ZapOff, CheckCircle 
} from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

const keyPoints = [
  {
    title: "Global Talent Pipeline",
    desc: "Deploying high-quality candidates across tech, design, customer operations and recruitment streams.",
    icon: CheckCircle
  },
  {
    title: "Statutory Indian Compliance",
    desc: "Complete business support operations, local Jaipur taxation filings, GST management, and payroll compliance.",
    icon: Landmark
  },
  {
    title: "Active 24/7 Operations",
    desc: "Voice support, virtual desks, and helpdesk systems running seamlessly across US, European, and Indian timezones.",
    icon: Zap
  },
  {
    title: "Jaipur OfficeHQ Access",
    desc: "State-of-the-art corporate offices in the JLN Marg Stock Exchange building, Malviya Nagar.",
    icon: MapPin
  },
  {
    title: "Security and SLA Standards",
    desc: "Complete operational integrity with dedicated systems, secure cloud servers, and strict NDAs.",
    icon: ShieldCheck
  },
  {
    title: "Agile Development Teams",
    desc: "Constructing modern custom software, fast React/Next.js corporate landing nodes, and cloud deployments.",
    icon: HelpCircle
  }
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F5C542]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          badge="Our Core Advantages"
          title="WHY PARTNER WITH SUMWAY?"
          desc="Engineered in Jaipur, Rajasthan, and globally competitive. Sumway Global brings professional structure, deep compliance security, and scalable systems directly to your operations."
        />

        {/* Why Choose Us Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {keyPoints.map((point, index) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 md:p-8 flex flex-col gap-4 group relative overflow-hidden"
              >
                {/* Visual hover corner glows */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F5C542]/5 to-transparent rounded-bl-full group-hover:scale-125 transition-transform duration-500" />
                
                <div className="w-10 h-10 rounded-xl bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542] border border-[#F5C542]/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] group-hover:text-[#F5C542] transition-colors uppercase">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Diagonal corporate highlight strip */}
        <div className="mt-16 bg-gradient-to-r from-[#0A0F1E] via-[#111827] to-[#0A0F1E] border-y border-[#F5C542]/10 p-6 md:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_left,rgba(0,194,178,0.05),transparent_50%)]" />
          
          <div className="flex flex-col gap-2 relative z-10">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00C2B2]">Corporate Policy Standards</span>
            <h4 className="font-display font-extrabold text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
              Looking for a custom strategic partnership?
            </h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              We engineer personalized operations frameworks tailored specifically to your budgetary and compliance bounds.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <Link 
              href="/contact"
              className="px-5 py-3 rounded-lg border border-[#F5C542] text-[#F5C542] hover:bg-[#F5C542] hover:text-[#0A0F1E] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Consult Our Board
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
