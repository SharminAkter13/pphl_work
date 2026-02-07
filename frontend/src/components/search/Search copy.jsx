import React, { useState } from 'react';

const Search = ({ searchFields, fields, onFilterChange, multiple = true }) => {
  const [filters, setFilters] = useState({});

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="mb-4 space-y-2">
      {searchFields.map(field => {
        const label = fields.find(f => f.name === field)?.label || field;
        return (
          <div key={field} className="flex items-center space-x-2">
            <label className="text-sm font-medium">{label}:</label>
            <input
              type="text"
              placeholder={`Search ${label}`}
              value={filters[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        );
      })}

      {multiple && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default Search;