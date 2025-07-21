"use client";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-cyan-800">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">
        Pellucid Health (“we”, “us”, “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Personal information (such as name, email, insurance details)</li>
        <li>Usage and analytics data</li>
        <li>Cookies and similar technologies</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>To provide and personalize our services</li>
        <li>To improve our platform</li>
        <li>For analytics, compliance, and security purposes</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">We do not sell your information. We may share it with service providers or as required by law.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Cookies</h2>
      <p className="mb-4">We use cookies for analytics and to improve your experience. You can manage your preferences in the cookie banner.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4">You can access, correct, or delete your data at any time. Contact us at <a href="mailto:privacy@pellucid.health" className="underline text-cyan-700">privacy@pellucid.health</a>.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact</h2>
      <p className="mb-4">For privacy questions, please <Link href="/contact" className="underline text-cyan-700">contact us</Link>.</p>

      <div className="mt-12 text-xs text-gray-400">
        Last updated: June 2025
      </div>
    </main>
  );
}

