import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from './views/categories/CategoryList';
import CategoryForm from './views/categories/CategoryForm';
import ProductList from './views/products/ProductList';
import ProductForm from './views/products/ProductForm';
import SubcategoryList from './views/sub-category/SubcategoryList';
import SubcategoryForm from './views/sub-category/SubcategoryForm';
import SupplierList from './views/suppliers/SupplierList';
import SupplierForm from './views/suppliers/SupplierForm';
import EmployerCurd from './views/employers/EmployerCurd';
import EmployeeCURD from './views/employers/EmployeeCURD';
import MasterLayout from "./components/layouts/MasterLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<MasterLayout />}>
            <Route index element={<CategoryList />} />
            
            {/* Categories */}
            <Route path="categories" element={<CategoryList />} />
            <Route path="add-categories" element={<CategoryForm />} />
            {/* Add this line to handle the Edit URL */}
            <Route path="categories/edit/:id" element={<CategoryForm />} />

            {/* Subcategories */}
            <Route path="subcategories" element={<SubcategoryList />} />
            <Route path="add-subcategories" element={<SubcategoryForm />} />
            <Route path="subcategories/edit/:id" element={<SubcategoryForm />} />

            {/* Products */}
            <Route path="products" element={<ProductList />} />
            <Route path="add-products" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />

            {/* Suppliers */}
            <Route path="suppliers" element={<SupplierList />} />
            <Route path="add-suppliers" element={<SupplierForm />} />
            <Route path="suppliers/edit/:id" element={<SupplierForm />} />

            <Route path="employees" element={<EmployerCurd />} />
            <Route path="employers" element={<EmployeeCURD />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
