"use client";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-cyan-800">Terms of Service</h1>
      <p className="mb-4 text-gray-700">
        Welcome to Pellucid Health! These Terms of Service (“Terms”) govern your access to and use of our website, platform, and related services (“Services”). Please read these Terms carefully before using our Services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">By accessing or using Pellucid Health, you agree to be bound by these Terms and our <Link href="/privacy" className="underline text-cyan-700">Privacy Policy</Link>. If you do not agree, do not use our Services.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Use of Services</h2>
      <p className="mb-4">You must be at least 18 years old and provide accurate information. You are responsible for maintaining the security of your account.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Intellectual Property</h2>
      <p className="mb-4">All content, trademarks, and data on Pellucid Health are the property of Pellucid Health or its licensors.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">Pellucid Health is not liable for any indirect or consequential damages. The platform is provided “as is” without warranties of any kind.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to Terms</h2>
      <p className="mb-4">We may update these Terms at any time. Continued use after changes constitutes acceptance.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact Us</h2>
      <p className="mb-4">For any questions about these Terms, please <Link href="/contact" className="underline text-cyan-700">contact us</Link>.</p>

      <div className="mt-12 text-xs text-gray-400">
        Last updated: June 2025
      </div>
    </main>
  );
}

