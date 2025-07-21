"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export default function AuditPreview({ errors, onEditError }) {
  // Track which row is currently being edited
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});

  // Start editing a row
  const handleEdit = (index, row) => {
    setEditIndex(index);
    setEditRow(row);
  };

  // Save changes
  const handleSave = (index) => {
    onEditError(index, editRow);
    setEditIndex(null);
    setEditRow({});
  };

  // Cancel editing
  const handleCancel = () => {
    setEditIndex(null);
    setEditRow({});
  };

  // Render
  return (
    <div className="overflow-x-auto rounded shadow border mb-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-3 py-2 border-b">Hospital</th>
            <th className="px-3 py-2 border-b">Field</th>
            <th className="px-3 py-2 border-b">Error</th>
            <th className="px-3 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((row, i) => (
            <tr key={row.id || i} className="even:bg-gray-50">
              {editIndex === i ? (
                <>
                  <td className="px-3 py-2">
                    <input
                      value={editRow.hospital}
                      onChange={e => setEditRow({ ...editRow, hospital: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={editRow.field}
                      onChange={e => setEditRow({ ...editRow, field: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={editRow.error}
                      onChange={e => setEditRow({ ...editRow, error: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    <Button size="sm" onClick={() => handleSave(i)}>Save</Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-3 py-2">{row.hospital}</td>
                  <td className="px-3 py-2">{row.field}</td>
                  <td className="px-3 py-2">{row.error}</td>
                  <td className="px-3 py-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(i, row)}>Edit</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
