import React from "react";

const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  value = "",
  onChange,
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  className = "",
}) => {
  let baseClass = `h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    baseClass += " bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    baseClass += " border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:text-error-400";
  } else if (success) {
    baseClass += " border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:border-success-500 dark:text-success-400";
  } else {
    baseClass += " border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800";
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={baseClass}
      />
      {hint && (
        <p className={`mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
