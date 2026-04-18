import React from "react";

// ICEN UN-style SVG emblem — concentric globe + latitude lines + laurel frame
export default function ICENEmblem({ size = 40, className = "", mono = false }) {
  const stroke = mono ? "#ffffff" : "#ffffff";
  const accent = mono ? "#ffffff" : "#0057FF";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ICEN Emblem"
    >
      {/* Outer ring */}
      <circle cx="32" cy="32" r="30" stroke={stroke} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="32" cy="32" r="26" stroke={stroke} strokeOpacity="0.45" strokeWidth="0.8" />
      {/* Globe grid */}
      <circle cx="32" cy="32" r="18" stroke={stroke} strokeWidth="1" />
      <ellipse cx="32" cy="32" rx="18" ry="7" stroke={stroke} strokeWidth="0.8" />
      <ellipse cx="32" cy="32" rx="18" ry="14" stroke={stroke} strokeWidth="0.8" />
      <line x1="32" y1="14" x2="32" y2="50" stroke={stroke} strokeWidth="0.8" />
      <line x1="14" y1="32" x2="50" y2="32" stroke={stroke} strokeWidth="0.8" />
      {/* Accent arc */}
      <path d="M14 32 A 18 18 0 0 1 50 32" stroke={accent} strokeWidth="1.6" fill="none" />
      {/* Star marker */}
      <circle cx="32" cy="14" r="1.6" fill={accent} />
    </svg>
  );
}

export function ICENWordmark({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid="icen-wordmark">
      <ICENEmblem size={34} />
      <div className="leading-tight">
        <div className="font-serif text-[20px] tracking-[0.22em] text-white font-semibold">ICEN</div>
        <div className="text-[9px] tracking-[0.28em] uppercase text-icen-blue/90 font-sans font-semibold">Intl. Council · Emerging Nations</div>
      </div>
    </div>
  );
}
