import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT to protected requests
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized authentication error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Authentication failed or token expired.");
      }

      if (error.response.status === 403) {
        console.warn("Access forbidden.");
      }
    } else if (error.request) {
      console.warn("Backend is unavailable.");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;