"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you’d POST to /api/contact or similar (not implemented for demo)
  };

  return (
    <main className="max-w-lg mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-cyan-800">Contact Us</h1>
      <p className="mb-6 text-gray-700">
        Questions, suggestions, or support? Fill out the form below and we’ll be in touch!
      </p>
      {submitted ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          Thank you! Your message has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              className="w-full border rounded px-3 py-2 text-gray-800"
              required
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2 text-gray-800"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full border rounded px-3 py-2 text-gray-800"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-900 font-semibold"
          >
            Send
          </button>
        </form>
      )}
    </main>
  );
}

