"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, Plus, Trash2, ShieldCheck, 
  ArrowLeft, Lock, Loader2, AlertCircle, Sparkles, Building 
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import PageHero from "@/components/shared/PageHero";

export default function AdminPage() {
  const router = useRouter();
  const { user, jobs, addJob, removeJob } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("BPO Operations");
  const [type, setType] = useState("Full-Time");
  const [loc, setLoc] = useState("Jaipur, IN");
  const [desc, setDesc] = useState("");

  const [notification, setNotification] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a brief premium loading animation
    setTimeout(() => {
      const newJob = {
        id: `job-${Date.now()}`,
        title,
        dept,
        type,
        loc,
        desc
      };

      addJob(newJob);
      setTitle("");
      setDesc("");
      setIsSubmitting(false);

      // Trigger standard beautiful toast
      setNotification("Job opportunity successfully published to live board!");
      setTimeout(() => setNotification(null), 4000);
    }, 1200);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove the job posting "${title}"?`)) {
      removeJob(id);
      setNotification(`Posting "${title}" has been deleted.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Hydration safety check
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00C2B2] animate-spin" />
      </div>
    );
  }

  // Security Role Guard Check
  if (!user || user.role !== "admin") {
    return (
      <div className="bg-transparent min-h-screen pb-16">
        <PageHero 
          title="Restricted Access" 
          subtitle="This administrative console is reserved strictly for authenticated board members."
        />
        
        <div className="max-w-md mx-auto px-6 mt-16">
          <div className="glass-card-static p-8 text-center flex flex-col items-center gap-6 border-red-500/20 bg-[#1a0f12]/30">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shadow-[0_0_24px_rgba(239,68,68,0.2)]">
              <Lock className="w-7 h-7" />
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase">
                Access Denied
              </span>
              <h3 className="font-display font-bold text-xl text-slate-100 uppercase">
                Suite is Restricted
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Your current credentials profile does not contain administrative access rights. Please log in as an administrator to proceed.
              </p>
            </div>

            <Link 
              href="/login" 
              className="btn-primary w-full justify-center mt-2"
            >
              <span>Authenticate Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-24 transition-colors duration-400">
      <PageHero 
        title="Admin Control" 
        subtitle="Live administrative suite to publish corporate vacancies and manage career boards."
      />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Navigation & Header strip */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#F5C542] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-[#00C2B2]/20 bg-[#00C2B2]/5 text-[#00C2B2]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">BOARD ADMIN ACTIVE</span>
          </div>
        </div>

        {/* Dynamic Action Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#00C2B2]/10 border border-[#00C2B2]/30 text-slate-200 text-xs font-semibold px-5 py-4 rounded-xl mb-8 flex items-center gap-3"
            >
              <Sparkles className="w-4.5 h-4.5 text-[#F5C542] shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Post Job Form */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="glass-card-static p-6 md:p-8 flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
                  Live Postings
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide mt-1">
                  Publish a Job Opportunity
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Job Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-400 light:text-slate-700">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Voice Advisor"
                    className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#F5C542] outline-none text-xs font-semibold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Department */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-400 light:text-slate-700">
                      Department
                    </label>
                    <select
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#F5C542] outline-none text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <option value="BPO Operations" className="bg-[#0f1729] text-slate-200">BPO Operations</option>
                      <option value="IT & Software" className="bg-[#0f1729] text-slate-200">IT & Software</option>
                      <option value="Digital Marketing" className="bg-[#0f1729] text-slate-200">Digital Marketing</option>
                    </select>
                  </div>

                  {/* Job Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-400 light:text-slate-700">
                      Job Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#F5C542] outline-none text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <option value="Full-Time" className="bg-[#0f1729] text-slate-200">Full-Time</option>
                      <option value="Part-Time" className="bg-[#0f1729] text-slate-200">Part-Time</option>
                      <option value="Contract" className="bg-[#0f1729] text-slate-200">Contract</option>
                      <option value="Internship" className="bg-[#0f1729] text-slate-200">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-400 light:text-slate-700">
                    Location
                  </label>
                  <select
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#F5C542] outline-none text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <option value="Jaipur, IN" className="bg-[#0f1729] text-slate-200">Jaipur, IN</option>
                    <option value="Jaipur (On-site)" className="bg-[#0f1729] text-slate-200">Jaipur (On-site)</option>
                    <option value="Rotational Shift (Jaipur HQ)" className="bg-[#0f1729] text-slate-200">Rotational Shift</option>
                    <option value="Remote (India)" className="bg-[#0f1729] text-slate-200">Remote (India)</option>
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-400 light:text-slate-700">
                    Job Description *
                  </label>
                  <textarea
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={4}
                    placeholder="Describe the opportunity, core responsibilities, and experience requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#F5C542] outline-none text-xs font-semibold transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-3.5 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publishing Posting...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Publish Job Opportunity</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel: Active Jobs List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="glass-card-static p-6 md:p-8 flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
                  Management
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide mt-1">
                  Active Listings ({jobs.length})
                </h3>
              </div>

              <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-1">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border border-white/5 bg-white/2 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#00C2B2]">
                        {job.dept}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-200 uppercase truncate">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#F5C542]" />
                          {job.loc}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#F5C542]" />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(job.id, job.title)}
                      className="shrink-0 p-2 rounded-lg border border-red-500/10 hover:border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all"
                      aria-label="Delete Posting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {jobs.length === 0 && (
                  <div className="text-center py-10 flex flex-col items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-slate-550" />
                    <p className="text-xs text-slate-400 font-medium">No active opportunities found. Use the posting form on the left to add a new job listing.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
