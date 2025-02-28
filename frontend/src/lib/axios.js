import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fullstack-chat-app-backend-hfrk.onrender.com/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
