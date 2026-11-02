import { Check, X } from "lucide-react";

/** Did the pre-election forecast favor the party that won? (favored = over 50%) */
export function predictedRight(pDemPre: number, call: "D" | "R"): boolean {
  return (pDemPre > 0.5) === (call === "D");
}

/**
 * A called race: the winning party in its color, then a check if we had them favored or an X if we missed.
 * Green/amber stay clear of the party blue/red.
 */
export default function CallMark({ call, pDemPre }: { call: "D" | "R"; pDemPre: number }) {
  const right = predictedRight(pDemPre, call);
  return (
    <span className="inline-flex items-center justify-end gap-1.5"
      title={right ? "Called the way we predicted" : "Called against our prediction"}>
      <span className={`font-semibold ${call === "D" ? "text-blue-400" : "text-red-400"}`}>{call}</span>
      {right
        ? <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} aria-label="predicted correctly" />
        : <X className="h-4 w-4 text-amber-400" strokeWidth={3} aria-label="missed" />}
    </span>
  );
}
