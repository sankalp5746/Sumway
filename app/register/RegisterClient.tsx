"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User, Loader2, UserPlus } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { RegisterSchema } from "@/lib/validations";
import { useAppStore } from "@/lib/store";

type RegisterFormInput = {
  role: "client" | "candidate" | "vendor";
  name: string;
  mobile: string;
  email: string;
  password: string;
  companyName?: string;
  serviceRequirement?: string;
  skills?: string;
  experience?: string;
  businessType?: string;
  gstNumber?: string;
};

export default function RegisterClient() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeRole, setActiveRole] = useState<"client" | "candidate" | "vendor">("candidate");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: "candidate",
      name: "",
      mobile: "",
      email: "",
      password: "",
      companyName: "",
      serviceRequirement: "",
      skills: "",
      experience: "",
      businessType: "",
      gstNumber: ""
    }
  });

  const handleRoleChange = (role: "client" | "candidate" | "vendor") => {
    setActiveRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data: RegisterFormInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
        login({
          name: data.name,
          email: data.email,
          role: data.role,
          companyName: data.companyName,
          skills: data.skills,
          businessType: data.businessType
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        alert("Registration failed. Please check inputs.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen pb-16 transition-colors duration-400">
      <PageHero 
        title="Gateway Registration" 
        subtitle="Create your secure gateway account and configure your project workspace."
      />

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Premium Branding & Stats Showcase (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-2xl bg-gradient-to-br from-[#111827] dark:from-[#111827] light:from-white to-[#0A0F1E] dark:to-[#0A0F1E] light:to-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors duration-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(0,194,178,0.05),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,197,66,0.05),transparent_70%)] pointer-events-none" />

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-widest text-[#F5C542] uppercase bg-[#F5C542]/10 px-3.5 py-1.5 rounded-md border border-[#F5C542]/10 self-start">
                Enterprise Placement
              </span>
              <h3 className="font-display font-extrabold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide leading-snug">
                Join our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2B2] via-[#F5C542] to-[#00C2B2] bg-300% animate-mesh" style={{ backgroundSize: "300% 300%" }}>
                  Global Network
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Register as a Client, Candidate, or Business Vendor. Unlock automated shift schedules, corporate helpdesk setups, and secure operational compliance layers integrated with the JLN Marg Stock Exchange building directory.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-800/80 pt-6 mt-8">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Global Workforce</span>
                <span className="text-[#00C2B2]">Vetted Experts</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Statutory Audits</span>
                <span className="text-[#F5C542]">100% Tax Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card Panel */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00C2B2]/5 to-transparent rounded-bl-full pointer-events-none" />
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] mb-4">
                    <UserPlus className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide mb-2">
                    Registration Complete!
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                    Welcome to Sumway Global. We have created your secure credentials, registered your workspace, and are redirecting you...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <span className="text-[9px] font-bold text-[#00C2B2] uppercase tracking-widest">Gateway Signup</span>
                    <h3 className="font-display font-extrabold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-1">CREATE ACCOUNT</h3>
                  </div>

                  {/* Multi-role tab controls */}
                  <div className="flex justify-between gap-1 p-1 bg-[#0A0F1E] rounded-lg border border-slate-800 mb-6 text-[9px] font-bold uppercase tracking-wider">
                    {(["client", "candidate", "vendor"] as const).map((r) => {
                      const isSelected = activeRole === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleRoleChange(r)}
                          className={`flex-1 text-center py-2.5 rounded transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-[#00C2B2] text-[#0A0F1E]" 
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-semibold">
                    <input type="hidden" {...register("role")} />

                    {/* Common Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold">Your Full Name *</label>
                      <div className="relative">
                        <input
                          {...register("name")}
                          placeholder="e.g. Amit Kumar Sharma"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                        />
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Common Mobile */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold">Mobile Coordinate *</label>
                      <div className="relative">
                        <input
                          {...register("mobile")}
                          placeholder="e.g. +91 9414940434"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                        />
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {errors.mobile && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.mobile.message}</span>
                      )}
                    </div>

                    {/* Common Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold">Email Address *</label>
                      <div className="relative">
                        <input
                          {...register("email")}
                          placeholder="e.g. workspace@sumway.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                        />
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Common Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold">Password Code *</label>
                      <div className="relative">
                        <input
                          type="password"
                          {...register("password")}
                          placeholder="Min 6 characters..."
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                        />
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {errors.password && (
                        <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.password.message}</span>
                      )}
                    </div>

                    {/* Client Fields */}
                    {activeRole === "client" && (
                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <span className="text-[9px] font-bold text-[#F5C542] uppercase tracking-wider">Client Corporate Setup</span>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Company Name *</label>
                          <input
                            {...register("companyName")}
                            placeholder="e.g. Apex Retail Inc."
                            className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                          />
                          {errors.companyName && (
                            <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyName.message}</span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Primary Hiring Service Requirement *</label>
                          <select
                            {...register("serviceRequirement")}
                            className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-[#111827] dark:bg-[#111827] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#00C2B2] focus:outline-none transition-colors"
                          >
                            <option value="">Select Service Target...</option>
                            <option value="Staffing">Staffing Placement</option>
                            <option value="RPO">End-to-End RPO</option>
                            <option value="BPO Support">BPO Voice/Chat Support</option>
                            <option value="Custom IT Dev">Custom IT Software Development</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Candidate Fields */}
                    {activeRole === "candidate" && (
                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <span className="text-[9px] font-bold text-[#F5C542] uppercase tracking-wider">Candidate Skill Portfolio</span>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Target Skills *</label>
                          <input
                            {...register("skills")}
                            placeholder="e.g. Next.js, BPO voice, Customer care, SEO keywords"
                            className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Years of Experience *</label>
                          <select
                            {...register("experience")}
                            className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-[#111827] dark:bg-[#111827] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#00C2B2] focus:outline-none transition-colors"
                          >
                            <option value="">Select Experience Level...</option>
                            <option value="Fresher">Fresher (Skill trainees)</option>
                            <option value="1-2 Years">1 - 2 Years</option>
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5+ Years">5+ Years Senior Board</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Vendor Fields */}
                    {activeRole === "vendor" && (
                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <span className="text-[9px] font-bold text-[#F5C542] uppercase tracking-wider">Vendor Business Register</span>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">Business / Service Type *</label>
                          <input
                            {...register("businessType")}
                            placeholder="e.g. Consulting, Hardware Supplier, IT Services"
                            className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700">GST Number Coordinate *</label>
                          <input
                            {...register("gstNumber")}
                            placeholder="e.g. 08AAAAA0000A1Z1 (Rajasthan)"
                            className="px-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                          />
                          {errors.gstNumber && (
                            <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.gstNumber.message}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 mt-6 py-3.5 rounded-lg bg-[#F5C542] text-[#0A0F1E] font-bold text-xs uppercase tracking-wider hover:bg-[#F5C542]/90 hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4.5 h-4.5 animate-spin" />
                          <span>Creating Portal Credentials...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4.5 h-4.5" />
                          <span>Register Secure Gateway</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Redirect to login */}
                  <div className="text-center mt-6 text-[10px] text-slate-500">
                    <span>Already have a corporate profile? </span>
                    <Link href="/login" className="text-[#F5C542] hover:text-[#00C2B2] font-bold underline">
                      Login Portal
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
