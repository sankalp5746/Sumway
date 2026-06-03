"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle, Landmark, Zap,
  MapPin, ShieldCheck, HelpCircle, ArrowRight
} from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

const keyPoints = [
  {
    title: "Global Talent Pipeline",
    desc: "Deploying high-quality candidates across tech, design, customer operations and recruitment streams.",
    icon: CheckCircle
  },
  {
    title: "Statutory Compliance",
    desc: "Complete business support operations, local Jaipur taxation filings, GST management, and payroll compliance.",
    icon: Landmark
  },
  {
    title: "Active 24/7 Operations",
    desc: "Voice support, virtual desks, and helpdesk systems running seamlessly across US, European, and Indian timezones.",
    icon: Zap
  },
  {
    title: "Jaipur Office HQ",
    desc: "State-of-the-art corporate offices in the JLN Marg Stock Exchange building, Malviya Nagar.",
    icon: MapPin
  },
  {
    title: "Security & SLA Standards",
    desc: "Complete operational integrity with dedicated systems, secure cloud servers, and strict NDAs.",
    icon: ShieldCheck
  },
  {
    title: "Agile Dev Teams",
    desc: "Constructing modern custom software, fast React/Next.js corporate landing nodes, and cloud deployments.",
    icon: HelpCircle
  }
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F5C542]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Core Advantages"
          title="Why Partner with Sumway?"
          desc="Engineered in Jaipur, Rajasthan, and globally competitive. Sumway Global brings professional structure, deep compliance security, and scalable systems directly to your operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {keyPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card p-7 flex flex-col gap-4 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F5C542]/5 to-transparent rounded-bl-full group-hover:scale-125 transition-transform duration-500" />

                <div className="icon-box-gold">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-slate-100 light:text-[#111827] group-hover:text-[#F5C542] transition-colors uppercase">
                    {point.title}
                  </h3>
                  <p className="text-body-sm mt-2">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-14 bg-gradient-to-r from-[#0c1220] via-[#111827] to-[#0c1220] light:from-slate-100 light:via-white light:to-slate-100 border border-white/6 light:border-slate-300 p-8 md:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,194,178,0.05),transparent_50%)]" />

          <div className="flex flex-col gap-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C2B2]">
              Corporate Policy Standards
            </span>
            <h4 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 uppercase">
              Looking for a custom strategic partnership?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              We engineer personalized operations frameworks tailored specifically to your budgetary and compliance bounds.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="btn-primary"
            >
              <span>Consult Our Board</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
