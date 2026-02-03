import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Form from './Form';
import InputGroup from './InputGroup';
import Button from './Button';
import Dropdown from './Dropdown';

const CategoryForm = ({ category, onClose }) => {
  const [formData, setFormData] = useState({
    category_name: '',
    slug: '',
    description: '',
    category_image: null,
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        category_name: category.category_name || '',
        slug: category.slug || '',
        description: category.description || '',
        status: category.status || 'Active'
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      if (category) {
        await api.post(`/admin/categories/${category.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/admin/categories', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      onClose();
    } catch (error) {
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup label="Category Name" name="category_name" value={formData.category_name} onChange={handleChange} required />
      <InputGroup label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
      <InputGroup label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />
      <InputGroup label="Image" name="category_image" type="file" onChange={handleChange} />
      <Dropdown
        label="Status"
        options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
        value={formData.status}
        onChange={(value) => setFormData({ ...formData, status: value })}
      />
      <Button type="submit" loading={loading}>{category ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default CategoryForm;