import { NextResponse } from "next/server";

function detectType(input: string) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const hashRegex = /^[a-fA-F0-9]{32,64}$/;

  if (ipRegex.test(input)) return "ip";
  if (hashRegex.test(input)) return "hash";
  return "domain";
}

export async function POST(req: Request) {
  const { input } = await req.json();

  try {
    const type = detectType(input);

    let vtUrl = "";

    if (type === "ip") {
      vtUrl = `https://www.virustotal.com/api/v3/ip_addresses/${input}`;
    } else if (type === "hash") {
      vtUrl = `https://www.virustotal.com/api/v3/files/${input}`;
    } else {
      vtUrl = `https://www.virustotal.com/api/v3/domains/${input}`;
    }

    // 🔹 VIRUSTOTAL
    const vtRes = await fetch(vtUrl, {
      headers: {
        "x-apikey": process.env.VT_API_KEY || "",
      },
    });
    const vtData = await vtRes.json();

    const vtMalicious =
      vtData?.data?.attributes?.last_analysis_stats?.malicious || 0;

    // 🔹 ABUSEIPDB (only for IP)
    let abuseScore = 0;

    if (type === "ip") {
      const abuseRes = await fetch(
        `https://api.abuseipdb.com/api/v2/check?ipAddress=${input}`,
        {
          headers: {
            Key: process.env.ABUSEIPDB_API_KEY || "",
            Accept: "application/json",
          },
        }
      );

      const abuseData = await abuseRes.json();
      abuseScore =
        abuseData?.data?.abuseConfidenceScore || 0;
    }

    // 🔹 OTX (IP + domain)
    let otxPulses = 0;

    if (type !== "hash") {
      const otxRes = await fetch(
        `https://otx.alienvault.com/api/v1/indicators/${type}/${input}/general`,
        {
          headers: {
            "X-OTX-API-KEY": process.env.OTX_API_KEY || "",
          },
        }
      );

      const otxData = await otxRes.json();
      otxPulses =
        otxData?.pulse_info?.count || 0;
    }

    // 🔥 FINAL SCORING
    const score =
      vtMalicious * 5 +
      abuseScore * 0.3 +
      otxPulses * 2;

    let status: "Safe" | "Suspicious" | "Malicious" = "Safe";
    if (score > 30) status = "Suspicious";
    if (score > 70) status = "Malicious";

    const country =
      vtData?.data?.attributes?.country || "Unknown";

    return NextResponse.json({
      score: Math.round(score),
      status,
      country,
      type,
      sources: {
        vtMalicious,
        abuseScore,
        otxPulses,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to analyze" });
  }
}