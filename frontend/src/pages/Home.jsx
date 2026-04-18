import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import HeroGlobe from "../components/HeroGlobe";
import AnimatedCounter from "../components/AnimatedCounter";
import { PILLARS, TIERS, REGIONS } from "../content/icen";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Stat = ({ end, suffix = "", label, kicker }) => (
  <div className="flex flex-col gap-3 border-l border-icen-line pl-6 md:pl-8">
    <div className="icen-overline">{kicker}</div>
    <div className="font-serif text-5xl md:text-6xl text-icen-ink font-semibold tracking-tight">
      <AnimatedCounter end={end} suffix={suffix} />
    </div>
    <div className="text-icen-inkSoft text-sm tracking-wide">{label}</div>
  </div>
);

function PillarCard({ p }) {
  const Icon = Icons[p.icon] || Icons.Sparkles;
  return (
    <motion.div
      variants={fadeUp}
      className="group relative p-7 md:p-8 icen-card overflow-hidden"
      data-testid={`pillar-card-${p.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="text-xs font-mono text-icen-muted tracking-widest">P.{String(p.id).padStart(2, '0')}</div>
        <Icon className="text-icen-blue group-hover:text-icen-green transition-colors" size={22} strokeWidth={1.4} />
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-icen-ink mt-7 leading-tight">{p.title}</h3>
      <p className="mt-3 text-[13.5px] text-icen-inkSoft leading-relaxed max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 overflow-hidden">
        {p.desc}
      </p>
      <div className="mt-6 flex items-center text-[11px] uppercase tracking-[0.24em] text-icen-muted group-hover:text-icen-blue transition-colors">
        Explore <ArrowRight size={12} className="ml-2" />
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative bg-icen-ivory">
      {/* HERO */}
      <section className="relative min-h-[100vh] overflow-hidden pt-[80px]" data-testid="hero-section">
        <div className="absolute inset-0 icen-grid-light opacity-70" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-14 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="icen-overline mb-6 flex items-center gap-3">
              <Globe2 size={14} /> A Global Council · Est. MMXXVI
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-[48px] md:text-[68px] lg:text-[84px] leading-[0.98] tracking-tight text-icen-ink">
              Where <em className="italic text-icen-blue">emerging nations</em><br />
              shape the future<br />
              <span className="text-icen-inkSoft">together.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-xl text-[17px] md:text-lg text-icen-inkSoft leading-relaxed">
              ICEN is a non-state, non-partisan council of leaders, builders and nations — architecting a rising world order through policy, capital and craft.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link to="/apply" className="icen-btn-primary" data-testid="hero-apply-cta">
                Apply for Membership <ArrowRight size={14} />
              </Link>
              <Link to="/chapters" className="icen-btn-ghost" data-testid="hero-explore-cta">
                Explore the Network
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-14 flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-icen-muted">
              <span className="h-px w-10 bg-icen-line" /> Geneva · New Delhi · Nairobi · São Paulo
            </motion.div>
          </motion.div>

          {/* Globe panel — dark for premium contrast on ivory */}
          <div className="relative">
            <div className="relative icen-panel-dark rounded-none overflow-hidden" style={{ height: 620 }}>
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-5 text-white/70 text-[10px] uppercase tracking-[0.28em] font-sans">
                <span>ICEN · Global Network</span>
                <span>Live</span>
              </div>
              <HeroGlobe height={620} />
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 text-white/50 text-[10px] uppercase tracking-[0.28em] font-sans flex justify-between">
                <span>50 nations · 8 regions</span>
                <span>Autorotation enabled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 md:py-32 bg-icen-paper relative border-t border-icen-line" data-testid="stats-section">
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
      <section className="py-24 md:py-32 bg-icen-ivory relative overflow-hidden" data-testid="pillars-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="icen-overline mb-4">The Framework</div>
              <h2 className="font-serif text-4xl md:text-6xl text-icen-ink tracking-tight leading-[1.05] max-w-2xl">
                Twelve pillars.<br /><span className="text-icen-inkSoft">One sovereign agenda.</span>
              </h2>
            </div>
            <p className="max-w-md text-icen-inkSoft text-[15px] leading-relaxed">
              Each pillar is a working group — convening ministers, builders, scientists, and capital — to translate ambition into instruments of policy.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {PILLARS.map((p) => (<PillarCard key={p.id} p={p} />))}
          </motion.div>
        </div>
      </section>

      {/* STORY PARALLAX — kept dark for cinematic drama */}
      <section
        className="relative py-40 md:py-56 overflow-hidden"
        data-testid="story-section"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(10,22,40,0.72) 0%, rgba(10,22,40,0.92) 100%), url('https://static.prod-images.emergentagent.com/jobs/d78fab64-922e-4f0a-99f8-def3f822c3af/images/5f550a39a10e456fd0913fe523ce242d3ea26e7505ca19e680ddd12f308dbed8.png')",
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
            <div className="icen-overline icen-overline-inv mb-6 flex items-center gap-3"><Sparkles size={14} /> Why ICEN Exists</div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight">
              This is not built<br />for the powerful.
            </h2>
            <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-icen-blueSoft leading-[1.02] tracking-tight mt-3">
              It is built for the rising.
            </h2>
            <div className="mt-12 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed space-y-6">
              <p>The twentieth century was engineered in rooms we were not invited to. The institutions that govern the world were drawn on borders that no longer describe it.</p>
              <p>ICEN is the room we build — together. A council where sovereignty is a starting point, not a permission slip. Where emerging nations stop negotiating for a seat and start designing the table.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GLOBAL STRUCTURE */}
      <section className="py-24 md:py-32 bg-icen-paper" data-testid="regions-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="icen-overline mb-4">Global Structure</div>
              <h2 className="font-serif text-4xl md:text-6xl text-icen-ink leading-[1.05] tracking-tight">
                Eight regions.<br /><span className="text-icen-inkSoft">One council.</span>
              </h2>
            </div>
            <Link to="/chapters" className="icen-btn-ghost self-start md:self-end">See all chapters <ArrowRight size={14} /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REGIONS.map((r) => (
              <div key={r.id} className="group p-7 icen-card" data-testid={`region-card-${r.id}`}>
                <div className="font-mono text-xs text-icen-muted tracking-widest">R.{r.id.toUpperCase()}</div>
                <h3 className="font-serif text-2xl text-icen-ink mt-4 leading-tight">{r.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="font-serif text-4xl text-icen-blue font-semibold">{r.chapters}</div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-icen-muted">Chapters</div>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {r.countries.slice(0, 6).map((c) => (
                    <span key={c} className="text-[11px] px-2 py-1 border border-icen-line text-icen-inkSoft group-hover:border-icen-ink/50 transition-colors">{c}</span>
                  ))}
                  {r.countries.length > 6 && <span className="text-[11px] px-2 py-1 text-icen-muted">+{r.countries.length - 6}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW */}
      <section className="py-24 md:py-32 bg-icen-ivory relative overflow-hidden" data-testid="membership-section">
        <div className="absolute inset-0 icen-grid-light opacity-60" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="icen-overline mb-4">Membership</div>
              <h2 className="font-serif text-4xl md:text-6xl text-icen-ink leading-[1.05] tracking-tight">
                Four tiers.<br /><span className="text-icen-inkSoft">One standard of rigor.</span>
              </h2>
            </div>
            <Link to="/membership" className="icen-btn-ghost self-start md:self-end">Compare tiers <ArrowRight size={14} /></Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((t) => (
              <div
                key={t.id}
                data-testid={`tier-card-${t.id}`}
                className={`relative p-8 transition-all duration-500 ${
                  t.highlight
                    ? "icen-panel-dark border border-icen-ink shadow-card"
                    : "icen-card"
                }`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-7 px-3 py-1 bg-icen-blue text-white text-[10px] uppercase tracking-[0.24em] font-semibold">{t.badge}</div>
                )}
                {!t.highlight && (
                  <div className="text-[10px] uppercase tracking-[0.24em] text-icen-muted font-semibold">{t.badge}</div>
                )}
                <h3 className={`font-serif text-3xl mt-4 ${t.highlight ? "text-white" : "text-icen-ink"}`}>{t.name}</h3>
                <div className={`text-sm mt-2 ${t.highlight ? "text-white/70" : "text-icen-muted"}`}>{t.price}</div>
                <ul className="mt-8 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className={`text-[13px] flex gap-2 ${t.highlight ? "text-white/85" : "text-icen-inkSoft"}`}>
                      <span className="text-icen-blue">—</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — dark for dramatic close */}
      <section className="relative py-32 md:py-44 icen-spotlight-dark overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 icen-grid-dark opacity-40" />
        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="icen-overline icen-overline-inv mb-6">The Call</div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight">
            The world does not wait.
          </h2>
          <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-icen-blueSoft leading-[1.02] tracking-tight mt-3">
            Neither should you.
          </h2>
          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link to="/apply" className="icen-btn-primary bg-white text-icen-ink border-white hover:bg-icen-blue hover:text-white hover:border-icen-blue" data-testid="final-cta-apply">
              Apply Now <ArrowRight size={14} />
            </Link>
            <Link to="/about" className="icen-btn-ghost-inv">Read our charter</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
