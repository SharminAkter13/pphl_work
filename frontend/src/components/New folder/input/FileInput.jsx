import React from "react";

const FileInput = ({ className = "", onChange, multiple = false }) => {
  return (
    <input
      type="file"
      multiple={multiple}
      onChange={onChange}
      className={`h-11 w-full rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-none focus:file:ring-2 focus:file:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 ${className}`}
    />
  );
};

export default FileInput;
