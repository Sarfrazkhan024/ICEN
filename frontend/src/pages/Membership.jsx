import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { TIERS } from "../content/icen";

export default function Membership() {
  return (
    <div className="pt-[120px] pb-24 bg-icen-navy relative" data-testid="membership-page">
      <div className="absolute inset-0 icen-grid opacity-[0.18]" />
      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">Membership</div>
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl">
          Not for everyone. <em className="italic text-icen-green">By design.</em>
        </h1>
        <p className="mt-8 text-lg text-slate-400 max-w-2xl leading-relaxed">
          ICEN runs on four concentric tiers of commitment. Each tier carries rights, responsibilities, and a standard of rigor.
        </p>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.id}
              data-testid={`membership-tier-${t.id}`}
              className={`relative p-8 border flex flex-col ${
                t.highlight
                  ? "bg-gradient-to-b from-icen-blue/20 to-icen-surface/80 border-icen-blue/50 shadow-glowStrong"
                  : "bg-icen-surface/60 border-white/10"
              } backdrop-blur-xl`}
            >
              {t.highlight ? (
                <div className="absolute -top-3 left-7 px-3 py-1 bg-icen-blue text-white text-[10px] uppercase tracking-[0.24em] font-semibold">{t.badge}</div>
              ) : (
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500 font-semibold">{t.badge}</div>
              )}
              <h3 className="font-serif text-3xl text-white mt-4">{t.name}</h3>
              <div className="text-sm text-slate-400 mt-2">{t.price}</div>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="text-[13px] text-slate-300 flex gap-3 items-start">
                    <Check size={14} className="text-icen-green mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/apply" className={`mt-8 ${t.highlight ? "icen-btn-primary" : "icen-btn-ghost"} justify-center`}>
                Apply <ArrowRight size={14}/>
              </Link>
            </div>
          ))}
        </div>

        <div className="icen-divider my-24" />
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {[
            { k: "Review", v: "Every applicant is reviewed by a Secretariat panel and a regional chair." },
            { k: "Standards", v: "Integrity, contribution, and sovereignty alignment are non-negotiable." },
            { k: "Renewal", v: "Membership is reviewed annually against measurable engagement." },
          ].map((b) => (
            <div key={b.k} className="bg-icen-surface/60 p-8">
              <div className="icen-overline">{b.k}</div>
              <div className="font-serif text-2xl text-white mt-4 leading-snug">{b.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
