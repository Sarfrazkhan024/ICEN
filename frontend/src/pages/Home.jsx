import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import HeroGlobe from "../components/HeroGlobe";
import AnimatedCounter from "../components/AnimatedCounter";
import * as Icons from "lucide-react";
import { PILLARS, TIERS, REGIONS } from "../content/icen";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Stat = ({ end, suffix = "", label, kicker }) => (
  <div className="flex flex-col gap-3 border-l border-white/10 pl-6 md:pl-8">
    <div className="icen-overline">{kicker}</div>
    <div className="font-serif text-5xl md:text-6xl text-white font-semibold tracking-tight">
      <AnimatedCounter end={end} suffix={suffix} />
    </div>
    <div className="text-slate-400 text-sm tracking-wide">{label}</div>
  </div>
);

function PillarCard({ p, idx }) {
  const Icon = Icons[p.icon] || Icons.Sparkles;
  return (
    <motion.div
      variants={fadeUp}
      className="group relative p-6 md:p-7 bg-icen-surface/60 backdrop-blur-xl border border-white/5 hover:border-icen-blue/40 transition-all duration-500 overflow-hidden"
      data-testid={`pillar-card-${p.id}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-icen-blue/0 via-transparent to-icen-green/0 group-hover:from-icen-blue/10 group-hover:to-icen-green/5 transition-all duration-500" />
      <div className="relative flex items-start justify-between">
        <div className="text-xs font-mono text-slate-500 tracking-widest">P.{String(p.id).padStart(2,'0')}</div>
        <Icon className="text-icen-blue group-hover:text-icen-green transition-colors" size={22} strokeWidth={1.4} />
      </div>
      <h3 className="relative font-serif text-xl md:text-2xl text-white mt-6 leading-tight">{p.title}</h3>
      <p className="relative mt-3 text-sm text-slate-400 leading-relaxed max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 overflow-hidden">
        {p.desc}
      </p>
      <div className="relative mt-6 flex items-center text-[11px] uppercase tracking-[0.24em] text-slate-500 group-hover:text-icen-green transition-colors">
        Explore <ArrowRight size={12} className="ml-2" />
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[100vh] icen-spotlight overflow-hidden pt-[76px]" data-testid="hero-section">
        <div className="absolute inset-0 icen-grid opacity-[0.25]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 grid lg:grid-cols-[1.1fr_1fr] gap-6 items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="icen-overline mb-6 flex items-center gap-3">
              <Globe2 size={14} /> A Global Council · Est. MMXXVI
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-[48px] md:text-[72px] lg:text-[86px] leading-[0.98] tracking-tight text-white">
              Where <em className="font-serif italic text-icen-green">emerging nations</em><br/>
              shape the future <br/>
              <span className="text-slate-300">together.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-xl text-[17px] md:text-lg text-slate-400 leading-relaxed">
              ICEN is a non-state, non-partisan council of leaders, builders and nations — architecting a rising world order through policy, capital and craft.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link to="/apply" className="icen-btn-primary" data-testid="hero-apply-cta">
                Apply for Membership <ArrowRight size={16} />
              </Link>
              <Link to="/chapters" className="icen-btn-ghost" data-testid="hero-explore-cta">
                Explore the Network
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4 text-[11px] tracking-[0.28em] uppercase text-slate-500">
              <span className="h-px w-10 bg-white/20" /> Geneva · New Delhi · Nairobi · São Paulo
            </motion.div>
          </motion.div>

          <div className="relative h-[520px] lg:h-[620px]">
            <HeroGlobe height={620} />
          </div>
        </div>
        <div className="icen-divider mt-4" />
      </section>

      {/* STATS */}
      <section className="py-24 md:py-32 bg-icen-navy relative" data-testid="stats-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-10">
            <Stat kicker="Scope" end={50} suffix="+" label="Emerging nations represented" />
            <Stat kicker="Framework" end={12} label="Pillars of national power" />
            <Stat kicker="Geography" end={8} label="Regional chapters worldwide" />
            <Stat kicker="Network" end={10000} suffix="+" label="Fellows, builders & leaders" />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24 md:py-32 bg-icen-navy relative overflow-hidden" data-testid="pillars-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="icen-overline mb-4">The Framework</div>
              <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-[1.05] max-w-2xl">
                Twelve pillars. <br/><span className="text-slate-400">One sovereign agenda.</span>
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-[15px] leading-relaxed">
              Each pillar is a working group — convening ministers, builders, scientists, and capital — to translate ambition into instruments of policy.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5"
          >
            {PILLARS.map((p, i) => (<PillarCard key={p.id} p={p} idx={i} />))}
          </motion.div>
        </div>
      </section>

      {/* STORY PARALLAX */}
      <section
        className="relative py-40 md:py-56 overflow-hidden"
        data-testid="story-section"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.9) 100%), url('https://static.prod-images.emergentagent.com/jobs/d78fab64-922e-4f0a-99f8-def3f822c3af/images/5f550a39a10e456fd0913fe523ce242d3ea26e7505ca19e680ddd12f308dbed8.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
          >
            <div className="icen-overline mb-6 flex items-center gap-3"><Sparkles size={14}/> Why ICEN Exists</div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight">
              This is not built<br/>for the powerful.
            </h2>
            <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-icen-green leading-[1.02] tracking-tight mt-3">
              It is built for the rising.
            </h2>
            <div className="mt-12 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed space-y-6">
              <p>The twentieth century was engineered in rooms we were not invited to. The institutions that govern the world were drawn on borders that no longer describe it.</p>
              <p>ICEN is the room we build — together. A council where sovereignty is a starting point, not a permission slip. Where emerging nations stop negotiating for a seat and start designing the table.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GLOBAL STRUCTURE */}
      <section className="py-24 md:py-32 bg-icen-navy" data-testid="regions-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="icen-overline mb-4">Global Structure</div>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] tracking-tight">
                Eight regions.<br/><span className="text-slate-400">One council.</span>
              </h2>
            </div>
            <Link to="/chapters" className="icen-btn-ghost self-start md:self-end">See all chapters <ArrowRight size={14}/></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {REGIONS.map((r) => (
              <div key={r.id} className="group p-7 bg-icen-surface/60 hover:bg-icen-elevated/60 transition-all duration-500 border-0" data-testid={`region-card-${r.id}`}>
                <div className="font-mono text-xs text-slate-500 tracking-widest">R.{r.id.toUpperCase()}</div>
                <h3 className="font-serif text-2xl text-white mt-4 leading-tight">{r.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="font-serif text-4xl text-icen-blue font-semibold">{r.chapters}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Chapters</div>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {r.countries.slice(0, 6).map((c) => (
                    <span key={c} className="text-[11px] px-2 py-1 border border-white/10 text-slate-300 group-hover:border-icen-blue/40 group-hover:text-white transition-colors">{c}</span>
                  ))}
                  {r.countries.length > 6 && <span className="text-[11px] px-2 py-1 text-slate-500">+{r.countries.length - 6}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW */}
      <section className="py-24 md:py-32 bg-icen-navy relative overflow-hidden" data-testid="membership-section">
        <div className="absolute inset-0 icen-grid opacity-[0.2]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="icen-overline mb-4">Membership</div>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] tracking-tight">
                Four tiers.<br/><span className="text-slate-400">One standard of rigor.</span>
              </h2>
            </div>
            <Link to="/membership" className="icen-btn-ghost self-start md:self-end">Compare tiers <ArrowRight size={14}/></Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t) => (
              <div
                key={t.id}
                data-testid={`tier-card-${t.id}`}
                className={`relative p-7 border transition-all duration-500 ${
                  t.highlight
                    ? "bg-gradient-to-b from-icen-blue/20 to-icen-surface/80 border-icen-blue/50 shadow-glowStrong"
                    : "bg-icen-surface/60 border-white/8 hover:border-white/25"
                } backdrop-blur-xl`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-7 px-3 py-1 bg-icen-blue text-white text-[10px] uppercase tracking-[0.24em] font-semibold">{t.badge}</div>
                )}
                {!t.highlight && (
                  <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500 font-semibold">{t.badge}</div>
                )}
                <h3 className="font-serif text-3xl text-white mt-4">{t.name}</h3>
                <div className="text-sm text-slate-400 mt-2">{t.price}</div>
                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="text-[13px] text-slate-300 flex gap-2"><span className="text-icen-green">—</span>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 md:py-44 bg-icen-navy overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 icen-spotlight opacity-60" />
        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="icen-overline mb-6">The Call</div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight">
            The world does not wait.
          </h2>
          <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-icen-blue leading-[1.02] tracking-tight mt-3">
            Neither should you.
          </h2>
          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link to="/apply" className="icen-btn-primary" data-testid="final-cta-apply">
              Apply Now <ArrowRight size={16}/>
            </Link>
            <Link to="/about" className="icen-btn-ghost">Read our charter</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
