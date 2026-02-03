import React, { useState } from 'react';
import InputGroup from './InputGroup';
import Dropdown from './Dropdown'; // Assuming you have a Dropdown component

const SearchFilter = ({ onSearch, filters = [], className = '' }) => {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleSearch = () => {
    onSearch({ query, ...selectedFilters });
  };

  return (
    <div className={`flex flex-wrap items-center space-x-4 ${className}`}>
      <InputGroup
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      {filters.map((filter, index) => (
        <Dropdown
          key={index}
          options={filter.options}
          value={selectedFilters[filter.key]}
          onChange={(value) => setSelectedFilters({ ...selectedFilters, [filter.key]: value })}
          placeholder={filter.label}
        />
      ))}
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchFilter;