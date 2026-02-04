import axios from "axios";

// import { getCsrfCookie } from "./csrf";


export const API_URL = "http://127.0.0.1:8000/api"; 
export const ASSET_URL = "http://127.0.0.1:8000";



export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getSubCategories = () => {
  return api.get("/sub-cat");
};

export const getSubCategory = (id) => {
  return api.get(`/sub-cat/${id}`);
};

export const createSubCategory = async (data) => {
  
  return api.post("/sub-cat", data);
};

export const updateSubCategory = async (id, data) => {
  
  return api.put(`/sub-cat/${id}`, data);
};

export const deleteSubCategory = async (id) => {
  
  return api.delete(`/sub-cat/${id}`);
};
export const getSuppliers = () => {
  return api.get("/supplier");
};

export const getSupplier = (id) => {
  return api.get(`/supplier/${id}`);
};

export const createSupplier = async (data) => {
  return api.post("/supplier", data);
};

export const updateSupplier = async (id, data) => {
  return api.put(`/supplier/${id}`, data);
};

export const deleteSupplier = async (id) => {
  return api.delete(`/supplier/${id}`);
};
export const createCategory = (data) => {
  return api.post("/categories", data);
};

export const getCategory = (id) => {
  return api.get(`/categories/${id}`);
};

export const updateCategory = (id, data) => {
  return api.put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};

export const getProducts = () => {
  return api.get("/products");
};

export const getProduct = (id) => {
  return api.get(`/products/${id}`);
};

export const createProduct = (data) => {
  return api.post("/products", data);
};

export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};



export const getEmployee = (id) => {
  return api.get(`/employees/${id}`);
};

export const getEmployees = () => api.get("/employees");

export const createEmployees = (data) => api.post("/employees", data, {
    headers: { "Content-Type": "multipart/form-data" }
});

export const updateEmployees = (id, data) => {
    if (data instanceof FormData) {
        data.append("_method", "PUT");
    }
    return api.post(`/employees/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const deleteItem = (id) => api.delete(`/employees/${id}`);







export default api;