"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ProviderLookupModal from "../ProviderLookupModal";
import { UserCircle2, LogOut, LogIn } from "lucide-react";
// import { useTranslations, useLocale, usePathname, useRouter } from "next-intl"; // For i18n, if needed

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showProviderSearch, setShowProviderSearch] = useState(false);

  // For i18n, you could use:
  // const t = useTranslations();

  function getInitials(name, email) {
    if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase();
    if (email) return email[0].toUpperCase();
    return "?";
  }

  return (
    <nav
      className="w-full bg-white/95 dark:bg-gray-950 shadow-md fixed top-0 z-50 border-b border-cyan-100 dark:border-gray-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded transition">
            <Image src="/pellucid-logo.png" alt="Pellucid Logo" width={32} height={32} />
            <span className="text-xl font-semibold text-cyan-800 dark:text-cyan-300">Pellucid Health</span>
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center space-x-2 md:space-x-5">
          <NavLink href="/" label="Home" />
          <NavLink href="/search" label="Search" />
          <NavLink href="/claims" label="Claims" />
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/insurance" label="Insurance" />
          <NavLink href="/employer-dashboard" label="Employer" />
          <button
            className="nav-link text-cyan-800 dark:text-cyan-300 font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            onClick={() => setShowProviderSearch(true)}
            tabIndex={0}
            aria-label="Find a Provider"
            type="button"
          >
            Find a Provider
          </button>
          {/* Auth Controls */}
          {status === "loading" ? (
            <span className="text-gray-400 ml-4" aria-live="polite">...</span>
          ) : session ? (
            <div className="flex items-center space-x-3 ml-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-cyan-50 dark:hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-cyan-400 transition group"
                title="Profile"
                aria-label="Profile"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full border border-cyan-200 dark:border-gray-700"
                  />
                ) : (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-cyan-200 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 font-bold text-lg">
                    {getInitials(session.user?.name, session.user?.email)}
                  </span>
                )}
                <span className="hidden md:inline text-sm font-medium group-hover:underline">
                  {session.user?.name?.split(" ")[0] || session.user?.email}
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-500 dark:text-gray-300 hover:text-cyan-800 dark:hover:text-cyan-400 flex items-center gap-1 px-2 py-1 rounded focus-visible:ring-2 focus-visible:ring-cyan-400 transition"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut className="h-5 w-5" /> <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="text-cyan-700 dark:text-cyan-300 hover:underline ml-4 px-2 py-1 rounded flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Log in"
              >
                <LogIn className="h-5 w-5" /> Login
              </button>
              <Link
                href="/signup"
                className="ml-1 px-2 py-1 rounded border border-cyan-500 bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Sign up"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Provider Lookup Modal */}
      <ProviderLookupModal
        isOpen={showProviderSearch}
        onClose={() => setShowProviderSearch(false)}
      />
    </nav>
  );
}

// Extract nav-link as a component for accessibility and style consistency
function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="nav-link text-gray-600 dark:text-gray-300 hover:text-cyan-800 dark:hover:text-cyan-400 font-medium transition px-2 py-1 rounded focus-visible:ring-2 focus-visible:ring-cyan-400"
      aria-label={label}
    >
      {label}
    </Link>
  );
}
