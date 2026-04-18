import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROGRAMS } from "../content/icen";

export default function Programs() {
  return (
    <div className="pt-[120px] pb-24 bg-icen-navy" data-testid="programs-page">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">Programs</div>
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl">
          Instruments of <em className="italic text-icen-blue">consequence.</em>
        </h1>
        <p className="mt-8 text-lg text-slate-400 max-w-2xl leading-relaxed">
          Our programs are the mechanism through which the council acts — convening, building, funding, and publishing.
        </p>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => (
            <motion.div
              key={p.id}
              data-testid={`program-card-${p.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden border border-white/8 bg-icen-surface/60 hover:bg-icen-elevated/70 hover:border-icen-blue/40 transition-all duration-500"
            >
              <div className="p-8 min-h-[320px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-icen-green font-semibold">{p.tag}</div>
                    <ArrowUpRight className="text-slate-500 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" size={18} />
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mt-6 leading-tight">{p.title}</h3>
                </div>
                <p className="text-[14px] text-slate-400 leading-relaxed mt-8">{p.desc}</p>
              </div>
              <div className="h-1 bg-gradient-to-r from-icen-blue via-icen-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
