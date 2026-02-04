import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint } from 'react-icons/fa'; 

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
    <div className="overflow-x-auto w-full">
      {/* text-xs makes the fields look small as requested */}
      <table className="min-w-full bg-white text-xs border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {enableSelect && (
              <th className="p-2 border-b w-8 text-center">
                <input type="checkbox" checked={selectedRecords.length === data.length && data.length > 0} onChange={handleSelectAll} />
              </th>
            )}
            {fields.map(field => (
              <th key={field.name} className="p-2 border-b text-left font-bold text-gray-600 uppercase tracking-tight whitespace-nowrap">
                {field.label}
              </th>
            ))}
            <th className="p-2 border-b text-center font-bold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map(record => (
            <tr key={record[primaryKey]} className="hover:bg-gray-50 border-b last:border-0 transition-colors">
              {enableSelect && (
                <td className="p-2 text-center">
                  <input type="checkbox" checked={selectedRecords.includes(record)} onChange={() => handleSelect(record)} />
                </td>
              )}
              {fields.map(field => (
                <td key={field.name} className="p-2 whitespace-nowrap max-w-[150px] overflow-hidden text-ellipsis">
                  {field.type === 'file' ? (
                    record[field.name] ? (
                      <div className="flex items-center justify-center">
                         <img 
                            src={URL.createObjectURL(record[field.name])} 
                            alt="thumb" 
                            className="w-8 h-8 rounded object-cover border border-gray-200" 
                          />
                      </div>
                    ) : <span className="text-gray-400 italic">None</span>
                  ) : (
                    record[field.name] || <span className="text-gray-400">-</span>
                  )}
                </td>
              ))}
              <td className="p-2 text-center space-x-3 whitespace-nowrap">
                {onEdit && <button onClick={() => onEdit(record)} className="text-blue-500 hover:text-blue-700 transition"><FaEdit size={14} /></button>}
                {onView && <button onClick={() => onView(record)} className="text-green-500 hover:text-green-700 transition"><FaEye size={14} /></button>}
                {onPrint && <button onClick={() => onPrint(record)} className="text-purple-500 hover:text-purple-700 transition"><FaPrint size={14} /></button>}
                {onDelete && <button onClick={() => onDelete(record)} className="text-red-500 hover:text-red-700 transition"><FaTrash size={14} /></button>}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={fields.length + 2} className="p-8 text-center text-gray-400 italic">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;