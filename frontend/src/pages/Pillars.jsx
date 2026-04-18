import React from "react";
import * as Icons from "lucide-react";
import { PILLARS } from "../content/icen";

export default function Pillars() {
  return (
    <div className="pt-[120px] pb-24 bg-icen-navy" data-testid="pillars-page">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">The Twelve</div>
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl">
          The pillars of national power, <em className="italic text-icen-blue">reimagined.</em>
        </h1>
        <p className="mt-8 text-lg text-slate-400 max-w-2xl leading-relaxed">
          Every pillar is a working group. Every working group is a blueprint. Every blueprint is intended for adoption.
        </p>

        <div className="mt-16 space-y-px bg-white/5">
          {PILLARS.map((p, i) => {
            const Icon = Icons[p.icon] || Icons.Sparkles;
            return (
              <div key={p.id} className="group grid grid-cols-[80px_1fr_auto] md:grid-cols-[140px_1fr_auto] gap-6 items-center p-6 md:p-8 bg-icen-surface/60 hover:bg-icen-elevated/70 transition-colors" data-testid={`pillar-row-${p.id}`}>
                <div className="font-mono text-xs md:text-sm text-slate-500 tracking-widest">PILLAR {String(p.id).padStart(2,'0')}</div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-400 leading-relaxed max-w-3xl">{p.desc}</p>
                </div>
                <Icon className="text-icen-blue group-hover:text-icen-green transition-colors" size={28} strokeWidth={1.3} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
