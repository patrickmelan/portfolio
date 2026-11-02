"use client";

import { Check, X } from "lucide-react";
import { predictedRight } from "./CallMark";
import { DEM, pct } from "./colors";
import type { District, LiveState } from "./types";

/** Election-night block: control odds over the night vs. markets, races to watch, and how our calls are holding up. */
export default function LivePanel({ live, districts }: { live: LiveState; districts: District[] }) {
  const pre = new Map(districts.map((d) => [d.id, d]));
  const entries = Object.entries(live.districts);
  const watch = entries
    .filter(([, [p, call]]) => !call && p > 0.02 && p < 0.98)
    .map(([id, [p, , lev]]) => ({ id, p, lev: lev ?? 0, impact: (lev ?? 0) * 4 * p * (1 - p) }))
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 12);
  const called = entries
    .filter(([id, [, call]]) => call && pre.has(id))
    .map(([id, [, call]]) => ({ id, call: call as "D" | "R", pre: pre.get(id)!.p }))
    .map((c) => ({ ...c, right: predictedRight(c.pre, c.call), had: c.call === "D" ? c.pre : 1 - c.pre }));
  const right = called.filter((c) => c.right).length;
  const misses = called.filter((c) => !c.right).sort((a, b) => a.had - b.had);

  return (
    <section className="mb-24">
      <h2 className="text-2xl font-semibold tracking-tight text-white">Tonight</h2>
      <p className="mb-8 mt-2 text-slate-400">
        {live.nCalled} of 435 races called ({live.calledDem} Democratic, {live.nCalled - live.calledDem} Republican). Results so far are running{" "}
        {Math.abs(live.natShift).toFixed(1)} pts {live.natShift >= 0 ? "better for Democrats" : "better for Republicans"} than the forecast expected.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        <Timeline history={live.history} />
        <div>
          <h3 className="mb-2 text-sm font-medium text-white">Races to watch</h3>
          <table className="w-full text-sm tabular-nums">
            <tbody>
              {watch.map((w) => (
                <tr key={w.id} className="border-t border-white/5">
                  <td className="py-1 font-mono text-white">{w.id}</td>
                  <td className="py-1 text-right text-slate-400">pre {pct(pre.get(w.id)?.p)}</td>
                  <td className="py-1 text-right font-medium text-white">now {pct(w.p)} D</td>
                  <td className="py-1 text-right text-xs text-slate-500" title="How far control odds move between a D and an R win">
                    ±{(w.lev * 100).toFixed(1)} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {called.length > 0 && (
            <>
              <h3 className="mb-2 mt-6 text-sm font-medium text-white">How the forecast is doing</h3>
              <p className="flex items-center gap-2 text-sm text-slate-300">
                <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} aria-hidden />
                <span><span className="font-semibold text-white">{right} of {called.length}</span> called races went the way we predicted</span>
              </p>
              {misses.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm">
                  {misses.slice(0, 10).map((m) => (
                    <li key={m.id} className="flex items-start gap-2 text-slate-300">
                      <X className="h-4 w-4 shrink-0 text-amber-400" strokeWidth={3} aria-label="missed" />
                      <span className="shrink-0 whitespace-nowrap font-mono text-white">{m.id}</span>
                      <span>won by the {m.call === "D" ? "Democrat" : "Republican"}; we gave them {pct(m.had)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Timeline({ history }: { history: LiveState["history"] }) {
  const W = 480;
  const H = 200;
  const P = 28;
  if (history.length < 2) return <div className="text-sm text-slate-500">The timeline starts after the second update.</div>;
  const t = history.map((h) => new Date(h[0]).getTime());
  const t0 = Math.min(...t);
  const t1 = Math.max(...t);
  const x = (v: number) => P + ((v - t0) / Math.max(t1 - t0, 1)) * (W - P - 8);
  const y = (p: number) => 8 + (1 - p) * (H - P - 8);
  const line = (k: 1 | 2 | 3) =>
    history.filter((h) => h[k] != null).map((h) => `${x(new Date(h[0]).getTime())},${y(h[k] as number)}`).join(" ");
  const fmt = (ms: number) => new Date(ms).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Chance Democrats win the House over the night, model versus markets">
        {[0, 0.5, 1].map((g) => (
          <g key={g}>
            <line x1={P} x2={W - 8} y1={y(g)} y2={y(g)} stroke="#1e293b" />
            <text x={P - 4} y={y(g) + 4} textAnchor="end" className="fill-slate-500" fontSize={10}>{g * 100}%</text>
          </g>
        ))}
        <polyline points={line(2)} fill="none" stroke="#94a3b8" strokeDasharray="5 4" strokeWidth={1.5} />
        <polyline points={line(3)} fill="none" stroke="#94a3b8" strokeDasharray="1 4" strokeWidth={1.5} />
        <polyline points={line(1)} fill="none" stroke={DEM} strokeWidth={2.5} />
        <text x={P} y={H - 6} className="fill-slate-500" fontSize={10}>{fmt(t0)}</text>
        <text x={W - 8} y={H - 6} textAnchor="end" className="fill-slate-500" fontSize={10}>{fmt(t1)} ET</text>
      </svg>
      <figcaption className="flex gap-4 text-xs text-slate-400">
        <span><span className="mr-1 inline-block h-0.5 w-4 align-middle" style={{ background: DEM }} />Model</span>
        <span><span className="mr-1 inline-block w-4 border-t border-dashed border-slate-400 align-middle" />Polymarket</span>
        <span><span className="mr-1 inline-block w-4 border-t border-dotted border-slate-400 align-middle" />Kalshi</span>
      </figcaption>
    </figure>
  );
}
