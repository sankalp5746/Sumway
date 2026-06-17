"use client";

import React from "react";
import { MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";

export default function EnquiryButton() {
  const openEnquiry = useAppStore((state) => state.openEnquiry);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      onClick={() => openEnquiry("General Inquiry")}
      className="fixed bottom-24 right-6 z-45 flex items-center justify-center w-14 h-14 rounded-full bg-[#FF555F] text-[#0A1128] font-bold text-sm uppercase tracking-wider shadow-[0_6px_24px_rgba(245,197,66,0.35)] hover:shadow-[0_8px_32px_rgba(245,197,66,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      <MessageSquareText className="w-6 h-6" />
      <span className="sr-only">Quick Enquiry</span>
    </motion.button>
  );
}
