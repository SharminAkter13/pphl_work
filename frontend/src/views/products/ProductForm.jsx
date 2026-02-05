import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './../../services/api';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const AddProduct = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const editMode = !!state?.product;

    const [formData, setFormData] = useState({
        product_name: '',
        sku: '',
        category_id: '',
        subcategory_id: '',
        supplier_id: '',
        base_price: '',
        description: '',
        color: '',
        size: '',
        status: 'Active',
        product_image: null
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const loadDropdowns = async () => {
            try {
                const [catRes, subRes, supRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/sub-cat'),
                    api.get('/supplier')
                ]);
                setCategories(catRes.data);
                setSubcategories(subRes.data);
                setSuppliers(supRes.data);
            } catch (err) {
                setAlert({ type: 'error', message: 'Failed to load form options' });
            }
        };

        loadDropdowns();

        if (editMode) {
            setFormData({ ...state.product, product_image: null });
        }
    }, [editMode, state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, product_image: e.target.files[0] }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach(key => {
        if (key === 'product_image') {
            if (formData[key] instanceof File) {
                data.append(key, formData[key]);
            }
        } else if (formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
        }
    });

    try {
        if (editMode) {
            data.append('_method', 'PUT'); 
            await api.post(`/products/${state.product.id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAlert({ type: 'success', message: 'Product updated successfully' });
        } else {
            await api.post('/products', data);
            setAlert({ type: 'success', message: 'Product created successfully' });
        }
        setTimeout(() => navigate('/products'), 1500);
    } catch (err) {
        setAlert({ type: 'error', message: err.response?.data?.message || 'Transaction failed.' });
    }
};

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white">
                {editMode ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-300 mb-1">Product Name</label>
                    <input 
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-1">SKU</label>
                    <input 
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-1">Category</label>
                    <select 
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.category_name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-300 mb-1">Supplier</label>
                    <select 
                        name="supplier_id"
                        value={formData.supplier_id}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.supplier_name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-300 mb-1">Base Price</label>
                    <input 
                        type="number"
                        step="0.01"
                        name="base_price"
                        value={formData.base_price}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 mb-1">Product Image</label>
                    <input 
                        type="file"
                        onChange={handleFileChange}
                        className="w-full text-gray-400"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-1">Description</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                        rows="3"
                    ></textarea>
                </div>

                <div className="flex gap-4 mt-4">
                    <Button type="submit">
                        {editMode ? 'Update Product' : 'Save Product'}
                    </Button>
                    <Button type="button" onClick={() => navigate('/products')} className="bg-gray-600">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;