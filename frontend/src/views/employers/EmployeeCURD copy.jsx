import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Table from '../../components/table/Table';
import Modal from '../../components/modal/Modal'; 
import Form from '../../components/form/Form';
import Search from '../../components/search/Search';
import Delete from '../../components/delete/Delete';
import View from '../../components/view/View';
import Print from '../../components/print/Print';
import { 
  getEmployees, 
  createEmployees, 
  updateEmployees, 
  deleteItem,
  ASSET_URL 
} from '../../services/api'; 

const EmployeeCRUD = () => {
  const [employees, setEmployees] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [currentRecord, setCurrentRecord] = useState(null);

  const searchFields = ['name', 'email', 'phone', 'department'];

  const allFields = [
    { 
      name: 'profile_image', 
      label: 'Photo', 
      shortLabel: 'Img', 
      type: 'file',
      render: (text, record) => record.profile_image ? (
        <img 
          src={`${ASSET_URL}/storage/${record.profile_image}`} 
          alt="Profile" 
          className="w-8 h-8 rounded-full object-cover border"
        />
      ) : <span className="text-gray-400">-</span>
    },
    { name: 'name', label: 'Full Name', shortLabel: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', shortLabel: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true, hideInTable: true },
    { name: 'phone', label: 'Phone', shortLabel: 'Ph', type: 'text' },
    { 
      name: 'dob', 
      label: 'Birth Date', 
      shortLabel: 'DOB', 
      type: 'date',
      render: (val) => val ? new Date(val).toLocaleDateString() : '-' 
    },
    { 
      name: 'joining_datetime', 
      label: 'Joining Date', 
      shortLabel: 'Join DT', 
      type: 'datetime-local',
      render: (val) => val ? new Date(val).toLocaleString([], {dateStyle: 'medium', timeStyle: 'short'}) : '-'
    },
    { name: 'department', label: 'Department', shortLabel: 'Dept', type: 'radio', options: [
      { label: 'IT', value: 'IT' }, { label: 'HR', value: 'HR' }, { label: 'Finance', value: 'Finance' }
    ]},
    { 
      name: 'is_active', 
      label: 'Active', 
      shortLabel: 'Act', 
      type: 'checkbox',
      render: (val) => val ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>
    },
    { 
      name: 'skills', 
      label: 'Skills', 
      type: 'checkbox-group', 
      options: [
        { label: 'JavaScript', value: 'JavaScript' },
        { label: 'React', value: 'React' },
        { label: 'PHP', value: 'PHP' },
        { label: 'Laravel', value: 'Laravel' }
      ],
      render: (val) => Array.isArray(val) ? val.join(', ') : (typeof val === 'string' ? JSON.parse(val).join(', ') : '-')
    },
    { name: 'resume', label: 'Resume', shortLabel: 'Doc', type: 'file' },
  ];

  const tableFields = allFields.filter(f => !f.hideInTable);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      const data = response.data || [];
      // Ensure skills are parsed if they come as a JSON string
      const formatted = data.map(emp => ({
        ...emp,
        skills: typeof emp.skills === 'string' ? JSON.parse(emp.skills) : emp.skills
      }));
      setEmployees(formatted);
      setFilteredData(formatted);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleSearch = (filters) => {
    const filtered = employees.filter((emp) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return emp[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
      })
    );
    setFilteredData(filtered);
  };

  const onFormSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (typeof value === 'boolean') {
          formData.append(key, value ? 1 : 0); // Convert boolean for Laravel
        } else if (Array.isArray(value)) {
          value.forEach((val) => formData.append(`${key}[]`, val)); // Append arrays
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (modalType === 'add') {
        await createEmployees(formData);
      } else {
        await updateEmployees(currentRecord.id, formData);
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      alert("Error: " + JSON.stringify(error.response?.data?.errors || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  const onConfirmDelete = async () => {
    try {
      await deleteItem(currentRecord.id);
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      alert("Delete failed.");
    }
  };

  const handleAction = (type, record = null) => {
    setModalType(type);
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded shadow-sm border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase">Employee Management</h2>
          <button onClick={() => handleAction('add')} className="bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center">
            <FaPlus className="mr-1" /> Add New
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <Search fields={allFields} searchFields={searchFields} onFilterChange={handleSearch} />
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <Table 
            fields={tableFields} 
            data={filteredData} 
            dense={true} 
            onView={(r) => handleAction('view', r)}
            onEdit={(r) => handleAction('edit', r)}
            onDelete={(r) => handleAction('delete', r)}
            onPrint={(r) => handleAction('print', r)}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType?.toUpperCase()} Record`}>
          {modalType === 'delete' ? (
            <Delete onConfirm={onConfirmDelete} onClose={() => setIsModalOpen(false)} />
          ) : (modalType === 'add' || modalType === 'edit') ? (
            <Form fields={allFields} initialData={currentRecord || {}} onSubmit={onFormSubmit} onCancel={() => setIsModalOpen(false)} />
          ) : modalType === 'view' ? (
            <View data={currentRecord} fields={allFields} onClose={() => setIsModalOpen(false)} />
          ) : modalType === 'print' ? (
            <Print data={currentRecord} fields={allFields} allData={filteredData} onClose={() => setIsModalOpen(false)} />
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default EmployeeCRUD;

import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

const Delete = ({ onConfirm, onClose }) => (
  <div>
    <p className="mb-4 text-gray-700">Are you sure you want to delete this record?</p>
    <div className="flex justify-end space-x-2">
      <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
    </div>
  </div>
);

export default Delete;

import React from 'react';

const View = ({ data, fields, onClose }) => (
  <div>
    {data && (
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.name} className="flex flex-col sm:flex-row sm:items-center">
            <strong className="w-full sm:w-1/3 text-gray-600 mb-1 sm:mb-0">{field.label}:</strong>
            <span className="w-full sm:w-2/3 text-gray-900">{data[field.name] || '-'}</span>
          </div>
        ))}
      </div>
    )}
    <div className="flex justify-end mt-6">
      <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Close</button>
    </div>
  </div>
);

export default View;

import React, { useState } from 'react';

const Print = ({ data, fields, allData, onClose }) => {
  const [printType, setPrintType] = useState('individual'); // 'individual' or 'table'

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-container">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Print Type:</label>
        <select
          value={printType}
          onChange={(e) => setPrintType(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="individual">Individual Record</option>
          <option value="table">Whole Table</option>
        </select>
      </div>

      {printType === 'individual' && data && (
        <div className="invoice-style p-6 bg-white border border-gray-300 rounded-md shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Employee Invoice</h1>
            <p className="text-gray-600">Record Details</p>
          </div>
          <div className="space-y-3">
            {fields.map(field => (
              <div key={field.name} className="flex justify-between border-b border-gray-200 pb-2">
                <strong className="text-gray-700">{field.label}:</strong>
                <span className="text-gray-900">{data[field.name] || '-'}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {printType === 'table' && (
        <div className="invoice-style p-6 bg-white border border-gray-300 rounded-md shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Employee Table Invoice</h1>
            <p className="text-gray-600">All Records</p>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {fields.map(field => (
                  <th key={field.name} className="px-4 py-2 border-b text-left text-gray-700 font-semibold">{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allData.map((item, index) => (
                <tr key={index} className="border-b">
                  {fields.map(field => (
                    <td key={field.name} className="px-4 py-2 text-gray-900">{item[field.name] || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-6">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">Cancel</button>
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Print</button>
      </div>
    </div>
  );
};

export default Print;