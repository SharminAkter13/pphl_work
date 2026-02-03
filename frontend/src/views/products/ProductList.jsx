import React, { useEffect, useState } from 'react';
import api from './../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ProductForm from './ProductForm';
import Alert from '../../components/Alert';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to load products' });
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(prod => prod.id !== id));
        setAlert({ type: 'success', message: 'Product deleted successfully' });
      } catch {
        setAlert({ type: 'error', message: 'Failed to delete product' });
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    // Refetch data after form close
    const refetch = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch {
        setAlert({ type: 'error', message: 'Failed to refresh products' });
      }
    };
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <Button onClick={() => setShowForm(true)} className="mb-4">Add Product</Button>
      <Table
        headers={[
          { key: 'product_name', label: 'Name' },
          { key: 'sku', label: 'SKU' },
          { key: 'category.category_name', label: 'Category' },
          { key: 'supplier.supplier_name', label: 'Supplier' },
          { key: 'base_price', label: 'Price' },
          { key: 'status', label: 'Status' }
        ]}
        rows={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortable
      />
      <Modal isOpen={showForm} onClose={handleFormClose} title={editingProduct ? 'Edit Product' : 'Add Product'}>
        <ProductForm product={editingProduct} onClose={handleFormClose} />
      </Modal>
    </div>
  );
};

export default ProductList;