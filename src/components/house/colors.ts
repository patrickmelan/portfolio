// Seven-step diverging scale tuned for the navy background: solid blue -> slate toss-up -> solid red.
export const BUCKETS = [
  { min: 0.95, color: "#2563eb", label: "Safe D" },
  { min: 0.75, color: "#3b82f6", label: "Likely D" },
  { min: 0.6, color: "#93c5fd", label: "Lean D" },
  { min: 0.4, color: "#94a3b8", label: "Toss-up" },
  { min: 0.25, color: "#fca5a5", label: "Lean R" },
  { min: 0.05, color: "#ef4444", label: "Likely R" },
  { min: -1, color: "#b91c1c", label: "Safe R" },
] as const;

export const DEM = "#3b82f6";
export const REP = "#ef4444";

export function probColor(p: number): string {
  return BUCKETS.find((b) => p >= b.min)!.color;
}

export function pct(p: number | null | undefined, digits = 0): string {
  if (p == null) return "–";
  const v = p * 100;
  if (v > 99 && v < 99.5) return ">99%";
  if (v < 1 && v > 0.5) return "<1%";
  return `${v.toFixed(digits)}%`;
}

export function signed(x: number | null | undefined, digits = 1): string {
  if (x == null) return "–";
  if (Math.abs(x) < 0.05) return "Even";
  return `${x > 0 ? "D" : "R"}+${Math.abs(x).toFixed(digits)}`;
}
