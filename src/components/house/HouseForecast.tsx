"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/sections/SectionHeading";
import Backtest from "./Backtest";
import { pct, signed } from "./colors";
import DistrictTable from "./DistrictTable";
import DotChart, { DotLegend, viewProb } from "./DotChart";
import LivePanel from "./LivePanel";
import SeatHistogram from "./SeatHistogram";
import type { Forecast, View } from "./types";
import { useLive } from "./useLive";

const VIEW_NOTE: Record<View, string> = {
  model: "Model: past results, polls, expert ratings, and fundraising",
  market: "Polymarket prices where a district market exists",
  blend: "Model and market averaged; the market counts for more in heavily traded races (up to half)",
  live: "Live: updated as races are called tonight",
};

export default function HouseForecast({ data }: { data: Forecast }) {
  const live = useLive();
  const [view, setView] = useState<View>("model");
  useEffect(() => {
    if (live) setView("live");
  }, [live != null]); // eslint-disable-line react-hooks/exhaustive-deps

  const d = data.layers.deluxe;
  const views: View[] = live ? ["live", "model", "market", "blend"] : ["model", "market", "blend"];
  const expected = data.districts.reduce((a, x) => a + viewProb(x, view, live), 0);
  const favored = data.districts.filter((x) => viewProb(x, view, live) > 0.5).length;
  const tossups = data.districts.filter((x) => {
    const p = viewProb(x, view, live);
    return p > 0.4 && p < 0.6;
  }).length;
  const updated = new Date(live?.updated ?? data.updated);

  return (
    <div className="relative min-h-screen bg-navy text-slate-300">
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Link href="/#projects" className="group mb-10 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#3ec8c4]">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Patrick Melan
        </Link>

        <header className="mb-12">
          <p className="font-mono text-sm uppercase tracking-widest text-[#3ec8c4]">
            {live ? "Election night · live" : "2026 midterms forecast"}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Who wins the House?</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
            A probabilistic forecast of all 435 races, simulated 50,000 times, built from past results, polling,
            expert ratings, and fundraising, and checked against prediction markets.
          </p>
          <p className="mt-3 font-mono text-xs text-slate-500">
            Updated {updated.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })} ET
            · Election Day Nov 3, 2026
          </p>
        </header>

        {/* Headline odds */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={live ? "Live model" : "Our forecast"} big={pct(live?.pControl ?? d.pControl)} sub="chance Democrats win the House" accent />
          <Stat label="Expected seats" big={`${Math.round(live?.meanSeats ?? d.meanSeats)} D`}
            sub={`80% range ${(live?.seats80 ?? d.seats80)[0]}–${(live?.seats80 ?? d.seats80)[1]}`} />
          {(["polymarket", "kalshi"] as const).map((k) => {
            const p = live?.markets[k] ?? data.markets[k]?.p_dem;
            return p == null ? null : (
              <Stat key={k} label={k === "polymarket" ? "Polymarket" : "Kalshi"} big={pct(p)}
                sub={`market price${data.markets[k] ? ` · $${(data.markets[k]!.volume / 1e6).toFixed(0)}M traded` : ""}`} />
            );
          })}
        </div>

        {live && <LivePanel live={live} districts={data.districts} />}

        {/* 435 dots */}
        <section className="mb-16">
          <SectionHeading title="All 435 seats" />
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {views.map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${view === v
                  ? "border-[#3ec8c4] bg-[#3ec8c4]/10 text-[#3ec8c4]" : "border-white/15 text-slate-300 hover:border-white/40"}`}>
                {v === "market" ? "Markets" : v}
              </button>
            ))}
            <span className="ml-1 text-xs text-slate-500">{VIEW_NOTE[view]}</span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3 text-center">
            <Mini label="Exp. D seats" value={Math.round(expected).toString()} />
            <Mini label="Favored D/R" value={`${favored}/${435 - favored}`} />
            <Mini label="Toss-ups" value={tossups.toString()} />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:p-5">
            <DotChart districts={data.districts} view={view} live={live} />
            <div className="mt-3"><DotLegend view={view} /></div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading title="Seat distribution" />
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            Each simulation draws one national polling miss shared by every race, a regional miss per state, and
            race-level noise. The spread of outcomes is wide because polling misses move dozens of seats at once.
          </p>
          <SeatHistogram hist={live?.seatHist ?? data.seatHist.deluxe} />
        </section>

        <section className="mb-16">
          <SectionHeading title="Competitive races" />
          <DistrictTable districts={data.districts} live={live} />
        </section>

        <section className="mb-16">
          <SectionHeading title="How it works" />
          <ol className="grid gap-x-10 gap-y-5 text-sm leading-relaxed sm:grid-cols-2">
            {METHOD(data).map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="font-mono text-[#3ec8c4]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium text-white">{title}</h3>
                  <p className="mt-1 text-slate-400">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <SectionHeading title="Track record" />
          <Backtest bt={data.backtest} />
        </section>

        <section className="mb-16">
          <SectionHeading title="Caveats" />
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
            {CAVEATS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        <footer className="border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500">
          Data: The Downballot (presidential results by district), FiveThirtyEight&apos;s archived results and polls,
          Wikipedia (expert ratings and 2026 polls, CC BY-SA), FEC, the American Presidency Project (Gallup approval),
          Polymarket, and Kalshi. Race calls on election night are entered as reported by news organizations. Not
          affiliated with any campaign or party.
        </footer>
      </div>
    </div>
  );
}

const METHOD = (data: Forecast): [string, string][] => [
  ["Start from partisanship", "Each district's 2024 presidential margin on its 2026 lines, relative to the nation. Mid-decade redistricting made the median seat about R+3."],
  ["Add the national mood", `The generic ballot (${signed(data.national.genericBallot)}) blended with presidential approval (net ${data.national.approvalNet.toFixed(0)}) into one environment score, shifting every district.`],
  ["Adjust for candidates", "Incumbency (a smaller edge than it used to be), last cycle's over- or under-performance, and the D/R fundraising ratio from FEC filings."],
  ["Weigh the experts", "In about 145 competitive seats, the average Cook, Inside Elections, and Sabato rating gets its own weight; in close races it carries more signal than anything else."],
  ["Blend in district polls", "Recent polls pull the estimate toward them, more so with more and fresher polls. Campaign- and party-sponsored polls are shifted 5 points against the sponsor."],
  ["Simulate 50,000 elections", "Fat-tailed national, state, and district errors, sized from how far forecasts missed in 2006–2024. A seat's probability is the share of simulations its party wins."],
];

const CAVEATS = [
  "Only ten elections since 2006 calibrate the size of a national polling miss, so the uncertainty itself is uncertain.",
  "The model sees Democrat-vs-Republican races; independents backed by Democrats (as in Alaska) are a blind spot.",
  "Prediction markets are thin at the district level and tend to overprice underdogs; the blend caps their weight at half.",
  "Historical expert ratings and fundraising are final pre-election values, not strictly frozen a week out.",
  "On election night only race calls and near-final counts move the forecast; early partial counts are ignored on purpose.",
];

function Stat({ label, big, sub, accent }: { label: string; big: string; sub: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-[#3ec8c4]/50 bg-[#3ec8c4]/5" : "border-white/10 bg-white/[0.02]"}`}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${accent ? "text-[#3ec8c4]" : "text-white"}`}>{big}</p>
      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.03] px-3 py-2">
      <p className="truncate text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="whitespace-nowrap font-mono text-base text-white sm:text-lg">{value}</p>
    </div>
  );
}
