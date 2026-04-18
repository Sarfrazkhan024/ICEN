import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { TIERS, PILLARS } from "../content/icen";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STEPS = ["Identity", "Profile", "Motivation", "Review"];

function Label({ children }) {
  return <label className="block text-[11px] uppercase tracking-[0.24em] text-slate-400 font-semibold mb-2">{children}</label>;
}

const inputCls = "w-full bg-transparent border border-white/15 px-4 py-3 text-white placeholder:text-slate-600 focus:border-icen-blue focus:outline-none transition-colors font-sans text-[15px]";

export default function Apply() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null); // {id}
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    country: "",
    organization: "",
    role_title: "",
    membership_tier: "fellow",
    focus_pillars: [],
    motivation: "",
    linkedin: "",
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const togglePillar = (title) => setForm((f) => ({
    ...f,
    focus_pillars: f.focus_pillars.includes(title)
      ? f.focus_pillars.filter((x) => x !== title)
      : f.focus_pillars.length < 4 ? [...f.focus_pillars, title] : f.focus_pillars
  }));

  const canNext = () => {
    if (step === 0) return form.full_name.length >= 2 && /.+@.+\..+/.test(form.email) && form.country.length >= 2;
    if (step === 1) return !!form.membership_tier;
    if (step === 2) return form.motivation.trim().length >= 30;
    return true;
  };

  const submit = async () => {
    setSubmitting(true); setError("");
    try {
      const { data } = await axios.post(`${API}/applications`, form);
      setSuccess({ id: data.id });
    } catch (e) {
      const detail = e?.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[120px] pb-24 bg-icen-navy min-h-screen relative" data-testid="apply-page">
      <div className="absolute inset-0 icen-grid opacity-[0.18]" />
      <div className="relative max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="icen-overline mb-6">Apply</div>
        <h1 className="font-serif text-5xl md:text-6xl text-white leading-[1.02] tracking-tight max-w-3xl">
          Submit your <em className="italic text-icen-green">candidacy.</em>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-xl">
          Review takes 7–10 business days. Every application is read by a member of the Secretariat.
        </p>

        {success ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-14 p-10 border border-icen-green/40 bg-icen-green/5" data-testid="apply-success">
            <div className="icen-overline text-icen-green">Received</div>
            <h2 className="font-serif text-4xl text-white mt-3">Your application is with the Secretariat.</h2>
            <p className="mt-4 text-slate-300">A confirmation has been sent to <span className="text-white">{form.email}</span>.</p>
            <p className="text-xs text-slate-500 mt-3 font-mono">Reference: {success.id}</p>
          </motion.div>
        ) : (
          <div className="mt-14">
            {/* Stepper */}
            <div className="flex items-center gap-3 mb-10" data-testid="apply-stepper">
              {STEPS.map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-2 ${i === step ? "text-white" : i < step ? "text-icen-green" : "text-slate-500"}`}>
                    <div className={`w-7 h-7 border flex items-center justify-center text-xs ${
                      i === step ? "border-icen-blue bg-icen-blue text-white" :
                      i < step ? "border-icen-green text-icen-green" :
                      "border-white/20"
                    }`}>{i < step ? <Check size={13}/> : i + 1}</div>
                    <span className="text-[11px] uppercase tracking-[0.24em] hidden md:block">{s}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="flex-1 h-px bg-white/10" />}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-icen-surface/60 backdrop-blur-xl border border-white/10 p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                  {step === 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Full name</Label>
                        <input data-testid="apply-fullname" className={inputCls} value={form.full_name} onChange={update("full_name")} placeholder="Jane Okafor" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <input data-testid="apply-email" type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="jane@ministry.gov" />
                      </div>
                      <div>
                        <Label>Country</Label>
                        <input data-testid="apply-country" className={inputCls} value={form.country} onChange={update("country")} placeholder="Nigeria" />
                      </div>
                      <div>
                        <Label>LinkedIn (optional)</Label>
                        <input data-testid="apply-linkedin" className={inputCls} value={form.linkedin} onChange={update("linkedin")} placeholder="https://linkedin.com/in/..." />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label>Organization</Label>
                          <input data-testid="apply-organization" className={inputCls} value={form.organization} onChange={update("organization")} placeholder="Ministry / Company / Institution" />
                        </div>
                        <div>
                          <Label>Role / Title</Label>
                          <input data-testid="apply-role" className={inputCls} value={form.role_title} onChange={update("role_title")} placeholder="Director of Policy" />
                        </div>
                      </div>
                      <div className="mt-8">
                        <Label>Membership Tier</Label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {TIERS.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              data-testid={`apply-tier-${t.id}`}
                              onClick={() => setForm({ ...form, membership_tier: t.id })}
                              className={`text-left p-4 border transition-all ${form.membership_tier === t.id ? "border-icen-blue bg-icen-blue/10" : "border-white/10 hover:border-white/30"}`}
                            >
                              <div className="font-serif text-xl text-white">{t.name}</div>
                              <div className="text-xs text-slate-400 mt-1">{t.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8">
                        <Label>Focus Pillars (pick up to 4)</Label>
                        <div className="flex flex-wrap gap-2">
                          {PILLARS.map((p) => {
                            const on = form.focus_pillars.includes(p.title);
                            return (
                              <button
                                key={p.id}
                                type="button"
                                data-testid={`apply-pillar-${p.id}`}
                                onClick={() => togglePillar(p.title)}
                                className={`text-[12px] px-3 py-2 border transition-all ${on ? "border-icen-green bg-icen-green/10 text-white" : "border-white/10 text-slate-300 hover:border-white/30"}`}
                              >{p.title}</button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <Label>Why ICEN? (min 30 chars)</Label>
                      <textarea
                        data-testid="apply-motivation"
                        className={`${inputCls} min-h-[180px] resize-y`}
                        value={form.motivation}
                        onChange={update("motivation")}
                        placeholder="Share your motivation, your vision for emerging nations, and how you would contribute."
                      />
                      <div className="text-xs text-slate-500 mt-2">{form.motivation.length} / 2000</div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5 text-sm">
                      <div className="icen-overline">Review</div>
                      <dl className="grid grid-cols-3 gap-y-3 gap-x-6 text-slate-300">
                        <dt className="col-span-1 text-slate-500">Name</dt><dd className="col-span-2">{form.full_name}</dd>
                        <dt className="col-span-1 text-slate-500">Email</dt><dd className="col-span-2">{form.email}</dd>
                        <dt className="col-span-1 text-slate-500">Country</dt><dd className="col-span-2">{form.country}</dd>
                        <dt className="col-span-1 text-slate-500">Organization</dt><dd className="col-span-2">{form.organization || "—"}</dd>
                        <dt className="col-span-1 text-slate-500">Role</dt><dd className="col-span-2">{form.role_title || "—"}</dd>
                        <dt className="col-span-1 text-slate-500">Tier</dt><dd className="col-span-2 capitalize">{form.membership_tier}</dd>
                        <dt className="col-span-1 text-slate-500">Pillars</dt><dd className="col-span-2">{form.focus_pillars.join(", ") || "—"}</dd>
                      </dl>
                      <div>
                        <div className="icen-overline mb-2">Motivation</div>
                        <p className="text-slate-300 whitespace-pre-wrap">{form.motivation}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {error && (
                <div className="mt-6 flex items-center gap-2 text-sm text-red-300 border border-red-500/30 bg-red-500/5 p-3">
                  <AlertCircle size={16}/> {error}
                </div>
              )}

              <div className="mt-10 flex items-center justify-between">
                <button
                  disabled={step === 0 || submitting}
                  onClick={() => setStep((s) => s - 1)}
                  data-testid="apply-back"
                  className="text-sm text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                >← Back</button>

                {step < STEPS.length - 1 ? (
                  <button
                    disabled={!canNext()}
                    onClick={() => setStep((s) => s + 1)}
                    data-testid="apply-next"
                    className="icen-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >Continue <ArrowRight size={14}/></button>
                ) : (
                  <button
                    disabled={submitting}
                    onClick={submit}
                    data-testid="apply-submit"
                    className="icen-btn-primary disabled:opacity-60"
                  >{submitting ? "Submitting…" : "Submit Application"} <ArrowRight size={14}/></button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
