export function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  // Add transition, rounded-2xl, subtle shadow, bigger font
<Button
  className="rounded-2xl px-5 py-2 bg-cyan-700 text-white hover:bg-cyan-800 shadow transition-all text-base font-medium"
  {...props}
>
  {children}
</Button>
