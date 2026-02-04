import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint, FaSearch, FaPlus } from 'react-icons/fa'; 


const Table = ({ fields, data, primaryKey = 'id', enableSelect = true, onSelect, onEdit, onDelete, onView, onPrint }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSelect = (record) => {
    const newSelected = selectedRecords.includes(record) 
      ? selectedRecords.filter(r => r !== record) 
      : [...selectedRecords, record];
    setSelectedRecords(newSelected);
    onSelect && onSelect(newSelected);
  };

  const handleSelectAll = () => {
    const newSelected = selectedRecords.length === data.length ? [] : data;
    setSelectedRecords(newSelected);
    onSelect && onSelect(newSelected);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {enableSelect && (
              <th className="px-4 py-2 border-b">
                <input type="checkbox" checked={selectedRecords.length === data.length} onChange={handleSelectAll} />
              </th>
            )}
            {fields.map(field => (
              <th key={field.name} className="px-4 py-2 border-b text-left">{field.label}</th>
            ))}
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr key={record[primaryKey]} className="hover:bg-gray-50">
              {enableSelect && (
                <td className="px-4 py-2 border-b">
                  <input type="checkbox" checked={selectedRecords.includes(record)} onChange={() => handleSelect(record)} />
                </td>
              )}
              {fields.map(field => (
                <td key={field.name} className="px-4 py-2 border-b">
                  {field.type === 'file' ? (
                    record[field.name] ? (
                      <img src={URL.createObjectURL(record[field.name])} alt="Uploaded" className="w-16 h-16 object-cover" />
                    ) : 'No file'
                  ) : (
                    record[field.name]
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border-b space-x-2">
                {onEdit && <button onClick={() => onEdit(record)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>}
                {onDelete && <button onClick={() => onDelete(record)} className="text-red-500 hover:text-red-700"><FaTrash /></button>}
                {onView && <button onClick={() => onView(record)} className="text-green-500 hover:text-green-700"><FaEye /></button>}
                {onPrint && <button onClick={() => onPrint(record)} className="text-purple-500 hover:text-purple-700"><FaPrint /></button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;