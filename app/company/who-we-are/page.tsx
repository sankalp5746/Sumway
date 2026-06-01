"use client";

import React from "react";
import FallbackImage from "@/components/shared/FallbackImage";
import { Building, GraduationCap, Laptop, Landmark } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export default function WhoWeAre() {
  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Who We Are" 
        subtitle="A corporate workforce, BPO operations, IT software and compliance team aligned in Jaipur, RJ."
      />

      {/* Corporate Summary section */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
              Our Corporate Profile
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase">
              STRATEGIC OPERATIONAL ARCHITECTS
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              We are <strong className="text-slate-200 light:text-slate-800">Sumway Global Management Private Limited</strong>, an integrated outsourcing and consulting firm incorporated on <strong className="text-slate-200 light:text-slate-800">30 September 2024</strong>. Headquartered inside the Jaipur Stock Exchange Building in Rajasthan, India, we cater to a scaling international clientele.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              Our core capability is bridging geographical talent gaps. By operating dedicated voice/chat support nodes, technical software divisions, and cross-continental recruitment boards in a single corporate agency, we help international scaling firms secure extreme operational efficiencies. We operate as an extension of our clients&apos; boardroom.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Corporate Profile Image */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-800 shadow-lg">
              <FallbackImage
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop"
                alt="Sumway Global operations desk"
                fill
                className="object-cover brightness-90"
                fallbackLabel="Operations Desk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] dark:from-[#0A0F1E] light:from-slate-50 via-transparent to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-4">
            <div className="glass-card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 uppercase">Jaipur HQ Base</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Prime Stock Exchange corporate infrastructure optimized for international routing compliance.</p>
              </div>
            </div>

            <div className="glass-card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542] shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 uppercase">Statutory Structure</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Fully registered private limited enterprise adhering to strict Indian audit guidelines.</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#F5C542]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">Our Culture</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3 mb-12">
            THREE PILLARS OF SUMWAY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="glass-card p-6">
              <span className="text-2xl font-extrabold text-[#F5C542] font-display">01</span>
              <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-[#0F172A] mt-2 uppercase">Agile Flexibility</h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">We support complete scheduling ease, rotating shifts across international zones, and prompt deliverable frameworks.</p>
            </div>
            
            <div className="glass-card p-6">
              <span className="text-2xl font-extrabold text-[#F5C542] font-display">02</span>
              <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-[#0F172A] mt-2 uppercase">Mentored Growth</h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">Every professional joining our Jaipur divisions receives direct board mentoring and active structural training modules.</p>
            </div>

            <div className="glass-card p-6">
              <span className="text-2xl font-extrabold text-[#F5C542] font-display">03</span>
              <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-[#0F172A] mt-2 uppercase">Tagline Resolution</h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">Our workspace runs on empathy. &ldquo;Your Happiness Our Resolution&rdquo; is a mandate for client operations as well as employee care.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
