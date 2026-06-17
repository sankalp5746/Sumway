"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import FallbackImage from "@/components/shared/FallbackImage";
import { 
  Users, Briefcase, GraduationCap, Laptop, Headphones, 
  CheckCircle2, ArrowRight, HelpCircle, ChevronDown 
} from "lucide-react";

const serviceImages: { [key: string]: string } = {
  "staffing-solutions": "/images/team.png",
  "rpo": "/images/team.png",
  "internship": "/images/skill.png",
  "web-development-graphic": "/images/it.png",
  "support-services": "/images/bpo.png"
};
import PageHero from "@/components/shared/PageHero";
import { useAppStore } from "@/lib/store";

const iconMap: { [key: string]: any } = {
  Users, Briefcase, GraduationCap, Laptop, Headphones
};

// Detailed Services Content Lookup Map
const SERVICES_DATA: { [key: string]: any } = {
  "staffing-solutions": {
    title: "Staffing Solutions",
    icon: "Users",
    subtitle: "Premium executive, technical and commercial placements optimized for growth.",
    overview: "Finding top-tier talent requires specialized, thorough screening processes. Sumway Global manages the entire pipeline—contract placements, contract-to-hire, and executive direct hiring—sourcing professionals that align perfectly with your guidelines.",
    benefits: [
      "Vetted Technical & Commercial Specialists",
      "Saves up to 45% onboarding overheads",
      "Flexible contract-to-hire frameworks",
      "Dedicated background & credential audits"
    ],
    features: [
      { title: "Direct Placements", desc: "Permanent boardroom and executive curation targeted for strategic leadership." },
      { title: "Contract Deployments", desc: "Short-term technical specialists mapped precisely to live project lifecycles." },
      { title: "Pre-screened Curation", desc: "Strict verification audits covering skills, compliance, and references." }
    ],
    process: [
      { num: "01", title: "Role Scoping", desc: "Compile detailed skills and compliance parameters." },
      { num: "02", title: "Active Sourcing", desc: "Leverage Sumway Rajasthan networks and digital portals." },
      { num: "03", title: "Direct Auditing", desc: "Conduct strict technical and reference validation tests." },
      { num: "04", title: "Onboarding", desc: "Manage operational integration and local HR compliance." }
    ],
    faqs: [
      { q: "What sectors do you provide staffing for?", a: "We specialize in BPO Customer Service, IT/Software, Digital Marketing, and local Jaipur administrative support roles." },
      { q: "How long does a typical placement take?", a: "Direct placements are compiled within 15-21 days, while contract roles can be deployed in less than 7 days." }
    ]
  },
  "rpo": {
    title: "Recruitment Process Outsourcing (RPO)",
    icon: "Briefcase",
    subtitle: "Complete outsourced management of your corporate hiring channels.",
    overview: "Scale your talent acquisitions dynamically without heavy HR payroll overhead. Sumway Global acts as your corporate recruiter, managing sourcing, testing, audits, scheduling and hiring pipelines.",
    benefits: [
      "Cohesive applicant tracking systems",
      "Unified brand positioning in candidate markets",
      "Reduced overall cost-per-hire ratios",
      "Highly scalable recruiter deployment"
    ],
    features: [
      { title: "End-to-End Pipeline", desc: "Complete handling from initial job postings to contract onboarding." },
      { title: "Sourcing Networks", desc: "Active candidate databases across major metropolitan hubs." },
      { title: "Reporting Metrics", desc: "Clear weekly reports on sourcing efficiency and cost structures." }
    ],
    process: [
      { num: "01", title: "Audit Pipeline", desc: "Analyze historical recruiting metrics and identify leaks." },
      { num: "02", title: "Align Systems", desc: "Deploy dedicated Sumway recruiters and tracker tools." },
      { num: "03", title: "Execute Sourcing", desc: "Run high-volume social and industrial campaigns." },
      { num: "04", title: "Scale Placements", desc: "Streamline interview, screening and onboarding flows." }
    ],
    faqs: [
      { q: "Can RPO integrate with our existing HR teams?", a: "Absolutely. We work alongside internal corporate HR boards, handling heavy sourcing tasks while you retain key board approvals." },
      { q: "What is the typical cost structure?", a: "RPO pricing is customized based on volume, billing monthly or per-placement to lower overall hiring costs." }
    ]
  },
  "internship": {
    title: "Internship Programs",
    icon: "GraduationCap",
    subtitle: "Connecting raw university talent with corporate training modules in Jaipur.",
    overview: "Bridging the critical gap between university theory and practical project execution. We train graduates on BPO coordinates, cloud systems, and professional boardroom communication.",
    benefits: [
      "Mentored pre-internship skill modules",
      "Onboarding-ready junior hires",
      "Saves up to 75% in initial training cost",
      "Pipelining future corporate leadership"
    ],
    features: [
      { title: "Structured Training", desc: "Comprehensive curricula covering React coding, voice desks, and office tools." },
      { title: "Live Projects", desc: "Practical hands-on exposure under direct boardroom mentors." },
      { title: "Agile Evaluations", desc: "Ongoing weekly coding and communication performance audits." }
    ],
    process: [
      { num: "01", title: "Talent Sourcing", desc: "Establish coordination links with Jaipur universities." },
      { num: "02", title: "Core Bootcamps", desc: "Conduct structured bootcamps covering live technologies." },
      { num: "03", title: "Project Work", desc: "Assign trainees to supervised corporate tasks." },
      { num: "04", title: "SLA Evaluation", desc: "Compile performance reports for placements." }
    ],
    faqs: [
      { q: "Are the internships paid?", a: "Yes, we support performance-based stipends for live corporate project workloads." },
      { q: "Can interns transition to full-time roles?", a: "Definitely. Top performers are offered pre-placement offers (PPOs) inside Sumway Global or client networks." }
    ]
  },
  "web-development-graphic": {
    title: "Web Dev & Graphic Design",
    icon: "Laptop",
    subtitle: "High-performance React/Next.js corporate nodes and stunning digital assets.",
    overview: "Command authority in digital spaces with exquisitely fast, responsive, and visually jaw-dropping interfaces. We engineer optimized cloud systems, React/Next.js architectures, and luxurious graphic branding assets.",
    benefits: [
      "Lightning-fast page speeds (Next.js)",
      "Premium dark luxury aesthetic designs",
      "Complete mobile-first responsiveness",
      "Technical search engine (SEO) alignments"
    ],
    features: [
      { title: "Next.js Web Systems", desc: "Modern App Router setups delivering elite speed and server-side SEO." },
      { title: "Branding Curation", desc: "Complete visual standard design manuals, logos, and layouts." },
      { title: "Cloud Integration", desc: "Deployments on robust serverless architectures with databases." }
    ],
    process: [
      { num: "01", title: "Wireframing", desc: "Map detailed high-conversion user interfaces (UI/UX)." },
      { num: "02", title: "Code Execution", desc: "Program responsive React systems in TypeScript and Tailwind." },
      { num: "03", title: "Optimization", desc: "Audit speed parameters, SEO tags, and responsiveness." },
      { num: "04", title: "Deployment", desc: "Launch on fast global CDNs like Vercel with database links." }
    ],
    faqs: [
      { q: "What frameworks do you build websites in?", a: "We primarily utilize React, Next.js, TypeScript, and Tailwind CSS for peak modern performance, alongside Node.js for backend APIs." },
      { q: "Do you offer post-launch maintenance?", a: "Yes. We offer dedicated monthly maintenance covering database security, code updates, and layout expansions." }
    ]
  },
  "support-services": {
    title: "Support Services",
    icon: "Headphones",
    subtitle: "24/7 virtual assistant desks, BPO voice hubs, and corporate administrative support.",
    overview: "Protect your client experience with highly energetic support associates operating 24/7 inside the Jaipur Stock Exchange. We manage virtual desks, voice/chat helpdesks, and payroll consulting with strict compliance.",
    benefits: [
      "Seamless round-the-clock shift coverage",
      "Vetted professionals with fluent English",
      "Strict data protection security protocols",
      "Reduces virtual support overheads by 60%"
    ],
    features: [
      { title: "24/7 Voice & Chat", desc: "rotational customer support helpdesk channels for US and European markets." },
      { title: "Virtual Desks", desc: "Dedicated virtual assistants handling calendar coordination, emails, and data entry." },
      { title: "Payroll & Billing", desc: "Statutory invoicing support, billing processes, and compliance tracking." }
    ],
    process: [
      { num: "01", title: "Task Scoping", desc: "Define virtual assistant schedules and workflow templates." },
      { num: "02", title: "Deploy Desks", desc: "Configure secure computers, softphones, and data portals." },
      { num: "03", title: "SLA Onboarding", desc: "Train support associates on custom corporate systems." },
      { num: "04", title: "Continuous Audit", desc: "Run daily call scores and queue performance checks." }
    ],
    faqs: [
      { q: "How do you guarantee data security?", a: "All support associates operate from secure, physically restricted workspaces using encrypted networks, strict NDAs, and no local file downloads." },
      { q: "Can support services scale up dynamically?", a: "Yes. We can deploy extra support desks in less than 72 hours to handle sudden seasonal customer surges." }
    ]
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetail({ params }: PageProps) {
  const { id } = use(params);
  const data = SERVICES_DATA[id];
  const openEnquiry = useAppStore((state) => state.openEnquiry);
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  if (!data) {
    notFound();
  }

  const IconComp = iconMap[data.icon] || Users;

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title={data.title} 
        subtitle={data.subtitle} 
      />

      {/* Section 1: Overview (2-column split) */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase bg-[#4AABCA]/10 px-3 py-1.5 rounded-full self-start">
              Department Overview
            </span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase leading-snug">
              INTEGRATED OPERATIONS AND <span className="text-[#FF555F]">CAPABILITY MATRIX</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
              {data.overview}
            </p>
            
            {/* Benefits Checklist with animated checkmarks */}
            <div className="flex flex-col gap-3 mt-4">
              <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-widest">Core Advantages</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-slate-300">
                {data.benefits.map((b: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#FF555F] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/6 light:border-slate-300 shadow-xl">
              <FallbackImage
                src={serviceImages[id] || "/images/team.png"}
                alt={data.title}
                fill
                className="object-cover"
                fallbackLabel={data.title}
              />
            </div>

            <div className="bg-[#111827] dark:bg-[#111827] light:bg-white border border-[#FF555F]/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#4AABCA]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA] shrink-0 border border-[#4AABCA]/20">
                <IconComp className="w-6 h-6 animate-pulse" />
              </div>
              
              <div className="flex flex-col gap-2 mt-6">
                <h3 className="font-display font-extrabold text-sm text-slate-100 uppercase tracking-wide">
                  SUMWAY SLA ASSURANCE
                </h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Every BPO assistant, custom developer or RPO desk deployed runs under rigorous corporate supervision directly from our Jaipur Stock Exchange offices.
                </p>
              </div>

              <button 
                onClick={() => openEnquiry(`${data.title} Request`)}
                className="w-full flex items-center justify-center gap-1.5 mt-6 py-3 rounded-lg bg-[#FF555F] text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-[#FF555F]/90 active:scale-95 transition-all cursor-pointer shadow-[0_4px_14px_rgba(245,197,66,0.2)]"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Features Grid (3-column) */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">Capabilities list</span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              PRIMARY SERVICE FEATURES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.features.map((f: any, idx: number) => (
              <div 
                key={f.title}
                className="glass-card p-6 flex flex-col gap-4"
              >
                <span className="font-display font-extrabold text-sm text-[#FF555F]">
                  FEATURE 0{idx + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Process Flow Timeline */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-[#FF555F]/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">Roadmap</span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            DELIVERY PROCESS FLOW
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-4">
          <div className="absolute top-12 left-16 right-16 h-0.5 border-t border-dashed border-[#FF555F]/10 hidden md:block" />
          
          {data.process.map((step: any, idx: number) => (
            <div key={step.num} className="flex flex-col items-center text-center relative z-10 max-w-[200px]">
              <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#FF555F]/30 flex items-center justify-center font-display font-extrabold text-[#FF555F] text-xs">
                {step.num}
              </div>
              <h3 className="font-display font-bold text-sm text-slate-100 mt-4 uppercase">
                {step.title}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: FAQ Accordion */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">Support</span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {data.faqs.map((faq: any, idx: number) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#111827] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-[#FF555F] transition-colors"
                  >
                    <span className="uppercase tracking-wider">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FF555F]" : "text-slate-500"}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-800/80 text-[11px] text-slate-400 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
