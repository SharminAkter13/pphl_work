import React from "react";

const Checkbox = ({ label, checked, id, onChange, className = "", disabled = false }) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center space-x-3 cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      } ${className}`}
    >
      <div className="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center bg-white dark:bg-gray-900 dark:border-gray-700">
        <input
          id={id}
          type="checkbox"
          className="absolute w-5 h-5 opacity-0 cursor-pointer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {checked && (
          <span className="text-sm font-bold text-white dark:text-white">✓</span>
        )}
      </div>
      {label && (
        <span className="text-sm text-gray-800 dark:text-gray-200">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
