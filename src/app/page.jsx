"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExcelExport from "@/components/ExcelExport";
import { generateAIInsights } from "@/lib/ai-recommend";
import TelehealthReferralModal from "@/components/TelehealthReferralModal";
import jsPDF from "jspdf";
import { useSession, signIn } from "next-auth/react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  FileDown,
  Lock,
  ArrowRight,
} from "lucide-react";

const hospitals = {
  "78701": [
    {
      name: "Austin General Hospital",
      price: "$1,200",
      rating: 4.3,
      distance: "2.1 miles",
      insurance: "Accepted",
    },
    {
      name: "Downtown Medical",
      price: "$1,050",
      rating: 4.5,
      distance: "3.2 miles",
      insurance: "Accepted",
    },
  ],
};

const mockClaims = [
  { code: "99213", status: "Denied", risk: 85 },
  { code: "99214", status: "Approved", risk: 20 },
  { code: "00100", status: "Denied", risk: 70 },
  { code: "99395", status: "Approved", risk: 15 },
];

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [form, setForm] = useState({ procedure: "", zip: "" });
  const [claimCode, setClaimCode] = useState("");
  const [claimRisk, setClaimRisk] = useState(null);
  const [insuranceStatus, setInsuranceStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (!session) { signIn(); return null; }
  
  // Favorites & Comparison
  const [favorites, setFavorites] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const chartRef = useRef(null);

  useEffect(() => {
    if (showDashboard && chartRef.current) {
      chartRef.current.style.width = "100%";
      chartRef.current.style.height = "300px";
    }
  }, [showDashboard]);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => setUserProfile(data))
      .catch(err => console.error("Failed to fetch profile", err));
  }, []);

  const handleLogin = () => {
    if (user.username && user.password) setLoggedIn(true);
  };

  const search = () => {
    setResults(hospitals[form.zip] || []);
    setInsuranceStatus(null);
  };

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

  const exportPDF = () => {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 10;
    let y = 20;

    doc.setFontSize(18);
    doc.text("Pellucid Health", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(14);
    doc.text("Search Results Summary", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text("Hospital", margin, y);
    doc.text("Price", 80, y);
    doc.text("Insurance", 110, y);
    doc.text("Distance", 160, y);
    y += lineHeight;

    doc.setFont(undefined, 'normal');
    results.forEach((hospital) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(hospital.name, margin, y);
      doc.text(hospital.price, 80, y);
      doc.text(hospital.insurance, 110, y);
      doc.text(hospital.distance, 160, y);
      y += lineHeight;
    });

    doc.save("pellucid-health-results.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
      {/* ---- Hero Section ---- */}
      <div className="flex flex-col items-center justify-center py-14 px-6">
        <Image src="/pellucid-logo.png" alt="Logo" width={60} height={60} className="mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-900 mb-3 text-center tracking-tight">
          Pellucid Health
        </h1>
        <p className="text-lg md:text-xl text-cyan-700 mb-8 text-center max-w-2xl">
          See real hospital prices. Compare costs. Make smarter healthcare decisions.
          <br />
          <span className="font-semibold text-cyan-800">Transparent. Personalized. Easy.</span>
        </p>
        {!loggedIn && (
          <Button
            size="lg"
            className="bg-cyan-700 text-white hover:bg-cyan-900 px-8 py-3 text-lg rounded-2xl shadow-md flex items-center gap-2 mb-10"
            onClick={() => setLoggedIn(true)}
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* ---- Trust / How It Works ---- */}
      {!loggedIn && (
        <section className="py-8 bg-white border-t border-cyan-100">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-900 text-center mb-8">How Pellucid Works</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 px-4">
            <Card className="flex flex-col items-center p-8 rounded-2xl shadow hover:shadow-lg transition">
              <Sparkles className="text-cyan-600 mb-3" size={36} />
              <div className="font-semibold text-cyan-900 mb-2">Search Hospitals</div>
              <div className="text-sm text-gray-700 text-center">Find pricing data for any hospital in your area. No hidden fees, no confusion—just answers.</div>
            </Card>
            <Card className="flex flex-col items-center p-8 rounded-2xl shadow hover:shadow-lg transition">
              <ShieldCheck className="text-cyan-600 mb-3" size={36} />
              <div className="font-semibold text-cyan-900 mb-2">Personalize Your Care</div>
              <div className="text-sm text-gray-700 text-center">Upload insurance, compare options, and see recommendations based on your actual coverage.</div>
            </Card>
            <Card className="flex flex-col items-center p-8 rounded-2xl shadow hover:shadow-lg transition">
              <Lock className="text-cyan-600 mb-3" size={36} />
              <div className="font-semibold text-cyan-900 mb-2">Secure & Compliant</div>
              <div className="text-sm text-gray-700 text-center">HIPAA compliant, bank-grade security, and never any data sold or shared.</div>
            </Card>
          </div>
        </section>
      )}

      {/* ---- Main App Experience ---- */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        {loggedIn ? (
          <>
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Input placeholder="Procedure" value={form.procedure} onChange={e => setForm({ ...form, procedure: e.target.value })} />
              <Input placeholder="Zip Code" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} />
              <Button className="bg-primary text-white hover:bg-blue-700" onClick={search}>
                <Search className="mr-2" /> Search
              </Button>
            </div>

            {Array.isArray(results) && results.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {results.map((r, i) => (
                  <Card key={i} className="p-5 border border-gray-200 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-accent">{r.name}</h2>
                    <p className="text-gray-700">
                      {r.price} — {r.rating}⭐ — {r.distance}
                    </p>
                    <p className="text-sm text-gray-500">Insurance: {r.insurance}</p>
                    <p className="text-green-600 text-sm mt-2">
                      <Sparkles className="inline h-4 w-4 mr-1" /> {generateAIInsights(r, userProfile)}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3"
                      onClick={() => setInsuranceStatus("Eligible with Aetna, BCBS, UHC")}
                    >
                      Check Insurance
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedHospital(r);
                        setShowReferralModal(true);
                      }}
                      className="mt-2 bg-cyan-700 hover:bg-cyan-900 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-1" /> Request Telehealth
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (!favorites.some(fav => fav.name === r.name)) {
                          setFavorites([...favorites, r]);
                        }
                      }}
                      className="mt-2"
                    >
                      ❤️ Favorite
                    </Button>
                    {insuranceStatus && (
                      <p className="text-blue-600 text-sm mt-2">{insuranceStatus}</p>
                    )}
                  </Card>
                ))}

                <Button
                  onClick={exportPDF}
                  className="col-span-full mt-4 bg-primary text-white hover:bg-blue-700"
                >
                  <FileDown className="mr-2" /> Export PDF
                </Button>
              </div>
            )}

            {/* Compare Favorites Button */}
            {favorites.length > 1 && (
              <Button
                className="mt-4 bg-green-600 hover:bg-green-800 text-white"
                onClick={() => setShowCompare(!showCompare)}
              >
                {showCompare ? "Hide" : "Compare Favorites"} ({favorites.length})
              </Button>
            )}

            {/* Comparison View */}
            {showCompare && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Comparison View</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {favorites.map((f, i) => (
                    <Card key={i} className="p-5 border border-cyan-200 rounded-lg bg-cyan-50">
                      <h4 className="text-lg font-bold">{f.name}</h4>
                      <p className="text-sm text-gray-700">
                        <strong>Price:</strong> {f.price}<br />
                        <strong>Rating:</strong> {f.rating}⭐<br />
                        <strong>Distance:</strong> {f.distance}<br />
                        <strong>Insurance:</strong> {f.insurance}<br />
                        <strong>Insights:</strong> {generateAIInsights(f, userProfile)}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={() =>
                          setFavorites(favorites.filter((h) => h.name !== f.name))
                        }
                      >
                        Remove
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12">
              <h2 className="text-xl font-bold text-accent">OSAI: Claim Risk</h2>
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
              <Button className="mt-4 bg-primary text-white hover:bg-blue-700" onClick={() => setShowDashboard(true)}>View Dashboard</Button>
            </div>

            {showDashboard && (
              <div className="mt-8" ref={chartRef} style={{ width: "100%", height: "300px" }}>
                <h3 className="text-lg font-semibold mb-2">Claim History</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockClaims} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="code" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="risk" fill="#1F7AEC" />
                  </BarChart>
                </ResponsiveContainer>
                <Button className="mt-2" onClick={() => setShowDashboard(false)}>Back</Button>
              </div>
            )}

            {showReferralModal && selectedHospital && (
              <TelehealthReferralModal
                open={showReferralModal}
                onClose={() => setShowReferralModal(false)}
                hospital={selectedHospital}
              />
            )}
          </>
        ) : (
          // Show login UI when not logged in
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
            <Input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
            <Button className="bg-primary text-white hover:bg-blue-700" onClick={handleLogin}>
              <ShieldCheck className="mr-2" /> Login
            </Button>
          </div>
        )}
      </div>

      {/* ---- Footer ---- */}
      <footer className="py-8 bg-cyan-50 border-t border-cyan-100 mt-auto">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-cyan-600" size={22} />
            <span className="text-sm text-cyan-800">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="text-cyan-600" size={22} />
            <span className="text-sm text-cyan-800">AI-Powered Insights</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="text-cyan-600" size={22} />
            <span className="text-sm text-cyan-800">Bank-Grade Security</span>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-cyan-700">
          &copy; {new Date().getFullYear()} Pellucid Health. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

