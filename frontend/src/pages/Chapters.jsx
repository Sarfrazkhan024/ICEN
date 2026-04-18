import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REGIONS } from "../content/icen";

export default function Chapters() {
  const [active, setActive] = useState(REGIONS[0].id);
  const current = REGIONS.find(r => r.id === active);

  return (
    <div className="pt-[120px] pb-24 bg-icen-navy" data-testid="chapters-page">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">Chapters & Regions</div>
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl">
          A network that <em className="italic text-icen-blue">reads the map differently.</em>
        </h1>
        <p className="mt-8 text-lg text-slate-400 max-w-2xl leading-relaxed">
          ICEN is organized into eight regional chapters, each led by a regional chair and supported by country nodes.
        </p>

        <div className="mt-16 grid md:grid-cols-[340px_1fr] gap-px bg-white/5 border border-white/5">
          <div className="bg-icen-surface/60">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                data-testid={`region-tab-${r.id}`}
                className={`w-full text-left px-6 py-5 border-b border-white/5 transition-colors ${
                  active === r.id ? "bg-icen-elevated text-white" : "text-slate-400 hover:text-white hover:bg-icen-elevated/60"
                }`}
              >
                <div className="font-mono text-[10px] tracking-[0.3em] text-slate-500">R.{r.id.toUpperCase()}</div>
                <div className="font-serif text-xl mt-1">{r.name}</div>
                <div className="text-[11px] text-slate-500 mt-1 tracking-wide">{r.chapters} chapters · {r.countries.length} countries</div>
              </button>
            ))}
          </div>

          <div className="bg-icen-surface/60 p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="icen-overline">Regional Chapter</div>
                <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 leading-tight">{current.name}</h2>
                <div className="flex items-baseline gap-6 mt-6">
                  <div>
                    <div className="font-serif text-5xl text-icen-blue font-semibold">{current.chapters}</div>
                    <div className="icen-overline mt-1">Chapters</div>
                  </div>
                  <div>
                    <div className="font-serif text-5xl text-icen-green font-semibold">{current.countries.length}</div>
                    <div className="icen-overline mt-1">Countries</div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="icen-overline mb-4">Member Countries</div>
                  <div className="flex flex-wrap gap-2">
                    {current.countries.map((c) => (
                      <span key={c} className="px-3 py-1.5 border border-white/10 text-sm text-slate-200 hover:border-icen-blue/50 hover:text-white transition-colors">{c}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
