import axios from "axios";



export const API_URL = "http://127.0.0.1:8000/api"; 
export const ASSET_URL = "http://127.0.0.1:8000";



export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});






export default api;