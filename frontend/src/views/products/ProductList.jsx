import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../services/api';
// import Table from '../../components/Table';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Modal from '../../components/modal/Modal '; // Kept as your requested path
import Print from '../../components/employes/Print'; // Kept as your requested path
import Table from '../../components/table/Table';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For Print Modal
  const [currentRecord, setCurrentRecord] = useState(null); // Track which product to print
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

  // Add Print Handler
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
    { name: 'category.category_name', label: 'Category' },
    { name: 'supplier.supplier_name', label: 'Supplier' },
    { 
      name: 'product_image', 
      label: 'Image',
      render: (text, record) => record.product_image ? (
        <img src={`http://127.0.0.1:8000/storage/${record.product_image}`} className="w-10 h-10 object-cover" />
      ) : 'No Image'
    },
    { name: 'status', label: 'Status' }
  ]}
  data={products} // Change "rows" to "data"
  onEdit={handleEdit}
  onDelete={handleDelete}
  onPrint={handlePrint} 
  dense={true}
/>
      
      {/* Print Modal Section */}
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Print Product Information"
        >
          <Print data={currentRecord} />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;