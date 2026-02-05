import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added for navigation
import api from './../../services/api';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

const ProductForm = () => {
  const navigate = useNavigate(); // Hook to redirect after submit
  const location = useLocation(); // Hook to catch the product data if editing
  const product = location.state?.product; // Get product data passed from the list

  const [formData, setFormData] = useState({
    product_name: '',
    sku: '',
    category_id: '',
    subcategory_id: '',
    supplier_id: '',
    base_price: '',
    description: '',
    product_image: null,
    color: '',
    size: '',
    status: 'Active'
  });
  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOptions();
    if (product) {
      setFormData({
        product_name: product.product_name || '',
        sku: product.sku || '',
        category_id: product.category_id || '',
        subcategory_id: product.subcategory_id || '',
        supplier_id: product.supplier_id || '',
        base_price: product.base_price || '',
        description: product.description || '',
        color: product.color || '',
        size: product.size || '',
        status: product.status || 'Active'
      });
    }
  }, [product]);

  const fetchOptions = async () => {
    try {
      const [catRes, subRes, supRes] = await Promise.all([
        api.get('/categories'),
        api.get('/sub-cat'),
        api.get('/supplier')
      ]);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
      setSuppliers(supRes.data);
    } catch (error) {
      console.error('Failed to load options:', error);
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
      if (product) {
        await api.put(`/products/${product.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/products'); 
    } catch {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <Button onClick={() => navigate('/products')} variant="secondary">Back to List</Button>
      </div>

      <Form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Product Name" name="product_name" value={formData.product_name} onChange={handleChange} required />
          <InputGroup label="SKU" name="sku" value={formData.sku} onChange={handleChange} />
          
          <Dropdown
            label="Category"
            placeholder="Select a Category"
            options={categories.map(cat => ({ value: cat.id, label: cat.category_name }))}
            value={formData.category_id}
            onChange={(value) => setFormData({ ...formData, category_id: value })}
          />
          
          <Dropdown
            label="Subcategory"
            placeholder="Select a Subcategory" 
            options={subcategories.map(sub => ({ value: sub.id, label: sub.subcategory_name }))}
            value={formData.subcategory_id}
            onChange={(value) => setFormData({ ...formData, subcategory_id: value })}
          />

          <Dropdown
            label="Supplier"
            placeholder="Select a Supplier" 
            options={suppliers.map(sup => ({ value: sup.id, label: sup.supplier_name }))}
            value={formData.supplier_id}
            onChange={(value) => setFormData({ ...formData, supplier_id: value })}
          />

          <InputGroup label="Base Price" name="base_price" type="number" value={formData.base_price} onChange={handleChange} />
        </div>

        <InputGroup label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <InputGroup label="Color" name="color" value={formData.color} onChange={handleChange} />
          <InputGroup label="Size" name="size" value={formData.size} onChange={handleChange} />
          <Dropdown
            label="Status"
            placeholder="Status"
            options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
          />
        </div>

        <div className="mt-4">
          <InputGroup label="Product Image" name="product_image" type="file" onChange={handleChange} />
        </div>

        <div className="mt-8 flex gap-4">
          <Button type="submit" loading={loading} className="w-full md:w-auto">
            {product ? 'Update Product' : 'Create Product'}
          </Button>
          <Button type="button" onClick={() => navigate('/products')} className="bg-gray-600 w-full md:w-auto">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;