import React, { useState, useEffect } from 'react';

const Search = ({ searchFields, fields, onFilterChange, multiple = true }) => {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="flex flex-wrap items-end gap-4">
      {searchFields.map(field => {
        const fieldDef = fields.find(f => f.name === field);
        const label = fieldDef?.label || field;
        
        const isDateField = fieldDef?.type === 'date' || field.toLowerCase().includes('date');

        return (
          <div key={field} className="flex flex-col min-w-[200px] flex-1">
            <label className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-tight">
              {label}
            </label>
            <input
              type={isDateField ? "date" : "text"}
              placeholder={`Search ${label}...`}
              value={filters[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white min-h-[34px]"
            />
          </div>
        );
      })}

      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="px-6 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm"
        >
          Search
        </button>

        {multiple && Object.values(filters).some(v => v !== '') && (
          <button
            onClick={clearFilters}
            className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;