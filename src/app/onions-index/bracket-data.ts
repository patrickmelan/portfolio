export type Team = {
  name: string;
  seed: number;
};

export type Matchup = {
  team1: Team;
  team2: Team;
  predicted: string;
  actual?: string;
  probability?: number;
  upset?: boolean;
};

export type Region = {
  name: string;
  rounds: Matchup[][];
};

export type BracketData = {
  regions: Region[];
  finalFour: Matchup[];
  championship: Matchup;
};

export const roundNames = ["Round of 64", "Round of 32", "Sweet 16", "Elite 8"];

// ============================================================
//  v3 BRACKET — Upset Detection Model
// ============================================================
export const v3BracketData: BracketData = {
  regions: [
    {
      name: "East",
      rounds: [
        // R64
        [
          { team1: { name: "Duke", seed: 1 }, team2: { name: "Siena", seed: 16 }, predicted: "Duke", probability: 99.9 },
          { team1: { name: "Ohio St.", seed: 8 }, team2: { name: "TCU", seed: 9 }, predicted: "Ohio St.", probability: 65.7 },
          { team1: { name: "St. John's", seed: 5 }, team2: { name: "Northern Iowa", seed: 12 }, predicted: "St. John's", probability: 84.7 },
          { team1: { name: "Kansas", seed: 4 }, team2: { name: "Cal Baptist", seed: 13 }, predicted: "Kansas", probability: 90.1 },
          { team1: { name: "Louisville", seed: 6 }, team2: { name: "South Florida", seed: 11 }, predicted: "Louisville", probability: 84.7 },
          { team1: { name: "Michigan St.", seed: 3 }, team2: { name: "North Dakota St.", seed: 14 }, predicted: "Michigan St.", probability: 98.8 },
          { team1: { name: "UCLA", seed: 7 }, team2: { name: "UCF", seed: 10 }, predicted: "UCLA", probability: 72.9 },
          { team1: { name: "Connecticut", seed: 2 }, team2: { name: "Furman", seed: 15 }, predicted: "Connecticut", probability: 99.3 },
        ],
        // R32
        [
          { team1: { name: "Duke", seed: 1 }, team2: { name: "Ohio St.", seed: 8 }, predicted: "Duke", probability: 93.3 },
          { team1: { name: "St. John's", seed: 5 }, team2: { name: "Kansas", seed: 4 }, predicted: "St. John's", probability: 55.0, upset: true },
          { team1: { name: "Michigan St.", seed: 3 }, team2: { name: "Louisville", seed: 6 }, predicted: "Michigan St.", probability: 63.1 },
          { team1: { name: "Connecticut", seed: 2 }, team2: { name: "UCLA", seed: 7 }, predicted: "Connecticut", probability: 72.5 },
        ],
        // S16
        [
          { team1: { name: "Duke", seed: 1 }, team2: { name: "St. John's", seed: 5 }, predicted: "Duke", probability: 88.7 },
          { team1: { name: "Michigan St.", seed: 3 }, team2: { name: "Connecticut", seed: 2 }, predicted: "Michigan St.", probability: 51.9, upset: true },
        ],
        // E8
        [
          { team1: { name: "Duke", seed: 1 }, team2: { name: "Michigan St.", seed: 3 }, predicted: "Duke", probability: 87.1 },
        ],
      ],
    },
    {
      name: "West",
      rounds: [
        // R64
        [
          { team1: { name: "Arizona", seed: 1 }, team2: { name: "LIU", seed: 16 }, predicted: "Arizona", probability: 99.9 },
          { team1: { name: "Villanova", seed: 8 }, team2: { name: "Utah St.", seed: 9 }, predicted: "Utah St.", probability: 53.9, upset: true },
          { team1: { name: "Wisconsin", seed: 5 }, team2: { name: "High Point", seed: 12 }, predicted: "Wisconsin", probability: 89.6 },
          { team1: { name: "Arkansas", seed: 4 }, team2: { name: "Hawaii", seed: 13 }, predicted: "Arkansas", probability: 90.6 },
          { team1: { name: "BYU", seed: 6 }, team2: { name: "Texas", seed: 11 }, predicted: "Texas", probability: 37.4, upset: true },
          { team1: { name: "Gonzaga", seed: 3 }, team2: { name: "Kennesaw St.", seed: 14 }, predicted: "Gonzaga", probability: 99.4 },
          { team1: { name: "Miami FL", seed: 7 }, team2: { name: "Missouri", seed: 10 }, predicted: "Miami FL", probability: 72.7 },
          { team1: { name: "Purdue", seed: 2 }, team2: { name: "Queens", seed: 15 }, predicted: "Purdue", probability: 96.8 },
        ],
        // R32
        [
          { team1: { name: "Arizona", seed: 1 }, team2: { name: "Utah St.", seed: 9 }, predicted: "Arizona", probability: 95.4 },
          { team1: { name: "Arkansas", seed: 4 }, team2: { name: "Wisconsin", seed: 5 }, predicted: "Arkansas", probability: 58.5 },
          { team1: { name: "Gonzaga", seed: 3 }, team2: { name: "Texas", seed: 11 }, predicted: "Gonzaga", probability: 76.9 },
          { team1: { name: "Purdue", seed: 2 }, team2: { name: "Miami FL", seed: 7 }, predicted: "Purdue", probability: 81.1 },
        ],
        // S16
        [
          { team1: { name: "Arizona", seed: 1 }, team2: { name: "Arkansas", seed: 4 }, predicted: "Arizona", probability: 84.6 },
          { team1: { name: "Purdue", seed: 2 }, team2: { name: "Gonzaga", seed: 3 }, predicted: "Purdue", probability: 59.8 },
        ],
        // E8
        [
          { team1: { name: "Arizona", seed: 1 }, team2: { name: "Purdue", seed: 2 }, predicted: "Arizona", probability: 70.5 },
        ],
      ],
    },
    {
      name: "South",
      rounds: [
        // R64
        [
          { team1: { name: "Florida", seed: 1 }, team2: { name: "Prairie View A&M", seed: 16 }, predicted: "Florida", probability: 99.9},
          { team1: { name: "Clemson", seed: 8 }, team2: { name: "Iowa", seed: 9 }, predicted: "Iowa", probability: 63.3, upset: true },
          { team1: { name: "Vanderbilt", seed: 5 }, team2: { name: "McNeese", seed: 12 }, predicted: "Vanderbilt", probability: 91.1 },
          { team1: { name: "Nebraska", seed: 4 }, team2: { name: "Troy", seed: 13 }, predicted: "Nebraska", probability: 97.8 },
          { team1: { name: "North Carolina", seed: 6 }, team2: { name: "VCU", seed: 11 }, predicted: "North Carolina", probability: 66.9 },
          { team1: { name: "Illinois", seed: 3 }, team2: { name: "Penn", seed: 14 }, predicted: "Illinois", probability: 97.9 },
          { team1: { name: "Saint Mary's", seed: 7 }, team2: { name: "Texas A&M", seed: 10 }, predicted: "Saint Mary's", probability: 70.7 },
          { team1: { name: "Houston", seed: 2 }, team2: { name: "Idaho", seed: 15 }, predicted: "Houston", probability: 99.5 },
        ],
        // R32
        [
          { team1: { name: "Florida", seed: 1 }, team2: { name: "Iowa", seed: 9 }, predicted: "Florida", probability: 90.2 },
          { team1: { name: "Vanderbilt", seed: 5 }, team2: { name: "Nebraska", seed: 4 }, predicted: "Vanderbilt", probability: 54.4, upset: true },
          { team1: { name: "Illinois", seed: 3 }, team2: { name: "North Carolina", seed: 6 }, predicted: "Illinois", probability: 83.9 },
          { team1: { name: "Houston", seed: 2 }, team2: { name: "Saint Mary's", seed: 7 }, predicted: "Houston", probability: 85.8 },
        ],
        // S16
        [
          { team1: { name: "Florida", seed: 1 }, team2: { name: "Vanderbilt", seed: 5 }, predicted: "Florida", probability: 73.3 },
          { team1: { name: "Houston", seed: 2 }, team2: { name: "Illinois", seed: 3 }, predicted: "Houston", probability: 54.5 },
        ],
        // E8
        [
          { team1: { name: "Florida", seed: 1 }, team2: { name: "Houston", seed: 2 }, predicted: "Florida", probability: 51.5 },
        ],
      ],
    },
    {
      name: "Midwest",
      rounds: [
        // R64
        [
          { team1: { name: "Michigan", seed: 1 }, team2: { name: "Howard", seed: 16 }, predicted: "Michigan", probability: 99.5 },
          { team1: { name: "Georgia", seed: 8 }, team2: { name: "Saint Louis", seed: 9 }, predicted: "Saint Louis", probability: 41.5, upset: true },
          { team1: { name: "Texas Tech", seed: 5 }, team2: { name: "Akron", seed: 12 }, predicted: "Texas Tech", probability: 87.9 },
          { team1: { name: "Alabama", seed: 4 }, team2: { name: "Hofstra", seed: 13 }, predicted: "Alabama", probability: 90.9 },
          { team1: { name: "Tennessee", seed: 6 }, team2: { name: "Miami OH", seed: 11 }, predicted: "Tennessee", probability: 94.4 },
          { team1: { name: "Virginia", seed: 3 }, team2: { name: "Wright St.", seed: 14 }, predicted: "Virginia", probability: 99.2 },
          { team1: { name: "Kentucky", seed: 7 }, team2: { name: "Santa Clara", seed: 10 }, predicted: "Kentucky", probability: 58.4 },
          { team1: { name: "Iowa St.", seed: 2 }, team2: { name: "Tennessee St.", seed: 15 }, predicted: "Iowa St.", probability: 99.8 },
        ],
        // R32
        [
          { team1: { name: "Michigan", seed: 1 }, team2: { name: "Saint Louis", seed: 9 }, predicted: "Michigan", probability: 97.2 },
          { team1: { name: "Alabama", seed: 4 }, team2: { name: "Texas Tech", seed: 5 }, predicted: "Texas Tech", probability: 48.4, upset: true },
          { team1: { name: "Virginia", seed: 3 }, team2: { name: "Tennessee", seed: 6 }, predicted: "Tennessee", probability: 46.9, upset: true },
          { team1: { name: "Iowa St.", seed: 2 }, team2: { name: "Kentucky", seed: 7 }, predicted: "Iowa St.", probability: 87.7 },
        ],
        // S16
        [
          { team1: { name: "Michigan", seed: 1 }, team2: { name: "Texas Tech", seed: 5 }, predicted: "Michigan", probability: 87.7 },
          { team1: { name: "Iowa St.", seed: 2 }, team2: { name: "Tennessee", seed: 6 }, predicted: "Iowa St.", probability: 73.4 },
        ],
        // E8
        [
          { team1: { name: "Michigan", seed: 1 }, team2: { name: "Iowa St.", seed: 2 }, predicted: "Michigan", probability: 69.1 },
        ],
      ],
    },
  ],
  finalFour: [
    { team1: { name: "Duke", seed: 1 }, team2: { name: "Florida", seed: 1 }, predicted: "Duke", probability: 71.1 },
    { team1: { name: "Arizona", seed: 1 }, team2: { name: "Michigan", seed: 1 }, predicted: "Arizona", probability: 50.3 },
  ],
  championship: {
    team1: { name: "Duke", seed: 1 },
    team2: { name: "Arizona", seed: 1 },
    predicted: "Duke",
    probability: 55.6,
  },
};

