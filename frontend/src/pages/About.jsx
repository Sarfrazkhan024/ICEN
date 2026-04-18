import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="pt-[120px] pb-24 bg-icen-navy relative" data-testid="about-page">
      <div className="absolute inset-0 icen-grid opacity-[0.2]" />
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">About ICEN</div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl">
          An institution for the <em className="italic text-icen-green">world that is becoming.</em>
        </motion.h1>
        <p className="mt-8 text-lg text-slate-400 max-w-2xl leading-relaxed">
          ICEN is a non-state, non-partisan, non-aligned council — convening emerging nations, their leaders, and the builders shaping them. We exist to translate a demographic, economic, and cultural shift into durable institutions, policy frameworks, and alliances.
        </p>

        <div className="mt-20 grid md:grid-cols-3 gap-px bg-white/5">
          {[
            { k: "Mission", v: "To equip emerging nations with the frameworks, networks, and capital to act as architects of the 21st century." },
            { k: "Vision", v: "A multipolar world in which authorship belongs to the rising — and global governance is a conversation among equals." },
            { k: "Values", v: "Sovereignty. Rigor. Pluralism. Long-horizon thinking. Action over posture. Quiet excellence." },
          ].map((b) => (
            <div key={b.k} className="bg-icen-surface/60 p-8">
              <div className="icen-overline">{b.k}</div>
              <div className="font-serif text-2xl text-white mt-4 leading-snug">{b.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="icen-overline mb-4">Charter</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">Why ICEN was founded.</h2>
          </div>
          <div className="space-y-6 text-slate-300 text-[15px] leading-relaxed">
            <p>Most multilateral institutions were designed in the aftermath of a war that is not ours, in a century that no longer exists. Their boards, their capital structure, their doctrines — all indexed to a world that has already passed.</p>
            <p>Meanwhile, the center of economic and demographic gravity has moved. It is moving still. ICEN was founded on the conviction that the nations driving that shift deserve — and are ready for — an institution of their own. Not a counter-bloc. An invitation to co-author.</p>
            <p>We are deliberately modest in size and uncompromising in rigor. Our work is done in rooms, not on stages. Our measure is not visibility; it is consequence.</p>
          </div>
        </div>

        <div className="icen-divider my-24" />
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-white">Join the council.</h3>
            <p className="text-slate-400 mt-2">Membership is by application and nomination.</p>
          </div>
          <Link to="/apply" className="icen-btn-primary" data-testid="about-apply-cta">Apply <ArrowRight size={16}/></Link>
        </div>
      </div>
    </div>
  );
}
