"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import { pct, probColor, signed } from "./colors";
import type { District, LiveState } from "./types";

type Key = "id" | "lean" | "rating" | "p" | "pMkt" | "pBlend" | "gap" | "live";

const RATING = (r: number | null) => {
  if (r == null) return "Safe";
  const a = Math.abs(r);
  const side = r < 0 ? "D" : "R";
  if (a < 0.25) return "Toss-up";
  if (a < 0.75) return `Tilt ${side}`;
  if (a < 1.5) return `Lean ${side}`;
  if (a < 2.5) return `Likely ${side}`;
  return `Solid ${side}`;
};

/** Competitive seats (2–98% in any view), searchable and sortable. */
export default function DistrictTable({ districts, live }: { districts: District[]; live: LiveState | null }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: Key; asc: boolean }>({ key: "p", asc: true });

  const rows = useMemo(() => {
    const val = (d: District, k: Key): number | string => {
      if (k === "gap") return d.pMkt == null ? -1 : Math.abs(d.p - d.pMkt);
      if (k === "live") return live?.districts[d.id]?.[0] ?? d.p;
      const v = d[k];
      return v == null ? (k === "rating" ? 9 : -1) : v;
    };
    const competitive = districts.filter((d) =>
      [d.p, d.pBlend, d.pMkt ?? d.p, live?.districts[d.id]?.[0] ?? d.p].some((p) => p > 0.02 && p < 0.98));
    const needle = q.trim().toUpperCase().replace(/\s+/g, "");
    return competitive
      .filter((d) => !needle || d.id.replace("-", "").includes(needle.replace("-", "")) || d.id.startsWith(needle))
      .sort((a, b) => {
        const x = val(a, sort.key);
        const y = val(b, sort.key);
        const c = x < y ? -1 : x > y ? 1 : 0;
        return sort.asc ? c : -c;
      });
  }, [districts, live, q, sort]);

  const th = (key: Key, label: string, title?: string) => (
    <th className="cursor-pointer select-none px-2 py-2 text-right font-medium first:text-left" title={title}
      onClick={() => setSort((s) => ({ key, asc: s.key === key ? !s.asc : key === "id" }))}>
      <span className="inline-flex items-center gap-1">
        {label}
        {sort.key === key && (sort.asc ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
      </span>
    </th>
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a district (PA-07, NY)"
          aria-label="Search districts"
          className="w-full max-w-xs rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-[#3ec8c4] focus:outline-none" />
        <span className="font-mono text-xs text-slate-500">{rows.length} competitive seats</span>
      </div>
      <div className="max-h-[32rem] overflow-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[640px] text-sm tabular-nums">
          <thead className="sticky top-0 bg-navy-dark text-xs text-slate-400">
            <tr>
              {th("id", "District")}
              <th className="px-2 py-2 text-right font-medium">Inc.</th>
              {th("lean", "Lean", "2024 presidential margin on 2026 lines, relative to the nation")}
              {th("rating", "Experts", "Average of Cook, Inside Elections, and Sabato")}
              <th className="px-2 py-2 text-right font-medium" title="Polls in the last 30 days, sponsor-adjusted">Polls</th>
              {th("p", "Model")}
              {th("pMkt", "Market")}
              {th("pBlend", "Blend")}
              {th("gap", "Gap", "Model minus market, percentage points")}
              {live && th("live", "Live")}
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => {
              const lv = live?.districts[d.id];
              return (
                <tr key={d.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-2 py-1.5 text-left font-mono text-white">{d.id}</td>
                  <td className="px-2 py-1.5 text-right text-slate-400">{d.inc}</td>
                  <td className="px-2 py-1.5 text-right">{signed(d.lean)}</td>
                  <td className="px-2 py-1.5 text-right text-slate-400">{RATING(d.rating)}</td>
                  <td className="px-2 py-1.5 text-right text-slate-400">{d.polls ? `${signed(d.poll)} (${d.polls})` : "–"}</td>
                  <td className="px-2 py-1.5 text-right"><Prob p={d.p} /></td>
                  <td className="px-2 py-1.5 text-right text-slate-300">{pct(d.pMkt)}</td>
                  <td className="px-2 py-1.5 text-right text-slate-300">{pct(d.pBlend)}</td>
                  <td className="px-2 py-1.5 text-right text-slate-400">
                    {d.pMkt == null ? "–" : `${d.p - d.pMkt > 0 ? "+" : ""}${Math.round((d.p - d.pMkt) * 100)}`}
                  </td>
                  {live && (
                    <td className="px-2 py-1.5 text-right">
                      {lv?.[1] ? <span className={lv[1] === "D" ? "font-semibold text-blue-400" : "font-semibold text-red-400"}>{lv[1]} ✓</span>
                        : <Prob p={lv?.[0] ?? d.p} />}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">Probabilities are for a Democratic win. Gap is positive when the model is more bullish on Democrats than the market.</p>
    </div>
  );
}

function Prob({ p }: { p: number }) {
  return (
    <span className="inline-flex items-center justify-end gap-2">
      <span className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-red-500/40 sm:inline-block">
        <span className="block h-full rounded-full" style={{ width: `${p * 100}%`, background: probColor(Math.max(p, 0.6)) }} />
      </span>
      <span className="w-10 font-medium text-white">{pct(p)}</span>
    </span>
  );
}
