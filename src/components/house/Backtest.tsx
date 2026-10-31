import type { Forecast } from "./types";

const NAMES: Record<string, string> = {
  deluxe: "Deluxe (this model)",
  classic: "Classic",
  lite: "Lite",
  cook_only: "Cook ratings alone",
  generic_only: "Generic ballot only",
};
const ORDER = ["deluxe", "cook_only", "classic", "lite", "generic_only"];

/** Leave-one-election-out scores, 2006–2024, plus a calibration plot for Deluxe vs. Cook. */
export default function Backtest({ bt }: { bt: Forecast["backtest"] }) {
  const all = Object.fromEntries(bt.all.map((r) => [r.model, r]));
  const mid = Object.fromEntries(bt.midterms.map((r) => [r.model, r]));
  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="overflow-x-auto lg:col-span-3">
        <table className="w-full text-sm tabular-nums">
          <thead className="text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-2 text-left font-medium">Model</th>
              <th className="py-2 text-right font-medium" title="Mean squared error of district win probabilities; lower is better">Brier</th>
              <th className="py-2 text-right font-medium" title="Penalizes confident misses; lower is better">Log loss</th>
              <th className="py-2 text-right font-medium" title="Average miss on the Democratic seat total">Seat error</th>
              <th className="py-2 text-right font-medium">Midterms</th>
            </tr>
          </thead>
          <tbody>
            {ORDER.filter((m) => all[m]).map((m) => (
              <tr key={m} className={`border-t border-white/5 ${m === "deluxe" ? "text-white" : "text-slate-300"}`}>
                <td className="py-1.5">{NAMES[m]}</td>
                <td className="py-1.5 text-right">{all[m].brier.toFixed(3)}</td>
                <td className="py-1.5 text-right">{all[m].logloss.toFixed(3)}</td>
                <td className="py-1.5 text-right">{all[m].seatMae.toFixed(1)}</td>
                <td className="py-1.5 text-right text-slate-400">{mid[m]?.brier.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Each year is predicted by a model fit only on the other years, with inputs frozen 7 days before Election
          Day. Brier and log loss score every district&apos;s win probability (lower is better); &ldquo;Midterms&rdquo;
          is Brier on 2006, 2010, 2014, 2018, and 2022 only. Deluxe beats expert ratings on calling individual races;
          it is still worse on the total seat count, mostly in years when the generic-ballot polls missed (2006, 2020).
        </p>
      </div>
      <Calibration data={bt.calibration} />
    </div>
  );
}

function Calibration({ data }: { data: Forecast["backtest"]["calibration"] }) {
  const S = 220;
  const P = 28;
  const sc = (v: number) => P + v * (S - P * 2);
  const series = [
    { key: "deluxe", color: "#3ec8c4", label: "Deluxe" },
    { key: "cook_only", color: "#94a3b8", label: "Cook alone" },
  ];
  return (
    <figure className="lg:col-span-2">
      <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-xs" role="img"
        aria-label="Calibration: predicted versus observed Democratic win rate by probability bucket">
        <rect x={P} y={P} width={S - 2 * P} height={S - 2 * P} fill="none" stroke="#334155" />
        <line x1={sc(0)} y1={S - sc(0)} x2={sc(1)} y2={S - sc(1)} stroke="#475569" strokeDasharray="3 3" />
        {series.map((s) => {
          const pts = data[s.key] ?? [];
          return (
            <g key={s.key}>
              <polyline fill="none" stroke={s.color} strokeWidth={1.5}
                points={pts.map((b) => `${sc(b.pred)},${S - sc(b.obs)}`).join(" ")} />
              {pts.map((b, i) => (
                <circle key={i} cx={sc(b.pred)} cy={S - sc(b.obs)} r={Math.min(2 + Math.sqrt(b.n) / 6, 7)} fill={s.color}>
                  <title>{`${s.label}: predicted ${Math.round(b.pred * 100)}%, won ${Math.round(b.obs * 100)}% (${b.n} races)`}</title>
                </circle>
              ))}
            </g>
          );
        })}
        <text x={S / 2} y={S - 6} textAnchor="middle" className="fill-slate-500" fontSize={10}>Predicted P(D win)</text>
        <text x={10} y={S / 2} textAnchor="middle" className="fill-slate-500" fontSize={10} transform={`rotate(-90 10 ${S / 2})`}>Actual D win rate</text>
      </svg>
      <figcaption className="mt-2 flex justify-center gap-4 text-xs text-slate-400">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="text-slate-500">Dashed = perfect</span>
      </figcaption>
    </figure>
  );
}
