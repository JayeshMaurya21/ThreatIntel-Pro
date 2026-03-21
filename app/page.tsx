"use client";
import { useState } from "react";
import Image from "next/image";

type AnalysisResult = {
  score: number;
  status: "Safe" | "Suspicious" | "Malicious";
  country: string;
  type: string;
  sources?: {
    vtMalicious: number;
    abuseScore: number;
    otxPulses: number;
  };
};

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">

      {/* 🔝 NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 border-b border-gray-700 sticky top-0 bg-black/70 backdrop-blur">
        <div className="flex items-center gap-2">
  <Image src="/logo.png" alt="logo" width={32} height={32} />
  <h1 className="text-xl font-bold">ThreatIntel</h1>
</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-green-400">Home</a>
          <a href="#about" className="hover:text-green-400">About</a>
        </div>
      </nav>

      {/* 🧠 HERO / MAIN */}
      <div className="p-10 max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Threat Intelligence Lookup
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Analyze IPs, Domains & Hashes instantly using multi-source intelligence
        </p>

        {/* 🔍 INPUT */}
        <div className="flex gap-4">
          <input
            className="p-4 w-full bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-green-500"
            placeholder="Enter IP, Domain, or Hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={analyze}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
          >
            Analyze
          </button>
        </div>

        {loading && (
          <p className="mt-4 text-center animate-pulse">
            🔄 Analyzing threat intelligence...
          </p>
        )}

        {/* 📊 RESULT CARD */}
        {result && (
          <div className="mt-8 bg-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">

            {/* STATUS */}
            <div className="mb-4">
              <p className="text-lg font-semibold">Threat Status</p>

              <div
                className={`mt-2 px-4 py-2 rounded-xl inline-block font-bold text-white
                ${
                  result.status === "Safe"
                    ? "bg-green-600"
                    : result.status === "Suspicious"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {result.status === "Safe" && "🟢 SAFE"}
                {result.status === "Suspicious" && "🟡 SUSPICIOUS"}
                {result.status === "Malicious" && "🔴 MALICIOUS"}
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p>🔍 Score: {result.score}</p>
              <p>🌍 Country: {result.country}</p>
              <p>📌 Type: {result.type}</p>
            </div>

            {/* SOURCES */}
            <div className="mt-6">
              <p className="font-semibold mb-2">🔎 Threat Sources</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  VT: {result.sources?.vtMalicious}
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  AbuseIPDB: {result.sources?.abuseScore}
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  OTX: {result.sources?.otxPulses}
                </div>
              </div>
            </div>

            {/* PDF */}
            <button
              onClick={() => {
                fetch("/api/pdf", {
                  method: "POST",
                  body: JSON.stringify(result),
                })
                  .then((res) => res.blob())
                  .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    window.open(url);
                  });
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
            >
              📄 Download Report
            </button>

          </div>
        )}
      </div>

      {/* 📘 ABOUT SECTION */}
      <div id="about" className="bg-gray-900 py-16 px-10 mt-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold mb-4">About SentinelScope</h2>
            <p className="text-gray-400">
              ThreatIntel is a real-time threat intelligence platform designed
              for SOC analysts and cybersecurity professionals. It aggregates
              data from multiple sources like VirusTotal, AbuseIPDB, and OTX to
              provide fast and accurate IOC analysis.
            </p>

            <p className="text-gray-400 mt-4">
              This tool helps reduce investigation time by combining multiple
              intelligence feeds into a single unified view.
            </p>
          </div>

          {/* IMAGE / LOGO */}
         <div className="flex justify-center">
  <div className="p-4 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
    <Image
      src="/logo.png"
      alt="ThreatIntel Logo"
      width={256}
      height={256}
      priority
      className="object-contain"
    />
  </div>
</div>

        </div>
      </div>

      {/* 🔻 FOOTER */}
      <footer className="bg-black py-6 text-center text-gray-500 border-t border-gray-800">
        © 2026 threatintel | Built for Cybersecurity Analysts
      </footer>

    </div>
  );
}