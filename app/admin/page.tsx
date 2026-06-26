"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, Plus, Trash2, ShieldCheck, 
  ArrowLeft, Lock, Loader2, AlertCircle, Sparkles, Building,
  Check, X, Eye, CreditCard, User, FileText, Users
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import PageHero from "@/components/shared/PageHero";

export default function AdminPage() {
  const router = useRouter();
  const { user, jobs, addJob, removeJob } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"careers" | "vendors">("careers");

  // Careers form states
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("BPO Operations");
  const [type, setType] = useState("Full-Time");
  const [loc, setLoc] = useState("Jaipur, IN");
  const [desc, setDesc] = useState("");

  // Vendors state
  const [vendors, setVendors] = useState<any[]>([]);
  const [vendorFilter, setVendorFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // Document preview state
  const [selectedDoc, setSelectedDoc] = useState<{
    label: string;
    filename: string;
    vendorName: string;
    companyName?: string;
    status: string;
    date: string;
  } | null>(null);

  const [notification, setNotification] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Directly sync store user from localStorage on mount to prevent any hydration delay
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("sumway_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && !user) {
            useAppStore.setState({ user: parsed });
          }
        } catch (e) {
          console.error("Error syncing store user on mount:", e);
        }
      }
    }
  }, [user]);

  // Fetch vendors when switching to vendors tab
  useEffect(() => {
    if (mounted && activeTab === "vendors") {
      fetchVendors();
    }
  }, [mounted, activeTab]);

  const fetchVendors = async () => {
    setLoadingVendors(true);
    try {
      const response = await fetch("/api/admin/vendors");
      if (response.ok) {
        const data = await response.json();
        setVendors(data.vendors || []);
      } else {
        console.error("Failed to fetch vendors");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingVendors(false);
    }
  };

  const handleVendorAction = async (email: string, action: "approve" | "reject") => {
    setActionInProgress(email + "-" + action);
    try {
      const response = await fetch("/api/admin/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action })
      });

      if (response.ok) {
        const data = await response.json();
        // Update local list
        setVendors(prev => prev.map(v => {
          if (v.email === email) {
            return { ...v, status: data.status };
          }
          return v;
        }));
        
        setNotification(`Vendor application has been successfully ${action === "approve" ? "approved" : "rejected"}.`);
        setTimeout(() => setNotification(null), 4000);
      } else {
        const err = await response.json().catch(() => ({}));
        alert(err.error || "Action failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setActionInProgress(null);
    }
  };

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

  // Filter vendors based on status dropdown/tabs
  const filteredVendors = vendors.filter(v => {
    if (vendorFilter === "all") return true;
    return v.status === vendorFilter;
  });

  // Hydration safety check
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#4AABCA] animate-spin" />
      </div>
    );
  }

  // Security Role Guard Check (fallback to localStorage on the client to prevent hydration race conditions)
  const localUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("sumway_user") || "null") : null;
  const currentUser = user || localUser;

  if (!currentUser || currentUser.role !== "admin") {
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#FF555F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-[#4AABCA]/20 bg-[#4AABCA]/5 text-[#4AABCA]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">BOARD ADMIN ACTIVE</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-start gap-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-px mb-8 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("careers")}
            className={`pb-4 px-1 cursor-pointer transition-all border-b-2 ${
              activeTab === "careers"
                ? "border-[#FF555F] text-slate-150"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Careers Management
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab("vendors")}
            className={`pb-4 px-1 cursor-pointer transition-all border-b-2 ${
              activeTab === "vendors"
                ? "border-[#4AABCA] text-slate-150"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Vendor Onboarding ({vendors.length})
            </span>
          </button>
        </div>

        {/* Dynamic Action Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#4AABCA]/10 border border-[#4AABCA]/30 text-slate-200 text-xs font-semibold px-5 py-4 rounded-xl mb-8 flex items-center gap-3"
            >
              <Sparkles className="w-4.5 h-4.5 text-[#FF555F] shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "careers" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Panel: Post Job Form */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="glass-card-static p-6 md:p-8 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
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
                      className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#FF555F] outline-none text-xs font-semibold transition-colors"
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
                        className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#FF555F] outline-none text-xs font-semibold transition-colors cursor-pointer"
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
                        className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#FF555F] outline-none text-xs font-semibold transition-colors cursor-pointer"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#FF555F] outline-none text-xs font-semibold transition-colors cursor-pointer"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/4 light:bg-slate-50 border border-white/10 light:border-slate-300 text-slate-100 light:text-slate-900 focus:border-[#FF555F] outline-none text-xs font-semibold transition-colors resize-none leading-relaxed"
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
                  <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">
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
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#4AABCA]">
                          {job.dept}
                        </span>
                        <h4 className="font-display font-bold text-sm text-slate-200 uppercase truncate">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF555F]" />
                            {job.loc}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#FF555F]" />
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(job.id, job.title)}
                        className="shrink-0 p-2 rounded-lg border border-red-500/10 hover:border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all cursor-pointer"
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
        ) : (
          /* Vendor Onboarding Panel */
          <div className="glass-card-static p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#4AABCA] uppercase">Onboarding Queue</span>
                <h3 className="font-display font-extrabold text-xl text-slate-100 uppercase tracking-wide mt-1">
                  Vendor Authorizations ({filteredVendors.length})
                </h3>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap gap-1.5 bg-[#080d1a] p-1 rounded-xl border border-white/5 text-[9px] font-bold uppercase tracking-wider">
                {(["all", "pending", "approved", "rejected"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setVendorFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      vendorFilter === filter
                        ? "bg-[#4AABCA] text-[#0A1128]"
                        : "text-slate-500 hover:text-slate-350"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {loadingVendors ? (
              <div className="text-center py-20 flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-[#4AABCA] animate-spin" />
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Loading onboarding records...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.email}
                    className="glass-card p-6 flex flex-col justify-between gap-5 hover:border-slate-800"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Vendor Header */}
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0">
                          <h4 className="font-display font-bold text-base text-slate-100 uppercase truncate">
                            {vendor.name}
                          </h4>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mt-1.5 inline-block ${
                            vendor.vendorCategory === "b2b" 
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                              : "bg-[#00c2b2]/10 text-[#00c2b2] border border-[#00c2b2]/20"
                          }`}>
                            {vendor.vendorCategory === "b2b" ? "B2B Business" : "B2C Individual"}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                          vendor.status === "pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : vendor.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {vendor.status}
                        </span>
                      </div>

                      {/* Contact Details */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-slate-400 font-semibold border-t border-slate-800/60 pt-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] text-slate-600 uppercase">Email</span>
                          <span className="text-slate-300 truncate" title={vendor.email}>{vendor.email}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] text-slate-600 uppercase">Mobile</span>
                          <span className="text-slate-300">{vendor.mobile}</span>
                        </div>
                        {vendor.vendorCategory === "b2b" ? (
                          <div className="flex flex-col gap-0.5 col-span-2 mt-1">
                            <span className="text-[8px] text-slate-600 uppercase">Firm Registration Name</span>
                            <span className="text-slate-200 font-bold uppercase">{vendor.companyName}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-0.5 col-span-2 mt-1">
                            <span className="text-[8px] text-slate-600 uppercase">Address Proof Document Type</span>
                            <span className="text-slate-200 font-bold uppercase">{vendor.addressProofType}</span>
                          </div>
                        )}
                      </div>

                      {/* Bank Details section */}
                      <div className="bg-[#080d1a] border border-white/3 rounded-xl p-3.5 flex flex-col gap-2.5 text-[10px] font-semibold">
                        <span className="text-[8px] font-bold text-[#4AABCA] uppercase tracking-wider flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5" />
                          Bank Settlement Node
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-slate-400">
                          <div className="flex flex-col">
                            <span className="text-[7px] text-slate-600 uppercase">Bank Name</span>
                            <span className="text-slate-350 truncate">{vendor.bankName}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] text-slate-600 uppercase">Beneficiary Name</span>
                            <span className="text-slate-355 truncate">{vendor.bankAccountName}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] text-slate-600 uppercase">Account Number</span>
                            <span className="text-slate-355 truncate font-mono">{vendor.bankAccountNumber}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] text-slate-600 uppercase">IFSC Code</span>
                            <span className="text-slate-355 font-mono">{vendor.bankIfsc}</span>
                          </div>
                        </div>
                      </div>

                      {/* Documents Upload Section */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          Uploaded Document Assets
                        </span>
                        
                        <div className="flex flex-col gap-1.5">
                          {vendor.vendorCategory === "b2b" ? (
                            <>
                              <button
                                onClick={() => setSelectedDoc({
                                  label: "GST Registration Certificate",
                                  filename: vendor.gstCertificate,
                                  vendorName: vendor.name,
                                  companyName: vendor.companyName,
                                  status: vendor.status,
                                  date: vendor.createdAt
                                })}
                                className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-white/2 hover:border-[#4AABCA]/40 text-slate-300 hover:text-[#4AABCA] transition-colors cursor-pointer text-left"
                              >
                                <span className="truncate">GST Certificate: {vendor.gstCertificate || "N/A"}</span>
                                <Eye className="w-3.5 h-3.5 shrink-0" />
                              </button>
                              
                              <button
                                onClick={() => setSelectedDoc({
                                  label: "MSME Registration Certificate",
                                  filename: vendor.msmeCertificate,
                                  vendorName: vendor.name,
                                  companyName: vendor.companyName,
                                  status: vendor.status,
                                  date: vendor.createdAt
                                })}
                                className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-white/2 hover:border-[#4AABCA]/40 text-slate-300 hover:text-[#4AABCA] transition-colors cursor-pointer text-left"
                              >
                                <span className="truncate">MSME Certificate: {vendor.msmeCertificate || "N/A"}</span>
                                <Eye className="w-3.5 h-3.5 shrink-0" />
                              </button>
                              
                              {vendor.otherDocs && (
                                <button
                                  onClick={() => setSelectedDoc({
                                    label: "Other Business Document",
                                    filename: vendor.otherDocs,
                                    vendorName: vendor.name,
                                    companyName: vendor.companyName,
                                    status: vendor.status,
                                    date: vendor.createdAt
                                  })}
                                  className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-white/2 hover:border-[#4AABCA]/40 text-slate-300 hover:text-[#4AABCA] transition-colors cursor-pointer text-left"
                                >
                                  <span className="truncate">Other Docs: {vendor.otherDocs}</span>
                                  <Eye className="w-3.5 h-3.5 shrink-0" />
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() => setSelectedDoc({
                                label: `Address Proof (${vendor.addressProofType?.toUpperCase()})`,
                                filename: vendor.addressProofFile,
                                vendorName: vendor.name,
                                status: vendor.status,
                                date: vendor.createdAt
                              })}
                              className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-white/2 hover:border-[#4AABCA]/40 text-slate-300 hover:text-[#4AABCA] transition-colors cursor-pointer text-left"
                            >
                              <span className="truncate">Address Proof: {vendor.addressProofFile || "N/A"}</span>
                              <Eye className="w-3.5 h-3.5 shrink-0" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Operational Action Buttons */}
                    {vendor.status === "pending" && (
                      <div className="flex gap-3 mt-4 border-t border-slate-800/50 pt-4">
                        <button
                          disabled={actionInProgress !== null}
                          onClick={() => handleVendorAction(vendor.email, "reject")}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          {actionInProgress === vendor.email + "-reject" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <X className="w-3.5 h-3.5" />
                          )}
                          Reject
                        </button>
                        
                        <button
                          disabled={actionInProgress !== null}
                          onClick={() => handleVendorAction(vendor.email, "approve")}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 hover:opacity-90 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none"
                        >
                          {actionInProgress === vendor.email + "-approve" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          Approve Gateway
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {filteredVendors.length === 0 && (
                  <div className="col-span-2 text-center py-16 flex flex-col items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-slate-550" />
                    <p className="text-xs text-slate-400 font-medium">No vendor onboarding requests found matching the filter selection.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Simulated Document Viewer Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="absolute inset-0 bg-[#0A1128]/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-card p-6 md:p-8 overflow-hidden shadow-2xl z-10 border border-slate-700 bg-[#0E1628]/95 text-left flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[8px] font-bold text-[#4AABCA] uppercase tracking-widest">Document Registry Inspector</span>
                  <h3 className="font-display font-extrabold text-base text-slate-100 uppercase tracking-wide mt-0.5">
                    {selectedDoc.label}
                  </h3>
                </div>
                
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Simulated Document Layout */}
              <div className="relative border-4 border-double border-slate-800 bg-[#060a14] rounded-xl p-8 min-h-[320px] flex flex-col justify-between overflow-hidden">
                {/* Watermark Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,171,202,0.02),transparent_60%)] pointer-events-none" />
                
                {/* Giant Stamp Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-3 border-4 border-dashed border-[#4AABCA] rounded-full w-56 h-56 flex items-center justify-center pointer-events-none">
                  <span className="font-display font-black text-xs text-[#4AABCA] uppercase tracking-widest text-center select-none rotate-12">
                    SUMWAY GLOBAL<br/>SECURE PORTAL
                  </span>
                </div>

                {/* Crest & Header */}
                <div className="flex justify-between items-start border-b border-slate-900 pb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-[#FF555F]/20 text-[#FF555F]">
                      <Building className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-[10px] text-slate-200 tracking-wider">SUMWAY GLOBAL</span>
                      <span className="text-[7px] text-[#4AABCA] font-bold uppercase tracking-widest">Operations Auditing Node</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wide block">System Document ID</span>
                    <span className="text-[8px] font-mono text-slate-400 font-bold">SWG-DOC-${Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>

                {/* Certificate content */}
                <div className="py-6 flex flex-col gap-4 text-center relative z-10">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF555F]">
                    Onboarding Asset Validation
                  </span>
                  
                  <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto font-medium">
                    This certifies that a document file designated as <strong className="text-slate-200">{selectedDoc.filename}</strong> has been uploaded by B2B/B2C Candidate <strong className="text-slate-100 uppercase">{selectedDoc.vendorName}</strong> ${selectedDoc.companyName ? `(${selectedDoc.companyName})` : ""} and checked by the Sumway Global Security Board.
                  </p>

                  <div className="mt-4 flex justify-center gap-4 text-[9px] font-semibold text-slate-500">
                    <div>
                      <span className="block text-[7px] text-slate-650 uppercase">Date Uploaded</span>
                      <span className="text-slate-350">{new Date(selectedDoc.date || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <div className="border-l border-slate-800 pl-4">
                      <span className="block text-[7px] text-slate-650 uppercase">Security Check</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        MD5 CHECK SUM OK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stamped Seal */}
                <div className="flex justify-between items-end border-t border-slate-900 pt-4 relative z-10">
                  <div className="text-left text-[8px] font-mono text-slate-500">
                    <span>SECURITY HASH: 7fc8d09e51c86e241bc389ab</span>
                  </div>
                  
                  {/* Circular Seal */}
                  <div className={`border-2 border-double rounded-lg px-2 py-1 rotate-[-8deg] ${
                    selectedDoc.status === "approved"
                      ? "border-emerald-500 text-emerald-500 bg-emerald-500/5"
                      : "border-amber-500 text-amber-500 bg-amber-500/5"
                  } text-[8px] font-bold uppercase tracking-widest font-display`}>
                    {selectedDoc.status === "approved" ? "Verified & Valid" : "Audit Pending"}
                  </div>
                </div>
              </div>

              {/* Close controls */}
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-6 py-2.5 rounded-lg border border-slate-700 bg-transparent text-slate-300 hover:text-slate-100 font-bold uppercase tracking-wider text-center text-[10px] cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
