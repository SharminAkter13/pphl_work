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
import MasterLayout from "./components/layouts/MasterLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

         <Route path="/" element={<MasterLayout  />}>
            {/* <Route index element={<CategoryList />} /> */}
            <Route path="categories" element={<CategoryList />} />
            <Route path="add-categories" element={<CategoryForm />} />
            <Route path="subcategories" element={<SubcategoryList />} />
            <Route path="add-subcategories" element={<SubcategoryForm  />} />
            <Route path="products" element={<ProductList />} />
            <Route path="add-products" element={<ProductForm  />} />
            <Route path="suppliers" element={<SupplierList />} />
            <Route path="add-suppliers" element={<SupplierForm  />} />
          </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
