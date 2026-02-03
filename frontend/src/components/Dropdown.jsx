import React from 'react';

const Dropdown = ({ label, options, value, onChange, placeholder, className = '' }) => (
  <div className="flex flex-col gap-1 mb-4" onClick={(e) => e.stopPropagation()}>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // Stop events from bubbling up to the Modal overlay
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${className}`}
    >
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