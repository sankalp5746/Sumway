"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User, Loader2, UserPlus, UploadCloud, CheckCircle2, Trash2, CreditCard, Building, FileText } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { RegisterSchema } from "@/lib/validations";
import { useAppStore } from "@/lib/store";

type RegisterFormInput = {
  role: "vendor" | "admin";
  name: string;
  mobile: string;
  email: string;
  password: string;
  
  // Admin specific
  adminPasskey?: string;

  // Vendor Category
  vendorCategory?: "b2b" | "b2c";
  companyName?: string;
  
  // B2B specific documents
  gstCertificate?: string;
  msmeCertificate?: string;
  otherDocs?: string;
  
  // B2C specific documents
  addressProofType?: "aadhaar" | "voter_id" | "pan" | "other";
  addressProofFile?: string;
  
  // Bank Account details
  bankName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankAccountName?: string;
};

export default function RegisterClient() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeRole, setActiveRole] = useState<"vendor" | "admin">("vendor");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: "vendor",
      name: "",
      mobile: "",
      email: "",
      password: "",
      adminPasskey: "",
      companyName: "",
      vendorCategory: undefined,
      gstCertificate: "",
      msmeCertificate: "",
      otherDocs: "",
      addressProofType: undefined,
      addressProofFile: "",
      bankName: "",
      bankAccountNumber: "",
      bankIfsc: "",
      bankAccountName: ""
    }
  });

  const handleRoleChange = (role: "vendor" | "admin") => {
    setActiveRole(role);
    setValue("role", role);
  };

  const handleVendorCategoryChange = (category: "b2b" | "b2c") => {
    setValue("vendorCategory", category, { shouldValidate: true });
  };

  const activeVendorCategory = watch("vendorCategory");

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
        const userObj = {
          name: data.name,
          email: data.email,
          role: data.role,
          companyName: data.companyName || data.bankAccountName || "",
          skills: "",
          businessType: data.vendorCategory === "b2b" ? "B2B Vendor" : "B2C Vendor"
        };
        localStorage.setItem("sumway_user", JSON.stringify(userObj));
        login(userObj);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error?.message || "Registration failed. Please check inputs.");
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
                Register as a Business Vendor or Portal Administrator. Access career vacancy management, automated schedules, helpdesk setups, and secure operational compliance layers integrated with the JLN Marg Stock Exchange building directory.
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
                  <div className="flex justify-between gap-1 p-1 bg-[#0A0F1E] light:bg-slate-100 rounded-lg border border-slate-800 light:border-slate-300 mb-6 text-[9px] font-bold uppercase tracking-wider">
                    {(["vendor", "admin"] as const).map((r) => {
                      const isSelected = activeRole === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleRoleChange(r)}
                          className={`flex-1 text-center py-2.5 rounded transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-[#00C2B2] text-[#0A0F1E]" 
                              : "text-slate-500 light:text-slate-650 hover:text-slate-300 light:hover:text-[#F5C542]"
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

                    {/* Admin Fields */}
                    {activeRole === "admin" && (
                      <div className="space-y-4 pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                        <span className="text-[9px] font-bold text-[#FF555F] uppercase tracking-wider flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          Administrative Access Verification
                        </span>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold">Security Admin Passkey *</label>
                          <div className="relative">
                            <input
                              type="password"
                              {...register("adminPasskey")}
                              placeholder="Enter security passkey (e.g. SUMWAY_ADMIN_2026)..."
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-white/5 text-slate-100 dark:text-slate-100 light:text-slate-800 dark:border-slate-700 light:border-slate-300 dark:bg-white/5 light:bg-slate-50 focus:border-[#00C2B2] focus:outline-none transition-colors"
                            />
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                          </div>
                          {errors.adminPasskey && (
                            <span className="text-[10px] text-red-500 font-semibold">{errors.adminPasskey.message}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Vendor Fields */}
                    {activeRole === "vendor" && (
                      <div className="space-y-5 pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                        <div>
                          <span className="text-[9px] font-bold text-[#FF555F] uppercase tracking-wider">Vendor Classification</span>
                          <h4 className="text-xs font-bold text-slate-355 dark:text-slate-300 light:text-slate-700 mt-1 mb-2">Select Vendor Category *</h4>
                          
                          <div className="grid grid-cols-2 gap-2 p-1 bg-[#0A0F1E] light:bg-slate-100 rounded-lg border border-slate-800 light:border-slate-300 text-[10px] font-bold uppercase tracking-wider">
                            {(["b2b", "b2c"] as const).map((cat) => {
                              const isSelected = activeVendorCategory === cat;
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => handleVendorCategoryChange(cat)}
                                  className={`text-center py-2 rounded transition-all cursor-pointer ${
                                    isSelected 
                                      ? "bg-[#4AABCA] text-[#0A0F1E] shadow-sm font-extrabold" 
                                      : "text-slate-500 light:text-slate-650 hover:text-slate-300 light:hover:text-[#4AABCA]"
                                  }`}
                                >
                                  {cat === "b2b" ? "B2B (Business-to-Business)" : "B2C (Business-to-Consumer)"}
                                </button>
                              );
                            })}
                          </div>
                          {errors.vendorCategory && (
                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.vendorCategory.message}</span>
                          )}
                        </div>

                        {/* B2B specific section */}
                        {activeVendorCategory === "b2b" && (
                          <div className="space-y-4 pt-2">
                            <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-wider flex items-center gap-1">
                              <Building className="w-3.5 h-3.5" />
                              B2B Business Information
                            </span>

                            {/* Firm/Company Registration Name */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-slate-350 dark:text-slate-300 light:text-slate-700 font-bold">Firm / Company Registration Name *</label>
                              <input
                                {...register("companyName")}
                                placeholder="e.g. Sumway Enterprises Pvt Ltd"
                                className="form-input"
                              />
                              {errors.companyName && (
                                <span className="text-[10px] text-red-500 font-semibold">{errors.companyName.message}</span>
                              )}
                            </div>

                            {/* Certificate upload slots */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FileUploadDropzone
                                label="GST Registration Certificate"
                                value={watch("gstCertificate") || ""}
                                onChange={(val) => setValue("gstCertificate", val, { shouldValidate: true })}
                                error={errors.gstCertificate?.message}
                                required
                              />

                              <FileUploadDropzone
                                label="MSME Registration Certificate"
                                value={watch("msmeCertificate") || ""}
                                onChange={(val) => setValue("msmeCertificate", val, { shouldValidate: true })}
                                error={errors.msmeCertificate?.message}
                                required
                              />
                            </div>

                            <FileUploadDropzone
                              label="Other Business Registration Documents (If applicable)"
                              value={watch("otherDocs") || ""}
                              onChange={(val) => setValue("otherDocs", val, { shouldValidate: true })}
                              error={errors.otherDocs?.message}
                            />
                          </div>
                        )}

                        {/* B2C specific section */}
                        {activeVendorCategory === "b2c" && (
                          <div className="space-y-4 pt-2">
                            <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-wider flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              B2C Identity Verification
                            </span>

                            {/* Address Proof Type Dropdown */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-slate-355 dark:text-slate-300 light:text-slate-700 font-bold">Address Proof Type *</label>
                              <select
                                {...register("addressProofType")}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-750 bg-[#111827] dark:bg-[#111827] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-800 focus:border-[#4AABCA] focus:outline-none transition-colors text-xs font-semibold cursor-pointer"
                              >
                                <option value="" className="bg-[#0f1729] text-slate-200">Select Address Proof Document...</option>
                                <option value="aadhaar" className="bg-[#0f1729] text-slate-200">Aadhaar Card</option>
                                <option value="voter_id" className="bg-[#0f1729] text-slate-200">Voter ID Card</option>
                                <option value="pan" className="bg-[#0f1729] text-slate-200">PAN Card</option>
                                <option value="other" className="bg-[#0f1729] text-slate-200">Other valid government-issued address proof</option>
                              </select>
                              {errors.addressProofType && (
                                <span className="text-[10px] text-red-500 font-semibold">{errors.addressProofType.message}</span>
                              )}
                            </div>

                            {/* Address Proof File Upload */}
                            <FileUploadDropzone
                              label="Upload Address Proof Document"
                              value={watch("addressProofFile") || ""}
                              onChange={(val) => setValue("addressProofFile", val, { shouldValidate: true })}
                              error={errors.addressProofFile?.message}
                              required
                            />
                          </div>
                        )}

                        {/* Bank Account Details (for both B2B and B2C) */}
                        {activeVendorCategory && (
                          <div className="space-y-4 pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                            <span className="text-[9px] font-bold text-[#4AABCA] uppercase tracking-wider flex items-center gap-1">
                              <CreditCard className="w-3.5 h-3.5" />
                              Bank Account Details
                            </span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Account Holder Name */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-350 dark:text-slate-300 light:text-slate-700 font-bold">Account Holder Name *</label>
                                <input
                                  {...register("bankAccountName")}
                                  placeholder="e.g. Amit Kumar"
                                  className="form-input"
                                />
                                {errors.bankAccountName && (
                                  <span className="text-[10px] text-red-500 font-semibold">{errors.bankAccountName.message}</span>
                                )}
                              </div>

                              {/* Bank Name */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-350 dark:text-slate-300 light:text-slate-700 font-bold">Bank Name *</label>
                                <input
                                  {...register("bankName")}
                                  placeholder="e.g. State Bank of India"
                                  className="form-input"
                                />
                                {errors.bankName && (
                                  <span className="text-[10px] text-red-500 font-semibold">{errors.bankName.message}</span>
                                )}
                              </div>

                              {/* Account Number */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-355 dark:text-slate-300 light:text-slate-700 font-bold">Account Number *</label>
                                <input
                                  {...register("bankAccountNumber")}
                                  placeholder="e.g. 123456789012"
                                  className="form-input"
                                />
                                {errors.bankAccountNumber && (
                                  <span className="text-[10px] text-red-500 font-semibold">{errors.bankAccountNumber.message}</span>
                                )}
                              </div>

                              {/* IFSC Code */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-355 dark:text-slate-300 light:text-slate-700 font-bold">IFSC Code *</label>
                                <input
                                  {...register("bankIfsc")}
                                  placeholder="e.g. SBIN0000001"
                                  className="form-input"
                                />
                                {errors.bankIfsc && (
                                  <span className="text-[10px] text-red-500 font-semibold">{errors.bankIfsc.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
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

interface FileUploadDropzoneProps {
  label: string;
  value: string;
  onChange: (filename: string) => void;
  error?: string;
  required?: boolean;
}

const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  label,
  value,
  onChange,
  error,
  required = false
}) => {
  const [progress, setProgress] = React.useState<number | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const simulateUpload = (fileName: string) => {
    setProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setProgress(null);
          onChange(fileName);
        }, 300);
      }
    }, 80);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateUpload(file.name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateUpload(file.name);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold flex items-center gap-1 text-[10px] uppercase tracking-wide">
        {label} {required && <span className="text-[#FF555F]">*</span>}
      </label>
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={value ? undefined : onButtonClick}
        className={`relative w-full border border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
          value 
            ? "border-emerald-500/30 bg-emerald-500/5 light:bg-emerald-500/2" 
            : dragActive
              ? "border-[#4AABCA] bg-[#4AABCA]/10"
              : error
                ? "border-red-500/50 bg-red-500/5"
                : "border-slate-700 dark:border-slate-750 light:border-slate-300 bg-white/3 dark:bg-white/3 light:bg-slate-50 hover:border-[#4AABCA] hover:bg-[#4AABCA]/5"
        } ${value ? "" : "cursor-pointer"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />

        {progress !== null ? (
          <div className="w-full flex flex-col items-center py-2">
            <Loader2 className="w-5 h-5 text-[#4AABCA] animate-spin mb-1.5" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
              Uploading Document ({progress}%)
            </span>
            <div className="w-full max-w-[200px] bg-slate-800/80 rounded-full h-1 mt-1.5 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-[#4AABCA] to-[#FF555F] h-full transition-all duration-100 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : value ? (
          <div className="w-full flex items-center justify-between gap-2.5 text-left">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate uppercase tracking-wide">
                  {value}
                </span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">
                  VETTED & READY
                </span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-lg border border-red-500/10 hover:border-red-500/35 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all text-[9px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-1">
            <UploadCloud className="w-6 h-6 text-slate-500 hover:text-[#4AABCA] transition-colors mb-1.5" />
            <p className="text-[10px] font-semibold text-slate-350 dark:text-slate-300 light:text-slate-700">
              Drag & Drop file, or <span className="text-[#4AABCA] underline hover:text-[#FF555F]">Browse</span>
            </p>
            <p className="text-[8px] text-slate-550 font-bold uppercase mt-0.5">
              Supports PDF, PNG, JPG (Max 5MB)
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <span className="text-[9px] text-red-500 font-semibold mt-0.5">{error}</span>
      )}
    </div>
  );
};
