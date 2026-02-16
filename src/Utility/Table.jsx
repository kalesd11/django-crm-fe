import React from "react";
import { Link } from "react-router";

function Table({
  data = [],
  columns = [],
  actions = null,
  checkSelect = false,
  onDelete,
}) {
  return (
    <div className="w-full rounded-2xl glass-effect border border-blue-500/20">
      <table className="w-full text-sm text-left">
        
        {/* ===== HEADER ===== */}
        <thead className="border-b text-gray-500 uppercase text-xs">
          <tr>
            {checkSelect && <th className="px-5 py-4 text-center">Select</th>}

            {columns.map((col, i) => (
              <th key={i} className={`px-5 py-4 ${col.align || "text-left"}`}>
                {col.header}
              </th>
            ))}

            {actions && (
              <th className="px-5 py-4 text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody className="divide-y">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-6 py-8 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-white/40 transition"
              >
                {/* Checkbox */}
                {checkSelect && (
                  <td className="px-5 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.checked || false}
                      onChange={(e) =>
                        row.onCheck?.(e.target.checked, row)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                )}

                {/* Cells */}
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-5 py-4 ${col.align || "text-left"}`}
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.accessor]}
                  </td>
                ))}

                {/* Actions */}
                {actions && (
                  <td className="px-5 py-4 text-center">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
