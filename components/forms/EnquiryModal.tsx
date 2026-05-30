"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { EnquirySchema } from "@/lib/validations";
import { SERVICES } from "@/lib/constants";

type EnquiryFormInput = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  serviceInterest: string;
  message: string;
};

export default function EnquiryModal() {
  const { isEnquiryOpen, selectedService, closeEnquiry } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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

  // Pre-fill service interest when selectedService changes
  useEffect(() => {
    if (selectedService) {
      setValue("serviceInterest", selectedService);
    }
  }, [selectedService, setValue]);

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
        setTimeout(() => {
          setIsSuccess(false);
          reset();
          closeEnquiry();
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit enquiry. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && closeEnquiry()}
            className="fixed inset-0 bg-[#0A0F1E]/80 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#111827] dark:bg-[#111827] light:bg-white border border-[#F5C542]/20 dark:border-[#F5C542]/20 light:border-slate-200 p-6 md:p-8 shadow-2xl backdrop-blur-md z-10"
          >
            {/* Close Button */}
            <button
              disabled={isSubmitting}
              onClick={closeEnquiry}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:text-[#F5C542] hover:border-[#F5C542]/30 text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              /* Success Animation Panel */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] mb-4">
                  <CheckCircle className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide mb-2">
                  Enquiry Submitted!
                </h3>
                <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-xs leading-relaxed">
                  Thank you for contacting Sumway Global. Our recruiting and BPO consultants will email you within 24 hours.
                </p>
              </motion.div>
            ) : (
              /* Form Panel */
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase">
                    Connect With Us
                  </span>
                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide mt-1">
                    Quick Business Enquiry
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1 leading-relaxed">
                    Submit your requirements below. Our team in Jaipur will get back to you with custom strategies.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Full Name *</label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Amit Kumar"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Phone Number *</label>
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
                        placeholder="e.g. business@gmail.com"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Company Name</label>
                      <input
                        {...register("company")}
                        placeholder="e.g. Sumway Enterprises"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Service of Interest *</label>
                    <select
                      {...register("serviceInterest")}
                      className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-[#111827] dark:bg-[#111827] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#F5C542] focus:outline-none transition-colors"
                    >
                      <option value="">Select a Service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="BPO Operations">BPO Operations</option>
                      <option value="IT Software Development">IT & Software Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Skill Development">Skill Development</option>
                      <option value="General Corporate Support">General Corporate Support</option>
                    </select>
                    {errors.serviceInterest && (
                      <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceInterest.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Detailed Message *</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Describe your staffing, BPO, or software outsourcing requirements in detail..."
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
                    className="w-full flex items-center justify-center gap-2 mt-4 py-3 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Requirements</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
