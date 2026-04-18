import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FileText, Download, Users } from "lucide-react";
import SEO from "../components/SEO";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Research() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/research`).then(r => setItems(r.data.items || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-[120px] pb-24 bg-icen-ivory" data-testid="research-page">
      <SEO title="Research Library" description="Peer-reviewed research papers, policy frameworks, and indices from ICEN's twelve pillars and Observatory." path="/research" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">Research Library</div>
        <h1 className="font-serif text-5xl md:text-7xl text-icen-ink leading-[1.02] tracking-tight max-w-4xl">
          Frameworks, indices, <em className="italic text-icen-blue">and evidence.</em>
        </h1>
        <p className="mt-8 text-lg text-icen-inkSoft max-w-2xl leading-relaxed">
          Working papers and policy frameworks from the ICEN Observatory, pillar councils, and member-state collaborations.
        </p>

        {loading ? (
          <div className="mt-16 text-icen-muted">Loading…</div>
        ) : (
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {items.map((p) => (
              <Link key={p.id} to={`/research/${p.slug}`} className="group icen-card p-0 overflow-hidden flex flex-col md:flex-row" data-testid={`research-card-${p.slug}`}>
                {p.cover_image && (
                  <div className="md:w-[240px] md:min-w-[240px] aspect-[3/2] md:aspect-auto overflow-hidden bg-icen-mist">
                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-icen-blue font-semibold">
                    <FileText size={12} /> {p.pillar || "Observatory"}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-icen-ink mt-3 leading-tight group-hover:text-icen-blue transition-colors">{p.title}</h3>
                  <p className="mt-3 text-[13.5px] text-icen-inkSoft leading-relaxed flex-1 line-clamp-4">{p.abstract}</p>
                  <div className="mt-5 flex items-center justify-between text-[11px] text-icen-muted">
                    <span className="flex items-center gap-1"><Users size={12} /> {(p.authors || []).length} author{(p.authors||[]).length===1?"":"s"}</span>
                    <span className="flex items-center gap-1 text-icen-ink uppercase tracking-[0.22em] font-semibold">Read <Download size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
