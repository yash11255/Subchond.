"use client";

import { useState } from "react";
import { Download, Lock, Phone, RefreshCw, Search } from "lucide-react";
import type { Lead } from "@/app/api/leads/route";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const load = async () => {
    setError("");
    const res = await fetch("/api/leads", { headers: { "x-admin-password": password } });
    if (!res.ok) return setError(res.status === 401 ? "Wrong password." : "Could not load leads.");
    setLeads((await res.json()).leads);
  };

  const exportCsv = () => {
    if (!leads) return;
    const cols: (keyof Lead)[] = ["createdAt", "name", "age", "gender", "phone", "action", "question", "summary"];
    const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => cell(l[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  if (!leads) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAF9] px-4 pt-24 font-sans-clean">
        <form onSubmit={(e) => { e.preventDefault(); load(); }}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-[#0F766E]/15 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-2 text-[#0F766E]"><Lock className="h-5 w-5" /><h1 className="text-lg font-bold">Clinic Admin</h1></div>
          <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[#0F766E]/25 px-3 py-2.5 focus:border-[#0F766E] focus:outline-none" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-full bg-[#0F766E] py-2.5 font-semibold text-white hover:bg-[#115E59]">Sign in</button>
        </form>
      </main>
    );
  }

  const q = query.toLowerCase();
  const shown = leads.filter((l) => !q || `${l.name} ${l.phone} ${l.question}`.toLowerCase().includes(q));
  const today = leads.filter((l) => l.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)).length;

  return (
    <main className="min-h-screen bg-[#F7FAF9] px-4 pb-16 pt-28 font-sans-clean text-[#1B2B2A] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-3xl font-bold">AI Assistant Leads</h1>
            <p className="text-sm text-[#4B5F5D]">Patients who downloaded a report or shared on WhatsApp.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="flex items-center gap-1.5 rounded-full border border-[#0F766E]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0F766E]"><RefreshCw className="h-4 w-4" />Refresh</button>
            <button onClick={exportCsv} className="flex items-center gap-1.5 rounded-full bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white"><Download className="h-4 w-4" />Export CSV</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[["Total leads", leads.length], ["Today", today], ["WhatsApp shares", leads.filter((l) => l.action === "share").length]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-[#0F766E]/15 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#4B5F5D]">{k}</p>
              <p className="mt-1 text-3xl font-bold text-[#0F766E]">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-[#0F766E]/20 bg-white px-4 py-2">
          <Search className="h-4 w-4 text-[#4B5F5D]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone, question…" className="flex-1 bg-transparent text-sm focus:outline-none" />
        </div>

        <div className="mt-4 space-y-3">
          {shown.length === 0 && <p className="py-10 text-center text-sm text-[#4B5F5D]">No leads yet.</p>}
          {shown.map((l) => (
            <div key={l.id} className="rounded-xl border border-[#0F766E]/15 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold">{l.name} <span className="font-normal text-[#4B5F5D]">· {l.age} · {l.gender}</span></p>
                  <p className="text-xs text-[#4B5F5D]">{new Date(l.createdAt).toLocaleString()} · {l.action === "share" ? "WhatsApp share" : "PDF download"}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${l.phone}`} className="flex items-center gap-1 rounded-full bg-[#E8F1EF] px-3 py-1.5 text-xs font-semibold text-[#0F766E]"><Phone className="h-3.5 w-3.5" />{l.phone}</a>
                  <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" className="rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white">WhatsApp</a>
                  <button onClick={() => setOpen(open === l.id ? null : l.id)} className="rounded-full border border-[#0F766E]/25 px-3 py-1.5 text-xs font-semibold">{open === l.id ? "Hide" : "View"} analysis</button>
                </div>
              </div>
              {open === l.id && (
                <div className="mt-3 rounded-lg bg-[#F7FAF9] p-3 text-sm">
                  <p className="font-semibold">Q: {l.question}</p>
                  <p className="mt-2 whitespace-pre-wrap text-[#4B5F5D]">{l.summary}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
