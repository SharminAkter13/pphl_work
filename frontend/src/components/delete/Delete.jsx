import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint, FaSearch, FaPlus } from 'react-icons/fa'; 

const Delete
 = ({ isOpen, onClose, onConfirm, record }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
    <p>Are you sure you want to delete this record?</p>
    <div className="flex justify-end space-x-2 mt-4">
      <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
    </div>
  </Modal>
);

export default Delete;