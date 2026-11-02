"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { predictedRight } from "./CallMark";
import { DEM, pct } from "./colors";
import type { District, LiveState } from "./types";

/** Election-night block: control odds over the night vs. markets, races to watch, and how our calls are holding up. */
export default function LivePanel({ live, districts }: { live: LiveState; districts: District[] }) {
  const pre = new Map(districts.map((d) => [d.id, d]));
  const entries = Object.entries(live.districts);
  // Rank uncalled races by how much they can still move control; once control is settled (no leverage left),
  // fall back to the closest races.
  const watch = entries
    .filter(([, [p, call]]) => !call && p > 0.02 && p < 0.98)
    .map(([id, [p, , lev]]) => {
      const impact = (lev ?? 0) * 4 * p * (1 - p);
      return { id, p, before: pre.get(id)?.p ?? p, impact: impact >= 0.005 ? impact : 0 }; // < half a point: noise
    })
    .sort((a, b) => b.impact - a.impact || Math.abs(a.p - 0.5) - Math.abs(b.p - 0.5))
    .slice(0, 10);
  const called = entries
    .filter(([id, [, call]]) => call && pre.has(id))
    .map(([id, [, call]]) => ({ id, call: call as "D" | "R", pre: pre.get(id)!.p }))
    .map((c) => ({ ...c, right: predictedRight(c.pre, c.call), had: c.call === "D" ? c.pre : 1 - c.pre }));
  const right = called.filter((c) => c.right).length;
  const misses = called.filter((c) => !c.right).sort((a, b) => a.had - b.had);
  const shift = Math.abs(live.natShift);

  return (
    <section className="mb-24">
      <h2 className="text-2xl font-semibold tracking-tight text-white">Tonight</h2>
      <p className="mt-2 max-w-3xl leading-relaxed text-slate-400">
        <span className="text-white">{live.nCalled} of 435</span> races called: {live.calledDem} Democratic,{" "}
        {live.nCalled - live.calledDem} Republican.{" "}
        {shift < 0.5
          ? "Results so far are landing right where the forecast expected."
          : `Results so far are running ${shift.toFixed(1)} points ${live.natShift > 0 ? "better for Democrats" : "better for Republicans"} than the forecast expected.`}
      </p>

      <div className="mt-8">
        <Timeline history={live.history} />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-base font-medium text-white">Races to watch</h3>
          <p className="mt-1 text-sm text-slate-500">Uncalled seats that matter most for control right now.</p>
          {watch.length ? (
            <table className="mt-4 w-full text-sm tabular-nums">
              <thead className="text-xs text-slate-500">
                <tr>
                  <th className="pb-2 text-left font-normal">District</th>
                  <th className="pb-2 text-right font-normal">Before</th>
                  <th className="pb-2 text-right font-normal">Now</th>
                  <th className="pb-2 text-right font-normal">Change</th>
                </tr>
              </thead>
              <tbody>
                {watch.map((w) => {
                  const ch = Math.round((w.p - w.before) * 100);
                  return (
                    <tr key={w.id} className="border-t border-white/5">
                      <td className="py-2 font-mono text-white">{w.id}</td>
                      <td className="py-2 text-right text-slate-500">{pct(w.before)}</td>
                      <td className="py-2 text-right font-medium text-white">{pct(w.p)} D</td>
                      <td className={`py-2 text-right ${ch > 0 ? "text-blue-400" : ch < 0 ? "text-red-400" : "text-slate-500"}`}>
                        {ch === 0 ? "–" : `${ch > 0 ? "+" : "−"}${Math.abs(ch)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-sm text-slate-400">Every competitive race has been called.</p>
          )}
        </div>

        <div>
          <h3 className="text-base font-medium text-white">How the forecast is doing</h3>
          <p className="mt-1 text-sm text-slate-500">Called races versus the party we had favored before polls closed.</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
            <Check className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={3} aria-hidden />
            <span>
              <span className="font-semibold text-white">{right} of {called.length}</span> went the way we predicted
              {called.length ? <span className="text-slate-500"> ({Math.round((100 * right) / called.length)}%)</span> : null}
            </span>
          </p>
          {misses.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm">
              {misses.slice(0, 8).map((m) => (
                <li key={m.id} className="flex items-start gap-2 text-slate-300">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" strokeWidth={3} aria-label="missed" />
                  <span className="shrink-0 whitespace-nowrap font-mono text-white">{m.id}</span>
                  <span>went {m.call === "D" ? "Democratic" : "Republican"}; we gave them {pct(m.had)}</span>
                </li>
              ))}
              {misses.length > 8 && <li className="pl-6 text-slate-500">and {misses.length - 8} more</li>}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

const MKT = "#94a3b8";

/** Chance Democrats win the House over the night, scaled to the range actually used, with end labels. */
function Timeline({ history }: { history: LiveState["history"] }) {
  const [hover, setHover] = useState<number | null>(null);
  // Draw at the container's real pixel width so labels stay legible on phones (no viewBox shrinking).
  const box = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(960);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  if (history.length < 2) {
    return <p className="text-sm text-slate-500">The chart starts after the second update of the night.</p>;
  }
  const H = W < 500 ? 200 : 240;
  const L = 40;
  const R = 52;
  const T = 12;
  const B = 28;
  const pts = history.map((h) => ({ t: new Date(h[0]).getTime(), model: h[1], poly: h[2], kalshi: h[3] }));
  const vals = pts.flatMap((p) => [p.model, p.poly, p.kalshi]).filter((v): v is number => v != null);
  const lo = Math.max(0, Math.floor((Math.min(...vals) - 0.05) * 10) / 10);
  const hi = Math.min(1, Math.ceil((Math.max(...vals) + 0.02) * 10) / 10);
  const t0 = pts[0].t;
  const t1 = pts[pts.length - 1].t;
  const x = (t: number) => L + ((t - t0) / Math.max(t1 - t0, 1)) * (W - L - R);
  const y = (v: number) => T + (1 - (v - lo) / Math.max(hi - lo, 0.01)) * (H - T - B);
  const series = [
    { key: "model" as const, label: "Model", color: DEM, width: 2.5, dash: undefined },
    { key: "poly" as const, label: "Polymarket", color: MKT, width: 1.5, dash: "6 4" },
    { key: "kalshi" as const, label: "Kalshi", color: MKT, width: 1.5, dash: "1.5 4" },
  ].filter((s) => pts.some((p) => p[s.key] != null));
  const path = (k: "model" | "poly" | "kalshi") =>
    pts.filter((p) => p[k] != null).map((p, i) => `${i ? "L" : "M"}${x(p.t)},${y(p[k] as number)}`).join(" ");
  const ticks = Array.from({ length: 11 }, (_, i) => i / 10).filter((v) => v >= lo - 1e-9 && v <= hi + 1e-9);
  const step = ticks.length > 6 ? 2 : 1;
  const fmt = (ms: number) => new Date(ms).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
  const last = pts[pts.length - 1];
  const hp = hover != null ? pts[hover] : null;

  return (
    <figure ref={box}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <figcaption className="text-base font-medium text-white">Chance Democrats win the House, tonight</figcaption>
        <div className="flex gap-4 text-xs text-slate-400">
          {series.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1.5">
              <svg width="18" height="6" aria-hidden><line x1="0" y1="3" x2="18" y2="3" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash} /></svg>
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label={`Chance Democrats win the House over the night; now ${pct(last.model)}`}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const box = e.currentTarget.getBoundingClientRect();
          const mx = ((e.clientX - box.left) / box.width) * W;
          let best = 0;
          pts.forEach((p, i) => { if (Math.abs(x(p.t) - mx) < Math.abs(x(pts[best].t) - mx)) best = i; });
          setHover(best);
        }}>
        {ticks.filter((_, i) => i % step === 0).map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#1e293b" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" className="fill-slate-500" fontSize={12}>{Math.round(v * 100)}%</text>
          </g>
        ))}
        {lo <= 0.5 && hi >= 0.5 && (
          <line x1={L} x2={W - R} y1={y(0.5)} y2={y(0.5)} stroke="#64748b" strokeDasharray="3 4" />
        )}
        {series.map((s) => (
          <path key={s.key} d={path(s.key)} fill="none" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash}
            strokeLinejoin="round" strokeLinecap="round" />
        ))}
        <circle cx={x(last.t)} cy={y(last.model)} r={4.5} fill={DEM} stroke="#0b1b3f" strokeWidth={2} />
        <text x={x(last.t) + 10} y={y(last.model) + 5} className="fill-white" fontSize={15} fontWeight={600}>{pct(last.model)}</text>
        {hp && (
          <g pointerEvents="none">
            <line x1={x(hp.t)} x2={x(hp.t)} y1={T} y2={H - B} stroke="#475569" />
            <circle cx={x(hp.t)} cy={y(hp.model)} r={4} fill={DEM} />
          </g>
        )}
        <text x={L} y={H - 6} className="fill-slate-500" fontSize={12}>{fmt(t0)}</text>
        <text x={W - R} y={H - 6} textAnchor="end" className="fill-slate-500" fontSize={12}>{fmt(t1)} ET</text>
      </svg>
      <p className="mt-1 h-5 text-sm tabular-nums text-slate-400">
        {hp ? (
          <>
            {fmt(hp.t)}: model <span className="text-white">{pct(hp.model)}</span>
            {hp.poly != null && <> · Polymarket {pct(hp.poly)}</>}
            {hp.kalshi != null && <> · Kalshi {pct(hp.kalshi)}</>}
          </>
        ) : "Hover or tap the chart for any moment of the night."}
      </p>
    </figure>
  );
}
