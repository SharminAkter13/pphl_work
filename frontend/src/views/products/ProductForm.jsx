import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Form from './Form';
import InputGroup from './InputGroup';
import Button from './Button';
import Dropdown from './Dropdown';

const ProductForm = ({ product, onClose }) => {
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
    featured: 'No',
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
        featured: product.featured || 'No',
        status: product.status || 'Active'
      });
    }
  }, [product]);

  const fetchOptions = async () => {
    try {
      const [catRes, subRes, supRes] = await Promise.all([
        api.get('/admin/categories'),
        api.get('/admin/subcategories'),
        api.get('/admin/suppliers')
      ]);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
      setSuppliers(supRes.data);
    } catch {
      alert('Failed to load options');
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
        await api.post(`/admin/products/${product.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/admin/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      onClose();
    } catch {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup label="Product Name" name="product_name" value={formData.product_name} onChange={handleChange} required />
      <InputGroup label="SKU" name="sku" value={formData.sku} onChange={handleChange} />
      <Dropdown
        label="Category"
        options={categories.map(cat => ({ value: cat.id, label: cat.category_name }))}
        value={formData.category_id}
        onChange={(value) => setFormData({ ...formData, category_id: value })}
      />
      <Dropdown
        label="Subcategory"
        options={subcategories.map(sub => ({ value: sub.id, label: sub.subcategory_name }))}
        value={formData.subcategory_id}
        onChange={(value) => setFormData({ ...formData, subcategory_id: value })}
      />
      <Dropdown
        label="Supplier"
        options={suppliers.map(sup => ({ value: sup.id, label: sup.supplier_name }))}
        value={formData.supplier_id}
        onChange={(value) => setFormData({ ...formData, supplier_id: value })}
      />
      <InputGroup label="Base Price" name="base_price" type="number" value={formData.base_price} onChange={handleChange} />
      <InputGroup label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />
      <InputGroup label="Product Image" name="product_image" type="file" onChange={handleChange} />
      <InputGroup label="Color" name="color" value={formData.color} onChange={handleChange} />
      <InputGroup label="Size" name="size" value={formData.size} onChange={handleChange} />
      <Dropdown
        label="Featured"
        options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
        value={formData.featured}
        onChange={(value) => setFormData({ ...formData, featured: value })}
      />
      <Dropdown
        label="Status"
        options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
        value={formData.status}
        onChange={(value) => setFormData({ ...formData, status: value })}
      />
      <Button type="submit" loading={loading}>{product ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default ProductForm;