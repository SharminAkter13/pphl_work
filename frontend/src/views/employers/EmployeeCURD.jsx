import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Table from '../../components/table/Table';
import Modal from '../../components/modal/Modal '; 
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

  // Field Name

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
    { name: 'website', label: 'Website', shortLabel: 'Web', type: 'url' },
    { name: 'number', label: 'Age', shortLabel: 'Age', type: 'number', hideInTable: true },
    { name: 'office_time', label: 'Office Time', shortLabel: 'Time', type: 'time' },
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
      hideInTable: true ,
      render: (val) => val ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>
    },
    { name: 'salary_range', label: 'Salary', shortLabel: 'Sal', type: 'range' },
    { name: 'favorite_color', label: 'Color', shortLabel: 'Clr', type: 'color' },
    { name: 'joining_month', label: 'Join Month', shortLabel: 'Mth', type: 'month', hideInTable: true  },
    { name: 'joining_week', label: 'Join Week', shortLabel: 'Wk', type: 'week', hideInTable: true  },
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
          formData.append(key, value ? 1 : 0); 
        } else if (Array.isArray(value)) {
          value.forEach((val) => formData.append(`${key}[]`, val)); 
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
    <div className="p-2 bg-gray-50 min-h-screen" style={{ overflowX: 'hidden' }}>  
      <div className="bg-gray rounded shadow-sm border p-4" style={{ width: '100%' }}> 
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
          <div style={{ overflowX: 'hidden', width: '100%' }}>  
            <Table 
              fields={tableFields} 
              data={filteredData} 
              dense={true} 
              style={{ tableLayout: 'fixed', width: '100%' }} 
              onView={(r) => handleAction('view', r)}
              onEdit={(r) => handleAction('edit', r)}
              onDelete={(r) => handleAction('delete', r)}
              onPrint={(r) => handleAction('print', r)}
            />
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType?.toUpperCase()} Record`}>
          {modalType === 'delete' && (
            <Delete onConfirm={onConfirmDelete} onClose={() => setIsModalOpen(false)} />
          )}
          {modalType === 'view' && (
            <View data={currentRecord} fields={allFields} />
          )}
          {modalType === 'print' && (
            <Print data={currentRecord} fields={tableFields} />
          )}
          {(modalType === 'add' || modalType === 'edit') && (
            <Form fields={allFields} initialData={currentRecord || {}} onSubmit={onFormSubmit} onCancel={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default EmployeeCRUD;