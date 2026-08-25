"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Users, Crown } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const teamMembers = [
  {
    name: "Mr. Sankalp Yogiraj Bendale",
    role: "Software Developer",
    bio: "Full-stack engineer driving Sumway Global's digital transformation with cutting-edge web technologies, custom enterprise applications, and modern cloud architectures.",
    icon: Code2,
    accent: "#4AABCA",
    initials: "SB"
  },
  {
    name: "Mrs. Shrilekha Swaroop",
    role: "Senior HR",
    bio: "Seasoned human resources professional spearheading talent acquisition strategies, employee engagement frameworks, and organizational development across all divisions.",
    icon: Users,
    accent: "#FF555F",
    initials: "SS"
  },
  {
    name: "Mrs. Kavita Gurjar",
    role: "Director",
    bio: "Visionary corporate leader overseeing strategic business operations, client relationship management, and driving sustainable growth for Sumway Global Management.",
    icon: Crown,
    accent: "#F59E0B",
    initials: "KG"
  }
];

export default function TeamPage() {
  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero
        title="Our Team"
        subtitle="Meet the dedicated professionals powering Sumway Global's mission of excellence."
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
            The People Behind Sumway
          </span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            Leadership & <span className="text-[#FF555F]">Core Team</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed font-medium">
            Our strength lies in the talent, dedication, and expertise of every team member. Together, we deliver world-class corporate solutions from Jaipur to the globe.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card p-8 flex flex-col items-center text-center gap-5 relative overflow-hidden group hover:border-white/15 transition-all duration-500"
              >
                {/* Decorative corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ background: member.accent }}
                />

                {/* Avatar circle with initials */}
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${member.accent}20, ${member.accent}08)`,
                    border: `2px solid ${member.accent}30`,
                  }}
                >
                  <span
                    className="font-display font-extrabold text-2xl tracking-wider"
                    style={{ color: member.accent }}
                  >
                    {member.initials}
                  </span>

                  {/* Floating role icon badge */}
                  <div
                    className="absolute -bottom-1 -right-1 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `${member.accent}15`,
                      border: `1px solid ${member.accent}30`,
                      color: member.accent,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide">
                  {member.name}
                </h3>

                {/* Role badge */}
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                  style={{
                    background: `${member.accent}12`,
                    color: member.accent,
                    border: `1px solid ${member.accent}20`,
                  }}
                >
                  {member.role}
                </span>

                {/* Bio */}
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                  {member.bio}
                </p>

                {/* Divider line */}
                <div
                  className="w-12 h-0.5 rounded-full opacity-30 mt-1"
                  style={{ background: member.accent }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block px-8 py-6 max-w-lg">
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              Interested in joining our growing team? We are always looking for talented individuals who share our passion for excellence.
            </p>
            <Link
              href="/careers"
              className="btn-primary inline-flex mt-4 !text-xs"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
