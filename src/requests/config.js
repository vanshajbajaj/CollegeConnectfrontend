/**
 * This file contains configuration for axios requests
 */

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  credentials: "include",
});

export default instance;
