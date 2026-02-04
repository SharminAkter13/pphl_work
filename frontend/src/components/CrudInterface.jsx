import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint, FaSearch, FaPlus } from 'react-icons/fa'; // Assuming react-icons is installed

// 1. General Modal Component
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

// 2. Form Component (for create and update)
const DynamicForm = ({ fields, onSubmit, initialData = {}, onCancel, submitLabel = 'Save' }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : field.type === 'textarea' ? (
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : field.type === 'select' ? (
            <select
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : field.type === 'file' ? (
            <input
              type="file"
              accept={field.fileType || '*'}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.files[0] })}
              required={field.required}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : null}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{submitLabel}</button>
      </div>
    </form>
  );
};

// 3. Table Component (with selectbox, responsive, show upload file)
const DynamicTable = ({ fields, data, primaryKey = 'id', enableSelect = true, onSelect, onEdit, onDelete, onView, onPrint }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSelect = (record) => {
    const newSelected = selectedRecords.includes(record) 
      ? selectedRecords.filter(r => r !== record) 
      : [...selectedRecords, record];
    setSelectedRecords(newSelected);
    onSelect && onSelect(newSelected);
  };

  const handleSelectAll = () => {
    const newSelected = selectedRecords.length === data.length ? [] : data;
    setSelectedRecords(newSelected);
    onSelect && onSelect(newSelected);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {enableSelect && (
              <th className="px-4 py-2 border-b">
                <input type="checkbox" checked={selectedRecords.length === data.length} onChange={handleSelectAll} />
              </th>
            )}
            {fields.map(field => (
              <th key={field.name} className="px-4 py-2 border-b text-left">{field.label}</th>
            ))}
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr key={record[primaryKey]} className="hover:bg-gray-50">
              {enableSelect && (
                <td className="px-4 py-2 border-b">
                  <input type="checkbox" checked={selectedRecords.includes(record)} onChange={() => handleSelect(record)} />
                </td>
              )}
              {fields.map(field => (
                <td key={field.name} className="px-4 py-2 border-b">
                  {field.type === 'file' ? (
                    record[field.name] ? (
                      <img src={URL.createObjectURL(record[field.name])} alt="Uploaded" className="w-16 h-16 object-cover" />
                    ) : 'No file'
                  ) : (
                    record[field.name]
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border-b space-x-2">
                {onEdit && <button onClick={() => onEdit(record)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>}
                {onDelete && <button onClick={() => onDelete(record)} className="text-red-500 hover:text-red-700"><FaTrash /></button>}
                {onView && <button onClick={() => onView(record)} className="text-green-500 hover:text-green-700"><FaEye /></button>}
                {onPrint && <button onClick={() => onPrint(record)} className="text-purple-500 hover:text-purple-700"><FaPrint /></button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 4. Delete Modal Component
const DeleteModal = ({ isOpen, onClose, onConfirm, record }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
    <p>Are you sure you want to delete this record?</p>
    <div className="flex justify-end space-x-2 mt-4">
      <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
    </div>
  </Modal>
);

// 5. View Modal Component (with table view for related records)
const ViewModal = ({ isOpen, onClose, data, fields, primaryKey = 'id', relatedDataKey }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="View Record">
    {data && (
      <div>
        {relatedDataKey ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                {fields.map(field => (
                  <th key={field.name} className="px-4 py-2 border-b">{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data[relatedDataKey]?.map(item => (
                <tr key={item[primaryKey]}>
                  {fields.map(field => (
                    <td key={field.name} className="px-4 py-2 border-b">{item[field.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="space-y-2">
            {fields.map(field => (
              <div key={field.name}>
                <strong>{field.label}:</strong> {data[field.name]}
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </Modal>
);

// 6. Print Modal Component (invoice style)
const PrintModal = ({ isOpen, onClose, data, fields, primaryKey = 'id' }) => (
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

// 7. Search Filter Component (single and multiple)
const SearchFilter = ({ searchFields, fields, onFilterChange, multiple = true }) => {
  const [filters, setFilters] = useState({});

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="mb-4 space-y-2">
      {searchFields.map(field => (
        <div key={field} className="flex items-center space-x-2">
          <label className="text-sm font-medium">{fields.find(f => f.name === field)?.label || field}:</label>
          <input
            type="text"
            placeholder={`Search ${fields.find(f => f.name === field)?.label || field}`}
            value={filters[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))}
      {multiple && (
        <button onClick={clearFilters} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Clear Filters</button>
      )}
    </div>
  );
};

// Example Usage in a Main Component (for demonstration)
const CrudInterface = ({
  fields,
  data,
  onCreate,
  onUpdate,
  onDelete,
  onView,
  onPrint,
  primaryKey = 'id',
  title = 'CRUD Interface',
  enableSelect = true,
  enableSearch = true,
  searchFields = [],
  multipleSearch = true,
  relatedDataKey,
}) => {
  const [records, setRecords] = useState(data || []);
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printData, setPrintData] = useState(null);

  useEffect(() => {
    setRecords(data || []);
    setFilteredRecords(data || []);
  }, [data]);

  const handleFilterChange = (filters) => {
    let filtered = records;
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(record => 
          record[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });
    setFilteredRecords(filtered);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingRecord) {
        await onUpdate(editingRecord[primaryKey], formData);
      } else {
        await onCreate(formData);
      }
      setIsFormOpen(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(recordToDelete[primaryKey]);
      setDeleteModalOpen(false);
      setRecordToDelete(null);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleView = async (record) => {
    try {
      const data = await onView(record[primaryKey]);
      setViewData(data);
      setViewModalOpen(true);
    } catch (error) {
      console.error('Error viewing:', error);
    }
  };

  const handlePrint = async (record) => {
    try {
      const data = await onPrint(record[primaryKey]);
      setPrintData(data);
      setPrintModalOpen(true);
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <button onClick={() => { setEditingRecord(null); setIsFormOpen(true); }} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center space-x-2">
        <FaPlus /> <span>Create</span>
      </button>
      {enableSearch && <SearchFilter searchFields={searchFields} fields={fields} onFilterChange={handleFilterChange} multiple={multipleSearch} />}
      <DynamicTable
        fields={fields}
        data={filteredRecords}
        primaryKey={primaryKey}
        enableSelect={enableSelect}
        onSelect={setSelectedRecords}
        onEdit={(record) => { setEditingRecord(record); setIsFormOpen(true); }}
        onDelete={(record) => { setRecordToDelete(record); setDeleteModalOpen(true); }}
        onView={handleView}
        onPrint={handlePrint}
      />
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingRecord ? 'Update Record' : 'Create Record'}>
        <DynamicForm
          fields={fields}
          initialData={editingRecord || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        record={recordToDelete}
      />
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        data={viewData}
        fields={fields}
        primaryKey={primaryKey}
        relatedDataKey={relatedDataKey}
      />
      <PrintModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        data={printData}
        fields={fields}
        primaryKey={primaryKey}
      />
    </div>
  );
};

export { Modal, DynamicForm, DynamicTable, DeleteModal, ViewModal, PrintModal, SearchFilter, CrudInterface };