import React, { useMemo } from 'react';

const Table = ({ 
  headers, 
  rows, 
  onEdit, 
  onDelete, 
  sortable = false, 
  className = '' 
}) => {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

  const sortedRows = useMemo(() => {
    if (!sortable || !sortConfig.key) return rows;
    return [...rows].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig, sortable]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}
                onClick={sortable ? () => handleSort(header.key) : undefined}
              >
                {header.label}
                {sortable && sortConfig.key === header.key && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedRows.map((row, index) => (
            <tr key={index}>
              {headers.map((header, i) => (
                <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row[header.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {onEdit && <button onClick={() => onEdit(row.id)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>}
                {onDelete && <button onClick={() => onDelete(row.id)} className="text-red-600 hover:text-red-900">Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;