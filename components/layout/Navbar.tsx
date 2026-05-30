"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Sun, Moon, ArrowRight, 
  Building, Briefcase, Laptop, Headphones, Users, 
  GraduationCap, Clock, PhoneCall, ShieldCheck, TrendingUp
} from "lucide-react";
import { COMPANY_DETAILS, NAV_LINKS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";

const iconMap: { [key: string]: any } = {
  Building, Briefcase, Laptop, Headphones, Users, GraduationCap,
  Clock, PhoneCall, ShieldCheck, TrendingUp
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(false);
  
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme
  useEffect(() => {
    const isLightTheme = document.documentElement.classList.contains("light");
    setIsLight(isLightTheme);
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#0A0F1E]/85 dark:bg-[#0A0F1E]/85 light:bg-slate-50/85 backdrop-blur-md border-b border-[#F5C542]/10 shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden bg-white rounded-full flex items-center justify-center p-1 border border-[#F5C542]/20">
            <Image 
              src="/images/logo.png" 
              alt="Sumway Global Logo" 
              fill
              sizes="40px"
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm md:text-base tracking-wider text-slate-100 dark:text-slate-100 light:text-[#0F172A] group-hover:text-[#F5C542] transition-colors">
              SUMWAY GLOBAL
            </span>
            <span className="text-[9px] font-medium text-[#00C2B2] tracking-widest uppercase">
              MANAGEMENT
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children;
            const isActive = pathname === link.href || (hasChildren && link.children?.some(c => pathname === c.href));

            if (hasChildren) {
              return (
                <div 
                  key={link.label}
                  className="relative px-3 py-2 group"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-[#F5C542] transition-colors text-slate-300 dark:text-slate-300 light:text-slate-600">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-[#111827] dark:bg-[#111827] light:bg-white rounded-xl border border-[#F5C542]/10 shadow-2xl p-4 grid grid-cols-2 gap-2 backdrop-blur-lg"
                      >
                        {link.children?.map((child) => {
                          const childWithIcon = child as { label: string; href: string; desc?: string; icon?: string };
                          const IconComp = childWithIcon.icon ? iconMap[childWithIcon.icon] : Building;
                          return (
                            <Link 
                              key={child.label}
                              href={child.href}
                              className="flex gap-3 p-2.5 rounded-lg hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-50 transition-colors border border-transparent hover:border-[#F5C542]/10 group"
                            >
                              <div className="w-8 h-8 rounded-md bg-[#00C2B2]/10 flex items-center justify-center text-[#00C2B2] shrink-0">
                                {IconComp ? <IconComp className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 group-hover:text-[#F5C542]">
                                  {child.label}
                                </span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                                  {child.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link 
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-2 text-sm font-medium hover:text-[#F5C542] transition-colors text-slate-300 dark:text-slate-300 light:text-slate-600"
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#F5C542]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-700/50 hover:border-[#F5C542]/40 bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:text-[#F5C542] transition-colors text-slate-300 dark:text-slate-300 light:text-slate-600"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Login Gate */}
          <Link 
            href="/login" 
            className="text-sm font-semibold hover:text-[#F5C542] transition-colors text-slate-300 dark:text-slate-300 light:text-slate-700"
          >
            Login
          </Link>

          {/* Get Started Button */}
          <button 
            onClick={() => openEnquiry("General Inquiry")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#F5C542] text-[#0A0F1E] hover:bg-[#F5C542]/90 border border-transparent active:scale-95 transition-all shadow-[0_4px_14px_rgba(245,197,66,0.25)] cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-700/50 bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-600"
          >
            {isLight ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 dark:text-slate-300 light:text-slate-700"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide-in Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-[70px] z-40 bg-[#0A0F1E] dark:bg-[#0A0F1E] light:bg-slate-50 border-t border-slate-800/80 p-6 overflow-y-auto flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => {
                const hasChildren = !!link.children;
                return (
                  <div key={link.label} className="flex flex-col">
                    {!hasChildren ? (
                      <Link 
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-[#F5C542]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold uppercase tracking-wider text-[#00C2B2] mb-2">
                          {link.label}
                        </span>
                        <div className="grid grid-cols-2 gap-3 pl-2 border-l border-[#F5C542]/20">
                          {link.children?.map((child) => (
                            <Link 
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#F5C542] py-1"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-12 border-t border-slate-800/50 pt-6">
              <Link 
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-800 hover:bg-white/5"
              >
                Login Gateway
              </Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiry("Mobile Enquiry");
                }}
                className="w-full text-center py-2.5 rounded-lg bg-[#F5C542] text-[#0A0F1E] text-sm font-bold uppercase tracking-wider shadow-lg"
              >
                Quick Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
