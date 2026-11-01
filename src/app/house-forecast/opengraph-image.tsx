import { ImageResponse } from "next/og";
import { probColor } from "@/components/house/colors";
import type { Forecast } from "@/components/house/types";
import forecast from "@/data/house-forecast.json";

// Link-preview image (and the homepage project card), rendered at build time from the same forecast JSON.
export const alt = "2026 House forecast: all 435 seats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const data = forecast as unknown as Forecast;
const ROWS = 15;

export default function Image() {
  const d = data.layers.deluxe;
  const sorted = [...data.districts].sort((a, b) => b.p - a.p);
  const cols = Math.ceil(sorted.length / ROWS);
  const columns = Array.from({ length: cols }, (_, c) => sorted.slice(c * ROWS, c * ROWS + ROWS));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b1b3f", padding: 64, color: "#e2e8f0" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 400 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: "#94a3b8" }}>2026 House forecast</div>
            <div style={{ fontSize: 56, fontWeight: 700, color: "#fff", lineHeight: 1.05, marginTop: 16 }}>
              Who wins the House?
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 120, fontWeight: 700, color: "#fff", letterSpacing: -4, lineHeight: 1 }}>
              {`${Math.round(d.pControl * 100)}%`}
            </div>
            <div style={{ fontSize: 28, color: "#cbd5e1", marginTop: 8 }}>chance Democrats win control</div>
            <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 20 }}>
              {`${Math.round(d.meanSeats)} expected Democratic seats, 218 needed`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginLeft: "auto", alignItems: "center" }}>
          {columns.map((col, c) => (
            <div key={c} style={{ display: "flex", flexDirection: "column", marginLeft: c === 0 ? 0 : 4 }}>
              {col.map((x) => (
                <div key={x.id} style={{ width: 18, height: 18, borderRadius: 9, marginTop: 4, background: probColor(x.p) }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
