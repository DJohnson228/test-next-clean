// src/components/ErrorBoundary.jsx

"use client";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Optionally log error to reporting service here
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught error:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 border border-red-300 rounded-xl text-red-800 text-center my-10">
          <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
          <div className="mb-2">{this.state.error?.message || "An unexpected error occurred."}</div>
          <button
            className="px-4 py-2 mt-2 bg-cyan-700 text-white rounded hover:bg-cyan-900 transition"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

