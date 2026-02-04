import React from 'react';

const Delete = ({ onClose, onConfirm }) => (
  <div>
    <p className="text-gray-700">Are you sure you want to delete this record? This action cannot be undone.</p>
    <div className="flex justify-end space-x-2 mt-6">
      <button 
        onClick={onClose} 
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      >
        Cancel
      </button>
      <button 
        onClick={onConfirm} 
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Confirm Delete
      </button>
    </div>
  </div>
);

export default Delete;