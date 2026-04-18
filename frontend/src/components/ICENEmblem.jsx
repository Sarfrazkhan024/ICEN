import React from "react";

// ICEN Emblem — refined institutional mark
// Design: concentric frame (authority) + azimuthal globe with meridians (global scope)
// + upward-pointing chevron (emerging/rising) + blue accent meridian + subtle laurel ticks
export default function ICENEmblem({ size = 44, className = "", variant = "dark" }) {
  // variant: "dark" for light backgrounds, "light" for dark backgrounds
  const ink = variant === "dark" ? "#0A1628" : "#FFFFFF";
  const accent = "#0057FF";
  const subtle = variant === "dark" ? "rgba(10,22,40,0.28)" : "rgba(255,255,255,0.32)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ICEN Emblem"
    >
      {/* Outer hairline */}
      <circle cx="40" cy="40" r="38" stroke={subtle} strokeWidth="0.6" />
      {/* Laurel ticks — 24 around the outer ring */}
      <g stroke={ink} strokeWidth="0.9">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 360) / 24;
          const rad = (a * Math.PI) / 180;
          const x1 = 40 + Math.cos(rad) * 34;
          const y1 = 40 + Math.sin(rad) * 34;
          const x2 = 40 + Math.cos(rad) * 36;
          const y2 = 40 + Math.sin(rad) * 36;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* Inner frame */}
      <circle cx="40" cy="40" r="30" stroke={ink} strokeWidth="1.2" />

      {/* Globe grid */}
      <circle cx="40" cy="40" r="22" stroke={ink} strokeWidth="1.4" fill="none" />
      <ellipse cx="40" cy="40" rx="22" ry="8" stroke={ink} strokeWidth="0.9" />
      <ellipse cx="40" cy="40" rx="22" ry="15" stroke={ink} strokeWidth="0.7" />
      <ellipse cx="40" cy="40" rx="14" ry="22" stroke={ink} strokeWidth="0.7" />
      <line x1="40" y1="18" x2="40" y2="62" stroke={ink} strokeWidth="0.9" />

      {/* Accent meridian — electric blue */}
      <path d="M 40 18 A 18 22 0 0 1 40 62" stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Rising chevron — the 'emerging' mark */}
      <path
        d="M 30 46 L 40 36 L 50 46"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Top fixed star */}
      <circle cx="40" cy="18" r="1.8" fill={accent} />
    </svg>
  );
}

export function ICENWordmark({ className = "", variant = "dark", compact = false }) {
  const ink = variant === "dark" ? "text-icen-ink" : "text-white";
  const sub = variant === "dark" ? "text-icen-blue" : "text-icen-blue";
  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid="icen-wordmark">
      <ICENEmblem size={compact ? 36 : 42} variant={variant} />
      <div className="leading-tight">
        <div className={`font-serif text-[22px] tracking-[0.24em] ${ink} font-semibold`}>ICEN</div>
        {!compact && (
          <div className={`text-[9px] tracking-[0.3em] uppercase ${sub} font-sans font-semibold mt-0.5`}>
            Intl. Council · Emerging Nations
          </div>
        )}
      </div>
    </div>
  );
}
