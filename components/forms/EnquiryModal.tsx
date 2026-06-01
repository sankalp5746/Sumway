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
    defaultValues: { name: "", phone: "", email: "", company: "", serviceInterest: "", message: "" }
  });

  useEffect(() => {
    if (selectedService) setValue("serviceInterest", selectedService);
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
            className="fixed inset-0 bg-[#080d1a]/85 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#0f1729] dark:bg-[#0f1729] light:bg-white border border-white/10 p-7 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] z-10"
          >
            {/* Close */}
            <button
              disabled={isSubmitting}
              onClick={closeEnquiry}
              className="absolute top-4 right-4 p-2 rounded-xl border border-white/8 bg-white/4 hover:text-[#F5C542] hover:border-[#F5C542]/25 text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] mb-5">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide mb-2">
                  Enquiry Submitted!
                </h3>
                <p className="text-body-sm max-w-xs">
                  Thank you for contacting Sumway Global. Our recruiting and BPO consultants will email you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="badge-teal">Connect With Us</span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide mt-3">
                    Quick Business Enquiry
                  </h3>
                  <p className="text-body-sm mt-1.5">
                    Submit your requirements below. Our team in Jaipur will get back to you with custom strategies.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Full Name <span className="text-[#F5C542]">*</span>
                      </label>
                      <input {...register("name")} placeholder="e.g. Amit Kumar" className="form-input" />
                      {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Phone Number <span className="text-[#F5C542]">*</span>
                      </label>
                      <input {...register("phone")} placeholder="e.g. +91 9414940434" className="form-input" />
                      {errors.phone && <span className="text-xs text-red-400">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Email Address <span className="text-[#F5C542]">*</span>
                      </label>
                      <input {...register("email")} placeholder="e.g. business@gmail.com" className="form-input" />
                      {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Company Name
                      </label>
                      <input {...register("company")} placeholder="e.g. Sumway Enterprises" className="form-input" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                      Service of Interest <span className="text-[#F5C542]">*</span>
                    </label>
                    <select
                      {...register("serviceInterest")}
                      className="form-input"
                      style={{ background: "#0f1729" }}
                    >
                      <option value="">Select a Service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="BPO Operations">BPO Operations</option>
                      <option value="IT Software Development">IT & Software Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Skill Development">Skill Development</option>
                      <option value="General Corporate Support">General Corporate Support</option>
                    </select>
                    {errors.serviceInterest && <span className="text-xs text-red-400">{errors.serviceInterest.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                      Detailed Message <span className="text-[#F5C542]">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Describe your staffing, BPO, or software outsourcing requirements..."
                      className="form-input resize-none"
                    />
                    {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center mt-2 disabled:opacity-50"
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
