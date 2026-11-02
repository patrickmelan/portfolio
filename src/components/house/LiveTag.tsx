import { Check } from "lucide-react";
import { Barlow_Condensed } from "next/font/google";

const condensed = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"] });

/**
 * Broadcast-style "results are in" bar for election night: a solid yellow block in heavy condensed caps with a
 * white time segment, in the spirit of a network projection lower-third.
 */
export default function LiveTag({ updated }: { updated: string }) {
  const time = new Date(updated).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", timeZone: "America/New_York",
  });
  return (
    <div className={`${condensed.className} mb-6 inline-flex max-w-full flex-wrap items-stretch uppercase leading-none`}>
      <span className="flex items-center gap-1.5 whitespace-nowrap bg-[#ffd400] px-2.5 py-1.5 text-[clamp(15px,4.9vw,26px)] font-extrabold tracking-wide text-black sm:gap-2 sm:px-3 sm:py-2">
        <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={4} aria-hidden />
        Updated election night
      </span>
      <span className="flex items-center whitespace-nowrap bg-white px-2.5 py-1.5 text-[clamp(15px,4.9vw,26px)] font-bold tracking-wide text-[#0b1b3f] sm:px-3">
        {time} ET
      </span>
    </div>
  );
}
