import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Table from './Table';
import Button from './Button';
import Modal from './Modal';
import SubcategoryForm from './SubcategoryForm';
import Alert from './Alert';

const SubcategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/subcategories');
        setSubcategories(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to load subcategories' });
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await api.delete(`/admin/subcategories/${id}`);
        setSubcategories(subcategories.filter(sub => sub.id !== id));
        setAlert({ type: 'success', message: 'Subcategory deleted successfully' });
      } catch {
        setAlert({ type: 'error', message: 'Failed to delete subcategory' });
      }
    }
  };

  const handleEdit = (subcategory) => {
    setEditingSubcategory(subcategory);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSubcategory(null);
    // Refetch data after form close
    const refetch = async () => {
      try {
        const response = await api.get('/admin/subcategories');
        setSubcategories(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to refresh subcategories' });
      }
    };
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <Button onClick={() => setShowForm(true)} className="mb-4">Add Subcategory</Button>
      <Table
        headers={[
          { key: 'subcategory_name', label: 'Name' },
          { key: 'category.category_name', label: 'Category' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status' }
        ]}
        rows={subcategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortable
      />
      <Modal isOpen={showForm} onClose={handleFormClose} title={editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}>
        <SubcategoryForm subcategory={editingSubcategory} onClose={handleFormClose} />
      </Modal>
    </div>
  );
};

export default SubcategoryList;