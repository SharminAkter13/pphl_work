import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../services/api';
import Button from '../../components/Button';

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${deleteId}`);
      setDeleteId(null);
      fetchCategories();
    } catch {
      alert('Error deleting category');
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => navigate('/add-categories')}>Add Category</Button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-750 transition-colors">
                <td className="p-4">
                  <img src={cat.category_image} alt="" className="w-10 h-10 rounded object-cover bg-gray-600" />
                </td>
                <td className="p-4 font-medium">{cat.category_name}</td>
                <td className="p-4 text-gray-400">{cat.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${cat.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {cat.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button onClick={() => navigate(`/categories/edit/${cat.id}`, { state: { category: cat } })} className="bg-blue-600 hover:bg-blue-700 text-xs">Edit</Button>
                    <Button onClick={() => setDeleteId(cat.id)} className="bg-red-600 hover:bg-red-700 text-xs">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default CategoryList;