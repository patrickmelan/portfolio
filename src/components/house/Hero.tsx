import { DEM, REP } from "./colors";
import LiveTag from "./LiveTag";
import type { Forecast, LiveState } from "./types";

/**
 * The answer first: a sentence, one big number, and a seat bar showing where the expected Democratic total
 * and its 80% range sit relative to the 218 needed.
 */
export default function Hero({ data, live }: { data: Forecast; live: LiveState | null }) {
  const d = data.layers.deluxe;
  const p = live?.pControl ?? d.pControl;
  const seats = live?.meanSeats ?? d.meanSeats;
  const [lo, hi] = live?.seats80 ?? d.seats80;
  const odds = Math.round(p * 100);
  const favored = p >= 0.5 ? "Democrats" : "Republicans";
  const verb = live ? "are on track to win" : "are favored to win";

  return (
    <section className="mb-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
      <div className="min-w-0">
        {live && <LiveTag updated={live.updated} />}
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
          {favored} {verb} the House.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
          The model expects them to win about <span className="font-semibold text-white">{Math.round(seats)} seats</span>,
          with eight in ten simulations landing between {lo} and {hi}. A majority takes 218.
        </p>
        {live && <BeforeAndNow data={data} live={live} />}
      </div>

      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-7xl font-semibold tabular-nums tracking-tighter text-white sm:text-8xl">{odds}%</span>
          <span className="text-sm leading-tight text-slate-400">
            chance Democrats
            <br />
            control the House
          </span>
        </div>
        <SeatBar seats={seats} lo={lo} hi={hi} />
        <Markets data={data} live={live} />
      </div>
    </section>
  );
}

/** The forecast as it stood before any results, fixed at build time, next to where the live model is now. */
function BeforeAndNow({ data, live }: { data: Forecast; live: LiveState }) {
  const d = data.layers.deluxe;
  const lockedAt = new Date(data.updated).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York",
  });
  const rows: [string, string, string][] = [
    ["Chance Democrats win the House", `${Math.round(d.pControl * 100)}%`, `${Math.round(live.pControl * 100)}%`],
    ["Democratic seats", `${Math.round(d.meanSeats)}`, `${Math.round(live.meanSeats)}`],
    ["Likely range (80%)", `${d.seats80[0]}\u2013${d.seats80[1]}`, `${live.seats80[0]}\u2013${live.seats80[1]}`],
  ];
  return (
    <div className="mt-8 max-w-md">
      <h2 className="text-base font-medium text-white">Our final forecast</h2>
      <p className="mt-1 text-sm text-slate-400">Locked {lockedAt} ET, before the first polls closed.</p>
      <table className="mt-3 w-full text-sm tabular-nums">
        <thead className="text-xs text-slate-500">
          <tr>
            <th className="pb-2 text-left font-normal"><span className="sr-only">Measure</span></th>
            <th className="pb-2 pl-3 text-right font-normal">Forecast</th>
            <th className="pb-2 pl-3 text-right font-normal">With results</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, before, now]) => (
            <tr key={label} className="border-t border-white/10">
              <th scope="row" className="py-2 text-left font-normal text-slate-300">{label}</th>
              <td className="whitespace-nowrap py-2 pl-3 text-right font-semibold text-white">{before}</td>
              <td className="whitespace-nowrap py-2 pl-3 text-right text-slate-300">{now}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SeatBar({ seats, lo, hi }: { seats: number; lo: number; hi: number }) {
  const x = (n: number) => `${(n / 435) * 100}%`;
  return (
    <div className="mt-8" aria-label={`Expected ${Math.round(seats)} Democratic seats, 80% range ${lo} to ${hi}`}>
      <div className="relative h-3 overflow-hidden rounded-sm" style={{ background: REP }}>
        <div className="absolute inset-y-0 left-0" style={{ width: x(seats), background: DEM }} />
        <div className="absolute inset-y-0 bg-white/25" style={{ left: x(lo), width: `${((hi - lo) / 435) * 100}%` }} />
        <div className="absolute inset-y-[-4px] w-px bg-white" style={{ left: x(218) }} />
      </div>
      <div className="relative mt-2 h-10 text-xs tabular-nums">
        <span className="absolute left-0 text-slate-300">
          <span className="block text-base font-semibold text-white">{Math.round(seats)}</span>Democrats
        </span>
        <span className="absolute -translate-x-1/2 text-center text-slate-400" style={{ left: x(218) }}>218</span>
        <span className="absolute right-0 text-right text-slate-300">
          <span className="block text-base font-semibold text-white">{435 - Math.round(seats)}</span>Republicans
        </span>
      </div>
    </div>
  );
}

function Markets({ data, live }: { data: Forecast; live: LiveState | null }) {
  const rows = (["polymarket", "kalshi"] as const)
    .map((k) => ({ k, p: live?.markets[k] ?? data.markets[k]?.p_dem, vol: data.markets[k]?.volume }))
    .filter((r) => r.p != null);
  if (!rows.length) return null;
  return (
    <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
      {rows.map((r) => (
        <div key={r.k} className="flex items-baseline justify-between py-2">
          <dt className="text-slate-400">{r.k === "polymarket" ? "Polymarket" : "Kalshi"} traders</dt>
          <dd className="tabular-nums text-slate-200">
            <span className="font-semibold text-white">{Math.round(r.p! * 100)}%</span>
            {r.vol ? <span className="ml-3 text-slate-500">${Math.round(r.vol / 1e6)}M traded</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
