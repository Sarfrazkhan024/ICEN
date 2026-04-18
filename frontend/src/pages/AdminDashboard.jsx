import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ICENWordmark } from "../components/ICENEmblem";
import { LogOut, Users, Clock, CheckCircle, XCircle, Search, ExternalLink } from "lucide-react";

const STATUS_COLORS = {
  pending: "border-amber-400/40 text-amber-300 bg-amber-400/5",
  reviewing: "border-icen-blue/40 text-icen-blueSoft bg-icen-blue/5",
  approved: "border-icen-green/40 text-icen-greenSoft bg-icen-green/5",
  rejected: "border-red-400/40 text-red-300 bg-red-400/5",
};

export default function AdminDashboard() {
  const { user, loading, logout, authHeader, API } = useAuth();
  const [apps, setApps] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(true);

  const reload = async () => {
    setBusy(true);
    try {
      const [a, s] = await Promise.all([
        axios.get(`${API}/admin/applications`, { headers: authHeader() }),
        axios.get(`${API}/admin/stats`, { headers: authHeader() }),
      ]);
      setApps(a.data.items || []);
      setStats(s.data);
    } finally { setBusy(false); }
  };

  useEffect(() => {
    if (user) reload();
    // eslint-disable-next-line
  }, [user]);

  const visible = useMemo(() => {
    return apps.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (q && !(a.full_name.toLowerCase().includes(q.toLowerCase()) || a.email.toLowerCase().includes(q.toLowerCase()) || a.country.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [apps, filter, q]);

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/admin/applications/${id}/status`, { status }, { headers: authHeader() });
    await reload();
    if (selected && selected.id === id) setSelected({ ...selected, status });
  };

  if (!loading && !user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-icen-navy text-slate-200" data-testid="admin-dashboard">
      <header className="border-b border-white/10 bg-icen-navy/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <Link to="/"><ICENWordmark /></Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">Public site <ExternalLink size={12}/></Link>
            <button onClick={logout} data-testid="admin-logout" className="icen-btn-ghost py-2 px-4 text-xs"><LogOut size={13}/> Sign out</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="icen-overline mb-2">Secretariat</div>
            <h1 className="font-serif text-4xl md:text-5xl text-white">Applications</h1>
            <p className="text-slate-400 text-sm mt-2">Signed in as <span className="text-white">{user?.email}</span></p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5 border border-white/5 mb-10">
          <StatBox icon={Users} label="Total" value={stats?.total ?? "—"} />
          <StatBox icon={Clock} label="Pending" value={stats?.pending ?? 0} tone="amber" />
          <StatBox icon={Clock} label="Reviewing" value={stats?.reviewing ?? 0} tone="blue" />
          <StatBox icon={CheckCircle} label="Approved" value={stats?.approved ?? 0} tone="green" />
          <StatBox icon={XCircle} label="Rejected" value={stats?.rejected ?? 0} tone="red" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 border border-white/10 bg-icen-surface/50 px-3 py-2 w-full md:w-80">
            <Search size={14} className="text-slate-500" />
            <input
              data-testid="admin-search"
              placeholder="Search name, email, country…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex gap-1 bg-icen-surface/50 border border-white/10 p-1">
            {["all","pending","reviewing","approved","rejected"].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                data-testid={`filter-${s}`}
                className={`text-[11px] px-3 py-1.5 uppercase tracking-[0.16em] font-medium transition-colors ${filter===s ? "bg-icen-blue text-white" : "text-slate-400 hover:text-white"}`}
              >{s}</button>
            ))}
          </div>
          <button onClick={reload} className="icen-btn-ghost py-2 px-3 text-xs">Refresh</button>
        </div>

        {/* Table */}
        <div className="border border-white/10 overflow-x-auto">
          <table className="w-full text-sm" data-testid="admin-applications-table">
            <thead>
              <tr className="bg-icen-surface/60 border-b border-white/10 text-left">
                <th className="px-4 py-3 font-medium text-slate-400 tracking-wide text-[11px] uppercase">Applicant</th>
                <th className="px-4 py-3 font-medium text-slate-400 tracking-wide text-[11px] uppercase">Country</th>
                <th className="px-4 py-3 font-medium text-slate-400 tracking-wide text-[11px] uppercase">Tier</th>
                <th className="px-4 py-3 font-medium text-slate-400 tracking-wide text-[11px] uppercase">Date</th>
                <th className="px-4 py-3 font-medium text-slate-400 tracking-wide text-[11px] uppercase">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {busy && (
                <tr><td colSpan={6} className="text-center text-slate-500 py-16">Loading…</td></tr>
              )}
              {!busy && visible.length === 0 && (
                <tr><td colSpan={6} className="text-center text-slate-500 py-16">No applications yet.</td></tr>
              )}
              {visible.map((a) => (
                <tr key={a.id} className="border-b border-white/5 hover:bg-icen-surface/40 transition-colors" data-testid={`app-row-${a.id}`}>
                  <td className="px-4 py-4">
                    <div className="text-white font-medium">{a.full_name}</div>
                    <div className="text-xs text-slate-500">{a.email}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{a.country}</td>
                  <td className="px-4 py-4 capitalize text-slate-300">{a.membership_tier}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{new Date(a.created_at).toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] uppercase tracking-[0.2em] border px-2 py-1 ${STATUS_COLORS[a.status] || ""}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => setSelected(a)} className="text-xs text-icen-blueSoft hover:text-white" data-testid={`open-app-${a.id}`}>Open →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)} data-testid="app-drawer">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-[560px] h-full bg-icen-navy border-l border-white/10 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-icen-navy/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between">
              <div>
                <div className="icen-overline">Application</div>
                <div className="font-serif text-2xl text-white mt-1">{selected.full_name}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white text-sm">Close</button>
            </div>
            <div className="p-6 space-y-5 text-sm">
              <Detail label="Email" value={selected.email} />
              <Detail label="Country" value={selected.country} />
              <Detail label="Organization" value={selected.organization || "—"} />
              <Detail label="Role" value={selected.role_title || "—"} />
              <Detail label="Tier" value={selected.membership_tier} cap />
              <Detail label="Pillars" value={(selected.focus_pillars || []).join(", ") || "—"} />
              <Detail label="LinkedIn" value={selected.linkedin || "—"} />
              <div>
                <div className="icen-overline mb-2">Motivation</div>
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{selected.motivation}</p>
              </div>
              <div>
                <div className="icen-overline mb-3">Update Status</div>
                <div className="grid grid-cols-2 gap-2">
                  {["pending","reviewing","approved","rejected"].map((s) => (
                    <button
                      key={s}
                      data-testid={`set-status-${s}`}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`px-3 py-2 text-xs uppercase tracking-[0.2em] border transition-all ${
                        selected.status === s ? "border-icen-blue bg-icen-blue/20 text-white" : "border-white/15 text-slate-400 hover:text-white hover:border-white/40"
                      }`}
                    >{s}</button>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-slate-600 font-mono pt-4 border-t border-white/5">ID: {selected.id}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ icon: Icon, label, value, tone }) {
  const toneCls = {
    amber: "text-amber-300",
    blue: "text-icen-blueSoft",
    green: "text-icen-greenSoft",
    red: "text-red-300",
  }[tone] || "text-white";
  return (
    <div className="bg-icen-surface/60 p-6">
      <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-[0.24em]"><Icon size={13}/> {label}</div>
      <div className={`font-serif text-4xl mt-2 ${toneCls}`}>{value}</div>
    </div>
  );
}

function Detail({ label, value, cap }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-semibold">{label}</div>
      <div className={`col-span-2 text-slate-200 ${cap ? "capitalize" : ""}`}>{value}</div>
    </div>
  );
}
