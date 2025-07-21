import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Loader2, UploadCloud, CheckCircle2, AlertTriangle, X } from "lucide-react";

export default function InsuranceUpload({ onExtracted }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtracted(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/eob-parse", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setExtracted(data);
        onExtracted?.(data);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(data.error || "Failed to parse document.");
      }
    } catch {
      setError("Failed to parse document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 mb-8 max-w-lg">
      <h3 className="font-bold text-xl mb-4 flex items-center">
        <UploadCloud className="mr-2" /> Upload Insurance Card or EOB
      </h3>
      <Input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="mb-2"
      />
      {file && (
        <div className="flex items-center gap-2 text-sm">
          <span>{file.name}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            <X />
          </Button>
        </div>
      )}
      <Button className="mt-4" disabled={!file || loading} onClick={handleUpload}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : <UploadCloud className="mr-2" />}
        {loading ? "Processing..." : "Upload & Extract"}
      </Button>
      {error && (
        <div className="mt-3 text-red-600 flex items-center font-semibold" role="alert">
          <AlertTriangle className="mr-2" /> {error}
        </div>
      )}
      {extracted && (
        <div className="mt-4 bg-cyan-50 p-3 rounded-lg border border-cyan-200">
          <div className="font-medium mb-2 flex items-center text-green-700">
            <CheckCircle2 className="mr-2" /> Extracted Info
          </div>
          <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(extracted).map(([key, val]) => (
              <div key={key}><b>{key}:</b> {val || <i>(not found)</i>}</div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
