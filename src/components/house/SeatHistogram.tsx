"use client";

import { useState } from "react";
import { DEM, REP } from "./colors";

const MAJORITY = 218;

function quantile(share: number[], q: number): number {
  let acc = 0;
  for (let i = 0; i < share.length; i++) {
    acc += share[i];
    if (acc >= q) return i;
  }
  return share.length - 1;
}

/** Share of simulations ending at each Democratic seat total, annotated with the median and 80% band. */
export default function SeatHistogram({ hist }: { hist: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const total = hist.reduce((a, b) => a + b, 0);
  const share = hist.map((c) => c / total);
  const idx = share.map((s, i) => (s > 2e-4 ? i : -1)).filter((i) => i >= 0);
  const lo = Math.min(...idx);
  const hi = Math.max(...idx);
  const max = Math.max(...share);
  const W = 640;
  const H = 170;
  const TOP = 34;
  const bw = W / (hi - lo + 1);
  const x = (seat: number) => (seat - lo) * bw;
  const ticks = Array.from({ length: 50 }, (_, k) => Math.ceil(lo / 10) * 10 + k * 10).filter((t) => t <= hi);
  const pWin = share.slice(MAJORITY).reduce((a, b) => a + b, 0);
  const [q10, q50, q90] = [0.1, 0.5, 0.9].map((q) => quantile(share, q));
  const y0 = TOP + H;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${y0 + 24}`} className="w-full overflow-visible" role="img"
        aria-label={`Simulated Democratic seat totals: median ${q50}, 80% between ${q10} and ${q90}; ${Math.round(pWin * 100)}% reach 218`}
        onMouseLeave={() => setHover(null)}>
        <rect x={x(q10)} y={TOP - 6} width={x(q90 + 1) - x(q10)} height={H + 6} fill="#ffffff" opacity={0.04} />
        <text x={x(q10)} y={TOP - 12} className="fill-slate-500" fontSize={11}>{q10}</text>
        <text x={x(q90 + 1)} y={TOP - 12} textAnchor="end" className="fill-slate-500" fontSize={11}>{q90}</text>
        <text x={(x(q10) + x(q90 + 1)) / 2} y={TOP - 12} textAnchor="middle" className="fill-slate-400" fontSize={11}>
          8 in 10 simulations
        </text>
        {idx.map((i) => {
          const h = (share[i] / max) * H;
          return (
            <rect key={i} x={x(i) + 0.5} y={y0 - h} width={Math.max(bw - 1, 1)} height={h} rx={1}
              fill={i >= MAJORITY ? DEM : REP} opacity={hover == null || hover === i ? 0.95 : 0.4}
              onMouseEnter={() => setHover(i)} />
          );
        })}
        <line x1={x(MAJORITY)} x2={x(MAJORITY)} y1={TOP - 6} y2={y0} stroke="#e2e8f0" strokeOpacity={0.7} strokeDasharray="3 3" />
        <text x={x(MAJORITY) - 6} y={TOP + 10} textAnchor="end" className="fill-slate-300" fontSize={11}>
          218 for a majority
        </text>
        <line x1={0} x2={W} y1={y0} y2={y0} stroke="#334155" />
        {ticks.map((t) => (
          <text key={t} x={x(t) + bw / 2} y={y0 + 16} textAnchor="middle" className="fill-slate-500" fontSize={11}>{t}</text>
        ))}
      </svg>
      <p className="mt-3 text-sm tabular-nums text-slate-400">
        {hover != null
          ? <>Exactly <span className="text-white">{hover}</span> Democratic seats in {(share[hover] * 100).toFixed(1)}% of simulations.</>
          : <>Democrats reach 218 in <span className="text-white">{Math.round(pWin * 100)}%</span> of simulations; the median outcome is <span className="text-white">{q50}</span> seats.</>}
      </p>
    </div>
  );
}
