import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/api";
export const ASSET_URL = "http://127.0.0.1:8000";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});


export const getSubCategories = () => api.get("/sub-cat");
export const getSubCategory = (id) => api.get(`/sub-cat/${id}`);
export const createSubCategory = (data) => api.post("/sub-cat", data);
export const updateSubCategory = (id, data) =>
  api.put(`/sub-cat/${id}`, data);
export const deleteSubCategory = (id) =>
  api.delete(`/sub-cat/${id}`);


export const getSuppliers = () => api.get("/supplier");
export const getSupplier = (id) => api.get(`/supplier/${id}`);
export const createSupplier = (data) => api.post("/supplier", data);
export const updateSupplier = (id, data) =>
  api.put(`/supplier/${id}`, data);
export const deleteSupplier = (id) =>
  api.delete(`/supplier/${id}`);

export const getCategories = () => api.get("/categories");
export const getCategory = (id) => api.get(`/categories/${id}`);
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) =>
  api.put(`/categories/${id}`, data);
export const deleteCategory = (id) =>
  api.delete(`/categories/${id}`);


export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);
export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);

export const getEmployees = (params = {}) => {
  return api.get("/employees", {
    params, 
  });
};

export const getEmployee = (id) =>
  api.get(`/employees/${id}`);

export const createEmployees = (data) =>
  api.post("/employees", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateEmployees = (id, data) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
  }
  return api.post(`/employees/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteItem = (id) =>
  api.delete(`/employees/${id}`);


export default api;
