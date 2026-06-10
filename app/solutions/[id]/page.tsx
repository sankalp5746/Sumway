"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { 
  Clock, PhoneCall, ShieldCheck, TrendingUp, 
  AlertTriangle, CheckSquare, ArrowRight, ArrowUpRight 
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FallbackImage from "@/components/shared/FallbackImage";
import { useAppStore } from "@/lib/store";

const solutionImages: { [key: string]: string } = {
  "workforce-management": "/images/team.png",
  "bpo-hiring": "/images/bpo.png",
  "business-support": "/images/skyline.png",
  "digital-transformation": "/images/it.png"
};

const iconMap: { [key: string]: any } = {
  Clock, PhoneCall, ShieldCheck, TrendingUp
};

// Detailed Solutions Content Lookup Map
const SOLUTIONS_DATA: { [key: string]: any } = {
  "workforce-management": {
    title: "Workforce Management",
    icon: "Clock",
    subtitle: "Deploying high-adaptability schedules, productivity trackers, and shift systems.",
    problem: "Outdated scheduling, rising overtime bills, high scheduling friction and employee burnout are dropping productivity.",
    strategy: [
      "Conduct a complete work-hour and scheduling audit across all departments.",
      "Deploy optimized, automated shift-scheduling algorithms based on workload volumes.",
      "Implement real-time secure dashboard systems to track active work hours and tasks.",
      "Sync attendance logs directly with local statutory payroll tools."
    ],
    kpis: [
      { metric: "15%", label: "Overhead Reduction" },
      { metric: "35h", label: "Monthly Saved HR Admin Hours" },
      { metric: "100%", label: "Local Compliance Audits Succeeded" }
    ],
    beforeAfter: {
      before: "Manual spreadsheet shifts with massive schedule conflicts, high overtime costs, and compliance risks.",
      after: "Automated real-time shift systems with Zero schedule conflicts, optimized resource billing, and statutory tax tracking."
    }
  },
  "bpo-hiring": {
    title: "BPO Hiring Solutions",
    icon: "PhoneCall",
    subtitle: "High-volume recruitment programs for customer operations, helpdesks and technical voice support.",
    problem: "Call center helpdesks experience severe, continuous staff turnover, dropping CSAT scores and wasting training budgets.",
    strategy: [
      "Establish targeted, continuous recruitment campaigns across Jaipur universities.",
      "Conduct rigorous psychological and verbal communication audits on all candidates.",
      "Train recruits inside our custom pre-internship support academies prior to deployment.",
      "Maintain active standby applicant pipelines to fill vacancies instantly."
    ],
    kpis: [
      { metric: "40%", label: "Hiring Budget Cuts" },
      { metric: "72h", label: "Average Standby Deployment Time" },
      { metric: "96%", label: "Placements Retained in First Year" }
    ],
    beforeAfter: {
      before: "High candidate dropouts, average time-to-fill over 45 days, and massive initial training cost.",
      after: "Vetted standby talent reserves, average time-to-fill under 72 hours, and graduates pre-trained on key CRM systems."
    }
  },
  "business-support": {
    title: "Business Support Operations",
    icon: "ShieldCheck",
    subtitle: "Navigating local Indian regulations, payroll scaling and administrative compliance.",
    problem: "Scaling firms get bogged down by statutory Indian compliance audits, tax filings, payroll, and GST procedures.",
    strategy: [
      "Audit existing corporate payroll configurations and statutory compliance records.",
      "Transition operations to our secure automated salary and statutory invoicing systems.",
      "Manage all local Jaipur tax filings, GST reports, PF, and statutory benefits compliance.",
      "Offer continuous boardroom advisory support for statutory legislative shifts."
    ],
    kpis: [
      { metric: "Zero", label: "Compliance Penalties Achieved" },
      { metric: "60%", label: "Saved HR Administration Time" },
      { metric: "100%", label: "Statutory Tax Safety Secured" }
    ],
    beforeAfter: {
      before: "Complex spreadsheets, manual calculation errors, delayed GST filings, and constant legal compliance risks.",
      after: "Fully automated secure billing platforms, instant tax submissions, and comprehensive SLA compliance coverage."
    }
  },
  "digital-transformation": {
    title: "Digital Transformation",
    icon: "TrendingUp",
    subtitle: "Outsourced product engineering, cloud migrations, database setups and Next.js custom applications.",
    problem: "Traditional businesses struggle with outdated server architectures, slow page speeds, and bad search visibility.",
    strategy: [
      "Map out legacy technical roadblocks, database slow points and user interface problems.",
      "Program responsive React, Next.js and TypeScript corporate hubs optimized for page speed.",
      "Deploy custom databases, backend API channels, and secure serverless hosting.",
      "Optimize entire platform with technical search engine (SEO) keyword configurations."
    ],
    kpis: [
      { metric: "100ms", label: "Average Server Response Time" },
      { metric: "99.9%", label: "Platform SLA Uptime Guaranteed" },
      { metric: "3.2x", label: "Increase in Organic Inbound Inquiries" }
    ],
    beforeAfter: {
      before: "Slow page loads, zero organic Google search views, constant backend database server dropouts.",
      after: "Ultra-fast serverless page speeds, #1 page search indexing, and secure, maintenance-free cloud hosting."
    }
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SolutionDetail({ params }: PageProps) {
  const { id } = use(params);
  const data = SOLUTIONS_DATA[id];
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  if (!data) {
    notFound();
  }

  const IconComp = iconMap[data.icon] || ShieldCheck;

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title={data.title} 
        subtitle={data.subtitle} 
      />

      {/* Section 1: Client Problem (Red Accent) */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12 border-red-500/20 bg-gradient-to-br from-red-500/5 via-[#111827] to-[#0A1128] flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 border border-red-500/20">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
              The Client Bottleneck
            </span>
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 uppercase tracking-wide leading-tight">
              Operational Pain Point Statement
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium italic mt-2">
              &ldquo;{data.problem}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Strategy Roadmap (Numbered List) */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
              Our Deliverables
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase leading-snug">
              Strategic Boardroom Roadmap
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sumway Global designs custom operational procedures tailored directly to your project budgets. Our Jaipur directors supervise the deployment of every strategy module.
            </p>

            <ul className="flex flex-col gap-4 text-xs font-semibold text-slate-300">
              {data.strategy.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-slate-800/80">
                  <div className="w-6 h-6 rounded-full bg-[#4AABCA]/10 border border-[#4AABCA]/20 flex items-center justify-center text-[#4AABCA] text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed mt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: KPI Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/6 light:border-slate-300 shadow-xl mb-2">
              <FallbackImage
                src={solutionImages[id] || "/images/skyline.png"}
                alt={data.title}
                fill
                className="object-cover"
                fallbackLabel={data.title}
              />
            </div>

            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase text-center lg:text-left">
              Expected Performance Metrics
            </span>
            <div className="grid grid-cols-1 gap-4">
              {data.kpis.map((kpi: any) => (
                <div 
                  key={kpi.label} 
                  className="glass-card p-6 flex items-center justify-between hover:border-[#FF555F]/20"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    {kpi.label}
                  </span>
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-[#FF555F]">
                    {kpi.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Before/After Comparison */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-[#FF555F]/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
            Operational Audit
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            BEFORE AND AFTER RESULTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="glass-card p-6 md:p-8 border-red-500/10 bg-red-500/5 flex flex-col gap-3 relative overflow-hidden">
            <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">
              Legacy Operations (Before)
            </span>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-2">
              {data.beforeAfter.before}
            </p>
          </div>

          {/* After */}
          <div className="glass-card p-6 md:p-8 border-[#4AABCA]/20 bg-[#4AABCA]/5 flex flex-col gap-3 relative overflow-hidden">
            <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-widest">
              Sumway Integrated Operations (After)
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-bold mt-2">
              {data.beforeAfter.after}
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-16 text-center bg-[#111827] border border-[#FF555F]/10 p-8 md:p-12 rounded-2xl max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#4AABCA]/5 rounded-bl-full pointer-events-none" />
          <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-widest">SLA Deployments</span>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 uppercase tracking-wide mt-2">
            Ready to optimize your business operations?
          </h3>
          <p className="text-xs text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Consult our chairman and technical board directors inside the Stock Exchange Building Jaipur to compile a customized strategy blueprint.
          </p>
          
          <button 
            onClick={() => openEnquiry(`${data.title} Blueprint`)}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-lg bg-[#FF555F] text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-[#FF555F]/90 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <span>Consult Strategy Board</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
