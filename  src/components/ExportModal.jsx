"use client";

import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";

export default function ExportModal({ isOpen, onClose, onExport }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-2">Export as PDF</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            This will generate a summary of your hospital results, including prices and insurance info.
          </Dialog.Description>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={onExport}>
              Confirm Export
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
