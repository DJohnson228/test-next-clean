"use client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Search, Sparkles } from "lucide-react";

export default function SearchResults({ hospitals, user }) {
  // Prefill fields from user profile
  const [procedure, setProcedure] = useState(user?.lastProcedure || "");
  const [zip, setZip] = useState(user?.zipCode || "");
  const [insurance, setInsurance] = useState(user?.insurance || "");

  useEffect(() => {
    if (user) {
      setZip(user.zipCode || "");
      setInsurance(user.insurance || "");
      // ... add other fields as needed
    }
  }, [user]);

  // ...rest of your logic (results, search, etc.)

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Procedure (e.g. MRI)"
          value={procedure}
          onChange={e => setProcedure(e.target.value)}
        />
        <Input
          placeholder="ZIP Code"
          value={zip}
          onChange={e => setZip(e.target.value)}
        />
        <Input
          placeholder="Insurance"
          value={insurance}
          onChange={e => setInsurance(e.target.value)}
        />
        <Button>
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
      {/* ...your existing results display... */}
    </div>
  );
}
