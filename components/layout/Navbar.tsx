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
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
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

  const { user, login, logout, openEnquiry, setJobs } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("sumway_user");
    if (savedUser) {
      try {
        login(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
    const savedJobs = localStorage.getItem("sumway_jobs");
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error(e);
      }
    }
    setMounted(true);
  }, [login, setJobs]);

  const handleLogout = async () => {
    localStorage.removeItem("sumway_user");
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout API failed", e);
    }
    logout();
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-[#0A1128]/95 light:bg-white/95 backdrop-blur-xl border-b border-white/8 light:border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.25)] py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-9 h-9 overflow-hidden bg-white rounded-full flex items-center justify-center p-1 border border-[#FF555F]/20 shadow-md shrink-0">
            <Image
              src="/images/logo.png"
              alt="Sumway Global Logo"
              fill
              sizes="36px"
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-sm tracking-wider text-slate-100 light:text-[#0F172A] group-hover:text-[#FF555F] transition-colors whitespace-nowrap">
              SUMWAY GLOBAL
            </span>
            <span className="text-[9px] font-semibold text-[#4AABCA] tracking-[0.15em] uppercase mt-0.5 whitespace-nowrap">
              MANAGEMENT Pvt. Ltd.
            </span>
          </div>
        </Link>

        {/* Desktop Nav — only show on xl screens to avoid crowding */}
        <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children;
            const isActive =
              pathname === link.href ||
              (hasChildren && link.children?.some((c) => pathname === c.href));

            if (hasChildren) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "text-[#FF555F]"
                        : "text-slate-300 light:text-slate-700 hover:text-[#FF555F] hover:bg-white/5 light:hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3 h-3 opacity-60 transition-transform duration-200 shrink-0 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-[#0f1729]/98 light:bg-white backdrop-blur-xl rounded-2xl border border-white/8 light:border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.5)] light:shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-3 grid grid-cols-2 gap-1.5"
                      >
                        {link.children?.map((child) => {
                          const childWithIcon = child as {
                            label: string; href: string; desc?: string; icon?: string;
                          };
                          const IconComp = childWithIcon.icon ? iconMap[childWithIcon.icon] : Building;
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`flex gap-3 p-2.5 rounded-xl transition-all group ${
                                isChildActive
                                  ? "bg-[#FF555F]/10 border border-[#FF555F]/20"
                                  : "hover:bg-white/5 light:hover:bg-slate-50 border border-transparent hover:border-white/8 light:hover:border-slate-200"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#4AABCA]/10 flex items-center justify-center text-[#4AABCA] shrink-0 mt-0.5">
                                {IconComp ? <IconComp className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className={`text-sm font-semibold transition-colors ${
                                  isChildActive ? "text-[#FF555F]" : "text-slate-200 light:text-slate-800 group-hover:text-[#FF555F]"
                                }`}>
                                  {child.label}
                                </span>
                                {childWithIcon.desc && (
                                  <span className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">
                                    {childWithIcon.desc}
                                  </span>
                                )}
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
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[#FF555F]"
                    : "text-slate-300 light:text-slate-700 hover:text-[#FF555F] hover:bg-white/5 light:hover:bg-slate-100"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#FF555F] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Social Links on Header */}
          <div className="flex items-center gap-1.5 mr-1 pr-2 border-r border-white/10 light:border-slate-200">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/8 light:border-slate-200 hover:border-[#FF555F]/30 bg-white/4 light:bg-slate-100 hover:bg-white/8 hover:text-[#FF555F] transition-all text-slate-400 light:text-slate-600 flex items-center justify-center"
              aria-label="Instagram @sumwayglobal"
              title="Instagram @sumwayglobal"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/8 light:border-slate-200 hover:border-[#FF555F]/30 bg-white/4 light:bg-slate-100 hover:bg-white/8 hover:text-[#FF555F] transition-all text-slate-400 light:text-slate-600 flex items-center justify-center"
              aria-label="X (Twitter) @Sumwayglobal"
              title="X (Twitter) @Sumwayglobal"
            >
              <FaXTwitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/8 light:border-slate-200 hover:border-[#FF555F]/30 bg-white/4 light:bg-slate-100 hover:bg-white/8 hover:text-[#FF555F] transition-all text-slate-400 light:text-slate-600 flex items-center justify-center"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-white/8 light:border-slate-200 hover:border-[#FF555F]/30 bg-white/4 light:bg-slate-100 hover:bg-white/8 hover:text-[#FF555F] transition-all text-slate-400 light:text-slate-600"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
 
          {mounted && user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-xs font-bold uppercase tracking-wider text-[#FF555F] hover:text-[#FF555F]/85 transition-colors px-1 whitespace-nowrap"
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#4AABCA]/20 bg-[#4AABCA]/5 text-[#4AABCA] shrink-0 text-xs font-bold uppercase tracking-wider">
                <span>{user.name}</span>
                <span className="opacity-50 text-[9px] lowercase px-1 py-0.5 rounded bg-white/10">{user.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-slate-300 light:text-slate-700 hover:text-red-400 transition-colors px-2 whitespace-nowrap cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors px-2 whitespace-nowrap"
            >
              Login
            </Link>
          )}
 
          <button
            onClick={() => openEnquiry("General Inquiry")}
            className="btn-primary !py-2 !px-4 !text-xs whitespace-nowrap"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
 
        {/* Tablet nav (lg only — show fewer items) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
          {["Home", "Services", "Careers", "Contact"].map((label) => {
            const link = NAV_LINKS.find(l => l.label === label);
            if (!link) return null;
            const href = label === "Services" ? "/#services-section" : link.href;
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href || "#"}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-[#FF555F]" : "text-slate-300 light:text-slate-700 hover:text-[#FF555F]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-white/8 light:border-slate-200 bg-white/4 light:bg-slate-100 text-slate-300 light:text-slate-600"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 light:text-slate-700"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile drawer — rendered outside header to prevent backdrop-filter clipping */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "tween", duration: 0.28 }}
          style={{ backgroundColor: isLight ? "#ffffff" : "#0A1128", zIndex: 49 }}
          className="fixed top-[52px] left-0 right-0 bottom-0 bg-[#0A1128] light:bg-white border-t border-white/5 light:border-slate-200 p-6 overflow-y-auto flex flex-col justify-between lg:hidden"
        >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const hasChildren = !!link.children;
                return (
                  <div key={link.label} className="flex flex-col">
                    {!hasChildren ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-semibold text-slate-200 light:text-slate-800 hover:text-[#FF555F] transition-colors py-1.5 border-b border-white/5 light:border-slate-100"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#4AABCA] py-1.5 border-b border-white/5 light:border-slate-100">
                          {link.label}
                        </span>
                        <div className="grid grid-cols-2 gap-2 pl-3 border-l-2 border-[#FF555F]/20">
                          {link.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-sm text-slate-400 light:text-slate-600 hover:text-[#FF555F] py-1 transition-colors"
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

            <div className="flex flex-col gap-4 mt-8 border-t border-white/5 light:border-slate-200 pt-6">
              {/* Mobile Social Links & Handles */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4AABCA]">
                  Connect With Us
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/4 light:bg-slate-100 border border-white/5 light:border-slate-200 text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors"
                  >
                    <FaInstagram className="w-4 h-4 text-[#FF555F] shrink-0" />
                    <span className="truncate">@sumwayglobal</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/4 light:bg-slate-100 border border-white/5 light:border-slate-200 text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors"
                  >
                    <FaXTwitter className="w-4 h-4 text-[#4AABCA] shrink-0" />
                    <span className="truncate">@Sumwayglobal</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/4 light:bg-slate-100 border border-white/5 light:border-slate-200 text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors"
                  >
                    <FaLinkedinIn className="w-4 h-4 text-[#4AABCA] shrink-0" />
                    <span className="truncate">LinkedIn</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/4 light:bg-slate-100 border border-white/5 light:border-slate-200 text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-[#FF555F] transition-colors"
                  >
                    <FaFacebookF className="w-4 h-4 text-[#FF555F] shrink-0" />
                    <span className="truncate">Facebook</span>
                  </a>
                </div>
              </div>

              {mounted && user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#4AABCA]/20 bg-[#4AABCA]/5 text-[#4AABCA] text-sm font-bold uppercase tracking-wider">
                    <span>{user.name}</span>
                    <span className="opacity-50 text-[10px] lowercase px-1.5 py-0.5 rounded bg-white/10">{user.role}</span>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-3 rounded-xl border border-[#FF555F]/20 bg-[#FF555F]/5 text-sm font-semibold text-[#FF555F] hover:bg-[#FF555F]/10 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-3 rounded-xl border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl border border-white/10 light:border-slate-300 text-sm font-semibold text-slate-300 light:text-slate-800 hover:bg-white/5 light:hover:bg-slate-50 transition-colors"
                >
                  Login
                </Link>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); openEnquiry("Mobile Enquiry"); }}
                className="btn-primary w-full justify-center"
              >
                Quick Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
