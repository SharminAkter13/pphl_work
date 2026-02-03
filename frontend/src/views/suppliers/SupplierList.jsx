import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Table from './Table';
import Button from './Button';
import Modal from './Modal';
import SupplierForm from './SupplierForm';
import Alert from './Alert';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/suppliers');
        setSuppliers(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to load suppliers' });
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await api.delete(`/admin/suppliers/${id}`);
        setSuppliers(suppliers.filter(sup => sup.id !== id));
        setAlert({ type: 'success', message: 'Supplier deleted successfully' });
      } catch {
        setAlert({ type: 'error', message: 'Failed to delete supplier' });
      }
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSupplier(null);
    // Refetch data after form close
    const refetch = async () => {
      try {
        const response = await api.get('/admin/suppliers');
        setSuppliers(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to refresh suppliers' });
      }
    };
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <Button onClick={() => setShowForm(true)} className="mb-4">Add Supplier</Button>
      <Table
        headers={[
          { key: 'supplier_name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'contact_person', label: 'Contact Person' },
          { key: 'status', label: 'Status' }
        ]}
        rows={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortable
      />
      <Modal isOpen={showForm} onClose={handleFormClose} title={editingSupplier ? 'Edit Supplier' : 'Add Supplier'}>
        <SupplierForm supplier={editingSupplier} onClose={handleFormClose} />
      </Modal>
    </div>
  );
};

export default SupplierList;