import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // 👈 importante si usas tokens o cookies
});

export default api;
