
import React from 'react';

const Dropdown = ({ label, options, value, onChange, placeholder, className = '' }) => (
  <div className="flex flex-col gap-1 w-full">
    {/* Explicitly render the label text here */}
    {label && (
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${className}`}
    >
      {/* Fallback text if no placeholder is provided */}
      <option value="">{placeholder || `Select ${label || 'Option'}`}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;