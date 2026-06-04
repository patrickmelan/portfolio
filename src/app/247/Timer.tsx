"use client";

import { useState, useEffect } from "react";

const TARGET_MS = 2026990637246;

function pad(n: number, digits = 2) {
  return String(n).padStart(digits, "0");
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}>
      <span
        style={
          {
            fontSize: "clamp(36px, 8vw, 64px)",
            fontFamily: "monospace",
            fontWeight: 700,
            tabularNums: "tabular-nums",
          } as React.CSSProperties
        }>
        {pad(value)}
      </span>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6f6f6f",
        }}>
        {label}
      </span>
    </div>
  );
}

export default function Timer() {
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

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: "32px 24px",
      }}>
      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6f6f6f",
          margin: 0,
        }}>
        *Hypothetical* 247,000,000-second countdown
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 32,
        }}>
        <Unit value={years} label="years" />
        <Unit value={remainingDays} label="days" />
        <Unit value={hours} label="hours" />
        <Unit value={minutes} label="min" />
        <Unit value={seconds} label="sec" />
      </div>
      <p style={{ fontSize: 11, color: "#6f6f6f", margin: 0 }}>
        ends{" "}
        {new Date(TARGET_MS).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p
        style={{
          fontSize: 11,
          color: "#aaa",
          fontVariantNumeric: "tabular-nums",
          margin: 0,
        }}>
        {remaining.toLocaleString()} seconds remaining
      </p>
    </div>
  );
}
