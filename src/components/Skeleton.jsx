// src/components/Skeleton.jsx

export default function Skeleton({ className = "", width = "100%", height = "1.5rem", style = {} }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse ${className}`}
      style={{ width, height, ...style }}
      aria-busy="true"
      aria-label="Loading"
    />
  );
}

