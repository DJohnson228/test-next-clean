// src/components/Loader.jsx

export default function Loader({ className = "", size = 6 }) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          className={`animate-spin h-${size} w-${size} text-cyan-600`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }
  
