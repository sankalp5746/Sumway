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
  role: z.enum(["client", "candidate", "vendor"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(phoneRegex, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  // Conditional fields (validated dynamically or set as optional with Zod refinements)
  companyName: z.string().optional(),
  serviceRequirement: z.string().optional(),
  
  skills: z.string().optional(),
  experience: z.string().optional(),
  
  businessType: z.string().optional(),
  gstNumber: z.string().optional()
}).refine((data) => {
  if (data.role === "client") {
    return !!data.companyName && !!data.serviceRequirement;
  }
  return true;
}, {
  message: "Company Details are required for Client Registration",
  path: ["companyName"]
}).refine((data) => {
  if (data.role === "vendor") {
    return !!data.businessType && !!data.gstNumber;
  }
  return true;
}, {
  message: "Business Type and GST Number are required for Vendor Registration",
  path: ["gstNumber"]
});

export const JobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters"),
  linkedinUrl: z.string().url("Invalid URL format").or(z.string().length(0)).optional()
});
