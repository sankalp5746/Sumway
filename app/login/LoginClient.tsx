"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Loader2, UserCheck } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { LoginSchema } from "@/lib/validations";
import { useAppStore } from "@/lib/store";

type LoginFormInput = {
  role: "client" | "candidate" | "vendor" | "admin";
  email: string;
  password: string;
};

export default function LoginClient() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeRole, setActiveRole] = useState<"client" | "candidate" | "vendor" | "admin">("candidate");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      role: "candidate",
      email: "",
      password: ""
    }
  });

  const handleRoleChange = (role: "client" | "candidate" | "vendor" | "admin") => {
    setActiveRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data: LoginFormInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
        login({
          name: data.email.split("@")[0].toUpperCase(),
          email: data.email,
          role: data.role
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        alert("Authentication failed. Please verify credentials.");
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
        title="Gateway Access" 
        subtitle="Access your dedicated BPO dashboard, Candidate portfolio, or Vendor files."
      />

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Premium Branding & Stats Showcase (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-2xl bg-gradient-to-br from-[#111827] dark:from-[#111827] light:from-white to-[#0A0F1E] dark:to-[#0A0F1E] light:to-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors duration-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,197,66,0.05),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(0,194,178,0.05),transparent_70%)] pointer-events-none" />

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-widest text-[#00C2B2] uppercase bg-[#00C2B2]/10 px-3.5 py-1.5 rounded-md border border-[#00C2B2]/10 self-start">
                Corporate Gateway
              </span>
              <h3 className="font-display font-extrabold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide leading-snug">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C542] via-[#00C2B2] to-[#F5C542] bg-300% animate-mesh" style={{ backgroundSize: "300% 300%" }}>
                  Secure Ecosystems
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Log into your personalized corporate operations board. Manage active virtual assistance desks, check commercial staffing timelines, and access secure cloud servers with high operational compliance.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-800/80 pt-6 mt-8">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Corporate SLA</span>
                <span className="text-[#00C2B2]">99.8% Retained</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Global Operations</span>
                <span className="text-[#F5C542]">Active 24/7/365</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card Panel */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F5C542]/5 to-transparent rounded-bl-full pointer-events-none" />
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] mb-4">
                    <UserCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase tracking-wide mb-2">
                    Access Granted!
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                    Welcome back. We are fetching your profile credentials and redirecting you to your board dashboard...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <span className="badge-teal">Secure Entry</span>
                    <h3 className="font-display font-extrabold text-2xl text-slate-100 dark:text-slate-100 light:text-[#0F172A] uppercase mt-3">Log Into Portal</h3>
                  </div>

                  {/* Multi-role tab controls */}
                  <div className="flex flex-wrap justify-between gap-1 p-1.5 bg-[#080d1a] rounded-xl border border-white/6 mb-6 text-xs font-bold uppercase tracking-wider">
                    {(["client", "candidate", "vendor", "admin"] as const).map((r) => {
                      const isSelected = activeRole === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleRoleChange(r)}
                          className={`flex-1 text-center py-2.5 rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#F5C542] text-[#0A0F1E] shadow-md"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <input type="hidden" {...register("role")} />

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Email Address <span className="text-[#F5C542]">*</span></label>
                      <div className="relative">
                        <input
                          {...register("email")}
                          placeholder="e.g. administrator@sumway.com"
                          className="form-input pl-10"
                        />
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {errors.email && (
                        <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Password <span className="text-[#F5C542]">*</span></label>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); alert("OTP code sent to email."); }}
                          className="text-xs text-slate-500 hover:text-[#F5C542] transition-colors"
                        >
                          Forgot?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          {...register("password")}
                          placeholder="Type password..."
                          className="form-input pl-10"
                        />
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {errors.password && (
                        <span className="text-xs text-red-400 font-medium">{errors.password.message}</span>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center mt-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4.5 h-4.5 animate-spin" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4.5 h-4.5" />
                          <span>Authenticate Access</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Redirect to register */}
                  <div className="text-center mt-6 text-sm text-slate-500">
                    <span>Don&apos;t have an account? </span>
                    <Link href="/register" className="text-[#00C2B2] hover:text-[#F5C542] font-bold transition-colors">
                      Register Gateway
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
