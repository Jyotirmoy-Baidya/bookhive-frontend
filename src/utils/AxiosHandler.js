// src/api/axiosInstance.js
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-api.com/api', // supports .env for Vite
    withCredentials: true, // include cookies in requests
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
