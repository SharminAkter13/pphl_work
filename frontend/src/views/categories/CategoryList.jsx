import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Table from './Table';
import Button from './Button';
import Modal from './Modal';
import CategoryForm from './CategoryForm';
import Alert from './Alert';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/categories');
        setCategories(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to load categories' });
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/admin/categories/${id}`);
        setCategories(categories.filter(cat => cat.id !== id));
        setAlert({ type: 'success', message: 'Category deleted successfully' });
      } catch {
        setAlert({ type: 'error', message: 'Failed to delete category' });
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
    // Refetch data after form close
    const refetch = async () => {
      try {
        const response = await api.get('/admin/categories');
        setCategories(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to refresh categories' });
      }
    };
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <Button onClick={() => setShowForm(true)} className="mb-4">Add Category</Button>
      <Table
        headers={[
          { key: 'category_name', label: 'Name' },
          { key: 'slug', label: 'Slug' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status' }
        ]}
        rows={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortable
      />
      <Modal isOpen={showForm} onClose={handleFormClose} title={editingCategory ? 'Edit Category' : 'Add Category'}>
        <CategoryForm category={editingCategory} onClose={handleFormClose} />
      </Modal>
    </div>
  );
};

export default CategoryList;