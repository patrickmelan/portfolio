import Image from "next/image";
import Timer from "./Timer";
import {
  Playfair_Display,
  Source_Serif_4,
  Libre_Franklin,
  Bebas_Neue,
} from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const ARTICLE = {
  kicker: "Science",
  headline: "Patrick Melan, 19, Given 247 Million Seconds to Live",
  deck: "In a shocking discovery by doctors at the University of Pennsylvania, the Philadelphia student, as well as the rest of humanity, has been schocked by the news.",
  author: "Patrick Melan",
  date: "June 1, 2026",
  readingTime: "9 min read",
  heroSrc:
    "https://tupa-q-001.sitecorecontenthub.cloud/api/public/content/e849bda76dd4473c8e3f35b171936d71?fit=scale-down&t=239x1&mw=2048",
  heroCaption:
    "Clifton Center for Medical Breakthroughs | University of Pennsylvania",
  body: [
    `In a stunning discovery for humanity, we found the first human in recorded history to be given an exact amount of time of life remaining: Patrick Melan. Yes, the same Patrick Melan featured on 60 Minutes this past May on the topic of happiness. Instead of CBS, he sat down with the NYT and we had a fun talk about how he plans on living out the remaining 247 million seconds of his life.`,
    `When we look at numbers, paired with a unit, we immediately think of their size and begin thinking of how much is too much of something, or vice versa. When thinking of large numbers, 247 million is massive, but relative to what? Cookies? Water bottles? Airplanes? Are we talking 247 million blades of grass in one thousand acres of pasture? What about 247 million blades of grass in one billion acres of pasture? That number of grass quickly becomes minimal once you increase the relativity, but what if we talk about something in terms of time? Going back in time by X million time units, Earth can change drastically, or not at all.`,
    `Going back 247 million years, it was basically a different planet. There was no North and South America, Europe, Asia, Africa, or anything else; It was only the supercontinent, Pangea. There were obviously no humans, no dogs, no cats, no fish, just ancestors of everything. Heck, dinosaurs weren’t even a thing yet!`,
    `Going back 247 million days (676,000 years), Earth was almost the exact same configuration as it is now, except in an Ice Age. Instead of a supercontinent, there were multiple continents and, instead of humans, our ancestors, Homo heidelbergensis, roamed the planet.`,
    `Going back 247 million minutes (not even 500 years), there was civilization, empires, transportation, languages, and about everything else you could expect from the 1500s, even the discovery of the Americas by Christopher Columbus! `,
    `Furthermore, 247 million seconds takes us back eight years to July/August, 2018 (depending on when you’re reading this). The point is, the way we perceive time changes based on the unit in front of it. Now, what if, instead of going back 247 million seconds, what if we only had 247 million seconds left to live? How would you live? You just spent about 80 seconds reading this, so how would you spend the remaining 246,000,920?`,
  ],
  pullQuote:
    "Do you want to take a leap of faith, or become an old man, filled with regret, waiting to die alone?",
  midImageSrc: "https://miro.medium.com/0*mF0lA-QNU86WgIzU",
  midImageCaption:
    'Totem from Inception (One of my favorites) / Plays into the "Time" Theme | Christopher Nolan',
  bodyAfterMid: [
    `The young man has been all over social media recently and been a big hit amongst “Gen Z” after his viral interview, so he was happy to sit down with us and discuss how he plans on spending his remaining seconds, this is just a summary of what we talked about.`,
    `“I’m not too worried”, Melan said. We talked about his 60 Minutes interview and how his views on happiness are tied into the prognosis, but more really about how he plans on spending his remaining time on Earth. Since it’s easier to read, we will refer to his time left as 8 years, instead of 247 million seconds. Also, everything from here on will be written in first person, as if Patrick is the one writing.`,
    `When I was first told my timeline by the doctors at Penn, I almost fainted. I was overcome with feelings of sadness, anger, and deep resentment. How could this happen to me? Why me? I eat healthy, I exercise often, I treat everyone the way I want to be treated (I’m superstitious), how is this happening? I spent days asking myself these questions, pondering in deep sadness. Then, it hit me, I can’t live my life and be remembered for doing this, I need to make the most of it, hence why I came up with this plan. I call it the “Patrick’s Awesome Time Remaining In the Comfort of Knowledge Plan”, or the PATRICK plan.`,
    `First, I had to remove the time spent sleeping, which is going to be about 8 hours, or 28,800 seconds, per day, which equates to about 84,096,000 seconds I will spend out of the 8 years remaining. So, in all, I’m left with about 236,488,000 seconds, or about 7.5 years. Now, aside from sleep, there are other necessities that come with life, such as eating, bathing, exercising, and any other social activities I decide to take up. For each one, I found the human average and subtracted that amount in seconds from my life total.`,
  ],
  bodyAfterStats: [
    `It seems like an infinite amount of time, but I wiped away over 160 million seconds by doing daily habits. Now, of course, I can plan my life all day long, but I’m uncertain of what could happen tomorrow. I can only think of things that I want to do, but can’t really quantify how long things will take to the second, hence why I have ranked the top three things I plan on doing for the rest of my ~80 million seconds, about 925 days. It’s a very thought provoking concept, do I spend every dying second of the day with other people? With myself? What should I be doing? I usually tend to be someone who knows exactly what to do, or at least I think I do, but, when it comes to this, I must say: I think a plan is unnecessary.`,
    `When I first thought of this paper, I thought I’d have a billion things to write down and do with the time I had. However, the more I wrote, the less I could think of doing. The longer I sat with that number in my mind, the more I thought that I just can’t plan out that amount of time, and instead could be fulfilling my purpose and being happy doing what I love to do. I don’t want to bottle up my feelings, I don’t want to keep it in, I want to be able to arrive at the 247 millionth second and say, “It was worth it”. I want the 247 millionth second to find me mid-laugh, mid-cheeseburger, mid-whatever, just not me rotting for that final moment. `,
  ],
};

