"use client";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { UploadCloud, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const REQUIRED_FIELDS = ["Provider", "Date", "Claim", "Member", "Patient", "Amount", "Status"];

function validateRow(row) {
  const missing = REQUIRED_FIELDS.filter(field => !row[field]);
  return { ...row, __missing: missing };
}

export default function EOBUpload({ onParsed }) {
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState([]);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        let parsed = [];
        if (file.name.endsWith(".csv")) {
          // CSV parsing
          const text = evt.target.result;
          const rows = XLSX.utils.sheet_to_json(XLSX.read(text, { type: "string" }).Sheets.Sheet1, { defval: "" });
          parsed = rows;
        } else {
          // Excel parsing
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          parsed = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
        }
        // Validate fields
        const checked = parsed.map(validateRow);
        setRows(checked);
        setErrors(checked.filter(row => row.__missing && row.__missing.length > 0));
        toast.success(`Parsed ${parsed.length} rows`);
      } catch (err) {
        setRows([]);
        setErrors([]);
        toast.error("Failed to parse file: " + err.message);
      }
    };
    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpload = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirm = () => {
    if (errors.length) {
      toast.error("Fix errors before importing.");
      return;
    }
    if (onParsed) onParsed(rows);
    toast.success("EOB data imported!");
  };

  return (
    <Card className="p-6 mb-6">
      <div
        className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center mb-4 bg-cyan-50 cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <UploadCloud className="mx-auto mb-2 text-cyan-600" size={32} />
        <div className="font-semibold mb-1">Drag and drop EOB/Insurance CSV or Excel, or click to upload</div>
        <div className="text-xs text-gray-500">Supported: .csv, .xlsx</div>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        {fileName && <div className="text-xs mt-2 text-gray-600">{fileName}</div>}
      </div>
      {rows.length > 0 && (
        <div>
          <div className="mb-2 font-bold text-cyan-800">Parsed EOB Preview ({rows.length}):</div>
          <div className="overflow-auto max-h-60 border rounded bg-white">
            <table className="min-w-full text-xs">
              <thead>
                <tr>
                  {REQUIRED_FIELDS.map(f => (
                    <th key={f} className="px-2 py-1 border-b">{f}</th>
                  ))}
                  <th className="px-2 py-1 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={row.__missing && row.__missing.length > 0 ? "bg-red-50" : ""}>
                    {REQUIRED_FIELDS.map(f => (
                      <td key={f} className="px-2 py-1 border-b">{row[f] || <span className="text-red-600">—</span>}</td>
                    ))}
                    <td className="px-2 py-1 border-b">
                      {row.__missing && row.__missing.length > 0
                        ? <span className="text-red-600"><XCircle className="inline h-4 w-4" /> Missing: {row.__missing.join(", ")}</span>
                        : <span className="text-green-600"><CheckCircle2 className="inline h-4 w-4" /> OK</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button className="mt-4 bg-cyan-700 text-white" onClick={handleConfirm}>
            Confirm & Import to Profile
          </Button>
        </div>
      )}
    </Card>
  );
}
