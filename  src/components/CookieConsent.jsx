// src/components/CookieConsent.jsx
"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if not already accepted or rejected
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    // Optionally: fire analytics opt-in here
  }

  function handleReject() {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
    // Optionally: disable analytics here
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] max-w-lg w-[95vw] bg-white dark:bg-gray-900 border border-cyan-200 dark:border-gray-700 shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 animate-fade-in"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="flex-1 text-sm text-gray-700 dark:text-gray-200">
        We use cookies to analyze site usage and enhance your experience. By clicking <b>Accept</b>, you consent to our use of cookies.{" "}
        <a href="/privacy" className="underline text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100" tabIndex={0}>
          Learn more
        </a>
        .
      </div>
      <div className="flex gap-2 mt-1 md:mt-0">
        <button
          onClick={handleReject}
          className="px-4 py-1 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Reject non-essential cookies"
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-800 text-white font-semibold shadow transition"
          aria-label="Accept cookies"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
