"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { EnquirySchema } from "@/lib/validations";
import { COMPANY_DETAILS, SERVICES } from "@/lib/constants";
import SectionHeading from "../shared/SectionHeading";

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
    defaultValues: { name: "", phone: "", email: "", company: "", serviceInterest: "", message: "" }
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

  const contactItems = [
    { icon: MapPin, label: "Headquarters", value: COMPANY_DETAILS.address, href: undefined, color: "#FF555F" },
    { icon: Phone, label: "Phone", value: COMPANY_DETAILS.phoneDisplay, href: `tel:${COMPANY_DETAILS.phone}`, color: "#4AABCA" },
    { icon: Mail, label: "Email", value: COMPANY_DETAILS.email, href: `mailto:${COMPANY_DETAILS.email}`, color: "#4AABCA" },
    { icon: Clock, label: "Office Hours", value: COMPANY_DETAILS.hours, href: undefined, color: "#64748b" },
  ];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#4AABCA]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Let's Build Solutions"
          title="Request a Strategic Briefing"
          desc="Do you require contract staffing pipelines, custom software transformations or virtual BPO desk support? Fill out the form and our Jaipur executives will compile a custom deliverable matrix."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-14">

          {/* Left: Contact info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors mt-0.5 block leading-relaxed"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mt-0.5 leading-relaxed">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="mt-4 p-5 rounded-2xl bg-white/3 light:bg-slate-100 border border-white/6 light:border-slate-200">
              <div className="text-xs font-bold text-[#4AABCA] uppercase tracking-widest mb-3">Why Contact Us?</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Response within 24 business hours",
                  "Custom proposal tailored to your needs",
                  "No obligation consultation",
                  "Direct access to senior directors",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-400 light:text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF555F] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-5 sm:p-7 md:p-9 relative overflow-hidden">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA] mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] tracking-wide mb-2">
                    Enquiry Delivered!
                  </h3>
                  <p className="text-body-sm max-w-sm">
                    Thank you. We have received your detailed business requirements. Our directors will compile a proposal and contact you via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Full Name <span className="text-[#FF555F]">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Amit Kumar Sharma"
                        className="form-input"
                      />
                      {errors.name && (
                        <span className="text-xs text-red-400 font-medium">{errors.name.message}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Phone Number <span className="text-[#FF555F]">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="e.g. +91 9414940434"
                        className="form-input"
                      />
                      {errors.phone && (
                        <span className="text-xs text-red-400 font-medium">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Email Address <span className="text-[#FF555F]">*</span>
                      </label>
                      <input
                        {...register("email")}
                        placeholder="e.g. clients@sumwayglobal.com"
                        className="form-input"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                        Company / Firm Name
                      </label>
                      <input
                        {...register("company")}
                        placeholder="e.g. Global Tech Inc."
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                      Service of Interest <span className="text-[#FF555F]">*</span>
                    </label>
                    <select
                      {...register("serviceInterest")}
                      className="form-input"
                    >
                      <option value="">Select a Department Target...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="BPO Operations">BPO Operations & Virtual Desks</option>
                      <option value="IT Software Development">IT & Custom Software Development</option>
                      <option value="Digital Marketing">Digital Marketing & SEO Systems</option>
                      <option value="Skill Development">Talent Skill Development Programs</option>
                      <option value="Strategic Board Advisory">Strategic Board Advisory</option>
                    </select>
                    {errors.serviceInterest && (
                      <span className="text-xs text-red-400 font-medium">{errors.serviceInterest.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                      Detailed Requirements <span className="text-[#FF555F]">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Outline your requirements in detail. Mention expected headcount, technical stack, target timelines or support timezones..."
                      className="form-input resize-none"
                    />
                    {errors.message && (
                      <span className="text-xs text-red-400 font-medium">{errors.message.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center mt-2 disabled:opacity-50"
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
