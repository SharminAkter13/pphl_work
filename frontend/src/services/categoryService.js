// src/services/categoryService.js
import api from "./api";

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
