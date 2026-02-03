import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from './../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch {
      setAlert({ type: 'error', message: 'Failed to load products' });
    }
  };

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

  // Change Edit logic to navigate to the add-products route
  // Note: You may need to update your App.jsx routes to handle /add-products/:id for editing
  const handleEdit = (product) => {
    navigate('/add-products', { state: { product } }); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      
      {/* Change Button to navigate to the link instead of showing modal */}
      <Button onClick={() => navigate('/add-products')} className="mb-4">
        Add Product
      </Button>

      <Table
        headers={[
          { key: 'product_name', label: 'Name' },
          { key: 'sku', label: 'SKU' },
          { key: 'category.category_name', label: 'Category' },
          { key: 'supplier.supplier_name', label: 'Supplier' },
          { key: 'product_image', label: 'Image ' },
          { key: 'status', label: 'Status' }
        ]}
        rows={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortable
      />
      
      {/* Modal is removed from here */}
    </div>
  );
};

export default ProductList;