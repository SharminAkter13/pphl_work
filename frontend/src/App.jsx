import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from './pages/categories/CategoryList';
import ProductList from './pages/products/ProductList';

const App = () => {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>

         <Route path="/" element={<MasterLayout  />}>
            <Route index element={<CategoryList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="subcategories" element={<SubcategoryList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="suppliers" element={<SupplierList />} />
          </Route>
        
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
