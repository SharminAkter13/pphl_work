import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './../../services/api';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

const SubcategoryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subcategory = location.state?.subcategory; 

  const [formData, setFormData] = useState({
    category_id: '',
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
        category_id: subcategory.category_id || '',
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
    } catch (err) {
      console.error(err);
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
        await api.put(`/sub-cat/${subcategory.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/sub-cat', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/subcategories'); 
    } catch (err) {
      console.error(err);
      alert('Error saving subcategory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {subcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
        </h2>
        <Button onClick={() => navigate('/subcategories')} variant="secondary">
          Back to List
        </Button>
      </div>

      <Form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <Dropdown
          label="Category"
          placeholder="Select a Category"
          options={categories.map(cat => ({ value: cat.id, label: cat.category_name }))}
          value={formData.category_id}
          onChange={(value) => setFormData({ ...formData, category_id: value })}
          required
        />

        <InputGroup
          label="Subcategory Name"
          name="subcategory_name"
          value={formData.subcategory_name}
          onChange={handleChange}
          required
          className="mt-4"
        />

        <InputGroup
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          className="mt-4"
        />

        <InputGroup
          label="Subcategory Image"
          name="subcategory_image"
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
            {subcategory ? 'Update Subcategory' : 'Create Subcategory'}
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/subcategories')}
            className="bg-gray-600 w-full md:w-auto"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SubcategoryForm;
