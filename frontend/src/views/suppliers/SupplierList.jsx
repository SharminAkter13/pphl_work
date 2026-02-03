import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/supplier');
      setSuppliers(response.data);
    } catch {
      setAlert({ type: 'error', message: 'Failed to load suppliers' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await api.delete(`/supplier/${id}`);
        setSuppliers(suppliers.filter(s => s.id !== id));
        setAlert({ type: 'success', message: 'Supplier deleted successfully' });
      } catch {
        setAlert({ type: 'error', message: 'Failed to delete supplier' });
      }
    }
  };

  const handleEdit = (supplier) => {
    navigate('/add-supplier', { state: { supplier } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Suppliers</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <Button onClick={() => navigate('/add-suppliers')} className="mb-4">
        Add Supplier
      </Button>

      <Table
        headers={[
          { key: 'supplier_name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'status', label: 'Status' },
        ]}
        rows={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortable
      />
    </div>
  );
};

export default SupplierList;
