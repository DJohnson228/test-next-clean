"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Exports audit errors to Excel or CSV.
 * @param {Array} errors - Array of error objects to export.
 * @param {Object} options - Optional settings: { fileType: "xlsx"|"csv", fileName: "yourfile.xlsx" }
 */
export function exportAuditToExcel(errors, options = {}) {
  if (typeof window === "undefined") {
    // Prevent SSR/Node.js from running this code
    return;
  }

  if (!Array.isArray(errors) || errors.length === 0) {
    alert("No data to export.");
    return;
  }

  // Create worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(errors);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Results");

  const fileType = options.fileType === "csv" ? "csv" : "xlsx";
  let fileName = options.fileName;
  if (!fileName || typeof fileName !== "string") {
    fileName = `audit-results.${fileType}`;
  }

  if (fileType === "csv") {
    // For CSV, let XLSX handle the file download directly (browser only)
    XLSX.writeFile(workbook, fileName, { bookType: "csv" });
    return;
  }

  // For XLSX, create a Blob and trigger download
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const blob = new Blob([wbout], { type: mimeType });
  saveAs(blob, fileName);
}
