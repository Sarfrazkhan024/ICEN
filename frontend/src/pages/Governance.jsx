import React from "react";
import { motion } from "framer-motion";
import { GOVERNANCE } from "../content/icen";

// A stylized SVG org chart with animated connector lines
function FlowNode({ x, y, w = 220, h = 80, label, meta, accent = false, testid }) {
  return (
    <g data-testid={testid}>
      <rect x={x} y={y} width={w} height={h}
        fill={accent ? "rgba(0,87,255,0.12)" : "rgba(15,23,42,0.8)"}
        stroke={accent ? "rgba(0,87,255,0.7)" : "rgba(255,255,255,0.14)"}
        strokeWidth="1" />
      <text x={x + 16} y={y + 30} fill="#ffffff" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="600">{label}</text>
      <text x={x + 16} y={y + 54} fill="#94A3B8" fontFamily="Manrope, sans-serif" fontSize="11" letterSpacing="1.5">{meta}</text>
    </g>
  );
}

function AnimatedLine({ d, delay = 0 }) {
  return (
    <motion.path
      d={d}
      stroke="rgba(0,87,255,0.55)"
      strokeWidth="1.2"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: "easeInOut" }}
    />
  );
}

export default function Governance() {
  return (
    <div className="pt-[120px] pb-24 bg-icen-navy" data-testid="governance-page">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">Councils & Governance</div>
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl">
          Architecture of the <em className="italic text-icen-green">council.</em>
        </h1>
        <p className="mt-8 text-lg text-slate-400 max-w-2xl leading-relaxed">
          ICEN is governed by a General Assembly, served by a Secretariat, and organized through twelve Pillar Councils and eight Regional Chapters.
        </p>

        <div className="mt-16 bg-icen-surface/60 border border-white/10 p-6 md:p-10 overflow-x-auto">
          <svg viewBox="0 0 1000 600" className="w-full min-w-[780px] h-[520px]">
            {/* Root */}
            <FlowNode x={390} y={30} w={220} h={90} label={GOVERNANCE.root.label} meta={GOVERNANCE.root.meta} accent testid="gov-root" />
            {/* Mid row */}
            <FlowNode x={60} y={220} w={230} h={80} label={GOVERNANCE.children[0].label} meta={GOVERNANCE.children[0].meta} testid="gov-secretariat" />
            <FlowNode x={385} y={220} w={230} h={80} label={GOVERNANCE.children[1].label} meta={GOVERNANCE.children[1].meta} accent testid="gov-council" />
            <FlowNode x={710} y={220} w={230} h={80} label={GOVERNANCE.children[2].label} meta={GOVERNANCE.children[2].meta} testid="gov-regional" />
            {/* Leaves */}
            <FlowNode x={30} y={420} w={200} h={70} label="Summit Commission" meta="Annual convening" testid="gov-summit" />
            <FlowNode x={250} y={420} w={200} h={70} label="Ethics Board" meta="Independent oversight" testid="gov-ethics" />
            <FlowNode x={500} y={420} w={200} h={70} label="Policy Lab" meta="Framework design" testid="gov-policy" />
            <FlowNode x={720} y={420} w={200} h={70} label="Country Chapters" meta="Local leadership" testid="gov-chapters" />
            <FlowNode x={940} y={420} w={60} h={70} label="" meta="" testid="gov-spacer" />

            {/* Connectors */}
            <AnimatedLine d="M500 120 C 500 170, 175 170, 175 220" />
            <AnimatedLine d="M500 120 L 500 220" delay={0.2} />
            <AnimatedLine d="M500 120 C 500 170, 825 170, 825 220" delay={0.4} />
            <AnimatedLine d="M175 300 C 175 360, 130 360, 130 420" delay={0.6} />
            <AnimatedLine d="M175 300 C 175 360, 350 360, 350 420" delay={0.8} />
            <AnimatedLine d="M500 300 L 500 420" delay={1.0} />
            <AnimatedLine d="M825 300 C 825 360, 820 360, 820 420" delay={1.2} />
          </svg>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/5">
          {[
            { k: "General Assembly", v: "Every member nation and Fellow has a vote. Meets annually to adopt the ICEN Agenda." },
            { k: "Secretariat", v: "A permanent executive office in Geneva. Coordinates programs, summits, and day-to-day operations." },
            { k: "Pillar Councils", v: "Twelve councils — one per pillar — chaired by elected experts. They draft the frameworks we adopt." },
          ].map((b) => (
            <div key={b.k} className="bg-icen-surface/60 p-8">
              <div className="icen-overline">{b.k}</div>
              <div className="font-serif text-xl text-white mt-4 leading-snug">{b.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
