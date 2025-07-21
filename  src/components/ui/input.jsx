export function Input({ className = "", ...props }) {
    return (
      <input
        className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
  