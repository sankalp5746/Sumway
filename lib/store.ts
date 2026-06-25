import { create } from "zustand";
import { JOBS } from "./constants";

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

  // Jobs State
  jobs: any[];
  setJobs: (jobs: any[]) => void;
  addJob: (job: any) => void;
  removeJob: (id: string) => void;
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

  // Jobs
  jobs: JOBS,
  setJobs: (jobs) =>
    set(() => {
      localStorage.setItem("sumway_jobs", JSON.stringify(jobs));
      return { jobs };
    }),
  addJob: (job) =>
    set((state) => {
      const updatedJobs = [job, ...state.jobs];
      localStorage.setItem("sumway_jobs", JSON.stringify(updatedJobs));
      return { jobs: updatedJobs };
    }),
  removeJob: (id) =>
    set((state) => {
      const updatedJobs = state.jobs.filter((j) => j.id !== id);
      localStorage.setItem("sumway_jobs", JSON.stringify(updatedJobs));
      return { jobs: updatedJobs };
    }),
}));
