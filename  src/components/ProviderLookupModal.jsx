"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserSearch, ShieldCheck, X } from "lucide-react";

export default function ProviderLookupModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError("");
      return;
    }

    const fetchProviders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/providers/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("No providers found or API error");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err.message || "An error occurred");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(fetchProviders, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // To close popover when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (
        selectedProvider &&
        !document.getElementById("provider-popover")?.contains(e.target)
      ) {
        setSelectedProvider(null);
      }
    }
    if (selectedProvider) {
      window.addEventListener("mousedown", handleClick);
      return () => window.removeEventListener("mousedown", handleClick);
    }
  }, [selectedProvider]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <Dialog.Title className="text-lg font-bold mb-4 flex items-center">
            <UserSearch className="mr-2" /> Provider Lookup
          </Dialog.Title>
          <Input
            placeholder="Search by name or NPI"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-3 min-h-[90px] relative">
            {loading && <div className="text-cyan-700">Searching...</div>}
            {error && <div className="text-red-600">{error}</div>}
            {!loading && !error && results.map((p, i) => (
              <div
                key={i}
                className="rounded-lg border p-3 flex flex-col gap-1 bg-cyan-50 cursor-pointer relative"
                onClick={() => setSelectedProvider(p)}
              >
                <div className="font-semibold text-cyan-900">{p.name}</div>
                <div className="text-sm text-cyan-800">{p.specialty}</div>
                <div className="text-xs text-gray-500">NPI: {p.npi}</div>
                <div className="text-xs text-gray-600">Affiliation: {p.org}</div>
                <div className="text-xs text-green-700 flex items-center">
                  <ShieldCheck className="inline h-4 w-4 mr-1" />
                  {p.status}
                </div>
                {/* Popover for details */}
                {selectedProvider && selectedProvider.npi === p.npi && (
                  <ProviderDetailPopover
                    provider={selectedProvider}
                    onClose={() => setSelectedProvider(null)}
                  />
                )}
              </div>
            ))}
            {!loading && !error && results.length === 0 && query && (
              <div className="text-sm text-gray-500">No providers found.</div>
            )}
          </div>
          <Button className="mt-6 w-full" onClick={onClose}>
            Close
          </Button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// Detail Popover component
function ProviderDetailPopover({ provider, onClose }) {
  const raw = provider.raw || {};
  const address = raw.addresses?.find(addr => addr.address_purpose === "LOCATION") || raw.addresses?.[0] || {};

  return (
    <div
      id="provider-popover"
      className="absolute left-full top-0 ml-4 w-96 z-50 bg-white border rounded-2xl shadow-xl p-4 animate-fade-in"
      style={{ minWidth: "320px", maxWidth: "380px" }}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-lg">
        <X />
      </button>
      <div className="font-bold text-xl mb-1">{provider.name}</div>
      <div className="mb-2 text-cyan-800">{provider.specialty}</div>
      <div className="mb-1 text-xs text-gray-500">NPI: {provider.npi}</div>
      <div className="mb-1 text-xs text-gray-600">Org: {provider.org}</div>
      {address && (
        <div className="mb-2 text-xs text-gray-600">
          {address.address_1} {address.address_2 && <> {address.address_2}</>}<br />
          {address.city}, {address.state} {address.postal_code}
        </div>
      )}
      <div className="mb-2 text-xs text-green-700">
        Status: {provider.status}
      </div>
      <div className="mb-2">
        <div className="font-semibold text-xs">Specialties:</div>
        <ul className="list-disc ml-5 text-xs">
          {(raw.taxonomies || []).map((t, idx) => (
            <li key={idx}>
              {t.desc} {t.state && <>({t.state})</>}
              {t.primary && <span className="ml-1 text-green-700 font-bold">(Primary)</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <a
          href={`https://npiregistry.cms.hhs.gov/registry/provider-view/${provider.npi}`}
          className="text-cyan-700 underline text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on NPI Registry
        </a>
      </div>
    </div>
  );
}
