import { create } from "zustand";

interface User {
  name: string;
  email: string;
  role: "client" | "candidate" | "vendor" | "admin";
  companyName?: string;
  skills?: string;
  businessType?: string;
}

interface AppState {
  // Enquiry Modal State
  isEnquiryOpen: boolean;
  selectedService: string;
  openEnquiry: (service?: string) => void;
  closeEnquiry: () => void;

  // Auth / Session State
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Enquiry Modal
  isEnquiryOpen: false,
  selectedService: "",
  openEnquiry: (service) =>
    set({ isEnquiryOpen: true, selectedService: service || "" }),
  closeEnquiry: () => set({ isEnquiryOpen: false, selectedService: "" }),

  // Auth / Session
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
