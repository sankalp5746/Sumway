"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Send, CheckCircle, Loader2, Phone, 
  Mail, MapPin, Clock, MessageSquareText, Calendar 
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { ContactSchema } from "@/lib/validations";
import { COMPANY_DETAILS } from "@/lib/constants";

type ContactFormInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackTime, setCallbackTime] = useState("");
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xwleooww", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallbackRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone || !callbackTime) {
      alert("Please fill out both phone and preferred time.");
      return;
    }
    setCallbackSuccess(true);
    setTimeout(() => {
      setCallbackSuccess(false);
      setCallbackPhone("");
      setCallbackTime("");
    }, 5000);
  };

  return (
    <div className="bg-transparent transition-colors duration-400">
      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with our recruiting board, BPO desk heads and software directors."
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form & Callbacks */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Contact Form panel */}
            <div className="glass-card p-6 md:p-8">
              {isSuccess ? (
                /* Success Card */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA] mb-4">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 uppercase tracking-wide mb-2">
                    Message Delivered!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Thank you. We have received your detailed contact request. Our Jaipur Stock Exchange directors will audit your message and email you within 24 hours.
                  </p>
                </div>
              ) : (
                /* Form Inputs */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-semibold">
                  <div className="mb-6">
                    <span className="badge-teal">Drop a Message</span>
                    <h3 className="font-display font-extrabold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-3">
                      Direct Board Inquiry
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Full Name <span className="text-[#FF555F]">*</span></label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Amit Kumar"
                        className="form-input"
                      />
                      {errors.name && (
                        <span className="text-xs text-red-400 font-medium">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Phone Number <span className="text-[#FF555F]">*</span></label>
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

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Email Address <span className="text-[#FF555F]">*</span></label>
                    <input
                      {...register("email")}
                      placeholder="e.g. support@sumwayglobal.com"
                      className="form-input"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Subject <span className="text-[#FF555F]">*</span></label>
                    <input
                      {...register("subject")}
                      placeholder="e.g. Virtual Assistant staffing requirements..."
                      className="form-input"
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-400 font-medium">{errors.subject.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Detailed Message <span className="text-[#FF555F]">*</span></label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Type your message or custom operational guidelines in detail..."
                      className="form-input resize-none"
                    />
                    {errors.message && (
                      <span className="text-xs text-red-400 font-medium">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Send Board Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Quick Callback Request */}
            <div className="glass-card p-6 md:p-8">
              <span className="badge-teal">Quick Scheduler</span>
              <h3 className="font-display font-extrabold text-lg text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-2">
                Request a Callback
              </h3>
              
              {callbackSuccess ? (
                <div className="p-4 rounded-lg bg-[#4AABCA]/5 border border-[#4AABCA]/10 mt-4 flex items-center gap-2 text-xs font-semibold text-[#4AABCA]">
                  <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>Callback scheduled! Our advisors will call you at your preferred time.</span>
                </div>
              ) : (
                <form onSubmit={handleCallbackRequest} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mt-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Phone Number *</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 9414940434"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Preferred Time *</label>
                    <input
                      type="text"
                      placeholder="e.g. 4:00 PM Today"
                      value={callbackTime}
                      onChange={(e) => setCallbackTime(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#4AABCA] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#4AABCA]/90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Call</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps & Office Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contacts details */}
            <div className="glass-card p-6 md:p-8 flex flex-col gap-5 text-xs font-semibold">
              <h4 className="text-[10px] font-bold text-[#4AABCA] uppercase tracking-widest">
                Office HQ Coordinates
              </h4>

              <div className="flex gap-3.5 items-start text-slate-300 dark:text-slate-300 light:text-slate-700">
                <MapPin className="w-5 h-5 text-[#FF555F] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Headquarters</span>
                  <span className="mt-0.5 leading-relaxed">{COMPANY_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-start text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Phone className="w-5 h-5 text-[#FF555F] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Direct Call Lines</span>
                  <a href={`tel:${COMPANY_DETAILS.phone}`} className="mt-0.5 hover:text-[#FF555F] transition-colors">
                    {COMPANY_DETAILS.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5 items-start text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Mail className="w-5 h-5 text-[#FF555F] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Email Coordinates</span>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="mt-0.5 hover:text-[#FF555F] transition-colors lowercase">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5 items-start text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Clock className="w-5 h-5 text-[#FF555F] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Office Hours</span>
                  <span className="mt-0.5 leading-relaxed">{COMPANY_DETAILS.hours}</span>
                </div>
              </div>
            </div>

            {/* Google Maps Iframe Embed */}
            <div className="glass-card overflow-hidden p-1.5 h-80 rounded-2xl relative shadow-2xl">
              <iframe
                title="Sumway Global Management Jaipur Stock Exchange Office Location Map"
                src={COMPANY_DETAILS.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl grayscale-[90%] invert-[90%] contrast-[110%] hover:grayscale-0 hover:invert-0 hover:contrast-100 transition-all duration-700"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
