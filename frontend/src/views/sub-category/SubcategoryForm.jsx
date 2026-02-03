import React, { useState, useEffect } from 'react';
import api from './../../services/api';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

const SubcategoryForm = ({ subcategory, onClose }) => {
  const [formData, setFormData] = useState({
    parent_category_id: '',
    subcategory_name: '',
    description: '',
    subcategory_image: null,
    status: 'Active'
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (subcategory) {
      setFormData({
        parent_category_id: subcategory.parent_category_id || '',
        subcategory_name: subcategory.subcategory_name || '',
        description: subcategory.description || '',
        status: subcategory.status || 'Active'
      });
    }
  }, [subcategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch {
      alert('Failed to load categories');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      if (subcategory) {
        await api.post(`/sub-cat/${subcategory.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/sub-cat', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      onClose();
    } catch {
      alert('Error saving subcategory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Dropdown
        label="Category"
        options={categories.map(cat => ({ value: cat.id, label: cat.category_name }))}
        value={formData.category_id}
        onChange={(value) => setFormData({ ...formData, category_id: value })}
        required
      />
      <InputGroup label="Subcategory Name" name="subcategory_name" value={formData.subcategory_name} onChange={handleChange} required />
      <InputGroup label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />
      <InputGroup label="Image" name="subcategory_image" type="file" onChange={handleChange} />
      <Dropdown
        label="Status"
        options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
        value={formData.status}
        onChange={(value) => setFormData({ ...formData, status: value })}
      />
      <Button type="submit" loading={loading}>{subcategory ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default SubcategoryForm;