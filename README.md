**# 🔍 ThreatIntel — Threat Intelligence Lookup Tool**

> A modern web-based threat intelligence platform to analyze IP addresses, domains, and file hashes using multiple security data sources.

---

**## 🚀 Overview**

ThreatIntel is designed to assist SOC Analysts, Threat Hunters, and Security Engineers in quickly validating Indicators of Compromise (IOCs).

It aggregates threat intelligence from multiple sources and presents a unified, easy-to-understand risk analysis with downloadable reports.

---

## ✨ Features

- 🔎 **Multi-IOC Analysis**
  - IP Address
  - Domain Name
  - File Hash (MD5, SHA1, SHA256)

- 🌐 **Threat Intelligence Aggregation**
  - VirusTotal
  - AbuseIPDB
  - AlienVault OTX

- 📊 **Smart Risk Scoring**
  - Automatically classifies as:
    - 🟢 Safe
    - 🟡 Suspicious
    - 🔴 Malicious

- 🌍 **Geolocation Detection**
  - Identifies country of origin for IPs

- 📄 **Downloadable PDF Reports**
  
  - Generates a structured investigation report
  - Useful for SOC documentation

- ⚡ **Fast & Lightweight**
  - No login required
  - Instant analysis

---

**## 🧠 Use Case**

This tool is useful for:

- SOC Analysts validating alerts
- Threat hunters investigating suspicious indicators
- Incident responders during triage
- Security enthusiasts learning threat intelligence

---

**## 🛠️ Tech Stack**

- **Frontend:** Next.js (React)
- **Styling:** Tailwind CSS
- **APIs:**
  - VirusTotal API
  - AbuseIPDB API
  - AlienVault OTX API
- **PDF Generation:** jsPDF (client-side)

---

**## ⚙️ Setup & Installation**

Install dependencies: 
npm install

Add API Keys: 
Create a .env.local file in root:

VT_API_KEY=your_key_here
ABUSEIPDB_API_KEY=your_key_here
OTX_API_KEY=your_key_here

Run the project:
npm run dev

Open:
http://localhost:3000

**🌐 Live Demo**
https://threat-intel-pro.vercel.app/

**Screenshots:**
<img width="1898" height="904" alt="image" src="https://github.com/user-attachments/assets/546ac8c3-df96-41e8-9860-4018016735d8" />

<img width="1902" height="890" alt="image" src="https://github.com/user-attachments/assets/dd86bf5f-3d55-4c5a-b447-27c7c5ba6571" />

**👨‍💻 Author**

Jayesh Maurya
Cyber Security Engineer

⭐ Support

If you found this useful:

👉 Star the repository
👉 Share with others in cybersecurity
