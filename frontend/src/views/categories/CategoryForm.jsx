import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import api from './../../services/api';

const CategoryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category; // Get data if editing

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
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach(key => {
        if (key === 'category_image') {
            if (formData[key] instanceof File) {
                data.append(key, formData[key]);
            }
        } else if (formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
        }
    });


    try {
      if (category) {
        await api.put(`/categories/${category.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/categories', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/categories'); 
    } catch (error) {
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {category ? 'Edit Category' : 'Add New Category'}
        </h2>
        <Button onClick={() => navigate('/categories')} variant="secondary">
          Back to List
        </Button>
      </div>

      <Form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Category Name"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            required
          />
          <InputGroup
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />
        </div>

        <InputGroup
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          className="mt-4"
        />

        <InputGroup
          label="Category Image"
          name="category_image"
          type="file"
          onChange={handleChange}
          className="mt-4"
        />

        <Dropdown
          label="Status"
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
          ]}
          value={formData.status}
          onChange={(value) => setFormData({ ...formData, status: value })}
          className="mt-4"
        />

        <div className="mt-8 flex gap-4">
          <Button type="submit" loading={loading} className="w-full md:w-auto">
            {category ? 'Update Category' : 'Create Category'}
          </Button>
          <Button type="button" onClick={() => navigate('/categories')} className="bg-gray-600 w-full md:w-auto">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryForm;