const NAV_ITEMS = [
  "Home",
  "World",
  "U.S.",
  "Technology",
  "Science",
  "Arts",
  "Style",
  "Food",
  "Travel",
];

const formattedDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function PatRickTimesPage() {
  const fontVars = [
    playfair.variable,
    sourceSerif.variable,
    libreFranklin.variable,
    bebasNeue.variable,
  ].join(" ");

  return (
    <div
      className={fontVars}
      style={{ background: "#fff", color: "#121212", minHeight: "100vh" }}>
      <style>{`
        :root {
          --black: #121212;
          --white: #fff;
          --divider: #e2e2e2;
          --muted: #6f6f6f;
          --red: #cc0011;
        }

        .prt-playfair   { font-family: var(--font-playfair), serif; }
        .prt-serif      { font-family: var(--font-source-serif), serif; }
        .prt-ui         { font-family: var(--font-libre-franklin), sans-serif; }

        /* Utility bar */
        .prt-utility {
          border-bottom: 1px solid var(--divider);
          padding: 6px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--muted);
        }
        .prt-utility-left { display: flex; gap: 16px; align-items: center; }
        .prt-utility-right { display: flex; gap: 12px; align-items: center; }
        .prt-subscribe-btn {
          background: var(--black);
          color: var(--white);
          border: none;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .prt-login-link { color: var(--black); text-decoration: none; font-weight: 600; }

        /* Masthead */
        .prt-masthead {
          text-align: center;
          padding: 20px 24px 0;
          border-bottom: 3px double var(--black);
          padding-bottom: 16px;
        }
        .prt-masthead-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .prt-masthead-meta {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.6;
        }
        .prt-masthead-meta.right { text-align: right; }
        .prt-masthead-title {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Live badge */
        .prt-live-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .prt-live-badge {
          background: var(--red);
          color: var(--white);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }
        .prt-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--white);
          animation: prt-pulse 1.4s ease-in-out infinite;
        }
        @keyframes prt-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .prt-live-updated {
          font-size: 12px;
          color: var(--muted);
        }

        /* Section nav */
        .prt-nav {
          border-bottom: 1px solid var(--divider);
          overflow-x: auto;
        }
        .prt-nav-inner {
          display: flex;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          justify-content: center;
        }
        .prt-nav-item {
          padding: 12px 14px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--black);
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: border-color 0.15s;
        }
        .prt-nav-item:hover { border-bottom-color: var(--black); }
        .prt-nav-item.active { border-bottom-color: var(--red); color: var(--red); }

        /* Article column */
        .prt-article-wrap {
          max-width: 680px;
          margin: 0 auto;
          padding: 40px 24px 0;
        }

        /* Kicker */
        .prt-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }

        /* Headline */
        .prt-headline {
          font-size: clamp(28px, 5vw, 46px);
          line-height: 1.08;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        /* Deck */
        .prt-deck {
          font-size: 18px;
          line-height: 1.45;
          font-style: italic;
          color: #2a2a2a;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--divider);
          padding-bottom: 20px;
        }

        /* Byline bar */
        .prt-byline-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .prt-byline {
          font-size: 13px;
          color: var(--muted);
        }
        .prt-byline strong { color: var(--black); font-weight: 700; }
        .prt-reading-time {
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        /* Share toolbar */
        .prt-toolbar {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--divider);
        }
        .prt-tool-btn {
          width: 34px;
          height: 34px;
          border: 1px solid var(--divider);
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--black);
          font-size: 14px;
          transition: background 0.1s;
        }
        .prt-tool-btn:hover { background: var(--divider); }

        /* Hero */
        .prt-hero img {
          width: 100%;
          display: block;
          margin-bottom: 8px;
        }
        .prt-caption {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.4;
          margin-bottom: 28px;
        }

        /* Body copy */
        .prt-body p {
          font-size: 18px;
          line-height: 1.65;
          color: var(--black);
          margin-bottom: 22px;
        }
        .prt-body p:first-child::first-letter {
          font-size: 5.2em;
          float: left;
          line-height: 0.8;
          margin: 4px 8px 0 0;
          font-weight: 700;
          color: var(--black);
          font-family: var(--font-playfair), serif;
        }

        /* Pull quote */
        .prt-pull-quote {
          margin: 32px 0;
          padding: 20px 24px;
          border-top: 3px solid var(--black);
          border-bottom: 3px solid var(--black);
          position: relative;
        }
        .prt-pull-quote::before {
          content: "";
          display: block;
          border-top: 1px solid var(--black);
          margin-bottom: 16px;
          margin-top: 4px;
        }
        .prt-pull-quote::after {
          content: "";
          display: block;
          border-bottom: 1px solid var(--black);
          margin-top: 16px;
          margin-bottom: 4px;
        }
        .prt-pull-quote p {
          font-size: 22px;
          line-height: 1.35;
          font-style: italic;
          font-weight: 700;
          color: var(--black);
          margin: 0;
          text-align: center;
        }

        /* Big number stat block */
        .prt-stat-block {
          margin: 32px 0;
          padding: 20px 24px;
          border-top: 3px solid var(--black);
          border-bottom: 3px solid var(--black);
          display: flex;
          flex-direction: row;
          align-items: baseline;
          justify-content: center;
          gap: 16px;
        }
        .prt-stat-block--vertical {
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin: 16px 0;
          border: none;
        }
        .prt-stat-number {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(80px, 18vw, 130px);
          line-height: 1;
          color: var(--red);
          letter-spacing: 0.02em;
        }
        .prt-stat-number--blue   { color: #1a6fc4; }
        .prt-stat-number--green  { color: #1a7a4a; }
        .prt-stat-number--purple { color: #7b2d8b; }
        .prt-stat-number--orange { color: #c47a00; }
        .prt-stat-unit {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(28px, 6vw, 46px);
          line-height: 1;
          letter-spacing: 0.06em;
          color: var(--black);
        }
        .prt-stat-category {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-align: center;
        }
        .prt-stat-sublabel {
          font-size: 13px;
          color: var(--muted);
          text-align: center;
        }
        .prt-remaining-block {
          margin: 8px 0 16px;
          padding: 14px 24px;
          background: #f4f4f4;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .prt-remaining-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }
        .prt-remaining-number {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(36px, 8vw, 60px);
          line-height: 1;
          color: #1a7a4a;
          letter-spacing: 0.02em;
        }
        .prt-remaining-unit {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(18px, 3vw, 26px);
          line-height: 1;
          color: var(--black);
        }

        /* Mid full-bleed image */
        .prt-mid-image {
          width: 100vw;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          margin: 36px 0;
        }
        .prt-mid-image img {
          width: 100%;
          max-height: 480px;
          object-fit: cover;
          display: block;
        }
        .prt-mid-caption {
          max-width: 680px;
          margin: 8px auto 0;
          padding: 0 24px;
          font-size: 12px;
          color: var(--muted);
        }

        /* Footer */
        .prt-footer {
          background: var(--white);
          color: var(--black);
          border-top: 1px solid var(--divider);
          padding: 32px 24px 20px;
          margin-top: 0;
        }
        .prt-footer-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .prt-footer-masthead {
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--divider);
          text-align: center;
        }
        .prt-footer-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 56px;
          margin-bottom: 28px;
          justify-content: center;
        }
        .prt-footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--black);
          margin-bottom: 12px;
        }
        .prt-footer-col a {
          display: block;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          margin-bottom: 6px;
        }
        .prt-footer-col a:hover { color: var(--black); }
        .prt-footer-copy {
          font-size: 11px;
          color: var(--muted);
          border-top: 1px solid var(--divider);
          padding-top: 16px;
          letter-spacing: 0.04em;
          text-align: center;
        }

        @media (max-width: 600px) {
          .prt-masthead-inner { grid-template-columns: 1fr; text-align: center; }
          .prt-masthead-meta.right { text-align: center; }
          .prt-utility-left { gap: 8px; flex-wrap: wrap; }
        }
      `}</style>

      {/* 1. Utility bar */}
      <div className="prt-utility prt-ui">
        <div className="prt-utility-left">
          <span>{formattedDate}</span>
        </div>
        <div className="prt-utility-right">
          <a href="#" className="prt-login-link">
            Log In
          </a>
          <button className="prt-subscribe-btn">Subscribe</button>
        </div>
      </div>

      {/* 2. Masthead */}
      <header className="prt-masthead">
        <div className="prt-masthead-inner">
          <div className="prt-masthead-meta prt-ui">
            <div>Bingham Edition</div>
            <div>Vol. CIII . . . No. 169</div>
          </div>
          <div className="prt-masthead-title">
            <Image
              src="/pat-rick-times-logo.png"
              alt="The Pat Rick Times"
              width={520}
              height={120}
              style={{ width: "90%", maxWidth: 500, height: "auto" }}
              priority
            />
          </div>
          <div className="prt-masthead-meta right prt-ui">
            <div>patrickmelan.com</div>
            <div>Est. MMXXIV</div>
          </div>
        </div>
      </header>

      {/* 3. Section nav */}
      <nav className="prt-nav prt-ui">
        <div className="prt-nav-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className={`prt-nav-item${item === ARTICLE.kicker ? " active" : ""}`}>
              {item}
            </a>
          ))}
          <a
            href="/"
            className="prt-nav-item"
            target="_blank"
            rel="noopener noreferrer">
            View my Portfolio
          </a>
        </div>
      </nav>

      {/* 4. Article */}
      <main className="prt-article-wrap">
        {/* Live badge */}
        <div className="prt-live-row prt-ui">
          <span className="prt-live-badge">
            <span className="prt-live-dot" />
            Live
          </span>
          <span className="prt-live-updated">Updated 4 minutes ago</span>
        </div>

        {/* Kicker */}
        <div className="prt-kicker prt-ui">{ARTICLE.kicker}</div>

        {/* Headline */}
        <h1 className="prt-headline prt-playfair">{ARTICLE.headline}</h1>

        {/* Deck */}
        <p className="prt-deck prt-playfair">{ARTICLE.deck}</p>

        {/* Byline bar */}
        <div className="prt-byline-bar prt-ui">
          <span className="prt-byline">
            By <strong>{ARTICLE.author}</strong> &nbsp;·&nbsp; {ARTICLE.date}
          </span>
          <span className="prt-reading-time">{ARTICLE.readingTime}</span>
        </div>

        {/* AI disclaimer */}
        <p
          className="prt-ui"
          style={{
            fontSize: 11,
            color: "var(--muted)",
            marginBottom: 16,
            borderBottom: "1px solid var(--divider)",
            paddingBottom: 16,
          }}>
          The UI of this page was created using Generative AI. All textual
          content is human written.
        </p>

        {/* Share toolbar */}
        <div className="prt-toolbar">
          {/* X / Twitter */}
          <button className="prt-tool-btn prt-ui" aria-label="Share on X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
            </svg>
          </button>
          {/* LinkedIn */}
          <button
            className="prt-tool-btn prt-ui"
            aria-label="Share on LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
          </button>
          {/* Facebook */}
          <button
            className="prt-tool-btn prt-ui"
            aria-label="Share on Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
            </svg>
          </button>
          {/* Email */}
          <button className="prt-tool-btn prt-ui" aria-label="Share via email">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </button>
          {/* Bookmark */}
          <button className="prt-tool-btn prt-ui" aria-label="Bookmark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>
          {/* Share / link */}
          <button className="prt-tool-btn prt-ui" aria-label="Copy link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
        </div>

        {/* Hero image */}
        <figure className="prt-hero" style={{ margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ARTICLE.heroSrc} alt="Hero" />
          <figcaption className="prt-caption prt-ui">
            {ARTICLE.heroCaption}
          </figcaption>
        </figure>

        {/* Body copy — first half */}
        <div className="prt-body prt-serif">
          {ARTICLE.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {/* Body copy — second half (in the mid-image break we leave the column) */}
      </main>

      {/* Full-bleed mid image (outside the constrained column) */}
      <div className="prt-mid-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ARTICLE.midImageSrc} alt="Mid article" />
        <p className="prt-mid-caption prt-ui">{ARTICLE.midImageCaption}</p>
      </div>

      {/* Resume column */}
      <main className="prt-article-wrap" style={{ paddingTop: 0 }}>
        <div className="prt-body prt-serif">
          {ARTICLE.bodyAfterMid.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Eating & Drinking */}
        <div className="prt-stat-block prt-stat-block--vertical prt-playfair">
          <div className="prt-stat-category prt-ui">Eating &amp; Drinking</div>
          <span className="prt-stat-number prt-stat-number--blue">
            11,249,602
          </span>
          <span className="prt-stat-unit">Seconds</span>
          <div className="prt-stat-sublabel prt-ui">
            68.5 min/day · 4,110 s/day
          </div>
        </div>

        {/* Bathing & Hygiene */}
        <div className="prt-stat-block prt-stat-block--vertical prt-playfair">
          <div className="prt-stat-category prt-ui">Bathing &amp; Hygiene</div>
          <span className="prt-stat-number prt-stat-number--green">
            7,390,250
          </span>
          <span className="prt-stat-unit">Seconds</span>
          <div className="prt-stat-sublabel prt-ui">
            45 min/day · 2,700 s/day
          </div>
        </div>

        {/* Exercise */}
        <div className="prt-stat-block prt-stat-block--vertical prt-playfair">
          <div className="prt-stat-category prt-ui">Exercise</div>
          <span className="prt-stat-number prt-stat-number--purple">
            9,853,666
          </span>
          <span className="prt-stat-unit">Seconds</span>
          <div className="prt-stat-sublabel prt-ui">
            60 min/day · 3,600 s/day
          </div>
        </div>

        {/* Working */}
        <div className="prt-stat-block prt-stat-block--vertical prt-playfair">
          <div className="prt-stat-category prt-ui">Working</div>
          <span className="prt-stat-number prt-stat-number--orange">
            54,000,000
          </span>
          <span className="prt-stat-unit">Seconds</span>
          <div className="prt-stat-sublabel prt-ui">
            8 hrs/day · 5 days/week
          </div>
        </div>

        {/* Final amount left */}
        <div className="prt-remaining-block prt-playfair">
          <span className="prt-remaining-label prt-ui">Amount Left</span>
          <span className="prt-remaining-number">80,410,482</span>
          <span className="prt-remaining-unit">Seconds</span>
        </div>

        {/* Body copy after stats */}
        <div className="prt-body prt-serif">
          {ARTICLE.bodyAfterStats.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

      </main>

      {/* Timer section */}
      <div
        style={{
          borderTop: "1px solid #e2e2e2",
          borderBottom: "1px solid #e2e2e2",
          margin: "0 0 0",
        }}>
        <Timer />
      </div>

      {/* 5. Footer */}
      <footer className="prt-footer prt-ui">
        <div className="prt-footer-masthead">
          <Image
            src="/pat-rick-times-logo.png"
            alt="The Pat Rick Times"
            width={340}
            height={78}
            style={{
              height: "auto",
              width: "auto",
              maxWidth: 340,
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
        <div className="prt-footer-grid">
          {[
            {
              title: "News",
              links: ["Home Page", "World", "U.S.", "Politics", "Science"],
            },
            {
              title: "Opinion",
              links: [
                "Today's Opinion",
                "Editorials",
                "Letters",
                "Sunday Review",
              ],
            },
            {
              title: "Arts",
              links: ["Books", "Style", "Food", "Travel", "Film"],
            },
            {
              title: "More",
              links: ["About", "Contact", "RSS Feeds", "Privacy Policy"],
            },
          ].map((col) => (
            <div key={col.title} className="prt-footer-col">
              <div className="prt-footer-col-title">{col.title}</div>
              {col.links.map((link) => (
                <a key={link} href="#">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="prt-footer-copy">
          &copy; {new Date().getFullYear()} The Pat Rick Times. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
