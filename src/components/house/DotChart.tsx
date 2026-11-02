"use client";

import { useMemo, useState } from "react";
import { predictedRight } from "./CallMark";
import { BUCKETS, pct, probColor } from "./colors";
import type { District, LiveState, View } from "./types";

const ROWS = 15;
const GAP = 22;
const R = 8;
const PAD = 12;
const MAJORITY = 218;

export function viewProb(d: District, view: View, live: LiveState | null): number {
  if (view === "live" && live?.districts[d.id]) return live.districts[d.id][0];
  if (view === "market") return d.pMkt ?? d.p;
  if (view === "blend") return d.pBlend;
  return d.p;
}

/**
 * All 435 seats as dots, sorted from most likely Democratic to most likely Republican and filled
 * column by column, so the dashed line marks exactly where the 218th seat falls.
 */
export default function DotChart({ districts, view, live }: { districts: District[]; view: View; live: LiveState | null }) {
  const [hover, setHover] = useState<{ d: District; x: number; y: number } | null>(null);
  const sorted = useMemo(
    () => [...districts].sort((a, b) => viewProb(b, view, live) - viewProb(a, view, live)),
    [districts, view, live],
  );
  const cols = Math.ceil(sorted.length / ROWS);
  const width = PAD * 2 + (cols - 1) * GAP;
  const height = PAD * 2 + (ROWS - 1) * GAP + 22;
  const pos = (i: number) => ({ x: PAD + Math.floor(i / ROWS) * GAP, y: PAD + (i % ROWS) * GAP });

  // Majority line: steps between seat 218 and 219 in column-major order.
  const m = MAJORITY - 1;
  const mc = Math.floor(m / ROWS);
  const mr = m % ROWS;
  const xR = PAD + mc * GAP + GAP / 2;
  const xL = xR - GAP;
  const yStep = PAD + mr * GAP + GAP / 2;
  const line = `M${xR} ${PAD - 10} V${yStep} H${xL} V${PAD + (ROWS - 1) * GAP + 10}`;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={`All 435 House seats sorted by probability of a Democratic win, ${view} view`}
        onMouseLeave={() => setHover(null)}>
        {sorted.map((d, i) => {
          const { x, y } = pos(i);
          const p = viewProb(d, view, live);
          const call = view === "live" ? live?.districts[d.id]?.[1] : "";
          const hollow = view === "market" && d.pMkt == null;
          return (
            <g key={d.id} onMouseEnter={() => setHover({ d, x, y })}>
              <circle
                cx={x}
                cy={y}
                r={hollow ? R - 1.5 : R}
                fill={hollow ? "transparent" : probColor(p)}
                stroke={hollow ? probColor(p) : "none"}
                strokeWidth={hollow ? 1.5 : 0}
                style={{ transition: "cx 400ms ease, cy 400ms ease, fill 300ms" }}
              />
              {call && <CallGlyph x={x} y={y} right={predictedRight(d.p, call)} />}
            </g>
          );
        })}
        <path d={line} fill="none" stroke="#e2e8f0" strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="4 4" />
        <text x={xR - GAP / 2} y={height - 4} textAnchor="middle" className="fill-slate-400" fontSize={11}>
          218 to win
        </text>
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-10 w-56 rounded-lg border border-white/15 bg-navy-dark/95 px-3 py-2 text-xs text-slate-300 shadow-lg"
          style={{
            left: `min(calc(${(hover.x / width) * 100}% + 12px), calc(100% - 14rem))`,
            top: `calc(${(hover.y / height) * 100}% + 12px)`,
          }}>
          <div className="mb-1 text-sm font-semibold text-white">
            {hover.d.id} <span className="text-slate-400">· {hover.d.inc === "Open" ? "open seat" : `${hover.d.inc} incumbent`}</span>
          </div>
          <Row label="Model" value={`${pct(hover.d.p)} D`} />
          <Row label="Market" value={hover.d.pMkt == null ? "no market" : `${pct(hover.d.pMkt)} D`} />
          <Row label="Blend" value={`${pct(hover.d.pBlend)} D`} />
          {live?.districts[hover.d.id] && (
            <Row
              label="Live"
              value={(() => {
                const c = live.districts[hover.d.id][1];
                if (!c) return `${pct(live.districts[hover.d.id][0])} D`;
                const had = c === "D" ? hover.d.p : 1 - hover.d.p;
                return `Called ${c} ${predictedRight(hover.d.p, c) ? "✓" : "✗"} (we had ${pct(had)})`;
              })()}
            />
          )}
        </div>
      )}
    </div>
  );
}

/** Small white check (called the way we predicted) or X (we missed), drawn inside a called seat's dot. */
function CallGlyph({ x, y, right }: { x: number; y: number; right: boolean }) {
  const d = right
    ? `M${x - 3.6} ${y + 0.2} L${x - 1.1} ${y + 2.8} L${x + 3.8} ${y - 2.8}`
    : `M${x - 2.8} ${y - 2.8} L${x + 2.8} ${y + 2.8} M${x + 2.8} ${y - 2.8} L${x - 2.8} ${y + 2.8}`;
  return <path d={d} fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-slate-200">{value}</span>
    </div>
  );
}

function LegendGlyph({ right }: { right: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
      <circle cx={10} cy={10} r={9} fill="#475569" />
      <CallGlyph x={10} y={10} right={right} />
    </svg>
  );
}

export function DotLegend({ view }: { view: View }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
      {BUCKETS.map((b) => (
        <span key={b.label} className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
          {b.label}
        </span>
      ))}
      {view === "market" && (
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-slate-400" />
          No market (model shown)
        </span>
      )}
      {view === "live" && (
        <>
          <span className="inline-flex items-center gap-1.5">
            <LegendGlyph right /> Called as we predicted
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LegendGlyph right={false} /> Called against our prediction
          </span>
        </>
      )}
    </div>
  );
}
