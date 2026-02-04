import React from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint } from 'react-icons/fa'; 

const Table = ({ fields, data, dense = false, onEdit, onDelete, onView, onPrint }) => {
  return (
    <div className="overflow-x-auto w-full border rounded-md shadow-sm">
      <table className={`min-w-full bg-white border-collapse ${dense ? 'text-[10px]' : 'text-sm'}`}>
        <thead className="bg-gray-100">
          <tr>
            {fields.map(field => (
              <th key={field.name} className="p-2 border-b text-left font-bold text-gray-500 uppercase tracking-tighter whitespace-nowrap">
                {dense ? (field.shortLabel || field.label) : field.label}
              </th>
            ))}
            <th className="p-2 border-b text-center text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((record, index) => (
            <tr key={index} className="hover:bg-blue-50/40 border-b last:border-0 transition-colors">
              {fields.map(field => (
                <td key={field.name} className="p-2 whitespace-nowrap text-gray-600">
                  {field.type === 'color' ? (
                    <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: record[field.name] }} />
                  ) : field.type === 'file' ? (
                    record[field.name] ? '📎' : '-'
                  ) : (
                    record[field.name]?.toString() || '-'
                  )}
                </td>
              ))}
              <td className="p-2 text-center flex justify-center items-center space-x-2">
                {onView && (
                  <button title="View" onClick={() => onView(record)} className="text-gray-400 hover:text-green-600 transition">
                    <FaEye size={dense ? 11 : 14} />
                  </button>
                )}
                {onEdit && (
                  <button title="Edit" onClick={() => onEdit(record)} className="text-gray-400 hover:text-blue-600 transition">
                    <FaEdit size={dense ? 11 : 14} />
                  </button>
                )}
                {onPrint && (
                  <button title="Print" onClick={() => onPrint(record)} className="text-gray-400 hover:text-purple-600 transition">
                    <FaPrint size={dense ? 11 : 14} />
                  </button>
                )}
                {onDelete && (
                  <button title="Delete" onClick={() => onDelete(record)} className="text-gray-400 hover:text-red-600 transition">
                    <FaTrash size={dense ? 11 : 14} />
                  </button>
                )}
              </td>
            </tr>
          )) : (
            <tr><td colSpan={fields.length + 1} className="p-4 text-center text-gray-400 italic">No data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;