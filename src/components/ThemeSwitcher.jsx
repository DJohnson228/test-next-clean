// src/components/ThemeSwitcher.jsx

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher({ className = "" }) {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    // Set the theme class on <html>
    document.documentElement.classList.toggle("dark", theme === "dark");
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // On mount, check localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved && saved !== theme) setTheme(saved);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition ${className}`}
    >
      {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  );
}

