import { api } from './api';

export const productService = {
  getAll: () => api.get("/products").then(res => res.data),
  
  create: (formData) => api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),

  update: (id, formData) => api.post(`/products/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),

  delete: (id) => api.delete(`/products/${id}`)
};