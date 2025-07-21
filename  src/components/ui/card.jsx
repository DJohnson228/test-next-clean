// components/ui/card.jsx
export function Card({ children, className = "" }) {
    return (
      <div className={`rounded-xl border p-4 shadow-md bg-white ${className}`}>
        {children}
      </div>
    );
  }
  