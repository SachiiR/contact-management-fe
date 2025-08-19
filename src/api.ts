import axios from "axios";
import { API_URL, COMMON } from "./utils/constants";

const API = axios.create({
  baseURL: API_URL, // NestJS backend URL
});

// Attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem(COMMON.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
