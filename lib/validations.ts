import { z } from "zod";

// Phone validation pattern
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export const EnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select a service of interest"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export const LoginSchema = z.object({
  role: z.enum(["vendor", "admin"]),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const RegisterSchema = z.object({
  role: z.enum(["vendor", "admin"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(phoneRegex, "Invalid mobile number format"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  // Admin fields
  adminPasskey: z.string().optional(),
  
  // Vendor specific fields
  companyName: z.string().optional(),
  vendorCategory: z.enum(["b2b", "b2c"]).optional(),
  
  // B2B specific documents
  gstCertificate: z.string().optional(),
  msmeCertificate: z.string().optional(),
  otherDocs: z.string().optional(),
  
  // B2C specific documents
  addressProofType: z.enum(["aadhaar", "voter_id", "pan", "other"]).optional(),
  addressProofFile: z.string().optional(),
  
  // Bank details for vendors
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfsc: z.string().optional(),
  bankAccountName: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.role === "admin") {
    // Only check that passkey is provided; actual value is verified server-side
    if (!data.adminPasskey || data.adminPasskey.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Security Admin Passkey is required",
        path: ["adminPasskey"]
      });
    }
  }

  if (data.role === "vendor") {
    if (!data.vendorCategory) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select Vendor Category (B2B or B2C)",
        path: ["vendorCategory"]
      });
      return;
    }

    // Bank Account Details are required for both B2B and B2C
    if (!data.bankName || data.bankName.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank Name is required",
        path: ["bankName"]
      });
    }
    if (!data.bankAccountNumber || data.bankAccountNumber.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank Account Number is required",
        path: ["bankAccountNumber"]
      });
    }
    if (!data.bankIfsc || data.bankIfsc.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank IFSC Code is required",
        path: ["bankIfsc"]
      });
    }
    if (!data.bankAccountName || data.bankAccountName.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank Account Holder Name is required",
        path: ["bankAccountName"]
      });
    }

    if (data.vendorCategory === "b2b") {
      if (!data.companyName || data.companyName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Firm/Company Registration Name is required",
          path: ["companyName"]
        });
      }
      if (!data.gstCertificate || data.gstCertificate.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "GST Registration Certificate is required",
          path: ["gstCertificate"]
        });
      }
      if (!data.msmeCertificate || data.msmeCertificate.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "MSME Registration Certificate is required",
          path: ["msmeCertificate"]
        });
      }
    } else if (data.vendorCategory === "b2c") {
      if (!data.addressProofType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select an Address Proof type",
          path: ["addressProofType"]
        });
      }
      if (!data.addressProofFile || data.addressProofFile.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address Proof Document is required",
          path: ["addressProofFile"]
        });
      }
    }
  }
});

export const JobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters"),
  linkedinUrl: z.string().url("Invalid URL format").or(z.string().length(0)).optional()
});
