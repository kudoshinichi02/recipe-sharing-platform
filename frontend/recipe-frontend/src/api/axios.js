import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.url === "/auth/register") {
    return config;
  }

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username && password) {
    config.auth = {
      username: username,
      password: password,
    };
  }

  return config;
});

export default api;