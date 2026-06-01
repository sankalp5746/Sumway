"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import FallbackImage from "@/components/shared/FallbackImage";
import { 
  ArrowLeft, Calendar, User, Clock, 
  Share2, ChevronRight, BookOpen, Quote
} from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { BLOGS } from "@/lib/constants";
import PageHero from "@/components/shared/PageHero";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const blog = BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Get related posts (exclude current)
  const relatedPosts = BLOGS.filter((b) => b.slug !== slug).slice(0, 2);

  const handleShare = (platform: string) => {
    alert(`Sharing this article on ${platform}...`);
  };

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title={blog.title} 
        subtitle={`Written by Board Director ${blog.author} — Category: ${blog.category}`}
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#F5C542] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: TOC (Desktop only) */}
          <div className="hidden lg:col-span-3 lg:block sticky top-28">
            <div className="glass-card p-5 flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-[#00C2B2] uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Table of Contents</span>
              </h4>
              <nav className="flex flex-col gap-2.5 text-[10px] font-semibold text-slate-400">
                <a href="#executive-summary" className="hover:text-[#F5C542] flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#F5C542] shrink-0" />
                  <span>Executive Summary</span>
                </a>
                <a href="#operational-matrix" className="hover:text-[#F5C542] flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#F5C542] shrink-0" />
                  <span>Strategic Methodology</span>
                </a>
                <a href="#boardroom-conclusion" className="hover:text-[#F5C542] flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#F5C542] shrink-0" />
                  <span>Statutory Conclusion</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Center Column: Article Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <FallbackImage 
                src={blog.image} 
                alt={blog.title} 
                fill 
                className="object-cover brightness-90"
                fallbackLabel={blog.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] dark:from-[#0A0F1E] light:from-slate-50 to-transparent" />
            </div>

            {/* Article Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-2 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#00C2B2]" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#00C2B2]" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00C2B2]" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Rich Content body */}
            <div className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium space-y-6">
              
              <div id="executive-summary" className="scroll-mt-28 flex flex-col gap-3">
                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                  1. Executive Summary
                </h3>
                <p>
                  As business environments scale rapidly, conventional recruitment and resource deployment fail to adapt. Traditional recruitment channels are often fragmented, causing long sourcing queues and compliance gaps. Outsourced methodologies provide the robust infrastructure required to protect quality parameters.
                </p>
                <p>
                  Sumway Global Management has engineered an integrated platform. By bridging physical Stock Exchange offices in Jaipur, Rajasthan, with highly targeted, pre-screened talent pools, we deliver strategic execution directly to international operations.
                </p>
              </div>

              {/* Bold Pull Quote */}
              <div className="my-8 p-6 rounded-xl bg-white/5 border-l-4 border-[#F5C542] flex gap-3 relative overflow-hidden">
                <Quote className="w-10 h-10 text-slate-800/40 absolute right-4 top-2 pointer-events-none" />
                <p className="font-display text-xs md:text-sm text-slate-200 font-bold italic leading-relaxed relative z-10">
                  &ldquo;Our tagline, &apos;Your Happiness Our Resolution&apos;, is a corporate mandate. We ensure that operational stability and compliance integrity are delivered at every boardroom milestone.&rdquo;
                </p>
              </div>

              <div id="operational-matrix" className="scroll-mt-28 flex flex-col gap-3">
                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                  2. Strategic Methodology
                </h3>
                <p>
                  Our BPO support desks and software divisions follow precise, audited workflows. When recruiting for client networks, we conduct psychological profiling, verbal communication checks, and hands-on system tests inside our Jaipur corporate centers.
                </p>
                <p>
                  This strategy insulates clients from initial training overheads. Graduates join operations fully vetted and ready to deploy on CRM databases, React frameworks, or customer voice support queues.
                </p>
              </div>

              <div id="boardroom-conclusion" className="scroll-mt-28 flex flex-col gap-3">
                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                  3. Statutory Conclusion
                </h3>
                <p>
                  Deploying cross-continental divisions requires strict local compliance safety. Sumway Global manages stat tax filings, GST compliance, Statutory benefits (PF), and secure operational bounds, ensuring scaling enterprises remain protected from administrative burdens.
                </p>
              </div>
            </div>

            {/* Author Bio Panel */}
            <div className="glass-card p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start mt-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F5C542] to-[#00C2B2] flex items-center justify-center font-display font-extrabold text-[#0A0F1E] text-base shrink-0">
                {blog.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex flex-col text-center sm:text-left gap-1">
                <span className="text-[9px] font-bold text-[#00C2B2] uppercase">Written By Director</span>
                <h4 className="text-xs font-bold text-slate-200">{blog.author}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Active boardroom director at Sumway Global Management Pvt. Ltd. guiding professional recruitment operations, BPO helpdesks, and custom software architectures in Jaipur, Rajasthan.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Social Share & Related Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Social Share Buttons */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-[#00C2B2] uppercase tracking-widest flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare("LinkedIn")}
                  className="p-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer flex-1 flex justify-center"
                >
                  <FaLinkedin className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare("Twitter")}
                  className="p-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer flex-1 flex justify-center"
                >
                  <FaTwitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare("Facebook")}
                  className="p-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-400 hover:text-[#F5C542] hover:border-[#F5C542]/30 active:scale-95 transition-all cursor-pointer flex-1 flex justify-center"
                >
                  <FaFacebook className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Related Posts Sidebar */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-[#00C2B2] uppercase tracking-widest">
                Related Insights
              </h4>
              <div className="flex flex-col gap-3">
                {relatedPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="flex flex-col gap-1 p-2.5 rounded-lg border border-transparent hover:border-slate-800 hover:bg-white/5 group"
                  >
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#F5C542]">
                      {post.category}
                    </span>
                    <h5 className="text-[10px] font-bold text-slate-200 group-hover:text-[#F5C542] transition-colors leading-relaxed uppercase">
                      {post.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>
    </div>
  );
}
