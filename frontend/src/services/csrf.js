// src/services/csrf.js
import api, { ASSET_URL } from "./api";

export const getCsrfCookie = () => {
  return api.get("/sanctum/csrf-cookie", {
    baseURL: ASSET_URL,
  });
};
