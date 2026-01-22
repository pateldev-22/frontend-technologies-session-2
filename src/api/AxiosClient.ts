import axios from 'axios';
import dotenv from 'dotenv';

export const api = axios.create({
  baseURL: "https://dummyjson.com", 
  timeout: 5000, 
});

// api.interceptors.request.use(
//   (config) => {
//     const token = 'sample_token';

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     console.error('[Request Error]', error.message);
//   }
// );