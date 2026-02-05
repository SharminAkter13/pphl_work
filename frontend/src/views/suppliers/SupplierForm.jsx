import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './../../services/api';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

const SupplierForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const supplier = location.state?.supplier; 

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
      navigate('/suppliers'); 
    } catch (err) {
      console.error(err);
      alert('Error saving supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {supplier ? 'Edit Supplier' : 'Add New Supplier'}
        </h2>
        <Button onClick={() => navigate('/suppliers')} variant="secondary">
          Back to List
        </Button>
      </div>

      <Form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <InputGroup
          label="Supplier Name"
          name="supplier_name"
          value={formData.supplier_name}
          onChange={handleChange}
          required
        />
        <InputGroup
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputGroup
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputGroup
          label="Address"
          name="address"
          type="textarea"
          value={formData.address}
          onChange={handleChange}
        />
        <InputGroup
          label="Contact Person"
          name="contact_person"
          value={formData.contact_person}
          onChange={handleChange}
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
            {supplier ? 'Update Supplier' : 'Create Supplier'}
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/suppliers')}
            className="bg-gray-600 w-full md:w-auto"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SupplierForm;
