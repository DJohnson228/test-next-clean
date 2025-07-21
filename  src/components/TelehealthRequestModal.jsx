"use client";
import { Dialog } from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

export default function TelehealthRequestModal({ hospital, isOpen, onClose, userProfile }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    insurance: "",
    symptoms: "",
    preferredTime: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef();

  // Autofill if userProfile provided
  useEffect(() => {
    if (userProfile && isOpen) {
      setForm(f => ({
        ...f,
        name: userProfile.fullName || "",
        email: userProfile.email || "",
        insurance: userProfile.insurance || "",
      }));
    }
  }, [userProfile, isOpen]);

  // Focus first field on open
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current.focus(), 100);
    }
    if (!isOpen) {
      setForm({
        name: userProfile?.fullName || "",
        email: userProfile?.email || "",
        insurance: userProfile?.insurance || "",
        symptoms: "",
        preferredTime: "",
      });
      setSubmitted(false);
      setSubmitting(false);
    }
    // eslint-disable-next-line
  }, [isOpen]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/telehealth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, hospital: hospital?.name }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Telehealth request submitted!");
        setTimeout(onClose, 2000);
      } else {
        const { error } = await res.json();
        toast.error(error || "Submission failed.");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="relative bg-white rounded-xl p-8 w-full max-w-md mx-auto shadow-xl animate-fade-in">
        <Dialog.Title className="text-xl font-bold mb-2">
          Telehealth Visit Request
        </Dialog.Title>
        {submitted ? (
          <div className="text-green-700 font-semibold py-8 text-center">
            Your telehealth request has been submitted!<br />
            <span className="block mt-2 text-gray-500">We’ll contact you soon.</span>
            <Button className="mt-5" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><b>Hospital:</b> {hospital?.name}</div>
            <div>
              <label className="block text-sm mb-1">Your Name</label>
              <input
                name="name"
                className="w-full border p-2 rounded"
                required
                value={form.name}
                onChange={handleChange}
                ref={firstInputRef}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Contact Email</label>
              <input
                name="email"
                type="email"
                className="w-full border p-2 rounded"
                required
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Insurance</label>
              <input
                name="insurance"
                className="w-full border p-2 rounded"
                placeholder="Insurance Provider (optional)"
                value={form.insurance}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Symptoms / Reason for Visit</label>
              <textarea
                name="symptoms"
                className="w-full border p-2 rounded"
                required
                value={form.symptoms}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your concern"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Preferred Time</label>
              <input
                name="preferredTime"
                className="w-full border p-2 rounded"
                placeholder="Morning / Afternoon / Evening"
                value={form.preferredTime}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-cyan-700 text-white hover:bg-cyan-800"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        )}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={onClose}>&times;</button>
      </div>
    </Dialog>
  );
}