// ============================================================
//  ACTUAL BRACKET — Fill in results as games are played
// ============================================================
export const actualBracketData: BracketData = {
  regions: [
    {
      name: "East",
      rounds: [
        // R64 — fill in actual: "Winner" as games finish
        [
          { team1: { name: "Duke", seed: 1 }, team2: { name: "Siena", seed: 16 }, predicted: "Duke", actual: "Duke" },
          { team1: { name: "Ohio St.", seed: 8 }, team2: { name: "TCU", seed: 9 }, predicted: "Ohio St.", actual: "TCU" },
          { team1: { name: "St. John's", seed: 5 }, team2: { name: "Northern Iowa", seed: 12 }, predicted: "St. John's", actual: "St. John's" },
          { team1: { name: "Kansas", seed: 4 }, team2: { name: "Cal Baptist", seed: 13 }, predicted: "Kansas", actual: "Kansas" },
          { team1: { name: "Louisville", seed: 6 }, team2: { name: "South Florida", seed: 11 }, predicted: "Louisville", actual: "Louisville" },
          { team1: { name: "Michigan St.", seed: 3 }, team2: { name: "North Dakota St.", seed: 14 }, predicted: "Michigan St.", actual: "Michigan St." },
          { team1: { name: "UCLA", seed: 7 }, team2: { name: "UCF", seed: 10 }, predicted: "UCLA", actual: "UCLA" },
          { team1: { name: "Connecticut", seed: 2 }, team2: { name: "Furman", seed: 15 }, predicted: "Connecticut", actual: "Connecticut" },
        ],
        [{ team1: { name: "Duke", seed: 1 }, team2: { name: "TCU", seed: 9 }, predicted: "Duke", actual: "Duke" },
          { team1: { name: "St. John's", seed: 5 }, team2: { name: "Kansas", seed: 4 }, predicted: "St. John's", actual: "St. John's" },
          { team1: { name: "Louisville", seed: 6 }, team2: { name: "Michigan St.", seed: 3 }, predicted: "Michigan St.", actual: "Michigan St." },
          { team1: { name: "UCLA", seed: 7 }, team2: { name: "Connecticut", seed: 2 }, predicted: "Connecticut", actual: "Connecticut" }
        ], // R32
        [{ team1: { name: "Duke", seed: 1 }, team2: { name: "St. John's", seed: 5 }, predicted: "Duke", actual: "" },
          { team1: { name: "Michigan St.", seed: 3 }, team2: { name: "Connecticut", seed: 2 }, predicted: "Michigan St.", actual: "" }
        ], // S16
        [{ team1: { name: "DUKE / SJU", seed: 0 }, team2: { name: "MST / CONN", seed: 0 }, predicted: "", actual: "" }], // E8
      ],
    },
    {
      name: "West",
      rounds: [
        [
          { team1: { name: "Arizona", seed: 1 }, team2: { name: "LIU", seed: 16 }, predicted: "Arizona", actual: "Ariaona" },
          { team1: { name: "Villanova", seed: 8 }, team2: { name: "Utah St.", seed: 9 }, predicted: "Utah St.", actual: "Utah St." },
          { team1: { name: "Wisconsin", seed: 5 }, team2: { name: "High Point", seed: 12 }, predicted: "Wisconsin", actual: "High Point" },
          { team1: { name: "Arkansas", seed: 4 }, team2: { name: "Hawaii", seed: 13 }, predicted: "Arkansas", actual: "Arkansas" },
          { team1: { name: "BYU", seed: 6 }, team2: { name: "Texas", seed: 11 }, predicted: "Texas", actual: "Texas" },
          { team1: { name: "Gonzaga", seed: 3 }, team2: { name: "Kennesaw St.", seed: 14 }, predicted: "Gonzaga", actual: "Gonzaga" },
          { team1: { name: "Miami FL", seed: 7 }, team2: { name: "Missouri", seed: 10 }, predicted: "Miami FL", actual: "Miami FL" },
          { team1: { name: "Purdue", seed: 2 }, team2: { name: "Queens", seed: 15 }, predicted: "Purdue", actual: "Purdue" },
        ],
        [{ team1: { name: "Arizona", seed: 1 }, team2: { name: "Utah St.", seed: 9 }, predicted: "Arizona", actual: "Arizona" },
          { team1: { name: "High Point", seed: 12 }, team2: { name: "Arkansas", seed: 4 }, predicted: "Arkansas", actual: "Arkansas" },
          { team1: { name: "Texas", seed: 11 }, team2: { name: "Gonzaga", seed: 3 }, predicted: "Gonzaga", actual: "Texas" },
          { team1: { name: "Miami FL", seed: 7 }, team2: { name: "Purdue", seed: 2 }, predicted: "Purdue", actual: "Purdue" }
        ],
        [{ team1: { name: "Arizona", seed: 1 }, team2: { name: "Arkansas", seed: 4 }, predicted: "Arizona", actual: "Arizona" },
          { team1: { name: "Texas", seed: 11 }, team2: { name: "Purdue", seed: 2 }, predicted: "Purdue", actual: "Purdue" }
        ],
        [{ team1: { name: "Arizona", seed: 1 }, team2: { name: "Purdue", seed: 2 }, predicted: "", actual: "" }],
      ],
    },
    {
      name: "South",
      rounds: [
        [
          { team1: { name: "Florida", seed: 1 }, team2: { name: "Prairie View A&M", seed: 16 }, predicted: "Florida", actual: "Florida" },
          { team1: { name: "Clemson", seed: 8 }, team2: { name: "Iowa", seed: 9 }, predicted: "Iowa", actual: "Iowa" },
          { team1: { name: "Vanderbilt", seed: 5 }, team2: { name: "McNeese", seed: 12 }, predicted: "Vanderbilt", actual: "Vanderbilt" },
          { team1: { name: "Nebraska", seed: 4 }, team2: { name: "Troy", seed: 13 }, predicted: "Nebraska", actual: "Nebraska" },
          { team1: { name: "North Carolina", seed: 6 }, team2: { name: "VCU", seed: 11 }, predicted: "North Carolina", actual: "VCU" },
          { team1: { name: "Illinois", seed: 3 }, team2: { name: "Penn", seed: 14 }, predicted: "Illinois", actual: "Illinois" },
          { team1: { name: "Saint Mary's", seed: 7 }, team2: { name: "Texas A&M", seed: 10 }, predicted: "Saint Mary's", actual: "Texas A&M" },
          { team1: { name: "Houston", seed: 2 }, team2: { name: "Idaho", seed: 15 }, predicted: "Houston", actual: "Houston" },
        ],
        [{ team1: { name: "Florida", seed: 1 }, team2: { name: "Iowa", seed: 9 }, predicted: "Florida", actual: "Iowa" },
          { team1: { name: "Vanderbilt", seed: 5 }, team2: { name: "Nebraska", seed: 4 }, predicted: "Vanderbilt", actual: "Nebraska" },
          { team1: { name: "VCU", seed: 11 }, team2: { name: "Illinois", seed: 3 }, predicted: "Illinois", actual: "Illinois" },
          { team1: { name: "Texas A&M", seed: 10 }, team2: { name: "Houston", seed: 2 }, predicted: "Houston", actual: "Houston" }
        ],
        [{ team1: { name: "Iowa", seed: 9 }, team2: { name: "Nebraska", seed: 4 }, predicted: "Florida", actual: "Iowa" },
          { team1: { name: "Illinois", seed: 3 }, team2: { name: "Houston", seed: 2 }, predicted: "Houston", actual: "Illinois" }
        ],
        [{ team1: { name: "Iowa", seed: 9 }, team2: { name: "Illinois", seed: 3 }, predicted: "", actual: "" }],
      ],
    },
    {
      name: "Midwest",
      rounds: [
        [
          { team1: { name: "Michigan", seed: 1 }, team2: { name: "Howard", seed: 16 }, predicted: "Michigan", actual: "Michigan" },
          { team1: { name: "Georgia", seed: 8 }, team2: { name: "Saint Louis", seed: 9 }, predicted: "Saint Louis", actual: "Saint Louis" },
          { team1: { name: "Texas Tech", seed: 5 }, team2: { name: "Akron", seed: 12 }, predicted: "Texas Tech", actual: "Texas Tech" },
          { team1: { name: "Alabama", seed: 4 }, team2: { name: "Hofstra", seed: 13 }, predicted: "Alabama", actual: "Alabama" },
          { team1: { name: "Tennessee", seed: 6 }, team2: { name: "Miami OH", seed: 11 }, predicted: "Tennessee", actual: "Tennessee" },
          { team1: { name: "Virginia", seed: 3 }, team2: { name: "Wright St.", seed: 14 }, predicted: "Virginia", actual: "Virginia" },
          { team1: { name: "Kentucky", seed: 7 }, team2: { name: "Santa Clara", seed: 10 }, predicted: "Kentucky", actual: "Kentucky" },
          { team1: { name: "Iowa St.", seed: 2 }, team2: { name: "Tennessee St.", seed: 15 }, predicted: "Iowa St.", actual: "Iowa St." },
        ],
        [{ team1: { name: "Michigan", seed: 1 }, team2: { name: "Saint Louis", seed: 9 }, predicted: "Michican", actual: "Michican" },
          { team1: { name: "Texas Tech", seed: 5 }, team2: { name: "Alabama", seed: 4 }, predicted: "Texas Tech", actual: "Alabama" },
          { team1: { name: "Tennessee", seed: 6 }, team2: { name: "Virginia", seed: 3 }, predicted: "Tennessee", actual: "Tennessee" },
          { team1: { name: "Kentucky", seed: 7 }, team2: { name: "Iowa St.", seed: 2 }, predicted: "Iowa St.", actual: "Iowa St." }
        ],
        [{ team1: { name: "Michigan", seed: 1 }, team2: { name: "Alabama", seed: 4 }, predicted: "Michigan", actual: "" },
          { team1: { name: "Tennessee", seed: 6 }, team2: { name: "Iowa St.", seed: 2 }, predicted: "Iowa St.", actual: "" }
        ],
        [{ team1: { name: "MICH / ALA", seed: 0 }, team2: { name: "TENN / ISU", seed: 0 }, predicted: "", actual: "" }],
      ],
    },
  ],
  finalFour: [],
  championship: { team1: { name: "TBD", seed: 0 }, team2: { name: "TBD", seed: 0 }, predicted: "", actual: "" },
};
