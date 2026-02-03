import React from "react";

const TextArea = ({ 
  placeholder = "Enter text...", 
  rows = 3, 
  value = "", 
  onChange, 
  className = "", 
  disabled = false, 
  error = false, 
  hint = "" 
}) => {

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-sm focus:outline-none ${className}`;

  if (disabled) {
    textareaClasses += " bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400";
  } else if (error) {
    textareaClasses += " border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200 dark:border-red-600";
  } else {
    textareaClasses += " border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white";
  }

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
