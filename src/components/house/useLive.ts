"use client";

import { useEffect, useState } from "react";
import type { LiveState } from "./types";

// Public Vercel Blob URL the Python live loop overwrites on election night. Empty = live mode off.
export const LIVE_URL = process.env.NEXT_PUBLIC_HOUSE_LIVE_URL ?? "";
const POLL_MS = 60_000;

/** Polls the live election-night file; returns null until results exist (no calls yet = pre-election page). */
export function useLive(): LiveState | null {
  const [live, setLive] = useState<LiveState | null>(null);

  useEffect(() => {
    if (!LIVE_URL) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${LIVE_URL}?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as LiveState;
        if (!cancelled && data.nCalled > 0) setLive(data);
      } catch {
        // Network blips on election night are expected; keep showing the last good state.
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return live;
}
