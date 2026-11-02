"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { DEM, REP, pct, signed } from "./colors";
import type { District } from "./types";

const STEPS = [
  { label: "Partisan lean", note: "2024 presidential margin on the 2026 lines, compared with the nation" },
  { label: "National mood", note: "Generic ballot and presidential approval shift every seat together" },
  { label: "Candidates and money", note: "Incumbency, last cycle's over- or underperformance, FEC fundraising" },
  { label: "Expert ratings", note: "Cook, Inside Elections, and Sabato, for the seats they rate" },
  { label: "District polls", note: "Recent polls, adjusted 5 points against partisan sponsors" },
];

/**
 * Pick a district and watch its predicted margin get built, one input at a time. Each bar spans from the
 * previous step's margin to this step's, so the chart reads like a ledger of who moved the race and how far.
 */
export default function Walkthrough({ districts, initial }: { districts: District[]; initial: string }) {
  const sorted = useMemo(() => [...districts].sort((a, b) => a.id.localeCompare(b.id)), [districts]);
  const [id, setId] = useState(initial);
  const d = sorted.find((x) => x.id === id) ?? sorted[0];
  const vals = d.steps;
  const range = Math.max(12, ...vals.map((v) => Math.abs(v))) * 1.15;
  const x = (v: number) => 50 + (v / range) * 50; // percent across, 0 margin at the center

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <label className="text-sm text-slate-400">
          District
          <span className="relative ml-3 inline-block">
            <select value={d.id} onChange={(e) => setId(e.target.value)}
              className="cursor-pointer appearance-none rounded-md border border-white/15 bg-navy-dark py-1.5 pl-3 pr-9 font-mono text-white hover:border-white/30 focus:border-white/40 focus:outline-none">
              {sorted.map((x) => <option key={x.id} value={x.id}>{x.id}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          </span>
        </label>
        <p className="text-sm text-slate-400">
          Predicted margin <span className="font-semibold text-white">{signed(vals[4])}</span>, a{" "}
          <span className="font-semibold text-white">{pct(d.p)}</span> chance the Democrat wins

        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" aria-hidden />
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>← more Republican</span>
          <span>more Democratic →</span>
        </div>
        <ol className="space-y-1">
          {STEPS.map((s, i) => {
            const from = i === 0 ? 0 : vals[i - 1];
            const to = vals[i];
            const delta = to - from;
            const left = Math.min(x(from), x(to));
            const width = Math.max(Math.abs(x(to) - x(from)), 0.4);
            return (
              <li key={s.label} className="grid grid-cols-[minmax(0,1fr)] gap-1 py-2 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                <div>
                  <p className="text-sm text-white">{s.label}</p>
                  <p className="hidden text-xs leading-snug text-slate-500 sm:block">{s.note}</p>
                </div>
                <div className="relative h-7 self-center">
                  <div className="absolute top-1.5 h-4 rounded-sm transition-all duration-500"
                    style={{ left: `${left}%`, width: `${width}%`, background: (i === 0 ? to : delta) >= 0 ? DEM : REP, opacity: i === 0 ? 1 : 0.8 }} />
                  <span className="absolute top-1 whitespace-nowrap text-xs tabular-nums text-slate-300 transition-all duration-500"
                    style={left + width < 82 ? { left: `calc(${left + width}% + 6px)` } : { right: `calc(${100 - left}% + 6px)` }}>
                    {i === 0 ? signed(to) : `${delta >= 0 ? "+" : "−"}${Math.abs(delta).toFixed(1)}`}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Steps are the model&apos;s layers added one at a time, so a step can also re-weight earlier inputs: once expert
        ratings enter, the model leans less on raw partisanship in rated seats.
      </p>
    </div>
  );
}
