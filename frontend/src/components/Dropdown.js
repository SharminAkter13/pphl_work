const Dropdown = ({ options, value, onChange, placeholder, className = '' }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${className}`}
  >
    <option value="">{placeholder}</option>
    {options.map((opt, index) => (
      <option key={index} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
export default Dropdown;