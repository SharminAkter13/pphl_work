import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../services/api';
// import Table from '../../components/Table';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Modal from '../../components/modal/Modal '; 
import Print from '../../components/employes/Print'; 
import Table from '../../components/table/Table';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null); 
  const navigate = useNavigate();

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

  const handleEdit = (product) => {
    navigate('/add-products', { state: { product } }); 
  };

  const handlePrint = (product) => {
    setCurrentRecord(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      
      <Button onClick={() => navigate('/add-products')} className="mb-4">
        Add Product
      </Button>

      <Table
       
    fields={[
  { name: 'product_name', label: 'Name' }, 
  { name: 'sku', label: 'SKU' },
  { 
    name: 'category_name', 
    label: 'Category',
    render: (text, record) => record.category?.category_name || '-' 
  },
  { 
    name: 'supplier_name', 
    label: 'Supplier',
    render: (text, record) => record.supplier?.supplier_name || '-' 
  },

    { 
  name: 'product_image', 
  label: 'Image',
  render: (text, record) => record.product_image ? (
    <img 
      src={`http://127.0.0.1:8000/product_images/${record.product_image}`} 
      className="w-12 h-12 object-cover rounded border border-gray-600" 
      alt={record.product_name}
    />
  ) : <span className="text-gray-500">No Image</span>
},
    { name: 'status', label: 'Status' }
  ]}
  data={products} 
  onEdit={handleEdit}
  onDelete={handleDelete}
  onPrint={handlePrint} 
  dense={true}
/>
      
    {isModalOpen && (
  <Modal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    title="Print Product Information"
  >
    <Print 
      data={currentRecord} 
      fields={[
        { name: 'product_name', label: 'Product Name' },
        { name: 'sku', label: 'SKU' },
        { name: 'base_price', label: 'Base Price' },
        { name: 'status', label: 'Status' },
        { name: 'description', label: 'Description' }
      ]} 
    />
  </Modal>
)}
    </div>
  );
};

export default ProductList;