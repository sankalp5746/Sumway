"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { EnquirySchema } from "@/lib/validations";
import { COMPANY_DETAILS, SERVICES } from "@/lib/constants";

type EnquiryFormInput = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  serviceInterest: string;
  message: string;
};

export default function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EnquiryFormInput>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      serviceInterest: "",
      message: ""
    }
  });

  const onSubmit = async (data: EnquiryFormInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0A0F1E] border-t border-[#F5C542]/5">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#00C2B2]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
                Let&apos;s Build Solutions
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-tight mt-3 leading-tight uppercase">
                REQUEST A STRATEGIC <br />
                <span className="text-[#F5C542]">CORPORATE BRIEFING</span>
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-4 leading-relaxed font-medium">
                Do you require contract staffing pipelines, custom software transformations or virtual BPO desk support? Fill out the brief context form, and our Jaipur executives will compile a custom deliverable matrix for your boardroom.
              </p>
            </div>

            {/* Quick Contacts lists */}
            <div className="flex flex-col gap-4 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mt-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#F5C542]/10 border border-[#F5C542]/20 flex items-center justify-center text-[#F5C542] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Headquarters</span>
                  <span className="mt-0.5 leading-relaxed">{COMPANY_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#00C2B2]/10 border border-[#00C2B2]/20 flex items-center justify-center text-[#00C2B2] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Board Phone Line</span>
                  <a href={`tel:${COMPANY_DETAILS.phone}`} className="mt-0.5 hover:text-[#F5C542] transition-colors">
                    {COMPANY_DETAILS.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#00C2B2]/10 border border-[#00C2B2]/20 flex items-center justify-center text-[#00C2B2] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Email Coordinates</span>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="mt-0.5 hover:text-[#F5C542] transition-colors lowercase">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Office Hours</span>
                  <span className="mt-0.5 leading-relaxed">{COMPANY_DETAILS.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 relative overflow-hidden">
              {isSuccess ? (
                /* Success Card Inside Panel */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] mb-4">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide mb-2">
                    Enquiry Delivered!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Thank you. We have received your detailed business requirements. Our directors will compile a proposal and contact you via email shortly.
                  </p>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Your Full Name *</label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Amit Kumar Sharma"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
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
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Email Address *</label>
                      <input
                        {...register("email")}
                        placeholder="e.g. clients@sumwayglobal.com"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Company / Firm Name</label>
                      <input
                        {...register("company")}
                        placeholder="e.g. Global Tech Inc."
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service interest Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Corporate Target Stream *</label>
                    <select
                      {...register("serviceInterest")}
                      className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-[#111827] dark:bg-[#111827] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-850 focus:border-[#F5C542] focus:outline-none transition-colors"
                    >
                      <option value="">Select a Department Target...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="BPO Operations">BPO Operations & Virtual Desks</option>
                      <option value="IT Software Development">IT & Custom Software Development</option>
                      <option value="Digital Marketing">Digital Marketing & SEO Systems</option>
                      <option value="Skill Development">Talent Skill Development Programs</option>
                      <option value="Strategic Board Advisory">Strategic Board Advisory</option>
                    </select>
                    {errors.serviceInterest && (
                      <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceInterest.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Detailed Context / Requirements *</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Outline your requirements in detail. Mention expected headcount, technical stack, target timelines or support timezones..."
                      className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors resize-none"
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 mt-4 py-3.5 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Send Corporate Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
