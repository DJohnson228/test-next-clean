"use client";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center">
      <button
        aria-label="Light mode"
        className={`rounded p-1.5 transition ${theme === "light" ? "bg-cyan-200" : ""}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        aria-label="Dark mode"
        className={`rounded p-1.5 transition ${theme === "dark" ? "bg-gray-700 text-yellow-400" : ""}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-5 w-5" />
      </button>
      <button
        aria-label="System"
        className={`rounded p-1.5 transition ${theme === "system" ? "bg-cyan-50 border" : ""}`}
        onClick={() => setTheme("system")}
      >
        <span className="text-xs font-semibold">SYS</span>
      </button>
    </div>
  );
}
