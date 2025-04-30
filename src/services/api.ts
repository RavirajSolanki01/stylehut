import axios from "axios";
import { toast } from "react-toastify";
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    withAuth?: boolean;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (config.withAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error(error.response);
    }
    return Promise.reject(error);
  }
);

export default api;
