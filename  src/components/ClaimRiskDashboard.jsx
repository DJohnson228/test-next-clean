// src/components/ClaimRiskDashboard.jsx
"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockClaims = [
  { code: "99213", status: "Denied", risk: 85 },
  { code: "99214", status: "Approved", risk: 20 },
  { code: "00100", status: "Denied", risk: 70 },
  { code: "99395", status: "Approved", risk: 15 },
];

export default function ClaimRiskDashboard() {
  const [claimCode, setClaimCode] = useState("");
  const [claimRisk, setClaimRisk] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const checkRisk = () => {
    const highRiskCodes = ["99213", "99499", "00100"];
    if (claimCode.trim()) {
      setClaimRisk(
        highRiskCodes.includes(claimCode)
          ? { level: "High", reason: "Missing modifier or miscoding." }
          : { level: "Low", reason: "No issues detected." }
      );
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold">OSAI: Claim Risk</h2>
      <div className="flex gap-4 mt-4">
        <Input placeholder="Enter CPT code" value={claimCode} onChange={e => setClaimCode(e.target.value)} />
        <Button onClick={checkRisk}>Analyze</Button>
      </div>
      {claimRisk && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p><AlertTriangle className="inline text-yellow-500 mr-2" /> Risk: <strong>{claimRisk.level}</strong></p>
          <p className="text-sm text-gray-600 mt-1">{claimRisk.reason}</p>
        </div>
      )}
      <Button className="mt-4" onClick={() => setShowDashboard(true)}>View Dashboard</Button>
      {showDashboard && (
        <div className="mt-8" style={{ width: "100%", height: "300px" }}>
          <h3 className="text-lg font-semibold mb-2">Claim History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockClaims}>
              <XAxis dataKey="code" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="risk" fill="#1F7AEC" />
            </BarChart>
          </ResponsiveContainer>
          <Button className="mt-2" onClick={() => setShowDashboard(false)}>Back</Button>
        </div>
      )}
    </div>
  );
}
