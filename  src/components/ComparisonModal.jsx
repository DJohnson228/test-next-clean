// src/components/ComparisonModal.jsx
"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, Star, X } from "lucide-react";

export default function ComparisonModal({ open, onClose, hospitals, onRemove }) {
  if (!open || !hospitals.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Sparkles className="mr-2 text-yellow-400" /> Side-by-Side Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-cyan-100">
              <tr>
                <th className="p-3 text-left">Hospital</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Insurance</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Distance</th>
                <th className="p-3 text-left">AI Comment</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-semibold text-indigo-700">{h.name}</td>
                  <td className="p-3">{h.price}</td>
                  <td className="p-3">{h.insurance}</td>
                  <td className="p-3">{h.rating} ⭐</td>
                  <td className="p-3">{h.distance}</td>
                  <td className="p-3 text-cyan-700">{h.aiComment}</td>
                  <td className="p-3">
                    <Button size="sm" variant="destructive" onClick={() => onRemove(h.name)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button className="mt-4 w-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
