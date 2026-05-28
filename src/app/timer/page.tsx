"use client";

import { useState, useEffect } from "react";

const TARGET_MS = 2026990637246;

function pad(n: number, digits = 2) {
  return String(n).padStart(digits, "0");
}

export default function TimerPage() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_MS - Date.now());
      setRemaining(Math.floor(diff / 1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const totalSecs = remaining;
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const years = Math.floor(days / 365);
  const remainingDays = days % 365;

  return (
    <main className="min-h-screen bg-slate-900 text-cyan-400 flex flex-col items-center justify-center gap-8 px-4">
      <p className="text-cyan-600 text-sm tracking-widest uppercase">
        247,000,000 seconds
      </p>

      <div className="flex flex-wrap justify-center gap-6 text-center">
        <Unit value={years} label="years" />
        <Unit value={remainingDays} label="days" />
        <Unit value={hours} label="hours" />
        <Unit value={minutes} label="min" />
        <Unit value={seconds} label="sec" />
      </div>

      <p className="text-cyan-700 text-xs">
        ends {new Date(TARGET_MS).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <p className="text-cyan-800 text-xs tabular-nums">
        {pad(totalSecs)} seconds remaining
      </p>
    </main>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-5xl font-mono font-bold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-cyan-600 text-xs tracking-widest uppercase">{label}</span>
    </div>
  );
}