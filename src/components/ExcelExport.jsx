"use client";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import * as XLSX from "xlsx";

export default function ExcelExport({ data, filename = "export.xlsx" }) {
  const handleExport = () => {
    if (!data || !Array.isArray(data) || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Button
      onClick={handleExport}
      className="flex gap-2 items-center"
      variant="outline"
    >
      <FileDown className="w-4 h-4" />
      Export to Excel
    </Button>
  );
}

