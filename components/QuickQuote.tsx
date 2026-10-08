"use client";

import { useState } from "react";
import { divisions, tradeModes } from "@/lib/site";
import { ArrowRight, Swap } from "./icons";

export type Prefill = {
  mode: string;
  category: string;
  from: string;
  to: string;
};

export const PREFILL_EVENT = "littlenext:prefill";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-electric-400 focus:bg-white/[0.09]";

export function QuickQuote() {
  const [mode, setMode] = useState<string>(tradeModes[0]);
  const [category, setCategory] = useState(divisions[0].title);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const detail: Prefill = { mode, category, from: from.trim(), to: to.trim() };
    window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form
      onSubmit={submit}
      className="relative w-full rounded-[1.75rem] border border-white/15 bg-night-900/50 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6"
      aria-label="Quick enquiry"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">Instant enquiry</p>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Takes 2 min
        </span>
      </div>

      {/* Segmented control */}
      <div role="radiogroup" aria-label="Trade type" className="mt-5 grid grid-cols-3 rounded-full bg-white/[0.06] p-1">
        {tradeModes.map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full py-2 text-sm font-medium transition ${
              mode === m ? "bg-white text-night-950 shadow" : "text-white/70 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/50">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23ffffff99'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10 [&>option]:text-night-950`}
        >
          {divisions.map((d) => (
            <option key={d.id}>{d.title}</option>
          ))}
          <option>Other products</option>
        </select>
      </label>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/50">From</span>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Origin country" className={inputClass} />
        </label>
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap origin and destination"
          className="mb-1 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:rotate-180 hover:border-electric-400 hover:text-white"
        >
          <Swap className="h-4 w-4" />
        </button>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/50">To</span>
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Destination" className={inputClass} />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric-500 to-electric-600 py-3.5 font-semibold text-white shadow-lg shadow-electric-600/30 transition hover:brightness-110"
      >
        Continue to quote
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-3 text-center text-xs text-white/45">No obligation · We reply within one business day</p>
    </form>
  );
}
