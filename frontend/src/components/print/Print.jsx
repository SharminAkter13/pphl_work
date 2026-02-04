import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint, FaSearch, FaPlus } from 'react-icons/fa'; 

const Print = ({ isOpen, onClose, data, fields, primaryKey = 'id' }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Print Invoice">
    {data && (
      <div className="invoice-style p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>
        <div className="mb-4">
          <p><strong>ID:</strong> {data[primaryKey]}</p>
          {fields.map(field => (
            <p key={field.name}><strong>{field.label}:</strong> {data[field.name]}</p>
          ))}
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Print</button>
      </div>
    )}
  </Modal>
);

export default Print;