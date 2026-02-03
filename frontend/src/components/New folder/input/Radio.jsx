import React from "react";

const Radio = ({ id, name, value, checked, label, onChange, className = "", disabled = false }) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 text-sm cursor-pointer select-none ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-800 dark:text-gray-200"
      } ${className}`}
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={() => !disabled && onChange(value)}
        className="sr-only"
        disabled={disabled}
      />
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-full border ${
          checked
            ? "border-brand-500 bg-brand-500"
            : "border-gray-300 bg-transparent dark:border-gray-700"
        } ${disabled ? "bg-gray-100 border-gray-200 dark:bg-gray-700 dark:border-gray-700" : ""}`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-white"></span>}
      </span>
      {label}
    </label>
  );
};

export default Radio;
