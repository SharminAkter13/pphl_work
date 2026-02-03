import React from "react";

const Button = ({
  children,
  size = "md",           // sm | md
  variant = "primary",   // primary | outline
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props               // allows id, aria-label, data-*, etc.
}) => {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg transition
        ${sizeClasses[size] || sizeClasses.md}
        ${variantClasses[variant] || variantClasses.primary}
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
