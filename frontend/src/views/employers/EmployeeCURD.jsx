import React, { useState, useEffect } from 'react';
import { Modal, DynamicForm, DynamicTable, DeleteModal, ViewModal, PrintModal, SearchFilter, CrudInterface } from './components'; // Adjust path

const API_BASE_URL = 'http://localhost:8000/api';

const EmployeeCRUD = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'website', label: 'Website', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'office_time', label: 'Office Time', type: 'time' },
    { name: 'joining_datetime', label: 'Joining DateTime', type: 'datetime-local' },
    { name: 'department', label: 'Department', type: 'radio', options: [ // Radio buttons
      { value: 'HR', label: 'HR' },
      { value: 'IT', label: 'IT' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Marketing', label: 'Marketing' }
    ] },
    { name: 'is_active', label: 'Is Active', type: 'checkbox' }, // Single checkbox
    { name: 'skills', label: 'Skills', type: 'checkbox-multiple', options: [ // Multiple checkboxes
      { value: 'JavaScript', label: 'JavaScript' },
      { value: 'React', label: 'React' },
      { value: 'PHP', label: 'PHP' },
      { value: 'Laravel', label: 'Laravel' },
      { value: 'Python', label: 'Python' }
    ] },
    { name: 'salary_range', label: 'Salary Range', type: 'range', min: 0, max: 100 },
    { name: 'favorite_color', label: 'Favorite Color', type: 'color' },
    { name: 'profile_image', label: 'Profile Image', type: 'file', fileType: 'image/*' },
    { name: 'resume', label: 'Resume', type: 'file', fileType: '.pdf,.doc,.docx' },
    { name: 'joining_month', label: 'Joining Month', type: 'month' },
    { name: 'joining_week', label: 'Joining Week', type: 'week' },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'skills') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      body: data,
    });
    if (response.ok) fetchEmployees();
  };

  const handleUpdate = async (id, formData) => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'skills') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'POST',
      headers: { 'X-HTTP-Method-Override': 'PUT' },
      body: data,
    });
    if (response.ok) fetchEmployees();
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) fetchEmployees();
  };

  const handleView = async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    return await response.json();
  };

  const handlePrint = async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    return await response.json();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <CrudInterface
      fields={fields}
      data={employees}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onView={handleView}
      onPrint={handlePrint}
      primaryKey="id"
      title="Employee Management"
      enableSelect={true}
      enableSearch={true}
      searchFields={['name', 'email']}
      multipleSearch={true}
    />
  );
};

export default EmployeeCRUD;