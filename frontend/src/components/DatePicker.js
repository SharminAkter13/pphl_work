import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ selected, onChange, placeholder, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};

export default DatePickerComponent;