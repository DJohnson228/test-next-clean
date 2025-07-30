
"use client";
import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, CheckCircle2, X } from "lucide-react";
import toast from "react-hot-toast";

export default function TelehealthReferralModal({ open, onClose, hospital }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef();

  // Auto-focus textarea when opened
  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
    if (!open) {
      setReason("");
      setSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate async referral
    setTimeout(() => {
      toast.success(
        `Referral requested to ${hospital?.name || "selected provider"}!`,
        { icon: <CheckCircle2 className="text-green-600" /> }
      );
      setSubmitting(false);
      setReason("");
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <Dialog.Panel className="bg-white p-7 rounded-2xl w-full max-w-md shadow-xl relative animate-fade-in">
          {/* Close X button (top right) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
            disabled={submitting}
          >
            <X />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-cyan-700" />
            <Dialog.Title className="text-xl font-bold text-cyan-900">
              Virtual Referral — {hospital?.name || "Provider"}
            </Dialog.Title>
          </div>
          <div className="text-sm text-gray-600 mb-5">
            Request a telehealth referral to this provider.  
            Share details to help our care team connect you.
          </div>
          <label className="block mb-3">
            <span className="block text-xs font-medium text-gray-500 mb-1">
              Reason or symptoms (optional)
            </span>
            <textarea
              placeholder="Describe your symptoms or reason for referral (optional)"
              value={reason}
              ref={textareaRef}
              onChange={e => setReason(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-200 focus:ring-cyan-400 transition"
              disabled={submitting}
            />
          </label>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              className="font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-cyan-700 hover:bg-cyan-900 text-white font-semibold flex items-center"
              disabled={submitting}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {submitting ? "Requesting..." : "Request Referral"}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
