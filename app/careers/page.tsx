"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, Tag, ArrowRight, CheckCircle, ShieldAlert, Award, Star, ArrowUp, ArrowDown, Plus, Trash2, X, Loader2, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/lib/store";
import PageHero from "@/components/shared/PageHero";

const benefits = [
  { title: "Prime OfficeHQ JLN Marg", desc: "Work in the state-of-the-art Jaipur Stock Exchange Building.", icon: MapPin },
  { title: "Medical Health Plans", desc: "Comprehensive health insurance coverage for you and your family.", icon: CheckCircle },
  { title: "Continuous Mentoring", desc: "Get direct operational training and structural advisory from the board.", icon: Award },
  { title: "Performance Incentives", desc: "Generous golden incentives matching performance achievements.", icon: Star },
  { title: "Zone Shift Allowances", desc: "Rotational shift bonuses for BPO voice and support desks.", icon: Clock },
  { title: "Work-Life Integration", desc: "High scheduling flexibility to balance family and professional goals.", icon: Tag }
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const { user, jobs, setJobs, addJob, removeJob } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Add vacancy modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("BPO Operations");
  const [newType, setNewType] = useState("Full-Time");
  const [newLoc, setNewLoc] = useState("Jaipur, IN");
  const [newDesc, setNewDesc] = useState("");
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  useEffect(() => {
    setMounted(true);
    const localJobs = localStorage.getItem("sumway_jobs");
    if (localJobs) {
      setJobs(JSON.parse(localJobs));
    }
  }, [setJobs]);

  const moveJob = (index: number, direction: "up" | "down") => {
    const newJobs = [...jobs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newJobs.length) {
      const temp = newJobs[index];
      newJobs[index] = newJobs[targetIndex];
      newJobs[targetIndex] = temp;
      setJobs(newJobs);
    }
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove the job opportunity "${title}"?`)) {
      removeJob(id);
    }
  };

  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) {
      alert("Please fill out all required fields.");
      return;
    }
    setIsSubmittingJob(true);
    setTimeout(() => {
      const newJob = {
        id: `job-${Date.now()}`,
        title: newTitle,
        dept: newDept,
        type: newType,
        loc: newLoc,
        desc: newDesc
      };
      addJob(newJob);
      
      setNewTitle("");
      setNewDesc("");
      setIsAddModalOpen(false);
      setIsSubmittingJob(false);
    }, 800);
  };

  const departments = ["All", "BPO Operations", "IT & Software", "Digital Marketing"];

  const filteredJobs = activeDept === "All" 
    ? jobs 
    : jobs.filter(job => job.dept === activeDept);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#4AABCA] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Careers & Culture" 
        subtitle="We are growing! Partner with our Jaipur teams and unlock your professional limits."
      />

      {/* Benefits / Work Culture Section */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
            Workplace Perks
          </span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
            WHY ASSOCIATE WITH SUMWAY?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div 
                key={b.title}
                className="glass-card p-6 flex flex-col gap-4 hover:border-[#4AABCA]/20"
              >
                <div className="w-10 h-10 rounded-lg bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-bold text-base text-slate-100 uppercase">
                    {b.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Current Openings with Live Filter */}
      <section className="py-16 md:py-24 bg-[#0E1628] dark:bg-[#0E1628] light:bg-slate-200 border-t border-[#FF555F]/5 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
              Current Openings
            </span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight uppercase mt-3">
              EXPLORE ACTIVE VACANCIES
            </h2>
          </div>

          {/* Admin Inline Control Panel Toolbar */}
          {user && user.role === "admin" && (
            <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl border border-[#4AABCA]/20 bg-[#4AABCA]/5 text-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#4AABCA]" />
                <div className="text-left">
                  <span className="text-[9px] font-bold tracking-widest text-[#4AABCA] uppercase block">Administrative Control Panel</span>
                  <h4 className="font-display font-bold text-xs uppercase text-slate-200 mt-0.5">Logged in as Administrator</h4>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary py-2 px-4 text-xs tracking-wider flex items-center gap-1.5 border-none"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Vacancy
              </button>
            </div>
          )}

          {/* Department Filter Controls */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {departments.map((dept) => {
              const isSelected = activeDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-[#FF555F] text-[#0A1128] shadow-md" 
                        : "bg-[#111827] dark:bg-[#111827] light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-slate-200"
                    }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Jobs Listing grid */}
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#4AABCA]/20"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#4AABCA]">
                      {job.dept}
                    </span>
                    <h3 className="font-display font-extrabold text-base md:text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xl font-medium mt-1 leading-relaxed">
                      {job.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-semibold mt-2.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FF555F]" />
                        <span>{job.loc}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF555F]" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Reorder & Delete controls or Apply Now link */}
                  {(() => {
                    const originalIndex = jobs.findIndex(j => j.id === job.id);
                    const isFirst = originalIndex === 0;
                    const isLast = originalIndex === jobs.length - 1;

                    return user && user.role === "admin" ? (
                      <div className="flex items-center gap-2 mt-4 md:mt-0 shrink-0 w-full md:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => moveJob(originalIndex, "up")}
                          disabled={isFirst}
                          className="p-2.5 rounded-lg border border-slate-700 bg-white/5 hover:border-[#4AABCA] hover:bg-[#4AABCA]/5 text-slate-350 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-slate-700 transition-all cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveJob(originalIndex, "down")}
                          disabled={isLast}
                          className="p-2.5 rounded-lg border border-slate-700 bg-white/5 hover:border-[#4AABCA] hover:bg-[#4AABCA]/5 text-slate-350 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-slate-700 transition-all cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-2.5 rounded-lg border border-red-500/10 hover:border-red-500/35 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                          title="Delete Vacancy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                        <Link
                          href={`/careers/apply/${job.id}`}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#FF555F] text-[#0A1128] text-xs font-bold uppercase tracking-wider hover:bg-[#FF555F]/90 active:scale-95 transition-all shadow-md"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    );
                  })()}
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 glass-card p-6">
                <ShieldAlert className="w-8 h-8 text-slate-650 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No open positions found in this department. Please select another filter or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Vacancy Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-[#0A1128]/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-card p-6 md:p-8 overflow-hidden shadow-2xl z-10 border border-slate-700 bg-[#0E1628]/95 text-left"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-widest">Administrative Control</span>
                  <h3 className="font-display font-extrabold text-lg text-slate-100 uppercase tracking-wide mt-0.5">Add Opportunity</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddJobSubmit} className="space-y-4 text-xs font-semibold">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 dark:text-slate-350 light:text-slate-750 font-bold">Opportunity Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Senior Operations Executive"
                    className="form-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Department */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-350 light:text-slate-750 font-bold">Department *</label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-[#111827] text-slate-100 focus:border-[#4AABCA] focus:outline-none transition-colors text-xs font-semibold cursor-pointer"
                    >
                      <option value="BPO Operations" className="bg-[#0f1729] text-slate-200">BPO Operations</option>
                      <option value="IT & Software" className="bg-[#0f1729] text-slate-200">IT & Software</option>
                      <option value="Digital Marketing" className="bg-[#0f1729] text-slate-200">Digital Marketing</option>
                    </select>
                  </div>

                  {/* Job Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-355 light:text-slate-755 font-bold">Job Type *</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-[#111827] text-slate-100 focus:border-[#4AABCA] focus:outline-none transition-colors text-xs font-semibold cursor-pointer"
                    >
                      <option value="Full-Time" className="bg-[#0f1729] text-slate-200">Full-Time</option>
                      <option value="Part-Time" className="bg-[#0f1729] text-slate-200">Part-Time</option>
                      <option value="Contract" className="bg-[#0f1729] text-slate-200">Contract</option>
                      <option value="Internship" className="bg-[#0f1729] text-slate-200">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 dark:text-slate-350 light:text-slate-755 font-bold">Location *</label>
                  <select
                    value={newLoc}
                    onChange={(e) => setNewLoc(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-[#111827] text-slate-100 focus:border-[#4AABCA] focus:outline-none transition-colors text-xs font-semibold cursor-pointer"
                  >
                    <option value="Jaipur, IN" className="bg-[#0f1729] text-slate-200">Jaipur, IN</option>
                    <option value="Jaipur (On-site)" className="bg-[#0f1729] text-slate-200">Jaipur (On-site)</option>
                    <option value="Rotational Shift (Jaipur HQ)" className="bg-[#0f1729] text-slate-200">Rotational Shift</option>
                    <option value="Remote (India)" className="bg-[#0f1729] text-slate-200">Remote (India)</option>
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 dark:text-slate-350 light:text-slate-755 font-bold">Job Description *</label>
                  <textarea
                    required
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={4}
                    placeholder="Provide details about role responsibilities, deliverables, and candidate requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 focus:border-[#4AABCA] focus:outline-none transition-colors resize-none leading-relaxed font-semibold text-xs"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3.5 rounded-lg border border-slate-700 bg-transparent text-slate-300 hover:text-slate-100 uppercase tracking-wider font-bold text-center transition-all cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingJob}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#FF555F] text-[#0A1128] font-bold uppercase tracking-wider hover:bg-[#FF555F]/90 active:scale-95 disabled:opacity-50 transition-all cursor-pointer border-none text-xs"
                  >
                    {isSubmittingJob ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Publish vacancy</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
