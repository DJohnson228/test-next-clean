// src/components/ProfilePanel.jsx
"use client";
import { useState, useEffect } from "react";

export default function ProfilePanel({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user || { username: "", email: "", insurance: "" });

  // On mount, load profile from localStorage
  useEffect(() => {
    const local = localStorage.getItem("pellucidUser");
    if (local) {
      setUser(JSON.parse(local));
    }
  }, [setUser]);

  // Update local form state when user prop changes
  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleSave = () => {
    setUser(form);
    localStorage.setItem("pellucidUser", JSON.stringify(form));
    setEditing(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("pellucidUser");
  };

  if (!user) {
    return (
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          className="border rounded px-2 py-1"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border rounded px-2 py-1"
        />
        <button
          className="bg-blue-600 text-white rounded px-4 py-2"
          onClick={() => {
            setUser(form);
            localStorage.setItem("pellucidUser", JSON.stringify(form));
          }}
        >Login</button>
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col gap-2">
      {editing ? (
        <>
          <input
            className="border rounded px-2 py-1"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            placeholder="Username"
          />
          <input
            className="border rounded px-2 py-1"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className="border rounded px-2 py-1"
            value={form.insurance}
            onChange={e => setForm({ ...form, insurance: e.target.value })}
            placeholder="Insurance"
          />
          <div>
            <button
              className="bg-indigo-600 text-white rounded px-3 py-1 mr-2"
              onClick={handleSave}
            >Save</button>
            <button
              className="bg-gray-300 rounded px-3 py-1"
              onClick={() => setEditing(false)}
            >Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="font-semibold">User:</span> {user.username}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Insurance:</span> {user.insurance}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-indigo-600 text-white rounded px-3 py-1"
              onClick={() => setEditing(true)}
            >Edit Profile</button>
            <button
              className="bg-gray-300 rounded px-3 py-1"
              onClick={handleLogout}
            >Logout</button>
          </div>
        </>
      )}
    </div>
  );
}
