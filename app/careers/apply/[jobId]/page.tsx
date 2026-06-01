"use client";

import React, { use, useState } from "react";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CheckCircle, ArrowLeft, Send, 
  Loader2, Briefcase, MapPin, Clock, Tag 
} from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import { JOBS } from "@/lib/constants";
import { JobApplicationSchema } from "@/lib/validations";

type JobAppFormInput = {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  linkedinUrl?: string;
};

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default function ApplyJobPage({ params }: PageProps) {
  const { jobId } = use(params);
  const job = JOBS.find((j) => j.id === jobId);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<JobAppFormInput>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
      linkedinUrl: ""
    }
  });

  if (!job) {
    notFound();
  }

  const onSubmit = async (data: JobAppFormInput) => {
    setIsSubmitting(true);
    try {
      // Simulate file upload or direct email payload deliverability
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, jobId: job.id, jobTitle: job.title })
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        alert("Application failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title={`Apply: ${job.title}`} 
        subtitle={`Join the ${job.dept} team inside our Malviya Nagar Jaipur headquarters.`}
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/careers" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#F5C542] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Openings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Job Description Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 md:p-8">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#00C2B2]">
                {job.dept}
              </span>
              <h2 className="font-display font-extrabold text-lg md:text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-2">
                {job.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-semibold mt-3.5 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F5C542]" />
                  <span>{job.loc}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F5C542]" />
                  <span>{job.type}</span>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 uppercase">Role Description</h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">
                  {job.desc}
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 uppercase">Role Prerequisites</h4>
                <ul className="flex flex-col gap-2.5 mt-3 text-[10px] font-semibold text-slate-300">
                  {job.reqs.map((req: string, idx: number) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2B2] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form Grid */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 relative overflow-hidden">
              {isSuccess ? (
                /* Success Card Display */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] mb-4">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide mb-2">
                    Application Delivered!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Thank you. Your curriculum vitae and cover details have successfully been submitted. Our HR consulting board will audit your profile and email you within 48 hours.
                  </p>
                </div>
              ) : (
                /* Application form inputs */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-semibold">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-[#00C2B2] uppercase tracking-widest">
                      Apply Today
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-1">
                      SUBMIT YOUR DOSSIER
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Your Full Name *</label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Amit Kumar Sharma"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Phone Coordinate *</label>
                      <input
                        {...register("phone")}
                        placeholder="e.g. +91 9414940434"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Email Address *</label>
                    <input
                      {...register("email")}
                      placeholder="e.g. candidates@gmail.com"
                      className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#F5C542] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.email.message}</span>
                    )}
                  </div>

                  {/* LinkedIn */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">LinkedIn URL Profile</label>
                    <input
                      {...register("linkedinUrl")}
                      placeholder="e.g. https://linkedin.com/in/username"
                      className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#F5C542] focus:outline-none transition-colors"
                    />
                    {errors.linkedinUrl && (
                      <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.linkedinUrl.message}</span>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Cover Pitch / Introduction *</label>
                    <textarea
                      {...register("coverLetter")}
                      rows={5}
                      placeholder="Introduce yourself. Highlight key projects, CRM tools, React experience, BPO support roles or scheduling availabilities..."
                      className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#F5C542] focus:outline-none transition-colors resize-none"
                    />
                    {errors.coverLetter && (
                      <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.coverLetter.message}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 mt-4 py-3.5 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Deliver Job Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
