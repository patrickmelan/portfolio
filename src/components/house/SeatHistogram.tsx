"use client";

import { useState } from "react";
import { DEM, REP } from "./colors";

const MAJORITY = 218;

/** Share of simulations ending at each Democratic seat total; bars at 218+ are blue. */
export default function SeatHistogram({ hist }: { hist: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const total = hist.reduce((a, b) => a + b, 0);
  const share = hist.map((c) => c / total);
  const idx = share.map((s, i) => (s > 2e-4 ? i : -1)).filter((i) => i >= 0);
  const lo = Math.min(...idx);
  const hi = Math.max(...idx);
  const max = Math.max(...share);
  const W = 640;
  const H = 180;
  const bw = W / (hi - lo + 1);
  const x = (seat: number) => (seat - lo) * bw;
  const ticks = Array.from({ length: 50 }, (_, k) => Math.ceil(lo / 10) * 10 + k * 10).filter((t) => t <= hi);
  const pWin = share.slice(MAJORITY).reduce((a, b) => a + b, 0);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" role="img"
        aria-label={`Distribution of simulated Democratic seat totals; ${Math.round(pWin * 100)}% of simulations reach 218`}
        onMouseLeave={() => setHover(null)}>
        {idx.map((i) => {
          const h = (share[i] / max) * (H - 8);
          return (
            <rect key={i} x={x(i) + 0.5} y={H - h} width={Math.max(bw - 1, 1)} height={h} rx={1}
              fill={i >= MAJORITY ? DEM : REP} opacity={hover == null || hover === i ? 0.9 : 0.45}
              onMouseEnter={() => setHover(i)} />
          );
        })}
        <line x1={x(MAJORITY)} x2={x(MAJORITY)} y1={0} y2={H} stroke="#e2e8f0" strokeOpacity={0.6} strokeDasharray="4 4" />
        <text x={x(MAJORITY) + 6} y={12} className="fill-slate-400 font-mono" fontSize={11}>218</text>
        <line x1={0} x2={W} y1={H} y2={H} stroke="#334155" />
        {ticks.map((t) => (
          <text key={t} x={x(t) + bw / 2} y={H + 16} textAnchor="middle" className="fill-slate-500 font-mono" fontSize={11}>{t}</text>
        ))}
      </svg>
      <p className="mt-1 h-5 font-mono text-xs text-slate-400">
        {hover != null ? `${hover} Democratic seats: ${(share[hover] * 100).toFixed(1)}% of simulations` : "Hover a bar"}
      </p>
    </div>
  );
}
