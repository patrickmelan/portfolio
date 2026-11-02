"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Backtest from "./Backtest";
import DistrictTable from "./DistrictTable";
import DotChart, { DotLegend, viewProb } from "./DotChart";
import Hero from "./Hero";
import LivePanel from "./LivePanel";
import SeatHistogram from "./SeatHistogram";
import type { Forecast, View } from "./types";
import { useLive } from "./useLive";
import Walkthrough from "./Walkthrough";

const VIEW_LABEL: Record<View, string> = { live: "Live", model: "Model", market: "Markets", blend: "Blend" };

export default function HouseForecast({ data }: { data: Forecast }) {
  const live = useLive();
  const [view, setView] = useState<View>("model");
  useEffect(() => {
    if (live) setView("live");
  }, [live != null]); // eslint-disable-line react-hooks/exhaustive-deps

  const views: View[] = live ? ["live", "model", "market", "blend"] : ["model", "market", "blend"];
  const probs = data.districts.map((x) => viewProb(x, view, live));
  const expected = Math.round(probs.reduce((a, b) => a + b, 0));
  const favored = probs.filter((p) => p > 0.5).length;
  const tossups = probs.filter((p) => p > 0.4 && p < 0.6).length;
  const updated = new Date(live?.updated ?? data.updated).toLocaleString("en-US", {
    weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York",
  });

  return (
    <div className="min-h-screen bg-navy text-slate-300">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-14">
        <nav className="mb-14 flex items-center justify-between text-sm">
          <Link href="/#projects" className="group inline-flex items-center gap-2 whitespace-nowrap text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Patrick Melan
          </Link>
          <span className="whitespace-nowrap text-slate-500">
            2026 House forecast
          </span>
        </nav>

        <Hero data={data} live={live} />
        <p className="-mt-8 mb-16 text-sm text-slate-500">Updated {updated} ET. Polls close Tuesday, November 3.</p>

        {live && <LivePanel live={live} districts={data.districts} />}

        <Section title="Every seat, from safest Democratic to safest Republican"
          lede="Each dot is a district, sorted by how likely the Democrat is to win it and stacked in columns of 15. The 218th dot is where the majority is decided.">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div role="tablist" aria-label="Probability source" className="inline-flex rounded-lg bg-white/5 p-1">
              {views.map((v) => (
                <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)}
                  className={`rounded-md px-3.5 py-1.5 text-sm transition-colors ${view === v
                    ? "bg-white text-navy shadow-sm" : "text-slate-300 hover:text-white"}`}>
                  {VIEW_LABEL[v]}
                </button>
              ))}
            </div>
            <p className="text-sm tabular-nums text-slate-400">
              <span className="text-white">{expected}</span> expected Democratic seats ·{" "}
              <span className="text-white">{favored}</span> lean their way · <span className="text-white">{tossups}</span> within 40–60%
            </p>
          </div>
          <DotChart districts={data.districts} view={view} live={live} />
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <DotLegend view={view} />
            <p className="max-w-sm text-xs leading-relaxed text-slate-500">{VIEW_NOTE[view]}</p>
          </div>
        </Section>

        <Section title="How one district's number gets built"
          lede={`Start from how the district votes for president, then let each input move it. Defaults to ${data.layers.deluxe.tippingPoint.replace("-", "\u2011")}, the seat most likely to decide the majority.`}>
          <Walkthrough districts={data.districts} initial={data.layers.deluxe.tippingPoint} />
        </Section>

        <Section title="The range of outcomes"
          lede="Every simulation draws one national polling miss shared by all 435 races, a miss for each state, and noise for each race. Because a national miss moves dozens of seats at once, the spread is wide.">
          <SeatHistogram hist={live?.seatHist ?? data.seatHist.deluxe} />
        </Section>

        <Section title="Competitive races" lede="Every seat that's between 2% and 98% in at least one view. Search by state or district.">
          <DistrictTable districts={data.districts} live={live} />
        </Section>

        <Section title="Would it have worked before?"
          lede="Each past election from 2006 to 2024 is predicted by a model that never saw it, using only what was known a week before Election Day.">
          <Backtest bt={data.backtest} />
        </Section>

        <Section title="What it can't see">
          <div className="grid gap-x-10 gap-y-4 text-sm leading-relaxed text-slate-400 sm:grid-cols-2">
            {caveats(data).map(([h, b]) => (
              <p key={h}><span className="text-slate-200">{h}</span> {b}</p>
            ))}
          </div>
        </Section>

        <footer className="mt-20 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500">
          Built by Patrick Melan with data from The Downballot, FiveThirtyEight&apos;s archive, Wikipedia (CC BY-SA),
          the FEC, the American Presidency Project, Polymarket, and Kalshi. Not affiliated with any campaign or party.
        </footer>
      </div>
    </div>
  );
}

const VIEW_NOTE: Record<View, string> = {
  model: "The model: past results, the national environment, candidates, fundraising, expert ratings, and polls.",
  market: "Polymarket's price where a district market exists (147 seats). Hollow dots have no market and show the model.",
  blend: "Model and market averaged. The market gets more say in heavily traded races, never more than half.",
  live: "Called races are outlined. Uncalled seats update as results come in; early partial counts are ignored.",
};

const caveats = (data: Forecast): [string, string][] => [
  ...(data.sensitivity?.pControl2010plus != null ? [[
    "One number, several fair answers.",
    `Defensible modeling choices move the headline. Fit only on 2010–2024, leaving out the 2006 and 2008 waves, and the chance is ${Math.round(data.sensitivity.pControl2010plus * 100)}% instead of ${Math.round(data.layers.deluxe.pControl * 100)}%; the simpler Lite model says ${Math.round(data.layers.lite.pControl * 100)}%. Read it as a range, not a decimal.`,
  ] as [string, string]] : []),
  ["Ten elections.", "Only 2006–2024 calibrate how big a national polling miss can be, so the uncertainty is itself uncertain."],
  ["Two parties.", "It models Democrat-versus-Republican races. Independents backed by Democrats, as in Alaska, are a blind spot."],
  ["Thin markets.", "District markets often trade under $50,000 and overprice underdogs, which is why the blend caps their weight."],
  ["Imperfect freezing.", "Past expert ratings and fundraising are final pre-election values, not exactly what was known a week out."],
];

function Section({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section className="mb-24">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      {lede && <p className="mt-2 max-w-2xl leading-relaxed text-slate-400">{lede}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
