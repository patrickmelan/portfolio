"use client";

import { useState, useMemo } from "react";

interface PredictionResult {
  prediction: string;
  delay_probability: number;
  confidence: number;
  flight_info: {
    carrier: string;
    route: string;
    departure: string;
    day_of_week: string;
  };
  weather: {
    origin: WeatherData;
    destination: WeatherData;
  };
}

interface WeatherData {
  airport: string;
  temp_f: number;
  wind_mph: number;
  precipitation: number;
  visibility_miles: number;
}

const AIRPORTS = [
  { code: "ATL", name: "Atlanta" },
  { code: "ORD", name: "Chicago O'Hare" },
  { code: "DFW", name: "Dallas/Fort Worth" },
  { code: "DEN", name: "Denver" },
  { code: "LAX", name: "Los Angeles" },
  { code: "PHX", name: "Phoenix" },
  { code: "LAS", name: "Las Vegas" },
  { code: "CLT", name: "Charlotte" },
  { code: "MIA", name: "Miami" },
  { code: "SEA", name: "Seattle" },
  { code: "EWR", name: "Newark" },
  { code: "SFO", name: "San Francisco" },
  { code: "JFK", name: "New York JFK" },
  { code: "LGA", name: "New York LaGuardia" },
  { code: "MCO", name: "Orlando" },
  { code: "BOS", name: "Boston" },
  { code: "DCA", name: "Washington Reagan" },
  { code: "DTW", name: "Detroit" },
  { code: "SLC", name: "Salt Lake City" },
  { code: "MSP", name: "Minneapolis" },
  { code: "IAH", name: "Houston" },
  { code: "FLL", name: "Fort Lauderdale" },
  { code: "BNA", name: "Nashville" },
  { code: "BWI", name: "Baltimore" },
  { code: "SAN", name: "San Diego" },
  { code: "PHL", name: "Philadelphia" },
  { code: "TPA", name: "Tampa" },
  { code: "AUS", name: "Austin" },
];

const CARRIERS = [
  { code: "AA", name: "American Airlines" },
  { code: "DL", name: "Delta" },
  { code: "UA", name: "United" },
  { code: "WN", name: "Southwest" },
  { code: "B6", name: "JetBlue" },
  { code: "AS", name: "Alaska" },
  { code: "NK", name: "Spirit" },
  { code: "F9", name: "Frontier" },
];

function AirportInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = useMemo(() => {
    if (!value) return AIRPORTS;
    const search = value.toUpperCase();
    return AIRPORTS.filter(
      (a) => a.code.includes(search) || a.name.toUpperCase().includes(search)
    );
  }, [value]);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2 text-gray-300">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-[#1a2332] border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
      />
      {showDropdown && filtered.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#0f1419] border-2 border-gray-700 rounded-lg max-h-48 overflow-y-auto">
          {filtered.map((airport) => (
            <div
              key={airport.code}
              onClick={() => {
                onChange(airport.code);
                setShowDropdown(false);
              }}
              className="px-4 py-2 hover:bg-[#1a2332] cursor-pointer text-white"
            >
              <span className="font-semibold text-cyan-400">
                {airport.code}
              </span>
              <span className="text-gray-400 ml-2">- {airport.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FlightDelayPredictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");

  const [carrier, setCarrier] = useState("");
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [distance, setDistance] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const data = {
      carrier,
      origin,
      dest,
      flight_date: flightDate,
      dep_time: depTime,
      arr_time: arrTime,
      distance: parseInt(distance),
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0f1419] rounded-2xl border-2 border-gray-800 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-white">Flight Delay </span>
              <span className="text-cyan-400">Predictor</span>
            </h1>
            <p className="text-gray-400">
              ML model trained on 200K+ flights with real-time weather • 73.1%
              ROC-AUC
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Carrier & Distance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Airline
                </label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#1a2332] border-2 border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select airline</option>
                  {CARRIERS.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Distance (miles)
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="e.g., 2475"
                  required
                  className="w-full px-4 py-2 bg-[#1a2332] border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AirportInput
                label="From"
                value={origin}
                onChange={setOrigin}
                placeholder="Type airport code or city"
              />
              <AirportInput
                label="To"
                value={dest}
                onChange={setDest}
                placeholder="Type airport code or city"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Flight Date
              </label>
              <input
                type="date"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#1a2332] border-2 border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Departure Time
                </label>
                <input
                  type="time"
                  value={depTime}
                  onChange={(e) => setDepTime(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#1a2332] border-2 border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Arrival Time
                </label>
                <input
                  type="time"
                  value={arrTime}
                  onChange={(e) => setArrTime(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#1a2332] border-2 border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Predicting...
                </span>
              ) : (
                "Predict Delay"
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-900/30 border-2 border-red-700 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div
              className={`mt-8 p-6 rounded-lg border-2 ${
                result.prediction === "Delayed"
                  ? "bg-red-900/20 border-red-700"
                  : "bg-green-900/20 border-green-700"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-2 ${
                  result.prediction === "Delayed"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {result.prediction}
              </h2>
              <div className="text-6xl font-bold my-4 text-white">
                {result.delay_probability}%
              </div>
              <p className="text-gray-400 mb-6">
                {result.confidence}% confidence •{" "}
                {result.flight_info.day_of_week}
              </p>

              {/* Weather Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a2332] p-5 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-cyan-400 mb-3">
                    {result.weather.origin.airport} Weather
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="font-semibold text-white">
                        {result.weather.origin.temp_f}°F
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span className="font-semibold text-white">
                        {result.weather.origin.wind_mph} mph
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precipitation:</span>
                      <span className="font-semibold text-white">
                        {result.weather.origin.precipitation}"
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visibility:</span>
                      <span className="font-semibold text-white">
                        {result.weather.origin.visibility_miles} mi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a2332] p-5 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-cyan-400 mb-3">
                    {result.weather.destination.airport} Weather
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="font-semibold text-white">
                        {result.weather.destination.temp_f}°F
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span className="font-semibold text-white">
                        {result.weather.destination.wind_mph} mph
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precipitation:</span>
                      <span className="font-semibold text-white">
                        {result.weather.destination.precipitation}"
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visibility:</span>
                      <span className="font-semibold text-white">
                        {result.weather.destination.visibility_miles} mi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
