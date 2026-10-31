import type { Metadata } from "next";
import HouseForecast from "@/components/house/HouseForecast";
import type { Forecast } from "@/components/house/types";
import forecast from "@/data/house-forecast.json";

const data = forecast as unknown as Forecast;

export const metadata: Metadata = {
  title: "2026 House Forecast · Patrick Melan",
  description: `Democrats have a ${Math.round(data.layers.deluxe.pControl * 100)}% chance to win the House. A probabilistic forecast of all 435 races, with a live election-night update.`,
  openGraph: {
    title: "Who wins the House? 2026 forecast",
    description: "All 435 races simulated 50,000 times, checked against prediction markets.",
    url: "https://patrickmelan.com/house-forecast",
  },
};

export default function Page() {
  return <HouseForecast data={data} />;
}
