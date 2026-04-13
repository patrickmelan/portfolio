"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { roundNames } from "./bracket-data";
import type { Matchup, Region, BracketData } from "./bracket-data";

// ── Matchup Card ──────────────────────────────────────────────

function MatchupCard({
  matchup,
  mode,
}: {
  matchup: Matchup;
  mode: "prediction" | "actual";
}) {
  const hasResult = !!matchup.actual;
  const hasPrediction = !!matchup.predicted;
  const isCorrect =
    hasResult && hasPrediction && matchup.actual === matchup.predicted;
  const isIncorrect =
    hasResult && hasPrediction && matchup.actual !== matchup.predicted;

  const borderColor = isCorrect
    ? "border-green-500/60"
    : isIncorrect
      ? "border-red-500/60"
      : matchup.upset && mode === "prediction"
        ? "border-yellow-500/40"
        : "border-slate-600";

  const bgColor = isCorrect
    ? "bg-green-950/30"
    : isIncorrect
      ? "bg-red-950/30"
      : "bg-slate-800/60";

  function TeamRow({
    name,
    seed,
    isPick,
  }: {
    name: string;
    seed: number;
    isPick: boolean;
  }) {
    const isActualWinner = hasResult && matchup.actual === name;
    let cls = "text-slate-300";
    if (mode === "actual") {
      if (isActualWinner) cls = "text-green-300 font-semibold";
      else if (hasResult) cls = "text-slate-500 line-through";
    } else {
      if (hasResult && isActualWinner) cls = "text-green-300 font-semibold";
      else if (hasResult && !isActualWinner)
        cls = "text-slate-500 line-through";
      else if (isPick) cls = "text-cyan-300 font-semibold";
    }
    return (
      <div
        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] leading-tight ${cls}`}>
        <span className="text-slate-500 w-5 text-right shrink-0">({seed})</span>
        <span className="truncate">{name}</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded border ${borderColor} ${bgColor} p-1 w-[130px] shrink-0`}>
      <TeamRow
        name={matchup.team1.name}
        seed={matchup.team1.seed}
        isPick={matchup.predicted === matchup.team1.name}
      />
      <TeamRow
        name={matchup.team2.name}
        seed={matchup.team2.seed}
        isPick={matchup.predicted === matchup.team2.name}
      />
      {(hasPrediction || hasResult) && (
        <div className="flex items-center justify-between mt-0.5 px-1.5">
          {mode === "prediction" && hasPrediction ? (
            <span className="text-[9px] text-slate-500 font-mono truncate">
              {matchup.predicted} {matchup.probability}%{matchup.upset && " ⚠️"}
            </span>
          ) : (
            <span className="text-[9px] text-slate-500 font-mono truncate">
              {matchup.actual ?? "—"}
            </span>
          )}
          {isCorrect && (
            <span className="text-green-400 text-[9px]">&#10003;</span>
          )}
          {isIncorrect && (
            <span className="text-red-400 text-[9px]">&#10007;</span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Round Column ──────────────────────────────────────────────

function RoundColumn({
  matchups,
  roundName,
  mode,
}: {
  matchups: Matchup[];
  roundName: string;
  mode: "prediction" | "actual";
}) {
  if (matchups.length === 0) return null;
  return (
    <div className="flex flex-col items-center min-w-[130px]">
      <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2">
        {roundName}
      </h4>
      <div className="flex flex-col gap-1.5 justify-around flex-1">
        {matchups.map((m, i) => (
          <MatchupCard key={i} matchup={m} mode={mode} />
        ))}
      </div>
    </div>
  );
}

// ── Region Strip ──────────────────────────────────────────────

function RegionStrip({
  region,
  direction,
  mode,
}: {
  region: Region;
  direction: "ltr" | "rtl";
  mode: "prediction" | "actual";
}) {
  const rounds = region.rounds.filter((r) => r.length > 0);
  const displayRounds = direction === "rtl" ? [...rounds].reverse() : rounds;
  const displayNames =
    direction === "rtl"
      ? rounds.map((_, i) => roundNames[i] ?? `Round ${i + 1}`).reverse()
      : rounds.map((_, i) => roundNames[i] ?? `Round ${i + 1}`);

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold text-cyan-400 font-mono tracking-wide">
        {region.name}
      </h3>
      <div
        className={`flex gap-2 overflow-x-auto lg:overflow-x-visible pb-2 ${direction === "rtl" ? "justify-end" : ""}`}>
        {displayRounds.map((roundMatchups, i) => (
          <RoundColumn
            key={i}
            matchups={roundMatchups}
            roundName={displayNames[i]}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Bracket Component ────────────────────────────────────

export default function Bracket({
  data,
  title,
  mode,
  championLogo,
}: {
  data: BracketData;
  title: string;
  mode: "prediction" | "actual";
  championLogo?: string;
}) {
  const east = data.regions.find((r) => r.name === "East")!;
  const west = data.regions.find((r) => r.name === "West")!;
  const south = data.regions.find((r) => r.name === "South")!;
  const midwest = data.regions.find((r) => r.name === "Midwest")!;

  const hasFinalFour = data.finalFour.length > 0;
  const hasChampionship = data.championship.team1.name !== "TBD";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px] font-mono text-slate-400">
        {mode === "prediction" && (
          <>
            <span className="flex items-center gap-1.5">
              <span className="text-cyan-300">Cyan</span> = Model pick
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded border border-yellow-500/40 bg-slate-800/60 inline-block" />
              Upset pick
            </span>
          </>
        )}
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-green-500/60 bg-green-950/30 inline-block" />
          Correct
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-red-500/60 bg-red-950/30 inline-block" />
          Incorrect
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-slate-600 bg-slate-800/60 inline-block" />
          Not yet played
        </span>
      </div>

      {/* ── Top: East (LTR) + West (RTL) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-3 overflow-x-auto lg:overflow-x-visible">
          <RegionStrip region={east} direction="ltr" mode={mode} />
        </div>
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-3 overflow-x-auto lg:overflow-x-visible">
          <RegionStrip region={west} direction="rtl" mode={mode} />
        </div>
      </div>

      {/* ── Final Four semifinal 1 (East vs South) ── */}
      {hasFinalFour && (
        <div className="flex justify-center">
          <div className="bg-slate-800/30 rounded-xl border border-cyan-500/20 p-3">
            <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-wider text-center mb-2">
              Semifinal — {data.finalFour[0].team1.name} vs{" "}
              {data.finalFour[0].team2.name}
            </h4>
            <div className="flex justify-center">
              <MatchupCard matchup={data.finalFour[0]} mode={mode} />
            </div>
          </div>
        </div>
      )}

      {/* ── Championship ── */}
      {hasChampionship && (
        <div className="flex justify-center items-center gap-4">
          <div className="bg-slate-800/30 rounded-xl border border-cyan-500/40 p-4">
            <h4 className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider text-center mb-2">
              Championship
            </h4>
            <div className="flex justify-center">
              <MatchupCard matchup={data.championship} mode={mode} />
            </div>
            {championLogo && (
              <div className="flex flex-col items-center gap-1 mt-3">
                <Image
                  src={championLogo}
                  alt="Champion"
                  width={48}
                  height={48}
                />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  Champion
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Final Four semifinal 2 (West vs Midwest) ── */}
      {hasFinalFour && data.finalFour.length > 1 && (
        <div className="flex justify-center">
          <div className="bg-slate-800/30 rounded-xl border border-cyan-500/20 p-3">
            <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-wider text-center mb-2">
              Semifinal — {data.finalFour[1].team1.name} vs{" "}
              {data.finalFour[1].team2.name}
            </h4>
            <div className="flex justify-center">
              <MatchupCard matchup={data.finalFour[1]} mode={mode} />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom: Midwest (LTR) + South (RTL) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-3 overflow-x-auto lg:overflow-x-visible">
          <RegionStrip region={south} direction="ltr" mode={mode} />
        </div>
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-3 overflow-x-auto lg:overflow-x-visible">
          <RegionStrip region={midwest} direction="rtl" mode={mode} />
        </div>
      </div>
    </motion.div>
  );
}
