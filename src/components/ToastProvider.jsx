// src/components/ToastProvider.jsx

"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#0e7490", // cyan-700
          fontWeight: 500,
          border: "1px solid #bae6fd",
          borderRadius: "12px",
          padding: "10px 16px",
          boxShadow: "0 8px 24px 0 rgb(16 185 129 / 5%)"
        },
        success: { style: { background: "#ecfdf5", color: "#0d9488" } }, // teal-600
        error: { style: { background: "#fef2f2", color: "#b91c1c" } },   // red-700
      }}
      containerClassName=""
      gutter={10}
    />
  );
}

