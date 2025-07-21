// src/components/ui/textarea.jsx
"use client";

import React from "react";

export default function Textarea({ value, onChange, ...props }) {
  return (
    <textarea
      className="w-full rounded-lg border border-gray-300 p-2 text-base shadow-sm focus:ring-cyan-500 focus:border-cyan-500 resize-y min-h-[100px]"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

