import React from "react";
import { Link } from "react-router-dom";
import { ICENWordmark } from "./ICENEmblem";

export default function Footer() {
  return (
    <footer className="relative bg-icen-navy border-t border-white/10 mt-24" data-testid="main-footer">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <ICENWordmark />
          <p className="mt-6 text-sm text-slate-400 max-w-md leading-relaxed">
            A global council where emerging nations shape the future together. Independent, non-partisan, and built for the rising world.
          </p>
          <div className="mt-6 icen-overline">Est. 2026 · Geneva · New Delhi · Nairobi</div>
        </div>
        <div>
          <div className="icen-overline mb-4">Institution</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link className="hover:text-white transition-colors" to="/about">About ICEN</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/governance">Governance</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/chapters">Chapters</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/programs">Programs</Link></li>
          </ul>
        </div>
        <div>
          <div className="icen-overline mb-4">Engage</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link className="hover:text-white transition-colors" to="/membership">Membership</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/apply">Apply</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/pillars">The 12 Pillars</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/admin/login">Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-xs text-slate-500 tracking-wide">© 2026 ICEN — International Council for Emerging Nations. All rights reserved.</div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-slate-600">Non-state · Non-partisan · Non-aligned</div>
        </div>
      </div>
    </footer>
  );
}
