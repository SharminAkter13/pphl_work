import React from 'react';

const Print = ({ data, fields, primaryKey = 'id' }) => {
  if (!data) return null; //

  return (
    <div className="invoice-style p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="mb-4">
        <p><strong>ID:</strong> {data[primaryKey]}</p>
        {fields.map(field => (
          <p key={field.name}><strong>{field.label}:</strong> {data[field.name] || '-'}</p>
        ))}
      </div>
      <button 
        onClick={() => window.print()} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 no-print"
      >
        Print
      </button>
    </div>
  );
};

export default Print;