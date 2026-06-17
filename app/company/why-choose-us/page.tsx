"use client";

import React from "react";
import { Check, X, Building, ShieldCheck, Headphones, Zap } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const comparisonData = [
  {
    parameter: "Jaipur OfficeHQ Access",
    sumway: true,
    others: false,
    detail: "State-of-the-art office setups inside JLN Marg Stock Exchange building, Malviya Nagar."
  },
  {
    parameter: "Complete Statutory Payroll",
    sumway: true,
    others: false,
    detail: "Statutory tax management, GST reporting, statutory benefits and full HR compliance processing."
  },
  {
    parameter: "Rigorous NDAs & SLAs",
    sumway: true,
    others: true,
    detail: "Dedicated secure cloud environments, operational isolation and 99.8% system SLA retention."
  },
  {
    parameter: "24/7 Zone Call Support",
    sumway: true,
    others: false,
    detail: "Support desks operating continuously across rotational shifts for US/EU/IN timezones."
  },
  {
    parameter: "Agile Development Teams",
    sumway: true,
    others: false,
    detail: "Specialized Next.js developers, custom web design integrations and software deployments."
  }
];

export default function WhyChooseUsPage() {
  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Why Choose Us" 
        subtitle="Comparing our secure BPO nodes, RPO operations and Jaipur HQ advantages."
      />

      {/* Comparison Table Section */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
            Enterprise Audit
          </span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            SUMWAY VS TRADITIONAL AGENCIES
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 leading-relaxed font-medium">
            Review how our Jaipur-HQ infrastructure, complete payroll compliance and multi-timezone helpdesk desks deliver extreme security over traditional single-service recruiters.
          </p>
        </div>

        {/* Responsive Table grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 light:border-slate-300 bg-[#111827] light:bg-white shadow-2xl">
          <table className="w-full border-collapse text-left text-xs font-semibold text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 light:border-slate-300 bg-[#0A1128] light:bg-slate-100 font-display font-extrabold text-[#4AABCA] uppercase tracking-wider text-[10px]">
                <th className="p-4 md:p-6">Parameter</th>
                <th className="p-4 md:p-6 text-center text-[#FF555F]">Sumway Global</th>
                <th className="p-4 md:p-6 text-center">Standard Agencies</th>
                <th className="p-4 md:p-6 hidden md:table-cell">Delivered Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 light:divide-slate-200 leading-relaxed">
              {comparisonData.map((row) => (
                <tr key={row.parameter} className="hover:bg-white/5 light:hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-6 text-slate-200 dark:text-slate-200 light:text-slate-800 uppercase text-[10px] md:text-xs">
                    {row.parameter}
                  </td>
                  <td className="p-4 md:p-6 text-center">
                    {row.sumway ? (
                      <div className="inline-flex w-7 h-7 rounded-full bg-[#4AABCA]/10 items-center justify-center text-[#4AABCA]">
                        <Check className="w-4.5 h-4.5" />
                      </div>
                    ) : (
                      <div className="inline-flex w-7 h-7 rounded-full bg-red-500/10 items-center justify-center text-red-500">
                        <X className="w-4.5 h-4.5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 md:p-6 text-center">
                    {row.others ? (
                      <div className="inline-flex w-7 h-7 rounded-full bg-white/5 light:bg-slate-100 border border-slate-800 light:border-slate-300 items-center justify-center text-slate-500">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="inline-flex w-7 h-7 rounded-full bg-red-500/10 items-center justify-center text-red-500">
                        <X className="w-4.5 h-4.5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 md:p-6 hidden md:table-cell text-slate-400 font-medium text-[11px]">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
