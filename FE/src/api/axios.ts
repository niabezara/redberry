import axios, { CreateAxiosDefaults } from "axios";

const baseConfig: CreateAxiosDefaults = {
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
};

const instance = axios.create(baseConfig);

export default instance;
