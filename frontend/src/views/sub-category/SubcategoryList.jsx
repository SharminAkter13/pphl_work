import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const SubcategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const res = await api.get('/sub-cat');
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to load subcategories' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await api.delete(`/subcategories/${id}`);
        setSubcategories(subcategories.filter(sub => sub.id !== id));
        setAlert({ type: 'success', message: 'Subcategory deleted successfully' });
      } catch (err) {
        console.error(err);
        setAlert({ type: 'error', message: 'Failed to delete subcategory' });
      }
    }
  };

  const handleEdit = (subcategory) => {
    navigate('/add-subcategories', { state: { subcategory } }); // send subcategory for edit
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subcategories</h2>
        <Button onClick={() => navigate('//add-subcategories')}>Add Subcategory</Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <Table
        headers={[
          { key: 'subcategory_name', label: 'Name' },
          { key: 'category.category_name', label: 'Category' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status' },
        ]}
        rows={subcategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        renderCell={(key, row) => {
          if (key === 'status') {
            return (
              <span className={`px-2 py-1 rounded-full text-xs ${
                row.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
              }`}>
                {row.status}
              </span>
            );
          }
          return row[key] || '';
        }}
        sortable
      />
    </div>
  );
};

export default SubcategoryList;
