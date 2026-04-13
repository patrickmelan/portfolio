import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Bracket from "./Bracket";
import { v3BracketData } from "./bracket-data";

export default function OnionsIndex() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Back navigation */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Back to home</span>
        </Link>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <p className="text-cyan-400 font-mono text-sm mb-4">Project Writeup</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Onions Basketball Index
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-mono">
          <span>Patrick Melan</span>
          <span className="text-slate-600">|</span>
          <span>March 17, 2026</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href="https://github.com/patrickmelan/Onions-Basketball-Index"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-mono">
            <Image
              src="/GitHub_Invertocat_White_Clearspace.svg"
              alt="GitHub"
              width={16}
              height={16}
            />
            <span>View on GitHub</span>
          </a>
        </div>
      </header>

      <hr className="max-w-3xl mx-auto border-slate-800" />

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Introduction */}
        <p className="text-lg text-slate-300 leading-relaxed">
          The Onions Basketball Index is a probabilistic model for predicting
          NCAA tournament outcomes. It combines KenPom efficiency ratings with
          historical upset patterns to generate a complete 63-game bracket
          prediction, including win probabilities for every matchup.
        </p>

        <p className="text-lg text-slate-300 leading-relaxed">
          The name comes from the classic basketball phrase &ldquo;that guy has
          onions&rdquo; &mdash; meaning a player has guts, nerve, the
          willingness to take and make the big shot. The model tries to capture
          that same energy: which teams actually perform when it matters?
        </p>

        {/* Big text callout */}
        <div className="py-8">
          <p className="text-4xl md:text-5xl font-bold text-white leading-tight">
            A 3-layer model for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              March Madness
            </span>
          </p>
        </div>

        {/* Methodology */}
        <h2 className="text-2xl font-bold text-white">Methodology</h2>

        <p className="text-lg text-slate-300 leading-relaxed">
          The model has three versions, each building on the last:
        </p>

        <ul className="space-y-4 text-slate-300">
          <li className="flex gap-3">
            <span className="text-cyan-400 font-mono font-bold shrink-0">
              v1
            </span>
            <span>
              <strong className="text-white">Logistic Efficiency Model</strong>{" "}
              &mdash; Uses KenPom adjusted offensive and defensive efficiency
              ratings as inputs to a logistic regression. The difference in team
              efficiencies produces a win probability for each matchup, which is
              then simulated forward through the bracket.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-mono font-bold shrink-0">
              v2
            </span>
            <span>
              <strong className="text-white">Efficiency Splits</strong> &mdash;
              Breaks efficiency into offensive and defensive components rather
              than net rating. This captures stylistic mismatches &mdash; a
              great defense vs. a great offense plays out differently than two
              average teams.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-mono font-bold shrink-0">
              v3
            </span>
            <span>
              <strong className="text-white">Upset Detection</strong> &mdash;
              Adds historical seed-matchup upset rates as a prior. If 12-seeds
              beat 5-seeds 35% of the time historically, the model incorporates
              that signal even when pure efficiency says otherwise. This is the
              version shown in the bracket below.
            </span>
          </li>
        </ul>

        {/* Code block */}
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2">
            <span className="text-sm text-slate-400 font-mono">predict.py</span>
          </div>
          <pre className="bg-slate-950 p-4 overflow-x-auto">
            <code className="text-sm font-mono text-slate-300">
              {`def predict_matchup(team_a, team_b, kenpom):
    """Logistic model: P(A wins) from efficiency gap."""
    eff_a = kenpom[team_a]["adj_eff"]
    eff_b = kenpom[team_b]["adj_eff"]
    diff = eff_a - eff_b

    log_odds = 0.1462 * diff  # fitted coefficient
    prob_a = 1 / (1 + math.exp(-log_odds))
    return prob_a

def simulate_bracket(bracket, kenpom, n=10000):
    """Monte Carlo: simulate full tournament n times."""
    champion_counts = defaultdict(int)
    for _ in range(n):
        winners = {}
        for round_num in range(6):
            matchups = get_matchups(bracket, round_num, winners)
            for a, b in matchups:
                p = predict_matchup(a, b, kenpom)
                winner = a if random.random() < p else b
                winners[(round_num, a, b)] = winner
        champion_counts[winners["final"]] += 1
    return champion_counts`}
            </code>
          </pre>
        </div>
      </article>

      {/* ── Brackets — full width ── */}
      <section className="px-6 py-12 space-y-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-slate-400 text-sm font-mono mb-8">
            2026 NCAA Tournament. Scroll horizontally within each region on
            mobile.
          </p>

          {/* <Bracket
            data={actualBracketData}
            title="Actual Results"
            mode="actual"
          /> */}
        </div>

        <div className="max-w-[1400px] mx-auto">
          <Bracket
            data={v3BracketData}
            championLogo="/duke.png"
            title="v3 Model Predictions"
            mode="prediction"
          />
        </div>
      </section>

      {/* Back to narrow content */}
      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-2xl font-bold text-white">Key Predictions (v3)</h2>

        <ul className="space-y-3 text-slate-300 text-lg leading-relaxed">
          <li>
            <strong className="text-white">Champion:</strong> Duke (1) over
            Arizona (1) &mdash; 55.6% win probability in the final.
          </li>
          <li>
            <strong className="text-white">Final Four:</strong> Duke, Florida,
            Arizona, Michigan &mdash; all four 1-seeds make it in v3 as well,
            but with more upset variance along the way.
          </li>
          <li>
            <strong className="text-white">Closest game:</strong> Arizona
            (50.3%) over Michigan in the semifinal &mdash; essentially a coin
            flip.
          </li>
          <li>
            <strong className="text-white">Notable upset picks:</strong> Texas
            (11) over BYU (6), Saint Louis (9) over Georgia (8), Tennessee (6)
            over Virginia (3), and Texas Tech (5) over Alabama (4).
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-white">
          Championship Probabilities
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Top teams by probability of winning it all (v3 model, 10k
          simulations).
        </p>

        <div className="space-y-3">
          {[
            { team: "Duke", prob: 19.4 },
            { team: "Arizona", prob: 11.8 },
            { team: "Florida", prob: 9.6 },
            { team: "Michigan", prob: 8.1 },
            { team: "Houston", prob: 6.9 },
            { team: "Purdue", prob: 5.2 },
            { team: "Iowa St.", prob: 4.8 },
            { team: "Connecticut", prob: 3.4 },
          ].map((t) => (
            <div key={t.team} className="flex items-center gap-3">
              <span className="text-sm font-mono text-slate-300 w-28 shrink-0">
                {t.team}
              </span>
              <div className="flex-1 bg-slate-800 rounded-full h-5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(t.prob / 19.4) * 100}%` }}>
                  <span className="text-[10px] font-mono text-white">
                    {t.prob}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg text-slate-300 leading-relaxed">
          The v3 upset detection model picks more upsets along the way &mdash;
          like Texas over BYU and Tennessee over Virginia &mdash; but still
          lands on an all-1-seed Final Four. The historical seed priors add
          variance in early rounds without dramatically reshaping the deep
          bracket, where efficiency advantages compound.
        </p>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            {new Date().getFullYear()}. Built by Patrick Melan.
          </p>
        </div>
      </footer>
    </div>
  );
}
