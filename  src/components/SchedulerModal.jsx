"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

export default function SchedulerModal({ isOpen, onClose, hospitalName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!form.name || !form.email || !form.date || !form.time) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // Very basic email check
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setConfirmed(true);
      setSubmitting(false);
      toast.success("Appointment booked!");
    }, 1200);
  };

  const handleClose = () => {
    setForm({ name: "", email: "", date: "", time: "", notes: "" });
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={handleClose}>&times;</button>
        {!confirmed ? (
          <>
            <h2 className="text-xl font-bold mb-2">Schedule Appointment</h2>
            <div className="text-gray-600 mb-4">
              {hospitalName && <span>with <b>{hospitalName}</b></span>}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Full Name*" value={form.name} onChange={handleChange} />
              <Input name="email" placeholder="Email*" type="email" value={form.email} onChange={handleChange} />
              <Input name="date" type="date" placeholder="Preferred Date*" value={form.date} onChange={handleChange} />
              <Input name="time" type="time" placeholder="Preferred Time*" value={form.time} onChange={handleChange} />
              <textarea name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} className="w-full border rounded-md p-2 text-sm" rows={2} />
              <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={submitting}>
                {submitting ? "Booking..." : "Book Appointment"}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-8">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-2">Appointment Booked!</h3>
            <div className="text-sm text-gray-700 mb-4">
              Confirmation sent to <b>{form.email}</b>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg w-full mb-4 text-xs">
              <b>Name:</b> {form.name}<br />
              <b>Date:</b> {form.date} at {form.time}<br />
              <b>Hospital:</b> {hospitalName}<br />
              {form.notes && <><b>Notes:</b> {form.notes}</>}
            </div>
            <Button onClick={handleClose} className="w-full bg-green-600 text-white hover:bg-green-700">Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}
