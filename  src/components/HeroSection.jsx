// components/HeroSection.jsx
"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const TAGLINES = [
  "Healthcare Clarity Starts Here.",
  "Smarter Choices. Healthier Outcomes. Total Transparency.",
  "Empowering Patients, Transforming Healthcare.",
  "See Clearly. Choose Confidently. Save More.",
  "Pellucid: The Future of Transparent Care Decisions.",
];

export default function HeroSection() {
  const [tagline, setTagline] = useState(TAGLINES[0]);
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-16 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-b-3xl shadow-md mb-12">
      <h1 className="text-5xl font-extrabold text-cyan-900 mb-3 tracking-tight drop-shadow">
        Pellucid Health
      </h1>
      <p className="text-2xl text-cyan-800 font-semibold mb-6 animate-fade-in">{tagline}</p>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {TAGLINES.map((t, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-full border text-xs font-medium ${
              tagline === t
                ? "bg-cyan-700 text-white border-cyan-700"
                : "bg-white text-cyan-700 border-cyan-200 hover:bg-cyan-100"
            }`}
            onClick={() => setTagline(t)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <form
        action="/search"
        method="get"
        className="flex gap-3 items-center bg-white p-6 rounded-2xl shadow-lg border w-full max-w-2xl mx-auto"
      >
        <input
          name="procedure"
          required
          placeholder="Procedure (e.g. MRI, CT scan, colonoscopy)"
          className="flex-1 border rounded p-3 focus:outline-none"
        />
        <input
          name="zip"
          required
          placeholder="ZIP Code"
          className="w-36 border rounded p-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-700 text-white hover:bg-cyan-900 px-7 py-3 rounded-xl font-bold flex items-center"
        >
          <Sparkles className="mr-2" /> Search
        </button>
      </form>
    </section>
  );
}
