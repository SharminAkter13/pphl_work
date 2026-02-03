import React from "react";

// Table Component
export const Table = ({ children, className = "" }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-800 ${className}`}>
        {children}
      </table>
    </div>
  );
};

// TableHeader Component
export const TableHeader = ({ children, className = "" }) => {
  return <thead className={`bg-gray-50 dark:bg-gray-900/50 ${className}`}>{children}</thead>;
};

// TableBody Component
export const TableBody = ({ children, className = "" }) => {
  return <tbody className={`divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-transparent ${className}`}>{children}</tbody>;
};

// TableRow Component
export const TableRow = ({ children, className = "" }) => {
  return <tr className={`transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50 ${className}`}>{children}</tr>;
};

// TableCell Component
export const TableCell = ({
  children,
  isHeader = false,
  className = "",
  colSpan,
}) => {
  const CellTag = isHeader ? "th" : "td";

  const baseClasses = isHeader
    ? "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400"
    : "px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap";

  return (
    <CellTag colSpan={colSpan} className={`${baseClasses} ${className}`}>
      {children}
    </CellTag>
  );
};