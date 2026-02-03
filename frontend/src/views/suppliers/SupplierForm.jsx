import React, { useState, useEffect } from 'react';
import api from './../../services/api';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

const SupplierForm = ({ supplier, onClose }) => {
  const [formData, setFormData] = useState({
    supplier_name: '',
    email: '',
    phone: '',
    address: '',
    contact_person: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (supplier) {
      setFormData({
        supplier_name: supplier.supplier_name || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
        address: supplier.address || '',
        contact_person: supplier.contact_person || '',
        status: supplier.status || 'Active'
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (supplier) {
        await api.put(`/supplier/${supplier.id}`, formData);
      } else {
        await api.post('/supplier', formData);
      }
      onClose();
    } catch {
      alert('Error saving supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup label="Supplier Name" name="supplier_name" value={formData.supplier_name} onChange={handleChange} required />
      <InputGroup label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
      <InputGroup label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      <InputGroup label="Address" name="address" type="textarea" value={formData.address} onChange={handleChange} />
      <InputGroup label="Contact Person" name="contact_person" value={formData.contact_person} onChange={handleChange} />
      <Dropdown
        label="Status"
        options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
        value={formData.status}
        onChange={(value) => setFormData({ ...formData, status: value })}
      />
      <Button type="submit" loading={loading}>{supplier ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default SupplierForm;