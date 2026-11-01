// Shapes of the JSON written by the house-forecast Python pipeline (src/report/export_web.py, src/live/run.py).

export type Layer = "lite" | "classic" | "deluxe";

export interface District {
  id: string;
  inc: "D" | "R" | "Open";
  lean: number;
  rating: number | null;
  poll: number | null;
  polls: number;
  fund: number | null;
  margin: number;
  sd: number;
  p: number;
  pLite: number;
  pClassic: number;
  pMkt: number | null;
  vol: number | null;
  pBlend: number;
  /** Margin build-up (D−R pts): lean, +national, +candidates and money, +experts, +polls (final). */
  steps: [number, number, number, number, number];
}

export interface LayerSummary {
  pControl: number;
  meanSeats: number;
  seats80: [number, number];
  tippingPoint: string;
}

export interface BacktestRow {
  model: string;
  brier: number;
  logloss: number;
  seatMae: number;
}

export interface Forecast {
  updated: string;
  electionDate: string;
  national: { genericBallot: number; approvalNet: number; env: number };
  sensitivity: { pControl2010plus: number | null };
  layers: Record<Layer, LayerSummary>;
  blend: { expectedSeats: number; maxWeight: number; volHalf: number };
  markets: Partial<Record<"polymarket" | "kalshi", { p_dem: number; volume: number }>>;
  seatHist: Record<Layer, number[]>;
  districts: District[];
  backtest: {
    all: BacktestRow[];
    midterms: BacktestRow[];
    byYear: Record<string, number>[];
    calibration: Record<string, { pred: number; obs: number; n: number }[]>;
  };
}

// Election-night state, uploaded to Vercel Blob every ~2 minutes by `python -m src.live.run`.
export interface LiveState {
  updated: string;
  nCalled: number;
  calledDem: number;
  pControl: number;
  meanSeats: number;
  seats80: [number, number];
  natShift: number;
  nPending: number;
  markets: Partial<Record<"polymarket" | "kalshi", number>>;
  history: [string, number, number | null, number | null][]; // time, model, polymarket, kalshi
  seatHist: number[];
  districts: Record<string, [number, "D" | "R" | "", number | null]>; // live p, call, leverage
}

export type View = "model" | "market" | "blend" | "live";
