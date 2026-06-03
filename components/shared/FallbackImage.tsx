"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
}

/**
 * Image wrapper with a premium gradient fallback for when external images
 * fail to load (enterprise proxy SSL issues, etc.)
 */
export default function FallbackImage({
  fallbackLabel,
  alt,
  className,
  ...props
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0B1C33] via-[#111827] to-[#0A0F1E] light:from-[#E2E8F0] light:via-[#CBD5E1] light:to-[#E2E8F0] ${className || ""}`}
      >
        {/* Decorative mesh pattern */}
        <div className="absolute inset-0 opacity-30 light:opacity-40" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(0, 194, 178, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(245, 197, 66, 0.06) 0%, transparent 50%)`,
        }} />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-[0.03] light:opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div className="flex flex-col items-center gap-3 relative z-10">
          {/* Abstract geometric icon */}
          <div className="w-12 h-12 rounded-xl border border-slate-700/40 light:border-slate-300 bg-white/[0.03] light:bg-slate-200/50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600 light:text-slate-400">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {fallbackLabel && (
            <span className="text-[8px] font-bold text-slate-600 light:text-slate-500 uppercase tracking-[0.15em] text-center px-4 max-w-[180px] leading-relaxed">
              {fallbackLabel}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
